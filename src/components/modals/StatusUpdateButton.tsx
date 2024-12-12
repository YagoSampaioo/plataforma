import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Demand } from '../../types/demand';

interface StatusUpdateButtonProps {
  status: Demand['status'];
  currentStatus: Demand['status'];
  onUpdate: (status: Demand['status']) => Promise<void>;
}

export function StatusUpdateButton({ status, currentStatus, onUpdate }: StatusUpdateButtonProps) {
  const statusConfig = {
    in_progress: {
      label: 'Em Andamento',
      icon: Clock,
      colors: 'bg-ffb400/10 text-ffb400 hover:bg-ffb400/20'
    },
    completed: {
      label: 'Concluir',
      icon: CheckCircle,
      colors: 'bg-green-900/30 text-green-400 hover:bg-green-900/40'
    },
    cancelled: {
      label: 'Cancelar',
      icon: XCircle,
      colors: 'bg-red-900/30 text-red-400 hover:bg-red-900/40'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <button
      onClick={() => onUpdate(status)}
      disabled={currentStatus === status}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        config.colors
      } ${currentStatus === status ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon className="h-4 w-4 mr-2" />
      {config.label}
    </button>
  );
}