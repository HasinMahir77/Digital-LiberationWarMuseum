import React from "react";
import { useTranslation } from 'react-i18next';

const VirtualTour2Page: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center" 
      style={{ 
        backgroundImage: 'url(\'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/12/15/jadu_ghor_3-min.jpg\')' 
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-gray-800 bg-opacity-60 rounded-lg p-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('virtualTourPage.hero.title')}</h1>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            {t('virtualTourPage.hero.subtitle')}
          </p>
        </div>

        <div className="bg-gray-200 bg-opacity-80 rounded-2xl shadow-lg p-4">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              title="Liberation War Museum Matterport Tour"
              src="https://my.matterport.com/show/?m=EYV8s8TLiwt"
              allow="fullscreen; xr-spatial-tracking"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour2Page;


