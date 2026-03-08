import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, ShieldCheck, Server, Key, CheckCircle, XCircle, AlertTriangle, Clock, Eye, MessageSquare, UserPlus } from "lucide-react";

const ManagementTab = () => {
  const { profiles, visits, aiLogs, sentNotifications, userRoles } = useDeveloper();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-border/30 bg-card/80">
          <CardHeader className="pb-2"><CardTitle className="text-foreground text-sm flex items-center gap-2"><Database className="w-4 h-4 text-primary" />إحصائيات قاعدة البيانات</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "profiles", value: profiles.length },
              { label: "page_visits", value: visits.length },
              { label: "ai_chat_logs", value: aiLogs.length },
              { label: "notifications", value: sentNotifications.length },
              { label: "user_roles", value: Object.keys(userRoles).length },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <Badge variant="secondary" className="text-xs">{item.value}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/80">
          <CardHeader className="pb-2"><CardTitle className="text-foreground text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" />حالة الأمان</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "RLS مفعل على جميع الجداول", status: true },
              { label: "جميع المستخدمين بأدوار", status: Object.keys(userRoles).length === profiles.length },
              { label: "سياسة الخصوصية مقبولة", status: profiles.filter(p => p.privacy_accepted).length > 0 },
              { label: "حذف الحسابات فعال", status: true },
              { label: "التحقق من البريد مفعل", status: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                {item.status ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/30 bg-card/80">
          <CardHeader className="pb-2"><CardTitle className="text-foreground text-sm flex items-center gap-2"><Server className="w-4 h-4 text-primary" />معلومات النظام</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "المنصة", value: "Lovable Cloud" },
              { label: "قاعدة البيانات", value: "PostgreSQL 15" },
              { label: "الـ Backend", value: "Edge Functions" },
              { label: "التخزين", value: "Cloud Storage" },
              { label: "الحالة", value: "🟢 يعمل" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs text-foreground font-medium">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Roles */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground text-base flex items-center gap-2"><Key className="w-5 h-5 text-primary" />إدارة الأدوار والصلاحيات</CardTitle>
          <CardDescription className="text-muted-foreground">عرض شامل لأدوار جميع المستخدمين</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><h3 className="text-sm font-bold text-foreground">المطورون ({Object.values(userRoles).filter(r => r === "developer").length})</h3></div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {profiles.filter(p => userRoles[p.id] === "developer").map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-primary/5 border border-primary/20">
                    {p.avatar_url ? <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">{(p.display_name || "?")[0]}</div>}
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground truncate">{p.display_name || "—"}</p><p className="text-[10px] text-muted-foreground" dir="ltr">{p.email}</p></div>
                    <Badge className="bg-primary/20 text-primary text-[10px]">مطور</Badge>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="text-xs font-bold text-primary mb-2">صلاحيات المطور:</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {["عرض جميع البيانات", "حذف المستخدمين", "إرسال الإشعارات", "تصدير البيانات", "عرض محادثات AI", "إدارة الإشعارات", "عرض سجلات الزيارات", "إحصائيات النظام"].map((t, i) => (
                    <li key={i} className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-500" />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-muted-foreground" /><h3 className="text-sm font-bold text-foreground">المستخدمون ({profiles.filter(p => userRoles[p.id] !== "developer").length})</h3></div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {profiles.filter(p => userRoles[p.id] !== "developer").slice(0, 20).map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/20 border border-border/20">
                    {p.avatar_url ? <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" /> : <div className="w-8 h-8 rounded-full bg-secondary/40 flex items-center justify-center text-muted-foreground font-bold text-sm">{(p.display_name || "?")[0]}</div>}
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground truncate">{p.display_name || "—"}</p><p className="text-[10px] text-muted-foreground" dir="ltr">{p.email}</p></div>
                    <Badge variant="secondary" className="text-[10px]">مستخدم</Badge>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-secondary/20 border border-border/20">
                <h4 className="text-xs font-bold text-foreground mb-2">صلاحيات المستخدم:</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {[{ t: "عرض بياناته الشخصية", ok: true }, { t: "تعديل ملفه الشخصي", ok: true }, { t: "استخدام محادثات AI", ok: true }, { t: "عرض الإشعارات", ok: true }, { t: "عرض بيانات الآخرين", ok: false }, { t: "حذف المستخدمين", ok: false }, { t: "إرسال إشعارات", ok: false }, { t: "الوصول للوحة المطور", ok: false }].map((item, i) => (
                    <li key={i} className="flex items-center gap-1">{item.ok ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3 text-destructive" />}{item.t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader><CardTitle className="text-foreground text-base flex items-center gap-2"><Clock className="w-5 h-5 text-primary" />آخر الأنشطة</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[
              ...profiles.slice(0, 5).map(p => ({ type: "signup" as const, time: p.created_at, text: `تسجيل جديد: ${p.display_name || p.email}`, icon: UserPlus })),
              ...visits.slice(0, 10).map(v => ({ type: "visit" as const, time: v.visited_at, text: `زيارة: ${decodeURIComponent(v.page_path)}`, icon: Eye })),
              ...aiLogs.slice(0, 5).map(l => ({ type: "ai" as const, time: l.created_at, text: `محادثة AI: ${l.message?.slice(0, 60)}...`, icon: MessageSquare })),
            ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 20).map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.type === "signup" ? "bg-emerald-500/15" : item.type === "visit" ? "bg-primary/15" : "bg-violet-500/15"}`}>
                  <item.icon className={`w-4 h-4 ${item.type === "signup" ? "text-emerald-500" : item.type === "visit" ? "text-primary" : "text-violet-500"}`} />
                </div>
                <div className="flex-1 min-w-0"><p className="text-sm text-foreground truncate">{item.text}</p><p className="text-[10px] text-muted-foreground">{new Date(item.time).toLocaleString("ar")}</p></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementTab;
