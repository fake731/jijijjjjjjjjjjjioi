import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Database, Users, Eye, MessageSquare, Bell, Key } from "lucide-react";

const BackupRestoreTab = () => {
  const { profiles, visits, aiLogs, sentNotifications, userRoles, exportCSV, countryData } = useDeveloper();

  const backupAll = () => {
    exportCSV(profiles, "backup-profiles");
    setTimeout(() => exportCSV(visits.slice(0, 500), "backup-visits"), 500);
    setTimeout(() => exportCSV(aiLogs.slice(0, 500), "backup-ai-logs"), 1000);
    setTimeout(() => exportCSV(sentNotifications, "backup-notifications"), 1500);
  };

  const items = [
    { title: "المستخدمين", icon: Users, count: profiles.length, data: profiles, filename: "backup-profiles" },
    { title: "الزيارات", icon: Eye, count: visits.length, data: visits.slice(0, 500), filename: "backup-visits" },
    { title: "محادثات AI", icon: MessageSquare, count: aiLogs.length, data: aiLogs.slice(0, 500), filename: "backup-ai-logs" },
    { title: "الإشعارات", icon: Bell, count: sentNotifications.length, data: sentNotifications, filename: "backup-notifications" },
    { title: "الأدوار", icon: Key, count: Object.keys(userRoles).length, data: Object.entries(userRoles).map(([uid, role]) => ({ user_id: uid, role })), filename: "backup-roles" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-card/80">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">النسخ الاحتياطي</h3>
                <p className="text-sm text-muted-foreground">تصدير جميع البيانات كملفات CSV</p>
              </div>
            </div>
            <Button onClick={backupAll} className="gap-2">
              <Download className="w-4 h-4" />
              نسخ احتياطي شامل
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <Card key={i} className="border-border/30 bg-card/80 hover:border-primary/30 transition-colors">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  <Badge variant="secondary" className="text-[10px]">{item.count} سجل</Badge>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full gap-2" onClick={() => exportCSV(item.data, item.filename)}>
                <Download className="w-3.5 h-3.5" />تحميل CSV
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BackupRestoreTab;
