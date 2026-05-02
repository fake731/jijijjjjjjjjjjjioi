import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, X, Save, Plus, Loader2, Trash2, MousePointerClick } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLocation } from "react-router-dom";

const InlineContentEditor = () => {
  const { user } = useAuth();
  const location = useLocation();
  const { content, refresh } = useSiteContent();
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [open, setOpen] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ key: "", value: "" });
  const [creating, setCreating] = useState(false);
  const [pickMode, setPickMode] = useState(false);
  const [picked, setPicked] = useState<{ key: string; value: string; id?: string } | null>(null);
  const [pickedDraft, setPickedDraft] = useState("");
  const [pickedSaving, setPickedSaving] = useState(false);

  useEffect(() => {
    if (!user) { setIsDeveloper(false); return; }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "developer").maybeSingle()
      .then(({ data }) => setIsDeveloper(!!data));
  }, [user]);

  // Pick-mode: highlight + capture clicks on tagged elements
  useEffect(() => {
    if (!pickMode) {
      document.body.classList.remove("ice-pickmode");
      return;
    }
    document.body.classList.add("ice-pickmode");
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-content-key]") as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      const key = target.getAttribute("data-content-key") || "";
      const existing = content[key];
      const value = existing?.value ?? (target.textContent || "");
      setPicked({ key, value, id: existing?.id });
      setPickedDraft(value);
      setPickMode(false);
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.body.classList.remove("ice-pickmode");
    };
  }, [pickMode, content]);

  // Hide on developer-internal pages
  if (!isDeveloper) return null;
  if (location.pathname.startsWith("/المطور") || location.pathname.startsWith("/دخول-المطور")) return null;

  const items = Object.entries(content).map(([key, v]) => ({ key, ...v }));

  const handleSave = async (id: string, key: string) => {
    const value = edits[key];
    if (value === undefined) return;
    setSavingId(id);
    const { error } = await supabase.from("site_content").update({
      content_value: value,
      updated_by: user?.id,
    }).eq("id", id);
    setSavingId(null);
    if (error) { toast.error(error.message); return; }
    toast.success("تم الحفظ");
    setEdits(prev => { const n = { ...prev }; delete n[key]; return n; });
    refresh();
  };

  const handleCreate = async () => {
    if (!newItem.key.trim() || !newItem.value.trim()) {
      toast.error("المفتاح والقيمة مطلوبان");
      return;
    }
    setCreating(true);
    const { error } = await supabase.from("site_content").insert({
      content_key: newItem.key.trim(),
      content_value: newItem.value,
      page: location.pathname,
      updated_by: user?.id,
    });
    setCreating(false);
    if (error) { toast.error(error.message); return; }
    toast.success("تم الإضافة");
    setNewItem({ key: "", value: "" });
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("حذف هذا المحتوى؟")) return;
    const { error } = await supabase.from("site_content").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("تم الحذف");
    refresh();
  };

  const savePicked = async () => {
    if (!picked) return;
    setPickedSaving(true);
    if (picked.id) {
      const { error } = await supabase.from("site_content")
        .update({ content_value: pickedDraft, updated_by: user?.id })
        .eq("id", picked.id);
      setPickedSaving(false);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from("site_content").insert({
        content_key: picked.key,
        content_value: pickedDraft,
        page: location.pathname,
        updated_by: user?.id,
      });
      setPickedSaving(false);
      if (error) { toast.error(error.message); return; }
    }
    toast.success("تم الحفظ");
    setPicked(null);
    setPickedDraft("");
    refresh();
  };

  return (
    <>
      {/* Pick mode global styles */}
      <style>{`
        body.ice-pickmode [data-content-key] {
          outline: 2px dashed hsl(var(--primary) / 0.7) !important;
          outline-offset: 3px;
          cursor: crosshair !important;
          transition: outline-color 0.15s;
        }
        body.ice-pickmode [data-content-key]:hover {
          outline-color: hsl(var(--primary)) !important;
          background: hsl(var(--primary) / 0.08) !important;
        }
      `}</style>

      {/* Pick mode toggle */}
      <button
        onClick={() => { setPickMode(p => !p); if (!pickMode) setOpen(false); }}
        className={`fixed top-20 left-[4.25rem] z-[60] w-11 h-11 rounded-full shadow-lg transition-all flex items-center justify-center backdrop-blur-xl border ${
          pickMode
            ? "bg-primary text-primary-foreground border-primary scale-110 shadow-primary/50"
            : "bg-card/70 text-primary border-primary/30 hover:scale-105"
        }`}
        title={pickMode ? "إلغاء وضع التحديد" : "وضع التحديد المرئي (انقر على نص لتعديله)"}
      >
        <MousePointerClick className="w-5 h-5" />
      </button>

      {/* Floating pencil button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed top-20 left-4 z-[60] w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 hover:scale-105 transition-all flex items-center justify-center backdrop-blur-xl border border-primary/30"
        title={open ? "إغلاق المحرر" : "محرر المحتوى المباشر"}
      >
        {open ? <X className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
      </button>

      {/* Picked element quick-edit popup */}
      {picked && (
        <div className="fixed inset-x-4 bottom-24 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[420px] z-[70] rounded-2xl border border-primary/40 bg-card/90 backdrop-blur-2xl shadow-2xl p-4" dir="rtl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-foreground">تعديل العنصر المحدد</p>
            <button onClick={() => { setPicked(null); setPickedDraft(""); }} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <code className="block text-[10px] text-primary font-mono mb-2 truncate" dir="ltr">{picked.key}</code>
          <Textarea
            value={pickedDraft}
            onChange={e => setPickedDraft(e.target.value)}
            rows={4}
            className="text-sm mb-2"
            autoFocus
          />
          <Button onClick={savePicked} disabled={pickedSaving || !pickedDraft.trim()} className="w-full gap-2 h-9">
            {pickedSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            حفظ التغيير
          </Button>
        </div>
      )}

      {open && (
        <div className="fixed top-20 left-4 z-[59] w-[min(420px,calc(100vw-2rem))] max-h-[75vh] overflow-y-auto rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl shadow-2xl p-4 mt-12" dir="rtl">
          <div className="mb-3">
            <p className="text-sm font-bold text-foreground">محرر محتوى الموقع</p>
            <p className="text-xs text-muted-foreground">عدّل أي نص واحفظه — يتحدث للجميع فوراً</p>
          </div>

          {/* Add new */}
          <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
            <Label className="text-xs">إضافة محتوى جديد لهذه الصفحة</Label>
            <Input dir="ltr" value={newItem.key} onChange={e => setNewItem(n => ({ ...n, key: e.target.value }))} placeholder="content_key" className="h-8 text-xs" />
            <Textarea value={newItem.value} onChange={e => setNewItem(n => ({ ...n, value: e.target.value }))} rows={2} placeholder="القيمة" className="text-xs" />
            <Button size="sm" onClick={handleCreate} disabled={creating} className="gap-1 h-7 text-xs">
              {creating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
              إضافة
            </Button>
          </div>

          {/* Existing items */}
          <div className="space-y-2">
            {items.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">لا يوجد محتوى — أضف أولاً</p>
            )}
            {items.map(item => {
              const editing = edits[item.key] !== undefined;
              return (
                <div key={item.id} className="p-2.5 rounded-lg bg-secondary/30 border border-border/30 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-[10px] text-primary font-mono truncate" dir="ltr">{item.key}</code>
                    <button onClick={() => handleDelete(item.id)} className="text-destructive/70 hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <Textarea
                    value={editing ? edits[item.key] : item.value}
                    onChange={e => setEdits(prev => ({ ...prev, [item.key]: e.target.value }))}
                    rows={2}
                    className="text-xs"
                  />
                  {editing && (
                    <Button size="sm" onClick={() => handleSave(item.id, item.key)} disabled={savingId === item.id} className="gap-1 h-7 text-xs w-full">
                      {savingId === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      حفظ
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default InlineContentEditor;