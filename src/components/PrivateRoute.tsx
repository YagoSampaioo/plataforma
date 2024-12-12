import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedPlans?: string[];
}

export function PrivateRoute({ children, allowedPlans }: PrivateRouteProps) {
  const { isAuthenticated, user, checkSession } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      checkSession();
    }
  }, [isAuthenticated, checkSession]);

  if (!isAuthenticated) {
    return <Navigate to="/plataforma" state={{ from: location }} replace />;
  }

  // Check plan restrictions
  if (allowedPlans && user?.role === 'cliente' && user?.plan && !allowedPlans.includes(user.plan)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect commercial team to their dashboard
  if (user?.team === 'comercial') {
    const allowedPaths = ['/sales-dashboard', '/sales', '/sales/new'];
    if (!allowedPaths.includes(location.pathname)) {
      return <Navigate to="/sales-dashboard" replace />;
    }
  }

  // Redirect to appropriate dashboard based on user role
  if (user?.role === 'funcionario' && location.pathname === '/dashboard') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}