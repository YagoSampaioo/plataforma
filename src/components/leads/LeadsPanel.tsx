import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { leadService } from '../../services/leadService';
import { LeadsList } from './LeadsList';
import { Lead } from '../../types/lead';
import { Users, Search } from 'lucide-react';
import { BackButton } from '../navigation/BackButton';
import { useNavigate } from 'react-router-dom';

export function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      if (!user) return;
      
      try {
        const userLeads = await leadService.getUserLeads(user.id);
        setLeads(userLeads);
      } catch (err) {
        setError('Erro ao carregar as listas de contatos');
        console.error('Error fetching leads:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta lista de contatos?')) return;

    try {
      await leadService.deleteLead(id);
      setLeads(leads.filter(lead => lead.id !== id));
    } catch (err) {
      console.error('Error deleting lead:', err);
      setError('Erro ao excluir lista de contatos');
    }
  };

  const handleSelect = (lead: Lead) => {
    navigate('/whatsapp', { state: { selectedContacts: lead.contacts } });
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative">
          {/* Gradient effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-ffb400/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-ffb400/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative">
            <div className="mb-6">
              <BackButton />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-ffb400 mr-3" />
                <h1 className="text-2xl font-semibold text-ffb400">
                  Listas de Contatos
                </h1>
              </div>
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-ffb400/60" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar listas..."
                  className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-ffb400/20 rounded-md leading-5 bg-dark-200/50 backdrop-blur-sm text-white placeholder-ffb400/60 focus:outline-none focus:ring-2 focus:ring-ffb400/50 focus:border-ffb400/50 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ffb400 mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-400 bg-red-900/20 rounded-lg border border-red-500/20 backdrop-blur-sm">
                {error}
              </div>
            ) : (
              <LeadsList 
                leads={filteredLeads}
                onDelete={handleDelete}
                onSelect={handleSelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}