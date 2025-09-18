import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Image,
  Plus,
  Settings,
  Download,
  Trophy,
  CalendarDays,
  Newspaper,
  Share2,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const AdminSidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const sidebarItems = [
    { id: 'overview', label: t('adminDashboard.sidebar.overview'), icon: BarChart3, path: '/admin' },
    { id: 'artifacts', label: t('adminDashboard.sidebar.artifacts'), icon: Image, path: '/admin/artifacts' },
    { id: 'add-artifact', label: t('adminDashboard.sidebar.addArtifact'), icon: Plus, path: '/admin/add-artifact' },
    ...(user?.role === 'super_admin' ? [
      { id: 'users', label: t('adminDashboard.sidebar.users'), icon: Users, path: '/admin/users' }
    ] : []),
    ...(user?.role === 'super_admin' || user?.role === 'archivist' ? [
      { id: 'competition-management', label: t('adminDashboard.sidebar.competitions'), icon: Trophy, path: '/admin/competition-management' },
      { id: 'event-management', label: t('adminDashboard.sidebar.events'), icon: CalendarDays, path: '/admin/event-management' },
      { id: 'news-management', label: t('adminDashboard.sidebar.news'), icon: Newspaper, path: '/admin/news-management' },
      { id: 'social-media-analytics', label: t('adminDashboard.sidebar.socialMedia'), icon: Share2, path: '/admin/social-media-analytics' }
    ] : []),
    { id: 'reports', label: t('adminDashboard.sidebar.reports'), icon: Download, path: '/admin/reports' },
  ];

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('adminDashboard.sidebar.title')}</h2>
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
