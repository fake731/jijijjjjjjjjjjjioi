import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, TrendingDown, Star, Clock } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const UserSegmentsTab = () => {
  const { profiles, visits, aiLogs, COLORS, tooltipStyle } = useDeveloper();

  const segments = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400000;
    const monthAgo = Date.now() - 30 * 86400000;
    
    const recentVisitors = new Set(visits.filter(v => new Date(v.visited_at).getTime() > weekAgo).map(v => v.user_id).filter(Boolean));
    const monthVisitors = new Set(visits.filter(v => new Date(v.visited_at).getTime() > monthAgo).map(v => v.user_id).filter(Boolean));
    const aiUsers = new Set(aiLogs.map(l => l.user_id).filter(Boolean));
    
    // Power users: visited this week AND used AI
    const powerUsers = profiles.filter(p => recentVisitors.has(p.id) && aiUsers.has(p.id));
    // Active: visited this week
    const active = profiles.filter(p => recentVisitors.has(p.id) && !aiUsers.has(p.id));
    // Returning: visited this month but not this week
    const returning = profiles.filter(p => monthVisitors.has(p.id) && !recentVisitors.has(p.id));
    // Dormant: no visit in 30 days
    const dormant = profiles.filter(p => !monthVisitors.has(p.id));
    // New: registered in last 7 days
    const newUsers = profiles.filter(p => p.created_at && (Date.now() - new Date(p.created_at).getTime()) < 7 * 86400000);

    return [
      { name: "مستخدمون أقوياء", count: powerUsers.length, icon: Star, color: "text-amber-500", bgColor: "bg-amber-500/10", users: powerUsers },
      { name: "نشطون", count: active.length, icon: TrendingUp, color: "text-emerald-500", bgColor: "bg-emerald-500/10", users: active },
      { name: "عائدون", count: returning.length, icon: Clock, color: "text-primary", bgColor: "bg-primary/10", users: returning },
      { name: "خاملون", count: dormant.length, icon: TrendingDown, color: "text-muted-foreground", bgColor: "bg-muted/30", users: dormant },
      { name: "جدد (7 أيام)", count: newUsers.length, icon: Users, color: "text-violet-500", bgColor: "bg-violet-500/10", users: newUsers },
    ];
  }, [profiles, visits, aiLogs]);

  const chartData = segments.map(s => ({ name: s.name, value: s.count }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {segments.map((seg, i) => {
          const Icon = seg.icon;
          return (
            <Card key={i} className="border-border/30 bg-card/80">
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 rounded-xl ${seg.bgColor} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className={`w-5 h-5 ${seg.color}`} />
                </div>
                <p className="text-xl font-bold text-foreground">{seg.count}</p>
                <p className="text-[10px] text-muted-foreground">{seg.name}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader><CardTitle className="text-foreground text-sm flex items-center gap-2"><Users className="w-5 h-5 text-primary" />توزيع الشرائح</CardTitle></CardHeader>
          <CardContent>
            {chartData.some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-center text-muted-foreground py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/80">
          <CardHeader><CardTitle className="text-foreground text-sm">تفاصيل الشرائح</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {segments.map((seg, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${seg.color}`}>{seg.name}</span>
                    <Badge variant="secondary" className="text-xs">{seg.count} ({profiles.length > 0 ? Math.round((seg.count / profiles.length) * 100) : 0}%)</Badge>
                  </div>
                  <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${profiles.length > 0 ? (seg.count / profiles.length) * 100 : 0}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSegmentsTab;
