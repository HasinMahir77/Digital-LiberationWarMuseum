import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Eye, GalleryVertical, BookOpenText } from 'lucide-react';
import { exhibitions } from '../exhibitionData'; // Import the centralized data
import { Exhibition } from '../types'; // Import the Exhibition interface
import LoadingSpinner from '../components/common/LoadingSpinner';

const ExhibitionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [exhibition, setExhibition] = React.useState<Exhibition | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Simulate fetching data
    const fetchExhibition = () => {
      setLoading(true);
      setError(null);
      try {
        const foundExhibition = exhibitions.find(e => e.id === id);
        if (foundExhibition) {
          setExhibition(foundExhibition);
        } else {
          setError('Exhibition not found');
        }
      } catch (err) {
        setError('Failed to load exhibition');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibition();
  }, [id]);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-red-400">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-lg mb-6">{error}</p>
        <Link to="/exhibitions" className="text-green-500 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Exhibitions
        </Link>
      </div>
    );
  }

  if (!exhibition) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Exhibition Not Found</h2>
        <p className="text-lg mb-6 text-gray-200">The exhibition you are looking for does not exist.</p>
        <Link to="/exhibitions" className="text-green-500 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Exhibitions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/exhibitions"
          className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Exhibitions
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={exhibition.featuredImage}
            alt={exhibition.title}
            className="w-full h-96 object-cover object-center"
          />
          <div className="p-8 lg:p-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {exhibition.title}
            </h1>
            <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
              <span className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1" />
                {new Date(exhibition.dateCreated).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {exhibition.viewCount.toLocaleString()} Views
              </span>
              <span className="flex items-center">
                <GalleryVertical className="w-4 h-4 mr-1" />
                {exhibition.artifactCount} Artifacts
              </span>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
              <p>{exhibition.description}</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-green-800 flex items-center mb-3">
                <BookOpenText className="w-6 h-6 mr-2" />
                Curator's Note
              </h3>
              <p className="text-green-700 italic">
                "{exhibition.curatorNote}"
              </p>
            </div>

            {/* Placeholder for artifacts section - to be implemented later */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artifacts in this Exhibition</h2>
              <p className="text-gray-600">Artifacts related to this exhibition will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetailPage;
