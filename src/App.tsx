import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { DemandRequest } from './components/DemandRequest';
import { DemandsPanel } from './components/DemandsPanel';
import { TeamClientsPanel } from './components/TeamClientsPanel';
import { SettingsPage } from './components/settings/SettingsPage';
import { WhatsAppMessaging } from './components/messaging/WhatsAppMessaging';
import { LeadsPanel } from './components/leads/LeadsPanel';
import { SalesPanel } from './components/sales/SalesPanel';
import { SalesDashboard } from './components/sales/SalesDashboard';
import { SalesForm } from './components/sales/SalesForm';
import { useAuthStore } from './store/authStore';
import { PrivateRoute } from './components/PrivateRoute';

export default function App() {
  const { user, checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const getDefaultRoute = (user: any) => {
    if (!user) return '/plataforma';
    if (user.team === 'comercial') return '/sales-dashboard';
    if (user.role === 'funcionario') return '/admin';
    return '/dashboard';
  };

  return (
    <Router>
      <Routes>
        <Route path="/plataforma" element={<LoginForm />} />
        
        {/* Client Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        {/* Employee Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />
        
        {/* Sales Routes */}
        <Route
          path="/sales-dashboard"
          element={
            <PrivateRoute>
              <SalesDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <SalesPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales/new"
          element={
            <PrivateRoute>
              <SalesForm />
            </PrivateRoute>
          }
        />
        
        {/* Common Routes */}
        <Route
          path="/demands"
          element={
            <PrivateRoute>
              <DemandsPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <TeamClientsPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/whatsapp"
          element={
            <PrivateRoute>
              <WhatsAppMessaging />
            </PrivateRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <PrivateRoute>
              <LeadsPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/demand-request"
          element={
            <PrivateRoute>
              <DemandRequest />
            </PrivateRoute>
          }
        />
        <Route 
          path="/" 
          element={
            <Navigate 
              to={getDefaultRoute(user)} 
              replace 
            />
          } 
        />
      </Routes>
    </Router>
  );
}