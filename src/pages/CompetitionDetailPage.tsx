import React, { useState } from 'react'; // Import useState
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import LoadingSpinner from '../components/common/LoadingSpinner';
import victoryBackground from '../assets/images/victory.jpg';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);
const MotionButton = motion.button;

const CompetitionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCompetitionById, competitionSubmissions, submitCompetitionEntry, withdrawCompetitionEntry } = useData(); // Also get withdrawCompetitionEntry
  const { user } = useAuth(); // Get the current user
  const { t, i18n } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission loading
  const [submitError, setSubmitError] = useState<string | null>(null); // State for submission error
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null); // State for submission success
  const [isWithdrawing, setIsWithdrawing] = useState(false); // State for withdrawal loading
  const [withdrawSuccess, setWithdrawSuccess] = useState<string | null>(null); // State for withdrawal success
  const [withdrawError, setWithdrawError] = useState<string | null>(null); // State for withdrawal error

  const competition = id ? getCompetitionById(id) : undefined;

  // Check if the current user has already submitted to this competition
  const userSubmission = competitionSubmissions.find(
    (sub) => sub.competitionId === id && sub.userId === user?.id
  );

  if (!competition) {
    return <LoadingSpinner />;
  }

  const isCompetitionOpen = (competition.status === 'open' || competition.status === 'judging') && new Date(competition.endDate) > new Date();

  const handleApply = async () => {
    if (!user || !id) return; // Should not happen if button is correctly conditional

    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmitting(true);

    try {
      submitCompetitionEntry({
        competitionId: id,
        userId: user.id,
      });
      setSubmitSuccess(t('competitionDetailPage.modal.applySuccess'));
      // No need to close modal immediately, let success message display
    } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setSubmitError(t('competitionDetailPage.modal.applyError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWithdraw = async () => {
    if (!user || !id || !userSubmission) return; // Should not happen if button is correctly conditional

    setWithdrawError(null);
    setWithdrawSuccess(null);
    setIsWithdrawing(true);

    try {
      withdrawCompetitionEntry(id, user.id);
      setWithdrawSuccess(t('competitionDetailPage.modal.withdrawSuccess'));
    } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setWithdrawError(t('competitionDetailPage.modal.withdrawError'));
    } finally {
      setIsWithdrawing(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitError(null);
    setSubmitSuccess(null);
    setWithdrawError(null);
    setWithdrawSuccess(null);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center text-white py-12"
      style={{
        backgroundImage: `url(${victoryBackground})`
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 bg-opacity-70 rounded-lg shadow-xl p-8 md:p-12">
          <MotionLink 
            to="/competitions" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-green-400 hover:text-green-500 mb-4 inline-block"
          >
            &larr; {t('competitionDetailPage.backToCompetitions')}
          </MotionLink>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center md:text-left">{competition.title}</h1>
          <p className="text-lg text-gray-200 mb-6 text-center md:text-left">{t('competitionDetailPage.levelPrefix')} <span className="capitalize">{t(`competitionsPage.levels.${competition.level}`)}</span></p>

          <div className="flex flex-col md:flex-row gap-8">
            {competition.thumbnail && (
              <div className="md:w-1/2 flex flex-col items-center">
                <img 
                  src={competition.thumbnail} 
                  alt={competition.title} 
                  className="w-full h-96 object-contain rounded-lg shadow-md mb-6"
                />
                <div className="w-full text-center">
                  {!user ? (
                    <MotionButton
                      onClick={() => navigate('/login')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
                    >
                      {t('competitionDetailPage.loginToJoin')}
                    </MotionButton>
                  ) : userSubmission ? (
                    <MotionButton
                      onClick={() => setIsModalOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors inline-block"
                    >
                      {t('competitionDetailPage.viewWithdrawApplication')}
                    </MotionButton>
                  ) : isCompetitionOpen ? (
                    <MotionButton
                      onClick={() => setIsModalOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors inline-block"
                    >
                      {t('competitionDetailPage.joinCompetition')}
                    </MotionButton>
                  ) : (
                    <p className="text-gray-400">{t('competitionDetailPage.competitionStatus', { status: t(`competitionDetailPage.competitionStatuses.${competition.status}`)})}</p>
                  )}
                </div>
              </div>
            )}

            <div className="md:w-1/2 flex flex-col justify-between">
              <div className="text-gray-200 leading-relaxed text-lg mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-white">{t('competitionDetailPage.descriptionTitle')}</h2>
                <p>{competition.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-white">{t('competitionDetailPage.eligibilityCriteriaTitle')}</h2>
                  <p>{competition.eligibilityCriteria}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-white">{t('competitionDetailPage.importantDatesTitle')}</h2>
                  <p><strong>{t('competitionDetailPage.startDate')}</strong> {new Date(competition.startDate).toLocaleDateString(i18n.language)}</p>
                  <p><strong>{t('competitionDetailPage.submissionDeadline')}</strong> {new Date(competition.endDate).toLocaleDateString(i18n.language)}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-white">{t('competitionDetailPage.judgingCriteriaTitle')}</h2>
                  <p>{competition.judgingCriteria}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-white">{t('competitionDetailPage.rewardsTitle')}</h2>
                  <p>{competition.rewards}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-8 w-96 shadow-lg rounded-md text-center bg-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              {userSubmission ? t('competitionDetailPage.modal.yourApplication') : t('competitionDetailPage.modal.confirmApplication')}
            </h3>
            {!userSubmission ? (
              <>
                <p className="text-gray-200 mb-6" dangerouslySetInnerHTML={{ __html: t('competitionDetailPage.modal.confirmMessage', { competitionTitle: competition.title }) }} />
                {submitError && <p className="text-red-400 text-sm mb-4">{submitError}</p>}
                {submitSuccess ? (
                  <p className="text-green-400 text-sm mb-4">{submitSuccess}</p>
                ) : (
                  <MotionButton
                    onClick={handleApply}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-2" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('competitionDetailPage.modal.applying') : t('competitionDetailPage.modal.applyNow')}
                  </MotionButton>
                )}
              </>
            ) : (
              <>
                <p className="text-green-400 font-semibold mb-4">{t('competitionDetailPage.modal.alreadyApplied')}</p>
                <p className="text-gray-200 mb-2">{t('competitionDetailPage.modal.applicationStatus')} <span className="capitalize">{userSubmission.status.replace('_', ' ')}</span></p>
                {userSubmission.score && <p className="text-gray-200 mb-2">{t('competitionDetailPage.modal.score')} {userSubmission.score}</p>}
                {userSubmission.feedback && <p className="text-gray-200 mb-4">{t('competitionDetailPage.modal.feedback')} {userSubmission.feedback}</p>}
                <p className="text-gray-200 text-sm">{t('competitionDetailPage.modal.appliedOn')} {new Date(userSubmission.submissionDate).toLocaleDateString(i18n.language)}</p>
                
                {withdrawSuccess ? (
                  <p className="text-green-400 text-sm mt-4">{withdrawSuccess}</p>
                ) : withdrawError ? (
                  <p className="text-red-400 text-sm mt-4">{withdrawError}</p>
                ) : (
                  <MotionButton
                    onClick={handleWithdraw}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-2" 
                    disabled={isWithdrawing}
                  >
                    {isWithdrawing ? t('competitionDetailPage.modal.withdrawing') : t('competitionDetailPage.modal.withdrawApplication')}
                  </MotionButton>
                )}
              </>
            )}
            <MotionButton
              onClick={closeModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {t('competitionDetailPage.modal.close')}
            </MotionButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionDetailPage;
