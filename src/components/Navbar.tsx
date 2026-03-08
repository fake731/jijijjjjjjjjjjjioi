import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, UserCircle, Shield, Bell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const location = useLocation();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!user) { setIsDeveloper(false); setUnreadCount(0); return; }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "developer").maybeSingle()
      .then(({ data }) => setIsDeveloper(!!data));
    fetchUnreadCount();
  }, [user]);

  const fetchUnreadCount = async () => {
    if (!user) return;
    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .or(`user_id.eq.${user.id},user_id.is.null`)
      .eq("is_read", false);
    setUnreadCount(count || 0);
  };

  const fetchNotifications = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .or(`user_id.eq.${user.id},user_id.is.null`)
      .order("created_at", { ascending: false })
      .limit(20);
    setNotifications(data || []);
  };

  const markAsRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllRead = async () => {
    if (!user) return;
    const unreadIds = notifications.filter((n) => !n.is_read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    for (const id of unreadIds) {
      await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    }
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  const toggleNotifications = () => {
    if (!showNotifications) fetchNotifications();
    setShowNotifications(!showNotifications);
  };

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.guide"), path: "/الدليل" },
    { label: t("nav.tools"), path: "/الادوات" },
    { label: t("nav.scripts"), path: "/السكربتات" },
    { label: t("nav.ai"), path: "/الذكاء" },
    { label: t("nav.scanner"), path: "/الاوامر" },
    { label: t("nav.webdev"), path: "/تطوير-الويب" },
    { label: t("nav.password"), path: "/فحص-كلمة-المرور" },
    { label: t("nav.inquiry"), path: "/الاستفسارات" },
    { label: t("nav.download"), path: "/التحميل" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:box-glow transition-all duration-300">
              <span className="text-primary font-bold text-xl">Q</span>
            </div>
            <span className="text-primary font-bold text-xl text-glow-sm">Qusay_kali</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  location.pathname === item.path
                    ? "nav-link-active"
                    : "nav-link"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            {user && (
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="relative w-10 h-10 rounded-xl bg-secondary/50 border border-border/30 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute left-0 top-12 w-80 max-h-96 bg-card border border-border/30 rounded-xl shadow-2xl overflow-hidden z-50" dir="rtl">
                    <div className="p-3 border-b border-border/20 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-foreground">الإشعارات</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                          قراءة الكل
                        </button>
                      )}
                    </div>
                    <div className="overflow-y-auto max-h-72">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">لا توجد إشعارات</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => !n.is_read && markAsRead(n.id)}
                            className={`p-3 border-b border-border/10 cursor-pointer hover:bg-secondary/30 transition-colors ${!n.is_read ? "bg-primary/5" : ""}`}
                          >
                            <div className="flex items-start gap-2">
                              {!n.is_read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground">{n.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                                <p className="text-[10px] text-muted-foreground/60 mt-1">
                                  {new Date(n.created_at).toLocaleString("ar")}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                {isDeveloper && (
                  <Link
                    to="/المطور"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    المطور
                  </Link>
                )}
                <Link
                  to="/الملف-الشخصي"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  الملف الشخصي
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </button>
              </div>
            ) : (
              <Link
                to="/تسجيل-الدخول"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                دخول
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {user ? (
              <>
                <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className="relative w-10 h-10 rounded-xl bg-secondary/50 border border-border/30 flex items-center justify-center"
                  >
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute left-0 top-12 w-72 max-h-80 bg-card border border-border/30 rounded-xl shadow-2xl overflow-hidden z-50" dir="rtl">
                      <div className="p-3 border-b border-border/20 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-foreground">الإشعارات</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                            قراءة الكل
                          </button>
                        )}
                      </div>
                      <div className="overflow-y-auto max-h-60">
                        {notifications.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-6">لا توجد إشعارات</p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => !n.is_read && markAsRead(n.id)}
                              className={`p-3 border-b border-border/10 cursor-pointer hover:bg-secondary/30 ${!n.is_read ? "bg-primary/5" : ""}`}
                            >
                              <div className="flex items-start gap-2">
                                {!n.is_read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to="/الملف-الشخصي"
                  className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center"
                >
                  <UserCircle className="w-5 h-5 text-primary" />
                </Link>
              </>
            ) : (
              <Link
                to="/تسجيل-الدخول"
                className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center"
              >
                <LogIn className="w-4 h-4 text-primary" />
              </Link>
            )}
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={
                    location.pathname === item.path
                      ? "nav-link-active text-center"
                      : "nav-link text-center"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
