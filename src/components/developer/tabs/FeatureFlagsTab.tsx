import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ToggleLeft, Loader2, Plus, Trash2 } from "lucide-react";

interface Flag {
  id: string;
  flag_key: string;
  name: string;
  description: string | null;
  enabled: boolean;
}

const FeatureFlagsTab = () => {
  const { user } = useAuth();
  const [flags, setFlags] = useState<Flag[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [newFlag, setNewFlag] = useState({ flag_key: "", name: "", description: "" });
  const [creating, setCreating] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("feature_flags")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) toast.error(error.message);
    else setFlags((data as Flag[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleFlag = async (flag: Flag) => {
    setUpdating(flag.id);
    const { error } = await supabase
      .from("feature_flags")
      .update({ enabled: !flag.enabled, updated_by: user?.id })
      .eq("id", flag.id);
    setUpdating(null);
    if (error) { toast.error(error.message); return; }
    setFlags(prev => prev.map(f => f.id === flag.id ? { ...f, enabled: !f.enabled } : f));
    toast.success(flag.enabled ? "تم تعطيل الميزة" : "تم تفعيل الميزة");
  };

  const handleCreate = async () => {
    if (!newFlag.flag_key.trim() || !newFlag.name.trim()) {
      toast.error("المفتاح والاسم مطلوبان");
      return;
    }
    setCreating(true);
    const { error } = await supabase.from("feature_flags").insert({
      flag_key: newFlag.flag_key.trim(),
      name: newFlag.name.trim(),
      description: newFlag.description.trim() || null,
      enabled: true,
      updated_by: user?.id,
    });
    setCreating(false);
    if (error) { toast.error(error.message); return; }
    toast.success("تم إضافة الميزة");
    setNewFlag({ flag_key: "", name: "", description: "" });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("حذف هذه الميزة؟")) return;
    const { error } = await supabase.from("feature_flags").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("تم الحذف");
    load();
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

      <Card className="border-primary/20 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Plus className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">إضافة ميزة جديدة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">المفتاح</Label>
              <Input dir="ltr" value={newFlag.flag_key} onChange={e => setNewFlag(n => ({ ...n, flag_key: e.target.value }))} placeholder="my_feature" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">الاسم</Label>
              <Input value={newFlag.name} onChange={e => setNewFlag(n => ({ ...n, name: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">الوصف</Label>
            <Input value={newFlag.description} onChange={e => setNewFlag(n => ({ ...n, description: e.target.value }))} />
          </div>
          <Button onClick={handleCreate} disabled={creating} size="sm" className="gap-2">
            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            إضافة
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <ToggleLeft className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">تبديل الميزات</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3">
              {flags.map(flag => (
                <div key={flag.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-border/20 gap-3 flex-wrap">
                  <div className="flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-foreground">{flag.name}</p>
                      <code className="text-[10px] text-muted-foreground" dir="ltr">{flag.flag_key}</code>
                    </div>
                    <p className="text-xs text-muted-foreground">{flag.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={flag.enabled ? "default" : "secondary"} className="text-[10px]">
                      {flag.enabled ? "مفعّل" : "معطّل"}
                    </Badge>
                    {updating === flag.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    ) : (
                      <Switch checked={flag.enabled} onCheckedChange={() => toggleFlag(flag)} />
                    )}
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(flag.id)} className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureFlagsTab;
