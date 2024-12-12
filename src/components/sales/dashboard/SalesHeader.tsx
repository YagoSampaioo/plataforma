import React from 'react';
import { Users } from 'lucide-react';
import { LogoutButton } from '../../navigation/LogoutButton';
import { User } from '../../../types/user';

interface SalesHeaderProps {
  user: User;
}

export function SalesHeader({ user }: SalesHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-ffb400">
          Bem-vindo(a), {user.name}
        </h1>
        <div className="flex items-center mt-1 text-sm text-gray-400">
          <Users className="h-4 w-4 mr-1" />
          Equipe Comercial
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}