export interface User {
  id: string;
  name: string;
  email: string;
  role: 'cliente' | 'funcionario';
  team?: string;
  admissionDate: string;
  avatarUrl?: string;
  plan?: 'alpha' | 'beta' | 'charlie';
  currentInvoice: {
    amount: number;
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue';
  };
}