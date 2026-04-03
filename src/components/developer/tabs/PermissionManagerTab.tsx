import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, CheckCircle, XCircle, Shield, Users } from "lucide-react";

const PermissionManagerTab = () => {
  const { profiles, userRoles } = useDeveloper();

  const devCount = Object.values(userRoles).filter(r => r === "developer").length;
  const userCount = profiles.length - devCount;

  const tables = [
    { name: "profiles", dev: ["عرض الكل", "تعديل"], user: ["عرض ملفه", "تعديل ملفه"] },
    { name: "page_visits", dev: ["عرض الكل"], user: ["إضافة زياراته"] },
    { name: "ai_chat_logs", dev: ["عرض الكل"], user: ["عرض محادثاته", "إضافة"] },
    { name: "notifications", dev: ["عرض الكل", "إضافة", "حذف"], user: ["عرض إشعاراته", "تحديث"] },
    { name: "inquiries", dev: ["عرض الكل", "تعديل", "حذف"], user: ["إضافة فقط"] },
    { name: "user_roles", dev: ["عرض الكل"], user: ["عرض دوره فقط"] },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">2</p>
            <p className="text-xs text-muted-foreground">أدوار مُعرّفة</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Key className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{devCount}</p>
            <p className="text-xs text-muted-foreground">مطورين</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{userCount}</p>
            <p className="text-xs text-muted-foreground">مستخدمين عاديين</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader><CardTitle className="text-foreground text-sm flex items-center gap-2"><Key className="w-5 h-5 text-primary" />مصفوفة الصلاحيات (RLS)</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-secondary/20">
                  <th className="text-right p-3 text-muted-foreground font-medium">الجدول</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">صلاحيات المطور</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">صلاحيات المستخدم</th>
                </tr>
              </thead>
              <tbody>
                {tables.map((t, i) => (
                  <tr key={i} className="border-b border-border/10 hover:bg-secondary/20">
                    <td className="p-3 font-medium text-foreground" dir="ltr">{t.name}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {t.dev.map((p, j) => (
                          <Badge key={j} className="bg-emerald-500/10 text-emerald-600 text-[10px] gap-1">
                            <CheckCircle className="w-2.5 h-2.5" />{p}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {t.user.map((p, j) => (
                          <Badge key={j} variant="outline" className="text-[10px] gap-1">
                            {p.includes("فقط") ? <XCircle className="w-2.5 h-2.5 text-amber-500" /> : <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />}
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionManagerTab;
