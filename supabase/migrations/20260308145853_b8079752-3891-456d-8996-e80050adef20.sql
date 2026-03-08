ALTER TABLE public.profiles ADD COLUMN age INTEGER;
ALTER TABLE public.profiles ADD COLUMN privacy_accepted BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN privacy_accepted_at TIMESTAMPTZ;