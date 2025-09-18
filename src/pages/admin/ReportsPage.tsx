import React, { useState } from 'react';
import { Download, FileText, BarChart3, Calendar, Filter } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useTranslation } from 'react-i18next';

const ReportsPage: React.FC = () => {
  const { artifacts } = useData();
  const { t } = useTranslation();
  const [reportType, setReportType] = useState('collection');
  const [dateRange, setDateRange] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async (type: string, format: string) => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would generate and download the actual file
    const filename = `${type}_report_${new Date().toISOString().split('T')[0]}.${format}`;
    alert(t('reportsPage.reportGeneratedAlert', { filename }));
    
    setIsGenerating(false);
  };

  const reportOptions = [
    {
      id: 'collection',
      title: t('reportsPage.reportTemplates.collectionSummaryReport.title'),
      description: t('reportsPage.reportTemplates.collectionSummaryReport.description'),
      icon: FileText,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'analytics',
      title: t('reportsPage.reportTemplates.analyticsReport.title'),
      description: t('reportsPage.reportTemplates.analyticsReport.description'),
      icon: BarChart3,
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 'acquisition',
      title: t('reportsPage.reportTemplates.acquisitionReport.title'),
      description: t('reportsPage.reportTemplates.acquisitionReport.description'),
      icon: Calendar,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'inventory',
      title: t('reportsPage.reportTemplates.inventoryReport.title'),
      description: t('reportsPage.reportTemplates.inventoryReport.description'),
      icon: Filter,
      color: 'bg-orange-100 text-orange-700',
    },
  ];

  const stats = {
    totalArtifacts: artifacts.length,
    publicArtifacts: artifacts.filter(a => a.isPublic).length,
    draftArtifacts: artifacts.filter(a => !a.isPublic).length,
    thisMonth: artifacts.filter(a => 
      new Date(a.dateCreated).getMonth() === new Date().getMonth()
    ).length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('reportsPage.header.title')}</h1>
        <p className="text-gray-600">{t('reportsPage.header.subtitle')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{t('reportsPage.quickStats.totalArtifacts')}</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalArtifacts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{t('reportsPage.quickStats.publicItems')}</h3>
          <p className="text-3xl font-bold text-green-600">{stats.publicArtifacts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{t('reportsPage.quickStats.draftItems')}</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.draftArtifacts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{t('reportsPage.quickStats.thisMonth')}</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.thisMonth}</p>
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('reportsPage.generateReports.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('reportsPage.generateReports.reportTypeLabel')}</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              {reportOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('reportsPage.generateReports.dateRangeLabel')}</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="all">{t('reportsPage.generateReports.dateRangeOptions.all')}</option>
              <option value="this-year">{t('reportsPage.generateReports.dateRangeOptions.thisYear')}</option>
              <option value="this-month">{t('reportsPage.generateReports.dateRangeOptions.thisMonth')}</option>
              <option value="last-30-days">{t('reportsPage.generateReports.dateRangeOptions.last30Days')}</option>
              <option value="custom">{t('reportsPage.generateReports.dateRangeOptions.custom')}</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => generateReport(reportType, 'pdf')}
            disabled={isGenerating}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 inline-flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? t('reportsPage.generateReports.generating') : t('reportsPage.generateReports.downloadPdf')}
          </button>
          <button
            onClick={() => generateReport(reportType, 'xlsx')}
            disabled={isGenerating}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 inline-flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? t('reportsPage.generateReports.generating') : t('reportsPage.generateReports.downloadExcel')}
          </button>
          <button
            onClick={() => generateReport(reportType, 'csv')}
            disabled={isGenerating}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 inline-flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? t('reportsPage.generateReports.generating') : t('reportsPage.generateReports.downloadCsv')}
          </button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <button
                    onClick={() => setReportType(option.id)}
                    className="text-green-700 hover:text-green-800 font-medium text-sm"
                  >
                    {t('reportsPage.reportTemplates.selectThisReport')} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsPage;