import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Bot, Save, Loader2, Eye, EyeOff, Key, MessageSquare, Shield } from "lucide-react";

const AISettingsTab = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("ai_settings")
      .select("setting_key, setting_value");
    const map: Record<string, string> = {};
    (data || []).forEach((s: any) => { map[s.setting_key] = s.setting_value; });
    setSettings(map);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from("ai_settings")
          .update({ setting_value: value, updated_at: new Date().toISOString() })
          .eq("setting_key", key);
        if (error) throw error;
      }
      toast.success("تم حفظ الإعدادات بنجاح");
    } catch (err: any) {
      toast.error(err.message || "فشل حفظ الإعدادات");
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Key className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-bold text-foreground">كلمة السر</p>
            <p className="text-xs text-muted-foreground">المحتوى المتقدم</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <Bot className="w-8 h-8 text-primary mx-auto mb-2" />
            <Badge className="text-xs">{settings.ai_behavior === "formal" ? "رسمي" : settings.ai_behavior === "casual" ? "عادي" : "ودود"}</Badge>
            <p className="text-xs text-muted-foreground mt-1">سلوك الذكاء</p>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/80">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{settings.free_messages_daily || "1"}</p>
            <p className="text-xs text-muted-foreground">رسائل مجانية يومياً</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground text-sm flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            إعدادات الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-foreground">كلمة سر المحتوى المتقدم</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={settings.advanced_content_password || ""}
                onChange={(e) => updateSetting("advanced_content_password", e.target.value)}
                className="pr-4 pl-10 bg-secondary/30 border-border/30"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">سلوك الذكاء</Label>
            <Select value={settings.ai_behavior || "formal"} onValueChange={(v) => updateSetting("ai_behavior", v)}>
              <SelectTrigger className="bg-secondary/30 border-border/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">رسمي</SelectItem>
                <SelectItem value="casual">عادي</SelectItem>
                <SelectItem value="friendly">ودود</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">الرسائل المجانية يومياً</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={settings.free_messages_daily || "1"}
              onChange={(e) => updateSetting("free_messages_daily", e.target.value)}
              className="bg-secondary/30 border-border/30"
              dir="ltr"
            />
          </div>

          <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ الإعدادات
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettingsTab;
