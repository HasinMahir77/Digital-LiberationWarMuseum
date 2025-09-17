import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Victory Day Celebration: Remembering Our Heroes',
    date: 'December 16, 2025',
    time: '10:00am – 2:00pm BST',
    location: 'Museum Main Hall & Online',
    type: 'Festivals and Event Series',
    description: 'A grand celebration to honor the martyrs and freedom fighters of the Liberation War. Featuring speeches, cultural performances, and a special exhibition.',
    imageUrl: '/src/assets/images/newly-built-liberation.jpg',
  },
  {
    id: '2',
    title: 'Oral Histories Project: Share Your Story',
    date: 'November 5, 2025',
    time: '10:00am – 4:00pm BST',
    location: 'Museum Archive Wing',
    type: 'Workshops & Talks',
    description: 'An opportunity for freedom fighters, their families, and witnesses to share their personal stories and contribute to the museum\'s oral history collection.',
    imageUrl: '/src/assets/images/687-400x200.jpg',
  },
  {
    id: '3',
    title: 'Exhibition Opening: Women in the War',
    date: 'October 27, 2025',
    time: '3:00pm – 5:00pm BST',
    location: 'Temporary Exhibition Gallery',
    type: 'Exhibitions',
    description: 'Opening of a new exhibition highlighting the invaluable contributions and sacrifices of women during the Liberation War.',
    imageUrl: '/src/assets/images/543-400x200.jpg',
  },
  {
    id: '4',
    title: 'Documentary Screening: The Birth of a Nation',
    date: 'October 10, 2025',
    time: '6:00pm – 8:00pm BST',
    location: 'Museum Auditorium',
    type: 'Film Screening',
    description: 'A special screening of a critically acclaimed documentary on the historical events leading to the independence of Bangladesh.',
    imageUrl: '/src/assets/images/newly-built-liberation.jpg',
  },
  {
    id: '5',
    title: 'Youth Education Workshop: Our History, Our Future',
    date: 'September 22, 2025',
    time: '9:00am – 1:00pm BST',
    location: 'Educational Center',
    type: 'Kids & Families',
    description: 'An interactive workshop for young students to learn about the Liberation War through engaging activities and discussions.',
    imageUrl: '/src/assets/images/687-400x200.jpg',
  },
  {
    id: '6',
    title: 'Seminar: International Support for Bangladesh\'s Liberation',
    date: 'September 5, 2025',
    time: '2:00pm – 4:00pm BST',
    location: 'Conference Hall & Online',
    type: 'Webcasts & Online',
    description: 'A seminar discussing the crucial international support and diplomatic efforts that aided Bangladesh during its fight for freedom.',
    imageUrl: '/src/assets/images/543-400x200.jpg',
  },
  {
    id: '7',
    title: 'Photo Exhibition: Faces of Freedom',
    date: 'August 15, 2025',
    time: '10:00am – 5:00pm BST',
    location: 'Gallery I',
    type: 'Exhibitions',
    description: 'A powerful photographic journey showcasing the individuals who participated in and were affected by the Liberation War.',
    imageUrl: '/src/assets/images/newly-built-liberation.jpg',
  },
];

const EventsPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string[]>([]);

  const getMonthFromDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
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
        backgroundImage: 'url(\'https://www.aiub.edu/Files/Uploads/original/arcaiubmus2305.jpeg\')' 
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white bg-gray-800 bg-opacity-60 rounded-lg p-4">Upcoming Events</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Filters */}
          <div className="md:w-1/4 bg-gray-200 bg-opacity-80 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Filters</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Month</label>
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
                        className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor={`month-${month}`} className="ml-2 text-sm text-gray-700 capitalize">{month}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Event Type</label>
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
                        className="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700 capitalize">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area for Events */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filterEvents().map(event => (
                <div key={event.id} className="bg-gray-200 bg-opacity-80 rounded-lg shadow-md overflow-hidden">
                  {event.imageUrl && (
                    <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">
                      <Link to={`/events/${event.id}`} className="hover:text-indigo-600 text-gray-900">
                        {event.title}
                      </Link>
                    </h2>
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Date:</span> {event.date}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Time:</span> {event.time}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">Location:</span> {event.location}
                    </p>
                    <p className="text-gray-700 mb-4">
                      <span className="font-medium">Type:</span> {event.type}
                    </p>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
