import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserX, Clock, Shield } from "lucide-react";

const BannedUsersTab = () => {
  const { profiles, visits } = useDeveloper();

  // Users inactive for 60+ days could be flagged
  const inactiveUsers = useMemo(() => {
    const sixtyDaysAgo = Date.now() - 60 * 86400000;
    const recentVisitors = new Set(
      visits.filter(v => new Date(v.visited_at).getTime() > sixtyDaysAgo).map(v => v.user_id).filter(Boolean)
    );
    return profiles.filter(p => !recentVisitors.has(p.id));
  }, [profiles, visits]);

  return (
    <div className="space-y-6">
      <Card className="border-border/30 bg-card/80">
        <CardContent className="p-6 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-foreground">لا يوجد مستخدمين محظورين</h3>
          <p className="text-sm text-muted-foreground">جميع المستخدمين في حالة نشطة</p>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <UserX className="w-5 h-5 text-amber-500" />
          <CardTitle className="text-foreground text-sm">مستخدمون غير نشطين (60+ يوم)</CardTitle>
          <Badge variant="secondary" className="text-xs">{inactiveUsers.length}</Badge>
        </CardHeader>
        <CardContent>
          {inactiveUsers.length > 0 ? (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {inactiveUsers.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center">
                      <span className="text-amber-500 font-bold text-xs">{(p.display_name || "?")[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.display_name || "بدون اسم"}</p>
                      <p className="text-xs text-muted-foreground" dir="ltr">{p.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>آخر نشاط: {p.updated_at ? new Date(p.updated_at).toLocaleDateString("ar") : "غير معروف"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">جميع المستخدمين نشطون</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BannedUsersTab;
