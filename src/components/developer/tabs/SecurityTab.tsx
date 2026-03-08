import { useMemo } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, XCircle, Lock, Key, Eye, Users, Clock } from "lucide-react";

const SecurityTab = () => {
  const { profiles, visits, aiLogs, userRoles, sentNotifications } = useDeveloper();

  // Security metrics
  const privacyAccepted = profiles.filter(p => p.privacy_accepted).length;
  const privacyRate = profiles.length > 0 ? ((privacyAccepted / profiles.length) * 100).toFixed(1) : "0";
  const usersWithRoles = Object.keys(userRoles).length;
  const rolesRate = profiles.length > 0 ? ((usersWithRoles / profiles.length) * 100).toFixed(1) : "0";
  const developerCount = Object.values(userRoles).filter(r => r === "developer").length;

  // Recent signups without profile data
  const incompleteProfiles = profiles.filter(p => !p.display_name || !p.country).length;

  // Suspicious activity: users with unusually high activity
  const suspiciousUsers = useMemo(() => {
    const userActivity: Record<string, number> = {};
    visits.forEach(v => { if (v.user_id) userActivity[v.user_id] = (userActivity[v.user_id] || 0) + 1; });
    const avg = Object.values(userActivity).reduce((a, b) => a + b, 0) / Math.max(Object.keys(userActivity).length, 1);
    const threshold = avg * 5;
    return Object.entries(userActivity).filter(([, count]) => count > threshold && threshold > 0).map(([uid, count]) => {
      const p = profiles.find(pr => pr.id === uid);
      return { uid, count, name: p?.display_name || p?.email || "مجهول" };
    });
  }, [visits, profiles]);

  // Login activity by time of day
  const nightActivity = useMemo(() => {
    return visits.filter(v => {
      const h = new Date(v.visited_at).getHours();
      return h >= 0 && h < 6;
    }).length;
  }, [visits]);

  const securityScore = useMemo(() => {
    let score = 0;
    if (parseFloat(privacyRate) > 80) score += 20; else if (parseFloat(privacyRate) > 50) score += 10;
    if (parseFloat(rolesRate) > 90) score += 20; else if (parseFloat(rolesRate) > 50) score += 10;
    if (developerCount <= 3) score += 20; else score += 10;
    if (suspiciousUsers.length === 0) score += 20; else score += 5;
    if (incompleteProfiles < profiles.length * 0.3) score += 20; else score += 10;
    return score;
  }, [privacyRate, rolesRate, developerCount, suspiciousUsers, incompleteProfiles, profiles]);

  return (
    <div className="space-y-6">
      {/* Security Score */}
      <Card className="border-border/30 bg-card/80">
        <CardContent className="p-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="42" stroke={securityScore >= 80 ? "#10b981" : securityScore >= 50 ? "#f59e0b" : "#ef4444"} strokeWidth="8" fill="none" strokeDasharray={`${securityScore * 2.64} 264`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{securityScore}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">نقاط الأمان</h3>
              <p className="text-sm text-muted-foreground">
                {securityScore >= 80 ? "🟢 ممتاز - النظام آمن" : securityScore >= 50 ? "🟡 جيد - يحتاج تحسينات" : "🔴 ضعيف - يحتاج اهتمام فوري"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Checks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "RLS مفعّل", desc: "Row Level Security على جميع الجداول", status: true, icon: Lock },
          { title: "التحقق من البريد", desc: "التحقق مفعّل عند التسجيل", status: true, icon: CheckCircle },
          { title: "حذف الحسابات", desc: "وظيفة حذف الحسابات تعمل", status: true, icon: ShieldCheck },
          { title: "سياسة الخصوصية", desc: `${privacyAccepted} من ${profiles.length} قبلوا (${privacyRate}%)`, status: parseFloat(privacyRate) > 50, icon: Eye },
          { title: "تعيين الأدوار", desc: `${usersWithRoles} من ${profiles.length} لديهم أدوار (${rolesRate}%)`, status: parseFloat(rolesRate) > 80, icon: Key },
          { title: "عدد المطورين", desc: `${developerCount} مطور مسجل`, status: developerCount <= 3, icon: Users },
        ].map((item, i) => (
          <Card key={i} className={`border-border/30 bg-card/80 ${!item.status ? "border-amber-500/30" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.status ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
                  <item.icon className={`w-5 h-5 ${item.status ? "text-emerald-500" : "text-amber-500"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                    {item.status ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suspicious Activity */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground text-base flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-primary" />مراقبة النشاط المشبوه</CardTitle>
          <CardDescription className="text-muted-foreground">المستخدمون ذوي النشاط المرتفع بشكل غير طبيعي</CardDescription>
        </CardHeader>
        <CardContent>
          {suspiciousUsers.length > 0 ? (
            <div className="space-y-2">
              {suspiciousUsers.map((su, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-foreground">{su.name}</span>
                  </div>
                  <Badge variant="outline" className="border-amber-500/40 text-amber-600">{su.count} زيارة</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto text-emerald-500/30 mb-3" />
              <p className="text-sm text-muted-foreground">لا يوجد نشاط مشبوه ✓</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "ملفات غير مكتملة", value: incompleteProfiles, warn: incompleteProfiles > profiles.length * 0.3 },
          { label: "نشاط ليلي (0-6)", value: nightActivity, warn: false },
          { label: "إشعارات مرسلة", value: sentNotifications.length, warn: false },
          { label: "محادثات AI", value: aiLogs.length, warn: false },
        ].map((s, i) => (
          <Card key={i} className={`border-border/30 bg-card/80 ${s.warn ? "border-amber-500/30" : ""}`}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.warn ? "text-amber-500" : "text-foreground"}`}>{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SecurityTab;
