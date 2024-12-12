-- Update sales table to allow 'fee' plan
ALTER TABLE public.sales 
DROP CONSTRAINT IF EXISTS sales_plan_check;

ALTER TABLE public.sales 
ADD CONSTRAINT sales_plan_check 
CHECK (plan IN ('alpha', 'beta', 'charlie', 'fee'));

-- Add payment_method column if not exists
ALTER TABLE public.sales 
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20) 
CHECK (payment_method IN ('pix', 'credit_card', 'bank_transfer'));

-- Update existing records with default payment method
UPDATE public.sales 
SET payment_method = 'credit_card' 
WHERE payment_method IS NULL;

-- Make payment_method required
ALTER TABLE public.sales 
ALTER COLUMN payment_method SET NOT NULL;