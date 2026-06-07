import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Subscribes to the `notifications` table and surfaces new rows as
 * native device/browser notifications via the Web Notifications API.
 * Works on desktop browsers and Android Chrome (incl. installed PWA).
 * iOS Safari requires the site to be added to Home Screen.
 */
export const useDeviceNotifications = () => {
  const { user } = useAuth();

  // Ask for permission once, after we have a user.
  useEffect(() => {
    if (!user) return;
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission === "default") {
      // Best-effort; ignore promise rejection on unsupported browsers.
      try { Notification.requestPermission().catch(() => {}); } catch {}
    }
  }, [user]);

  // Subscribe to inserts on the notifications table.
  useEffect(() => {
    if (!user) return;

    const show = (n: any) => {
      if (typeof window === "undefined" || !("Notification" in window)) return;
      if (Notification.permission !== "granted") return;
      try {
        const note = new Notification(n.title || "إشعار جديد", {
          body: n.message || "",
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          tag: n.id,
        });
        note.onclick = () => {
          window.focus();
          note.close();
        };
      } catch {
        /* noop */
      }
    };

    const channel = supabase
      .channel(`device-notifs-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          const n = payload.new as any;
          // Match: targeted to this user OR broadcast (user_id null).
          if (!n) return;
          if (n.user_id && n.user_id !== user.id) return;
          show(n);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);
};

export default useDeviceNotifications;