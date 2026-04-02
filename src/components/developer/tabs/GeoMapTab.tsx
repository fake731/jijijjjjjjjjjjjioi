import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Globe, Users } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const GeoMapTab = () => {
  const { countryChartData, countryData, profiles, COLORS, tooltipStyle } = useDeveloper();

  const cityData = (() => {
    const cities: Record<string, number> = {};
    profiles.forEach(p => {
      const city = p.city || "غير محدد";
      cities[city] = (cities[city] || 0) + 1;
    });
    return Object.entries(cities).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([name, value]) => ({ name, value }));
  })();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Globe className="w-5 h-5 text-primary" />
            <CardTitle className="text-foreground text-sm">توزيع المستخدمين حسب البلد</CardTitle>
          </CardHeader>
          <CardContent>
            {countryChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={countryChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {countryChartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Map className="w-5 h-5 text-primary" />
            <CardTitle className="text-foreground text-sm">المدن</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {cityData.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border/20">
                  <span className="text-sm text-foreground">{c.name}</span>
                  <Badge variant="secondary" className="text-xs">{c.value}</Badge>
                </div>
              ))}
              {cityData.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">لا توجد بيانات</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Country breakdown */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Users className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">تفاصيل البلدان</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {countryData.map((c: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/20 border border-border/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{c.name}</span>
                  <Badge className="bg-primary/20 text-primary text-xs">{c.count} مستخدم</Badge>
                </div>
                <div className="w-full h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary/60" style={{ width: `${(c.count / profiles.length) * 100}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{Math.round((c.count / profiles.length) * 100)}% من الإجمالي</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeoMapTab;
