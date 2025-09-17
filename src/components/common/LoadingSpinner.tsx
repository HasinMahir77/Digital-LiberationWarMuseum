import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import banner from '../../assets/images/banner.png'; // Import the banner image

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
        className="text-center bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-xl"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          className="w-20 h-20 border-8 border-green-300 border-t-green-700 rounded-full mx-auto mb-6"
        ></motion.div>
        <p className="text-white text-xl font-semibold">Loading Digital Liberation War Museum...</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;