import React from 'react';
import { Users, Trash2, Send, Calendar } from 'lucide-react';
import { Lead } from '../../types/lead';
import { useNavigate } from 'react-router-dom';

interface LeadsListProps {
  leads: Lead[];
  onDelete: (id: string) => void;
  onSelect: (lead: Lead) => void;
}

export function LeadsList({ leads, onDelete, onSelect }: LeadsListProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4">
      {leads.map((lead) => (
        <div
          key={lead.id}
          className="group relative bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 hover:border-ffb400/30 transition-all duration-300"
        >
          {/* Hover effect gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-ffb400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          
          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-ffb400/10 rounded-full p-2">
                  <Users className="h-6 w-6 text-ffb400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{lead.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">{lead.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onSelect(lead)}
                  className="p-2 text-ffb400/60 hover:text-ffb400 transition-colors"
                  title="Usar estes contatos"
                >
                  <Send className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(lead.id)}
                  className="p-2 text-red-400/60 hover:text-red-400 transition-colors"
                  title="Excluir lista"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{lead.total_contacts} contatos</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(lead.created_at).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {leads.length === 0 && (
        <div className="text-center py-8 text-gray-400 bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10">
          Nenhuma lista de contatos encontrada.
        </div>
      )}
    </div>
  );
}