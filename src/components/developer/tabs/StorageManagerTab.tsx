import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Image, Users, MessageSquare, Eye, Bell } from "lucide-react";

const StorageManagerTab = () => {
  const { profiles, visits, aiLogs, sentNotifications } = useDeveloper();

  const tables = [
    { name: "profiles", icon: Users, rows: profiles.length, desc: "بيانات المستخدمين" },
    { name: "page_visits", icon: Eye, rows: visits.length, desc: "سجلات الزيارات" },
    { name: "ai_chat_logs", icon: MessageSquare, rows: aiLogs.length, desc: "محادثات الذكاء الاصطناعي" },
    { name: "notifications", icon: Bell, rows: sentNotifications.length, desc: "الإشعارات" },
  ];

  const totalRows = tables.reduce((sum, t) => sum + t.rows, 0);

  const buckets = [
    { name: "avatars", public: true, desc: "صور المستخدمين الشخصية" },
    { name: "ai-chat-images", public: true, desc: "صور محادثات AI" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Database className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{tables.length}</p>
            <p className="text-[10px] text-muted-foreground">جداول</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Database className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{totalRows}</p>
            <p className="text-[10px] text-muted-foreground">إجمالي السجلات</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Image className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{buckets.length}</p>
            <p className="text-[10px] text-muted-foreground">حاويات تخزين</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Database className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">🟢</p>
            <p className="text-[10px] text-muted-foreground">حالة التخزين</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader><CardTitle className="text-foreground text-sm flex items-center gap-2"><Database className="w-5 h-5 text-primary" />الجداول</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tables.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <t.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground" dir="ltr">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-2 bg-secondary/30 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${totalRows > 0 ? (t.rows / totalRows) * 100 : 0}%` }} />
                  </div>
                  <Badge variant="secondary" className="text-xs">{t.rows} سجل</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader><CardTitle className="text-foreground text-sm flex items-center gap-2"><Image className="w-5 h-5 text-primary" />حاويات التخزين</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {buckets.map((b, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Image className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground" dir="ltr">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
                <Badge variant={b.public ? "default" : "secondary"} className="text-xs">{b.public ? "عام" : "خاص"}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageManagerTab;
