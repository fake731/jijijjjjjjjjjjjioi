import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Save, Trash2, FileText, Search, Loader2 } from "lucide-react";

interface SiteContent {
  id: string;
  content_key: string;
  content_value: string;
  page: string;
  description: string | null;
  updated_at: string;
}

const SiteContentTab = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Record<string, Partial<SiteContent>>>({});
  const [newItem, setNewItem] = useState({ content_key: "", content_value: "", page: "general", description: "" });
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("page", { ascending: true })
      .order("content_key", { ascending: true });
    if (error) toast.error(error.message);
    else setItems((data as SiteContent[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!newItem.content_key.trim() || !newItem.content_value.trim()) {
      toast.error("المفتاح والقيمة مطلوبان");
      return;
    }
    setSaving("new");
    const { error } = await supabase.from("site_content").insert({
      content_key: newItem.content_key.trim(),
      content_value: newItem.content_value,
      page: newItem.page.trim() || "general",
      description: newItem.description.trim() || null,
      updated_by: user?.id,
    });
    setSaving(null);
    if (error) { toast.error(error.message); return; }
    toast.success("تم إضافة المحتوى");
    setNewItem({ content_key: "", content_value: "", page: "general", description: "" });
    load();
  };

  const handleSave = async (id: string) => {
    const changes = editing[id];
    if (!changes) return;
    setSaving(id);
    const { error } = await supabase.from("site_content").update({
      ...changes,
      updated_by: user?.id,
    }).eq("id", id);
    setSaving(null);
    if (error) { toast.error(error.message); return; }
    toast.success("تم الحفظ");
    setEditing(prev => { const n = { ...prev }; delete n[id]; return n; });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return;
    const { error } = await supabase.from("site_content").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("تم الحذف");
    load();
  };

  const update = (id: string, field: keyof SiteContent, value: string) => {
    setEditing(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const filtered = items.filter(i =>
    !search ||
    i.content_key.toLowerCase().includes(search.toLowerCase()) ||
    i.content_value.toLowerCase().includes(search.toLowerCase()) ||
    i.page.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4" dir="rtl">
      {/* Add new */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Plus className="w-4 h-4" />
            <h3 className="font-bold text-sm">إضافة محتوى جديد</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">المفتاح (key)</Label>
              <Input
                value={newItem.content_key}
                onChange={e => setNewItem(n => ({ ...n, content_key: e.target.value }))}
                placeholder="hero_title"
                dir="ltr"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">الصفحة</Label>
              <Input
                value={newItem.page}
                onChange={e => setNewItem(n => ({ ...n, page: e.target.value }))}
                placeholder="home"
                dir="ltr"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">القيمة</Label>
            <Textarea
              value={newItem.content_value}
              onChange={e => setNewItem(n => ({ ...n, content_value: e.target.value }))}
              rows={2}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">وصف (اختياري)</Label>
            <Input
              value={newItem.description}
              onChange={e => setNewItem(n => ({ ...n, description: e.target.value }))}
            />
          </div>
          <Button onClick={handleCreate} disabled={saving === "new"} size="sm" className="gap-2">
            {saving === "new" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            إضافة
          </Button>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="بحث في المحتوى..."
          className="pr-10"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-border/30 bg-card/30">
          <CardContent className="p-8 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>لا يوجد محتوى</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => {
            const cur = editing[item.id] || {};
            const dirty = Object.keys(cur).length > 0;
            return (
              <Card key={item.id} className="border-border/30 bg-card/40 backdrop-blur-sm">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">{item.page}</span>
                      <code className="text-xs text-foreground font-mono">{item.content_key}</code>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {dirty && (
                        <Button size="sm" onClick={() => handleSave(item.id)} disabled={saving === item.id} className="gap-1 h-7">
                          {saving === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                          حفظ
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)} className="gap-1 h-7 text-destructive hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={cur.content_value ?? item.content_value}
                    onChange={e => update(item.id, "content_value", e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                  <Input
                    value={cur.description ?? item.description ?? ""}
                    onChange={e => update(item.id, "description", e.target.value)}
                    placeholder="وصف"
                    className="text-xs h-8"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SiteContentTab;