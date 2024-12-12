import React from 'react';
import { User } from 'lucide-react';

interface CloserSelectProps {
  closerId: string;
  onCloserChange: (id: string) => void;
  salesTeam: Array<{ id: string; name: string; role: 'closer' | 'sdr' }>;
  disabled?: boolean;
}

export function CloserSelect({ 
  closerId, 
  onCloserChange, 
  salesTeam,
  disabled = false 
}: CloserSelectProps) {
  const closers = salesTeam.filter(member => member.role === 'closer');

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        Closer
      </label>
      <select
        required
        disabled={disabled}
        className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400 disabled:opacity-50"
        value={closerId}
        onChange={(e) => onCloserChange(e.target.value)}
      >
        <option value="">Selecione um closer</option>
        {closers.map((closer) => (
          <option key={closer.id} value={closer.id}>
            {closer.name}
          </option>
        ))}
      </select>
    </div>
  );
}