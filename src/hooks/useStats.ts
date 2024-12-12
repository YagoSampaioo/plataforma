import { useState, useEffect } from 'react';
import { statsService } from '../services/statsService';

interface DashboardStats {
  totalDemands: number;
  demandsGrowth: number;
  totalMessages: number;
  messagesSentToday: number;
  totalContacts: number;
  totalLeadLists: number;
  demandsByStatus: {
    pending: number;
    in_progress: number;
    completed: number;
    cancelled: number;
  };
  demandsByPriority: {
    baixa: number;
    normal: number;
    alta: number;
    urgente: number;
  };
  messageStats: {
    deliveryRate: number;
    averageTime: number;
    timeline: Array<{
      date: string;
      count: number;
    }>;
  };
}

export function useStats(team: string) {
  const [stats, setStats] = useState<DashboardStats>({
    totalDemands: 0,
    demandsGrowth: 0,
    totalMessages: 0,
    messagesSentToday: 0,
    totalContacts: 0,
    totalLeadLists: 0,
    demandsByStatus: {
      pending: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0
    },
    demandsByPriority: {
      baixa: 0,
      normal: 0,
      alta: 0,
      urgente: 0
    },
    messageStats: {
      deliveryRate: 0,
      averageTime: 0,
      timeline: []
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsService.getDashboardStats(team);
        setStats(data);
      } catch (err) {
        setError('Erro ao carregar estatísticas');
        console.error('Error fetching stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [team]);

  return { stats, isLoading, error };
}