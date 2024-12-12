-- Add plan column to clients table
ALTER TABLE public.clients
ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'beta' 
CHECK (plan IN ('alpha', 'beta', 'charlie'));

-- Update existing clients to alpha plan
UPDATE public.clients SET plan = 'alpha';