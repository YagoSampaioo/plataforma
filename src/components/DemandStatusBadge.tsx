import React from 'react';
import { Demand } from '../types/demand';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface DemandStatusBadgeProps {
  status: Demand['status'];
}

export function DemandStatusBadge({ status }: DemandStatusBadgeProps) {
  const statusConfig = {
    pending: { 
      color: 'bg-ffb400/20 text-ffb400', 
      icon: AlertCircle,
      label: 'Pendente' 
    },
    in_progress: { 
      color: 'bg-ffb400/20 text-ffb400', 
      icon: Clock,
      label: 'Em Andamento' 
    },
    completed: { 
      color: 'bg-green-900/30 text-green-400', 
      icon: CheckCircle,
      label: 'Concluído' 
    },
    cancelled: { 
      color: 'bg-red-900/30 text-red-400', 
      icon: XCircle,
      label: 'Cancelado' 
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}