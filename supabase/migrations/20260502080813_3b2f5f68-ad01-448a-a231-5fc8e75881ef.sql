-- Feature flags table (real DB-backed)
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flag_key text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  enabled boolean NOT NULL DEFAULT true,
  updated_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view feature flags" ON public.feature_flags FOR SELECT USING (true);
CREATE POLICY "Developers can insert feature flags" ON public.feature_flags FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'developer'::app_role));
CREATE POLICY "Developers can update feature flags" ON public.feature_flags FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'developer'::app_role));
CREATE POLICY "Developers can delete feature flags" ON public.feature_flags FOR DELETE TO authenticated USING (has_role(auth.uid(), 'developer'::app_role));

CREATE TRIGGER update_feature_flags_updated_at
BEFORE UPDATE ON public.feature_flags
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed defaults
INSERT INTO public.feature_flags (flag_key, name, description, enabled) VALUES
  ('ai_chat', 'محادثات الذكاء الاصطناعي', 'السماح باستخدام محادثات AI', true),
  ('image_upload', 'رفع الصور', 'السماح برفع الصور في المحادثات', true),
  ('notifications', 'الإشعارات', 'تفعيل نظام الإشعارات', true),
  ('privacy_mode', 'وضع الخصوصية', 'إخفاء معلومات حساسة', false),
  ('realtime', 'التحديث الفوري', 'تحديث البيانات في الوقت الحقيقي', true),
  ('quiz_enabled', 'قسم الاختبار', 'تفعيل صفحة الاختبار', true),
  ('inline_editor', 'محرر المحتوى المباشر', 'السماح للمطور بتعديل المحتوى من أي صفحة', true)
ON CONFLICT (flag_key) DO NOTHING;