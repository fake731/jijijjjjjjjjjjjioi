import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Monitor, Smartphone, Tablet } from "lucide-react";

const LoginHistoryTab = () => {
  const { profiles } = useDeveloper();

  // Show profiles sorted by last activity (updated_at)
  const sortedByActivity = [...profiles]
    .filter(p => p.updated_at)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 50);

  const deviceIcon = (type: string | null) => {
    if (!type) return <Monitor className="w-4 h-4" />;
    if (type.includes("موبايل")) return <Smartphone className="w-4 h-4" />;
    if (type.includes("تابلت")) return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const timeSince = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "الآن";
    if (mins < 60) return `منذ ${mins} دقيقة`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    return `منذ ${days} يوم`;
  };

  return (
    <Card className="border-border/30 bg-card/80">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Clock className="w-5 h-5 text-primary" />
        <CardTitle className="text-foreground text-sm">آخر نشاط للمستخدمين</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {sortedByActivity.map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/20 hover:border-border/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">{(p.display_name || "?")[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.display_name || "بدون اسم"}</p>
                  <p className="text-xs text-muted-foreground" dir="ltr">{p.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  {deviceIcon((p as any).device_type)}
                  <span className="text-xs">{(p as any).device_type || "—"}</span>
                </div>
                {p.country && <Badge variant="outline" className="text-[10px]">{p.country}</Badge>}
                <span className="text-xs text-muted-foreground">{timeSince(p.updated_at)}</span>
              </div>
            </div>
          ))}
          {sortedByActivity.length === 0 && <p className="text-center text-muted-foreground py-8">لا توجد بيانات</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginHistoryTab;
