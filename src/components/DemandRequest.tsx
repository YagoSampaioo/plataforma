import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useDemand } from '../hooks/useDemand';
import { useFileHandling } from '../hooks/useFileHandling';
import { Send, AlertCircle } from 'lucide-react';
import type { CreateDemandInput } from '../types/demand';
import { BackButton } from './navigation/BackButton';
import { FileUpload } from './FileUpload';

export function DemandRequest() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const { createDemand, isSubmitting, error } = useDemand();
  const { 
    attachments, 
    uploadError, 
    handleFilesSelected, 
    handleRemoveAttachment 
  } = useFileHandling();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'suporte' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      console.error('No user found');
      return;
    }

    const demandData: CreateDemandInput = {
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
      user_team: user.team || 'default',
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: 'pending',
      attachments
    };

    try {
      await createDemand(demandData);
      navigate('/dashboard', { 
        state: { message: 'Demanda criada com sucesso!' }
      });
    } catch (err) {
      console.error('Form submission error:', err);
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
            <h2 className="text-2xl font-semibold text-ffb400">Nova Demanda</h2>
            <p className="mt-2 text-gray-400">Preencha os detalhes da sua solicitação abaixo</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-ffb400 focus:border-ffb400"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Digite um título para sua demanda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-ffb400 focus:border-ffb400"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva detalhadamente sua solicitação"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Categoria
                </label>
                <select
                  className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CreateDemandInput['category'] })}
                >
                  <option value="suporte">Suporte</option>
                  <option value="bug">Bug</option>
                  <option value="feature">Nova Funcionalidade</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Anexos
                </label>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  attachments={attachments}
                  onRemoveAttachment={handleRemoveAttachment}
                />
              </div>
            </div>

            {(error || uploadError) && (
              <div className="flex items-center p-4 bg-red-900/30 border border-red-500/30 rounded-md text-red-400">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error || uploadError}</span>
              </div>
            )}

            <div className="pt-4">
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
                    Enviar Demanda
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}