import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { NewsArticle } from '../../types';
import { useTranslation } from 'react-i18next';

const NewsManagementPage: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useData();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [formState, setFormState] = useState<Omit<NewsArticle, 'id'>>({
    title: '',
    imageUrl: '',
    date: '',
    author: '',
    summary: '',
    content: '',
    tags: [],
  });
  const [tagsInput, setTagsInput] = useState<string>('');

  const openModal = (newsToEdit?: NewsArticle) => {
    if (newsToEdit) {
      setEditingNews(newsToEdit);
      setFormState({
        title: newsToEdit.title,
        imageUrl: newsToEdit.imageUrl,
        date: newsToEdit.date,
        author: newsToEdit.author,
        summary: newsToEdit.summary,
        content: newsToEdit.content,
        tags: newsToEdit.tags,
      });
      setTagsInput(newsToEdit.tags.join(', '));
    } else {
      setEditingNews(null);
      setFormState({ title: '', imageUrl: '', date: '', author: '', summary: '', content: '', tags: [] });
      setTagsInput('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (editingNews) {
      updateNews(editingNews.id, { ...formState, tags });
    } else {
      addNews({ ...formState, tags });
    }
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{t('newsManagementPage.header.title')}</h1>

      <button
        onClick={() => openModal()}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700 transition-colors"
      >
        {t('newsManagementPage.header.createNewArticle')}
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('newsManagementPage.table.titleColumn')}</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('newsManagementPage.table.authorColumn')}</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('newsManagementPage.table.dateColumn')}</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('newsManagementPage.table.actionsColumn')}</th>
            </tr>
          </thead>
          <tbody>
            {news.map(n => (
              <tr key={n.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{n.title}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{n.author}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(n.date).toLocaleDateString()}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => openModal(n)} className="text-indigo-600 hover:text-indigo-900 mr-3">{t('newsManagementPage.table.editAction')}</button>
                  <button onClick={() => deleteNews(n.id)} className="text-red-600 hover:text-red-900">{t('newsManagementPage.table.deleteAction')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b rounded-t-2xl bg-white">
              <h3 className="text-xl font-semibold text-gray-900">{editingNews ? t('newsManagementPage.modal.editTitle') : t('newsManagementPage.modal.createTitle')}</h3>
              <button type="button" onClick={closeModal} aria-label="Close" className="text-gray-500 hover:text-gray-700">{t('newsManagementPage.modal.close')}</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-1">{t('newsManagementPage.modal.titleLabel')}</label>
                    <input type="text" name="title" id="title" value={formState.title} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label htmlFor="author" className="block text-gray-700 text-sm font-medium mb-1">{t('newsManagementPage.modal.authorLabel')}</label>
                    <input type="text" name="author" id="author" value={formState.author} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-1">{t('newsManagementPage.modal.dateLabel')}</label>
                    <input type="date" name="date" id="date" value={formState.date} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-medium mb-1">{t('newsManagementPage.modal.imageUrlLabel')}</label>
                    <input type="url" name="imageUrl" id="imageUrl" value={formState.imageUrl} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="summary" className="block text-gray-700 text-sm font-medium mb-1">{t('newsManagementPage.modal.summaryLabel')}</label>
                    <textarea name="summary" id="summary" value={formState.summary} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={2} required></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="content" className="block text-gray-700 text-sm font-medium mb-1">{t('newsManagementPage.modal.contentLabel')}</label>
                    <textarea name="content" id="content" value={formState.content} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={6} required></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="tags" className="block text-gray-700 text-sm font-medium mb-1">{t('newsManagementPage.modal.tagsLabel')}</label>
                    <input type="text" name="tags" id="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 flex items-center justify-end gap-2 px-6 py-4 border-t bg-white rounded-b-2xl">
                <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">{t('newsManagementPage.modal.cancelButton')}</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">{editingNews ? t('newsManagementPage.modal.updateButton') : t('newsManagementPage.modal.createButton')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagementPage;


