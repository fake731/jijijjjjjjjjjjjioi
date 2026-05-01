-- Helper function for timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- site_content table
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL UNIQUE,
  content_value TEXT NOT NULL,
  page TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  updated_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content"
ON public.site_content FOR SELECT
USING (true);

CREATE POLICY "Developers can insert site content"
ON public.site_content FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can update site content"
ON public.site_content FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can delete site content"
ON public.site_content FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- user_ai_limits table
CREATE TABLE public.user_ai_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  daily_limit INTEGER NOT NULL DEFAULT 3,
  unlimited BOOLEAN NOT NULL DEFAULT false,
  set_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_ai_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ai limit"
ON public.user_ai_limits FOR SELECT TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can insert ai limits"
ON public.user_ai_limits FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can update ai limits"
ON public.user_ai_limits FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can delete ai limits"
ON public.user_ai_limits FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE TRIGGER update_user_ai_limits_updated_at
BEFORE UPDATE ON public.user_ai_limits
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();