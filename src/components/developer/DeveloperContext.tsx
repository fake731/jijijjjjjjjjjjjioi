import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface DeveloperContextType {
  // Data
  profiles: any[];
  visits: any[];
  aiLogs: any[];
  sentNotifications: any[];
  userRoles: Record<string, string>;
  stats: { totalUsers: number; totalVisits: number; totalAiChats: number };
  // Computed
  filteredProfiles: any[];
  filteredVisits: any[];
  filteredAiLogs: any[];
  countryData: any[];
  countryChartData: any[];
  dailyVisitsData: any[];
  topPagesData: any[];
  dailyAiData: any[];
  hourlyData: any[];
  dailySignups: any[];
  ageData: any[];
  deviceData: any[];
  browserData: any[];
  todayStats: { visits: number; chats: number; signups: number };
  weeklyGrowth: number;
  avgSessionPages: number;
  activeUsersToday: number;
  uniqueCountries: string[];
  // Filters
  userSearch: string; setUserSearch: (v: string) => void;
  userSort: "newest" | "oldest" | "name"; setUserSort: (v: "newest" | "oldest" | "name") => void;
  countryFilter: string; setCountryFilter: (v: string) => void;
  visitSearch: string; setVisitSearch: (v: string) => void;
  aiSearch: string; setAiSearch: (v: string) => void;
  // Selection
  selectedUsers: Set<string>; setSelectedUsers: (v: Set<string>) => void;
  toggleUserSelection: (uid: string) => void;
  selectAllUsers: () => void;
  expandedUser: string | null; setExpandedUser: (v: string | null) => void;
  expandedChat: string | null; setExpandedChat: (v: string | null) => void;
  // Actions
  fetchAllData: () => Promise<void>;
  refreshing: boolean;
  handleDeleteUser: (targetUserId: string) => Promise<void>;
  handleBulkDelete: () => Promise<void>;
  deletingUser: string | null;
  confirmDelete: string | null; setConfirmDelete: (v: string | null) => void;
  // Notifications
  notifTitle: string; setNotifTitle: (v: string) => void;
  notifMessage: string; setNotifMessage: (v: string) => void;
  notifTarget: string; setNotifTarget: (v: string) => void;
  sendingNotif: boolean;
  handleSendNotification: () => Promise<void>;
  handleDeleteNotification: (id: string) => Promise<void>;
  broadcastTitle: string; setBroadcastTitle: (v: string) => void;
  broadcastMsg: string; setBroadcastMsg: (v: string) => void;
  handleBroadcast: () => Promise<void>;
  handleBulkNotify: () => Promise<void>;
  // Realtime
  autoRefresh: boolean; setAutoRefresh: (v: boolean) => void;
  lastRefreshTime: Date;
  liveEvents: Array<{ type: string; text: string; time: Date }>;
  setLiveEvents: (v: any) => void;
  eventFilter: "all" | "visit" | "signup" | "ai"; setEventFilter: (v: "all" | "visit" | "signup" | "ai") => void;
  countdown: number; setCountdown: (v: any) => void;
  totalIntervalMs: number; totalIntervalSec: number;
  refreshIntervalDays: number; setRefreshIntervalDays: (v: number) => void;
  refreshIntervalHours: number; setRefreshIntervalHours: (v: number) => void;
  refreshIntervalMinutes: number; setRefreshIntervalMinutes: (v: number) => void;
  refreshIntervalSeconds: number; setRefreshIntervalSeconds: (v: number) => void;
  // Utils
  exportCSV: (data: any[], filename: string) => void;
  copyToClipboard: (text: string) => void;
  getUserEngagement: (uid: string) => { visits: number; chats: number; score: number };
  COLORS: string[];
  tooltipStyle: any;
}

const DeveloperContext = createContext<DeveloperContextType | null>(null);

export const useDeveloper = () => {
  const ctx = useContext(DeveloperContext);
  if (!ctx) throw new Error("useDeveloper must be used within DeveloperProvider");
  return ctx;
};

