import React, { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';
import { Lead } from '../../types/lead';
import { leadService } from '../../services/leadService';

interface LeadSelectorProps {
  userId: string;
  onSelect: (lead: Lead) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function LeadSelector({ userId, onSelect, isOpen, onClose }: LeadSelectorProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const userLeads = await leadService.getUserLeads(userId);
        setLeads(userLeads);
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchLeads();
    }
  }, [userId, isOpen]);

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-dark-200/90 rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-ffb400 mr-2" />
            <h2 className="text-xl font-semibold text-ffb400">
              Selecionar Lista de Contatos
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ffb400/60" />
            <input
              type="text"
              placeholder="Buscar listas..."
              className="w-full pl-10 pr-3 py-2 bg-dark-300/50 border border-ffb400/10 rounded-md text-white placeholder-ffb400/60 focus:ring-ffb400 focus:border-ffb400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ffb400 mx-auto"></div>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {filteredLeads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => {
                  onSelect(lead);
                  onClose();
                }}
                className="w-full text-left p-4 bg-dark-300/30 hover:bg-dark-300/50 rounded-lg transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-medium group-hover:text-ffb400 transition-colors">
                      {lead.name}
                    </h3>
                    {lead.description && (
                      <p className="text-sm text-gray-400 mt-1">
                        {lead.description}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {lead.total_contacts} contatos
                  </span>
                </div>
              </button>
            ))}
            {filteredLeads.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                Nenhuma lista encontrada
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}