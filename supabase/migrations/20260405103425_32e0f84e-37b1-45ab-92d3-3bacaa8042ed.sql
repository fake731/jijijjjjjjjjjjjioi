
-- Banned users table
CREATE TABLE public.banned_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  banned_by UUID,
  reason TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.banned_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Developers can view banned users"
ON public.banned_users FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can ban users"
ON public.banned_users FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can unban users"
ON public.banned_users FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

CREATE UNIQUE INDEX idx_banned_users_user_id ON public.banned_users(user_id);

-- Login exports tracking
CREATE TABLE public.login_exports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  exported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.login_exports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own exports"
ON public.login_exports FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exports"
ON public.login_exports FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE UNIQUE INDEX idx_login_exports_user_id ON public.login_exports(user_id);
