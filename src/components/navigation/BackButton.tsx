import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium text-ffb400 hover:text-ffb400/80 transition-colors ${className}`}
      type="button"
    >
      <ArrowLeft className="h-5 w-5 mr-1" />
      Menu Inicial
    </button>
  );
}