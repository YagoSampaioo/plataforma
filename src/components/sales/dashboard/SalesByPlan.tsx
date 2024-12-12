import React from 'react';
import { BarChart2 } from 'lucide-react';

interface SalesByPlanProps {
  salesByPlan: {
    silver: { count: number; percentage: number };
    gold: { count: number; percentage: number };
    platinum: { count: number; percentage: number };
  };
}

export function SalesByPlan({ salesByPlan }: SalesByPlanProps) {
  const plans = [
    { name: 'Silver', ...salesByPlan.silver },
    { name: 'Gold', ...salesByPlan.gold },
    { name: 'Platinum', ...salesByPlan.platinum }
  ];

  return (
    <div className="bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 p-6">
      <div className="flex items-center mb-6">
        <BarChart2 className="h-6 w-6 text-ffb400 mr-2" />
        <h2 className="text-xl font-semibold text-ffb400">Vendas por Plano</h2>
      </div>
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.name} className="relative pt-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-semibold text-white">
                  Plano {plan.name} ({plan.count})
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-white">
                  {plan.percentage?.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-dark-300/50">
              <div
                style={{ width: `${plan.percentage || 0}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-ffb400${
                  plan.name === 'Silver' ? '' : plan.name === 'Gold' ? '/60' : '/40'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}