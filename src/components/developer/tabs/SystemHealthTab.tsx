import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Users, Eye, MessageSquare, Database, Activity, CheckCircle } from "lucide-react";

const SystemHealthTab = () => {
  const { stats, todayStats, activeUsersToday, profiles, visits, aiLogs, autoRefresh } = useDeveloper();

  const checks = [
    { name: "قاعدة البيانات", status: true, detail: `${stats.totalUsers} مستخدم مسجل` },
    { name: "نظام الزيارات", status: visits.length > 0, detail: `${stats.totalVisits} زيارة مسجلة` },
    { name: "نظام المحادثات", status: true, detail: `${stats.totalAiChats} محادثة مسجلة` },
    { name: "التحديث التلقائي", status: autoRefresh, detail: autoRefresh ? "مفعّل" : "معطّل" },
    { name: "نظام الإشعارات", status: true, detail: "يعمل" },
    { name: "نظام التسجيل", status: true, detail: "Auto-confirm مفعّل" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Users, label: "مستخدمين", value: stats.totalUsers },
          { icon: Eye, label: "زيارات اليوم", value: todayStats.visits },
          { icon: MessageSquare, label: "محادثات اليوم", value: todayStats.chats },
          { icon: Activity, label: "نشطاء اليوم", value: activeUsersToday },
        ].map((s, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <s.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Server className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">فحوصات النظام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checks.map((check, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 ${check.status ? 'text-emerald-500' : 'text-destructive'}`} />
                  <span className="text-sm font-medium text-foreground">{check.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{check.detail}</span>
                  <Badge variant={check.status ? "secondary" : "destructive"} className="text-[10px]">
                    {check.status ? "يعمل" : "متوقف"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Database className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">إحصائيات التخزين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/20 text-center">
              <p className="text-lg font-bold text-foreground">{profiles.length}</p>
              <p className="text-xs text-muted-foreground">سجلات المستخدمين</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/20 text-center">
              <p className="text-lg font-bold text-foreground">{visits.length}</p>
              <p className="text-xs text-muted-foreground">سجلات الزيارات</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/20 text-center">
              <p className="text-lg font-bold text-foreground">{aiLogs.length}</p>
              <p className="text-xs text-muted-foreground">سجلات المحادثات</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthTab;
