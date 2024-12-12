-- Enable the storage extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "storage" SCHEMA "extensions";

-- Create storage bucket for demands if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('demands', 'demands', true)
ON CONFLICT (id) DO NOTHING;

-- Remove any existing policies
DROP POLICY IF EXISTS "Demand files access policy" ON storage.objects;

-- Create a more permissive storage policy for demands bucket
CREATE POLICY "Public Access"
ON storage.objects FOR ALL
USING (bucket_id = 'demands')
WITH CHECK (bucket_id = 'demands');

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;