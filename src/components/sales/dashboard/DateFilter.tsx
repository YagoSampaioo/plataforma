import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

export function DateFilter({ period, onPeriodChange }: DateFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-5 w-5 text-ffb400" />
      <select
        value={period}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white text-sm focus:ring-ffb400 focus:border-ffb400"
      >
        <option value="today">Hoje</option>
        <option value="week">Esta Semana</option>
        <option value="month">Este Mês</option>
        <option value="quarter">Este Trimestre</option>
        <option value="year">Este Ano</option>
      </select>
    </div>
  );
}