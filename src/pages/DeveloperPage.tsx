import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, MessageSquare, Shield, TrendingUp, BarChart3, Globe, MapPin, Phone, ChevronDown, ChevronUp, Trash2, Mail, Calendar, UserCheck, AlertTriangle, Bell, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
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
    const [profilesRes, visitsRes, logsRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("page_visits").select("*").order("visited_at", { ascending: false }).limit(500),
      supabase.from("ai_chat_logs").select("*").order("created_at", { ascending: false }).limit(500),
    ]);

    const p = profilesRes.data || [];
    const v = visitsRes.data || [];
    const l = logsRes.data || [];
    setProfiles(p);
    setVisits(v);
    setAiLogs(l);
    setStats({ totalUsers: p.length, totalVisits: v.length, totalAiChats: l.length });
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
      .slice(0, 8)
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

  const countryData = useMemo(() => {
    const countries: Record<string, number> = {};
    profiles.forEach((p) => {
      const c = p.country || "غير محدد";
      countries[c] = (countries[c] || 0) + 1;
    });
    return Object.entries(countries)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  }, [profiles]);

  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#ec4899"];

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
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">لوحة المطور</h1>
          <Badge variant="outline" className="border-primary/40 text-primary">مطور</Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/30 bg-card/80">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                <p className="text-xs text-muted-foreground">المستخدمين</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/80">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                <Eye className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalVisits}</p>
                <p className="text-xs text-muted-foreground">الزيارات</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/80">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalAiChats}</p>
                <p className="text-xs text-muted-foreground">محادثات AI</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/80">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{countryData.length}</p>
                <p className="text-xs text-muted-foreground">الدول</p>
              </div>
            </CardContent>
          </Card>
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
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
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
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="محادثات" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/30 bg-card/80">
            <CardHeader>
              <CardTitle className="text-foreground text-base">أكثر الصفحات زيارة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPagesData.map((page, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-sm text-foreground truncate" dir="ltr">{page.name}</span>
                    </div>
                    <Badge variant="secondary" className="shrink-0">{page.value}</Badge>
                  </div>
                ))}
                {topPagesData.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">لا توجد بيانات</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/30 bg-card/80">
            <CardHeader className="flex flex-row items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <CardTitle className="text-foreground text-base">توزيع المستخدمين حسب البلد</CardTitle>
            </CardHeader>
            <CardContent>
              {countryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={countryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                      {countryData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="users" dir="rtl">
          <TabsList className="mb-4 flex-wrap h-auto gap-1">
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="visits">الزيارات</TabsTrigger>
            <TabsTrigger value="ai">محادثات AI</TabsTrigger>
            <TabsTrigger value="pages">الصفحات الأكثر زيارة</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  المستخدمين المسجلين ({profiles.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {profiles.map((p) => (
                  <Card key={p.id} className="border-border/30 bg-card/80 relative overflow-hidden group">
                    {/* Delete confirmation overlay */}
                    {confirmDelete === p.id && (
                      <div className="absolute inset-0 bg-background/95 z-10 flex flex-col items-center justify-center gap-3 p-4">
                        <AlertTriangle className="w-10 h-10 text-destructive" />
                        <p className="text-sm text-foreground text-center font-medium">
                          هل أنت متأكد من حذف هذا المستخدم؟
                        </p>
                        <p className="text-xs text-muted-foreground text-center">{p.email}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(p.id)}
                            disabled={deletingUser === p.id}
                          >
                            {deletingUser === p.id ? "جاري الحذف..." : "نعم، احذف"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setConfirmDelete(null)}
                          >
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {p.avatar_url ? (
                            <img src={p.avatar_url} alt={p.display_name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                              <span className="text-primary font-bold text-lg">
                                {(p.display_name || "?")[0]}
                              </span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-foreground">{p.display_name || "بدون اسم"}</h3>
                            <Badge variant={p.privacy_accepted ? "default" : "destructive"} className="text-[10px] mt-1">
                              {p.privacy_accepted ? "موافق على الخصوصية" : "غير موافق"}
                            </Badge>
                          </div>
                        </div>
                        {p.id !== user?.id && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setConfirmDelete(p.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate" dir="ltr">{p.email || "—"}</span>
                        </div>
                        {p.age && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <UserCheck className="w-3.5 h-3.5 shrink-0" />
                            <span>{p.age} سنة</span>
                          </div>
                        )}
                        {p.country && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Globe className="w-3.5 h-3.5 shrink-0" />
                            <span>{p.country}{p.city ? ` - ${p.city}` : ""}</span>
                          </div>
                        )}
                        {p.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span dir="ltr">{p.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{p.created_at ? new Date(p.created_at).toLocaleDateString("ar") : "—"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {profiles.length === 0 && (
                <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمين</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="visits">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <CardTitle className="text-foreground">سجل الزيارات ({visits.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-right p-3 text-muted-foreground font-medium">الصفحة</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">الوقت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visits.map((v) => (
                        <tr key={v.id} className="border-b border-border/10 hover:bg-secondary/20">
                          <td className="p-3 text-foreground" dir="ltr">{decodeURIComponent(v.page_path)}</td>
                          <td className="p-3 text-muted-foreground text-xs">
                            {new Date(v.visited_at).toLocaleString("ar")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {visits.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">لا يوجد زيارات مسجلة</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <CardTitle className="text-foreground">محادثات الذكاء الاصطناعي ({aiLogs.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiLogs.map((log) => (
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
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{log.user_email || "مجهول"}</span>
                            <span>•</span>
                            <span>{new Date(log.created_at).toLocaleString("ar")}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {aiLogs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">لا يوجد محادثات مسجلة</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <CardTitle className="text-foreground">ترتيب الصفحات حسب الزيارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topPagesData.map((page, i) => {
                    const max = topPagesData[0]?.value || 1;
                    const percent = (page.value / max) * 100;
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground" dir="ltr">{page.name}</span>
                          <span className="text-muted-foreground font-medium">{page.value} زيارة</span>
                        </div>
                        <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${percent}%`, backgroundColor: COLORS[i % COLORS.length] }}
                          />
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
