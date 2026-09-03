import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, LogIn, LogOut, UserCircle, Shield, Bell, LayoutDashboard,
  Home, BookOpen, Wrench, Code2, ScrollText, Sparkles, Terminal,
  Globe, KeyRound, GraduationCap, MessageSquare, Download, FileLock2,
} from "lucide-react";
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

  // Decode URL-encoded pathname so Arabic routes match correctly (e.g. %D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84 → /الدليل)
  const currentPath = (() => {
    try { return decodeURIComponent(location.pathname); } catch { return location.pathname; }
  })();
  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  useEffect(() => {
    if (!user) {
      setIsDeveloper(false);
      // Guests still see broadcast notifications (user_id = null)
      fetchUnreadCount();
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "developer").maybeSingle()
      .then(({ data }) => setIsDeveloper(!!data));
    fetchUnreadCount();
  }, [user]);

  const fetchUnreadCount = async () => {
    const filter = user
      ? supabase.from("notifications").select("*", { count: "exact", head: true })
          .or(`user_id.eq.${user.id},user_id.is.null`).eq("is_read", false)
      : supabase.from("notifications").select("*", { count: "exact", head: true })
          .is("user_id", null).eq("is_read", false);
    const { count } = await filter;
    setUnreadCount(count || 0);
  };

  const fetchNotifications = async () => {
    const q = user
      ? supabase.from("notifications").select("*")
          .or(`user_id.eq.${user.id},user_id.is.null`)
          .order("created_at", { ascending: false }).limit(20)
      : supabase.from("notifications").select("*")
          .is("user_id", null)
          .order("created_at", { ascending: false }).limit(20);
    const { data } = await q;
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
    { label: t("nav.home"), path: "/", icon: Home },
    { label: t("nav.guide"), path: "/الدليل", icon: BookOpen },
    { label: t("nav.tools"), path: "/الادوات", icon: Wrench },
    { label: t("nav.programming"), path: "/البرمجة", icon: Code2 },
    { label: t("nav.scripts"), path: "/السكربتات", icon: ScrollText },
    { label: t("nav.ai"), path: "/الذكاء", icon: Sparkles },
    { label: t("nav.scanner"), path: "/الاوامر", icon: Terminal },
    { label: t("nav.webdev"), path: "/تطوير-الويب", icon: Globe },
    { label: t("nav.password"), path: "/فحص-كلمة-المرور", icon: KeyRound },
    { label: t("nav.utilities"), path: "/أدوات-سريعة", icon: Wrench },
    { label: t("nav.quiz"), path: "/الاختبار", icon: GraduationCap },
    { label: t("nav.inquiry"), path: "/الاستفسارات", icon: MessageSquare },
    { label: t("nav.download"), path: "/التحميل", icon: Download },
    { label: t("nav.privacy"), path: "/سياسة-الخصوصية", icon: FileLock2 },
  ];

  return (
    <nav className="fixed top-3 left-3 right-3 xl:left-6 xl:right-6 z-50 rounded-2xl bg-card/10 backdrop-blur-3xl border border-primary/15 shadow-[0_8px_32px_-12px_hsl(var(--primary)/0.3)]">
      <div className="px-2 xl:px-5">
        <div className="flex items-center justify-between h-14 xl:h-16 gap-2 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 xl:gap-3 group min-w-0">
            <div className="w-9 h-9 xl:w-10 xl:h-10 shrink-0 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:box-glow transition-all duration-300">
              <span className="text-primary font-bold text-lg xl:text-xl">Q</span>
            </div>
            <span className="hidden sm:inline text-primary font-bold text-base xl:text-xl text-glow-sm truncate">Qusay_kali</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1 px-2 py-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  isActive(item.path)
                    ? "nav-link-active"
                    : "nav-link"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Auth */}
          <div className="hidden xl:flex items-center gap-3">
            <ThemeToggle />
            <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="relative w-10 h-10 rounded-xl bg-card/40 backdrop-blur-xl border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-colors"
                >
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute left-0 top-12 w-80 max-h-96 bg-card/80 backdrop-blur-2xl border border-primary/20 rounded-2xl shadow-2xl overflow-hidden z-50" dir="rtl">
                    <div className="p-3 border-b border-border/20 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-foreground">الإشعارات</h3>
                      {user && unreadCount > 0 && (
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
                            onClick={() => user && !n.is_read && markAsRead(n.id)}
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
                  to="/لوحة-التحكم"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  لوحة التحكم
                </Link>
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
          <div className="xl:hidden flex items-center gap-1.5 shrink-0">
            <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className="relative w-10 h-10 rounded-xl bg-card/40 backdrop-blur-xl border border-primary/20 flex items-center justify-center"
                  >
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute left-0 top-12 w-72 max-h-80 bg-card/80 backdrop-blur-2xl border border-primary/20 rounded-2xl shadow-2xl overflow-hidden z-50" dir="rtl">
                      <div className="p-3 border-b border-border/20 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-foreground">الإشعارات</h3>
                        {user && unreadCount > 0 && (
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
                              onClick={() => user && !n.is_read && markAsRead(n.id)}
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
            {user ? (
              <>
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

      </div>

      {/* Mobile Drawer — professional slide-in panel (portal so it escapes the blurred navbar) */}
      {isOpen && createPortal(
        <>

          <div
            onClick={() => setIsOpen(false)}
            className="xl:hidden fixed inset-0 z-40 bg-background/70 backdrop-blur-md animate-fade-in"
            aria-hidden
          />
          <div
            dir="rtl"
            className="xl:hidden fixed top-0 right-0 bottom-0 z-50 w-[86%] max-w-sm bg-card/70 backdrop-blur-3xl border-l border-primary/20 shadow-[0_20px_80px_-20px_hsl(var(--primary)/0.5)] flex flex-col animate-fade-in"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-primary/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">Q</span>
                </div>
                <span className="text-primary font-bold text-lg text-glow-sm">Qusay_kali</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4 text-primary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-2.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={
                        "group flex flex-col items-center gap-2 py-4 px-2 rounded-xl border transition-all duration-300 " +
                        (active
                          ? "bg-primary/15 border-primary/60 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)]"
                          : "bg-card/40 border-primary/10 hover:border-primary/40 hover:bg-primary/5")
                      }
                    >
                      <div className={
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors " +
                        (active ? "bg-primary/25 text-primary" : "bg-secondary/60 text-muted-foreground group-hover:text-primary")
                      }>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={
                        "text-xs font-medium text-center leading-tight " +
                        (active ? "text-primary" : "text-foreground/85")
                      }>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-primary/15 px-4 py-3 space-y-2">
              {user ? (
                <>
                  {isDeveloper && (
                    <Link
                      to="/المطور"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-card/40 border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-foreground">المطور</span>
                    </Link>
                  )}
                  <Link
                    to="/لوحة-التحكم"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-card/40 border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-primary" />
                    <span className="text-foreground">لوحة التحكم</span>
                  </Link>
                  <Link
                    to="/الملف-الشخصي"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-card/40 border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <UserCircle className="w-4 h-4 text-primary" />
                    <span className="text-foreground">الملف الشخصي</span>
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); signOut(); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-destructive/10 border border-destructive/30 hover:bg-destructive/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-destructive" />
                    <span className="text-destructive">تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/تسجيل-الدخول"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
                >
                  <LogIn className="w-4 h-4" />
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
