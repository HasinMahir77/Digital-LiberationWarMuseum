import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const AddArtifactPage: React.FC = () => {
  const { addArtifact } = useData();
  const navigate = useNavigate();
  
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Artifact</h1>
        <p className="text-gray-600">Enter complete information for the new artifact</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Number *
                </label>
                <input
                  type="text"
                  name="collectionNumber"
                  value={formData.collectionNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="LW-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accession Number *
                </label>
                <input
                  type="text"
                  name="accessionNumber"
                  value={formData.accessionNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="ACC-1971-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collection Date *
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
                  Object Type *
                </label>
                <select
                  name="objectType"
                  value={formData.objectType}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Type</option>
                  <option value="Photograph">Photograph</option>
                  <option value="Document">Document</option>
                  <option value="Weapon">Weapon</option>
                  <option value="Uniform">Uniform</option>
                  <option value="Letter">Letter</option>
                  <option value="Medal">Medal</option>
                  <option value="Map">Map</option>
                  <option value="Audio Recording">Audio Recording</option>
                  <option value="Video">Video</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Object Head (Title) *
                </label>
                <input
                  type="text"
                  name="objectHead"
                  value={formData.objectHead}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="Enter a descriptive title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="Detailed description of the artifact"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Additional Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contributor Name *
                </label>
                <input
                  type="text"
                  name="contributorName"
                  value={formData.contributorName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="Name of person or organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Measurement
                </label>
                <input
                  type="text"
                  name="measurement"
                  value={formData.measurement}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., 8 x 10 inches"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Number
                </label>
                <input
                  type="text"
                  name="galleryNumber"
                  value={formData.galleryNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="G-01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Found Place *
                </label>
                <input
                  type="text"
                  name="foundPlace"
                  value={formData.foundPlace}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="Location where artifact was found"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experiment Formula
                </label>
                <input
                  type="text"
                  name="experimentFormula"
                  value={formData.experimentFormula}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="If applicable"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="Comma-separated tags"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Images</h2>
          <div className="space-y-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder="Enter image URL"
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
              <span>Add Another Image</span>
            </button>
          </div>
        </div>

        {/* Significance & Notes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Significance & Notes</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Significance Comment *
              </label>
              <textarea
                name="significanceComment"
                value={formData.significanceComment}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="Explain the historical significance of this artifact"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correction Notes
              </label>
              <textarea
                name="correction"
                value={formData.correction}
                onChange={handleInputChange}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="Any corrections or additional notes"
              />
            </div>
          </div>
        </div>

        {/* Publication Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Publication Settings</h2>
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
              Make this artifact publicly visible
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Unchecked items will be saved as drafts and visible only to administrators
          </p>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/artifacts')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Artifact'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArtifactPage;