export interface Sale {
  id: string;
  seller_id: string;
  seller_name: string;
  sdr_id: string;
  sdr_name: string;
  client_name: string;
  client_phone: string;
  plan: 'silver' | 'gold' | 'platinum' | 'fee';
  value: number;
  status: 'pending' | 'approved' | 'rejected';
  payment_method?: 'pix' | 'credit_card' | 'bank_transfer';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSaleInput {
  seller_id: string;
  seller_name: string;
  sdr_id: string;
  sdr_name: string;
  client_name: string;
  client_phone: string;
  plan: 'silver' | 'gold' | 'platinum' | 'fee';
  value: number;
  payment_method: 'pix' | 'credit_card' | 'bank_transfer';
  notes?: string;
}