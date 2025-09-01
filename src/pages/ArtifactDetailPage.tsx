import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Heart, Calendar, MapPin, User, Tag, Ruler } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const ArtifactDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { artifacts } = useData();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImage, setSelectedImage] = useState(0);

  const artifact = artifacts.find(a => a.id === id);

  if (!artifact) {
    return (
      <div 
        className="min-h-screen bg-cover bg-fixed bg-center flex items-center justify-center" 
        style={{ 
          backgroundImage: 'url(\'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/12/15/jadu_ghor_3-min.jpg?v=2\')' 
        }}
      >
        <div className="text-center bg-gray-200 bg-opacity-80 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Artifact Not Found</h2>
          <p className="text-gray-600 mb-6">The requested artifact could not be found.</p>
          <Link 
            to="/search"
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'provenance', label: 'Provenance' },
    { id: 'media', label: 'Media' },
    { id: 'citation', label: 'Citation' },
  ];

  const citationFormats = {
    apa: `${artifact.contributorName}. (${new Date(artifact.collectionDate).getFullYear()}). ${artifact.objectHead} [${artifact.objectType}]. Liberation War Digital Archive. Retrieved from https://lwarchive.gov.bd/artifact/${artifact.id}`,
    mla: `${artifact.contributorName}. "${artifact.objectHead}." Liberation War Digital Archive, ${new Date(artifact.collectionDate).getFullYear()}, lwarchive.gov.bd/artifact/${artifact.id}.`,
    chicago: `${artifact.contributorName}, "${artifact.objectHead}," Liberation War Digital Archive, accessed ${new Date().toLocaleDateString()}, https://lwarchive.gov.bd/artifact/${artifact.id}.`
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center" 
      style={{ 
        backgroundImage: 'url(\'https://www.aiub.edu/Files/Uploads/original/arcaiubmus2303.jpg\')' 
      }}
    >
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-200 mb-8 bg-gray-800 bg-opacity-60 rounded-lg px-4 py-2">
          <Link to="/" className="hover:text-green-300">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-green-300">Collection</Link>
          <span>/</span>
          <span className="text-white">{artifact.objectHead}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/search"
          className="inline-flex items-center text-green-300 hover:text-green-200 mb-6 transition-colors bg-gray-800 bg-opacity-60 rounded-lg px-4 py-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Media Viewer */}
          <div className="bg-gray-200 bg-opacity-80 rounded-lg shadow-sm border border-gray-300 overflow-hidden">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={artifact.images[selectedImage]}
                alt={artifact.objectHead}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {artifact.images.length > 1 && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2 overflow-x-auto">
                  {artifact.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Save</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              <button className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm">Download</span>
              </button>
            </div>
          </div>

          {/* Artifact Information */}
          <div className="bg-gray-200 bg-opacity-80 rounded-lg shadow-sm border border-gray-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {artifact.objectHead}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  {artifact.objectType}
                </span>
                <span>{artifact.collectionNumber}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{artifact.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Collection Date</p>
                          <p className="text-sm text-gray-600">{artifact.collectionDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Found Place</p>
                          <p className="text-sm text-gray-600">{artifact.foundPlace}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Contributor</p>
                          <p className="text-sm text-gray-600">{artifact.contributorName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Ruler className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Measurement</p>
                          <p className="text-sm text-gray-600">{artifact.measurement}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Tag className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Gallery</p>
                          <p className="text-sm text-gray-600">{artifact.galleryNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {artifact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Significance</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {artifact.significanceComment}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'provenance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Provenance Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1">Accession Number</label>
                        <p className="text-gray-700">{artifact.accessionNumber}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1">Original Contributor</label>
                        <p className="text-gray-700">{artifact.contributorName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1">Date Added to Collection</label>
                        <p className="text-gray-700">{new Date(artifact.dateCreated).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1">Current Location</label>
                        <p className="text-gray-700">Gallery {artifact.galleryNumber}, Liberation War Museum</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'citation' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Citation Formats</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">APA Format</h4>
                      <div className="bg-gray-300 bg-opacity-70 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 font-mono">{citationFormats.apa}</p>
                        <button className="mt-2 text-green-700 hover:text-green-800 text-sm font-medium">
                          Copy APA Citation
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">MLA Format</h4>
                      <div className="bg-gray-300 bg-opacity-70 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 font-mono">{citationFormats.mla}</p>
                        <button className="mt-2 text-green-700 hover:text-green-800 text-sm font-medium">
                          Copy MLA Citation
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Chicago Format</h4>
                      <div className="bg-gray-300 bg-opacity-70 p-4 rounded-lg">
                        <p className="text-sm text-gray-700 font-mono">{citationFormats.chicago}</p>
                        <button className="mt-2 text-green-700 hover:text-green-800 text-sm font-medium">
                          Copy Chicago Citation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Artifacts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-8 bg-gray-800 bg-opacity-60 rounded-lg px-4 py-2">Related Artifacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artifacts
              .filter(a => a.id !== artifact.id && a.isPublic)
              .slice(0, 3)
              .map((relatedArtifact) => (
                <Link
                  key={relatedArtifact.id}
                  to={`/artifact/${relatedArtifact.id}`}
                  className="bg-gray-200 bg-opacity-80 rounded-lg shadow-sm border border-gray-300 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={relatedArtifact.images[0]}
                    alt={relatedArtifact.objectHead}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                      {relatedArtifact.objectHead}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {relatedArtifact.objectType} • {relatedArtifact.collectionDate}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetailPage;