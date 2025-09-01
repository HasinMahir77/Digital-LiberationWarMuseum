import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, EyeOff, Plus, Search } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const ArtifactManagement: React.FC = () => {
  const { artifacts, updateArtifact, deleteArtifact } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesSearch = artifact.objectHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artifact.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'public' && artifact.isPublic) ||
                         (filterStatus === 'draft' && !artifact.isPublic);
    return matchesSearch && matchesStatus;
  });

  const togglePublicStatus = (id: string, currentStatus: boolean) => {
    updateArtifact(id, { isPublic: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this artifact? This action cannot be undone.')) {
      deleteArtifact(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Artifact Management</h1>
          <p className="text-gray-600">Manage your digital collection items</p>
        </div>
        <Link
          to="/admin/add-artifact"
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors inline-flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Artifact
        </Link>
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
                placeholder="Search artifacts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="public">Public</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Artifacts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artifact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArtifacts.map((artifact) => (
                <tr key={artifact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={artifact.images[0]}
                        alt={artifact.objectHead}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{artifact.objectHead}</h3>
                        <p className="text-sm text-gray-600">{artifact.objectType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-900 font-medium">{artifact.collectionNumber}</p>
                      <p className="text-gray-600">{artifact.contributorName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      artifact.isPublic
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {artifact.isPublic ? 'Public' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(artifact.dateCreated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/artifact/${artifact.id}`}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => togglePublicStatus(artifact.id, artifact.isPublic)}
                        className="text-gray-400 hover:text-green-600 transition-colors"
                        title={artifact.isPublic ? 'Make Private' : 'Make Public'}
                      >
                        {artifact.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(artifact.id)}
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
    </div>
  );
};

export default ArtifactManagement;