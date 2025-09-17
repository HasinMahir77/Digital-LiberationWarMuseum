import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatItem {
  value: string;
  label: string;
}

interface PostMetric {
  icon: string;
  value: string;
}

interface PostItem {
  title: string;
  metrics: PostMetric[];
}

interface PlatformDetail {
  overview: StatItem[];
  last30Days: StatItem[];
  recentPosts: PostItem[];
  chartData: {
    labels: string[];
    datasets: { label: string; data: number[]; borderColor?: string; backgroundColor: string | string[]; tension?: number; fill?: boolean; pointBackgroundColor?: string; pointBorderWidth?: number; pointRadius?: number; pointHoverRadius?: number; borderRadius?: number; borderSkipped?: boolean; }[];
  };
  chartType: 'line' | 'bar';
}

interface PlatformData {
  id: 'overview' | 'facebook' | 'instagram' | 'twitter' | 'youtube';
  title: string;
  icon: string;
  bgColor: string;
  stats: StatItem[];
  progress: number;
  detail?: PlatformDetail;
}

const mockSocialMediaData: PlatformData[] = [
  {
    id: 'facebook',
    title: 'Facebook',
    icon: 'fab fa-facebook-f',
    bgColor: '#3b5998',
    stats: [
      { value: '12.5K', label: 'Page Likes' },
      { value: '8.7K', label: 'Followers' },
      { value: '4.6', label: 'Avg Rating' },
      { value: '1.2K', label: 'Engagement' },
    ],
    progress: 78,
    detail: {
      overview: [
        { value: '12,548', label: 'Page Likes' },
        { value: '8,732', label: 'Followers' },
        { value: 'Verified', label: 'Status' },
        { value: '4.6/5', label: 'Rating (1.2K reviews)' },
      ],
      last30Days: [
        { value: '245', label: 'Posts (30 days)' },
        { value: '1,243', label: 'Total Likes' },
        { value: '587', label: 'Total Comments' },
        { value: '312', label: 'Total Shares' },
      ],
      recentPosts: [
        { title: 'Summer Sale Announcement', metrics: [{ icon: 'far fa-thumbs-up', value: '245' }, { icon: 'far fa-comment', value: '87' }, { icon: 'far fa-share-square', value: '42' }] },
        { title: 'New Product Launch', metrics: [{ icon: 'far fa-thumbs-up', value: '312' }, { icon: 'far fa-comment', value: '124' }, { icon: 'far fa-share-square', value: '67' }] },
        { title: 'Customer Story: John Doe', metrics: [{ icon: 'far fa-thumbs-up', value: '187' }, { icon: 'far fa-comment', value: '53' }, { icon: 'far fa-share-square', value: '28' }] },
      ],
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Page Likes',
          data: [8500, 9200, 9800, 10500, 11200, 12500],
          borderColor: '#3b5998',
          backgroundColor: 'rgba(59, 89, 152, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }],
      },
      chartType: 'line',
    },
  },
  {
    id: 'instagram',
    title: 'Instagram',
    icon: 'fab fa-instagram',
    bgColor: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    stats: [
      { value: '24.8K', label: 'Followers' },
      { value: '348', label: 'Posts' },
      { value: '12.4K', label: 'Reach' },
      { value: '3.5K', label: 'Engagement' },
    ],
    progress: 85,
    detail: {
      overview: [
        { value: '24,837', label: 'Followers' },
        { value: '348', label: 'Posts' },
        { value: '12,487', label: 'Avg. Reach' },
        { value: '24.8%', label: 'Engagement Rate' },
      ],
      last30Days: [
        { value: '32', label: 'Posts' },
        { value: '12.4K', label: 'Reach' },
        { value: '28.7K', label: 'Impressions' },
        { value: '1,243', label: 'Website Clicks' },
      ],
      recentPosts: [
        { title: 'Behind the Scenes', metrics: [{ icon: 'far fa-heart', value: '1.2K' }, { icon: 'far fa-comment', value: '87' }] },
        { title: 'Product Spotlight', metrics: [{ icon: 'far fa-heart', value: '2.4K' }, { icon: 'far fa-comment', value: '143' }] },
        { title: 'Team Introduction', metrics: [{ icon: 'far fa-heart', value: '987' }, { icon: 'far fa-comment', value: '65' }] },
      ],
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Followers',
          data: [18000, 19500, 20500, 21800, 23000, 24800],
          backgroundColor: 'rgba(225, 48, 108, 0.8)',
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      chartType: 'bar',
    },
  },
  {
    id: 'twitter',
    title: 'Twitter / X',
    icon: 'fab fa-twitter',
    bgColor: '#1da1f2',
    stats: [
      { value: '15.3K', label: 'Followers' },
      { value: '1.2K', label: 'Following' },
      { value: '3.8K', label: 'Tweets' },
      { value: '7.2K', label: 'Engagement' },
    ],
    progress: 65,
    detail: {
      overview: [
        { value: '15,328', label: 'Followers' },
        { value: '1,247', label: 'Following' },
        { value: '3,812', label: 'Tweets' },
        { value: '142', label: 'Listed' },
      ],
      last30Days: [
        { value: '87', label: 'Tweets' },
        { value: '7,243', label: 'Impressions' },
        { value: '1,842', label: 'Profile Visits' },
        { value: '12.8%', label: 'Engagement Rate' },
      ],
      recentPosts: [
        { title: 'Industry insights thread', metrics: [{ icon: 'fas fa-retweet', value: '124' }, { icon: 'far fa-heart', value: '342' }, { icon: 'far fa-comment', value: '48' }] },
        { title: 'Product update announcement', metrics: [{ icon: 'fas fa-retweet', value: '87' }, { icon: 'far fa-heart', value: '215' }, { icon: 'far fa-comment', value: '32' }] },
        { title: 'Weekly tip tweet', metrics: [{ icon: 'fas fa-retweet', value: '53' }, { icon: 'far fa-heart', value: '187' }, { icon: 'far fa-comment', value: '21' }] },
      ],
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Followers',
          data: [11200, 11800, 12400, 13000, 14200, 15300],
          borderColor: '#1da1f2',
          backgroundColor: 'rgba(29, 161, 242, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }],
      },
      chartType: 'line',
    },
  },
  {
    id: 'youtube',
    title: 'YouTube',
    icon: 'fab fa-youtube',
    bgColor: '#ff0000',
    stats: [
      { value: '45.7K', label: 'Subscribers' },
      { value: '1.2M', label: 'Views' },
      { value: '187', label: 'Videos' },
      { value: '28.5K', label: 'Engagement' },
    ],
    progress: 92,
    detail: {
      overview: [
        { value: '45,728', label: 'Subscribers' },
        { value: '1,247,835', label: 'Total Views' },
        { value: '187', label: 'Videos' },
        { value: '12,847', label: 'Watch Hours' },
      ],
      last30Days: [
        { value: '15', label: 'New Videos' },
        { value: '124,837', label: 'Views' },
        { value: '1,248', label: 'New Subscribers' },
        { value: '42.8%', label: 'Watch Time Growth' },
      ],
      recentPosts: [
        { title: 'How to optimize social media strategy', metrics: [{ icon: 'far fa-eye', value: '24.8K' }, { icon: 'far fa-thumbs-up', value: '1.2K' }, { icon: 'far fa-comment', value: '142' }] },
        { title: 'Interview with industry expert', metrics: [{ icon: 'far fa-eye', value: '18.7K' }, { icon: 'far fa-thumbs-up', value: '987' }, { icon: 'far fa-comment', value: '87' }] },
        { title: 'Case study: Successful campaign', metrics: [{ icon: 'far fa-eye', value: '32.4K' }, { icon: 'far fa-thumbs-up', value: '2.1K' }, { icon: 'far fa-comment', value: '187' }] },
      ],
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Subscribers',
          data: [32000, 35000, 37800, 40200, 42500, 45700],
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      chartType: 'bar',
    },
  },
];

