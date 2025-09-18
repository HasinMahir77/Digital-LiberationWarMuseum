import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTranslation } from 'react-i18next';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const roleHierarchy: Record<UserRole, number> = {
  public: 0,
  researcher: 1,
  curator: 2,
  archivist: 3,
  super_admin: 4,
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole = 'researcher' }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privateRoute.accessDenied')}</h2>
          <p className="text-gray-600 mb-6">{t('privateRoute.noPermission')}</p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;