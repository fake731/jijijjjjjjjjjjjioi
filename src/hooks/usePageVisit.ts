import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const usePageVisit = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    supabase.from("page_visits").insert({
      user_id: user.id,
      page_path: location.pathname,
      user_agent: navigator.userAgent,
    }).then(() => {});
  }, [location.pathname, user]);
};
