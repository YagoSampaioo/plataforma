import React, { useState } from 'react';
import { Contact } from '../../types/lead';
import { Users, Save } from 'lucide-react';

interface SaveLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
  contactsCount: number;
}

export function SaveLeadDialog({ isOpen, onClose, onSave, contactsCount }: SaveLeadDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, description);
    setName('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-dark-200/90 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center mb-4">
          <Users className="h-6 w-6 text-ffb400 mr-2" />
          <h2 className="text-xl font-semibold text-ffb400">
            Salvar Lista de Contatos
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nome da Lista
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400"
              placeholder="Ex: Clientes Ativos"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400"
              placeholder="Adicione uma descrição para esta lista"
              rows={3}
            />
          </div>

          <div className="text-sm text-gray-400">
            Esta lista contém {contactsCount} contatos
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-ffb400 hover:bg-ffb400/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ffb400"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Lista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}