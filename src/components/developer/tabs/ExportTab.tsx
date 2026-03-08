import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Eye, MessageSquare, Bell, Globe, Key, Download } from "lucide-react";

const ExportTab = () => {
  const { profiles, visits, aiLogs, sentNotifications, countryData, userRoles, exportCSV } = useDeveloper();

  const items = [
    { title: "تصدير المستخدمين", desc: "جميع بيانات المستخدمين", icon: Users, data: profiles, filename: "users" },
    { title: "تصدير الزيارات", desc: "آخر 500 زيارة", icon: Eye, data: visits.slice(0, 500), filename: "visits" },
    { title: "تصدير محادثات AI", desc: "آخر 500 محادثة", icon: MessageSquare, data: aiLogs.slice(0, 500), filename: "ai-chats" },
    { title: "تصدير الإشعارات", desc: "جميع الإشعارات", icon: Bell, data: sentNotifications, filename: "notifications" },
    { title: "تصدير البلدان", desc: "إحصائيات البلدان", icon: Globe, data: countryData.map(c => ({ country: c.name, users: c.count })), filename: "countries" },
    { title: "تصدير الأدوار", desc: "جميع أدوار المستخدمين", icon: Key, data: Object.entries(userRoles).map(([uid, role]) => ({ user_id: uid, role, email: profiles.find(p => p.id === uid)?.email || "" })), filename: "roles" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <Card key={i} className="border-border/30 bg-card/80 hover:border-primary/30 transition-colors cursor-pointer group" onClick={() => exportCSV(item.data, item.filename)}>
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto group-hover:bg-primary/25 transition-colors"><item.icon className="w-6 h-6 text-primary" /></div>
            <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
            <Badge variant="secondary" className="text-xs">{item.data.length} سجل</Badge>
            <Button size="sm" variant="outline" className="w-full gap-2 mt-2"><Download className="w-4 h-4" />تحميل CSV</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExportTab;
