import { supabase } from '../lib/supabase';
import { CommissionLevel } from '../types/commission';

export const commissionService = {
  async getCommissionLevels(): Promise<CommissionLevel[]> {
    try {
      const { data, error } = await supabase
        .from('commission_levels')
        .select('*')
        .order('threshold', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Commission service error:', error);
      throw error;
    }
  }
};