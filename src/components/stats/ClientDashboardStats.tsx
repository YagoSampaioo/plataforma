import React from 'react';
import { MessageSquare, DollarSign, Send, Clock, CheckCircle, XCircle, AlertTriangle, Users } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useStats } from '../../hooks/useStats';
import { useAuthStore } from '../../store/authStore';
import { MessagingStats } from './MessagingStats';
import { DemandStats } from './DemandStats';

export function ClientDashboardStats() {
  const user = useAuthStore(state => state.user);
  const { stats, isLoading, error } = useStats(user?.team || 'default');

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-dark-200/50 animate-pulse h-32 rounded-lg backdrop-blur-sm" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 mb-8 px-4 sm:px-0">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total de Demandas"
          value={stats.totalDemands}
          subtitle={`${stats.demandsGrowth}% desde o último mês`}
          icon={MessageSquare}
          iconColor="text-ffb400"
          iconBgColor="bg-ffb400/10"
        />
        <StatsCard
          title="Mensagens Enviadas"
          value={stats.totalMessages}
          subtitle={`${stats.messagesSentToday} hoje`}
          icon={Send}
          iconColor="text-ffb400"
          iconBgColor="bg-ffb400/10"
        />
        <StatsCard
          title="Custo Total"
          value={`R$ ${(stats.totalMessages * 0.20).toFixed(2)}`}
          subtitle="R$ 0,20 por mensagem"
          icon={DollarSign}
          iconColor="text-green-400"
          iconBgColor="bg-green-900/30"
        />
        <StatsCard
          title="Contatos Salvos"
          value={stats.totalContacts}
          subtitle={`Em ${stats.totalLeadLists} listas`}
          icon={Users}
          iconColor="text-ffb400"
          iconBgColor="bg-ffb400/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Messaging Stats */}
        <MessagingStats />

        {/* Demand Stats */}
        <DemandStats />
      </div>
    </div>
  );
}