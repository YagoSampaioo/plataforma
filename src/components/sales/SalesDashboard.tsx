import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { saleService } from '../../services/saleService';
import { Plus } from 'lucide-react';
import { SalesHeader } from './dashboard/SalesHeader';
import { DateFilter } from './dashboard/DateFilter';
import { DashboardContent } from './dashboard/DashboardContent';
import { calculateTeamPerformance } from '../../utils/commissionCalculator';
import type { SalesStats } from '../../types/stats';
import type { SalesPerformance } from '../../types/commission';

const initialStats: SalesStats = {
  totalValue: 0,
  totalSales: 0,
  approvedCount: 0,
  approvalRate: 0,
  newClientsCount: 0,
  salesByPlan: {
    silver: { count: 0, percentage: 0 },
    gold: { count: 0, percentage: 0 },
    platinum: { count: 0, percentage: 0 }
  },
  salesBySDR: {},
  recentSales: []
};

export function SalesDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [period, setPeriod] = useState('month');
  const [stats, setStats] = useState<SalesStats>(initialStats);
  const [teamPerformance, setTeamPerformance] = useState<SalesPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        const salesStats = await saleService.getSalesStats(user.id, period);
        setStats(salesStats);

        const team = await saleService.getSalesTeam();
        const performances = calculateTeamPerformance(salesStats.recentSales, team);
        setTeamPerformance(performances);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, period]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-ffb400/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ffb400/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative space-y-6">
          <SalesHeader user={user} />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <button
              onClick={() => navigate('/sales/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ffb400 hover:bg-ffb400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb400"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Venda
            </button>
            <DateFilter period={period} onPeriodChange={setPeriod} />
          </div>

          <DashboardContent
            isLoading={isLoading}
            error={error}
            stats={stats}
            teamPerformance={teamPerformance}
            userRole={user.role === 'funcionario' ? 'closer' : 'sdr'}
            onViewAllSales={() => navigate('/sales')}
          />
        </div>
      </div>
    </div>
  );
}