const SocialMediaAnalyticsPage: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'overview' | 'facebook' | 'instagram' | 'twitter' | 'youtube'>('overview');
  const [activeDateFilter, setActiveDateFilter] = useState('Today');

  const platformColors = {
    facebook: 'bg-[#3b5998]',
    instagram: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] via-[#cc2366] to-[#bc1888]',
    twitter: 'bg-[#1da1f2]',
    youtube: 'bg-[#ff0000]',
  };

  const currentPlatformData = mockSocialMediaData.find(p => p.id === selectedPlatform);

  return (
    <div className="bg-gray-50 text-gray-900 p-6 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Social Media Analytics</h1>

      {/* Date Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[ 'Today', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Range' ].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveDateFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeDateFilter === filter ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Platform Selector */}
      <div className="mb-8">
        <select
          id="platform-select"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value as typeof selectedPlatform)}
          className="w-full md:w-1/2 lg:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="overview">Overview - All Platforms</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="twitter">Twitter / X</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>

      {selectedPlatform === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSocialMediaData.map(platform => (
            <div
              key={platform.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group"
              onClick={() => setSelectedPlatform(platform.id)}
            >
              <div classNameName={`absolute top-0 left-0 w-full h-1 ${platformColors[platform.id as keyof typeof platformColors]}`}></div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{platform.title}</h2>
                <div classNameName={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg ${platformColors[platform.id as keyof typeof platformColors]}`}>
                  <i className={platform.icon}></i>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {platform.stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md text-center">
                    <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${platform.progress}%` }}></div>
              </div>
              {platform.detail && (
                <div className="h-48 mt-4">
                  {platform.detail.chartType === 'line' ? (
                    <Line data={platform.detail.chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  ) : (
                    <Bar data={platform.detail.chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        currentPlatformData && currentPlatformData.detail && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              onClick={() => setSelectedPlatform('overview')}
              className="mb-6 flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Overview
            </button>

            <h2 className="text-3xl font-bold mb-6 text-green-600">{currentPlatformData.title} Analytics</h2>

            {/* Detail Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center"><i className="fas fa-chart-pie mr-2 text-green-600"></i> Account Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  {currentPlatformData.detail.overview.map((stat, index) => (
                    <div key={index} className="bg-white p-3 rounded-md text-center">
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center"><i className="fas fa-calendar-alt mr-2 text-green-600"></i> Last 30 Days</h3>
                <div className="grid grid-cols-2 gap-4">
                  {currentPlatformData.detail.last30Days.map((stat, index) => (
                    <div key={index} className="bg-white p-3 rounded-md text-center">
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Posts Performance */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center"><i className="fas fa-list mr-2 text-green-600"></i> Recent Posts Performance</h3>
              <div className="space-y-3">
                {currentPlatformData.detail.recentPosts.map((post, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="font-medium text-gray-800">{post.title}</div>
                    <div className="flex space-x-4">
                      {post.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex items-center text-sm text-gray-600">
                          <i className={`${metric.icon} mr-1`}></i> {metric.value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart in Detail View */}
            {currentPlatformData.detail.chartData && (
                <div className="h-64 bg-gray-50 p-5 rounded-lg shadow-sm">
                  {currentPlatformData.detail.chartType === 'line' ? (
                    <Line data={currentPlatformData.detail.chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  ) : (
                    <Bar data={currentPlatformData.detail.chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  )}
                </div>
              )}
          </div>
        )
      )}
    </div>
  );
};

export default SocialMediaAnalyticsPage;
