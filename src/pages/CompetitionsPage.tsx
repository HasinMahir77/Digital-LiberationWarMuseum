import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const CompetitionsPage: React.FC = () => {
  const { competitions } = useData();

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center" 
      style={{ 
        backgroundImage: 'url(\'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/12/15/jadu_ghor_3-min.jpg\')' 
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6 text-white text-center bg-gray-800 bg-opacity-60 rounded-lg p-4">
          Competitions
        </h1>

        {competitions.length === 0 ? (
          <p className="text-white text-center text-lg bg-gray-800 bg-opacity-60 rounded-lg p-4">
            No competitions available at the moment. Please check back later!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions
              .filter(comp => comp.status !== 'draft' && comp.status !== 'completed') // Filter out draft and completed competitions
              .map((comp) => (
              <Link 
                to={`/competitions/${comp.id}`}
                key={comp.id}
                className="block bg-gray-200 bg-opacity-80 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden"
              >
                <img src={comp.thumbnail} alt={comp.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{comp.title}</h2>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">{comp.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="capitalize">Level: {comp.level.replace('_', ' ')}</span>
                    <span className="capitalize">Status: {comp.status.replace('_', ' ')}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Ends: {new Date(comp.endDate).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionsPage;
