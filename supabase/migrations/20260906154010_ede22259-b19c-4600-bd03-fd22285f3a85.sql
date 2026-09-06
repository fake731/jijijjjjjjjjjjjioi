-- Payment settings (single row)
CREATE TABLE public.payment_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_holder text NOT NULL DEFAULT 'Qusay',
  bank_name text NOT NULL DEFAULT '',
  iban text NOT NULL DEFAULT '',
  account_number text NOT NULL DEFAULT '',
  instructions text NOT NULL DEFAULT '',
  donations_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payment_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_settings TO authenticated;
GRANT ALL ON public.payment_settings TO service_role;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payment_settings_read" ON public.payment_settings FOR SELECT USING (true);
CREATE POLICY "payment_settings_manage" ON public.payment_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE TRIGGER update_payment_settings_updated_at BEFORE UPDATE ON public.payment_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Plans
CREATE TABLE public.subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_key text NOT NULL UNIQUE,
  name_ar text NOT NULL,
  name_en text NOT NULL,
  price_usd numeric(10,2) NOT NULL,
  daily_chats integer NOT NULL DEFAULT 10,
  daily_images integer NOT NULL DEFAULT 10,
  unlimited boolean NOT NULL DEFAULT false,
  duration_days integer NOT NULL DEFAULT 30,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  active boolean NOT NULL DEFAULT true,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subscription_plans TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subscription_plans TO authenticated;
GRANT ALL ON public.subscription_plans TO service_role;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "plans_read" ON public.subscription_plans FOR SELECT USING (true);
CREATE POLICY "plans_manage" ON public.subscription_plans FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Payment requests
CREATE TABLE public.payment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text,
  kind text NOT NULL DEFAULT 'subscription',
  plan_key text,
  amount_usd numeric(10,2) NOT NULL,
  sender_name text,
  transfer_reference text,
  proof_path text,
  note text,
  status text NOT NULL DEFAULT 'pending',
  rejection_reason text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_requests TO authenticated;
GRANT ALL ON public.payment_requests TO service_role;
ALTER TABLE public.payment_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pr_own_select" ON public.payment_requests FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'developer'));
CREATE POLICY "pr_own_insert" ON public.payment_requests FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND status = 'pending');
CREATE POLICY "pr_dev_update" ON public.payment_requests FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "pr_dev_delete" ON public.payment_requests FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'developer'));
CREATE TRIGGER update_payment_requests_updated_at BEFORE UPDATE ON public.payment_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Subscriptions
CREATE TABLE public.user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  plan_key text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  started_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  granted_by uuid,
  source_request_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_subscriptions TO authenticated;
GRANT ALL ON public.user_subscriptions TO service_role;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sub_select" ON public.user_subscriptions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'developer'));
CREATE POLICY "sub_manage" ON public.user_subscriptions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Withdrawals ledger (developer only)
CREATE TABLE public.withdrawals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount_usd numeric(10,2) NOT NULL,
  method text NOT NULL DEFAULT 'bank',
  destination text,
  reference text,
  status text NOT NULL DEFAULT 'pending',
  note text,
  created_by uuid,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.withdrawals TO authenticated;
GRANT ALL ON public.withdrawals TO service_role;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wd_dev_all" ON public.withdrawals FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'developer')) WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE TRIGGER update_withdrawals_updated_at BEFORE UPDATE ON public.withdrawals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Active subscription helper
CREATE OR REPLACE FUNCTION public.get_active_subscription(_user_id uuid)
RETURNS TABLE (plan_key text, unlimited boolean, daily_chats integer, daily_images integer, expires_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.plan_key, p.unlimited, p.daily_chats, p.daily_images, s.expires_at
  FROM public.user_subscriptions s
  JOIN public.subscription_plans p ON p.plan_key = s.plan_key
  WHERE s.user_id = _user_id AND s.status = 'active' AND s.expires_at > now()
  LIMIT 1
$$;

INSERT INTO public.subscription_plans (plan_key, name_ar, name_en, price_usd, daily_chats, daily_images, unlimited, duration_days, order_index, features)
VALUES
  ('pro', 'الباقة الكاملة', 'Pro', 7.00, 0, 0, true, 30, 1,
   '["محادثات بلا حدود","صور وملفات بلا حدود","أولوية في الردود","دعم مباشر"]'::jsonb),
  ('basic', 'الباقة الأساسية', 'Basic', 4.00, 10, 10, false, 30, 2,
   '["10 محادثات يومياً","10 صور أو ملفات يومياً","وصول كامل لأدوات الذكاء"]'::jsonb);

INSERT INTO public.payment_settings (account_holder, bank_name, iban, account_number, instructions)
VALUES ('Qusay', '', 'JO60IIBA1050000001050008055600', '1050008055600',
  'حوّل المبلغ إلى الحساب أعلاه ثم ارفع صورة إشعار التحويل وسيتم تفعيل اشتراكك بعد المراجعة.');