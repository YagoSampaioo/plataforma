import React from 'react';
import { Users } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { SalesPerformance } from '../../../types/commission';
import { PerformanceCard } from './PerformanceCard';

interface TeamPerformanceProps {
  performances: SalesPerformance[];
}

export function TeamPerformance({ performances }: TeamPerformanceProps) {
  const user = useAuthStore(state => state.user);
  
  // Filter performances based on user's role
  const userPerformance = performances.find(p => p.userId === user?.id);
  
  if (!userPerformance) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Users className="h-6 w-6 text-ffb400 mr-2" />
        <h2 className="text-xl font-semibold text-ffb400">Meu Desempenho</h2>
      </div>

      <div className="w-full"> {/* Changed from max-w-2xl to w-full */}
        <PerformanceCard
          metrics={userPerformance.metrics}
          role={userPerformance.role}
          userName={userPerformance.userName}
        />
      </div>
    </div>
  );
}