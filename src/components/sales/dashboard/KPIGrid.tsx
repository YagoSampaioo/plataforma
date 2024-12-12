import React from 'react';
import { DollarSign, Users, Target } from 'lucide-react';
import { StatsCard } from '../../stats/StatsCard';
import { SalesStats } from '../../../types/stats';
import { SALES_TARGETS } from '../../../config/commissionConfig';

interface KPIGridProps {
  stats: SalesStats;
  userRole: 'closer' | 'sdr';
}

export function KPIGrid({ stats, userRole }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      <StatsCard
        title="Total de Vendas"
        value={`R$ ${stats.totalValue.toFixed(2)}`}
        subtitle={`${stats.totalSales} vendas no período`}
        icon={DollarSign}
        iconColor="text-green-400"
        iconBgColor="bg-green-900/30"
      />
      <StatsCard
        title="Meta Atingida"
        value={`${((stats.totalValue / SALES_TARGETS[userRole]) * 100).toFixed(1)}%`}
        subtitle={`Meta: R$ ${SALES_TARGETS[userRole].toLocaleString('pt-BR')}`}
        icon={Target}
        iconColor="text-ffb400"
        iconBgColor="bg-ffb400/10"
      />
      <StatsCard
        title="Novos Clientes"
        value={stats.newClientsCount.toString()}
        subtitle="no período"
        icon={Users}
        iconColor="text-ffb400"
        iconBgColor="bg-ffb400/10"
      />
    </div>
  );
}