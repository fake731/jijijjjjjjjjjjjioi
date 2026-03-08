import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, UserPlus, Activity, Target, BarChart3 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const RetentionTab = () => {
  const { profiles, visits, aiLogs, weeklyGrowth, tooltipStyle } = useDeveloper();

  // Monthly signups (last 6 months)
  const monthlySignups = useMemo(() => {
    const months: Record<string, number> = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = d.toLocaleDateString("ar", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    profiles.forEach(p => {
      if (!p.created_at) return;
      const d = new Date(p.created_at);
      const diff = Math.floor((Date.now() - d.getTime()) / (86400000 * 30));
      if (diff < 6) {
        const key = d.toLocaleDateString("ar", { month: "short", year: "2-digit" });
        if (months[key] !== undefined) months[key]++;
      }
    });
    return Object.entries(months).map(([name, تسجيلات]) => ({ name, تسجيلات }));
  }, [profiles]);

  // Retention: users who visited in last 7 days vs total
  const retentionRate = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400000;
    const activeUsers = new Set(visits.filter(v => new Date(v.visited_at).getTime() > weekAgo).map(v => v.user_id).filter(Boolean));
    return profiles.length > 0 ? ((activeUsers.size / profiles.length) * 100).toFixed(1) : "0";
  }, [visits, profiles]);

  // Churn: users who haven't visited in 30 days
  const churnedUsers = useMemo(() => {
    const monthAgo = Date.now() - 30 * 86400000;
    const recentVisitors = new Set(visits.filter(v => new Date(v.visited_at).getTime() > monthAgo).map(v => v.user_id).filter(Boolean));
    return profiles.filter(p => !recentVisitors.has(p.id)).length;
  }, [visits, profiles]);

  const churnRate = profiles.length > 0 ? ((churnedUsers / profiles.length) * 100).toFixed(1) : "0";

  // DAU over last 14 days
  const dauData = useMemo(() => {
    const data: { name: string; مستخدمين: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const day = d.toDateString();
      const users = new Set(visits.filter(v => new Date(v.visited_at).toDateString() === day).map(v => v.user_id).filter(Boolean));
      data.push({ name: d.toLocaleDateString("ar", { day: "numeric", month: "short" }), مستخدمين: users.size });
    }
    return data;
  }, [visits]);

  // Engagement: avg visits per active user
  const avgVisitsPerUser = useMemo(() => {
    const userVisits: Record<string, number> = {};
    visits.forEach(v => { if (v.user_id) userVisits[v.user_id] = (userVisits[v.user_id] || 0) + 1; });
    const vals = Object.values(userVisits);
    return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "0";
  }, [visits]);

  // Top engaged users
  const topEngaged = useMemo(() => {
    const map: Record<string, number> = {};
    visits.forEach(v => { if (v.user_id) map[v.user_id] = (map[v.user_id] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([uid, count]) => {
      const p = profiles.find(pr => pr.id === uid);
      return { name: p?.display_name || p?.email || "مجهول", visits: count };
    });
  }, [visits, profiles]);

  // AI engagement over time
  const aiEngagement = useMemo(() => {
    const data: { name: string; محادثات: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const day = d.toDateString();
      const count = aiLogs.filter(l => new Date(l.created_at).toDateString() === day).length;
      data.push({ name: d.toLocaleDateString("ar", { day: "numeric", month: "short" }), محادثات: count });
    }
    return data;
  }, [aiLogs]);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: "نمو أسبوعي", value: `${weeklyGrowth > 0 ? "+" : ""}${weeklyGrowth}%`, good: weeklyGrowth > 0 },
          { icon: Target, label: "معدل الاحتفاظ (7 أيام)", value: `${retentionRate}%`, good: parseFloat(retentionRate) > 50 },
          { icon: TrendingDown, label: "معدل الفقدان (30 يوم)", value: `${churnRate}%`, good: parseFloat(churnRate) < 30 },
          { icon: Activity, label: "متوسط زيارات/مستخدم", value: avgVisitsPerUser, good: true },
        ].map((s, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.good ? "text-emerald-500" : "text-amber-500"}`} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className={`text-2xl font-bold ${s.good ? "text-foreground" : "text-amber-500"}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DAU Chart */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground text-sm flex items-center gap-2"><Users className="w-5 h-5 text-primary" />المستخدمين النشطين يومياً (14 يوم)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dauData}>
              <defs><linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="مستخدمين" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#dauGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Signups */}
        <Card className="border-border/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-foreground text-sm flex items-center gap-2"><UserPlus className="w-5 h-5 text-primary" />التسجيلات الشهرية (6 أشهر)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlySignups}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="تسجيلات" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Engagement */}
        <Card className="border-border/30 bg-card/80">
          <CardHeader>
            <CardTitle className="text-foreground text-sm flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" />تفاعل AI اليومي (14 يوم)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={aiEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="محادثات" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Engaged Users */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground text-sm flex items-center gap-2"><Target className="w-5 h-5 text-primary" />أكثر المستخدمين تفاعلاً</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topEngaged.map((u, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/20">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{i + 1}</span>
                <span className="text-sm text-foreground flex-1">{u.name}</span>
                <Badge variant="secondary" className="text-xs">{u.visits} زيارة</Badge>
                <div className="w-20 h-1.5 bg-secondary/30 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${topEngaged[0]?.visits ? (u.visits / topEngaged[0].visits) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
            {topEngaged.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">لا توجد بيانات</p>}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-border/30 bg-card/80">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "إجمالي المستخدمين", value: profiles.length },
              { label: "نشطاء آخر أسبوع", value: Math.round(profiles.length * parseFloat(retentionRate) / 100) },
              { label: "غير نشطين (30 يوم)", value: churnedUsers },
              { label: "متوسط تفاعل AI/يوم", value: (aiLogs.length / 14).toFixed(1) },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border/20">
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetentionTab;
