import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, Image, FileText, Map, Trophy } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';

const MotionLink = motion(Link);

const HomePage: React.FC = () => {
  const { artifacts } = useData();
  const { t } = useTranslation();
  const featuredArtifacts = artifacts.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const sectionTransition = {
    duration: 0.6,
    ease: [0.42, 0, 0.58, 1],
    staggerChildren: 0.1
  };

  const quickStatsRef = useRef(null);
  const quickStatsInView = useInView(quickStatsRef, { once: true, amount: 0.3 });

  const featuredArtifactsRef = useRef(null);
  const featuredArtifactsInView = useInView(featuredArtifactsRef, { once: true, amount: 0.3 });

  const callToActionRef = useRef(null);
  const callToActionInView = useInView(callToActionRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-cover bg-fixed bg-center" style={{ backgroundImage: 'url(\'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/12/15/jadu_ghor_7-min.jpg\')' }}>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MotionLink 
              to="/search"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-800 px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              {t('hero.exploreCollection')}
            </MotionLink>
            <MotionLink 
              to="/timeline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              <Clock className="w-5 h-5 mr-2" />
              {t('hero.historicalTimeline')}
            </MotionLink>
            <MotionLink 
              to="/competitions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center"
            >
              <Trophy className="w-5 h-5 mr-2" />
              {t('hero.competitions')}
            </MotionLink>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section ref={quickStatsRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={quickStatsInView ? "visible" : "hidden"}
            transition={{ ...sectionTransition, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{t('homePage.quickStats.digitalArtifactsCount', { count: artifacts.length })}</h3>
              <p className="text-white">{t('homePage.quickStats.digitalArtifacts')}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{t('homePage.quickStats.historicalDocumentsCount')}</h3>
              <p className="text-white">{t('homePage.quickStats.historicalDocuments')}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{t('homePage.quickStats.locationsCoveredCount')}</h3>
              <p className="text-white">{t('homePage.quickStats.locationsCovered')}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{t('homePage.quickStats.daysOfLiberationCount')}</h3>
              <p className="text-white">{t('homePage.quickStats.daysOfLiberation')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artifacts */}
      <section ref={featuredArtifactsRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuredArtifactsInView ? "visible" : "hidden"}
            transition={{ ...sectionTransition, delay: 0.4 }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('homePage.featuredArtifacts.title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-white max-w-2xl mx-auto">
              {t('homePage.featuredArtifacts.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuredArtifactsInView ? "visible" : "hidden"}
            transition={{ ...sectionTransition, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredArtifacts.map((artifact) => (
              <motion.div 
                key={artifact.id} 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={artifact.images[0]} 
                    alt={t(artifact.objectHead)}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t(artifact.objectHead)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {t(artifact.description)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {t(artifact.objectType)}
                    </span>
                    <MotionLink 
                      to={`/artifact/${artifact.id}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-green-700 hover:text-green-800 font-medium text-sm inline-flex items-center"
                    >
                      {t('homePage.featuredArtifacts.viewDetails')}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </MotionLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={featuredArtifactsInView ? "visible" : "hidden"}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center mt-12"
          >
            <MotionLink 
              to="/search"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors inline-flex items-center"
            >
              {t('homePage.featuredArtifacts.viewAllArtifacts')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </MotionLink>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={callToActionRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            animate={callToActionInView ? "visible" : "hidden"}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            {t('homePage.callToAction.title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate={callToActionInView ? "visible" : "hidden"}
            className="text-xl text-green-100 mb-8 max-w-2xl mx-auto"
          >
            {t('homePage.callToAction.subtitle')}
          </motion.p>
          <motion.button
            variants={itemVariants}
            initial="hidden"
            animate={callToActionInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.05 }}
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            {t('homePage.callToAction.button')}
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;