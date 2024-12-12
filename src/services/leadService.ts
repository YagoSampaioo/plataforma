import { supabase } from '../lib/supabase';
import { CreateLeadInput, Lead } from '../types/lead';

export const leadService = {
  async createLead(userId: string, input: CreateLeadInput): Promise<Lead> {
    try {
      const { data, error } = await supabase
        .from('whatsapp_leads')
        .insert([{
          user_id: userId,
          name: input.name,
          description: input.description,
          contacts: input.contacts,
          total_contacts: input.contacts.length
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Lead service error:', error);
      throw error;
    }
  },

  async getUserLeads(userId: string): Promise<Lead[]> {
    try {
      const { data, error } = await supabase
        .from('whatsapp_leads')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Lead service error:', error);
      throw error;
    }
  },

  async getLead(id: string): Promise<Lead> {
    try {
      const { data, error } = await supabase
        .from('whatsapp_leads')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Lead service error:', error);
      throw error;
    }
  },

  async deleteLead(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('whatsapp_leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Lead service error:', error);
      throw error;
    }
  }
};