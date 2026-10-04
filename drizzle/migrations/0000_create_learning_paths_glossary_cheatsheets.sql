CREATE TABLE public.learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title_ar text NOT NULL,
  title_en text NOT NULL DEFAULT '',
  description_ar text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Route',
  accent text NOT NULL DEFAULT 'cyan',
  category text NOT NULL DEFAULT 'security',
  order_index integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.learning_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id uuid NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  step_type text NOT NULL DEFAULT 'topic',
  target_route text NOT NULL DEFAULT '',
  external_url text NOT NULL DEFAULT '',
  difficulty text NOT NULL DEFAULT 'beginner',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.user_path_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  step_id uuid NOT NULL REFERENCES public.learning_steps(id) ON DELETE CASCADE,
  path_id uuid NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, step_id)
);

CREATE TABLE public.glossary_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  term text NOT NULL,
  term_ar text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'general',
  short_definition text NOT NULL DEFAULT '',
  definition text NOT NULL DEFAULT '',
  example text NOT NULL DEFAULT '',
  related text NOT NULL DEFAULT '',
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.cheat_sheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  tool_name text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  language text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Terminal',
  accent text NOT NULL DEFAULT 'cyan',
  description text NOT NULL DEFAULT '',
  commands jsonb NOT NULL DEFAULT '[]'::jsonb,
  order_index integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX learning_steps_path_idx ON public.learning_steps (path_id, order_index);
CREATE INDEX glossary_terms_category_idx ON public.glossary_terms (category);
CREATE INDEX user_path_progress_user_idx ON public.user_path_progress (user_id, path_id);

GRANT SELECT ON public.learning_paths TO anon, authenticated;
GRANT SELECT ON public.learning_steps TO anon, authenticated;
GRANT SELECT ON public.glossary_terms TO anon, authenticated;
GRANT SELECT ON public.cheat_sheets TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_path_progress TO authenticated;
GRANT ALL ON public.learning_paths TO service_role;
GRANT ALL ON public.learning_steps TO service_role;
GRANT ALL ON public.glossary_terms TO service_role;
GRANT ALL ON public.cheat_sheets TO service_role;
GRANT ALL ON public.user_path_progress TO service_role;

ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cheat_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_path_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read learning paths" ON public.learning_paths FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Developers manage learning paths" ON public.learning_paths FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Public can read learning steps" ON public.learning_steps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Developers manage learning steps" ON public.learning_steps FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Public can read glossary" ON public.glossary_terms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Developers manage glossary" ON public.glossary_terms FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Public can read cheat sheets" ON public.cheat_sheets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Developers manage cheat sheets" ON public.cheat_sheets FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));

CREATE POLICY "Users manage own progress" ON public.user_path_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON public.learning_paths FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_learning_steps_updated_at BEFORE UPDATE ON public.learning_steps FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_glossary_terms_updated_at BEFORE UPDATE ON public.glossary_terms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cheat_sheets_updated_at BEFORE UPDATE ON public.cheat_sheets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();