import React from 'react';
import { Trophy, TrendingUp, DollarSign, Target } from 'lucide-react';
import { PerformanceMetrics } from '../../../types/commission';
import { SALES_TARGETS } from '../../../config/commissionConfig';

interface PerformanceCardProps {
  metrics: PerformanceMetrics;
  role: 'closer' | 'sdr';
  userName: string;
}

export function PerformanceCard({ metrics, role, userName }: PerformanceCardProps) {
  const target = role === 'closer' ? SALES_TARGETS.closer : SALES_TARGETS.sdr;

  return (
    <div className="bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-white">{userName}</h3>
          <p className="text-sm text-gray-400">{role === 'closer' ? 'Closer' : 'SDR'}</p>
        </div>
        <div className="bg-ffb400/10 p-2 rounded-full">
          <Trophy className="h-6 w-6 text-ffb400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Added grid layout */}
        <div className="space-y-6">
          {/* Target Progress */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center">
                <Target className="h-4 w-4 text-ffb400 mr-1" />
                <span className="text-gray-400">Meta: R$ {target.toLocaleString('pt-BR')}</span>
              </div>
              <span className="text-ffb400">
                {((metrics.totalValue / target) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="relative h-2 bg-dark-300/50 rounded">
              <div 
                className="absolute h-full bg-ffb400 rounded"
                style={{ width: `${(metrics.totalValue / target) * 100}%` }}
              />
            </div>
          </div>

          {/* Level Info */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Nível Atual</span>
              <span className="text-ffb400">{metrics.currentLevel.name}</span>
            </div>
            <div className="relative h-2 bg-dark-300/50 rounded">
              <div 
                className="absolute h-full bg-ffb400 rounded"
                style={{ width: `${metrics.progressToNextLevel}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {metrics.progressToNextLevel.toFixed(1)}% para o próximo nível
            </p>
          </div>

          {/* Sales Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-300/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Vendas</span>
                <TrendingUp className="h-4 w-4 text-ffb400" />
              </div>
              <p className="text-lg font-semibold text-white mt-1">
                {metrics.totalSales}
              </p>
            </div>
            <div className="bg-dark-300/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Valor Total</span>
                <DollarSign className="h-4 w-4 text-ffb400" />
              </div>
              <p className="text-lg font-semibold text-white mt-1">
                R$ {metrics.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Commission Breakdown */}
        <div className="bg-dark-300/30 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-400 mb-4">Ganhos do Período</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Comissão Base</span>
              <span className="text-white">
                R$ {metrics.totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            {role === 'closer' && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Bônus PIX</span>
                  <span className="text-white">
                    R$ {metrics.pixBonus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Bônus Plano Fee</span>
                  <span className="text-white">
                    R$ {metrics.feePlanBonus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between text-sm font-medium pt-3 mt-3 border-t border-ffb400/10">
              <span className="text-ffb400">Total</span>
              <span className="text-ffb400">
                R$ {metrics.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}