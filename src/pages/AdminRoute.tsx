import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import watchAPI from '@/lib/axiosConfig';

interface AdminRouteProps {
  redirectPath?: string;
  adminRedirectPath?: string;
  children?: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ redirectPath = '/login', adminRedirectPath = '/', children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await watchAPI.get('/auth/me');
        setIsAuthenticated(true);
        setIsAdmin(response.data.user.isAdmin);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={adminRedirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default AdminRoute;
