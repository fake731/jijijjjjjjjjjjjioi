-- Add style overrides column for visual editor (drag positions + colors)
ALTER TABLE public.site_content
  ADD COLUMN IF NOT EXISTS style_overrides jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Programming content table for /البرمجة page
CREATE TABLE IF NOT EXISTS public.programming_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  description text,
  code_example text,
  explanation text,
  difficulty text NOT NULL DEFAULT 'beginner',
  order_index integer NOT NULL DEFAULT 0,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.programming_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view programming content"
  ON public.programming_content FOR SELECT TO public USING (true);

CREATE POLICY "Developers can insert programming content"
  ON public.programming_content FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can update programming content"
  ON public.programming_content FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can delete programming content"
  ON public.programming_content FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

CREATE TRIGGER update_programming_content_updated_at
  BEFORE UPDATE ON public.programming_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- User badges table (achievements from quiz)
CREATE TABLE IF NOT EXISTS public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  badge_key text NOT NULL,
  badge_label text NOT NULL,
  earned_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  UNIQUE (user_id, badge_key)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own badges"
  ON public.user_badges FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Users insert own badges"
  ON public.user_badges FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Developers delete badges"
  ON public.user_badges FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));