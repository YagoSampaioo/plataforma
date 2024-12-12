import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { clientService } from '../services/clientService';
import { ClientsList } from './ClientsList';
import { Client } from '../types/client';
import { Users, Search } from 'lucide-react';
import { BackButton } from './navigation/BackButton';

export function TeamClientsPanel() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const fetchClients = async () => {
      if (!user?.team) return;
      
      try {
        const teamClients = await clientService.getTeamClients(user.team);
        setClients(teamClients);
      } catch (err) {
        setError('Erro ao carregar os clientes');
        console.error('Error fetching clients:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [user]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || user.role !== 'funcionario') return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="relative px-4 py-6 sm:px-0">
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
                  Clientes da Equipe {user.team}
                </h1>
              </div>
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-ffb400/60" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar clientes..."
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
              <ClientsList clients={filteredClients} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}