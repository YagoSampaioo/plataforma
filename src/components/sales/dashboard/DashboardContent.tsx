import React from 'react';
import { KPIGrid } from './KPIGrid';
import { TeamPerformance } from './TeamPerformance';
import { SalesByPlan } from './SalesByPlan';
import { SalesBySDR } from './SalesBySDR';
import { RecentSales } from './RecentSales';
import { SalesStats } from '../../../types/stats';
import { SalesPerformance } from '../../../types/commission';
import { Loader2 } from 'lucide-react';

interface DashboardContentProps {
  isLoading: boolean;
  error: string | null;
  stats: SalesStats;
  teamPerformance: SalesPerformance[];
  userRole: 'closer' | 'sdr';
  onViewAllSales: () => void;
}

export function DashboardContent({
  isLoading,
  error,
  stats,
  teamPerformance,
  userRole,
  onViewAllSales
}: DashboardContentProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 text-ffb400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-md text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <KPIGrid stats={stats} userRole={userRole} />
      <TeamPerformance performances={teamPerformance} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesByPlan salesByPlan={stats.salesByPlan} />
        <SalesBySDR salesBySDR={stats.salesBySDR} />
      </div>

      <RecentSales 
        sales={stats.recentSales} 
        onViewAll={onViewAllSales} 
      />
    </div>
  );
}