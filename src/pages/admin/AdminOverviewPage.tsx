import React from 'react';
import { Link } from 'react-router-dom';
import {
  Image,
  Eye,
  Calendar,
  Settings,
  Plus,
  Upload,
  Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useTranslation } from 'react-i18next';

const AdminOverviewPage: React.FC = () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('adminDashboard.header.welcome', { userName: user?.name })}
        </h1>
        <p className="text-gray-600">
          {t('adminDashboard.header.subtitle')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">{t('adminDashboard.stats.fromLastMonth')}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('adminDashboard.quickActions.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/add-artifact"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-medium text-gray-900">{t('adminDashboard.quickActions.addArtifact.title')}</h3>
              <p className="text-sm text-gray-600">{t('adminDashboard.quickActions.addArtifact.description')}</p>
            </div>
          </Link>

          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-medium text-gray-900">{t('adminDashboard.quickActions.bulkImport.title')}</h3>
              <p className="text-sm text-gray-600">{t('adminDashboard.quickActions.bulkImport.description')}</p>
            </div>
          </button>

          <Link
            to="/admin/reports"
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-medium text-gray-900">{t('adminDashboard.quickActions.generateReport.title')}</h3>
              <p className="text-sm text-gray-600">{t('adminDashboard.quickActions.generateReport.description')}</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('adminDashboard.recentActivity.title')}</h2>
        <div className="space-y-4">
          {artifacts.slice(0, 5).map((artifact) => (
            <div key={artifact.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <img
                src={artifact.images[0]}
                alt={artifact.objectHead}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{t(artifact.objectHead)}</h4>
                <p className="text-sm text-gray-600">
                  {t('adminDashboard.recentActivity.addedOn', { date: new Date(artifact.dateCreated).toLocaleDateString() })}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                artifact.isPublic
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {artifact.isPublic ? t('adminDashboard.recentActivity.publicStatus') : t('adminDashboard.recentActivity.draftStatus')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminOverviewPage;

