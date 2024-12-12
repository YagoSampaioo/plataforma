import React from 'react';
import { Lock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface PlanRestrictedProps {
  children: React.ReactNode;
  allowedPlans: string[];
  fallback?: React.ReactNode;
}

export function PlanRestricted({ children, allowedPlans, fallback }: PlanRestrictedProps) {
  const user = useAuthStore(state => state.user);

  if (!user || !user.plan) return null;

  if (user.role === 'funcionario' || allowedPlans.includes(user.plan)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
        <div className="text-center">
          <Lock className="h-8 w-8 text-ffb400 mx-auto mb-2" />
          <p className="text-sm text-gray-400">
            Disponível apenas para plano {allowedPlans.join(' ou ')}
          </p>
        </div>
      </div>
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
    </div>
  );
}