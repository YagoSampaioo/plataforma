import React from 'react';
import { Sidebar } from './navigation/Sidebar';
import { StatsDashboard } from './stats/StatsDashboard';
import { DemandsPanel } from './DemandsPanel';

export function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-16 transition-all duration-300">
          <div className="relative py-6">
            {/* Gradient effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-ffb400/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-ffb400/10 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <StatsDashboard />
              <DemandsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}