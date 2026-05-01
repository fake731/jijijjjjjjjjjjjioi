-- Quiz Questions Bank
CREATE TABLE public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_index INTEGER NOT NULL DEFAULT 0,
  explanation TEXT,
  question_type TEXT NOT NULL DEFAULT 'mcq',
  challenge_prompt TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz questions"
ON public.quiz_questions FOR SELECT USING (true);

CREATE POLICY "Developers can insert quiz questions"
ON public.quiz_questions FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can update quiz questions"
ON public.quiz_questions FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can delete quiz questions"
ON public.quiz_questions FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE TRIGGER update_quiz_questions_updated_at
BEFORE UPDATE ON public.quiz_questions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Quiz Attempts
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  details JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attempts"
ON public.quiz_attempts FOR SELECT TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Users can insert own attempts"
ON public.quiz_attempts FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Developers can delete attempts"
ON public.quiz_attempts FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

-- IP Logs
CREATE TABLE public.ip_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  ip_address TEXT NOT NULL,
  country TEXT,
  city TEXT,
  region TEXT,
  isp TEXT,
  user_agent TEXT,
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ip_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert ip logs"
ON public.ip_logs FOR INSERT
WITH CHECK (true);

CREATE POLICY "Developers can view ip logs"
ON public.ip_logs FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Users can view own ip logs"
ON public.ip_logs FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Developers can delete ip logs"
ON public.ip_logs FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE INDEX idx_ip_logs_user_id ON public.ip_logs(user_id);
CREATE INDEX idx_ip_logs_created_at ON public.ip_logs(created_at DESC);

-- Update page_visits to allow guests + add geo
ALTER TABLE public.page_visits ADD COLUMN IF NOT EXISTS ip_address TEXT;
ALTER TABLE public.page_visits ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE public.page_visits ADD COLUMN IF NOT EXISTS city TEXT;

DROP POLICY IF EXISTS "Anyone can insert visits" ON public.page_visits;
CREATE POLICY "Anyone can insert visits"
ON public.page_visits FOR INSERT
WITH CHECK (true);