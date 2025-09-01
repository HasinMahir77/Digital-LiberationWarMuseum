import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, Image, FileText, Map } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const HomePage: React.FC = () => {
  const { artifacts } = useData();
  const featuredArtifacts = artifacts.slice(0, 3);

  return (
    <div className="min-h-screen bg-cover bg-fixed bg-center" style={{ backgroundImage: 'url(\'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/12/15/jadu_ghor_7-min.jpg\')' }}>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Liberation War Digital Archive
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
            Preserving the memory of Bangladesh's struggle for independence through comprehensive digital heritage collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/search"
              className="bg-white text-green-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Explore Collection
            </Link>
            <Link 
              to="/timeline"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-800 transition-colors inline-flex items-center justify-center"
            >
              <Clock className="w-5 h-5 mr-2" />
              Historical Timeline
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{artifacts.length}+</h3>
              <p className="text-white">Digital Artifacts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">50+</h3>
              <p className="text-white">Historical Documents</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">25+</h3>
              <p className="text-white">Locations Covered</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">271</h3>
              <p className="text-white">Days of Liberation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artifacts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Artifacts
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Discover remarkable pieces from our collection that tell the story of Bangladesh's journey to independence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtifacts.map((artifact) => (
              <div key={artifact.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={artifact.images[0]} 
                    alt={artifact.objectHead}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {artifact.objectHead}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {artifact.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {artifact.objectType}
                    </span>
                    <Link 
                      to={`/artifact/${artifact.id}`}
                      className="text-green-700 hover:text-green-800 font-medium text-sm inline-flex items-center"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/search"
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors inline-flex items-center"
            >
              View All Artifacts
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Contribute to History
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Help us preserve Bangladesh's liberation history. Share your family's artifacts, stories, and memories with our digital archive.
          </p>
          <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Learn About Contributing
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;