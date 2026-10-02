import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Crown, MessageSquare, Image as ImageIcon, Infinity as InfinityIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Usage { plan: string | null; unlimited: boolean; chats: number; chatLimit: number; images: number; imageLimit: number; expires?: string }

const AIUsageBadge = ({ language, refreshKey }: { language: "ar" | "en"; refreshKey: number }) => {
  const { user } = useAuth();
  const [u, setU] = useState<Usage | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const start = new Date(); start.setHours(0, 0, 0, 0);
      const [{ data: role }, { data: sub }, { data: lim }, { data: logs }] = await Promise.all([
        supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "developer").maybeSingle(),
        supabase.from("user_subscriptions").select("plan_key,status,expires_at").eq("user_id", user.id).maybeSingle(),
        supabase.from("user_ai_limits").select("daily_limit,unlimited").eq("user_id", user.id).maybeSingle(),
        supabase.from("ai_chat_logs").select("image_urls").eq("user_id", user.id).gte("created_at", start.toISOString()),
      ]);
      const active = sub && sub.status === "active" && new Date(sub.expires_at) > new Date() ? sub : null;
      let plan: any = null;
      if (active) {
        const { data } = await supabase.from("subscription_plans").select("plan_key,name_ar,name_en,unlimited,daily_chats,daily_images").eq("plan_key", active.plan_key).maybeSingle();
        plan = data;
      }
      const base = typeof lim?.daily_limit === "number" ? lim.daily_limit : 3;
      const chats = (logs || []).length;
      const images = (logs || []).reduce((n: number, l: any) => n + (l.image_urls?.length || 0), 0);
      setU({
        plan: plan ? (language === "ar" ? plan.name_ar : plan.name_en) : null,
        unlimited: !!role || !!lim?.unlimited || !!plan?.unlimited,
        chats, images,
        chatLimit: plan ? Math.max(plan.daily_chats, base) : base,
        imageLimit: plan ? plan.daily_images : 3,
        expires: active?.expires_at,
      });
    })();
  }, [user, refreshKey, language]);

  if (!user || !u) return null;
  const ar = language === "ar";
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary">
        <Crown className="w-3.5 h-3.5" />
        {u.plan ?? (ar ? "الباقة المجانية" : "Free plan")}
        {u.expires && <span className="text-muted-foreground">· {new Date(u.expires).toLocaleDateString(ar ? "ar" : "en")}</span>}
      </span>
      {u.unlimited ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground">
          <InfinityIcon className="w-3.5 h-3.5" /> {ar ? "محادثات وصور بلا حدود" : "Unlimited chats & images"}
        </span>
      ) : (
        <>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground">
            <MessageSquare className="w-3.5 h-3.5" /> {ar ? "المتبقي" : "Left"}: {Math.max(0, u.chatLimit - u.chats)}/{u.chatLimit}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-foreground">
            <ImageIcon className="w-3.5 h-3.5" /> {ar ? "الصور" : "Images"}: {Math.max(0, u.imageLimit - u.images)}/{u.imageLimit}
          </span>
          {!u.plan && (
            <Link to="/الاشتراك" className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground">
              {ar ? "اشترك الآن" : "Subscribe"}
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default AIUsageBadge;
