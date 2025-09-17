import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Competition, CompetitionLevel, CompetitionStatus } from '../../types';
import { Link } from 'react-router-dom';

const CompetitionManagementPage: React.FC = () => {
  const { competitions, addCompetition, updateCompetition, deleteCompetition } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [formState, setFormState] = useState<Omit<Competition, 'id' | 'dateCreated'> & { id?: string }>({
    title: '',
    description: '',
    thumbnail: '',
    level: 'district',
    type: 'essay',
    eligibilityCriteria: '',
    startDate: '',
    endDate: '',
    judgingCriteria: '',
    rewards: '',
    status: 'draft',
    adminUserId: '2', // Default to archivist for now
  });

  const handleOpenModal = (competition?: Competition) => {
    if (competition) {
      setEditingCompetition(competition);
      setFormState({
        ...competition,
        startDate: competition.startDate.split('T')[0], // Format for input type="date"
        endDate: competition.endDate.split('T')[0],
      });
    } else {
      setEditingCompetition(null);
      setFormState({
        title: '',
        description: '',
        thumbnail: '',
        level: 'district',
        type: 'essay',
        eligibilityCriteria: '',
        startDate: '',
        endDate: '',
        judgingCriteria: '',
        rewards: '',
        status: 'draft',
        adminUserId: '2',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCompetition(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: name === 'maxParticipants' ? (value === '' ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCompetition) {
      updateCompetition(editingCompetition.id, {
        ...formState,
        startDate: new Date(formState.startDate).toISOString(),
        endDate: new Date(formState.endDate).toISOString(),
      });
    } else {
      addCompetition({
        ...formState,
        startDate: new Date(formState.startDate).toISOString(),
        endDate: new Date(formState.endDate).toISOString(),
      });
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Competition Management</h1>

      <button
        onClick={() => handleOpenModal()}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700 transition-colors"
      >
        Create New Competition
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Level
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {competitions.map(comp => (
              <tr key={comp.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <Link to={`/competitions/${comp.id}`} className="text-blue-600 hover:underline">
                    {comp.title}
                  </Link>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize">
                  {comp.level.replace('_', ' ')}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize">
                  {comp.status.replace('_', ' ')}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {new Date(comp.startDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {new Date(comp.endDate).toLocaleDateString()}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => handleOpenModal(comp)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCompetition(comp.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 w-96 shadow-lg rounded-md" style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
            <h3 className="text-lg font-bold mb-4 text-gray-900">{editingCompetition ? 'Edit Competition' : 'Create Competition'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" name="title" id="title" value={formState.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea name="description" id="description" value={formState.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">Thumbnail URL</label>
                <input type="url" name="thumbnail" id="thumbnail" value={(formState as any).thumbnail || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">Level</label>
                <select name="level" id="level" value={formState.level} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                  <option value="district">District</option>
                  <option value="division">Division</option>
                  <option value="national">National</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                <select name="type" id="type" value={(formState as any).type || 'essay'} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                  <option value="essay">Essay</option>
                  <option value="art">Art</option>
                  <option value="photography">Photography</option>
                  <option value="poem-writing">Poem Writing</option>
                  <option value="singing">Singing</option>
                  <option value="debate">Debate</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="eligibilityCriteria" className="block text-gray-700 text-sm font-bold mb-2">Eligibility Criteria</label>
                <textarea name="eligibilityCriteria" id="eligibilityCriteria" value={formState.eligibilityCriteria} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                <input type="date" name="startDate" id="startDate" value={formState.startDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                <input type="date" name="endDate" id="endDate" value={formState.endDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label htmlFor="judgingCriteria" className="block text-gray-700 text-sm font-bold mb-2">Judging Criteria</label>
                <textarea name="judgingCriteria" id="judgingCriteria" value={formState.judgingCriteria} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="rewards" className="block text-gray-700 text-sm font-bold mb-2">Rewards</label>
                <textarea name="rewards" id="rewards" value={formState.rewards} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                <select name="status" id="status" value={formState.status} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="judging">Judging</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="adminUserId" className="block text-gray-700 text-sm font-bold mb-2">Admin User ID</label>
                <input type="text" name="adminUserId" id="adminUserId" value={formState.adminUserId} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              {/* Optional fields */}
              <div className="mb-4">
                <label htmlFor="relatedExhibitionId" className="block text-gray-700 text-sm font-bold mb-2">Related Exhibition ID (optional)</label>
                <input type="text" name="relatedExhibitionId" id="relatedExhibitionId" value={(formState as any).relatedExhibitionId || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="nextCompetitionId" className="block text-gray-700 text-sm font-bold mb-2">Next Competition ID (optional)</label>
                <input type="text" name="nextCompetitionId" id="nextCompetitionId" value={(formState as any).nextCompetitionId || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-6">
                <label htmlFor="maxParticipants" className="block text-gray-700 text-sm font-bold mb-2">Max Participants (optional)</label>
                <input type="number" name="maxParticipants" id="maxParticipants" value={(formState as any).maxParticipants ?? ''} onChange={handleChange} min={1} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  {editingCompetition ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
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

export default CompetitionManagementPage;
