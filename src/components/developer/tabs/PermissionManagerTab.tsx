import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Shield, Users, Key, Eye, Trash2, Edit, Send, Bell, MessageSquare, Database, Settings, Lock, Globe, Smartphone, FileText, Download, ToggleLeft, UserX, Activity } from "lucide-react";

const PermissionManagerTab = () => {
  const { profiles, userRoles } = useDeveloper();

  const devCount = Object.values(userRoles).filter(r => r === "developer").length;
  const userCount = profiles.length - devCount;

  const permissions = [
    { id: 1, name: "عرض جميع المستخدمين", icon: Users, dev: true, user: false, category: "المستخدمين" },
    { id: 2, name: "حذف المستخدمين", icon: Trash2, dev: true, user: false, category: "المستخدمين" },
    { id: 3, name: "تعديل بيانات المستخدمين", icon: Edit, dev: true, user: false, category: "المستخدمين" },
    { id: 4, name: "حظر المستخدمين", icon: UserX, dev: true, user: false, category: "المستخدمين" },
    { id: 5, name: "إرسال إشعارات", icon: Bell, dev: true, user: false, category: "التواصل" },
    { id: 6, name: "البث العام", icon: Send, dev: true, user: false, category: "التواصل" },
    { id: 7, name: "عرض الاستفسارات", icon: MessageSquare, dev: true, user: false, category: "التواصل" },
    { id: 8, name: "حذف الاستفسارات", icon: Trash2, dev: true, user: false, category: "التواصل" },
    { id: 9, name: "عرض سجل الزيارات", icon: Eye, dev: true, user: false, category: "التحليلات" },
    { id: 10, name: "عرض محادثات AI", icon: MessageSquare, dev: true, user: false, category: "التحليلات" },
    { id: 11, name: "تصدير البيانات CSV", icon: Download, dev: true, user: false, category: "النظام" },
    { id: 12, name: "إدارة التخزين", icon: Database, dev: true, user: false, category: "النظام" },
    { id: 13, name: "عرض سجل الأخطاء", icon: FileText, dev: true, user: false, category: "النظام" },
    { id: 14, name: "تبديل الميزات", icon: ToggleLeft, dev: true, user: false, category: "النظام" },
    { id: 15, name: "إعدادات الذكاء الاصطناعي", icon: Settings, dev: true, user: false, category: "النظام" },
    { id: 16, name: "تتبع عناوين IP", icon: Globe, dev: true, user: false, category: "الأمان" },
    { id: 17, name: "مراقبة الجلسات", icon: Activity, dev: true, user: false, category: "الأمان" },
    { id: 18, name: "عرض سجل التدقيق", icon: Lock, dev: true, user: false, category: "الأمان" },
    { id: 19, name: "النسخ الاحتياطي والاستعادة", icon: Database, dev: true, user: false, category: "النظام" },
    { id: 20, name: "تحليل الأجهزة", icon: Smartphone, dev: true, user: false, category: "التحليلات" },
  ];

  const categories = [...new Set(permissions.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">20</p>
            <p className="text-xs text-muted-foreground">صلاحية مُعرّفة</p>
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

      {categories.map(cat => (
        <Card key={cat} className="border-border/30 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-foreground text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              {cat}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {permissions.filter(p => p.category === cat).map(perm => (
                <div key={perm.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 border border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <perm.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{perm.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px] gap-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        مطور
                      </Badge>
                      <Badge variant="outline" className="text-[10px] gap-1">
                        <XCircle className="w-2.5 h-2.5 text-destructive" />
                        مستخدم
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PermissionManagerTab;
