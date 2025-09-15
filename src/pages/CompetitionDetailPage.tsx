import React, { useState } from 'react'; // Import useState
import { useParams, /* Link, */ useNavigate } from 'react-router-dom';
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

  const isCompetitionOpen = competition.status === 'open' && new Date(competition.endDate) > new Date();

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
      className="min-h-screen bg-cover bg-fixed bg-center" 
      style={{ 
        backgroundImage: 'url(\'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/12/15/jadu_ghor_3-min.jpg\')' 
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4 text-white text-center bg-gray-800 bg-opacity-60 rounded-lg p-4">
          {competition.title}
        </h1>
        <p className="text-lg text-gray-200 mb-6 text-center bg-gray-800 bg-opacity-60 rounded-lg p-2">Level: <span className="capitalize">{competition.level.replace('_', ' ')}</span></p>

        <div className="mb-6 text-center">
          {!user ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-block"
            >
              Join Competition
            </button>
          ) : (
            <p className="text-gray-600">This competition is currently {competition.status}.</p>
          )}
        </div>

        <div className="bg-gray-200 bg-opacity-80 shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-3">Description</h2>
          <p className="text-gray-800 leading-relaxed">{competition.description}</p>
        </div>

        <div className="bg-gray-200 bg-opacity-80 shadow-lg rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Eligibility Criteria</h2>
            <p className="text-gray-800">{competition.eligibilityCriteria}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Important Dates</h2>
            <p><strong>Start Date:</strong> {new Date(competition.startDate).toLocaleDateString()}</p>
            <p><strong>Submission Deadline:</strong> {new Date(competition.endDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Judging Criteria</h2>
            <p className="text-gray-800">{competition.judgingCriteria}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Rewards</h2>
            <p className="text-gray-800">{competition.rewards}</p>
          </div>
        </div>

      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative p-8 w-96 shadow-lg rounded-md text-center" style={{ backgroundColor: 'rgba(240, 240, 240, 0.9)' }}> {/* Changed rgba to off-white, removed border */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4"> {/* Changed text-white to text-gray-900 */}
              {userSubmission ? 'Your Application' : 'Confirm Application'}
            </h3>
            {!userSubmission ? (
              <>
                <p className="text-gray-700 mb-6"> {/* Changed text-gray-200 to text-gray-700 */}
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
                <p className="text-green-700 font-semibold mb-4">You have successfully applied to this competition!</p> {/* Changed text-green-300 to text-green-700 */}
                <p className="text-gray-700 mb-2">Your application status: <span className="capitalize">{userSubmission.status.replace('_', ' ')}</span></p> {/* Changed text-gray-200 to text-gray-700 */}
                {userSubmission.score && <p className="text-gray-700 mb-2">Score: {userSubmission.score}</p>}
                {userSubmission.feedback && <p className="text-gray-700 mb-4">Feedback: {userSubmission.feedback}</p>}
                <p className="text-gray-700 text-sm">Applied on: {new Date(userSubmission.submissionDate).toLocaleDateString()}</p> {/* Changed text-gray-200 to text-gray-700 */}
                
                {withdrawSuccess ? (
                  <p className="text-green-700 text-sm mt-4">{withdrawSuccess}</p>
                ) : withdrawError ? (
                  <p className="text-red-700 text-sm mt-4">{withdrawError}</p>
                ) : (
                  <button
                    onClick={handleWithdraw}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 mr-2" // Added mr-2 for spacing
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
