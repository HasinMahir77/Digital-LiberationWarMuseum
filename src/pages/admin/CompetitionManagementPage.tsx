import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Competition, CompetitionLevel, CompetitionStatus } from '../../types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CompetitionManagementPage: React.FC = () => {
  const { competitions, addCompetition, updateCompetition, deleteCompetition } = useData();
  const { t } = useTranslation();
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
      <h1 className="text-3xl font-bold mb-6">{t('competitionManagementPage.header.title')}</h1>

      <button
        onClick={() => handleOpenModal()}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-green-700 transition-colors"
      >
        {t('competitionManagementPage.header.createNewCompetition')}
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('competitionManagementPage.table.titleColumn')}
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('competitionManagementPage.table.levelColumn')}
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('competitionManagementPage.table.statusColumn')}
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('competitionManagementPage.table.startDateColumn')}
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('competitionManagementPage.table.endDateColumn')}
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('competitionManagementPage.table.actionsColumn')}
              </th>
            </tr>
          </thead>
          <tbody>
            {competitions.map(comp => (
              <tr key={comp.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <Link to={`/competitions/${comp.id}`} className="text-blue-600 hover:underline">
                    {t(comp.title)}
                  </Link>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize">
                  {t(`competitionManagementPage.modal.levelOptions.${comp.level}`)}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize">
                  {t(`competitionManagementPage.modal.statusOptions.${comp.status}`)}
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
                    {t('competitionManagementPage.table.editAction')}
                  </button>
                  <button
                    onClick={() => deleteCompetition(comp.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {t('competitionManagementPage.table.deleteAction')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" id="my-modal">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl">
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b rounded-t-2xl bg-white">
              <h3 className="text-xl font-semibold text-gray-900">{editingCompetition ? t('competitionManagementPage.modal.editTitle') : t('competitionManagementPage.modal.createTitle')}</h3>
              <button type="button" onClick={handleCloseModal} aria-label="Close" className="text-gray-500 hover:text-gray-700">{t('competitionManagementPage.modal.close')}</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.titleLabel')}</label>
                    <input type="text" name="title" id="title" value={formState.title} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.thumbnailURLLabel')}</label>
                    <input type="url" name="thumbnail" id="thumbnail" value={(formState as any).thumbnail || ''} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.descriptionLabel')}</label>
                    <textarea name="description" id="description" value={formState.description} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={3} required></textarea>
                  </div>
                  <div>
                    <label htmlFor="level" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.levelLabel')}</label>
                    <select name="level" id="level" value={formState.level} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required>
                      <option value="district">{t('competitionManagementPage.modal.levelOptions.district')}</option>
                      <option value="division">{t('competitionManagementPage.modal.levelOptions.division')}</option>
                      <option value="national">{t('competitionManagementPage.modal.levelOptions.national')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.typeLabel')}</label>
                    <select name="type" id="type" value={(formState as any).type || 'essay'} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required>
                      <option value="essay">{t('competitionManagementPage.modal.typeOptions.essay')}</option>
                      <option value="art">{t('competitionManagementPage.modal.typeOptions.art')}</option>
                      <option value="photography">{t('competitionManagementPage.modal.typeOptions.photography')}</option>
                      <option value="poem-writing">{t('competitionManagementPage.modal.typeOptions.poemWriting')}</option>
                      <option value="singing">{t('competitionManagementPage.modal.typeOptions.singing')}</option>
                      <option value="debate">{t('competitionManagementPage.modal.typeOptions.debate')}</option>
                      <option value="quiz">{t('competitionManagementPage.modal.typeOptions.quiz')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="startDate" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.startDateLabel')}</label>
                    <input type="date" name="startDate" id="startDate" value={formState.startDate} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.endDateLabel')}</label>
                    <input type="date" name="endDate" id="endDate" value={formState.endDate} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="eligibilityCriteria" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.eligibilityCriteriaLabel')}</label>
                    <textarea name="eligibilityCriteria" id="eligibilityCriteria" value={formState.eligibilityCriteria} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={2} required></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="judgingCriteria" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.judgingCriteriaLabel')}</label>
                    <textarea name="judgingCriteria" id="judgingCriteria" value={formState.judgingCriteria} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={2} required></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="rewards" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.rewardsLabel')}</label>
                    <textarea name="rewards" id="rewards" value={formState.rewards} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={2} required></textarea>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.statusLabel')}</label>
                    <select name="status" id="status" value={formState.status} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required>
                      <option value="draft">{t('competitionManagementPage.modal.statusOptions.draft')}</option>
                      <option value="open">{t('competitionManagementPage.modal.statusOptions.open')}</option>
                      <option value="closed">{t('competitionManagementPage.modal.statusOptions.closed')}</option>
                      <option value="judging">{t('competitionManagementPage.modal.statusOptions.judging')}</option>
                      <option value="completed">{t('competitionManagementPage.modal.statusOptions.completed')}</option>
                      <option value="upcoming">{t('competitionManagementPage.modal.statusOptions.upcoming')}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="adminUserId" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.adminUserIDLabel')}</label>
                    <input type="text" name="adminUserId" id="adminUserId" value={formState.adminUserId} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label htmlFor="relatedExhibitionId" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.relatedExhibitionIDLabel')}</label>
                    <input type="text" name="relatedExhibitionId" id="relatedExhibitionId" value={(formState as any).relatedExhibitionId || ''} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="nextCompetitionId" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.nextCompetitionIDLabel')}</label>
                    <input type="text" name="nextCompetitionId" id="nextCompetitionId" value={(formState as any).nextCompetitionId || ''} onChange={handleChange} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label htmlFor="maxParticipants" className="block text-gray-700 text-sm font-medium mb-1">{t('competitionManagementPage.modal.maxParticipantsLabel')}</label>
                    <input type="number" name="maxParticipants" id="maxParticipants" value={(formState as any).maxParticipants ?? ''} onChange={handleChange} min={1} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 flex items-center justify-end gap-2 px-6 py-4 border-t bg-white rounded-b-2xl">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">{t('competitionManagementPage.modal.cancelButton')}</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">{editingCompetition ? t('competitionManagementPage.modal.updateButton') : t('competitionManagementPage.modal.createButton')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionManagementPage;
