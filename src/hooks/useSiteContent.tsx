import { useEffect, useState, createContext, useContext, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteContentMap {
  [key: string]: { id: string; value: string; description?: string | null };
}

interface Ctx {
  content: SiteContentMap;
  loading: boolean;
  refresh: () => Promise<void>;
  get: (key: string, fallback?: string) => string;
}

const SiteContentContext = createContext<Ctx>({
  content: {},
  loading: true,
  refresh: async () => {},
  get: (_k, fallback = "") => fallback,
});

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContentMap>({});
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data } = await supabase.from("site_content").select("id, content_key, content_value, description");
    const map: SiteContentMap = {};
    (data || []).forEach((c: any) => {
      map[c.content_key] = { id: c.id, value: c.content_value, description: c.description };
    });
    setContent(map);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel("site_content_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "site_content" }, () => refresh())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [refresh]);

  const get = (key: string, fallback = "") => content[key]?.value ?? fallback;

  return (
    <SiteContentContext.Provider value={{ content, loading, refresh, get }}>
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);