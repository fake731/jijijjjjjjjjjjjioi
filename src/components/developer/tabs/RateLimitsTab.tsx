import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleLeft, MessageSquare } from "lucide-react";

const RateLimitsTab = () => {
  const { profiles, aiLogs } = useDeveloper();

  const today = new Date().toDateString();
  const userDailyUsage = (() => {
    const usage: Record<string, { chats: number; name: string; email: string }> = {};
    aiLogs.forEach(log => {
      if (new Date(log.created_at).toDateString() !== today) return;
      const uid = log.user_id;
      if (!uid) return;
      if (!usage[uid]) {
        const profile = profiles.find(p => p.id === uid);
        usage[uid] = { chats: 0, name: profile?.display_name || "—", email: profile?.email || "—" };
      }
      usage[uid].chats++;
    });
    return Object.entries(usage).sort((a, b) => b[1].chats - a[1].chats);
  })();

  return (
    <div className="space-y-6">
      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <ToggleLeft className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">حدود الاستخدام الحالية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/20 text-center">
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground mt-1">محادثات يومياً لكل مستخدم</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/20 text-center">
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-xs text-muted-foreground mt-1">صورة يومياً لكل مستخدم</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/20 text-center">
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-xs text-muted-foreground mt-1">ملف يومياً لكل مستخدم</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">استخدام المحادثات اليوم</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {userDailyUsage.map(([uid, data]) => (
              <div key={uid} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/20">
                <div>
                  <p className="text-sm font-medium text-foreground">{data.name}</p>
                  <p className="text-xs text-muted-foreground" dir="ltr">{data.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={data.chats >= 3 ? "destructive" : "secondary"} className="text-xs">
                    {data.chats}/3 محادثات
                  </Badge>
                </div>
              </div>
            ))}
            {userDailyUsage.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد استخدام اليوم</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RateLimitsTab;
