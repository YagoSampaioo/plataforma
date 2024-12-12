import { supabase } from '../lib/supabase';
import { CreateDemandInput, Demand } from '../types/demand';

export const demandService = {
  async createDemand(input: CreateDemandInput): Promise<Demand> {
    try {
      // First, get the client's team
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('team')
        .eq('id', input.user_id)
        .single();

      if (clientError) {
        console.error('Error fetching client team:', clientError);
        throw new Error('Erro ao obter informações do cliente');
      }

      // Get the first attachment URL if exists
      const fileUrl = input.attachments && input.attachments.length > 0 
        ? input.attachments[0].url 
        : null;

      // Prepare demand data
      const demandData = {
        ...input,
        user_team: clientData.team,
        attachments: input.attachments ? JSON.stringify(input.attachments) : null,
        file_url: fileUrl
      };

      const { data, error } = await supabase
        .from('demands')
        .insert([demandData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Erro ao criar demanda');
      }

      return data;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  async getUserDemands(userId: string): Promise<Demand[]> {
    try {
      const { data, error } = await supabase
        .from('demands')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  async getTeamDemands(team: string): Promise<Demand[]> {
    try {
      const { data, error } = await supabase
        .from('demands')
        .select('*')
        .eq('user_team', team)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },

  async updateDemandStatus(demandId: string, status: Demand['status']): Promise<void> {
    try {
      const { error } = await supabase
        .from('demands')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', demandId);

      if (error) throw error;
    } catch (error) {
      console.error('Service error:', error);
      throw new Error('Erro ao atualizar status da demanda');
    }
  }
};