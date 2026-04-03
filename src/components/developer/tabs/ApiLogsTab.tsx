import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Activity, MessageSquare, Eye, UserPlus } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const ApiLogsTab = () => {
  const { visits, aiLogs, profiles, tooltipStyle } = useDeveloper();

  const apiCallsData = useMemo(() => {
    const data: { name: string; طلبات: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const day = d.toDateString();
      const visitCalls = visits.filter(v => new Date(v.visited_at).toDateString() === day).length;
      const aiCalls = aiLogs.filter(l => new Date(l.created_at).toDateString() === day).length;
      data.push({ name: d.toLocaleDateString("ar", { weekday: "short", day: "numeric" }), طلبات: visitCalls + aiCalls });
    }
    return data;
  }, [visits, aiLogs]);

  const totalCalls = visits.length + aiLogs.length + profiles.length;

  const endpoints = [
    { name: "page_visits (INSERT)", count: visits.length, icon: Eye },
    { name: "ai_chat_logs (INSERT)", count: aiLogs.length, icon: MessageSquare },
    { name: "profiles (SELECT/UPDATE)", count: profiles.length, icon: UserPlus },
  ].sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "إجمالي العمليات", value: totalCalls },
          { label: "عمليات الزيارات", value: visits.length },
          { label: "عمليات AI", value: aiLogs.length },
          { label: "عمليات الملفات", value: profiles.length },
        ].map((s, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Activity className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">عمليات قاعدة البيانات (7 أيام)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={apiCallsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="طلبات" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Database className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">العمليات حسب الجدول</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {endpoints.map((ep, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  <ep.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground" dir="ltr">{ep.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${totalCalls > 0 ? (ep.count / totalCalls) * 100 : 0}%` }} />
                  </div>
                  <Badge variant="secondary" className="text-xs">{ep.count}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiLogsTab;
