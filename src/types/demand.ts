export interface Demand {
  id?: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_team: string;
  title: string;
  description: string;
  category: 'suporte' | 'bug' | 'feature' | 'outros';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  attachments?: FileAttachment[] | string;
  file_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface FileAttachment {
  id: string;
  filename: string;
  url: string;
  size: number;
  type: string;
}

export type CreateDemandInput = Omit<Demand, 'id' | 'created_at' | 'updated_at'>;