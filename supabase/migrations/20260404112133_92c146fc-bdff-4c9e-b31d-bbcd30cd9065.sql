
-- OTP table for password recovery
CREATE TABLE public.password_reset_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  otp_hash text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  attempts integer NOT NULL DEFAULT 0,
  max_attempts integer NOT NULL DEFAULT 5,
  used boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.password_reset_otps ENABLE ROW LEVEL SECURITY;

-- Only service role can access this table (via edge functions)
-- No direct client access needed

-- AI Settings table
CREATE TABLE public.ai_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text NOT NULL UNIQUE,
  setting_value text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.ai_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Developers can view ai_settings"
ON public.ai_settings FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can update ai_settings"
ON public.ai_settings FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Developers can insert ai_settings"
ON public.ai_settings FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'developer'));

-- Insert default AI settings
INSERT INTO public.ai_settings (setting_key, setting_value) VALUES
  ('advanced_content_password', 'Qusay_kali'),
  ('ai_behavior', 'formal'),
  ('free_messages_daily', '1');

-- Auto-cleanup expired OTPs (function)
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.password_reset_otps
  WHERE expires_at < now() OR used = true;
$$;
