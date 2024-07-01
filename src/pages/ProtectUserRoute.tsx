import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: ReactNode;
}

const ProtectedUserRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/', children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedUserRoute;