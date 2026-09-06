import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Plan {
  id: string;
  plan_key: string;
  name_ar: string;
  name_en: string;
  price_usd: number;
  daily_chats: number;
  daily_images: number;
  unlimited: boolean;
  duration_days: number;
  features: string[];
  active: boolean;
  order_index: number;
}

export interface ActiveSubscription {
  plan_key: string;
  status: string;
  started_at: string;
  expires_at: string;
}

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("active", true)
        .order("order_index");
      setPlans(((data as any[]) || []).map((p) => ({ ...p, features: Array.isArray(p.features) ? p.features : [] })) as Plan[]);
      setLoading(false);
    })();
  }, []);

  return { plans, loading };
};

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<ActiveSubscription | null>(null);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setPending(false);
      setLoading(false);
      return;
    }
    const [{ data: sub }, { data: reqs }] = await Promise.all([
      supabase
        .from("user_subscriptions")
        .select("plan_key, status, started_at, expires_at")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("payment_requests")
        .select("id")
        .eq("user_id", user.id)
        .eq("kind", "subscription")
        .eq("status", "pending")
        .limit(1),
    ]);
    const active =
      sub && sub.status === "active" && new Date(sub.expires_at).getTime() > Date.now()
        ? (sub as ActiveSubscription)
        : null;
    setSubscription(active);
    setPending((reqs || []).length > 0);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { subscription, pending, loading, refresh };
};

export const usePaymentSettings = () => {
  const [settings, setSettings] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("payment_settings").select("*").limit(1).maybeSingle();
      setSettings(data);
    })();
  }, []);
  return settings;
};
