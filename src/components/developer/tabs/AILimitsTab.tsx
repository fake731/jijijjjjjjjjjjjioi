import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bot, Save, Search, Loader2, Infinity as InfinityIcon } from "lucide-react";

interface Profile { id: string; email: string | null; display_name: string | null; }
interface AILimit { id: string; user_id: string; daily_limit: number; unlimited: boolean; }

const AILimitsTab = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [limits, setLimits] = useState<Record<string, AILimit>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [edits, setEdits] = useState<Record<string, { daily_limit?: number; unlimited?: boolean }>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [{ data: p }, { data: l }] = await Promise.all([
      supabase.from("profiles").select("id, email, display_name").order("created_at", { ascending: false }).limit(500),
      supabase.from("user_ai_limits").select("*"),
    ]);
    setProfiles((p as Profile[]) || []);
    const map: Record<string, AILimit> = {};
    ((l as AILimit[]) || []).forEach(li => { map[li.user_id] = li; });
    setLimits(map);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (userId: string) => {
    const e = edits[userId] || {};
    const existing = limits[userId];
    setSaving(userId);
    const payload = {
      user_id: userId,
      daily_limit: e.daily_limit ?? existing?.daily_limit ?? 3,
      unlimited: e.unlimited ?? existing?.unlimited ?? false,
      set_by: user?.id,
    };
    const { error } = existing
      ? await supabase.from("user_ai_limits").update(payload).eq("user_id", userId)
      : await supabase.from("user_ai_limits").insert(payload);
    setSaving(null);
    if (error) { toast.error(error.message); return; }
    toast.success("تم الحفظ");
    setEdits(prev => { const n = { ...prev }; delete n[userId]; return n; });
    load();
  };

  const filtered = profiles.filter(p =>
    !search ||
    p.email?.toLowerCase().includes(search.toLowerCase()) ||
    p.display_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4" dir="rtl">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Bot className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p>حدد عدد رسائل الذكاء الاصطناعي اليومية لكل مستخدم. فعّل "بلا حدود" لإعطاء استخدام غير محدود (مثل المطورين).</p>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بالبريد أو الاسم..." className="pr-10" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(p => {
            const existing = limits[p.id];
            const e = edits[p.id] || {};
            const dailyLimit = e.daily_limit ?? existing?.daily_limit ?? 3;
            const unlimited = e.unlimited ?? existing?.unlimited ?? false;
            const dirty = Object.keys(e).length > 0;
            return (
              <Card key={p.id} className="border-border/30 bg-card/40 backdrop-blur-sm">
                <CardContent className="p-3 flex items-center gap-3 flex-wrap">
                  <div className="flex-1 min-w-[180px]">
                    <p className="text-sm font-medium text-foreground">{p.display_name || "—"}</p>
                    <p className="text-xs text-muted-foreground" dir="ltr">{p.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs cursor-pointer flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        checked={unlimited}
                        onChange={ev => setEdits(prev => ({ ...prev, [p.id]: { ...prev[p.id], unlimited: ev.target.checked } }))}
                        className="accent-primary"
                      />
                      <InfinityIcon className="w-3.5 h-3.5" />
                      بلا حدود
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      max={1000}
                      value={dailyLimit}
                      disabled={unlimited}
                      onChange={ev => setEdits(prev => ({ ...prev, [p.id]: { ...prev[p.id], daily_limit: parseInt(ev.target.value) || 0 } }))}
                      className="w-20 h-8 text-sm"
                    />
                    <span className="text-xs text-muted-foreground">رسالة/يوم</span>
                    {dirty && (
                      <Button size="sm" onClick={() => handleSave(p.id)} disabled={saving === p.id} className="gap-1 h-8">
                        {saving === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        حفظ
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AILimitsTab;