import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, Clock, Settings, Users, Eye, MessageSquare, UserPlus, Activity, TrendingUp, Zap, Monitor, Wifi, type LucideIcon } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const RealtimeTab = () => {
  const {
    autoRefresh, setAutoRefresh, lastRefreshTime, countdown, setCountdown,
    totalIntervalMs, totalIntervalSec, refreshing, fetchAllData,
    refreshIntervalDays, setRefreshIntervalDays, refreshIntervalHours, setRefreshIntervalHours,
    refreshIntervalMinutes, setRefreshIntervalMinutes, refreshIntervalSeconds, setRefreshIntervalSeconds,
    stats, todayStats, hourlyData, dailyVisitsData, liveEvents, setLiveEvents,
    eventFilter, setEventFilter, deviceData, browserData, COLORS, tooltipStyle,
  } = useDeveloper();

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="border-primary/30 bg-card/80">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${autoRefresh ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"}`} />
              <span className="text-sm font-medium text-foreground">{autoRefresh ? "التحديث التلقائي مفعّل" : "التحديث التلقائي متوقف"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">آخر تحديث: {lastRefreshTime.toLocaleTimeString("ar")}</span>
              <Switch checked={autoRefresh} onCheckedChange={(v) => { setAutoRefresh(v); if (v) setCountdown(totalIntervalSec); }} />
              <Button size="sm" variant="outline" onClick={() => { fetchAllData(); setCountdown(totalIntervalSec); }} disabled={refreshing} className="gap-1">
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />تحديث يدوي
              </Button>
            </div>
          </div>

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
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${totalIntervalSec > 0 ? ((totalIntervalSec - countdown) / totalIntervalSec) * 100 : 0}%` }} />
              </div>
            </div>
          )}

          <div className="p-3 rounded-lg border border-border bg-muted/30 space-y-3">
            <div className="flex items-center gap-2"><Settings className="w-4 h-4 text-muted-foreground" /><span className="text-xs font-medium text-foreground">تخصيص فترة التحديث</span></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "أيام", value: refreshIntervalDays, set: setRefreshIntervalDays, max: 30 },
                { label: "ساعات", value: refreshIntervalHours, set: setRefreshIntervalHours, max: 23 },
                { label: "دقائق", value: refreshIntervalMinutes, set: setRefreshIntervalMinutes, max: 59 },
                { label: "ثواني", value: refreshIntervalSeconds, set: setRefreshIntervalSeconds, max: 59 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <label className="text-[10px] text-muted-foreground">{item.label}</label>
                  <Input type="number" min={0} max={item.max} value={item.value} onChange={e => item.set(Math.max(0, Math.min(item.max, parseInt(e.target.value) || 0)))} className="h-8 text-sm text-center" />
                </div>
              ))}
            </div>
            {totalIntervalMs < 1000 && <p className="text-[10px] text-destructive">⚠️ الحد الأدنى ثانية واحدة</p>}
          </div>
        </CardContent>
      </Card>

      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {([
          { icon: Users, label: "المستخدمين", value: stats.totalUsers },
          { icon: Eye, label: "زيارات اليوم", value: todayStats.visits },
          { icon: MessageSquare, label: "محادثات اليوم", value: todayStats.chats },
          { icon: UserPlus, label: "تسجيلات اليوم", value: todayStats.signups },
        ] as { icon: LucideIcon; label: string; value: number }[]).map((stat, i) => (
          <Card key={i} className="border-border/30 bg-card/80 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary/40" />
            <CardContent className="p-5 text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle className="text-foreground text-sm">النشاط حسب الساعة</CardTitle>
            {autoRefresh && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={hourlyData}>
                <defs><linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
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
            <CardTitle className="text-foreground text-sm">الزيارات اليومية</CardTitle>
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

      {/* Live Events */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />الأحداث المباشرة
              {autoRefresh && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">{liveEvents.length} حدث</Badge>
              <div className="flex items-center gap-0.5 border border-border/30 rounded-lg p-0.5">
                {(["all", "visit", "signup", "ai"] as const).map(f => (
                  <button key={f} onClick={() => setEventFilter(f)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${eventFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>
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
                </div>
              );
              return filtered.map((event, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/10">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${event.type === "signup" ? "bg-emerald-500/15" : event.type === "visit" ? "bg-primary/15" : "bg-violet-500/15"}`}>
                    {event.type === "signup" ? <UserPlus className="w-4 h-4 text-emerald-500" /> : event.type === "visit" ? <Eye className="w-4 h-4 text-primary" /> : <MessageSquare className="w-4 h-4 text-violet-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{event.text}</p>
                    <p className="text-[10px] text-muted-foreground">{event.time.toLocaleTimeString("ar")}</p>
                  </div>
                  <Badge variant="outline" className="text-[9px] shrink-0">{event.type === "signup" ? "تسجيل" : event.type === "visit" ? "زيارة" : "AI"}</Badge>
                </div>
              ));
            })()}
          </div>
        </CardContent>
      </Card>

      {/* Devices & Browsers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2"><Monitor className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-sm">الأجهزة</CardTitle></CardHeader>
          <CardContent>
            {deviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart><Pie data={deviceData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>{deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2"><Wifi className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-sm">المتصفحات</CardTitle></CardHeader>
          <CardContent>
            {browserData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart><Pie data={browserData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>{browserData.map((_, i) => <Cell key={i} fill={COLORS[(i + 3) % COLORS.length]} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealtimeTab;
