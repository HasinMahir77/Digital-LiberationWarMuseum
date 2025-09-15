import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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
  Trophy // Added Trophy icon for competitions
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import ArtifactManagement from './ArtifactManagement';
import UserManagement from './UserManagement';
import ReportsPage from './ReportsPage';
import AddArtifactPage from './AddArtifactPage';
import CreateExhibitionPage from './CreateExhibitionPage';
import CompetitionManagementPage from './CompetitionManagementPage'; // Import the new competition management page

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { artifacts } = useData();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, path: '/admin' },
    { id: 'artifacts', label: 'Artifacts', icon: Image, path: '/admin/artifacts' },
    { id: 'add-artifact', label: 'Add Artifact', icon: Plus, path: '/admin/add-artifact' },
    ...(user?.role === 'super_admin' ? [
      { id: 'users', label: 'Users', icon: Users, path: '/admin/users' }
    ] : []),
    ...(user?.role === 'super_admin' || user?.role === 'archivist' ? [
      { id: 'competition-management', label: 'Competitions', icon: Trophy, path: '/admin/competition-management' }
    ] : []),
    { id: 'reports', label: 'Reports', icon: Download, path: '/admin/reports' },
  ];

  const stats = [
    {
      title: 'Total Artifacts',
      value: artifacts.length,
      icon: Image,
      color: 'bg-blue-100 text-blue-700',
      change: '+12%',
    },
    {
      title: 'Public Items',
      value: artifacts.filter(a => a.isPublic).length,
      icon: Eye,
      color: 'bg-green-100 text-green-700',
      change: '+8%',
    },
    {
      title: 'This Month',
      value: artifacts.filter(a => 
        new Date(a.dateCreated).getMonth() === new Date().getMonth()
      ).length,
      icon: Calendar,
      color: 'bg-purple-100 text-purple-700',
      change: '+25%',
    },
    {
      title: 'Pending Review',
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
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Dashboard</h2>
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.path) || (item.path === '/admin' && location.pathname === '/admin')
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

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <div>
                  {/* Header */}
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome back, {user?.name}
                    </h1>
                    <p className="text-gray-600">
                      Manage your digital archive and track collection growth
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
                            <span className="text-sm text-gray-600 ml-1">from last month</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link
                        to="/admin/add-artifact"
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-8 h-8 text-green-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">Add New Artifact</h3>
                          <p className="text-sm text-gray-600">Upload and catalog new items</p>
                        </div>
                      </Link>
                      
                      <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Upload className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">Bulk Import</h3>
                          <p className="text-sm text-gray-600">Import multiple artifacts</p>
                        </div>
                      </button>
                      
                      <Link
                        to="/admin/reports"
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-8 h-8 text-purple-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">Generate Report</h3>
                          <p className="text-sm text-gray-600">Export collection data</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                      {artifacts.slice(0, 5).map((artifact) => (
                        <div key={artifact.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                          <img
                            src={artifact.images[0]}
                            alt={artifact.objectHead}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{artifact.objectHead}</h4>
                            <p className="text-sm text-gray-600">
                              Added on {new Date(artifact.dateCreated).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            artifact.isPublic 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {artifact.isPublic ? 'Public' : 'Draft'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              } />
              <Route path="/artifacts" element={<ArtifactManagement />} />
              <Route path="/add-artifact" element={<AddArtifactPage />} />
              <Route path="/create-exhibition" element={<CreateExhibitionPage />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/competition-management" element={<CompetitionManagementPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;