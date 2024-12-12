import { supabase } from '../lib/supabase';
import { Sale, CreateSaleInput } from '../types/sale';
import { SalesStats } from '../types/stats';
import { getDateRangeForPeriod } from '../utils/dateUtils';
import { calculateSalesMetrics } from '../utils/salesMetrics';

export const saleService = {
  async createSale(input: CreateSaleInput): Promise<Sale> {
    try {
      const { data, error } = await supabase
        .from('sales')
        .insert([{
          ...input,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sale service error:', error);
      throw error;
    }
  },

  async getSales(userId: string): Promise<Sale[]> {
    try {
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .or(`seller_id.eq.${userId},sdr_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Sale service error:', error);
      throw error;
    }
  },

  async getSalesStats(userId: string, period: string = 'month'): Promise<SalesStats> {
    try {
      const startDate = getDateRangeForPeriod(period);

      const { data: periodSales, error: salesError } = await supabase
        .from('sales')
        .select('*')
        .or(`seller_id.eq.${userId},sdr_id.eq.${userId}`)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (salesError) throw salesError;

      const { data: recentSales, error: recentError } = await supabase
        .from('sales')
        .select('*')
        .or(`seller_id.eq.${userId},sdr_id.eq.${userId}`)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      return calculateSalesMetrics(periodSales || [], recentSales || []);
    } catch (error) {
      console.error('Sales stats error:', error);
      throw error;
    }
  },

  async getSalesTeam() {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('id, name, role')
        .eq('team', 'comercial')
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get sales team error:', error);
      throw error;
    }
  },

  async getSalesTargets() {
    try {
      const { data, error } = await supabase
        .from('sales_targets')
        .select('role, target_value')
        .gte('end_date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Get sales targets error:', error);
      throw error;
    }
  }
};