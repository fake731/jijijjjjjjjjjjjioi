import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Monitor, Tablet, Globe } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const DeviceAnalyticsTab = () => {
  const { deviceData, browserData, profiles, COLORS, tooltipStyle } = useDeveloper();

  const profileDeviceData = (() => {
    const devices: Record<string, number> = {};
    profiles.forEach(p => {
      const dt = (p as any).device_type || "غير محدد";
      devices[dt] = (devices[dt] || 0) + 1;
    });
    return Object.entries(devices).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
  })();

  const deviceIcon = (type: string) => {
    if (type.includes("موبايل")) return <Smartphone className="w-5 h-5 text-primary" />;
    if (type.includes("تابلت")) return <Tablet className="w-5 h-5 text-primary" />;
    return <Monitor className="w-5 h-5 text-primary" />;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <CardTitle className="text-foreground text-sm">أجهزة المستخدمين (من الملفات الشخصية)</CardTitle>
          </CardHeader>
          <CardContent>
            {profileDeviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={profileDeviceData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {profileDeviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Globe className="w-5 h-5 text-primary" />
            <CardTitle className="text-foreground text-sm">المتصفحات (من الزيارات)</CardTitle>
          </CardHeader>
          <CardContent>
            {browserData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={browserData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>
      </div>

      {/* Device breakdown list */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Monitor className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">تفاصيل الأجهزة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profileDeviceData.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  {deviceIcon(d.name)}
                  <span className="text-sm font-medium text-foreground">{d.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${(d.value / profiles.length) * 100}%` }} />
                  </div>
                  <span className="text-sm font-bold text-foreground w-10 text-left">{d.value}</span>
                  <span className="text-xs text-muted-foreground w-12 text-left">{Math.round((d.value / profiles.length) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceAnalyticsTab;
