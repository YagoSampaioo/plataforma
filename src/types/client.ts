export interface Client {
  id: string;
  name: string;
  email: string;
  team: string;
  admission_date: string;
  current_invoice_amount: number;
  current_invoice_due_date: string;
  current_invoice_status: 'pending' | 'paid' | 'overdue';
  phone?: string;
  status: 'active' | 'inactive';
}