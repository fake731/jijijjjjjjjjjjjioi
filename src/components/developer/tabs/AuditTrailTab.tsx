import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, MessageSquare, UserPlus, Bell } from "lucide-react";

const AuditTrailTab = () => {
  const { profiles, visits, aiLogs, sentNotifications } = useDeveloper();

  const timeline = useMemo(() => {
    const events: Array<{ type: string; text: string; time: string; icon: any; color: string }> = [];
    
    profiles.slice(0, 20).forEach(p => {
      events.push({ type: "signup", text: `تسجيل مستخدم جديد: ${p.display_name || p.email}`, time: p.created_at, icon: UserPlus, color: "text-emerald-500" });
    });
    visits.slice(0, 30).forEach(v => {
      events.push({ type: "visit", text: `زيارة صفحة: ${decodeURIComponent(v.page_path)}`, time: v.visited_at, icon: Eye, color: "text-primary" });
    });
    aiLogs.slice(0, 15).forEach(l => {
      events.push({ type: "ai", text: `محادثة AI: ${(l.message || "").slice(0, 50)}...`, time: l.created_at, icon: MessageSquare, color: "text-violet-500" });
    });
    sentNotifications.slice(0, 10).forEach(n => {
      events.push({ type: "notif", text: `إشعار: ${n.title}`, time: n.created_at, icon: Bell, color: "text-amber-500" });
    });

    return events.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 50);
  }, [profiles, visits, aiLogs, sentNotifications]);

  const typeCounts = useMemo(() => ({
    signup: timeline.filter(e => e.type === "signup").length,
    visit: timeline.filter(e => e.type === "visit").length,
    ai: timeline.filter(e => e.type === "ai").length,
    notif: timeline.filter(e => e.type === "notif").length,
  }), [timeline]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "تسجيلات", value: typeCounts.signup, color: "text-emerald-500" },
          { label: "زيارات", value: typeCounts.visit, color: "text-primary" },
          { label: "محادثات AI", value: typeCounts.ai, color: "text-violet-500" },
          { label: "إشعارات", value: typeCounts.notif, color: "text-amber-500" },
        ].map((s, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <FileText className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">سجل الأحداث (آخر 50)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            {timeline.map((event, i) => {
              const Icon = event.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary/20 transition-colors">
                  <div className="mt-0.5">
                    <Icon className={`w-4 h-4 ${event.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{event.text}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(event.time).toLocaleString("ar")}</p>
                  </div>
                  <Badge variant="outline" className="text-[9px] shrink-0">
                    {event.type === "signup" ? "تسجيل" : event.type === "visit" ? "زيارة" : event.type === "ai" ? "AI" : "إشعار"}
                  </Badge>
                </div>
              );
            })}
            {timeline.length === 0 && <p className="text-center text-muted-foreground py-8">لا توجد أحداث</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrailTab;
