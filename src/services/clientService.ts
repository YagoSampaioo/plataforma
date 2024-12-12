import { supabase } from '../lib/supabase';
import { Client } from '../types/client';

export const clientService = {
  async getTeamClients(team: string): Promise<Client[]> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('team', team)
        .order('name');

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }
};