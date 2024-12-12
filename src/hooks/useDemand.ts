import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demandService } from '../services/demandService';
import { CreateDemandInput } from '../types/demand';

export function useDemand() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const createDemand = async (input: CreateDemandInput) => {
    setIsSubmitting(true);
    setError('');

    try {
      await demandService.createDemand(input);
      navigate('/dashboard', { 
        state: { message: 'Pedido de demanda enviado com sucesso!' }
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar pedido de demanda';
      console.error('Create demand error:', err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createDemand,
    isSubmitting,
    error,
  };
}