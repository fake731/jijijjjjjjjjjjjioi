import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Flag } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const CountriesTab = () => {
  const { countryData, countryChartData, profiles, COLORS, tooltipStyle } = useDeveloper();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="flex flex-row items-center gap-2"><Globe className="w-5 h-5 text-primary" /><CardTitle className="text-foreground text-base">توزيع حسب البلد</CardTitle></CardHeader>
          <CardContent>
            {countryChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart><Pie data={countryChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value, percent }) => `${name} (${value} - ${(percent * 100).toFixed(0)}%)`}>{countryChartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardHeader><CardTitle className="text-foreground text-base">إحصائيات البلدان</CardTitle></CardHeader>
          <CardContent>
            {countryChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={countryChartData} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} /><XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} /><YAxis type="category" dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={80} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} /></BarChart>
              </ResponsiveContainer>
            ) : <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader><CardTitle className="text-foreground text-base flex items-center gap-2"><Flag className="w-5 h-5 text-primary" />جدول البلدان ({countryData.length} بلد)</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/30 bg-secondary/20">
                <th className="text-right p-3 text-muted-foreground font-medium">#</th>
                <th className="text-right p-3 text-muted-foreground font-medium">البلد</th>
                <th className="text-right p-3 text-muted-foreground font-medium">العدد</th>
                <th className="text-right p-3 text-muted-foreground font-medium">النسبة</th>
                <th className="text-right p-3 text-muted-foreground font-medium">المدن</th>
              </tr></thead>
              <tbody>
                {countryData.map((country, i) => {
                  const cities = [...new Set(country.users.map((u: any) => u.city).filter(Boolean))];
                  const percentage = ((country.count / profiles.length) * 100).toFixed(1);
                  return (
                    <tr key={country.name} className="border-b border-border/10 hover:bg-secondary/20">
                      <td className="p-3 text-muted-foreground font-bold">{i + 1}</td>
                      <td className="p-3"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} /><span className="text-foreground font-medium">{country.name}</span></div></td>
                      <td className="p-3"><Badge variant="secondary">{country.count}</Badge></td>
                      <td className="p-3"><div className="flex items-center gap-2"><div className="h-2 bg-secondary/30 rounded-full overflow-hidden w-20"><div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: COLORS[i % COLORS.length] }} /></div><span className="text-xs text-muted-foreground">{percentage}%</span></div></td>
                      <td className="p-3"><div className="flex flex-wrap gap-1">{cities.length > 0 ? cities.map((city: string) => <Badge key={city} variant="outline" className="text-[10px]">{city}</Badge>) : <span className="text-xs text-muted-foreground">—</span>}</div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountriesTab;
