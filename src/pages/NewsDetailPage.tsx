import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getNewsArticleById } = useData();
  const newsArticle = id ? getNewsArticleById(id) : undefined;
  const { t } = useTranslation();

  if (!newsArticle) {
    return <LoadingSpinner />;
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center text-gray-900 py-12"
      style={{ 
        backgroundImage: 'url(\'https://flass.ewubd.edu/storage/app/uploads/public/5d3/5a2/c0d/5d35a2c0dd4e6880131580.jpg\')' 
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-200 bg-opacity-80 rounded-lg shadow-xl p-8 md:p-12">
          <MotionLink 
            to="/news" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-700 hover:text-gray-900 mb-4 inline-block"
          >
            &larr; {t('newsDetailPage.backToNews')}
          </MotionLink>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center md:text-left">{newsArticle.title}</h1>
          <p className="text-lg text-gray-700 mb-6 text-center md:text-left" dangerouslySetInnerHTML={{ __html: t('newsDetailPage.byAuthorOnDate', { author: newsArticle.author, date: new Date(newsArticle.date).toLocaleDateString() }) }} />

          <div className="flex flex-col md:flex-row gap-8">
            {newsArticle.imageUrl && (
              <div className="md:w-1/2 flex flex-col items-center">
                <img 
                  src={newsArticle.imageUrl} 
                  alt={newsArticle.title} 
                  className="w-full h-96 object-contain rounded-lg shadow-md mb-6"
                />
              </div>
            )}

            <div className="md:w-1/2 flex flex-col justify-between">
              <div className="text-gray-700 leading-relaxed text-lg mb-8">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900">{t('newsDetailPage.contentTitle')}</h2>
                <p>{newsArticle.content}</p>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-xl mb-2 text-gray-900">{t('newsDetailPage.tagsTitle')}</h3>
                <div className="flex flex-wrap gap-2">
                  {newsArticle.tags.map(tag => (
                    <span key={tag} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
