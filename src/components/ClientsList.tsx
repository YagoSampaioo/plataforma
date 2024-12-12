import React from 'react';
import { Client } from '../types/client';
import { User, UserCheck, UserX, Phone, Mail, Calendar, CreditCard } from 'lucide-react';

interface ClientsListProps {
  clients: Client[];
}

export function ClientsList({ clients }: ClientsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients.map((client) => (
        <div
          key={client.id}
          className="group relative bg-dark-200/40 backdrop-blur-sm rounded-lg p-6 border border-ffb400/10 hover:border-ffb400/30 transition-all duration-300"
        >
          {/* Hover effect gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-ffb400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          
          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-ffb400/10 rounded-full p-2">
                  <User className="h-6 w-6 text-ffb400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{client.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.status === 'active' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {client.status === 'active' ? (
                      <><UserCheck className="w-3 h-3 mr-1" /> Ativo</>
                    ) : (
                      <><UserX className="w-3 h-3 mr-1" /> Inativo</>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-400 hover:text-ffb400 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                <a href={`mailto:${client.email}`}>
                  {client.email}
                </a>
              </div>
              {client.phone && (
                <div className="flex items-center text-sm text-gray-400 hover:text-ffb400 transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${client.phone}`}>
                    {client.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                Cliente desde {new Date(client.admission_date).toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-ffb400/10">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-medium text-gray-400">Fatura Atual</span>
                <span className="text-lg font-semibold text-white">
                  R$ {client.current_invoice_amount.toFixed(2)}
                </span>
              </div>
              <div className="mt-1 flex justify-between items-baseline">
                <span className="text-sm text-gray-400">Vencimento</span>
                <span className="text-sm text-gray-400">
                  {new Date(client.current_invoice_due_date).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  client.current_invoice_status === 'paid' 
                    ? 'bg-green-900/30 text-green-400' 
                    : client.current_invoice_status === 'pending' 
                    ? 'bg-ffb400/20 text-ffb400' 
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  <CreditCard className="w-3 h-3 mr-1" />
                  {client.current_invoice_status === 'paid' ? 'Pago' :
                   client.current_invoice_status === 'pending' ? 'Pendente' : 'Atrasado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {clients.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-400 bg-dark-200/40 backdrop-blur-sm rounded-lg border border-ffb400/10">
          Nenhum cliente encontrado para esta equipe.
        </div>
      )}
    </div>
  );
}