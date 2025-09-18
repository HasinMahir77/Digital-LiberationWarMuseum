import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LW</span>
              </div>
              <h3 className="text-lg font-bold">{t('footer.archiveTitle')}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.archiveDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-gray-300 hover:text-green-400 transition-colors text-sm">{t('footer.quickLinks.browseCollection')}</Link></li>
              <li><Link to="/timeline" className="text-gray-300 hover:text-green-400 transition-colors text-sm">{t('footer.quickLinks.historicalTimeline')}</Link></li>
              <li><Link to="/exhibitions" className="text-gray-300 hover:text-green-400 transition-colors text-sm">{t('footer.quickLinks.digitalExhibitions')}</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">{t('footer.quickLinks.researchGuidelines')}</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contactUs.title')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">{t('footer.contactUs.address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">+880-2-9667051</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">archive@lwmuseum.org</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.followUs.title')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-green-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-green-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-green-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-green-400 text-sm transition-colors">{t('footer.privacyPolicy')}</a>
              <a href="#" className="text-gray-300 hover:text-green-400 text-sm transition-colors">{t('footer.termsOfService')}</a>
              <a href="#" className="text-gray-300 hover:text-green-400 text-sm transition-colors">{t('footer.accessibility')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;