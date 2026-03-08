
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('developer', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: users can view their own roles
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Auto-assign developer role for specific emails
CREATE OR REPLACE FUNCTION public.auto_assign_developer_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email IN ('faketeam39@gmail.com', 'qusaysawalhy39@gmail.com', 'sawalhy007@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'developer')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_assign_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.auto_assign_developer_role();

-- Page visits tracking table
CREATE TABLE public.page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  page_path text NOT NULL,
  visited_at timestamptz NOT NULL DEFAULT now(),
  user_agent text
);

ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

-- Anyone can insert visits
CREATE POLICY "Anyone can insert visits" ON public.page_visits
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Only developers can view visits
CREATE POLICY "Developers can view all visits" ON public.page_visits
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

-- AI chat logs table
CREATE TABLE public.ai_chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email text,
  message text NOT NULL,
  response text,
  ai_version text DEFAULT 'v1',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_chat_logs ENABLE ROW LEVEL SECURITY;

-- Only developers can view AI logs
CREATE POLICY "Developers can view ai logs" ON public.ai_chat_logs
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

-- Edge functions can insert logs (using anon/service role)
CREATE POLICY "Service can insert ai logs" ON public.ai_chat_logs
FOR INSERT TO authenticated
WITH CHECK (true);

-- Developers can view all profiles
CREATE POLICY "Developers can view all profiles" ON public.profiles
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'developer'));
