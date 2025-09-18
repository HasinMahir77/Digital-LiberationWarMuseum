import React, { useState } from 'react';
import { Calendar, MapPin, Users, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation();

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: '1970-12-07',
      title: 'timelinePage.event1.title',
      description: 'timelinePage.event1.description',
      location: 'timelinePage.event1.location',
      type: 'political',
      artifacts: [],
      year: '1970',
    },
    {
      id: '2',
      date: '1971-01-03',
      title: 'timelinePage.event2.title',
      description: 'timelinePage.event2.description',
      location: 'timelinePage.event2.location',
      type: 'political',
      artifacts: [],
      year: '1971',
    },
    {
      id: '3',
      date: '1971-03-07',
      title: 'timelinePage.event3.title',
      description: 'timelinePage.event3.description',
      location: 'timelinePage.event3.location',
      type: 'political',
      artifacts: ['1'],
      year: '1971',
    },
    {
      id: '4',
      date: '1971-03-25',
      title: 'timelinePage.event4.title',
      description: 'timelinePage.event4.description',
      location: 'timelinePage.event4.location',
      type: 'military',
      artifacts: [],
      year: '1971',
    },
    {
      id: '5',
      date: '1971-03-26',
      title: 'timelinePage.event5.title',
      description: 'timelinePage.event5.description',
      location: 'timelinePage.event5.location',
      type: 'political',
      artifacts: ['2'],
      year: '1971',
    },
    {
      id: '6',
      date: '1971-04-10',
      title: 'timelinePage.event6.title',
      description: 'timelinePage.event6.description',
      location: 'timelinePage.event6.location',
      type: 'political',
      artifacts: [],
      year: '1971',
    },
    {
      id: '7',
      date: '1971-08-16',
      title: 'timelinePage.event7.title',
      description: 'timelinePage.event7.description',
      location: 'timelinePage.event7.location',
      type: 'military',
      artifacts: [],
      year: '1971',
    },
    {
      id: '8',
      date: '1971-12-03',
      title: 'timelinePage.event8.title',
      description: 'timelinePage.event8.description',
      location: 'timelinePage.event8.location',
      type: 'international',
      artifacts: [],
      year: '1971',
    },
    {
      id: '9',
      date: '1971-12-16',
      title: 'timelinePage.event9.title',
      description: 'timelinePage.event9.description',
      location: 'timelinePage.event9.location',
      type: 'military',
      artifacts: ['1'],
      year: '1971',
    },
    {
      id: '10',
      date: '1972-01-10',
      title: 'timelinePage.event10.title',
      description: 'timelinePage.event10.description',
      location: 'timelinePage.event10.location',
      type: 'political',
      artifacts: [],
      year: '1972',
    },
    {
      id: '11',
      date: '1972-01-12',
      title: 'timelinePage.event11.title',
      description: 'timelinePage.event11.description',
      location: 'timelinePage.event11.location',
      type: 'political',
      artifacts: [],
      year: '1972',
    },
    {
      id: '12',
      date: '1972-11-04',
      title: 'timelinePage.event12.title',
      description: 'timelinePage.event12.description',
      location: 'timelinePage.event12.location',
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
        return 'bg-blue-900 text-blue-200 border-blue-700';
      case 'military':
        return 'bg-red-900 text-red-200 border-red-700';
      case 'social':
        return 'bg-green-900 text-green-200 border-green-700';
      case 'international':
        return 'bg-purple-900 text-purple-200 border-purple-700';
      default:
        return 'bg-gray-900 text-gray-200 border-gray-700';
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center" 
      style={{ 
        backgroundImage: `url('https://flass.ewubd.edu/storage/app/uploads/public/5d3/5a2/c0d/5d35a2c0dd4e6880131580.jpg')` 
      }}
    >
      {/* Hero Section */}
      <section className="relative h-48 flex items-center mb-8">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl font-bold text-white">{t('timelinePage.hero.title')}</h1>
        </div>
      </section>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Removed as Hero Section already has the title */}
        {/* <div className="text-center mb-12 bg-black bg-opacity-30 rounded-lg p-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('timelinePage.hero.title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {t('timelinePage.hero.subtitle')}
          </p>
        </div> */}

        {/* Year Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 bg-opacity-70 rounded-lg shadow-md border border-gray-700 p-1">
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
                    ? 'bg-green-600 text-white'
                    : 'text-gray-200 hover:bg-gray-700'
                }`}
              >
                {t(`timelinePage.year.${year}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative bg-black bg-opacity-20 rounded-lg p-8">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700 z-0"></div>

          {/* Timeline Events */}
          <div className="space-y-8">
            {['1970', '1971', '1972'].map((year) => (
              <div key={year} id={`year-${year}`} className="pt-8">
                <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-white pb-2 relative z-10 bg-black bg-opacity-40 px-4 py-2 rounded-lg">
                  {t(`timelinePage.year.${year}`)}
                </h2>
                {timelineEvents.filter((event) => event.year === year).map((event) => (
                  <div key={event.id} className="relative flex items-start space-x-6 mb-8 last:mb-0">
                    {/* Timeline Marker */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 border-gray-700 shadow-lg flex items-center justify-center ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg border border-gray-700 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {t(event.title)}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-200">
                            <span className="font-medium">{new Date(event.date).toLocaleDateString(i18n.language)}</span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{t(event.location)}</span>
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getEventColor(event.type)}`}>
                          {t(`timelinePage.eventTypes.${event.type}`)}
                        </span>
                      </div>
                      
                      <p className="text-gray-200 leading-relaxed mb-4">
                        {t(event.description)}
                      </p>

                      {event.artifacts.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-white mb-2">{t('timelinePage.relatedArtifacts')}</h4>
                          <div className="flex space-x-2">
                            {event.artifacts.map((artifactId) => (
                              <span
                                key={artifactId}
                                className="bg-green-500 bg-opacity-30 text-green-200 px-2 py-1 rounded text-xs"
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
        <div className="mt-16 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t('timelinePage.exploreFurther')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t('timelinePage.keyFigures.title')}</h3>
              <p className="text-gray-200 mb-4">
                {t('timelinePage.keyFigures.description')}
              </p>
              <button className="text-green-400 hover:text-green-300 font-medium text-sm">
                {t('timelinePage.keyFigures.viewButton')}
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">{t('timelinePage.battleMaps.title')}</h3>
              <p className="text-gray-200 mb-4">
                {t('timelinePage.battleMaps.description')}
              </p>
              <button className="text-green-400 hover:text-green-300 font-medium text-sm">
                {t('timelinePage.battleMaps.viewButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;