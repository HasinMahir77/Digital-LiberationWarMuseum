import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { NewsArticle } from '../../types';

const NewsManagementPage: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useData();
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
      <h1 className="text-3xl font-bold mb-6">News Management</h1>

      <button
        onClick={() => openModal()}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700 transition-colors"
      >
        Create News Article
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map(n => (
              <tr key={n.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{n.title}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{n.author}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(n.date).toLocaleDateString()}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => openModal(n)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button onClick={() => deleteNews(n.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md" style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
            <h3 className="text-lg font-bold mb-4 text-gray-900">{editingNews ? 'Edit News' : 'Create News'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" name="title" id="title" value={formState.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author</label>
                <input type="text" name="author" id="author" value={formState.author} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                <input type="date" name="date" id="date" value={formState.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                <input type="url" name="imageUrl" id="imageUrl" value={formState.imageUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="summary" className="block text-gray-700 text-sm font-bold mb-2">Summary</label>
                <textarea name="summary" id="summary" value={formState.summary} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                <textarea name="content" id="content" value={formState.content} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags (comma-separated)</label>
                <input type="text" name="tags" id="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                  {editingNews ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagementPage;


