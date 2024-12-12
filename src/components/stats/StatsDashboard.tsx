import React from 'react';
import { MessageSquare, Users } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useStats } from '../../hooks/useStats';
import { useAuthStore } from '../../store/authStore';

export function StatsDashboard() {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        title="Total de Demandas"
        value={128}
        subtitle={`+12% desde o último mês`}
        icon={MessageSquare}
        iconColor="text-ffb400"
        iconBgColor="bg-ffb400/10"
      />
      <StatsCard
        title="Em Andamento"
        value={45}
        subtitle={`23 aguardando resposta`}
        icon={MessageSquare}
        iconColor="text-ffb400"
        iconBgColor="bg-ffb400/10"
      />
      <StatsCard
        title="Concluídas"
        value={82}
        subtitle={`95% taxa de resolução`}
        icon={MessageSquare}
        iconColor="text-ffb400"
        iconBgColor="bg-ffb400/10"
      />
      <StatsCard
        title="Clientes Ativos"
        value={64}
        subtitle={`+8 novos este mês`}
        icon={Users}
        iconColor="text-ffb400"
        iconBgColor="bg-ffb400/10"
      />
    </div>
  );
}