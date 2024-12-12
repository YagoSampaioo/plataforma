import { supabase } from '../lib/supabase';

export const statsService = {
  async getDashboardStats(team: string) {
    try {
      // Get current date and last month date
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      const today = new Date().toISOString().split('T')[0];

      // Get demands statistics
      const { data: demands } = await supabase
        .from('demands')
        .select('*')
        .eq('user_team', team);

      const { data: lastMonthDemands } = await supabase
        .from('demands')
        .select('*')
        .eq('user_team', team)
        .lt('created_at', lastMonth.toISOString());

      // Get WhatsApp campaign statistics
      const { data: campaigns } = await supabase
        .from('whatsapp_campaigns')
        .select('*')
        .eq('team', team);

      const { data: todayCampaigns } = await supabase
        .from('whatsapp_campaigns')
        .select('*')
        .eq('team', team)
        .gte('created_at', today);

      // Get leads statistics
      const { data: leads } = await supabase
        .from('whatsapp_leads')
        .select('*')
        .eq('team', team);

      // Calculate statistics
      const totalDemands = demands?.length || 0;
      const lastMonthDemandsCount = lastMonthDemands?.length || 0;
      const demandsGrowth = lastMonthDemandsCount > 0
        ? ((totalDemands - lastMonthDemandsCount) / lastMonthDemandsCount * 100).toFixed(0)
        : 0;

      const totalMessages = campaigns?.reduce((sum, campaign) => sum + campaign.total_contacts, 0) || 0;
      const messagesSentToday = todayCampaigns?.reduce((sum, campaign) => sum + campaign.total_contacts, 0) || 0;

      const totalContacts = leads?.reduce((sum, lead) => sum + lead.total_contacts, 0) || 0;
      const totalLeadLists = leads?.length || 0;

      // Group demands by status
      const demandsByStatus = {
        pending: demands?.filter(d => d.status === 'pending').length || 0,
        in_progress: demands?.filter(d => d.status === 'in_progress').length || 0,
        completed: demands?.filter(d => d.status === 'completed').length || 0,
        cancelled: demands?.filter(d => d.status === 'cancelled').length || 0
      };

      // Group demands by priority
      const demandsByPriority = {
        baixa: demands?.filter(d => d.priority === 'baixa').length || 0,
        normal: demands?.filter(d => d.priority === 'normal').length || 0,
        alta: demands?.filter(d => d.priority === 'alta').length || 0,
        urgente: demands?.filter(d => d.priority === 'urgente').length || 0
      };

      return {
        totalDemands,
        demandsGrowth,
        totalMessages,
        messagesSentToday,
        totalContacts,
        totalLeadLists,
        demandsByStatus,
        demandsByPriority,
        messageStats: {
          deliveryRate: 98.5, // Example value
          averageTime: 1.2, // Example value
          timeline: [] // To be implemented with actual data
        }
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
};