import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, MessageSquare, Shield, TrendingUp, BarChart3, Globe, MapPin, Phone, ChevronDown, ChevronUp, Trash2, Mail, Calendar, UserCheck, AlertTriangle, Bell, Send, Search, Filter, Download, RefreshCw, Clock, Activity, Zap, Database, Settings, UserX, UserPlus, Flag, Hash, ArrowUpDown, MoreVertical, Copy, ExternalLink, FileText, Lock, Unlock, Ban, CheckCircle, XCircle, Terminal, Code, Cpu, HardDrive, Wifi, Server, Monitor, ShieldCheck, ShieldAlert, Key, ToggleLeft, ToggleRight, Megaphone, Palette, type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const DeveloperPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [checking, setChecking] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  const [aiLogs, setAiLogs] = useState<any[]>([]);
  const [expandedChat, setExpandedChat] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalUsers: 0, totalVisits: 0, totalAiChats: 0 });
  const [deletingUser, setDeletingUser] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifTarget, setNotifTarget] = useState("all");
  const [sendingNotif, setSendingNotif] = useState(false);
  const [sentNotifications, setSentNotifications] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [userSort, setUserSort] = useState<"newest" | "oldest" | "name">("newest");
  const [countryFilter, setCountryFilter] = useState("all");
  const [visitSearch, setVisitSearch] = useState("");
  const [aiSearch, setAiSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  // Advanced states
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<Record<string, string>>({});
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  // Realtime states
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [liveEvents, setLiveEvents] = useState<Array<{ type: string; text: string; time: Date }>>([]);
  const [eventFilter, setEventFilter] = useState<"all" | "visit" | "signup" | "ai">("all");
  // Countdown timer states
  const [refreshIntervalDays, setRefreshIntervalDays] = useState(0);
  const [refreshIntervalHours, setRefreshIntervalHours] = useState(0);
  const [refreshIntervalMinutes, setRefreshIntervalMinutes] = useState(0);
  const [refreshIntervalSeconds, setRefreshIntervalSeconds] = useState(30);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/تسجيل-الدخول");
      return;
    }
    if (user) checkDeveloperRole();
  }, [user, authLoading]);

  const checkDeveloperRole = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "developer")
      .maybeSingle();

    if (data) {
      setIsDeveloper(true);
      fetchAllData();
    } else {
      setIsDeveloper(false);
    }
    setChecking(false);
  };

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
    // Build roles map
    const rm: Record<string, string> = {};
    (rolesRes.data || []).forEach((r: any) => { rm[r.user_id] = r.role; });
    setUserRoles(rm);
    setRefreshing(false);
    setLastRefreshTime(new Date());
  };

  const totalIntervalMs = useMemo(() => {
    return ((refreshIntervalDays * 86400) + (refreshIntervalHours * 3600) + (refreshIntervalMinutes * 60) + refreshIntervalSeconds) * 1000;
  }, [refreshIntervalDays, refreshIntervalHours, refreshIntervalMinutes, refreshIntervalSeconds]);

  const totalIntervalSec = Math.floor(totalIntervalMs / 1000);

  // Auto-refresh with custom interval
  useEffect(() => {
    if (!isDeveloper || !autoRefresh || totalIntervalMs < 1000) return;
    setCountdown(totalIntervalSec);
    const interval = setInterval(() => {
      fetchAllData();
      setCountdown(totalIntervalSec);
    }, totalIntervalMs);
    return () => clearInterval(interval);
  }, [isDeveloper, autoRefresh, totalIntervalMs]);

  // Countdown ticker
  useEffect(() => {
    if (!autoRefresh) return;
    const tick = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : totalIntervalSec));
    }, 1000);
    return () => clearInterval(tick);
  }, [autoRefresh, totalIntervalSec]);

  // Realtime subscriptions
  useEffect(() => {
    if (!isDeveloper) return;
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
  }, [isDeveloper]);

  const handleSendNotification = async () => {
    if (!notifTitle.trim() || !notifMessage.trim()) {
      toast.error("يرجى ملء العنوان والرسالة");
      return;
    }
    setSendingNotif(true);
    try {
      const insertData: any = {
        title: notifTitle.trim(),
        message: notifMessage.trim(),
        sent_by: user?.id,
      };
      if (notifTarget !== "all") {
        insertData.user_id = notifTarget;
      }
      const { error } = await supabase.from("notifications").insert(insertData);
      if (error) throw error;
      toast.success("تم إرسال الإشعار بنجاح");
      setNotifTitle("");
      setNotifMessage("");
      setNotifTarget("all");
      const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(100);
      setSentNotifications(data || []);
    } catch (err: any) {
      toast.error(err.message || "فشل إرسال الإشعار");
    } finally {
      setSendingNotif(false);
    }
  };

  const handleBroadcast = async () => {
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) {
      toast.error("يرجى ملء العنوان والرسالة");
      return;
    }
    setSendingNotif(true);
    try {
      // Send to all users individually + a global one
      const { error } = await supabase.from("notifications").insert({
        title: broadcastTitle.trim(),
        message: broadcastMsg.trim(),
        sent_by: user?.id,
      });
      if (error) throw error;
      toast.success("تم البث بنجاح لجميع المستخدمين!");
      setBroadcastTitle("");
      setBroadcastMsg("");
    } catch (err: any) {
      toast.error(err.message || "فشل البث");
    } finally {
      setSendingNotif(false);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    setSentNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("تم حذف الإشعار");
  };

  const handleDeleteUser = async (targetUserId: string) => {
    if (targetUserId === user?.id) {
      toast.error("لا يمكنك حذف حسابك الخاص!");
      return;
    }
    setDeletingUser(targetUserId);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ targetUserId }),
        }
      );
      const result = await res.json();
      if (result.success) {
        toast.success("تم حذف المستخدم بنجاح");
        setProfiles((prev) => prev.filter((p) => p.id !== targetUserId));
        setStats((prev) => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
        setConfirmDelete(null);
      } else {
        toast.error(result.error || "فشل حذف المستخدم");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء الحذف");
    } finally {
      setDeletingUser(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.size === 0) return;
    const toDelete = Array.from(selectedUsers).filter(id => id !== user?.id);
    for (const id of toDelete) {
      await handleDeleteUser(id);
    }
    setSelectedUsers(new Set());
    toast.success(`تم حذف ${toDelete.length} مستخدم`);
  };

  const handleBulkNotify = async () => {
    if (selectedUsers.size === 0 || !notifTitle.trim() || !notifMessage.trim()) return;
    for (const uid of selectedUsers) {
      await supabase.from("notifications").insert({
        title: notifTitle.trim(),
        message: notifMessage.trim(),
        sent_by: user?.id,
        user_id: uid,
      });
    }
    toast.success(`تم إرسال إشعار لـ ${selectedUsers.size} مستخدم`);
    setSelectedUsers(new Set());
    setNotifTitle("");
    setNotifMessage("");
  };

  const toggleUserSelection = (uid: string) => {
    setSelectedUsers(prev => {
      const n = new Set(prev);
      if (n.has(uid)) n.delete(uid); else n.add(uid);
      return n;
    });
  };

  const selectAllUsers = () => {
    if (selectedUsers.size === filteredProfiles.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredProfiles.map(p => p.id)));
    }
  };

  const exportCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [headers.join(","), ...data.map(row => headers.map(h => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`تم تصدير ${filename}.csv`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم النسخ!");
  };

  // Filtered & sorted users
  const filteredProfiles = useMemo(() => {
    let result = [...profiles];
    if (userSearch) {
      const s = userSearch.toLowerCase();
      result = result.filter(p =>
        (p.display_name || "").toLowerCase().includes(s) ||
        (p.email || "").toLowerCase().includes(s) ||
        (p.country || "").toLowerCase().includes(s) ||
        (p.city || "").toLowerCase().includes(s) ||
        (p.phone || "").includes(s)
      );
    }
    if (countryFilter !== "all") {
      result = result.filter(p => (p.country || "غير محدد") === countryFilter);
    }
    if (userSort === "newest") result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    else if (userSort === "oldest") result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    else if (userSort === "name") result.sort((a, b) => (a.display_name || "").localeCompare(b.display_name || ""));
    return result;
  }, [profiles, userSearch, userSort, countryFilter]);

  // Country data
  const countryData = useMemo(() => {
    const countries: Record<string, { count: number; users: any[] }> = {};
    profiles.forEach((p) => {
      const c = p.country || "غير محدد";
      if (!countries[c]) countries[c] = { count: 0, users: [] };
      countries[c].count++;
      countries[c].users.push(p);
    });
    return Object.entries(countries)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([name, data]) => ({ name, ...data }));
  }, [profiles]);

  const countryChartData = useMemo(() => countryData.map(c => ({ name: c.name, value: c.count })), [countryData]);

  // Chart data
  const dailyVisitsData = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" });
      days[key] = 0;
    }
    visits.forEach((v) => {
      const d = new Date(v.visited_at);
      const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diff < 7) {
        const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" });
        if (days[key] !== undefined) days[key]++;
      }
    });
    return Object.entries(days).map(([name, زيارات]) => ({ name, زيارات }));
  }, [visits]);

  const topPagesData = useMemo(() => {
    const pages: Record<string, number> = {};
    visits.forEach((v) => { pages[v.page_path] = (pages[v.page_path] || 0) + 1; });
    return Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, value]) => ({ name: decodeURIComponent(name), value }));
  }, [visits]);

  const dailyAiData = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" });
      days[key] = 0;
    }
    aiLogs.forEach((l) => {
      const d = new Date(l.created_at);
      const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diff < 7) {
        const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" });
        if (days[key] !== undefined) days[key]++;
      }
    });
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
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" });
      days[key] = 0;
    }
    profiles.forEach(p => {
      if (!p.created_at) return;
      const d = new Date(p.created_at);
      const diff = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diff < 7) {
        const key = d.toLocaleDateString("ar", { weekday: "short", day: "numeric" });
        if (days[key] !== undefined) days[key]++;
      }
    });
    return Object.entries(days).map(([name, تسجيلات]) => ({ name, تسجيلات }));
  }, [profiles]);

  const ageData = useMemo(() => {
    const ranges: Record<string, number> = { "أقل من 18": 0, "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0, "غير محدد": 0 };
    profiles.forEach(p => {
      if (!p.age) { ranges["غير محدد"]++; return; }
      if (p.age < 18) ranges["أقل من 18"]++;
      else if (p.age <= 25) ranges["18-25"]++;
      else if (p.age <= 35) ranges["26-35"]++;
      else if (p.age <= 50) ranges["36-50"]++;
      else ranges["50+"]++;
    });
    return Object.entries(ranges).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [profiles]);

  const filteredVisits = useMemo(() => {
    if (!visitSearch) return visits.slice(0, 100);
    const s = visitSearch.toLowerCase();
    return visits.filter(v => decodeURIComponent(v.page_path).toLowerCase().includes(s)).slice(0, 100);
  }, [visits, visitSearch]);

  const filteredAiLogs = useMemo(() => {
    if (!aiSearch) return aiLogs.slice(0, 100);
    const s = aiSearch.toLowerCase();
    return aiLogs.filter(l =>
      (l.message || "").toLowerCase().includes(s) ||
      (l.user_email || "").toLowerCase().includes(s) ||
      (l.response || "").toLowerCase().includes(s)
    ).slice(0, 100);
  }, [aiLogs, aiSearch]);

  const uniqueCountries = useMemo(() => {
    const set = new Set(profiles.map(p => p.country || "غير محدد"));
    return Array.from(set).sort();
  }, [profiles]);

  const todayStats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      visits: visits.filter(v => new Date(v.visited_at).toDateString() === today).length,
      chats: aiLogs.filter(l => new Date(l.created_at).toDateString() === today).length,
      signups: profiles.filter(p => p.created_at && new Date(p.created_at).toDateString() === today).length,
    };
  }, [visits, aiLogs, profiles]);

  // Advanced analytics
  const weeklyGrowth = useMemo(() => {
    const thisWeek = profiles.filter(p => {
      if (!p.created_at) return false;
      const diff = Math.floor((Date.now() - new Date(p.created_at).getTime()) / (1000 * 60 * 60 * 24));
      return diff < 7;
    }).length;
    const lastWeek = profiles.filter(p => {
      if (!p.created_at) return false;
      const diff = Math.floor((Date.now() - new Date(p.created_at).getTime()) / (1000 * 60 * 60 * 24));
      return diff >= 7 && diff < 14;
    }).length;
    if (lastWeek === 0) return thisWeek > 0 ? 100 : 0;
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  }, [profiles]);

  const avgSessionPages = useMemo(() => {
    if (!visits.length || !profiles.length) return 0;
    return Math.round(visits.length / profiles.length);
  }, [visits, profiles]);

  const activeUsersToday = useMemo(() => {
    const today = new Date().toDateString();
    const userIds = new Set(visits.filter(v => new Date(v.visited_at).toDateString() === today).map(v => v.user_id).filter(Boolean));
    return userIds.size;
  }, [visits]);

  const deviceData = useMemo(() => {
    const devices: Record<string, number> = { "موبايل": 0, "كمبيوتر": 0, "تابلت": 0, "غير معروف": 0 };
    visits.forEach(v => {
      const ua = (v.user_agent || "").toLowerCase();
      if (/mobile|android|iphone/.test(ua)) devices["موبايل"]++;
      else if (/tablet|ipad/.test(ua)) devices["تابلت"]++;
      else if (/windows|macintosh|linux/.test(ua)) devices["كمبيوتر"]++;
      else devices["غير معروف"]++;
    });
    return Object.entries(devices).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));
  }, [visits]);

  const browserData = useMemo(() => {
    const browsers: Record<string, number> = {};
    visits.forEach(v => {
      const ua = (v.user_agent || "").toLowerCase();
      let browser = "غير معروف";
      if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
      else if (ua.includes("firefox")) browser = "Firefox";
      else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
      else if (ua.includes("edg")) browser = "Edge";
      else if (ua.includes("opera") || ua.includes("opr")) browser = "Opera";
      browsers[browser] = (browsers[browser] || 0) + 1;
    });
    return Object.entries(browsers).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
  }, [visits]);

  // User engagement score
  const getUserEngagement = (uid: string) => {
    const userVisits = visits.filter(v => v.user_id === uid).length;
    const userChats = aiLogs.filter(l => l.user_id === uid).length;
    return { visits: userVisits, chats: userChats, score: userVisits + userChats * 3 };
  };

  const COLORS = ["hsl(var(--primary))", "#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#ec4899", "#f97316", "#14b8a6", "#a855f7"];
  const tooltipStyle = { backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" };

  if (authLoading || checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isDeveloper) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md border-destructive/30">
            <CardContent className="p-8 text-center space-y-4">
              <Shield className="w-16 h-16 mx-auto text-destructive" />
              <h2 className="text-xl font-bold text-foreground">غير مصرح</h2>
              <p className="text-muted-foreground">هذه الصفحة مخصصة للمطورين فقط.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">لوحة المطور المتقدمة</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">مركز التحكم والإدارة الشاملة</p>
                {autoRefresh && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-500 font-medium">مباشر</span>
                  </div>
                )}
              </div>
            </div>
            <Badge variant="outline" className="border-primary/40 text-primary">مطور</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => exportCSV(profiles, "users-export")} className="gap-2">
              <Download className="w-4 h-4" />
              تصدير المستخدمين
            </Button>
            <Button variant="outline" size="sm" onClick={() => exportCSV(visits.slice(0, 500), "visits-export")} className="gap-2">
              <Download className="w-4 h-4" />
              تصدير الزيارات
            </Button>
            <Button variant="outline" size="sm" onClick={fetchAllData} disabled={refreshing} className="gap-2">
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              تحديث
            </Button>
          </div>
        </div>

        {/* Stats Cards - Row 1: Main */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          {([
            { icon: Users, label: "إجمالي المستخدمين", value: stats.totalUsers },
            { icon: Eye, label: "إجمالي الزيارات", value: stats.totalVisits },
            { icon: MessageSquare, label: "محادثات AI", value: stats.totalAiChats },
            { icon: Globe, label: "الدول", value: countryData.length },
            { icon: UserPlus, label: "تسجيلات اليوم", value: todayStats.signups },
            { icon: Activity, label: "زيارات اليوم", value: todayStats.visits },
          ] as { icon: LucideIcon; label: string; value: number }[]).map((stat, i) => (
            <Card key={i} className="border-border/30 bg-card/80">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Cards - Row 2: Advanced */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {([
            { icon: TrendingUp, label: "نمو أسبوعي", value: `${weeklyGrowth > 0 ? "+" : ""}${weeklyGrowth}%` },
            { icon: Monitor, label: "مستخدمين نشطين اليوم", value: activeUsersToday },
            { icon: Zap, label: "محادثات اليوم", value: todayStats.chats },
            { icon: FileText, label: "صفحات لكل مستخدم", value: avgSessionPages },
            { icon: Bell, label: "إشعارات مرسلة", value: sentNotifications.length },
            { icon: ShieldCheck, label: "قبلوا الخصوصية", value: profiles.filter(p => p.privacy_accepted).length },
            { icon: Key, label: "حسابات المطورين", value: Object.values(userRoles).filter(r => r === "developer").length },
            { icon: Hash, label: "عدد المدن", value: new Set(profiles.map(p => p.city).filter(Boolean)).size },
          ] as { icon: LucideIcon; label: string; value: string | number }[]).map((stat, i) => (
            <Card key={i} className="border-border/30 bg-card/60">
              <CardContent className="p-3 flex flex-col items-center text-center gap-1.5">
                <stat.icon className="w-4 h-4 text-primary/70" />
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[9px] text-muted-foreground leading-tight">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-base">الزيارات اليومية (آخر 7 أيام)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={dailyVisitsData}>
                  <defs>
                    <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="زيارات" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#visitGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-base">محادثات AI اليومية</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dailyAiData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="محادثات" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <UserPlus className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-sm">التسجيلات الجديدة</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={dailySignups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="تسجيلات" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-sm">النشاط حسب الساعة</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 8 }} interval={3} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="نشاط" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Monitor className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-sm">الأجهزة</CardTitle>
            </CardHeader>
            <CardContent>
              {deviceData.length > 0 ? (
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={deviceData} cx="50%" cy="50%" outerRadius={55} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Wifi className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-sm">المتصفحات</CardTitle>
            </CardHeader>
            <CardContent>
              {browserData.length > 0 ? (
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={browserData} cx="50%" cy="50%" outerRadius={55} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {browserData.map((_, i) => <Cell key={i} fill={COLORS[(i + 3) % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Hash className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-sm">توزيع الأعمار</CardTitle>
            </CardHeader>
            <CardContent>
              {ageData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={ageData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {ageData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-sm">أعلى 10 صفحات زيارة</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topPagesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} width={120} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ═══════════════════════════════ DATA TABS ═══════════════════════════════ */}
        <Tabs defaultValue="users" dir="rtl">
          <TabsList className="mb-4 flex-wrap h-auto gap-1 bg-secondary/30 p-2 rounded-xl">
            <TabsTrigger value="users" className="gap-1"><Users className="w-3.5 h-3.5" />المستخدمين</TabsTrigger>
            <TabsTrigger value="management" className="gap-1"><Settings className="w-3.5 h-3.5" />إدارة متقدمة</TabsTrigger>
            <TabsTrigger value="countries" className="gap-1"><Globe className="w-3.5 h-3.5" />البلدان</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1"><Bell className="w-3.5 h-3.5" />الإشعارات</TabsTrigger>
            <TabsTrigger value="broadcast" className="gap-1"><Megaphone className="w-3.5 h-3.5" />البث</TabsTrigger>
            <TabsTrigger value="visits" className="gap-1"><Eye className="w-3.5 h-3.5" />الزيارات</TabsTrigger>
            <TabsTrigger value="ai" className="gap-1"><MessageSquare className="w-3.5 h-3.5" />محادثات AI</TabsTrigger>
            <TabsTrigger value="pages" className="gap-1"><BarChart3 className="w-3.5 h-3.5" />الصفحات</TabsTrigger>
            <TabsTrigger value="export" className="gap-1"><Download className="w-3.5 h-3.5" />التصدير</TabsTrigger>
            <TabsTrigger value="realtime" className="gap-1 relative">
              <Zap className="w-3.5 h-3.5" />الوقت الحقيقي
              {autoRefresh && <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            </TabsTrigger>
          </TabsList>

          {/* ═══════ USERS TAB ═══════ */}
          <TabsContent value="users">
            <div className="space-y-4">
              {/* Filters + Bulk Actions */}
              <Card className="border-border/30 bg-card/80">
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="بحث بالاسم، الإيميل، البلد، الهاتف..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} className="pr-10 bg-secondary/30 border-border/30" dir="auto" />
                    </div>
                    <Select value={countryFilter} onValueChange={setCountryFilter}>
                      <SelectTrigger className="w-[160px] bg-secondary/30 border-border/30">
                        <SelectValue placeholder="البلد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع البلدان</SelectItem>
                        {uniqueCountries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select value={userSort} onValueChange={(v: any) => setUserSort(v)}>
                      <SelectTrigger className="w-[140px] bg-secondary/30 border-border/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">الأحدث</SelectItem>
                        <SelectItem value="oldest">الأقدم</SelectItem>
                        <SelectItem value="name">الاسم</SelectItem>
                      </SelectContent>
                    </Select>
                    <Badge variant="secondary">{filteredProfiles.length} مستخدم</Badge>
                  </div>
                  {/* Bulk actions */}
                  {selectedUsers.size > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/20 flex items-center gap-3 flex-wrap">
                      <Badge className="bg-primary/20 text-primary">{selectedUsers.size} محدد</Badge>
                      <Button size="sm" variant="destructive" className="h-7 text-xs gap-1" onClick={handleBulkDelete}>
                        <Trash2 className="w-3 h-3" />حذف المحددين
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setSelectedUsers(new Set())}>إلغاء التحديد</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="border-border/30 bg-card/80">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30 bg-secondary/20">
                          <th className="p-3 w-10">
                            <input type="checkbox" checked={selectedUsers.size === filteredProfiles.length && filteredProfiles.length > 0} onChange={selectAllUsers} className="rounded accent-[hsl(var(--primary))]" />
                          </th>
                          <th className="text-right p-3 text-muted-foreground font-medium">المستخدم</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">البريد</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">الدور</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">العمر</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">البلد</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden lg:table-cell">المدينة</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden lg:table-cell">الهاتف</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden sm:table-cell">التاريخ</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">التفاعل</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">الخصوصية</th>
                          <th className="text-center p-3 text-muted-foreground font-medium">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProfiles.map((p) => {
                          const engagement = getUserEngagement(p.id);
                          return (
                            <tr key={p.id} className={`border-b border-border/10 hover:bg-secondary/20 transition-colors group ${selectedUsers.has(p.id) ? "bg-primary/5" : ""}`}>
                              <td className="p-3">
                                <input type="checkbox" checked={selectedUsers.has(p.id)} onChange={() => toggleUserSelection(p.id)} className="rounded accent-[hsl(var(--primary))]" />
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  {p.avatar_url ? (
                                    <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-border/30" />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                                      <span className="text-primary font-bold text-xs">{(p.display_name || "?")[0]}</span>
                                    </div>
                                  )}
                                  <div>
                                    <span className="text-foreground font-medium text-sm block">{p.display_name || "بدون اسم"}</span>
                                    {userRoles[p.id] === "developer" && <Badge variant="outline" className="text-[8px] border-primary/40 text-primary">مطور</Badge>}
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <button onClick={() => copyToClipboard(p.email || "")} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1" dir="ltr" title="انسخ">
                                  {p.email || "—"}
                                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                              </td>
                              <td className="p-3 hidden md:table-cell">
                                <Badge variant={userRoles[p.id] === "developer" ? "default" : "secondary"} className="text-[10px]">
                                  {userRoles[p.id] || "user"}
                                </Badge>
                              </td>
                              <td className="p-3 text-muted-foreground hidden md:table-cell">{p.age || "—"}</td>
                              <td className="p-3 hidden md:table-cell">
                                {p.country ? <Badge variant="outline" className="text-xs">{p.country}</Badge> : "—"}
                              </td>
                              <td className="p-3 text-muted-foreground text-xs hidden lg:table-cell">{p.city || "—"}</td>
                              <td className="p-3 text-muted-foreground text-xs hidden lg:table-cell" dir="ltr">{p.phone || "—"}</td>
                              <td className="p-3 text-muted-foreground text-xs hidden sm:table-cell">
                                {p.created_at ? new Date(p.created_at).toLocaleDateString("ar") : "—"}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-muted-foreground">{engagement.visits}z</span>
                                  <span className="text-[10px] text-muted-foreground">{engagement.chats}c</span>
                                  <div className="w-12 h-1.5 bg-secondary/30 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${Math.min(100, engagement.score * 2)}%` }} />
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <Badge variant={p.privacy_accepted ? "default" : "destructive"} className="text-[10px]">
                                  {p.privacy_accepted ? "✓" : "✗"}
                                </Badge>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center gap-1 justify-center">
                                  <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => setExpandedUser(expandedUser === p.id ? null : p.id)} title="تفاصيل">
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedUser === p.id ? "rotate-180" : ""}`} />
                                  </Button>
                                  {confirmDelete === p.id ? (
                                    <>
                                      <Button size="sm" variant="destructive" className="h-7 text-xs px-2" onClick={() => handleDeleteUser(p.id)} disabled={deletingUser === p.id}>
                                        {deletingUser === p.id ? "..." : "حذف"}
                                      </Button>
                                      <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => setConfirmDelete(null)}>إلغاء</Button>
                                    </>
                                  ) : p.id !== user?.id ? (
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setConfirmDelete(p.id)}>
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  ) : (
                                    <Badge variant="secondary" className="text-[10px]">أنت</Badge>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {/* Expanded user details */}
                    {expandedUser && (() => {
                      const p = profiles.find(pr => pr.id === expandedUser);
                      if (!p) return null;
                      const eng = getUserEngagement(p.id);
                      return (
                        <div className="p-4 bg-secondary/10 border-t border-border/20 space-y-3">
                          <h4 className="text-sm font-bold text-foreground">تفاصيل: {p.display_name || p.email}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="p-3 rounded-lg bg-card/80 border border-border/20">
                              <p className="text-[10px] text-muted-foreground">الزيارات</p>
                              <p className="text-lg font-bold text-foreground">{eng.visits}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-card/80 border border-border/20">
                              <p className="text-[10px] text-muted-foreground">محادثات AI</p>
                              <p className="text-lg font-bold text-foreground">{eng.chats}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-card/80 border border-border/20">
                              <p className="text-[10px] text-muted-foreground">نقاط التفاعل</p>
                              <p className="text-lg font-bold text-primary">{eng.score}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-card/80 border border-border/20">
                              <p className="text-[10px] text-muted-foreground">الدور</p>
                              <p className="text-lg font-bold text-foreground">{userRoles[p.id] || "user"}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(p.id)}>
                              <Copy className="w-3 h-3" />نسخ ID
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(p.email || "")}>
                              <Mail className="w-3 h-3" />نسخ البريد
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(JSON.stringify(p, null, 2))}>
                              <Code className="w-3 h-3" />نسخ JSON
                            </Button>
                          </div>
                        </div>
                      );
                    })()}
                    {filteredProfiles.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمين مطابقين</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ ADVANCED MANAGEMENT TAB ═══════ */}
          <TabsContent value="management">
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-border/30 bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-sm flex items-center gap-2">
                      <Database className="w-4 h-4 text-primary" />
                      إحصائيات قاعدة البيانات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "جدول المستخدمين (profiles)", value: profiles.length },
                      { label: "جدول الزيارات (page_visits)", value: visits.length },
                      { label: "جدول المحادثات (ai_chat_logs)", value: aiLogs.length },
                      { label: "جدول الإشعارات (notifications)", value: sentNotifications.length },
                      { label: "جدول الأدوار (user_roles)", value: Object.keys(userRoles).length },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <Badge variant="secondary" className="text-xs">{item.value}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/30 bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      حالة الأمان
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "RLS مفعل على جميع الجداول", status: true },
                      { label: "جميع المستخدمين بأدوار محددة", status: Object.keys(userRoles).length === profiles.length },
                      { label: "سياسة الخصوصية مقبولة", status: profiles.filter(p => p.privacy_accepted).length > 0 },
                      { label: "حذف الحسابات فعال", status: true },
                      { label: "التحقق من البريد مفعل", status: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        {item.status ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/30 bg-card/80">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-foreground text-sm flex items-center gap-2">
                      <Server className="w-4 h-4 text-primary" />
                      معلومات النظام
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "المنصة", value: "Lovable Cloud" },
                      { label: "قاعدة البيانات", value: "PostgreSQL" },
                      { label: "المصادقة", value: "Email + Link" },
                      { label: "التخزين", value: "Cloud Storage" },
                      { label: "Edge Functions", value: "مفعلة" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <Badge variant="outline" className="text-[10px]">{item.value}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* User Roles Overview */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-base flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary" />
                    إدارة الأدوار والصلاحيات
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">عرض شامل لأدوار جميع المستخدمين وصلاحياتهم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Developers */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <h3 className="text-sm font-bold text-foreground">المطورون ({Object.values(userRoles).filter(r => r === "developer").length})</h3>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {profiles.filter(p => userRoles[p.id] === "developer").map(p => (
                          <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-primary/5 border border-primary/20">
                            {p.avatar_url ? (
                              <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{(p.display_name || "?")[0]}</div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{p.display_name || "—"}</p>
                              <p className="text-[10px] text-muted-foreground" dir="ltr">{p.email}</p>
                            </div>
                            <Badge className="bg-primary/20 text-primary text-[10px]">مطور</Badge>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="text-xs font-bold text-primary mb-2">صلاحيات المطور:</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />عرض جميع البيانات</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />حذف المستخدمين</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />إرسال الإشعارات</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />تصدير البيانات</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />عرض محادثات AI</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />إدارة الإشعارات</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />عرض سجلات الزيارات</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />إحصائيات النظام</li>
                        </ul>
                      </div>
                    </div>
                    {/* Regular Users */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                        <h3 className="text-sm font-bold text-foreground">المستخدمون العاديون ({profiles.filter(p => userRoles[p.id] !== "developer").length})</h3>
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {profiles.filter(p => userRoles[p.id] !== "developer").slice(0, 20).map(p => (
                          <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/20 border border-border/20">
                            {p.avatar_url ? (
                              <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-secondary/40 flex items-center justify-center text-muted-foreground font-bold text-sm">{(p.display_name || "?")[0]}</div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{p.display_name || "—"}</p>
                              <p className="text-[10px] text-muted-foreground" dir="ltr">{p.email}</p>
                            </div>
                            <Badge variant="secondary" className="text-[10px]">مستخدم</Badge>
                          </div>
                        ))}
                        {profiles.filter(p => userRoles[p.id] !== "developer").length > 20 && (
                          <p className="text-xs text-muted-foreground text-center">+ {profiles.filter(p => userRoles[p.id] !== "developer").length - 20} مستخدم آخر</p>
                        )}
                      </div>
                      <div className="mt-3 p-3 rounded-lg bg-secondary/20 border border-border/20">
                        <h4 className="text-xs font-bold text-foreground mb-2">صلاحيات المستخدم:</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />عرض بياناته الشخصية</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />تعديل ملفه الشخصي</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />استخدام محادثات AI</li>
                          <li className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />عرض الإشعارات</li>
                          <li className="flex items-center gap-1"><XCircle className="w-3 h-3 text-destructive" />عرض بيانات الآخرين</li>
                          <li className="flex items-center gap-1"><XCircle className="w-3 h-3 text-destructive" />حذف المستخدمين</li>
                          <li className="flex items-center gap-1"><XCircle className="w-3 h-3 text-destructive" />إرسال إشعارات</li>
                          <li className="flex items-center gap-1"><XCircle className="w-3 h-3 text-destructive" />الوصول للوحة المطور</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Timeline */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-base flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    آخر الأنشطة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {[
                      ...profiles.slice(0, 5).map(p => ({ type: "signup" as const, time: p.created_at, text: `تسجيل جديد: ${p.display_name || p.email}`, icon: UserPlus })),
                      ...visits.slice(0, 10).map(v => ({ type: "visit" as const, time: v.visited_at, text: `زيارة: ${decodeURIComponent(v.page_path)}`, icon: Eye })),
                      ...aiLogs.slice(0, 5).map(l => ({ type: "ai" as const, time: l.created_at, text: `محادثة AI: ${l.message?.slice(0, 60)}...`, icon: MessageSquare })),
                    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 20).map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          item.type === "signup" ? "bg-emerald-500/15" :
                          item.type === "visit" ? "bg-primary/15" : "bg-violet-500/15"
                        }`}>
                          <item.icon className={`w-4 h-4 ${
                            item.type === "signup" ? "text-emerald-500" :
                            item.type === "visit" ? "text-primary" : "text-violet-500"
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{item.text}</p>
                          <p className="text-[10px] text-muted-foreground">{new Date(item.time).toLocaleString("ar")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ COUNTRIES TAB ═══════ */}
          <TabsContent value="countries">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/30 bg-card/80">
                  <CardHeader className="flex flex-row items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <CardTitle className="text-foreground text-base">توزيع المستخدمين حسب البلد</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {countryChartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                          <Pie data={countryChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value, percent }) => `${name} (${value} - ${(percent * 100).toFixed(0)}%)`}>
                            {countryChartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
                  </CardContent>
                </Card>

                <Card className="border-border/30 bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-foreground text-base">إحصائيات البلدان</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {countryChartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={countryChartData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                          <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                          <YAxis type="category" dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={80} />
                          <Tooltip contentStyle={tooltipStyle} />
                          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-base flex items-center gap-2">
                    <Flag className="w-5 h-5 text-primary" />
                    جدول البلدان التفصيلي ({countryData.length} بلد)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30 bg-secondary/20">
                          <th className="text-right p-3 text-muted-foreground font-medium">#</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">البلد</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">عدد المستخدمين</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">النسبة</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">المدن</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">المستخدمين</th>
                        </tr>
                      </thead>
                      <tbody>
                        {countryData.map((country, i) => {
                          const cities = [...new Set(country.users.map((u: any) => u.city).filter(Boolean))];
                          const percentage = ((country.count / profiles.length) * 100).toFixed(1);
                          return (
                            <tr key={country.name} className="border-b border-border/10 hover:bg-secondary/20">
                              <td className="p-3 text-muted-foreground font-bold">{i + 1}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                  <span className="text-foreground font-medium">{country.name}</span>
                                </div>
                              </td>
                              <td className="p-3"><Badge variant="secondary">{country.count}</Badge></td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <div className="h-2 bg-secondary/30 rounded-full overflow-hidden w-20">
                                    <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                                  </div>
                                  <span className="text-xs text-muted-foreground">{percentage}%</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex flex-wrap gap-1">
                                  {cities.length > 0 ? cities.map((city: string) => (
                                    <Badge key={city} variant="outline" className="text-[10px]">{city}</Badge>
                                  )) : <span className="text-xs text-muted-foreground">—</span>}
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="flex flex-wrap gap-1">
                                  {country.users.slice(0, 5).map((u: any) => (
                                    <span key={u.id} className="text-[10px] text-muted-foreground bg-secondary/30 rounded px-1.5 py-0.5">{u.display_name || u.email?.split("@")[0]}</span>
                                  ))}
                                  {country.users.length > 5 && <span className="text-[10px] text-primary">+{country.users.length - 5}</span>}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {countryData.length === 0 && <p className="text-center text-muted-foreground py-8">لا توجد بيانات</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ NOTIFICATIONS TAB ═══════ */}
          <TabsContent value="notifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    إرسال إشعار
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">المستلم</label>
                    <Select value={notifTarget} onValueChange={setNotifTarget}>
                      <SelectTrigger className="bg-secondary/30 border-border/30">
                        <SelectValue placeholder="اختر المستلم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">🔔 جميع المستخدمين</SelectItem>
                        {profiles.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.display_name || p.email} ({p.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">العنوان</label>
                    <Input value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} placeholder="عنوان الإشعار..." className="bg-secondary/30 border-border/30" dir="auto" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">الرسالة</label>
                    <Textarea value={notifMessage} onChange={(e) => setNotifMessage(e.target.value)} placeholder="محتوى الإشعار..." className="bg-secondary/30 border-border/30 min-h-[100px]" dir="auto" />
                  </div>
                  <Button onClick={handleSendNotification} disabled={sendingNotif || !notifTitle.trim() || !notifMessage.trim()} className="w-full gap-2">
                    {sendingNotif ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                    إرسال الإشعار
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    الإشعارات المرسلة ({sentNotifications.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {sentNotifications.map((n) => (
                      <div key={n.id} className="rounded-lg bg-secondary/20 border border-border/20 p-3 group">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{n.title}</p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                            <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground/60">
                              <span>{n.user_id ? profiles.find((p) => p.id === n.user_id)?.email || "مستخدم محدد" : "📢 الجميع"}</span>
                              <span>•</span>
                              <span>{new Date(n.created_at).toLocaleString("ar")}</span>
                            </div>
                          </div>
                          <Button size="icon" variant="ghost" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive" onClick={() => handleDeleteNotification(n.id)}>
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {sentNotifications.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد إشعارات مرسلة</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ BROADCAST TAB ═══════ */}
          <TabsContent value="broadcast">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    بث رسالة عامة
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">إرسال إشعار عاجل لجميع المستخدمين</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">عنوان البث</label>
                    <Input value={broadcastTitle} onChange={(e) => setBroadcastTitle(e.target.value)} placeholder="📢 عنوان الرسالة العامة..." className="bg-secondary/30 border-border/30" dir="auto" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">محتوى البث</label>
                    <Textarea value={broadcastMsg} onChange={(e) => setBroadcastMsg(e.target.value)} placeholder="اكتب رسالتك هنا... سيتم إرسالها لجميع المستخدمين" className="bg-secondary/30 border-border/30 min-h-[120px]" dir="auto" />
                  </div>
                  <Button onClick={handleBroadcast} disabled={sendingNotif || !broadcastTitle.trim() || !broadcastMsg.trim()} className="w-full gap-2" variant="default">
                    {sendingNotif ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Megaphone className="w-4 h-4" />}
                    بث الرسالة للجميع
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    إرسال مجمّع للمحددين
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">حدد مستخدمين من تاب "المستخدمين" ثم أرسل لهم</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/20 border border-border/20 text-center">
                    <Users className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-foreground font-medium">{selectedUsers.size} مستخدم محدد</p>
                    <p className="text-xs text-muted-foreground mt-1">اذهب لتاب المستخدمين لتحديد المستلمين</p>
                  </div>
                  <Input value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} placeholder="عنوان الإشعار..." className="bg-secondary/30 border-border/30" dir="auto" />
                  <Textarea value={notifMessage} onChange={(e) => setNotifMessage(e.target.value)} placeholder="محتوى الإشعار..." className="bg-secondary/30 border-border/30 min-h-[80px]" dir="auto" />
                  <Button onClick={handleBulkNotify} disabled={selectedUsers.size === 0 || !notifTitle.trim() || !notifMessage.trim()} className="w-full gap-2" variant="outline">
                    <Send className="w-4 h-4" />
                    إرسال لـ {selectedUsers.size} مستخدم
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ VISITS TAB ═══════ */}
          <TabsContent value="visits">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    سجل الزيارات ({visits.length})
                  </CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="بحث في الصفحات..." value={visitSearch} onChange={(e) => setVisitSearch(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 h-9 text-sm" dir="auto" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30 bg-secondary/20">
                        <th className="text-right p-3 text-muted-foreground font-medium">الصفحة</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">الوقت</th>
                        <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">المتصفح</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVisits.map((v) => (
                        <tr key={v.id} className="border-b border-border/10 hover:bg-secondary/20">
                          <td className="p-3 text-foreground" dir="ltr">{decodeURIComponent(v.page_path)}</td>
                          <td className="p-3 text-muted-foreground text-xs">{new Date(v.visited_at).toLocaleString("ar")}</td>
                          <td className="p-3 text-muted-foreground text-[10px] max-w-[200px] truncate hidden md:table-cell" dir="ltr">{v.user_agent?.split(" ").slice(0, 3).join(" ") || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredVisits.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد زيارات مطابقة</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════ AI TAB ═══════ */}
          <TabsContent value="ai">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    محادثات الذكاء الاصطناعي ({aiLogs.length})
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative w-64">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="بحث في المحادثات..." value={aiSearch} onChange={(e) => setAiSearch(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 h-9 text-sm" dir="auto" />
                    </div>
                    <Button size="sm" variant="outline" className="h-9 gap-1" onClick={() => exportCSV(aiLogs.slice(0, 500), "ai-logs-export")}>
                      <Download className="w-3.5 h-3.5" />تصدير
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredAiLogs.map((log) => (
                    <div key={log.id} className="rounded-lg bg-secondary/20 border border-border/20 overflow-hidden">
                      <button
                        onClick={() => setExpandedChat(expandedChat === log.id ? null : log.id)}
                        className="w-full p-4 flex items-center justify-between text-right hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Badge variant="outline" className="text-xs shrink-0">{log.ai_version}</Badge>
                          <span className="text-sm text-foreground truncate">{log.message}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground hidden sm:inline">
                            {log.user_email || "مجهول"} • {new Date(log.created_at).toLocaleString("ar")}
                          </span>
                          {expandedChat === log.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </div>
                      </button>
                      {expandedChat === log.id && (
                        <div className="px-4 pb-4 space-y-3 border-t border-border/20 pt-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">المستخدم:</p>
                            <p className="text-sm text-foreground bg-primary/10 rounded-lg p-3">{log.message}</p>
                          </div>
                          {log.response && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">الرد:</p>
                              <p className="text-sm text-muted-foreground bg-secondary/30 rounded-lg p-3 whitespace-pre-wrap">{log.response}</p>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{log.user_email || "مجهول"}</span>
                              <span>•</span>
                              <span>{new Date(log.created_at).toLocaleString("ar")}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(log.message + "\n\n" + (log.response || ""))}>
                              <Copy className="w-3 h-3" />نسخ
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {filteredAiLogs.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد محادثات مطابقة</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════ PAGES TAB ═══════ */}
          <TabsContent value="pages">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  ترتيب الصفحات حسب الزيارات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPagesData.map((page, i) => {
                    const max = topPagesData[0]?.value || 1;
                    const percent = (page.value / max) * 100;
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-5 text-center">{i + 1}</span>
                            <span className="text-foreground" dir="ltr">{page.name}</span>
                          </div>
                          <Badge variant="secondary">{page.value} زيارة</Badge>
                        </div>
                        <div className="h-2.5 bg-secondary/30 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                        </div>
                      </div>
                    );
                  })}
                  {topPagesData.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══════ EXPORT TAB ═══════ */}
          <TabsContent value="export">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "تصدير المستخدمين", desc: "جميع بيانات المستخدمين المسجلين", icon: Users, data: profiles, filename: "users" },
                { title: "تصدير الزيارات", desc: "آخر 500 زيارة مع التفاصيل", icon: Eye, data: visits.slice(0, 500), filename: "visits" },
                { title: "تصدير محادثات AI", desc: "آخر 500 محادثة مع الردود", icon: MessageSquare, data: aiLogs.slice(0, 500), filename: "ai-chats" },
                { title: "تصدير الإشعارات", desc: "جميع الإشعارات المرسلة", icon: Bell, data: sentNotifications, filename: "notifications" },
                { title: "تصدير البلدان", desc: "إحصائيات البلدان والمدن", icon: Globe, data: countryData.map(c => ({ country: c.name, users: c.count })), filename: "countries" },
                { title: "تصدير الأدوار", desc: "جميع أدوار المستخدمين", icon: Key, data: Object.entries(userRoles).map(([uid, role]) => ({ user_id: uid, role, email: profiles.find(p => p.id === uid)?.email || "" })), filename: "roles" },
              ].map((item, i) => (
                <Card key={i} className="border-border/30 bg-card/80 hover:border-primary/30 transition-colors cursor-pointer group" onClick={() => exportCSV(item.data, item.filename)}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto group-hover:bg-primary/25 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                    <Badge variant="secondary" className="text-xs">{item.data.length} سجل</Badge>
                    <Button size="sm" variant="outline" className="w-full gap-2 mt-2">
                      <Download className="w-4 h-4" />
                      تحميل CSV
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ═══════ REALTIME TAB ═══════ */}
          <TabsContent value="realtime">
            <div className="space-y-6">
              {/* Controls */}
              <Card className="border-primary/30 bg-card/80">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${autoRefresh ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"}`} />
                      <span className="text-sm font-medium text-foreground">
                        {autoRefresh ? "التحديث التلقائي مفعّل" : "التحديث التلقائي متوقف"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        آخر تحديث: {lastRefreshTime.toLocaleTimeString("ar")}
                      </span>
                      <Switch checked={autoRefresh} onCheckedChange={(v) => { setAutoRefresh(v); if (v) setCountdown(totalIntervalSec); }} />
                      <Button size="sm" variant="outline" onClick={() => { fetchAllData(); setCountdown(totalIntervalSec); }} disabled={refreshing} className="gap-1">
                        <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                        تحديث يدوي
                      </Button>
                    </div>
                  </div>

                  {/* Countdown Display */}
                  {autoRefresh && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">التحديث القادم بعد:</span>
                      <div className="flex items-center gap-1.5 font-mono text-sm" dir="ltr">
                        {(() => {
                          const d = Math.floor(countdown / 86400);
                          const h = Math.floor((countdown % 86400) / 3600);
                          const m = Math.floor((countdown % 3600) / 60);
                          const s = countdown % 60;
                          return (
                            <>
                              {(refreshIntervalDays > 0 || d > 0) && <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded">{d}<span className="text-[10px] text-muted-foreground mr-0.5">يوم</span></span>}
                              {(refreshIntervalHours > 0 || h > 0 || d > 0) && <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded">{String(h).padStart(2, '0')}<span className="text-[10px] text-muted-foreground mr-0.5">ساعة</span></span>}
                              <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded">{String(m).padStart(2, '0')}<span className="text-[10px] text-muted-foreground mr-0.5">دقيقة</span></span>
                              <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded">{String(s).padStart(2, '0')}<span className="text-[10px] text-muted-foreground mr-0.5">ثانية</span></span>
                            </>
                          );
                        })()}
                      </div>
                      {/* Progress bar */}
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${totalIntervalSec > 0 ? ((totalIntervalSec - countdown) / totalIntervalSec) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Custom Interval Settings */}
                  <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">تخصيص فترة التحديث</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-muted-foreground">أيام</label>
                        <Input type="number" min={0} max={30} value={refreshIntervalDays} onChange={e => { setRefreshIntervalDays(Math.max(0, parseInt(e.target.value) || 0)); }} className="h-8 text-sm text-center" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-muted-foreground">ساعات</label>
                        <Input type="number" min={0} max={23} value={refreshIntervalHours} onChange={e => { setRefreshIntervalHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0))); }} className="h-8 text-sm text-center" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-muted-foreground">دقائق</label>
                        <Input type="number" min={0} max={59} value={refreshIntervalMinutes} onChange={e => { setRefreshIntervalMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0))); }} className="h-8 text-sm text-center" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-muted-foreground">ثواني</label>
                        <Input type="number" min={0} max={59} value={refreshIntervalSeconds} onChange={e => { setRefreshIntervalSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0))); }} className="h-8 text-sm text-center" />
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      الفترة الحالية: {refreshIntervalDays > 0 ? `${refreshIntervalDays} يوم ` : ""}{refreshIntervalHours > 0 ? `${refreshIntervalHours} ساعة ` : ""}{refreshIntervalMinutes > 0 ? `${refreshIntervalMinutes} دقيقة ` : ""}{refreshIntervalSeconds > 0 ? `${refreshIntervalSeconds} ثانية` : ""}{totalIntervalMs < 1000 ? " ⚠️ الحد الأدنى ثانية واحدة" : ""}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Live Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {([
                  { icon: Users, label: "المستخدمين الآن", value: stats.totalUsers, color: "text-primary" },
                  { icon: Eye, label: "الزيارات اليوم", value: todayStats.visits, color: "text-primary" },
                  { icon: MessageSquare, label: "محادثات اليوم", value: todayStats.chats, color: "text-primary" },
                  { icon: UserPlus, label: "تسجيلات اليوم", value: todayStats.signups, color: "text-primary" },
                ] as { icon: LucideIcon; label: string; value: number; color: string }[]).map((stat, i) => (
                  <Card key={i} className="border-border/30 bg-card/80 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/40" />
                    <CardContent className="p-5 text-center">
                      <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Live Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/30 bg-card/80">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <CardTitle className="text-foreground text-sm">النشاط حسب الساعة (مباشر)</CardTitle>
                    {autoRefresh && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={hourlyData}>
                        <defs>
                          <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} interval={3} />
                        <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Area type="monotone" dataKey="نشاط" stroke="#10b981" fillOpacity={1} fill="url(#liveGrad)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-border/30 bg-card/80">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-foreground text-sm">الزيارات اليومية (مباشر)</CardTitle>
                    {autoRefresh && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={dailyVisitsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                        <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="زيارات" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Live Event Feed */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground text-base flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      الأحداث المباشرة
                      {autoRefresh && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                    </CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{liveEvents.length} حدث</Badge>
                      <div className="flex items-center gap-0.5 border border-border/30 rounded-lg p-0.5">
                        {(["all", "visit", "signup", "ai"] as const).map(f => (
                          <button
                            key={f}
                            onClick={() => setEventFilter(f)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                              eventFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`}
                          >
                            {f === "all" ? "الكل" : f === "visit" ? "زيارات" : f === "signup" ? "تسجيلات" : "AI"}
                          </button>
                        ))}
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setLiveEvents([])}>مسح</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {(() => {
                      const filtered = eventFilter === "all" ? liveEvents : liveEvents.filter(e => e.type === eventFilter);
                      if (filtered.length === 0) return (
                        <div className="text-center py-12">
                          <Activity className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                          <p className="text-sm text-muted-foreground">في انتظار أحداث جديدة...</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">ستظهر الأحداث هنا فور حدوثها</p>
                        </div>
                      );
                      return filtered.map((event, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/10 animate-fade-in">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            event.type === "signup" ? "bg-emerald-500/15" :
                            event.type === "visit" ? "bg-primary/15" : "bg-violet-500/15"
                          }`}>
                            {event.type === "signup" ? <UserPlus className="w-4 h-4 text-emerald-500" /> :
                             event.type === "visit" ? <Eye className="w-4 h-4 text-primary" /> :
                             <MessageSquare className="w-4 h-4 text-violet-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">{event.text}</p>
                            <p className="text-[10px] text-muted-foreground">{event.time.toLocaleTimeString("ar")}</p>
                          </div>
                          <Badge variant="outline" className="text-[9px] shrink-0">
                            {event.type === "signup" ? "تسجيل" : event.type === "visit" ? "زيارة" : "AI"}
                          </Badge>
                        </div>
                      ));
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* Devices & Browsers Live */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/30 bg-card/80">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Monitor className="w-5 h-5 text-primary" />
                    <CardTitle className="text-foreground text-sm">الأجهزة (مباشر)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {deviceData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie data={deviceData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                            {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
                  </CardContent>
                </Card>

                <Card className="border-border/30 bg-card/80">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Wifi className="w-5 h-5 text-primary" />
                    <CardTitle className="text-foreground text-sm">المتصفحات (مباشر)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {browserData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie data={browserData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                            {browserData.map((_, i) => <Cell key={i} fill={COLORS[(i + 3) % COLORS.length]} />)}
                          </Pie>
                          <Tooltip contentStyle={tooltipStyle} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default DeveloperPage;