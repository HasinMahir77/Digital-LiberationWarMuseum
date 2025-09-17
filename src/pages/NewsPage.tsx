import React from 'react';

interface NewsArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
  urgent: boolean;
}

const mockNews: NewsArticle[] = [
  {
    id: 'news-1',
    category: 'Research',
    title: 'New Research on Liberation War Artifacts',
    excerpt: 'Researchers uncover new details about the 1971 Liberation War through digitized documents.',
    date: 'September 1, 2025',
    imageUrl: '/news/News & Notices _ Digital Liberation War Museum_files/687-400x200.jpg',
  },
  {
    id: 'news-2',
    category: 'Exhibits',
    title: 'Upcoming Exhibition: Liberation War Heroes',
    excerpt: 'A new exhibition honoring the unsung heroes of the Liberation War will open this fall.',
    date: 'August 20, 2025',
    imageUrl: '/news/News & Notices _ Digital Liberation War Museum_files/543-400x200.jpg',
  },
];

const mockNotices: Notice[] = [
  {
    id: 'notice-1',
    title: 'Library Closed for Renovation',
    date: 'July 2025',
    content: 'The museum library will be closed for renovation until further notice.',
    urgent: false,
  },
  {
    id: 'notice-2',
    title: 'Important COVID-19 Update',
    date: 'August 2025',
    content: 'Museum visitors must wear masks inside galleries until further notice.',
    urgent: true,
  },
];

const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: `url('/news/News & Notices _ Digital Liberation War Museum_files/newly-built-liberation.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">News & Notices</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters - Simplified for now */}
        <div className="flex flex-wrap gap-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="category-filter" className="block text-lg font-semibold mb-2">Category</label>
            <select id="category-filter" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="all">All News</option>
              <option value="research">Research</option>
              <option value="exhibits">Exhibits</option>
              <option value="events">Events</option>
              <option value="awards">Awards</option>
              <option value="announcements">Announcements</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="year-filter" className="block text-lg font-semibold mb-2">Year</label>
            <select id="year-filter" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockNews.map((newsItem) => (
            <article key={newsItem.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{newsItem.category}</span>
                <h3 className="text-xl font-semibold mb-2"><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{newsItem.title}</a></h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{newsItem.excerpt}</p>
                <time className="text-gray-500 dark:text-gray-400 text-xs">{newsItem.date}</time>
              </div>
            </article>
          ))}
        </div>

        {/* Notices Section */}
        <section className="border-t-2 border-gray-200 dark:border-gray-700 pt-8 mt-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-800 dark:text-blue-400">Museum Notices</h2>
          <div className="space-y-4">
            {mockNotices.map((notice) => (
              <div key={notice.id} className={`p-5 rounded-lg border-l-4 ${notice.urgent ? 'bg-red-50 border-red-500 dark:bg-red-900 dark:border-red-400' : 'bg-gray-50 border-blue-600 dark:bg-gray-700 dark:border-blue-400'}`}>
                <h3 className="text-xl font-semibold mb-2">{notice.title}</h3>
                <time className="text-gray-500 dark:text-gray-400 text-sm mb-2 block">{notice.date}</time>
                <p className="text-gray-700 dark:text-gray-300">{notice.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination - Simplified for now */}
        <nav className="flex justify-center mt-12">
          <ul className="flex items-center space-x-2">
            <li><a href="#" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">Prev</a></li>
            <li><a href="#" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">1</a></li>
            <li><a href="#" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">2</a></li>
            <li><a href="#" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">3</a></li>
            <li><a href="#" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NewsPage;
