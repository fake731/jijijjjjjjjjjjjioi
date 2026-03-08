import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, MessageSquare, Globe, UserPlus, Activity, TrendingUp, BarChart3, type LucideIcon } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const OverviewTab = () => {
  const {
    stats, todayStats, weeklyGrowth, avgSessionPages, activeUsersToday,
    dailyVisitsData, dailyAiData, dailySignups, topPagesData, ageData,
    countryChartData, deviceData, browserData, hourlyData,
    COLORS, tooltipStyle,
  } = useDeveloper();

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {([
          { icon: Users, label: "إجمالي المستخدمين", value: stats.totalUsers },
          { icon: Eye, label: "إجمالي الزيارات", value: stats.totalVisits },
          { icon: MessageSquare, label: "محادثات AI", value: stats.totalAiChats },
          { icon: Globe, label: "الدول", value: countryChartData.length },
          { icon: UserPlus, label: "تسجيلات اليوم", value: todayStats.signups },
          { icon: Activity, label: "نشطاء اليوم", value: activeUsersToday },
        ] as { icon: LucideIcon; label: string; value: number }[]).map((stat, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center"><stat.icon className="w-5 h-5 text-primary" /></div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "زيارات اليوم", value: todayStats.visits },
          { label: "محادثات اليوم", value: todayStats.chats },
          { label: "نمو أسبوعي", value: `${weeklyGrowth > 0 ? "+" : ""}${weeklyGrowth}%` },
          { label: "متوسط صفحات/مستخدم", value: avgSessionPages },
        ].map((s, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2"><TrendingUp className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-sm">الزيارات اليومية (7 أيام)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={dailyVisitsData}>
                <defs><linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
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
          <CardHeader className="flex flex-row items-center gap-2 pb-2"><MessageSquare className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-sm">محادثات AI اليومية</CardTitle></CardHeader>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2"><UserPlus className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-sm">التسجيلات اليومية</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailySignups}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="تسجيلات" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2"><Users className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-sm">الفئات العمرية</CardTitle></CardHeader>
          <CardContent>
            {ageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart><Pie data={ageData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>{ageData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2"><BarChart3 className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-sm">أعلى 10 صفحات</CardTitle></CardHeader>
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

      {/* Activity Heatmap (hourly) */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2"><Activity className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-sm">خريطة النشاط حسب الساعة</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-12 gap-1">
            {hourlyData.map((h, i) => {
              const max = Math.max(...hourlyData.map(x => x.نشاط), 1);
              const intensity = h.نشاط / max;
              return (
                <div key={i} className="text-center" title={`${h.name}: ${h.نشاط} نشاط`}>
                  <div className="w-full aspect-square rounded-md transition-colors" style={{ backgroundColor: `hsl(var(--primary) / ${0.1 + intensity * 0.8})` }} />
                  <span className="text-[8px] text-muted-foreground">{i}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-3 justify-center">
            <span className="text-[10px] text-muted-foreground">أقل</span>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((v, i) => (
              <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: `hsl(var(--primary) / ${v})` }} />
            ))}
            <span className="text-[10px] text-muted-foreground">أكثر</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
