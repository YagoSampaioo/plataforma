-- First drop the attachments column if it exists
ALTER TABLE public.demands 
DROP COLUMN IF EXISTS attachments;

-- Re-add the attachments column as JSONB
ALTER TABLE public.demands
ADD COLUMN attachments JSONB DEFAULT '[]'::jsonb;

-- Add file_url column if not exists
ALTER TABLE public.demands
ADD COLUMN IF NOT EXISTS file_url TEXT;

-- Add updated_at column if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'demands' 
    AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE public.demands 
    ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
  END IF;
END $$;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_demands_updated_at ON public.demands;
CREATE TRIGGER update_demands_updated_at
  BEFORE UPDATE ON public.demands
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies
ALTER TABLE public.demands ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own demands
CREATE POLICY "Users can view their own demands"
ON public.demands
FOR SELECT
USING (user_id = auth.uid());

-- Allow employees to view team demands
CREATE POLICY "Employees can view team demands"
ON public.demands
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.employees 
    WHERE id = auth.uid() 
    AND team = demands.user_team
  )
);

-- Allow users to create demands
CREATE POLICY "Users can create demands"
ON public.demands
FOR INSERT
WITH CHECK (true);

-- Allow employees to update team demands
CREATE POLICY "Employees can update team demands"
ON public.demands
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.employees 
    WHERE id = auth.uid() 
    AND team = demands.user_team
  )
);