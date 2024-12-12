import React from 'react';
import { Users } from 'lucide-react';

interface SalesBySDRProps {
  salesBySDR: {
    [key: string]: {
      name: string;
      count: number;
      value: number;
      percentage: number;
    };
  };
}

export function SalesBySDR({ salesBySDR }: SalesBySDRProps) {
  const sdrs = Object.entries(salesBySDR).map(([id, data]) => ({
    id,
    ...data
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 p-6">
      <div className="flex items-center mb-6">
        <Users className="h-6 w-6 text-ffb400 mr-2" />
        <h2 className="text-xl font-semibold text-ffb400">Vendas por SDR</h2>
      </div>
      <div className="space-y-4">
        {sdrs.length > 0 ? (
          sdrs.map((sdr) => (
            <div key={sdr.id} className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-semibold text-white">
                    {sdr.name} ({sdr.count})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-white">
                    R$ {sdr.value.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-dark-300/50">
                <div
                  style={{ width: `${sdr.percentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-ffb400"
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-400 text-right">
                {sdr.percentage.toFixed(1)}% das vendas
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400">
            Nenhuma venda no período
          </div>
        )}
      </div>
    </div>
  );
}