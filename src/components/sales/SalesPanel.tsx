import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { saleService } from '../../services/saleService';
import { SalesList } from './SalesList';
import { Sale } from '../../types/sale';
import { DollarSign, Search, Plus, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BackButton } from '../navigation/BackButton';
import { LogoutButton } from '../navigation/LogoutButton';

export function SalesPanel() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    const fetchSales = async () => {
      if (!user) return;
      
      try {
        const userSales = await saleService.getSales(user.id);
        setSales(userSales);
      } catch (err) {
        setError('Erro ao carregar as vendas');
        console.error('Error fetching sales:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, [user]);

  const filteredSales = sales.filter(sale =>
    sale.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.client_email.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="flex justify-between items-center mb-6">
              <BackButton />
              <LogoutButton />
            </div>

            {message && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-500/30 rounded-md text-green-400">
                {message}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-ffb400 mr-3" />
                <h1 className="text-2xl font-semibold text-ffb400">
                  Minhas Vendas
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-ffb400/60" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar vendas..."
                    className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-ffb400/20 rounded-md leading-5 bg-dark-200/50 backdrop-blur-sm text-white placeholder-ffb400/60 focus:outline-none focus:ring-2 focus:ring-ffb400/50 focus:border-ffb400/50 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => navigate('/sales/new')}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ffb400 hover:bg-ffb400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb400 w-full sm:w-auto"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nova Venda
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-ffb400 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-400 bg-red-900/20 rounded-lg border border-red-500/20 backdrop-blur-sm">
                {error}
              </div>
            ) : (
              <SalesList sales={filteredSales} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}