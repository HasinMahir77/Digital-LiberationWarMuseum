import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Shield, User } from 'lucide-react';
import { UserRole } from '../../contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  dateCreated: string;
  lastLogin: string;
  isActive: boolean;
}

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  const users: User[] = [
    {
      id: '1',
      name: 'Dr. Rahman Ahmed',
      email: 'admin@museum.gov.bd',
      role: 'super_admin',
      dateCreated: '2024-01-01',
      lastLogin: '2024-12-28',
      isActive: true,
    },
    {
      id: '2',
      name: 'Fatima Khan',
      email: 'archivist@museum.gov.bd',
      role: 'archivist',
      dateCreated: '2024-01-15',
      lastLogin: '2024-12-27',
      isActive: true,
    },
    {
      id: '3',
      name: 'Mohammad Hassan',
      email: 'curator@museum.gov.bd',
      role: 'curator',
      dateCreated: '2024-02-01',
      lastLogin: '2024-12-26',
      isActive: true,
    },
  ];

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'archivist':
        return 'bg-blue-100 text-blue-800';
      case 'curator':
        return 'bg-green-100 text-green-800';
      case 'researcher':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    if (role === 'super_admin') {
      return <Shield className="w-4 h-4" />;
    }
    return <User className="w-4 h-4" />;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors inline-flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="archivist">Archivist</option>
              <option value="curator">Curator</option>
              <option value="researcher">Researcher</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      <span className="capitalize">{user.role.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{users.length}</h3>
          <p className="text-gray-600 text-sm">Total Users</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {users.filter(u => u.role === 'super_admin').length}
          </h3>
          <p className="text-gray-600 text-sm">Administrators</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {users.filter(u => u.role === 'archivist' || u.role === 'curator').length}
          </h3>
          <p className="text-gray-600 text-sm">Staff Members</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {users.filter(u => u.isActive).length}
          </h3>
          <p className="text-gray-600 text-sm">Active Users</p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;