import React from 'react';
import { Demand } from '../types/demand';
import { Flag, AlertTriangle, AlertOctagon } from 'lucide-react';

interface DemandPriorityBadgeProps {
  priority: Demand['priority'];
}

const priorityConfig = {
  baixa: { 
    color: 'bg-dark-300/50 text-gray-400', 
    icon: Flag,
    label: 'Baixa' 
  },
  normal: { 
    color: 'bg-ffb400/20 text-ffb400', 
    icon: Flag,
    label: 'Normal' 
  },
  alta: { 
    color: 'bg-orange-900/30 text-orange-400', 
    icon: AlertTriangle,
    label: 'Alta' 
  },
  urgente: { 
    color: 'bg-red-900/30 text-red-400', 
    icon: AlertOctagon,
    label: 'Urgente' 
  }
} as const;

export function DemandPriorityBadge({ priority }: DemandPriorityBadgeProps) {
  // Default to normal priority if undefined or invalid
  const config = priorityConfig[priority] || priorityConfig.normal;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
}