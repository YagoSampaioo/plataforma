import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { demandService } from '../services/demandService';
import { DemandsList } from './DemandsList';
import { Demand } from '../types/demand';
import { ListFilter, Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from './navigation/BackButton';

export function DemandsPanel() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  const fetchDemands = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      let fetchedDemands;
      if (user.role === 'funcionario') {
        fetchedDemands = await demandService.getTeamDemands(user.team || 'default');
      } else {
        fetchedDemands = await demandService.getUserDemands(user.id);
      }
      setDemands(fetchedDemands);
    } catch (err) {
      setError('Erro ao carregar as demandas');
      console.error('Error fetching demands:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDemands();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-ffb400/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ffb400/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-2xl font-semibold text-ffb400">
              {user.role === 'funcionario' ? `Demandas da Equipe ${user.team}` : 'Minhas Demandas'}
            </h1>
            <div className="flex space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-ffb400/30 rounded-md shadow-sm text-sm font-medium text-ffb400 bg-dark-200/50 hover:bg-dark-200/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb400 backdrop-blur-sm">
                <ListFilter className="h-4 w-4 mr-2" />
                Filtrar
              </button>
              {user.role === 'cliente' && (
                <button
                  onClick={() => navigate('/demand-request')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ffb400 hover:bg-ffb400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb400"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Demanda
                </button>
              )}
            </div>
          </div>

          <div className="bg-dark-200/40 backdrop-blur-sm shadow overflow-hidden sm:rounded-lg border border-ffb400/10">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-ffb400 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-400 bg-red-900/20 rounded-lg border border-red-500/20 backdrop-blur-sm">
                {error}
              </div>
            ) : (
              <DemandsList 
                demands={demands} 
                isEmployee={user.role === 'funcionario'} 
                onStatusUpdate={fetchDemands}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}