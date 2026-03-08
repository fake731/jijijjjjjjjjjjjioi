import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTheme, colorThemes, type Theme, type ColorTheme } from "@/hooks/use-theme";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Eye, MessageSquare, TrendingUp, BarChart3, Clock, Activity,
  Calendar, Sun, Moon, Palette, User, ChevronRight, Sparkles,
  Globe, MapPin, Mail, Zap, Target, Award, Flame
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme();

  const [visits, setVisits] = useState<any[]>([]);
  const [aiLogs, setAiLogs] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/تسجيل-الدخول");
      return;
    }
    if (user) fetchData();
  }, [user, authLoading]);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    const [visitsRes, logsRes, profileRes] = await Promise.all([
      supabase.from("page_visits").select("*").eq("user_id", user.id).order("visited_at", { ascending: false }).limit(500),
      supabase.from("ai_chat_logs").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(500),
      supabase.from("profiles").select("*").eq("id", user.id).single(),
    ]);
    setVisits(visitsRes.data || []);
    setAiLogs(logsRes.data || []);
    setProfile(profileRes.data);
    setLoading(false);
  };

  // Analytics
  const totalVisits = visits.length;
  const totalChats = aiLogs.length;
  const today = new Date().toDateString();
  const todayVisits = visits.filter(v => new Date(v.visited_at).toDateString() === today).length;
  const todayChats = aiLogs.filter(l => new Date(l.created_at).toDateString() === today).length;

  const joinDate = user?.created_at ? new Date(user.created_at) : new Date();
  const daysSinceJoin = Math.max(1, Math.floor((Date.now() - joinDate.getTime()) / 86400000));

  // Streak calculation
  const streak = useMemo(() => {
    const days = new Set(visits.map(v => new Date(v.visited_at).toDateString()));
    let count = 0;
    const d = new Date();
    while (days.has(d.toDateString())) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [visits]);

  // Unique pages visited
  const uniquePages = useMemo(() => new Set(visits.map(v => v.page_path)).size, [visits]);

  // Weekly chart data
  const weeklyData = useMemo(() => {
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const data = days.map((name, i) => ({ name, زيارات: 0, محادثات: 0 }));
    const now = new Date();
    visits.forEach(v => {
      const d = new Date(v.visited_at);
      if (now.getTime() - d.getTime() < 7 * 86400000) {
        data[d.getDay()].زيارات++;
      }
    });
    aiLogs.forEach(l => {
      const d = new Date(l.created_at);
      if (now.getTime() - d.getTime() < 7 * 86400000) {
        data[d.getDay()].محادثات++;
      }
    });
    return data;
  }, [visits, aiLogs]);

  // Top pages
  const topPages = useMemo(() => {
    const map: Record<string, number> = {};
    visits.forEach(v => { map[v.page_path] = (map[v.page_path] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([page, count]) => ({ page, count }));
  }, [visits]);

  // Hourly activity
  const hourlyData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}:00`, نشاط: 0 }));
    visits.forEach(v => { hours[new Date(v.visited_at).getHours()].نشاط++; });
    return hours;
  }, [visits]);

  // AI version usage
  const aiVersionData = useMemo(() => {
    const map: Record<string, number> = {};
    aiLogs.forEach(l => {
      const v = l.ai_version || "v1";
      map[v] = (map[v] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [aiLogs]);

  const pieColors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--muted))", "hsl(var(--secondary))"];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full rounded-2xl object-cover" />
            ) : (
              <User className="w-7 h-7 text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              أهلاً {profile?.display_name || "بك"} 👋
            </h1>
            <p className="text-sm text-muted-foreground">لوحة تحكمك الشخصية</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Eye, label: "إجمالي الزيارات", value: totalVisits, sub: `${todayVisits} اليوم` },
            { icon: MessageSquare, label: "محادثات AI", value: totalChats, sub: `${todayChats} اليوم` },
            { icon: Flame, label: "أيام متتالية", value: streak, sub: "سلسلة نشاطك" },
            { icon: Target, label: "صفحات مختلفة", value: uniquePages, sub: `معدل ${(totalVisits / daysSinceJoin).toFixed(1)}/يوم` },
          ].map((s, i) => (
            <Card key={i} className="border-border/30 bg-card/80">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <span className="text-[10px] text-muted-foreground">{s.sub}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="flex flex-wrap gap-1 h-auto p-1 bg-muted/50">
            <TabsTrigger value="activity" className="gap-1"><Activity className="w-3.5 h-3.5" />النشاط</TabsTrigger>
            <TabsTrigger value="ai" className="gap-1"><Sparkles className="w-3.5 h-3.5" />محادثات AI</TabsTrigger>
            <TabsTrigger value="stats" className="gap-1"><BarChart3 className="w-3.5 h-3.5" />الإحصائيات</TabsTrigger>
            <TabsTrigger value="customize" className="gap-1"><Palette className="w-3.5 h-3.5" />تخصيص الواجهة</TabsTrigger>
          </TabsList>

          {/* ═══════ ACTIVITY TAB ═══════ */}
          <TabsContent value="activity">
            <div className="space-y-6">
              {/* Weekly Chart */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    نشاطك هذا الأسبوع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                      <Bar dataKey="زيارات" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="محادثات" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    آخر النشاطات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {visits.slice(0, 20).map((v, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/20">
                        <div className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-primary" />
                          <span className="text-sm text-foreground font-mono" dir="ltr">{v.page_path}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(v.visited_at).toLocaleDateString("ar")} - {new Date(v.visited_at).toLocaleTimeString("ar")}
                        </span>
                      </div>
                    ))}
                    {visits.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">لا توجد نشاطات بعد</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ AI TAB ═══════ */}
          <TabsContent value="ai">
            <div className="space-y-6">
              {/* AI Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="border-border/30 bg-card/80">
                  <CardContent className="p-4 text-center">
                    <MessageSquare className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{totalChats}</div>
                    <span className="text-xs text-muted-foreground">إجمالي المحادثات</span>
                  </CardContent>
                </Card>
                <Card className="border-border/30 bg-card/80">
                  <CardContent className="p-4 text-center">
                    <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{todayChats}</div>
                    <span className="text-xs text-muted-foreground">محادثات اليوم</span>
                  </CardContent>
                </Card>
                <Card className="border-border/30 bg-card/80">
                  <CardContent className="p-4 text-center">
                    <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{aiVersionData.length}</div>
                    <span className="text-xs text-muted-foreground">نماذج مستخدمة</span>
                  </CardContent>
                </Card>
              </div>

              {/* AI Version Pie */}
              {aiVersionData.length > 0 && (
                <Card className="border-border/30 bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-foreground text-sm">توزيع استخدام النماذج</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={aiVersionData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                          {aiVersionData.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Recent Chats */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    آخر المحادثات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {aiLogs.slice(0, 15).map((l, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/20 space-y-1">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-[10px]">{l.ai_version || "v1"}</Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(l.created_at).toLocaleDateString("ar")} - {new Date(l.created_at).toLocaleTimeString("ar")}
                          </span>
                        </div>
                        <p className="text-sm text-foreground line-clamp-2">{l.message}</p>
                      </div>
                    ))}
                    {aiLogs.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">لا توجد محادثات بعد</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ STATS TAB ═══════ */}
          <TabsContent value="stats">
            <div className="space-y-6">
              {/* Hourly Activity */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    نشاطك حسب الساعة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                      <Area type="monotone" dataKey="نشاط" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Pages */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    أكثر الصفحات زيارة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topPages.map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/20">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                          <span className="text-sm text-foreground font-mono" dir="ltr">{p.page}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">{p.count} زيارة</Badge>
                      </div>
                    ))}
                    {topPages.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">لا توجد بيانات</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Summary Card */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    ملخص الاستخدام
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    {[
                      { label: "أيام منذ الانضمام", value: daysSinceJoin },
                      { label: "معدل الزيارات/يوم", value: (totalVisits / daysSinceJoin).toFixed(1) },
                      { label: "معدل المحادثات/يوم", value: (totalChats / daysSinceJoin).toFixed(1) },
                      { label: "أطول سلسلة", value: `${streak} أيام` },
                    ].map((s, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/20">
                        <div className="text-lg font-bold text-foreground">{s.value}</div>
                        <span className="text-[10px] text-muted-foreground">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ═══════ CUSTOMIZE TAB ═══════ */}
          <TabsContent value="customize">
            <div className="space-y-6">
              {/* Theme Mode */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    {theme === "dark" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
                    وضع العرض
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-4 rounded-xl border-2 transition-all ${theme === "dark" ? "border-primary bg-primary/10" : "border-border/30 bg-muted/30 hover:border-border"}`}
                    >
                      <Moon className="w-8 h-8 mx-auto mb-2 text-foreground" />
                      <span className="text-sm font-medium text-foreground">الوضع الداكن</span>
                    </button>
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-4 rounded-xl border-2 transition-all ${theme === "light" ? "border-primary bg-primary/10" : "border-border/30 bg-muted/30 hover:border-border"}`}
                    >
                      <Sun className="w-8 h-8 mx-auto mb-2 text-foreground" />
                      <span className="text-sm font-medium text-foreground">الوضع الفاتح</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Color Theme */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    اللون الرئيسي
                  </CardTitle>
                  <CardDescription>اختر اللون المفضل للواجهة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {colorThemes.map((ct) => (
                      <button
                        key={ct.id}
                        onClick={() => setColorTheme(ct.id)}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${colorTheme === ct.id ? "border-primary scale-105 shadow-lg" : "border-border/30 hover:border-border"}`}
                      >
                        <div className="w-8 h-8 rounded-full shadow-inner" style={{ backgroundColor: ct.color }} />
                        <span className="text-[10px] text-foreground font-medium">{ct.nameAr}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Quick Info */}
              <Card className="border-border/30 bg-card/80">
                <CardHeader>
                  <CardTitle className="text-foreground text-sm flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    معلومات حسابك
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: Mail, label: "البريد", value: user?.email },
                    { icon: User, label: "الاسم", value: profile?.display_name || "غير محدد" },
                    { icon: Globe, label: "البلد", value: profile?.country || "غير محدد" },
                    { icon: MapPin, label: "المدينة", value: profile?.city || "غير محدد" },
                    { icon: Calendar, label: "تاريخ الانضمام", value: joinDate.toLocaleDateString("ar") },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30 border border-border/20">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      </div>
                      <span className="text-sm text-foreground" dir="auto">{item.value}</span>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2 gap-2" onClick={() => navigate("/الملف-الشخصي")}>
                    تعديل الملف الشخصي
                    <ChevronRight className="w-4 h-4 rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;
