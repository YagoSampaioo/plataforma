import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Calendar, MessageSquare, Users, Send } from 'lucide-react';
import { LogoutButton } from './navigation/LogoutButton';
import { ClientDashboardStats } from './stats/ClientDashboardStats';
import { PlanRestricted } from './PlanRestricted';
import { DemandStats } from './stats/DemandStats';
import { MessagingStats } from './stats/MessagingStats';

export function Dashboard() {
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-ffb400/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ffb400/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-ffb400">
                Bem-vindo(a), {user.name}
              </h1>
              <div className="flex items-center mt-1 text-sm text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                Equipe: {user.team || 'Não atribuída'}
              </div>
              {user.plan && (
                <div className="mt-1 text-sm">
                  <span className="text-ffb400">Plano: {user.plan.toUpperCase()}</span>
                </div>
              )}
            </div>
            <LogoutButton />
          </div>
          
          {message && (
            <div className="p-4 bg-dark-200/40 backdrop-blur-sm text-ffb400 rounded-md border border-ffb400/10">
              {message}
            </div>
          )}

          {/* Dashboard Stats */}
          <PlanRestricted allowedPlans={['alpha', 'beta']}>
            <DemandStats />
          </PlanRestricted>

          <PlanRestricted allowedPlans={['alpha', 'charlie']}>
            <MessagingStats />
          </PlanRestricted>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PlanRestricted allowedPlans={['alpha', 'beta']}>
              <button
                onClick={() => navigate('/demand-request')}
                className="group relative bg-dark-200/40 backdrop-blur-sm overflow-hidden rounded-lg border border-ffb400/10 hover:border-ffb400/30 transition-all duration-300 p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ffb400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <MessageSquare className="h-5 w-5 text-ffb400" />
                  <span className="ml-2 text-white group-hover:text-ffb400 transition-colors">Nova Demanda</span>
                </div>
              </button>
            </PlanRestricted>

            <PlanRestricted allowedPlans={['alpha', 'charlie']}>
              <button
                onClick={() => navigate('/whatsapp')}
                className="group relative bg-dark-200/40 backdrop-blur-sm overflow-hidden rounded-lg border border-ffb400/10 hover:border-ffb400/30 transition-all duration-300 p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ffb400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Send className="h-5 w-5 text-ffb400" />
                  <span className="ml-2 text-white group-hover:text-ffb400 transition-colors">Envio em Massa</span>
                </div>
              </button>
            </PlanRestricted>

            <PlanRestricted allowedPlans={['alpha', 'charlie']}>
              <button
                onClick={() => navigate('/leads')}
                className="group relative bg-dark-200/40 backdrop-blur-sm overflow-hidden rounded-lg border border-ffb400/10 hover:border-ffb400/30 transition-all duration-300 p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ffb400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Users className="h-5 w-5 text-ffb400" />
                  <span className="ml-2 text-white group-hover:text-ffb400 transition-colors">Listas de Contatos</span>
                </div>
              </button>
            </PlanRestricted>

            <PlanRestricted allowedPlans={['alpha']}>
              <button
                onClick={() => navigate('/demands')}
                className="group relative bg-dark-200/40 backdrop-blur-sm overflow-hidden rounded-lg border border-ffb400/10 hover:border-ffb400/30 transition-all duration-300 p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-ffb400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <MessageSquare className="h-5 w-5 text-ffb400" />
                  <span className="ml-2 text-white group-hover:text-ffb400 transition-colors">Minhas Demandas</span>
                </div>
              </button>
            </PlanRestricted>
          </div>
        </div>
      </div>
    </div>
  );
}