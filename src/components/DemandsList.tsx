import React, { useState } from 'react';
import { Demand } from '../types/demand';
import { DemandStatusBadge } from './DemandStatusBadge';
import { MessageSquare, Calendar, User, Paperclip, AlertTriangle } from 'lucide-react';
import { demandService } from '../services/demandService';
import { DemandDetailsModal } from './modals/DemandDetailsModal';
import { parseAttachments } from '../utils/attachmentHandling';

interface DemandsListProps {
  demands: Demand[];
  isEmployee?: boolean;
  onStatusUpdate?: () => void;
}

export function DemandsList({ demands, isEmployee = false, onStatusUpdate }: DemandsListProps) {
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = async (demandId: string, newStatus: Demand['status']) => {
    try {
      await demandService.updateDemandStatus(demandId, newStatus);
      if (onStatusUpdate) {
        onStatusUpdate();
      }
      setSelectedDemand(null);
    } catch (err) {
      console.error('Error updating demand status:', err);
      setError('Erro ao atualizar o status da demanda');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {error && (
        <div className="bg-red-900/30 border border-red-500/20 p-4 rounded-lg backdrop-blur-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-400">{error}</h3>
            </div>
          </div>
        </div>
      )}
      
      {demands.map((demand) => (
        <div
          key={demand.id}
          onClick={() => setSelectedDemand(demand)}
          className="group relative bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 hover:border-ffb400/30 transition-all duration-300 cursor-pointer"
        >
          {/* Hover effect gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-ffb400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          
          <div className="relative p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-start space-x-4">
                <div className="bg-ffb400/10 rounded-full p-2">
                  <MessageSquare className="h-6 w-6 text-ffb400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white group-hover:text-ffb400 transition-colors">
                    {demand.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                    {demand.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <DemandStatusBadge status={demand.status} />
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-300/50 text-gray-400">
                      {demand.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                {isEmployee && (
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <User className="h-4 w-4" />
                    <span>{demand.user_name}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(demand.created_at!).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>

            {/* Attachments Preview */}
            {demand.attachments && (
              <div className="mt-4 pt-4 border-t border-ffb400/10">
                <div className="flex items-center text-sm text-gray-400">
                  <Paperclip className="h-4 w-4 mr-2" />
                  <span>Anexos</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {parseAttachments(demand.attachments as string).map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-dark-300/50 rounded-lg text-sm"
                    >
                      <Paperclip className="h-4 w-4 text-ffb400 mr-2" />
                      <span className="text-gray-400">{attachment.filename}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {demands.length === 0 && (
        <div className="text-center py-8 text-gray-400 bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10">
          Nenhuma demanda encontrada.
        </div>
      )}

      {/* Demand Details Modal */}
      {selectedDemand && (
        <DemandDetailsModal
          demand={selectedDemand}
          onClose={() => setSelectedDemand(null)}
          onStatusUpdate={handleStatusUpdate}
          isEmployee={isEmployee}
        />
      )}
    </div>
  );
}