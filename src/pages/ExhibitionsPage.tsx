import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Eye, Star } from 'lucide-react';
import { exhibitions } from '../exhibitionData';
import { Exhibition } from '../types';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

const ExhibitionsPage: React.FC = () => {
  const { user } = useAuth(); // Get the current user

  const canCurate = user && (user.role === 'super_admin' || user.role === 'archivist' || user.role === 'curator');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Digital Exhibitions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore carefully curated collections that tell specific stories about Bangladesh's Liberation War through thematic narratives and expert insights
          </p>
        </div>

        {/* Featured Exhibition */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            Featured Exhibition
          </h2>
          
          {exhibitions
            .filter(exhibition => exhibition.featured)
            .slice(0, 1)
            .map((exhibition) => (
              <div key={exhibition.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:h-full md:w-96"
                      src={exhibition.featuredImage}
                      alt={exhibition.title}
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-green-600 font-semibold mb-2">
                      Featured Exhibition
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {exhibition.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {exhibition.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Curator's Note</h4>
                      <p className="text-gray-700 italic text-sm">
                        "{exhibition.curatorNote}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{exhibition.viewCount.toLocaleString()} views</span>
                        </span>
                        <span>{exhibition.artifactCount} artifacts</span>
                      </div>
                      <Link
                        to={`/exhibition/${exhibition.id}`}
                        className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors inline-flex items-center"
                      >
                        Explore Exhibition
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* All Exhibitions Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Exhibitions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exhibitions.map((exhibition) => (
              <div key={exhibition.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={exhibition.featuredImage}
                    alt={exhibition.title}
                    className="w-full h-48 object-cover"
                  />
                  {exhibition.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {exhibition.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {exhibition.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{exhibition.viewCount.toLocaleString()}</span>
                      </span>
                      <span>{exhibition.artifactCount} artifacts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(exhibition.dateCreated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/exhibition/${exhibition.id}`}
                    className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-colors text-center text-sm font-medium inline-flex items-center justify-center"
                  >
                    Explore Exhibition
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Exhibition CTA */}
        {canCurate && (
          <div className="mt-16 bg-gradient-to-r from-green-700 to-green-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Create Your Own Exhibition
            </h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Curators and researchers can create thematic exhibitions that tell specific stories using artifacts from our collection.
            </p>
            <Link to="/admin/create-exhibition" className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Curating
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitionsPage;