import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          i18n.language === 'bn' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={() => changeLanguage('bn')}
      >
        বাংলা
      </button>
    </div>
  );
};

export default LanguageToggle;
