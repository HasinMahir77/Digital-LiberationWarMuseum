import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const NewsPage: React.FC = () => {
  const { news } = useData();
  const { t } = useTranslation();

  // For now, we will use the news from DataContext. Notices will be integrated later if needed.
  // Filtering logic will be added here in the future.

  return (
    <div className="min-h-screen bg-cover bg-fixed bg-center" style={{ backgroundImage: `url('https://flass.ewubd.edu/storage/app/uploads/public/5d3/5a2/c0d/5d35a2c0dd4e6880131580.jpg')` }}>
      {/* Hero Section */}
      <section className="relative h-48 flex items-center mb-8">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl font-bold text-white">{t('newsPage.title')}</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters - Removed for now as they are not functional and waste space */}
        {/* <div className="flex flex-wrap gap-4 mb-8 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-md">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="category-filter" className="block text-lg font-semibold mb-2 text-white">Category</label>
            <select id="category-filter" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="all">All News</option>
              <option value="research">Research</option>
              <option value="exhibits">Exhibits</option>
              <option value="events">Events</option>
              <option value="awards">Awards</option>
              <option value="announcements">Announcements</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="year-filter" className="block text-lg font-semibold mb-2 text-white">Year</label>
            <select id="year-filter" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div> */}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((newsItem) => (
            <MotionLink 
              to={`/news/${newsItem.id}`}
              key={newsItem.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="block bg-gray-800 bg-opacity-70 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img src={newsItem.imageUrl} alt={t(newsItem.title)} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white hover:text-green-400 transition-colors">{t(newsItem.title)}</h3>
                <p className="text-gray-200 text-sm mb-4 line-clamp-3">{t(newsItem.summary)}</p>
                <time className="text-gray-400 text-xs">{new Date(newsItem.date).toLocaleDateString()}</time>
              </div>
            </MotionLink>
          ))}
        </div>

        {/* Notices Section - Removed for now as mockNotices data is not in DataContext */}
        {/* <section className="border-t-2 border-gray-700 pt-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400">Museum Notices</h2>
          <div className="space-y-4">
            {mockNotices.map((notice) => (
              <div key={notice.id} className={`p-5 rounded-lg border-l-4 ${notice.urgent ? 'bg-red-900 bg-opacity-70 border-red-400 text-white' : 'bg-gray-800 bg-opacity-70 border-green-600 text-white'}`}>
                <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
                <time className="text-gray-400 text-sm mb-2 block">{notice.date}</time>
                <p className="text-gray-200">{notice.content}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Pagination - Simplified for now */}
        <nav className="flex justify-center mt-12">
          <ul className="flex items-center space-x-2">
            <li><MotionLink 
              to="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white">{t('newsPage.pagination.prev')}</MotionLink></li>
            <li><MotionLink 
              to="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-green-600 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors">1</MotionLink></li>
            <li><MotionLink 
              to="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white">2</MotionLink></li>
            <li><MotionLink 
              to="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white">3</MotionLink></li>
            <li><MotionLink 
              to="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white">{t('newsPage.pagination.next')}</MotionLink></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NewsPage;
