import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Competition } from '../types';
import victoryBackground from '../assets/images/victory.jpg';

const CompetitionsPage: React.FC = () => {
  const { competitions } = useData();
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);

  const getCompetitionTimeCategory = (competition: Competition) => {
    const now = new Date();
    const startDate = new Date(competition.startDate);
    const endDate = new Date(competition.endDate);

    if (now < startDate) {
      return 'upcoming';
    } else if (now >= startDate && now <= endDate) {
      return 'current';
    } else {
      return 'past';
    }
  };

  const filterCompetitions = () => {
    return competitions.filter(comp => {
      const matchesTime = selectedTime.length === 0 || selectedTime.includes(getCompetitionTimeCategory(comp));
      const matchesType = selectedType.length === 0 || selectedType.includes(comp.type);
      const matchesLevel = selectedLevel.length === 0 || selectedLevel.includes(comp.level);

      return matchesTime && matchesType && matchesLevel && comp.status !== 'draft' && comp.status !== 'completed';
    });
  };

  const handleTimeChange = (timeCategory: string) => {
    setSelectedTime(prev => 
      prev.includes(timeCategory) ? prev.filter(t => t !== timeCategory) : [...prev, timeCategory]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const competitionTimes = Array.from(new Set(competitions.map(getCompetitionTimeCategory)));
  const competitionTypes = Array.from(new Set(competitions.map(comp => comp.type)));
  const competitionLevels = Array.from(new Set(competitions.map(comp => comp.level)));

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center text-gray-900 py-12"
      style={{ 
        backgroundImage: `url(${victoryBackground})`
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white bg-gray-800 bg-opacity-60 rounded-lg p-4">
          Competitions
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Filters */}
          <div className="md:w-1/4 bg-gray-800 bg-opacity-70 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Filters</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Filter by Time</label>
                <div className="space-y-2">
                  {competitionTimes.map(timeCategory => (
                    <div key={timeCategory} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`time-${timeCategory}`}
                        name="competitionTime"
                        value={timeCategory}
                        checked={selectedTime.includes(timeCategory)}
                        onChange={() => handleTimeChange(timeCategory)}
                        className="h-4 w-4 text-green-500 border-gray-600 rounded focus:ring-green-500 bg-gray-700"
                      />
                      <label htmlFor={`time-${timeCategory}`} className="ml-2 text-sm text-gray-200 capitalize">{timeCategory}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Filter by Type</label>
                <div className="space-y-2">
                  {competitionTypes.map(type => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`type-${type}`}
                        name="competitionType"
                        value={type}
                        checked={selectedType.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="h-4 w-4 text-green-500 border-gray-600 rounded focus:ring-green-500 bg-gray-700"
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-200 capitalize">{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Filter by Level</label>
                <div className="space-y-2">
                  {competitionLevels.map(level => (
                    <div key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`level-${level}`}
                        name="competitionLevel"
                        value={level}
                        checked={selectedLevel.includes(level)}
                        onChange={() => handleLevelChange(level)}
                        className="h-4 w-4 text-green-500 border-gray-600 rounded focus:ring-green-500 bg-gray-700"
                      />
                      <label htmlFor={`level-${level}`} className="ml-2 text-sm text-gray-200 capitalize">{level.replace('_', ' ')}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area for Competitions */}
          <div className="md:w-3/4">
            {filterCompetitions().length === 0 ? (
              <p className="text-white text-center text-lg bg-gray-800 bg-opacity-60 rounded-lg p-4">
                No competitions match your current filters. Please adjust your selections.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filterCompetitions()
                  .map((comp) => (
                  <Link 
                    to={`/competitions/${comp.id}`}
                    key={comp.id}
                    className="block bg-gray-800 bg-opacity-70 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden"
                  >
                    <img src={comp.thumbnail} alt={comp.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-white mb-2">{comp.title}</h2>
                      <p className="text-gray-200 text-sm mb-3 line-clamp-3">{comp.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-200">
                        <span className="capitalize">Level: {comp.level.replace('_', ' ')}</span>
                        <span className="capitalize">Status: {comp.status.replace('_', ' ')}</span>
                      </div>
                      <p className="text-xs text-gray-200 mt-2">Ends: {new Date(comp.endDate).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsPage;
