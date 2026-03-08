import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import QuickSearch from "@/components/QuickSearch";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Bell, CheckCheck, X } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchNotifs = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .or(`user_id.eq.${user.id},user_id.is.null`)
        .order("created_at", { ascending: false })
        .limit(10);
      setNotifications(data || []);
    };
    fetchNotifs();
  }, [user]);

  const markAsRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllRead = async () => {
    const unread = notifications.filter((n) => !n.is_read);
    for (const n of unread) {
      await supabase.from("notifications").update({ is_read: true }).eq("id", n.id);
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />

        {/* Notifications Section */}
        {user && notifications.length > 0 && (
          <section className="py-6 bg-background relative" dir="rtl">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">إشعارات من المطور</h2>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold">
                      {unreadCount} جديد
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-xs text-primary hover:underline transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    قراءة الكل
                  </button>
                )}
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`relative p-4 rounded-xl border transition-all duration-200 ${
                      !n.is_read
                        ? "bg-primary/5 border-primary/30 shadow-sm"
                        : "bg-card/60 border-border/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {!n.is_read && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
                          <span className="text-[10px] text-muted-foreground/60 shrink-0">
                            {new Date(n.created_at).toLocaleDateString("ar", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
                      </div>
                      {!n.is_read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="shrink-0 w-6 h-6 rounded-md hover:bg-secondary/60 flex items-center justify-center transition-colors"
                          title="تعيين كمقروء"
                        >
                          <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quick Search Section */}
        <section className="py-8 bg-background relative">
          <div className="container mx-auto px-4">
            <QuickSearch />
          </div>
        </section>
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
