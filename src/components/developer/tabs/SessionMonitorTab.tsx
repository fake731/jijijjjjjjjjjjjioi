import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Clock, Eye, Users } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const SessionMonitorTab = () => {
  const { profiles, visits, tooltipStyle } = useDeveloper();

  // Active in last 15 min
  const activeNow = useMemo(() => {
    const fifteenMinsAgo = Date.now() - 15 * 60000;
    const activeIds = new Set(visits.filter(v => new Date(v.visited_at).getTime() > fifteenMinsAgo).map(v => v.user_id).filter(Boolean));
    return profiles.filter(p => activeIds.has(p.id));
  }, [visits, profiles]);

  // Sessions per hour (last 24h)
  const hourlySessionData = useMemo(() => {
    const data: { name: string; جلسات: number }[] = [];
    for (let i = 23; i >= 0; i--) {
      const d = new Date();
      d.setHours(d.getHours() - i);
      const hour = d.getHours();
      const count = new Set(visits.filter(v => {
        const vd = new Date(v.visited_at);
        return vd.getHours() === hour && (Date.now() - vd.getTime()) < 86400000;
      }).map(v => v.user_id).filter(Boolean)).size;
      data.push({ name: `${hour}:00`, جلسات: count });
    }
    return data;
  }, [visits]);

  // Avg pages per session
  const avgPages = useMemo(() => {
    const userVisits: Record<string, number> = {};
    visits.forEach(v => { if (v.user_id) userVisits[v.user_id] = (userVisits[v.user_id] || 0) + 1; });
    const vals = Object.values(userVisits);
    return vals.length > 0 ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "0";
  }, [visits]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Users, label: "نشطون الآن", value: activeNow.length },
          { icon: Eye, label: "جلسات اليوم", value: new Set(visits.filter(v => new Date(v.visited_at).toDateString() === new Date().toDateString()).map(v => v.user_id).filter(Boolean)).size },
          { icon: Monitor, label: "متوسط صفحات/جلسة", value: avgPages },
          { icon: Clock, label: "آخر 15 دقيقة", value: activeNow.length },
        ].map((s, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Monitor className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">الجلسات حسب الساعة (24 ساعة)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlySessionData}>
              <defs><linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} interval={3} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="جلسات" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#sessGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Users className="w-5 h-5 text-emerald-500" />
          <CardTitle className="text-foreground text-sm">المستخدمين النشطين الآن ({activeNow.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {activeNow.length > 0 ? (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {activeNow.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">{(p.display_name || "?")[0]}</span>
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.display_name || "بدون اسم"}</p>
                      <p className="text-xs text-muted-foreground" dir="ltr">{p.email}</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 text-[10px]">متصل</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمين نشطين حالياً</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionMonitorTab;
