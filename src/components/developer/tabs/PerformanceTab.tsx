import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Users, Clock } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const PerformanceTab = () => {
  const { dailyVisitsData, dailyAiData, dailySignups, weeklyGrowth, avgSessionPages, activeUsersToday, tooltipStyle } = useDeveloper();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "نمو أسبوعي", value: `${weeklyGrowth > 0 ? "+" : ""}${weeklyGrowth}%`, icon: TrendingUp },
          { label: "متوسط صفحات/مستخدم", value: avgSessionPages, icon: Activity },
          { label: "نشطاء اليوم", value: activeUsersToday, icon: Users },
          { label: "وقت التحديث", value: "30s", icon: Clock },
        ].map((s, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle className="text-foreground text-sm">الزيارات (7 أيام)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailyVisitsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="زيارات" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle className="text-foreground text-sm">التسجيلات (7 أيام)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailySignups}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="تسجيلات" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceTab;
