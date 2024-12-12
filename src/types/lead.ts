export interface Lead {
  id: string;
  user_id: string;
  name: string;
  description: string;
  contacts: Contact[];
  created_at: string;
  total_contacts: number;
}

export interface Contact {
  name: string;
  phone: string;
}

export interface CreateLeadInput {
  name: string;
  description: string;
  contacts: Contact[];
}