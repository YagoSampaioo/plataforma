import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function LogoutButton() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/plataforma');
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
      title="Sair"
    >
      <LogOut className="h-5 w-5" />
      <span className="ml-2">Sair</span>
    </button>
  );
}