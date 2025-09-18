import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, User, ArrowRight } from 'lucide-react';
import { Artifact } from '../../contexts/DataContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface ArtifactCardProps {
  artifact: Artifact;
  viewMode: 'grid' | 'list';
}

const MotionLink = motion(Link);

const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact, viewMode }) => {
  const { t } = useTranslation();
  if (viewMode === 'list') {
    return (
      <motion.div 
        className="bg-gray-200 bg-opacity-80 rounded-lg shadow-sm border border-gray-300 p-6 hover:shadow-md transition-shadow"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <img
              src={artifact.images[0]}
              alt={t(artifact.objectHead)}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-green-700">
                <MotionLink to={`/artifact/${artifact.id}`}>
                  {t(artifact.objectHead)}
                </MotionLink>
              </h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                {t(artifact.objectType)}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {t(artifact.description)}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{artifact.collectionDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{t(artifact.foundPlace)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{t(artifact.contributorName)}</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <MotionLink
              to={`/artifact/${artifact.id}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-green-700 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </MotionLink>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-gray-200 bg-opacity-80 rounded-lg shadow-sm border border-gray-300 overflow-hidden hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={artifact.images[0]}
          alt={t(artifact.objectHead)}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            {t(artifact.objectType)}
          </span>
          <span className="text-xs text-gray-500">{artifact.collectionNumber}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-green-700">
          <MotionLink to={`/artifact/${artifact.id}`}>
            {t(artifact.objectHead)}
          </MotionLink>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {t(artifact.description)}
        </p>
        
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{artifact.collectionDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{t(artifact.foundPlace)}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {artifact.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {artifact.tags.length > 2 && (
              <span className="text-gray-500 text-xs">+{artifact.tags.length - 2}</span>
            )}
          </div>
          
          <MotionLink
            to={`/artifact/${artifact.id}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-green-700 hover:text-green-800 font-medium text-sm inline-flex items-center"
          >
            {t('artifactCard.grid.viewDetails')}
            <ArrowRight className="w-4 h-4 ml-1" />
          </MotionLink>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtifactCard;