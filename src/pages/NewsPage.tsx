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
    imageUrl: '/src/assets/images/687-400x200.jpg',
  },
  {
    id: 'news-2',
    category: 'Exhibits',
    title: 'Upcoming Exhibition: Liberation War Heroes',
    excerpt: 'A new exhibition honoring the unsung heroes of the Liberation War will open this fall.',
    date: 'August 20, 2025',
    imageUrl: '/src/assets/images/543-400x200.jpg',
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
    <div className="min-h-screen bg-cover bg-fixed bg-center" style={{ backgroundImage: `url('https://flass.ewubd.edu/storage/app/uploads/public/5d3/5a2/c0d/5d35a2c0dd4e6880131580.jpg')` }}>
      {/* Hero Section */}
      <section className="relative h-64 flex items-center mb-12">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-5xl font-bold text-white">News & Notices</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters - Simplified for now */}
        <div className="flex flex-wrap gap-4 mb-8 bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-md">
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
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockNews.map((newsItem) => (
            <article key={newsItem.id} className="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">{newsItem.category}</span>
                <h3 className="text-xl font-semibold mb-2"><a href="#" className="text-white hover:text-green-400 transition-colors">{newsItem.title}</a></h3>
                <p className="text-gray-200 text-sm mb-4">{newsItem.excerpt}</p>
                <time className="text-gray-400 text-xs">{newsItem.date}</time>
              </div>
            </article>
          ))}
        </div>

        {/* Notices Section */}
        <section className="border-t-2 border-gray-700 pt-8 mt-12">
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
        </section>

        {/* Pagination - Simplified for now */}
        <nav className="flex justify-center mt-12">
          <ul className="flex items-center space-x-2">
            <li><a href="#" className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white">Prev</a></li>
            <li><a href="#" className="px-4 py-2 border border-green-600 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors">1</a></li>
            <li><a href="#" className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white">2</a></li>
            <li><a href="#" className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white">3</a></li>
            <li><a href="#" className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors text-white">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NewsPage;
