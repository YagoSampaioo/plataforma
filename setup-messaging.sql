-- Create table for WhatsApp campaigns
CREATE TABLE IF NOT EXISTS public.whatsapp_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL,
  team TEXT NOT NULL,
  message TEXT NOT NULL,
  contacts JSONB NOT NULL,
  media_url TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  total_contacts INTEGER NOT NULL,
  sent_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_whatsapp_campaigns_user_id ON public.whatsapp_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_campaigns_team ON public.whatsapp_campaigns(team);
CREATE INDEX IF NOT EXISTS idx_whatsapp_campaigns_status ON public.whatsapp_campaigns(status);

-- Enable RLS
ALTER TABLE public.whatsapp_campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own campaigns"
  ON public.whatsapp_campaigns
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create campaigns"
  ON public.whatsapp_campaigns
  FOR INSERT
  WITH CHECK (true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_whatsapp_campaign_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language plpgsql;

-- Create trigger for timestamp updates
CREATE TRIGGER update_whatsapp_campaign_timestamp
  BEFORE UPDATE ON public.whatsapp_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_whatsapp_campaign_timestamp();

-- Create storage bucket for media if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for media
CREATE POLICY "Public Access"
ON storage.objects FOR ALL
USING (bucket_id = 'media')
WITH CHECK (bucket_id = 'media');

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;