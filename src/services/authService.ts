import { supabase } from '../lib/supabase';
import { User } from '../types/user';

export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      // First try to find the user in the clients table
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (clientData) {
        return {
          id: clientData.id,
          name: clientData.name,
          email: clientData.email,
          role: 'cliente',
          team: clientData.team,
          plan: clientData.plan,
          admissionDate: clientData.admission_date,
          avatarUrl: clientData.avatar_url,
          currentInvoice: {
            amount: clientData.current_invoice_amount || 0,
            dueDate: clientData.current_invoice_due_date || '',
            status: clientData.current_invoice_status || 'paid'
          }
        };
      }

      // If not found in clients, try employees table
      const { data: employeeData, error: employeeError } = await supabase
        .from('employees')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (employeeData) {
        return {
          id: employeeData.id,
          name: employeeData.name,
          email: employeeData.email,
          role: 'funcionario',
          team: employeeData.team,
          admissionDate: employeeData.admission_date,
          avatarUrl: employeeData.avatar_url,
          currentInvoice: {
            amount: 0,
            dueDate: '',
            status: 'paid'
          }
        };
      }

      throw new Error('Email ou senha inválidos');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Email ou senha inválidos');
    }
  },

  async logout() {
    return true;
  },

  async getCurrentSession(): Promise<boolean> {
    return false;
  }
};