import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import newlyBuiltLiberation from '../assets/images/newly-built-liberation.jpg';
import image687 from '../assets/images/687-400x200.jpg';
import image543 from '../assets/images/543-400x200.jpg';
import victoryBackground from '../assets/images/victory.jpg';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  imageUrl?: string;
}

const MotionLink = motion(Link);

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'eventsPage.events.event1.title',
    date: '2025-12-16',
    time: 'eventsPage.events.event1.time',
    location: 'eventsPage.events.event1.location',
    type: 'festivalsandeventseries', // Changed to translation key
    description: 'eventsPage.events.event1.description',
    imageUrl: newlyBuiltLiberation,
  },
  {
    id: '2',
    title: 'eventsPage.events.event2.title',
    date: '2025-11-05',
    time: 'eventsPage.events.event2.time',
    location: 'eventsPage.events.event2.location',
    type: 'workshopsandtalks', // Changed to translation key
    description: 'eventsPage.events.event2.description',
    imageUrl: image687,
  },
  {
    id: '3',
    date: '2025-10-27',
    title: 'eventsPage.events.event3.title',
    time: 'eventsPage.events.event3.time',
    location: 'eventsPage.events.event3.location',
    type: 'exhibitions', // Changed to translation key
    description: 'eventsPage.events.event3.description',
    imageUrl: image543,
  },
  {
    id: '4',
    date: '2025-10-10',
    title: 'eventsPage.events.event4.title',
    time: 'eventsPage.events.event4.time',
    location: 'eventsPage.events.event4.location',
    type: 'filmscreening', // Changed to translation key
    description: 'eventsPage.events.event4.description',
    imageUrl: newlyBuiltLiberation,
  },
  {
    id: '5',
    date: '2025-09-22',
    title: 'eventsPage.events.event5.title',
    time: 'eventsPage.events.event5.time',
    location: 'eventsPage.events.event5.location',
    type: 'kidsandfamilies', // Changed to translation key
    description: 'eventsPage.events.event5.description',
    imageUrl: image687,
  },
  {
    id: '6',
    date: '2025-09-05',
    title: 'eventsPage.events.event6.title',
    time: 'eventsPage.events.event6.time',
    location: 'eventsPage.events.event6.location',
    type: 'webcastsandonline', // Changed to translation key
    description: 'eventsPage.events.event6.description',
    imageUrl: image543,
  },
  {
    id: '7',
    date: '2025-08-15',
    title: 'eventsPage.events.event7.title',
    time: 'eventsPage.events.event7.time',
    location: 'eventsPage.events.event7.location',
    type: 'exhibitions', // Changed to translation key
    description: 'eventsPage.events.event7.description',
    imageUrl: newlyBuiltLiberation,
  },
];

const EventsPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string[]>([]);
  const { t, i18n } = useTranslation();

  const getMonthFromDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(i18n.language === 'bn' ? 'bn-BD' : 'default', { month: 'long' });
  };

  const filterEvents = () => {
    return sampleEvents.filter(event => {
      const matchesMonth = selectedMonth.length === 0 || selectedMonth.includes(getMonthFromDate(event.date));
      const matchesEventType = selectedEventType.length === 0 || selectedEventType.includes(event.type);
      return matchesMonth && matchesEventType;
    });
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const handleEventTypeChange = (type: string) => {
    setSelectedEventType(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const months = Array.from(new Set(sampleEvents.map(event => getMonthFromDate(event.date))));
  const eventTypes = Array.from(new Set(sampleEvents.map(event => event.type)));

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center text-gray-900 py-12"
      style={{ 
        backgroundImage: `url(${victoryBackground})`
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white bg-gray-800 bg-opacity-60 rounded-lg p-4">{t('eventsPage.hero.title')}</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Filters */}
          <div className="md:w-1/4 bg-gray-800 bg-opacity-70 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">{t('eventsPage.filters.title')}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">{t('eventsPage.filters.byMonth')}</label>
                <div className="space-y-2">
                  {months.map(month => (
                    <div key={month} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`month-${month}`}
                        name="month"
                        value={month}
                        checked={selectedMonth.includes(month)}
                        onChange={() => handleMonthChange(month)}
                        className="h-4 w-4 text-green-500 border-gray-600 rounded focus:ring-green-500 bg-gray-700"
                      />
                      <label htmlFor={`month-${month}`} className="ml-2 text-sm text-gray-200 capitalize">{month}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">{t('eventsPage.filters.byEventType')}</label>
                <div className="space-y-2">
                  {eventTypes.map(type => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`type-${type}`}
                        name="eventType"
                        value={type}
                        checked={selectedEventType.includes(type)}
                        onChange={() => handleEventTypeChange(type)}
                        className="h-4 w-4 text-green-500 border-gray-600 rounded focus:ring-green-500 bg-gray-700"
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-200 capitalize">{t(`eventsPage.eventTypes.${type}`)}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area for Events */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterEvents().map((event, index) => (
                <motion.div 
                  key={event.id} 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800 bg-opacity-70 rounded-lg shadow-md overflow-hidden"
                >
                  {event.imageUrl && (
                    <img src={event.imageUrl} alt={t(`eventsPage.events.event${index + 1}.title`)} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">
                      <MotionLink 
                        to={`/events/${event.id}`} 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        className="hover:text-green-400 text-white"
                      >
                        {t(`eventsPage.events.event${index + 1}.title`)}
                      </MotionLink>
                    </h2>
                    <p className="text-gray-200 mb-1">
                      <span className="font-medium">{t('eventsPage.eventDetails.date')}</span> {new Date(event.date).toLocaleDateString(i18n.language)}
                    </p>
                    <p className="text-gray-200 mb-1">
                      <span className="font-medium">{t('eventsPage.eventDetails.time')}</span> {t(event.time)}
                    </p>
                    <p className="text-gray-200 mb-1">
                      <span className="font-medium">{t('eventsPage.eventDetails.location')}</span> {t(`eventsPage.events.event${index + 1}.location`)}
                    </p>
                    <p className="text-gray-200 mb-4">
                      <span className="font-medium">{t('eventsPage.eventDetails.type')}</span> {t(`eventsPage.eventTypes.${event.type}`)}
                    </p>
                    <p className="text-gray-200">{t(`eventsPage.events.event${index + 1}.description`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
