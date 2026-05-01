import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

let cachedGeo: { ip: string; country: string; city: string; region: string; isp: string } | null = null;

const getGeo = async () => {
  if (cachedGeo) return cachedGeo;
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    const d = await res.json();
    cachedGeo = {
      ip: d.ip || "",
      country: d.country_name || "",
      city: d.city || "",
      region: d.region || "",
      isp: d.org || "",
    };
    return cachedGeo;
  } catch { return null; }
};

export const usePageVisit = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const geo = await getGeo();
      if (cancelled) return;
      // page visit (everyone)
      supabase.from("page_visits").insert({
        user_id: user?.id ?? null,
        page_path: location.pathname,
        user_agent: navigator.userAgent,
        ip_address: geo?.ip || null,
        country: geo?.country || null,
        city: geo?.city || null,
      } as any).then(() => {});
      // ip log (only if we got geo)
      if (geo?.ip) {
        supabase.from("ip_logs").insert({
          user_id: user?.id ?? null,
          ip_address: geo.ip,
          country: geo.country,
          city: geo.city,
          region: geo.region,
          isp: geo.isp,
          user_agent: navigator.userAgent,
          page_path: location.pathname,
        } as any).then(() => {});
      }
    })();
    return () => { cancelled = true; };
  }, [location.pathname, user]);
};
