-- Update plan check constraint
ALTER TABLE public.sales 
DROP CONSTRAINT IF EXISTS sales_plan_check;

ALTER TABLE public.sales 
ADD CONSTRAINT sales_plan_check 
CHECK (plan IN ('silver', 'gold', 'platinum', 'fee'));

-- Update existing records
UPDATE public.sales 
SET plan = CASE 
  WHEN plan = 'alpha' THEN 'silver'
  WHEN plan = 'beta' THEN 'gold'
  WHEN plan = 'charlie' THEN 'platinum'
  ELSE plan
END;