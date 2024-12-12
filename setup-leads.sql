-- Create table for WhatsApp leads
CREATE TABLE IF NOT EXISTS public.whatsapp_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  contacts JSONB NOT NULL,
  total_contacts INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_whatsapp_leads_user_id ON public.whatsapp_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_leads_created_at ON public.whatsapp_leads(created_at);

-- Enable RLS
ALTER TABLE public.whatsapp_leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own leads"
  ON public.whatsapp_leads
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create leads"
  ON public.whatsapp_leads
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete their own leads"
  ON public.whatsapp_leads
  FOR DELETE
  USING (user_id = auth.uid());