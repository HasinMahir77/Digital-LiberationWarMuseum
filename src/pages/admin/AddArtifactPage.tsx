import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useTranslation } from 'react-i18next';

const AddArtifactPage: React.FC = () => {
  const { addArtifact } = useData();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    collectionNumber: '',
    accessionNumber: '',
    collectionDate: '',
    contributorName: '',
    objectType: '',
    objectHead: '',
    description: '',
    measurement: '',
    galleryNumber: '',
    foundPlace: '',
    experimentFormula: '',
    significanceComment: '',
    correction: '',
    tags: '',
    isPublic: false,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageUrl = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const artifact = {
        ...formData,
        images: imageUrls.filter(url => url.trim() !== ''),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      };

      addArtifact(artifact);
      navigate('/admin/artifacts');
    } catch (error) {
      console.error('Error adding artifact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('addArtifactPage.header.title')}</h1>
        <p className="text-gray-600">{t('addArtifactPage.header.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('addArtifactPage.basicInformation.title')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.basicInformation.collectionNumber')}
                </label>
                <input
                  type="text"
                  name="collectionNumber"
                  value={formData.collectionNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.basicInformation.collectionNumberPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.basicInformation.accessionNumber')}
                </label>
                <input
                  type="text"
                  name="accessionNumber"
                  value={formData.accessionNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.basicInformation.accessionNumberPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.basicInformation.collectionDate')}
                </label>
                <input
                  type="date"
                  name="collectionDate"
                  value={formData.collectionDate}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.basicInformation.objectType')}
                </label>
                <select
                  name="objectType"
                  value={formData.objectType}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">{t('addArtifactPage.basicInformation.selectType')}</option>
                  <option value="Photograph">{t('addArtifactPage.basicInformation.objectTypes.photograph')}</option>
                  <option value="Document">{t('addArtifactPage.basicInformation.objectTypes.document')}</option>
                  <option value="Weapon">{t('addArtifactPage.basicInformation.objectTypes.weapon')}</option>
                  <option value="Uniform">{t('addArtifactPage.basicInformation.objectTypes.uniform')}</option>
                  <option value="Letter">{t('addArtifactPage.basicInformation.objectTypes.letter')}</option>
                  <option value="Medal">{t('addArtifactPage.basicInformation.objectTypes.medal')}</option>
                  <option value="Map">{t('addArtifactPage.basicInformation.objectTypes.map')}</option>
                  <option value="Audio Recording">{t('addArtifactPage.basicInformation.objectTypes.audioRecording')}</option>
                  <option value="Video">{t('addArtifactPage.basicInformation.objectTypes.video')}</option>
                  <option value="Other">{t('addArtifactPage.basicInformation.objectTypes.other')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.basicInformation.objectHead')}
                </label>
                <input
                  type="text"
                  name="objectHead"
                  value={formData.objectHead}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.basicInformation.objectHeadPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.basicInformation.description')}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.basicInformation.descriptionPlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('addArtifactPage.additionalDetails.title')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.additionalDetails.contributorName')}
                </label>
                <input
                  type="text"
                  name="contributorName"
                  value={formData.contributorName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.additionalDetails.contributorNamePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.additionalDetails.measurement')}
                </label>
                <input
                  type="text"
                  name="measurement"
                  value={formData.measurement}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.additionalDetails.measurementPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.additionalDetails.galleryNumber')}
                </label>
                <input
                  type="text"
                  name="galleryNumber"
                  value={formData.galleryNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.additionalDetails.galleryNumberPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.additionalDetails.foundPlace')}
                </label>
                <input
                  type="text"
                  name="foundPlace"
                  value={formData.foundPlace}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.additionalDetails.foundPlacePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.additionalDetails.experimentFormula')}
                </label>
                <input
                  type="text"
                  name="experimentFormula"
                  value={formData.experimentFormula}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.additionalDetails.experimentFormulaPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addArtifactPage.additionalDetails.tags')}
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder={t('addArtifactPage.additionalDetails.tagsPlaceholder')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('addArtifactPage.images.title')}</h2>
          <div className="space-y-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder={t('addArtifactPage.images.imageUrlPlaceholder')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageUrl}
              className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addArtifactPage.images.addAnotherImage')}</span>
            </button>
          </div>
        </div>

        {/* Significance & Notes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('addArtifactPage.significanceAndNotes.title')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('addArtifactPage.significanceAndNotes.significanceComment')}
              </label>
              <textarea
                name="significanceComment"
                value={formData.significanceComment}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                placeholder={t('addArtifactPage.significanceAndNotes.significanceCommentPlaceholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('addArtifactPage.significanceAndNotes.correctionNotes')}
              </label>
              <textarea
                name="correction"
                value={formData.correction}
                onChange={handleInputChange}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                placeholder={t('addArtifactPage.significanceAndNotes.correctionNotesPlaceholder')}
              />
            </div>
          </div>
        </div>

        {/* Publication Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('addArtifactPage.publicationSettings.title')}</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleInputChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
              {t('addArtifactPage.publicationSettings.makePublic')}
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {t('addArtifactPage.publicationSettings.draftMessage')}
          </p>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/artifacts')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t('addArtifactPage.actions.cancel')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('addArtifactPage.actions.adding') : t('addArtifactPage.actions.addArtifact')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArtifactPage;