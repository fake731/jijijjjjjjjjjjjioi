import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, MessageSquare, Shield, TrendingUp, BarChart3, Globe, MapPin, Phone, ChevronDown, ChevronUp, Trash2, Mail, Calendar, UserCheck, AlertTriangle, Bell, Send, Search, Filter, Download, RefreshCw, Clock, Activity, Zap, Database, Settings, UserX, UserPlus, Flag, Hash, ArrowUpDown, MoreVertical, Copy, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    const [profilesRes, visitsRes, logsRes, notifsRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("page_visits").select("*").order("visited_at", { ascending: false }).limit(1000),
      supabase.from("ai_chat_logs").select("*").order("created_at", { ascending: false }).limit(1000),
      supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(100),
    ]);

    const p = profilesRes.data || [];
    const v = visitsRes.data || [];
    const l = logsRes.data || [];
    setProfiles(p);
    setVisits(v);
    setAiLogs(l);
    setStats({ totalUsers: p.length, totalVisits: v.length, totalAiChats: l.length });
    setSentNotifications(notifsRes.data || []);
    setRefreshing(false);
  };

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
      const d = new Date();
      d.setDate(d.getDate() - i);
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
    visits.forEach((v) => {
      pages[v.page_path] = (pages[v.page_path] || 0) + 1;
    });
    return Object.entries(pages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, value]) => ({ name: decodeURIComponent(name), value }));
  }, [visits]);

  const dailyAiData = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
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

  // Hourly activity
  const hourlyData = useMemo(() => {
    const hours: Record<number, number> = {};
    for (let i = 0; i < 24; i++) hours[i] = 0;
    visits.forEach(v => {
      const h = new Date(v.visited_at).getHours();
      hours[h]++;
    });
    return Object.entries(hours).map(([hour, count]) => ({
      name: `${hour}:00`,
      نشاط: count,
    }));
  }, [visits]);

  // Daily signups
  const dailySignups = useMemo(() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
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

  // Age distribution
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

  // Filtered visits
  const filteredVisits = useMemo(() => {
    if (!visitSearch) return visits.slice(0, 100);
    const s = visitSearch.toLowerCase();
    return visits.filter(v => decodeURIComponent(v.page_path).toLowerCase().includes(s)).slice(0, 100);
  }, [visits, visitSearch]);

  // Filtered AI logs
  const filteredAiLogs = useMemo(() => {
    if (!aiSearch) return aiLogs.slice(0, 100);
    const s = aiSearch.toLowerCase();
    return aiLogs.filter(l =>
      (l.message || "").toLowerCase().includes(s) ||
      (l.user_email || "").toLowerCase().includes(s) ||
      (l.response || "").toLowerCase().includes(s)
    ).slice(0, 100);
  }, [aiLogs, aiSearch]);

  // Unique countries list
  const uniqueCountries = useMemo(() => {
    const set = new Set(profiles.map(p => p.country || "غير محدد"));
    return Array.from(set).sort();
  }, [profiles]);

  // Today stats
  const todayStats = useMemo(() => {
    const today = new Date().toDateString();
    return {
      visits: visits.filter(v => new Date(v.visited_at).toDateString() === today).length,
      chats: aiLogs.filter(l => new Date(l.created_at).toDateString() === today).length,
      signups: profiles.filter(p => p.created_at && new Date(p.created_at).toDateString() === today).length,
    };
  }, [visits, aiLogs, profiles]);

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
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">لوحة المطور</h1>
            <Badge variant="outline" className="border-primary/40 text-primary">مطور</Badge>
          </div>
          <Button variant="outline" size="sm" onClick={fetchAllData} disabled={refreshing} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            تحديث البيانات
          </Button>
        </div>

        {/* Stats Cards - Row 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { icon: Users, label: "المستخدمين", value: stats.totalUsers, color: "primary" },
            { icon: Eye, label: "الزيارات", value: stats.totalVisits, color: "primary" },
            { icon: MessageSquare, label: "محادثات AI", value: stats.totalAiChats, color: "primary" },
            { icon: Globe, label: "الدول", value: countryData.length, color: "primary" },
            { icon: UserPlus, label: "تسجيلات اليوم", value: todayStats.signups, color: "primary" },
            { icon: Activity, label: "زيارات اليوم", value: todayStats.visits, color: "primary" },
          ].map((stat, i) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <UserPlus className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-base">التسجيلات الجديدة</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={dailySignups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="تسجيلات" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-base">النشاط حسب الساعة</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} interval={3} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="نشاط" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Hash className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-base">توزيع الأعمار</CardTitle>
            </CardHeader>
            <CardContent>
              {ageData.length > 0 ? (
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={ageData} cx="50%" cy="50%" outerRadius={65} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                      {ageData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
            </CardContent>
          </Card>
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="users" dir="rtl">
          <TabsList className="mb-4 flex-wrap h-auto gap-1">
            <TabsTrigger value="users" className="gap-1"><Users className="w-3.5 h-3.5" />المستخدمين</TabsTrigger>
            <TabsTrigger value="countries" className="gap-1"><Globe className="w-3.5 h-3.5" />البلدان</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1"><Bell className="w-3.5 h-3.5" />الإشعارات</TabsTrigger>
            <TabsTrigger value="visits" className="gap-1"><Eye className="w-3.5 h-3.5" />الزيارات</TabsTrigger>
            <TabsTrigger value="ai" className="gap-1"><MessageSquare className="w-3.5 h-3.5" />محادثات AI</TabsTrigger>
            <TabsTrigger value="pages" className="gap-1"><BarChart3 className="w-3.5 h-3.5" />الصفحات</TabsTrigger>
          </TabsList>

          {/* ═══════ USERS TAB ═══════ */}
          <TabsContent value="users">
            <div className="space-y-4">
              {/* Filters */}
              <Card className="border-border/30 bg-card/80">
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="بحث بالاسم، الإيميل، البلد، الهاتف..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="pr-10 bg-secondary/30 border-border/30"
                        dir="auto"
                      />
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
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="border-border/30 bg-card/80">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30 bg-secondary/20">
                          <th className="text-right p-3 text-muted-foreground font-medium">المستخدم</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">البريد</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">العمر</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">البلد</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden lg:table-cell">المدينة</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden lg:table-cell">الهاتف</th>
                          <th className="text-right p-3 text-muted-foreground font-medium hidden sm:table-cell">التاريخ</th>
                          <th className="text-right p-3 text-muted-foreground font-medium">الخصوصية</th>
                          <th className="text-center p-3 text-muted-foreground font-medium">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProfiles.map((p) => (
                          <tr key={p.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors group">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                {p.avatar_url ? (
                                  <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-border/30" />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                                    <span className="text-primary font-bold text-xs">{(p.display_name || "?")[0]}</span>
                                  </div>
                                )}
                                <span className="text-foreground font-medium text-sm">{p.display_name || "بدون اسم"}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <button onClick={() => copyToClipboard(p.email || "")} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1" dir="ltr" title="انسخ">
                                {p.email || "—"}
                                <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            </td>
                            <td className="p-3 text-muted-foreground hidden md:table-cell">{p.age || "—"}</td>
                            <td className="p-3 hidden md:table-cell">
                              {p.country ? (
                                <Badge variant="outline" className="text-xs">{p.country}</Badge>
                              ) : "—"}
                            </td>
                            <td className="p-3 text-muted-foreground text-xs hidden lg:table-cell">{p.city || "—"}</td>
                            <td className="p-3 text-muted-foreground text-xs hidden lg:table-cell" dir="ltr">{p.phone || "—"}</td>
                            <td className="p-3 text-muted-foreground text-xs hidden sm:table-cell">
                              {p.created_at ? new Date(p.created_at).toLocaleDateString("ar") : "—"}
                            </td>
                            <td className="p-3">
                              <Badge variant={p.privacy_accepted ? "default" : "destructive"} className="text-[10px]">
                                {p.privacy_accepted ? "✓" : "✗"}
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              {confirmDelete === p.id ? (
                                <div className="flex items-center gap-1 justify-center">
                                  <Button size="sm" variant="destructive" className="h-7 text-xs px-2" onClick={() => handleDeleteUser(p.id)} disabled={deletingUser === p.id}>
                                    {deletingUser === p.id ? "..." : "حذف"}
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => setConfirmDelete(null)}>
                                    إلغاء
                                  </Button>
                                </div>
                              ) : p.id !== user?.id ? (
                                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setConfirmDelete(p.id)}>
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              ) : (
                                <Badge variant="secondary" className="text-[10px]">أنت</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredProfiles.length === 0 && (
                      <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمين مطابقين</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ COUNTRIES TAB ═══════ */}
          <TabsContent value="countries">
            <div className="space-y-6">
              {/* Country Chart */}
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

              {/* Country Details Table */}
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
                              <td className="p-3">
                                <Badge variant="secondary">{country.count}</Badge>
                              </td>
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
                                  {country.users.length > 5 && (
                                    <span className="text-[10px] text-primary">+{country.users.length - 5}</span>
                                  )}
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
                  <div className="relative w-64">
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="بحث في المحادثات..." value={aiSearch} onChange={(e) => setAiSearch(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 h-9 text-sm" dir="auto" />
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
                              <Copy className="w-3 h-3" />
                              نسخ
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
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default DeveloperPage;