import React, { useState } from 'react'; // Import useState
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import LoadingSpinner from '../components/common/LoadingSpinner';

const CompetitionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCompetitionById, competitionSubmissions, submitCompetitionEntry, withdrawCompetitionEntry } = useData(); // Also get withdrawCompetitionEntry
  const { user } = useAuth(); // Get the current user

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
      setSubmitSuccess('Your application has been successfully received!');
      // No need to close modal immediately, let success message display
    } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setSubmitError('Failed to apply. Please try again.');
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
      setWithdrawSuccess('Your application has been successfully withdrawn.');
    } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setWithdrawError('Failed to withdraw application. Please try again.');
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
      className="min-h-screen bg-cover bg-fixed bg-center text-gray-900 py-12"
      style={{ 
        backgroundImage: 'url(\'https://www.aiub.edu/Files/Uploads/original/arcaiubmus2305.jpeg\')' 
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-200 bg-opacity-80 rounded-lg shadow-xl p-8 md:p-12">
          <Link to="/competitions" className="text-gray-700 hover:text-gray-900 mb-4 inline-block">
            &larr; Back to Competitions
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center md:text-left">{competition.title}</h1>
          <p className="text-lg text-gray-700 mb-6 text-center md:text-left">Level: <span className="capitalize">{competition.level.replace('_', ' ')}</span></p>

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
                    <button
                      onClick={() => navigate('/login')}
                      className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
                    >
                      Log in to Join
                    </button>
                  ) : userSubmission ? (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors inline-block"
                    >
                      View/Withdraw Application
                    </button>
                  ) : isCompetitionOpen ? (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors inline-block"
                    >
                      Join Competition
                    </button>
                  ) : (
                    <p className="text-gray-600">This competition is currently {competition.status}.</p>
                  )}
                </div>
              </div>
            )}

            <div className="md:w-1/2 flex flex-col justify-between">
              <div className="text-gray-700 leading-relaxed text-lg mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900">Description</h2>
                <p>{competition.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-gray-900">Eligibility Criteria</h2>
                  <p>{competition.eligibilityCriteria}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-gray-900">Important Dates</h2>
                  <p><strong>Start Date:</strong> {new Date(competition.startDate).toLocaleDateString()}</p>
                  <p><strong>Submission Deadline:</strong> {new Date(competition.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-gray-900">Judging Criteria</h2>
                  <p>{competition.judgingCriteria}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl mb-2 text-gray-900">Rewards</h2>
                  <p>{competition.rewards}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-8 w-96 shadow-lg rounded-md text-center" style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {userSubmission ? 'Your Application' : 'Confirm Application'}
            </h3>
            {!userSubmission ? (
              <>
                <p className="text-gray-700 mb-6">
                  By clicking 'Apply Now', you confirm your interest in participating in the <br />
                  <span className="font-semibold">{competition.title}</span>. 
                  Submission details will be provided externally.
                </p>
                {submitError && <p className="text-red-700 text-sm mb-4">{submitError}</p>}
                {submitSuccess ? (
                  <p className="text-green-700 text-sm mb-4">{submitSuccess}</p>
                ) : (
                  <button
                    onClick={handleApply}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-2" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Applying...' : 'Apply Now'}
                  </button>
                )}
              </>
            ) : (
              <>
                <p className="text-green-700 font-semibold mb-4">You have successfully applied to this competition!</p>
                <p className="text-gray-700 mb-2">Your application status: <span className="capitalize">{userSubmission.status.replace('_', ' ')}</span></p>
                {userSubmission.score && <p className="text-gray-700 mb-2">Score: {userSubmission.score}</p>}
                {userSubmission.feedback && <p className="text-gray-700 mb-4">Feedback: {userSubmission.feedback}</p>}
                <p className="text-gray-700 text-sm">Applied on: {new Date(userSubmission.submissionDate).toLocaleDateString()}</p>
                
                {withdrawSuccess ? (
                  <p className="text-green-700 text-sm mt-4">{withdrawSuccess}</p>
                ) : withdrawError ? (
                  <p className="text-red-700 text-sm mt-4">{withdrawError}</p>
                ) : (
                  <button
                    onClick={handleWithdraw}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-2" 
                    disabled={isWithdrawing}
                  >
                    {isWithdrawing ? 'Withdrawing...' : 'Withdraw Application'}
                  </button>
                )}
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionDetailPage;
