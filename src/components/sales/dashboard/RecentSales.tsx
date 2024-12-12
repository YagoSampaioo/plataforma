import React from 'react';
import { DollarSign } from 'lucide-react';
import { Sale } from '../../../types/sale';

interface RecentSalesProps {
  sales: Sale[];
  onViewAll: () => void;
}

export function RecentSales({ sales, onViewAll }: RecentSalesProps) {
  return (
    <div className="bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className="h-6 w-6 text-ffb400 mr-2" />
          <h2 className="text-xl font-semibold text-ffb400">Vendas Recentes</h2>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm text-ffb400 hover:text-ffb400/80 transition-colors"
        >
          Ver todas
        </button>
      </div>
      <div className="space-y-4">
        {sales.length > 0 ? (
          sales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-4 bg-dark-300/50 rounded-lg"
            >
              <div>
                <p className="font-medium text-white">{sale.client_name}</p>
                <p className="text-sm text-gray-400">Plano {sale.plan.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-ffb400">R$ {sale.value.toFixed(2)}</p>
                <p className="text-sm text-gray-400">
                  {new Date(sale.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400">
            Nenhuma venda recente
          </div>
        )}
      </div>
    </div>
  );
}