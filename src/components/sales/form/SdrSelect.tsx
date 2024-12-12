import React from 'react';
import { User } from 'lucide-react';

interface SdrSelectProps {
  sdrId: string;
  onSdrChange: (id: string) => void;
  salesTeam: Array<{ id: string; name: string; role: 'closer' | 'sdr' }>;
  disabled?: boolean;
}

export function SdrSelect({ 
  sdrId, 
  onSdrChange, 
  salesTeam,
  disabled = false 
}: SdrSelectProps) {
  const sdrs = salesTeam.filter(member => member.role === 'sdr');

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        SDR
      </label>
      <select
        required
        disabled={disabled}
        className="w-full bg-dark-300/50 border border-ffb400/10 rounded-md px-3 py-2 text-white focus:ring-ffb400 focus:border-ffb400 disabled:opacity-50"
        value={sdrId}
        onChange={(e) => onSdrChange(e.target.value)}
      >
        <option value="">Selecione um SDR</option>
        {sdrs.map((sdr) => (
          <option key={sdr.id} value={sdr.id}>
            {sdr.name}
          </option>
        ))}
      </select>
    </div>
  );
}