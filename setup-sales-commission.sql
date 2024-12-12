-- Add role column to employees if it doesn't exist
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS role VARCHAR(10) CHECK (role IN ('closer', 'sdr'));

-- Update existing employees with roles
UPDATE public.employees 
SET role = 'closer' 
WHERE email = 'comercial@assessorialpha.com';

UPDATE public.employees 
SET role = 'sdr' 
WHERE email = 'sdr@assessorialpha.com';

-- Add payment_method to sales table if it doesn't exist
ALTER TABLE public.sales 
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20) CHECK (payment_method IN ('pix', 'credit_card', 'bank_transfer'));

-- Create commission_levels table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.commission_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  threshold DECIMAL(4,2) NOT NULL,
  closer_commission DECIMAL(10,2) NOT NULL,
  sdr_commission DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create sales_targets table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.sales_targets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role VARCHAR(10) NOT NULL CHECK (role IN ('closer', 'sdr')),
  target_value DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial commission levels
INSERT INTO public.commission_levels (name, threshold, closer_commission, sdr_commission)
VALUES 
  ('Base', 0, 0, 0),
  ('Checkpoint 1', 0.20, 130, 100),
  ('Checkpoint 2', 0.65, 230, 180),
  ('Checkpoint Alpha', 1.00, 330, 250)
ON CONFLICT DO NOTHING;

-- Insert initial sales targets
INSERT INTO public.sales_targets (role, target_value, start_date, end_date)
VALUES 
  ('closer', 50000, '2024-01-01', '2024-12-31'),
  ('sdr', 62000, '2024-01-01', '2024-12-31')
ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE public.commission_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_targets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access for commission_levels"
  ON public.commission_levels
  FOR SELECT
  USING (true);

CREATE POLICY "Public read access for sales_targets"
  ON public.sales_targets
  FOR SELECT
  USING (true);