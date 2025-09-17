import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { MuseumEvent } from '../../types';

const EventManagementPage: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<MuseumEvent | null>(null);
  const [formState, setFormState] = useState<Omit<MuseumEvent, 'id' | 'dateCreated'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    type: '',
    description: '',
    imageUrl: '',
  });

  const openModal = (eventToEdit?: MuseumEvent) => {
    if (eventToEdit) {
      setEditingEvent(eventToEdit);
      setFormState({
        title: eventToEdit.title,
        date: eventToEdit.date,
        time: eventToEdit.time,
        location: eventToEdit.location,
        type: eventToEdit.type,
        description: eventToEdit.description,
        imageUrl: eventToEdit.imageUrl || '',
      });
    } else {
      setEditingEvent(null);
      setFormState({
        title: '',
        date: '',
        time: '',
        location: '',
        type: '',
        description: '',
        imageUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, { ...formState });
    } else {
      addEvent({ ...formState });
    }
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Event Management</h1>

      <button
        onClick={() => openModal()}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700 transition-colors"
      >
        Create New Event
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(evt => (
              <tr key={evt.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{evt.title}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{evt.date}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{evt.time}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{evt.type}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{evt.location}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => openModal(evt)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button onClick={() => deleteEvent(evt.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center p-4 z-50">
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{editingEvent ? 'Edit Event' : 'Create Event'}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-3xl leading-none font-semibold">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" name="title" id="title" value={formState.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                <input type="date" name="date" id="date" value={formState.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time</label>
                <input type="text" name="time" id="time" placeholder="e.g., 10:00-14:00 BST" value={formState.time} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                <input type="text" name="location" id="location" value={formState.location} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div>
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                <input type="text" name="type" id="type" value={formState.type} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                <input type="url" name="imageUrl" id="imageUrl" value={formState.imageUrl} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea name="description" id="description" value={formState.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" required></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end items-center mt-4">
                <button type="button" onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagementPage;


