import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ArtifactDetailPage from './pages/ArtifactDetailPage';
import TimelinePage from './pages/TimelinePage';
import ExhibitionsPage from './pages/ExhibitionsPage';
import ExhibitionDetailPage from './pages/ExhibitionDetailPage';
import VirtualTourPage from './pages/VirtualTourPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import LoginPage from './pages/auth/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import { AnimatePresence, motion } from 'framer-motion';
import CompetitionsPage from './pages/CompetitionsPage';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import NewsDetailPage from './pages/NewsDetailPage';
import { useTranslation } from 'react-i18next';
// Admin Pages
import ArtifactManagement from './pages/admin/ArtifactManagement';
import UserManagement from './pages/admin/UserManagement';
import ReportsPage from './pages/admin/ReportsPage';
import AddArtifactPage from './pages/admin/AddArtifactPage';
import CreateExhibitionPage from './pages/admin/CreateExhibitionPage';
import CompetitionManagementPage from './pages/admin/CompetitionManagementPage';
import SocialMediaAnalyticsPage from './pages/admin/SocialMediaAnalyticsPage';
import EventManagementPage from './pages/admin/EventManagementPage';
import NewsManagementPage from './pages/admin/NewsManagementPage';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation(); // Add this line to define 't'

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <DataProvider t={t}>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { t } = useTranslation(); // Get the t function from useTranslation

  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/search"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <SearchPage />
                </motion.div>
              }
            />
            <Route
              path="/artifact/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ArtifactDetailPage />
                </motion.div>
              }
            />
            <Route
              path="/timeline"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <TimelinePage />
                </motion.div>
              }
            />
            <Route
              path="/exhibitions"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ExhibitionsPage />
                </motion.div>
              }
            />
            <Route
              path="/exhibition/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ExhibitionDetailPage />
                </motion.div>
              }
            />
            <Route
              path="/virtual-tour"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <VirtualTourPage />
                </motion.div>
              }
            />
            <Route
              path="/competitions"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <CompetitionsPage />
                </motion.div>
              }
            />
            <Route
              path="/competitions/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <CompetitionDetailPage />
                </motion.div>
              }
            />
            <Route
              path="/news"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <NewsPage />
                </motion.div>
              }
            />
            <Route
              path="/news/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <NewsDetailPage />
                </motion.div>
              }
            />
            <Route
              path="/events"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <EventsPage />
                </motion.div>
              }
            />
            <Route
              path="/events/:id"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <EventDetailPage />
                </motion.div>
              }
            />
            <Route
              path="/login"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <LoginPage />
                </motion.div>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="archivist">
                  <AdminDashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminOverviewPage />} />
              <Route path="artifacts" element={<ArtifactManagement />} />
              <Route path="add-artifact" element={<AddArtifactPage />} />
              <Route path="create-exhibition" element={<CreateExhibitionPage />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="competition-management" element={<CompetitionManagementPage />} />
              <Route path="event-management" element={<EventManagementPage />} />
              <Route path="news-management" element={<NewsManagementPage />} />
              <Route path="social-media-analytics" element={<SocialMediaAnalyticsPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;