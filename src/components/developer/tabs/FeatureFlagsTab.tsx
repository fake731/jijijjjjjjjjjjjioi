import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ToggleLeft, Zap, MessageSquare, Image, Bell, Shield } from "lucide-react";

const FeatureFlagsTab = () => {
  const [flags, setFlags] = useState([
    { id: "ai_chat", name: "محادثات الذكاء الاصطناعي", desc: "السماح باستخدام محادثات AI", enabled: true, icon: MessageSquare },
    { id: "image_upload", name: "رفع الصور", desc: "السماح برفع الصور في المحادثات", enabled: true, icon: Image },
    { id: "notifications", name: "الإشعارات", desc: "تفعيل نظام الإشعارات", enabled: true, icon: Bell },
    { id: "privacy_mode", name: "وضع الخصوصية", desc: "إخفاء معلومات حساسة", enabled: false, icon: Shield },
    { id: "realtime", name: "التحديث الفوري", desc: "تحديث البيانات في الوقت الحقيقي", enabled: true, icon: Zap },
  ]);

  const toggleFlag = (id: string) => {
    setFlags(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const enabledCount = flags.filter(f => f.enabled).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{flags.length}</p>
            <p className="text-[10px] text-muted-foreground">إجمالي الميزات</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-500">{enabledCount}</p>
            <p className="text-[10px] text-muted-foreground">مفعّلة</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <ToggleLeft className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">تبديل الميزات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {flags.map(flag => (
              <div key={flag.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${flag.enabled ? "bg-emerald-500/10" : "bg-muted/50"}`}>
                    <flag.icon className={`w-5 h-5 ${flag.enabled ? "text-emerald-500" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{flag.name}</p>
                    <p className="text-xs text-muted-foreground">{flag.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={flag.enabled ? "default" : "secondary"} className="text-[10px]">
                    {flag.enabled ? "مفعّل" : "معطّل"}
                  </Badge>
                  <Switch checked={flag.enabled} onCheckedChange={() => toggleFlag(flag.id)} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">⚠️ ملاحظة: تبديل الميزات هنا للعرض فقط ولا يؤثر على النظام الفعلي</p>
    </div>
  );
};

export default FeatureFlagsTab;
