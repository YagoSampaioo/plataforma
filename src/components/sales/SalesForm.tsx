import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { saleService } from '../../services/saleService';
import { CreateSaleInput } from '../../types/sale';
import { Send, AlertCircle } from 'lucide-react';
import { BackButton } from '../navigation/BackButton';

export function SalesForm() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [salesTeam, setSalesTeam] = useState<{ id: string; name: string; role: 'closer' | 'sdr' }[]>([]);
  
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    sdr_id: '',
    plan: 'silver' as const,
    isFee: false,
    value: '',
    payment_method: 'credit_card' as const,
    notes: ''
  });

  useEffect(() => {
    const fetchSalesTeam = async () => {
      try {
        const team = await saleService.getSalesTeam();
        setSalesTeam(team.filter(member => member.role === 'sdr'));
      } catch (err) {
        console.error('Error fetching sales team:', err);
        setError('Erro ao carregar equipe comercial');
      }
    };

    fetchSalesTeam();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const selectedSDR = salesTeam.find(member => member.id === formData.sdr_id);
      if (!selectedSDR) {
        throw new Error('SDR não selecionado');
      }

      const saleData: CreateSaleInput = {
        seller_id: user.id,
        seller_name: user.name,
        sdr_id: selectedSDR.id,
        sdr_name: selectedSDR.name,
        client_name: formData.client_name,
        client_phone: formData.client_phone,
        plan: formData.isFee ? 'fee' : formData.plan,
        value: parseFloat(formData.value),
        payment_method: formData.payment_method,
        notes: formData.notes
      };

      await saleService.createSale(saleData);
      navigate('/sales', { 
        state: { message: 'Venda registrada com sucesso!' }
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Erro ao registrar venda. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="relative max-w-4xl mx-auto px-4 py-12">
        {/* Gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-ffb400/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ffb400/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10 p-8">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-ffb400">Nova Venda</h2>
            <p className="mt-2 text-gray-400">Registre os detalhes da venda</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-ffb400 focus:border-ffb400"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-ffb400 focus:border-ffb400"
                    value={formData.client_phone}
                    onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    SDR
                  </label>
                  <select
                    required
                    className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400"
                    value={formData.sdr_id}
                    onChange={(e) => setFormData({ ...formData, sdr_id: e.target.value })}
                  >
                    <option value="">Selecione um SDR</option>
                    {salesTeam.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Plano
                  </label>
                  <div className="space-y-2">
                    <select
                      required
                      disabled={formData.isFee}
                      className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400 disabled:opacity-50"
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value as CreateSaleInput['plan'] })}
                    >
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
                    </select>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isFee}
                        onChange={(e) => setFormData({ ...formData, isFee: e.target.checked })}
                        className="rounded border-ffb400/20 text-ffb400 focus:ring-ffb400"
                      />
                      <span className="text-sm text-gray-400">Plano Fee</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Método de Pagamento
                  </label>
                  <select
                    required
                    className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400"
                    value={formData.payment_method}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value as CreateSaleInput['payment_method'] })}
                  >
                    <option value="credit_card">Cartão de Crédito</option>
                    <option value="pix">PIX</option>
                    <option value="bank_transfer">Transferência Bancária</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Valor
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-ffb400 focus:border-ffb400"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Observações
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-ffb400 focus:border-ffb400"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center p-4 bg-red-900/30 border border-red-500/30 rounded-md text-red-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ffb400 hover:bg-ffb400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb400 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  <span className="ml-2">Enviando...</span>
                </div>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Registrar Venda
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}