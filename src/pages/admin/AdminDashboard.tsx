import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Image,
  Plus,
  Settings,
  Download,
  Upload,
  Eye,
  Calendar,
  Trophy,
  BarChart,
  LineChart,
  PieChart,
  Share2,
  CalendarDays,
  Newspaper
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useTranslation } from 'react-i18next';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { artifacts } = useData();
  const { t } = useTranslation();

  const stats = [
    {
      title: t('adminDashboard.stats.totalArtifacts'),
      value: artifacts.length,
      icon: Image,
      color: 'bg-blue-100 text-blue-700',
      change: '+12%',
    },
    {
      title: t('adminDashboard.stats.publicItems'),
      value: artifacts.filter(a => a.isPublic).length,
      icon: Eye,
      color: 'bg-green-100 text-green-700',
      change: '+8%',
    },
    {
      title: t('adminDashboard.stats.thisMonth'),
      value: artifacts.filter(a =>
        new Date(a.dateCreated).getMonth() === new Date().getMonth()
      ).length,
      icon: Calendar,
      color: 'bg-purple-100 text-purple-700',
      change: '+25%',
    },
    {
      title: t('adminDashboard.stats.pendingReview'),
      value: artifacts.filter(a => !a.isPublic).length,
      icon: Settings,
      color: 'bg-orange-100 text-orange-700',
      change: '-5%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <AdminSidebar />

          {/* Main Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;