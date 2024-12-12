import React from 'react';
import { X, Paperclip, ExternalLink, Calendar, User, MessageSquare } from 'lucide-react';
import { Demand } from '../../types/demand';
import { DemandStatusBadge } from '../DemandStatusBadge';
import { DemandPriorityBadge } from '../DemandPriorityBadge';
import { StatusUpdateButton } from './StatusUpdateButton';
import { parseAttachments, formatFileSize } from '../../utils/attachmentHandling';

interface DemandDetailsModalProps {
  demand: Demand;
  onClose: () => void;
  onStatusUpdate: (demandId: string, status: Demand['status']) => Promise<void>;
  isEmployee: boolean;
}

export function DemandDetailsModal({ 
  demand, 
  onClose, 
  onStatusUpdate,
  isEmployee 
}: DemandDetailsModalProps) {
  const attachments = parseAttachments(demand.attachments as string);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-200/90 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-200/90 backdrop-blur-sm border-b border-ffb400/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-ffb400 mr-2" />
              <h2 className="text-xl font-semibold text-ffb400">
                Detalhes da Demanda
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div>
            <h3 className="text-2xl font-medium text-white mb-2">
              {demand.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <DemandPriorityBadge priority={demand.priority} />
              <DemandStatusBadge status={demand.status} />
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-300/50 text-gray-400">
                {demand.category}
              </span>
            </div>
            <p className="text-gray-400 whitespace-pre-wrap">
              {demand.description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-b border-ffb400/10">
            <div className="flex items-center text-sm text-gray-400">
              <User className="h-4 w-4 mr-2" />
              <span>Criado por: {demand.user_name}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Data: {new Date(demand.created_at!).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Anexos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-dark-300/50 rounded-lg hover:bg-dark-300/70 transition-colors group"
                  >
                    <Paperclip className="h-5 w-5 text-ffb400 mr-3" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {attachment.filename}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-ffb400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Status Update Buttons */}
          {isEmployee && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-ffb400/10">
              <StatusUpdateButton
                status="in_progress"
                currentStatus={demand.status}
                onUpdate={(status) => onStatusUpdate(demand.id!, status)}
              />
              <StatusUpdateButton
                status="completed"
                currentStatus={demand.status}
                onUpdate={(status) => onStatusUpdate(demand.id!, status)}
              />
              <StatusUpdateButton
                status="cancelled"
                currentStatus={demand.status}
                onUpdate={(status) => onStatusUpdate(demand.id!, status)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}