export const DeveloperProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  const [aiLogs, setAiLogs] = useState<any[]>([]);
  const [sentNotifications, setSentNotifications] = useState<any[]>([]);
  const [userRoles, setUserRoles] = useState<Record<string, string>>({});
  const [stats, setStats] = useState({ totalUsers: 0, totalVisits: 0, totalAiChats: 0 });
  const [refreshing, setRefreshing] = useState(false);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  // Filters
  const [userSearch, setUserSearch] = useState("");
  const [userSort, setUserSort] = useState<"newest" | "oldest" | "name">("newest");
  const [countryFilter, setCountryFilter] = useState("all");
  const [visitSearch, setVisitSearch] = useState("");
  const [aiSearch, setAiSearch] = useState("");
  // Selection
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [expandedChat, setExpandedChat] = useState<string | null>(null);
  // Notifications
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifTarget, setNotifTarget] = useState("all");
  const [sendingNotif, setSendingNotif] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  // Realtime
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [liveEvents, setLiveEvents] = useState<Array<{ type: string; text: string; time: Date }>>([]);
  const [eventFilter, setEventFilter] = useState<"all" | "visit" | "signup" | "ai">("all");
  const [refreshIntervalDays, setRefreshIntervalDays] = useState(0);
  const [refreshIntervalHours, setRefreshIntervalHours] = useState(0);
  const [refreshIntervalMinutes, setRefreshIntervalMinutes] = useState(0);
  const [refreshIntervalSeconds, setRefreshIntervalSeconds] = useState(30);
  const [countdown, setCountdown] = useState(30);

  const totalIntervalMs = useMemo(() => {
    return ((refreshIntervalDays * 86400) + (refreshIntervalHours * 3600) + (refreshIntervalMinutes * 60) + refreshIntervalSeconds) * 1000;
  }, [refreshIntervalDays, refreshIntervalHours, refreshIntervalMinutes, refreshIntervalSeconds]);
  const totalIntervalSec = Math.floor(totalIntervalMs / 1000);

  const fetchAllData = async () => {
    setRefreshing(true);
    const [profilesRes, visitsRes, logsRes, notifsRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("page_visits").select("*").order("visited_at", { ascending: false }).limit(1000),
      supabase.from("ai_chat_logs").select("*").order("created_at", { ascending: false }).limit(1000),
      supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("user_roles").select("*"),
    ]);
    const p = profilesRes.data || [];
    const v = visitsRes.data || [];
    const l = logsRes.data || [];
    setProfiles(p);
    setVisits(v);
    setAiLogs(l);
    setStats({ totalUsers: p.length, totalVisits: v.length, totalAiChats: l.length });
    setSentNotifications(notifsRes.data || []);
    const rm: Record<string, string> = {};
    (rolesRes.data || []).forEach((r: any) => { rm[r.user_id] = r.role; });
    setUserRoles(rm);
    setRefreshing(false);
    setLastRefreshTime(new Date());
  };

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh || totalIntervalMs < 1000) return;
    setCountdown(totalIntervalSec);
    const interval = setInterval(() => { fetchAllData(); setCountdown(totalIntervalSec); }, totalIntervalMs);
    return () => clearInterval(interval);
  }, [autoRefresh, totalIntervalMs]);

  useEffect(() => {
    if (!autoRefresh) return;
    const tick = setInterval(() => { setCountdown(prev => (prev > 0 ? prev - 1 : totalIntervalSec)); }, 1000);
    return () => clearInterval(tick);
  }, [autoRefresh, totalIntervalSec]);

  // Realtime subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('realtime-dashboard')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'page_visits' }, (payload) => {
        const p = payload.new as any;
        setLiveEvents(prev => [{ type: 'visit', text: `زيارة جديدة: ${decodeURIComponent(p.page_path)}`, time: new Date() }, ...prev].slice(0, 50));
        setVisits(prev => [p, ...prev]);
        setStats(prev => ({ ...prev, totalVisits: prev.totalVisits + 1 }));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ai_chat_logs' }, (payload) => {
        const l = payload.new as any;
        setLiveEvents(prev => [{ type: 'ai', text: `محادثة AI: ${(l.message || '').slice(0, 50)}...`, time: new Date() }, ...prev].slice(0, 50));
        setAiLogs(prev => [l, ...prev]);
        setStats(prev => ({ ...prev, totalAiChats: prev.totalAiChats + 1 }));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'profiles' }, (payload) => {
        const pr = payload.new as any;
        setLiveEvents(prev => [{ type: 'signup', text: `تسجيل جديد: ${pr.display_name || pr.email}`, time: new Date() }, ...prev].slice(0, 50));
        setProfiles(prev => [pr, ...prev]);
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers + 1 }));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // Actions
  const handleSendNotification = async () => {
    if (!notifTitle.trim() || !notifMessage.trim()) { toast.error("يرجى ملء العنوان والرسالة"); return; }
    setSendingNotif(true);
    try {
      const insertData: any = { title: notifTitle.trim(), message: notifMessage.trim(), sent_by: user?.id };
      if (notifTarget !== "all") insertData.user_id = notifTarget;
      const { error } = await supabase.from("notifications").insert(insertData);
      if (error) throw error;
      toast.success("تم إرسال الإشعار بنجاح");
      setNotifTitle(""); setNotifMessage(""); setNotifTarget("all");
      const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(100);
      setSentNotifications(data || []);
    } catch (err: any) { toast.error(err.message || "فشل إرسال الإشعار"); }
    finally { setSendingNotif(false); }
  };

  const handleBroadcast = async () => {
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) { toast.error("يرجى ملء العنوان والرسالة"); return; }
    setSendingNotif(true);
    try {
      const { error } = await supabase.from("notifications").insert({ title: broadcastTitle.trim(), message: broadcastMsg.trim(), sent_by: user?.id });
      if (error) throw error;
      toast.success("تم البث بنجاح لجميع المستخدمين!");
      setBroadcastTitle(""); setBroadcastMsg("");
    } catch (err: any) { toast.error(err.message || "فشل البث"); }
    finally { setSendingNotif(false); }
  };

  const handleDeleteNotification = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    setSentNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("تم حذف الإشعار");
  };

  const handleDeleteUser = async (targetUserId: string) => {
    if (targetUserId === user?.id) { toast.error("لا يمكنك حذف حسابك الخاص!"); return; }
    setDeletingUser(targetUserId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ targetUserId }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("تم حذف المستخدم بنجاح");
        setProfiles(prev => prev.filter(p => p.id !== targetUserId));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
        setConfirmDelete(null);
      } else { toast.error(result.error || "فشل حذف المستخدم"); }
    } catch { toast.error("حدث خطأ أثناء الحذف"); }
    finally { setDeletingUser(null); }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.size === 0) return;
    const toDelete = Array.from(selectedUsers).filter(id => id !== user?.id);
    for (const id of toDelete) await handleDeleteUser(id);
    setSelectedUsers(new Set());
    toast.success(`تم حذف ${toDelete.length} مستخدم`);
  };

  const handleBulkNotify = async () => {
    if (selectedUsers.size === 0 || !notifTitle.trim() || !notifMessage.trim()) return;
    for (const uid of selectedUsers) {
      await supabase.from("notifications").insert({ title: notifTitle.trim(), message: notifMessage.trim(), sent_by: user?.id, user_id: uid });
    }
    toast.success(`تم إرسال إشعار لـ ${selectedUsers.size} مستخدم`);
    setSelectedUsers(new Set()); setNotifTitle(""); setNotifMessage("");
  };

  const toggleUserSelection = (uid: string) => {
    setSelectedUsers(prev => { const n = new Set(prev); if (n.has(uid)) n.delete(uid); else n.add(uid); return n; });
  };

  const selectAllUsers = () => {
    if (selectedUsers.size === filteredProfiles.length) setSelectedUsers(new Set());
    else setSelectedUsers(new Set(filteredProfiles.map(p => p.id)));
  };

  const exportCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [headers.join(","), ...data.map(row => headers.map(h => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${filename}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success(`تم تصدير ${filename}.csv`);
  };

  const copyToClipboard = (text: string) => { navigator.clipboard.writeText(text); toast.success("تم النسخ!"); };

  const getUserEngagement = (uid: string) => {
    const uVisits = visits.filter(v => v.user_id === uid).length;
    const uChats = aiLogs.filter(l => l.user_id === uid).length;
    return { visits: uVisits, chats: uChats, score: uVisits + uChats * 3 };
  };

  // Computed data
  const filteredProfiles = useMemo(() => {
    let result = [...profiles];
    if (userSearch) {
      const s = userSearch.toLowerCase();
      result = result.filter(p => (p.display_name || "").toLowerCase().includes(s) || (p.email || "").toLowerCase().includes(s) || (p.country || "").toLowerCase().includes(s) || (p.city || "").toLowerCase().includes(s) || (p.phone || "").includes(s));
    }
    if (countryFilter !== "all") result = result.filter(p => (p.country || "غير محدد") === countryFilter);
    if (userSort === "newest") result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    else if (userSort === "oldest") result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    else if (userSort === "name") result.sort((a, b) => (a.display_name || "").localeCompare(b.display_name || ""));
    return result;
  }, [profiles, userSearch, userSort, countryFilter]);

  const normalizeCountry = (value: unknown) => {
    if (typeof value !== "string") return "غير محدد";
    const cleaned = value.trim();
    if (!cleaned || ["null", "undefined", "-", "غير محدد"].includes(cleaned.toLowerCase())) return "غير محدد";
    return cleaned;
  };

  const countryData = useMemo(() => {
    const countries: Record<string, { count: number; users: any[] }> = {};
    profiles.forEach((p) => {
      const c = normalizeCountry(p.country);
      if (!countries[c]) countries[c] = { count: 0, users: [] };
      countries[c].count++;
      countries[c].users.push(p);
    });
    return Object.entries(countries)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([name, data]) => ({ name, ...data }));
  }, [profiles]);

  const countryChartData = useMemo(() => countryData.map(c => ({ name: c.name, value: c.count })), [countryData]);

  const dailyVisitsData = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days[d.toLocaleDateString("ar", { weekday: "short", day: "numeric" })] = 0; }
    visits.forEach(v => { const d = new Date(v.visited_at); const diff = Math.floor((Date.now() - d.getTime()) / 86400000); if (diff < 7) { const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" }); if (days[key] !== undefined) days[key]++; } });
    return Object.entries(days).map(([name, زيارات]) => ({ name, زيارات }));
  }, [visits]);

  const topPagesData = useMemo(() => {
    const pages: Record<string, number> = {};
    visits.forEach(v => { pages[v.page_path] = (pages[v.page_path] || 0) + 1; });
    return Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, value]) => ({ name: decodeURIComponent(name), value }));
  }, [visits]);

  const dailyAiData = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days[d.toLocaleDateString("ar", { weekday: "short", day: "numeric" })] = 0; }
    aiLogs.forEach(l => { const d = new Date(l.created_at); const diff = Math.floor((Date.now() - d.getTime()) / 86400000); if (diff < 7) { const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" }); if (days[key] !== undefined) days[key]++; } });
    return Object.entries(days).map(([name, محادثات]) => ({ name, محادثات }));
  }, [aiLogs]);

  const hourlyData = useMemo(() => {
    const hours: Record<number, number> = {};
    for (let i = 0; i < 24; i++) hours[i] = 0;
    visits.forEach(v => { hours[new Date(v.visited_at).getHours()]++; });
    return Object.entries(hours).map(([hour, count]) => ({ name: `${hour}:00`, نشاط: count }));
  }, [visits]);

  const dailySignups = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days[d.toLocaleDateString("ar", { weekday: "short", day: "numeric" })] = 0; }
    profiles.forEach(p => { if (!p.created_at) return; const d = new Date(p.created_at); const diff = Math.floor((Date.now() - d.getTime()) / 86400000); if (diff < 7) { const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" }); if (days[key] !== undefined) days[key]++; } });
    return Object.entries(days).map(([name, تسجيلات]) => ({ name, تسجيلات }));
  }, [profiles]);

  const ageData = useMemo(() => {
    const ranges: Record<string, number> = { "أقل من 18": 0, "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0, "غير محدد": 0 };
    profiles.forEach(p => { if (!p.age) { ranges["غير محدد"]++; return; } if (p.age < 18) ranges["أقل من 18"]++; else if (p.age <= 25) ranges["18-25"]++; else if (p.age <= 35) ranges["26-35"]++; else if (p.age <= 50) ranges["36-50"]++; else ranges["50+"]++; });
    return Object.entries(ranges).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [profiles]);

  const uniqueCountries = useMemo(() => Array.from(new Set(profiles.map(p => normalizeCountry(p.country)))).sort(), [profiles]);

  const todayStats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      visits: visits.filter(v => new Date(v.visited_at).toDateString() === today).length,
      chats: aiLogs.filter(l => new Date(l.created_at).toDateString() === today).length,
      signups: profiles.filter(p => p.created_at && new Date(p.created_at).toDateString() === today).length,
    };
  }, [visits, aiLogs, profiles]);

  const weeklyGrowth = useMemo(() => {
    const thisWeek = profiles.filter(p => { if (!p.created_at) return false; return Math.floor((Date.now() - new Date(p.created_at).getTime()) / 86400000) < 7; }).length;
    const lastWeek = profiles.filter(p => { if (!p.created_at) return false; const diff = Math.floor((Date.now() - new Date(p.created_at).getTime()) / 86400000); return diff >= 7 && diff < 14; }).length;
    if (lastWeek === 0) return thisWeek > 0 ? 100 : 0;
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  }, [profiles]);

  const avgSessionPages = useMemo(() => {
    if (!visits.length || !profiles.length) return 0;
    return Math.round(visits.length / profiles.length);
  }, [visits, profiles]);

  const activeUsersToday = useMemo(() => {
    const today = new Date().toDateString();
    return new Set(visits.filter(v => new Date(v.visited_at).toDateString() === today).map(v => v.user_id).filter(Boolean)).size;
  }, [visits]);

  const deviceData = useMemo(() => {
    const devices: Record<string, number> = { "موبايل": 0, "كمبيوتر": 0, "تابلت": 0, "غير معروف": 0 };
    visits.forEach(v => { const ua = (v.user_agent || "").toLowerCase(); if (/mobile|android|iphone/.test(ua)) devices["موبايل"]++; else if (/tablet|ipad/.test(ua)) devices["تابلت"]++; else if (/windows|macintosh|linux/.test(ua)) devices["كمبيوتر"]++; else devices["غير معروف"]++; });
    return Object.entries(devices).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [visits]);

  const browserData = useMemo(() => {
    const browsers: Record<string, number> = {};
    visits.forEach(v => { const ua = (v.user_agent || "").toLowerCase(); let browser = "غير معروف"; if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome"; else if (ua.includes("firefox")) browser = "Firefox"; else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari"; else if (ua.includes("edg")) browser = "Edge"; else if (ua.includes("opera") || ua.includes("opr")) browser = "Opera"; browsers[browser] = (browsers[browser] || 0) + 1; });
    return Object.entries(browsers).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
  }, [visits]);

  const COLORS = ["hsl(var(--primary))", "#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#ec4899", "#f97316", "#14b8a6", "#a855f7"];
  const tooltipStyle = { backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" };

  const value: DeveloperContextType = {
    profiles, visits, aiLogs, sentNotifications, userRoles, stats,
    filteredProfiles, filteredVisits, filteredAiLogs, countryData, countryChartData,
    dailyVisitsData, topPagesData, dailyAiData, hourlyData, dailySignups, ageData,
    deviceData, browserData, todayStats, weeklyGrowth, avgSessionPages, activeUsersToday, uniqueCountries,
    userSearch, setUserSearch, userSort, setUserSort, countryFilter, setCountryFilter,
    visitSearch, setVisitSearch, aiSearch, setAiSearch,
    selectedUsers, setSelectedUsers, toggleUserSelection, selectAllUsers,
    expandedUser, setExpandedUser, expandedChat, setExpandedChat,
    fetchAllData, refreshing,
    handleDeleteUser, handleBulkDelete, deletingUser, confirmDelete, setConfirmDelete,
    notifTitle, setNotifTitle, notifMessage, setNotifMessage, notifTarget, setNotifTarget,
    sendingNotif, handleSendNotification, handleDeleteNotification,
    broadcastTitle, setBroadcastTitle, broadcastMsg, setBroadcastMsg,
    handleBroadcast, handleBulkNotify,
    autoRefresh, setAutoRefresh, lastRefreshTime, liveEvents, setLiveEvents,
    eventFilter, setEventFilter, countdown, setCountdown,
    totalIntervalMs, totalIntervalSec,
    refreshIntervalDays, setRefreshIntervalDays, refreshIntervalHours, setRefreshIntervalHours,
    refreshIntervalMinutes, setRefreshIntervalMinutes, refreshIntervalSeconds, setRefreshIntervalSeconds,
    exportCSV, copyToClipboard, getUserEngagement, COLORS, tooltipStyle,
  };

  return <DeveloperContext.Provider value={value}>{children}</DeveloperContext.Provider>;
};
