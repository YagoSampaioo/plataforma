import React from 'react';
import { DollarSign, Calendar, User, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Sale } from '../../types/sale';

interface SalesListProps {
  sales: Sale[];
}

export function SalesList({ sales }: SalesListProps) {
  const getStatusConfig = (status: Sale['status']) => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-900/30',
          label: 'Aprovada'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-900/30',
          label: 'Rejeitada'
        };
      default:
        return {
          icon: Clock,
          color: 'text-ffb400',
          bgColor: 'bg-ffb400/20',
          label: 'Pendente'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {sales.map((sale) => {
        const statusConfig = getStatusConfig(sale.status);
        const StatusIcon = statusConfig.icon;

        return (
          <div
            key={sale.id}
            className="group relative bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 hover:border-ffb400/30 transition-all duration-300"
          >
            {/* Hover effect gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-ffb400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            
            <div className="relative p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center">
                  <div className="bg-ffb400/10 rounded-full p-2">
                    <DollarSign className="h-6 w-6 text-ffb400" />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-white">
                        {sale.client_name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </span>
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-ffb400">
                      R$ {sale.value.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(sale.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Plano {sale.plan.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-ffb400/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${sale.client_phone}`} className="hover:text-ffb400 transition-colors">
                      {sale.client_phone}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <User className="h-4 w-4 mr-2" />
                    <span>SDR: {sale.sdr_name}</span>
                  </div>
                </div>
                {sale.notes && (
                  <p className="mt-2 text-sm text-gray-400">
                    {sale.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {sales.length === 0 && (
        <div className="text-center py-8 text-gray-400 bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10">
          Nenhuma venda encontrada.
        </div>
      )}
    </div>
  );
}