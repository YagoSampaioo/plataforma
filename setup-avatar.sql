-- Enable the storage extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "storage" SCHEMA "extensions";

-- Add avatar_url column to clients table
ALTER TABLE public.clients
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Add avatar_url column to employees table
ALTER TABLE public.employees
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Remove any existing policies
DROP POLICY IF EXISTS "Avatar storage policy" ON storage.objects;

-- Create a more permissive storage policy
CREATE POLICY "Public Access"
ON storage.objects FOR ALL
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;