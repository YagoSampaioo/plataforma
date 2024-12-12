-- Insert sales team user if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.employees WHERE email = 'comercial@assessorialpha.com') THEN
    INSERT INTO public.employees (
      id,
      name,
      email,
      password,
      team,
      admission_date,
      created_at
    ) VALUES (
      uuid_generate_v4(),
      'Comercial Alpha',
      'comercial@assessorialpha.com',
      '123456',
      'comercial',
      '2024-01-01',
      CURRENT_TIMESTAMP
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.employees WHERE email = 'sdr@assessorialpha.com') THEN
    INSERT INTO public.employees (
      id,
      name,
      email,
      password,
      team,
      admission_date,
      created_at
    ) VALUES (
      uuid_generate_v4(),
      'SDR Alpha',
      'sdr@assessorialpha.com',
      '123456',
      'comercial',
      '2024-01-01',
      CURRENT_TIMESTAMP
    );
  END IF;
END
$$;