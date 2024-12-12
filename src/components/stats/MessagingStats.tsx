import React from 'react';
import { Send, TrendingUp, Clock } from 'lucide-react';

export function MessagingStats() {
  return (
    <div className="bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 p-6">
      <div className="flex items-center mb-6">
        <Send className="h-6 w-6 text-ffb400 mr-2" />
        <h2 className="text-xl font-semibold text-ffb400">Estatísticas de Mensagens</h2>
      </div>

      <div className="space-y-6">
        {/* Messages Timeline */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-4">Últimos 7 dias</h3>
          <div className="h-48 bg-dark-300/50 rounded-lg p-4">
            {/* Add chart component here */}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-dark-300/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Taxa de Entrega</p>
                <p className="text-2xl font-semibold text-white mt-1">98.5%</p>
              </div>
              <div className="bg-green-900/30 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-dark-300/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Tempo Médio</p>
                <p className="text-2xl font-semibold text-white mt-1">1.2s</p>
              </div>
              <div className="bg-ffb400/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-ffb400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}