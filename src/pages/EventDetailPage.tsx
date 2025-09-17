import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Assuming Event interface and sampleEvents are defined in EventsPage.tsx or a shared types file
// For now, I'll copy the interface and a simplified version of sampleEvents here
// In a larger application, this data would ideally come from a centralized store or API

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
    description: 'A grand celebration to honor the martyrs and freedom fighters of the Liberation War. Featuring speeches, cultural performances, and a special exhibition commemorating the sacrifices made for our independence. The event will include testimonials from freedom fighters, a wreath-laying ceremony, and patriotic songs.',
    imageUrl: '/src/assets/images/newly-built-liberation.jpg',
  },
  {
    id: '2',
    title: 'Oral Histories Project: Share Your Story',
    date: 'November 5, 2025',
    time: '10:00am – 4:00pm BST',
    location: 'Museum Archive Wing',
    type: 'Workshops & Talks',
    description: 'An invaluable opportunity for freedom fighters, their families, and witnesses to share their personal stories and contribute to the museum\'s oral history collection. These narratives will be preserved for future generations, offering unique insights into the human experience of the Liberation War.',
    imageUrl: '/src/assets/images/687-400x200.jpg',
  },
  {
    id: '3',
    title: 'Exhibition Opening: Women in the War',
    date: 'October 27, 2025',
    time: '3:00pm – 5:00pm BST',
    location: 'Temporary Exhibition Gallery',
    type: 'Exhibitions',
    description: 'Opening of a powerful new exhibition highlighting the invaluable contributions and sacrifices of women during the Liberation War. Explore their roles as combatants, organizers, caregivers, and survivors, through artifacts, photographs, and personal accounts.',
    imageUrl: '/src/assets/images/543-400x200.jpg',
  },
  {
    id: '4',
    title: 'Documentary Screening: The Birth of a Nation',
    date: 'October 10, 2025',
    time: '6:00pm – 8:00pm BST',
    location: 'Museum Auditorium',
    type: 'Film Screening',
    description: 'A special screening of a critically acclaimed documentary detailing the historical events, political struggles, and military campaigns that led to the independence of Bangladesh. Followed by a Q&A session with the director and historians.',
    imageUrl: '/src/assets/images/newly-built-liberation.jpg',
  },
  {
    id: '5',
    title: 'Youth Education Workshop: Our History, Our Future',
    date: 'September 22, 2025',
    time: '9:00am – 1:00pm BST',
    location: 'Educational Center',
    type: 'Kids & Families',
    description: 'An interactive workshop designed for young students to learn about the Liberation War through engaging activities, storytelling, and discussions. This program aims to instill a sense of history and national pride in the younger generation.',
    imageUrl: '/src/assets/images/687-400x200.jpg',
  },
  {
    id: '6',
    title: 'Seminar: International Support for Bangladesh\'s Liberation',
    date: 'September 5, 2025',
    time: '2:00pm – 4:00pm BST',
    location: 'Conference Hall & Online',
    type: 'Webcasts & Online',
    description: 'A comprehensive seminar discussing the crucial international support and diplomatic efforts that aided Bangladesh during its fight for freedom. Experts will analyze the roles of various countries and organizations in influencing the war\'s outcome.',
    imageUrl: '/src/assets/images/543-400x200.jpg',
  },
  {
    id: '7',
    title: 'Photo Exhibition: Faces of Freedom',
    date: 'August 15, 2025',
    time: '10:00am – 5:00pm BST',
    location: 'Gallery I',
    type: 'Exhibitions',
    description: 'A powerful photographic journey showcasing the individuals who participated in and were affected by the Liberation War. This exhibition features rare and iconic images capturing the spirit, struggle, and sacrifices of the era.',
    imageUrl: '/src/assets/images/newly-built-liberation.jpg',
  },
];

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = sampleEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div 
        className="min-h-screen bg-cover bg-fixed bg-center text-gray-900 py-12"
        style={{ 
          backgroundImage: 'url(\'https://flass.ewubd.edu/storage/app/uploads/public/5d3/5a2/bd9/5d35a2bd995d4155037808.jpg\')' 
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white text-center bg-gray-800 bg-opacity-60 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <p className="text-lg">The event you are looking for does not exist.</p>
          <Link to="/events" className="mt-4 inline-block bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-800 transition-colors">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center text-gray-900 py-12"
      style={{
        backgroundImage: 'url(\'https://flass.ewubd.edu/storage/app/uploads/public/5d3/5a2/bd9/5d35a2bd995d4155037808.jpg\')'
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-200 bg-opacity-80 rounded-lg shadow-xl p-8 md:p-12">
          <Link to="/events" className="inline-block text-green-700 hover:text-green-900 transition-colors mb-6 text-lg font-medium">
            &larr; Back to All Events
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{event.title}</h1>
          
          {event.imageUrl && (
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full max-h-96 object-cover rounded-lg mb-8 shadow-md"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-gray-800">
            <div>
              <p className="font-semibold text-lg">Date:</p>
              <p className="text-md">{event.date}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Time:</p>
              <p className="text-md">{event.time}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Location:</p>
              <p className="text-md">{event.location}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Event Type:</p>
              <p className="text-md capitalize">{event.type}</p>
            </div>
          </div>

          <div className="text-gray-700 leading-relaxed text-lg">
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
