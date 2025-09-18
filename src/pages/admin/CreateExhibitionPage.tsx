import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { exhibitions } from '../../exhibitionData';
import { Exhibition } from '../../types';
import { useTranslation } from 'react-i18next';

const CreateExhibitionPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Exhibition>>({
    title: '',
    description: '',
    curatorNote: '',
    featuredImage: '',
    artifactCount: 0,
    viewCount: 0,
    featured: false,
    dateCreated: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API.
    // For this demo, we'll simulate adding it to our local data.
    const newExhibition: Exhibition = {
      id: String(exhibitions.length + 1), // Simple ID generation
      ...formData,
      artifactCount: formData.artifactCount || 0,
      viewCount: formData.viewCount || 0,
      featured: formData.featured || false,
      dateCreated: formData.dateCreated || new Date().toISOString().split('T')[0],
    } as Exhibition;

    exhibitions.push(newExhibition); // Directly modifying the imported array for demo purposes
    console.log('New Exhibition Created:', newExhibition);
    navigate(`/exhibition/${newExhibition.id}`); // Navigate to the new exhibition's detail page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <PlusCircle className="w-8 h-8 mr-3 text-green-700" />
          {t('createExhibitionPage.header.title')}
        </h1>
        <p className="text-gray-600 mb-8">{t('createExhibitionPage.header.subtitle')}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('createExhibitionPage.form.titleLabel')}</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('createExhibitionPage.form.descriptionLabel')}</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="curatorNote" className="block text-sm font-medium text-gray-700">{t('createExhibitionPage.form.curatorNoteLabel')}</label>
            <textarea
              name="curatorNote"
              id="curatorNote"
              value={formData.curatorNote}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">{t('createExhibitionPage.form.featuredImageURLLabel')}</label>
            <input
              type="url"
              name="featuredImage"
              id="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="artifactCount" className="block text-sm font-medium text-gray-700">{t('createExhibitionPage.form.numberOfArtifactsLabel')}</label>
            <input
              type="number"
              name="artifactCount"
              id="artifactCount"
              value={formData.artifactCount}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex items-center">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
              {t('createExhibitionPage.form.featureCheckbox')}
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {t('createExhibitionPage.form.createButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExhibitionPage;
