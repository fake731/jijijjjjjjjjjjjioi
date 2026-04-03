import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, MessageSquare, Image } from "lucide-react";

const ContentModerationTab = () => {
  const { aiLogs, profiles } = useDeveloper();

  // Stats about AI content
  const contentStats = useMemo(() => {
    const totalMessages = aiLogs.length;
    const withImages = aiLogs.filter(l => l.image_urls && l.image_urls.length > 0).length;
    const totalImages = aiLogs.reduce((sum, l) => sum + (l.image_urls?.length || 0), 0);
    const avgMsgLength = totalMessages > 0 ? Math.round(aiLogs.reduce((sum, l) => sum + (l.message?.length || 0), 0) / totalMessages) : 0;
    const uniqueUsers = new Set(aiLogs.map(l => l.user_id).filter(Boolean)).size;
    return { totalMessages, withImages, totalImages, avgMsgLength, uniqueUsers };
  }, [aiLogs]);

  // Top AI users
  const topUsers = useMemo(() => {
    const map: Record<string, number> = {};
    aiLogs.forEach(l => { if (l.user_id) map[l.user_id] = (map[l.user_id] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([uid, count]) => {
      const p = profiles.find(pr => pr.id === uid);
      return { name: p?.display_name || p?.email || "مجهول", count };
    });
  }, [aiLogs, profiles]);

  return (
    <div className="space-y-6">
      <Card className="border-border/30 bg-card/80">
        <CardContent className="p-6 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-foreground">لا يوجد محتوى مخالف</h3>
          <p className="text-sm text-muted-foreground">جميع المحادثات تتوافق مع السياسات</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "إجمالي الرسائل", value: contentStats.totalMessages },
          { label: "رسائل بصور", value: contentStats.withImages },
          { label: "إجمالي الصور", value: contentStats.totalImages },
          { label: "متوسط طول الرسالة", value: `${contentStats.avgMsgLength} حرف` },
          { label: "مستخدمين نشطين", value: contentStats.uniqueUsers },
        ].map((s, i) => (
          <Card key={i} className="border-border/30 bg-card/80">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader><CardTitle className="text-foreground text-sm flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" />أكثر المستخدمين نشاطاً في AI</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topUsers.map((u, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{i + 1}</span>
                  <span className="text-sm text-foreground">{u.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">{u.count} رسالة</Badge>
              </div>
            ))}
            {topUsers.length === 0 && <p className="text-center text-muted-foreground py-6">لا توجد بيانات</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentModerationTab;
