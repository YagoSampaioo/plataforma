import React from 'react';
import { MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';

export function DemandStats() {
  return (
    <div className="bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 p-6">
      <div className="flex items-center mb-6">
        <MessageSquare className="h-6 w-6 text-ffb400 mr-2" />
        <h2 className="text-xl font-semibold text-ffb400">Estatísticas de Demandas</h2>
      </div>

      <div className="space-y-6">
        {/* Status Distribution */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-4">Distribuição por Status</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-dark-300/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pendentes</p>
                  <p className="text-2xl font-semibold text-white mt-1">12</p>
                </div>
                <div className="bg-ffb400/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-ffb400" />
                </div>
              </div>
            </div>

            <div className="bg-dark-300/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Em Andamento</p>
                  <p className="text-2xl font-semibold text-white mt-1">5</p>
                </div>
                <div className="bg-ffb400/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-ffb400" />
                </div>
              </div>
            </div>

            <div className="bg-dark-300/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Concluídas</p>
                  <p className="text-2xl font-semibold text-white mt-1">45</p>
                </div>
                <div className="bg-green-900/30 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-dark-300/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Canceladas</p>
                  <p className="text-2xl font-semibold text-white mt-1">3</p>
                </div>
                <div className="bg-red-900/30 p-2 rounded-full">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-4">Distribuição por Prioridade</h3>
          <div className="h-48 bg-dark-300/50 rounded-lg p-4">
            {/* Add chart component here */}
          </div>
        </div>
      </div>
    </div>
  );
}