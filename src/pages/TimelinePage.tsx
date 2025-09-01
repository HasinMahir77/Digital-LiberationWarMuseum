import React, { useState } from 'react';
import { Calendar, MapPin, Users, Target } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  type: 'political' | 'military' | 'social' | 'international';
  artifacts: string[];
  year: string;
}

  const TimelinePage: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState('1970');

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: '1970-12-07',
      title: 'National Assembly Elections',
      description: 'The Awami League, led by Sheikh Mujibur Rahman, wins a landslide victory in the National Assembly elections.',
      location: 'Pakistan',
      type: 'political',
      artifacts: [],
      year: '1970',
    },
    {
      id: '2',
      date: '1971-01-03',
      title: 'Leaders Vow to Implement Programs',
      description: 'Sheikh Mujib and other leaders meet at Ramna Race Course, vowing to implement the six-point program and an 11-point charter.',
      location: 'Dhaka, Bangladesh',
      type: 'political',
      artifacts: [],
      year: '1971',
    },
    {
      id: '3',
      date: '1971-03-07',
      title: 'Historic Speech at Race Course Ground',
      description: 'Sheikh Mujib delivers a historic speech at Race Course Ground (now Suhrawardy Udyan), calling for civil disobedience and hinting at independence.',
      location: 'Dhaka, Bangladesh',
      type: 'political',
      artifacts: ['1'],
      year: '1971',
    },
    {
      id: '4',
      date: '1971-03-25',
      title: 'Operation Searchlight Initiated',
      description: 'The Pakistan Army initiates Operation Searchlight, a violent crackdown in Dhaka and other regions.',
      location: 'East Pakistan (Bangladesh)',
      type: 'military',
      artifacts: [],
      year: '1971',
    },
    {
      id: '5',
      date: '1971-03-26',
      title: 'Declaration of Independence',
      description: 'Sheikh Mujib declares Bangladesh\'s independence before his arrest by Pakistani forces.',
      location: 'Dhaka, Bangladesh',
      type: 'political',
      artifacts: ['2'],
      year: '1971',
    },
    {
      id: '6',
      date: '1971-04-10',
      title: 'Provisional Government Formed',
      description: 'A provisional government-in-exile is formed, with Sheikh Mujib as President and Tajuddin Ahmad as Prime Minister.',
      location: 'Mujibnagar, Bangladesh',
      type: 'political',
      artifacts: [],
      year: '1971',
    },
    {
      id: '7',
      date: '1971-08-16',
      title: 'Operation Jackpot Executed',
      description: 'Operation Jackpot is executed by Mukti Bahini naval commandos, targeting Pakistani naval ships.',
      location: 'Various naval bases',
      type: 'military',
      artifacts: [],
      year: '1971',
    },
    {
      id: '8',
      date: '1971-12-03',
      title: 'India Joins the War',
      description: 'India officially joins the war after pre-emptive attacks by Pakistan on western borders.',
      location: 'Indo-Pakistani Border',
      type: 'international',
      artifacts: [],
      year: '1971',
    },
    {
      id: '9',
      date: '1971-12-16',
      title: 'Victory Day - Liberation of Bangladesh',
      description: 'Pakistan surrenders, ending the nine-month war. An estimated 3 million people died in Bangladesh.',
      location: 'Dhaka, Bangladesh',
      type: 'military',
      artifacts: ['1'],
      year: '1971',
    },
    {
      id: '10',
      date: '1972-01-10',
      title: 'Sheikh Mujib Returns to Dhaka',
      description: 'Sheikh Mujib returns to Dhaka after being released from Pakistani custody.',
      location: 'Dhaka, Bangladesh',
      type: 'political',
      artifacts: [],
      year: '1972',
    },
    {
      id: '11',
      date: '1972-01-12',
      title: 'Sheikh Mujib Becomes Prime Minister',
      description: 'Sheikh Mujib becomes the Prime Minister of Bangladesh.',
      location: 'Dhaka, Bangladesh',
      type: 'political',
      artifacts: [],
      year: '1972',
    },
    {
      id: '12',
      date: '1972-11-04',
      title: 'Constitution of Bangladesh Adopted',
      description: 'The Constitution of Bangladesh is adopted.',
      location: 'Dhaka, Bangladesh',
      type: 'political',
      artifacts: [],
      year: '1972',
    },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'political':
        return <Users className="w-5 h-5" />;
      case 'military':
        return <Target className="w-5 h-5" />;
      case 'social':
        return <Calendar className="w-5 h-5" />;
      case 'international':
        return <MapPin className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'political':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'military':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'social':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'international':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Liberation War Timeline
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow the chronological events of Bangladesh's struggle for independence from March to December 1971
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            {['1970', '1971', '1972'].map((year) => (
              <button
                key={year}
                onClick={() => {
                  const element = document.getElementById(`year-${year}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                  setSelectedYear(year);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedYear === year
                    ? 'bg-green-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          {/* Timeline Events */}
          <div className="space-y-8">
            {['1970', '1971', '1972'].map((year) => (
              <div key={year} id={`year-${year}`} className="pt-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
                  {year}
                </h2>
                {timelineEvents.filter((event) => event.year === year).map((event, index) => (
                  <div key={event.id} className="relative flex items-start space-x-6 mb-8 last:mb-0">
                    {/* Timeline Marker */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getEventColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {event.artifacts.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Related Artifacts</h4>
                          <div className="flex space-x-2">
                            {event.artifacts.map((artifactId) => (
                              <span
                                key={artifactId}
                                className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs"
                              >
                                LW-{artifactId.padStart(3, '0')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Further</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Figures</h3>
              <p className="text-gray-600 mb-4">
                Learn about the important personalities who shaped Bangladesh's independence movement.
              </p>
              <button className="text-green-700 hover:text-green-800 font-medium text-sm">
                View Key Figures →
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Battle Maps</h3>
              <p className="text-gray-600 mb-4">
                Explore interactive maps showing major battles and strategic movements during the war.
              </p>
              <button className="text-green-700 hover:text-green-800 font-medium text-sm">
                View Battle Maps →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;