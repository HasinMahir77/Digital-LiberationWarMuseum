import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Grid, List, X } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import ArtifactCard from '../components/artifacts/ArtifactCard';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchArtifacts } = useData();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    objectType: 'all',
    dateRange: 'all',
    location: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState(searchArtifacts(''));

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    performSearch(query, filters);
  }, [searchParams]);

  const performSearch = (query: string, currentFilters: any) => {
    const searchResults = searchArtifacts(query, currentFilters);
    setResults(searchResults);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
    performSearch(searchQuery, filters);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    performSearch(searchQuery, newFilters);
  };

  const clearFilters = () => {
    const resetFilters = { objectType: 'all', dateRange: 'all', location: 'all' };
    setFilters(resetFilters);
    performSearch(searchQuery, resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artifacts, collections, descriptions..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </form>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters || hasActiveFilters
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.values(filters).filter(v => v !== 'all').length}
                  </span>
                )}
              </button>
              
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-700 text-sm flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">
                {results.length} artifact{results.length !== 1 ? 's' : ''} found
              </span>
              <div className="flex bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Object Type</label>
                  <select
                    value={filters.objectType}
                    onChange={(e) => handleFilterChange('objectType', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Photograph">Photograph</option>
                    <option value="Document">Document</option>
                    <option value="Weapon">Weapon</option>
                    <option value="Uniform">Uniform</option>
                    <option value="Letter">Letter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Periods</option>
                    <option value="1971">1971</option>
                    <option value="1970-1971">1970-1971</option>
                    <option value="pre-1970">Before 1970</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="all">All Locations</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Jessore">Jessore</option>
                    <option value="Sylhet">Sylhet</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {results.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {results.map((artifact) => (
                <ArtifactCard 
                  key={artifact.id} 
                  artifact={artifact} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No artifacts found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;