import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, iconColor, iconBgColor }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-ffb400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-dark-200/40 backdrop-blur-sm p-6 rounded-lg border border-ffb400/10 hover:border-ffb400/30 transition-colors">
        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="text-lg font-medium text-ffb400">{title}</h3>
            <p className="text-3xl font-semibold text-white mt-2">{value}</p>
          </div>
          <div className={`p-3 ${iconBgColor} rounded-full`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}