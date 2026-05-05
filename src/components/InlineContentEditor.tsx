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

  useEffect(() => {
    if (!user) { setIsDeveloper(false); return; }
    supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "developer").maybeSingle()
      .then(({ data }) => setIsDeveloper(!!data));
  }, [user]);

  // Pick-mode: make tagged elements directly contentEditable; save on blur to DB
  useEffect(() => {
    if (!pickMode) {
      document.body.classList.remove("ice-pickmode");
      document.querySelectorAll<HTMLElement>("[data-content-key]").forEach(el => {
        el.removeAttribute("contenteditable");
        el.removeAttribute("spellcheck");
      });
      return;
    }
    document.body.classList.add("ice-pickmode");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-content-key]"));
    const originals = new Map<HTMLElement, string>();

    const onFocus = (e: FocusEvent) => {
      const el = e.currentTarget as HTMLElement;
      originals.set(el, el.textContent || "");
    };

    const onBlur = async (e: FocusEvent) => {
      const el = e.currentTarget as HTMLElement;
      const key = el.getAttribute("data-content-key") || "";
      const newVal = (el.textContent || "").trim();
      const oldVal = originals.get(el) || "";
      if (!newVal || newVal === oldVal) return;
      const existing = content[key];
      if (existing?.id) {
        const { error } = await supabase.from("site_content")
          .update({ content_value: newVal, updated_by: user?.id })
          .eq("id", existing.id);
        if (error) { toast.error(error.message); el.textContent = oldVal; return; }
      } else {
        const { error } = await supabase.from("site_content").insert({
          content_key: key, content_value: newVal,
          page: location.pathname, updated_by: user?.id,
        });
        if (error) { toast.error(error.message); el.textContent = oldVal; return; }
      }
      toast.success("تم الحفظ");
      refresh();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).blur();
      }
      if (e.key === "Escape") {
        const el = e.currentTarget as HTMLElement;
        el.textContent = originals.get(el) || "";
        el.blur();
      }
    };

    els.forEach(el => {
      el.setAttribute("contenteditable", "true");
      el.setAttribute("spellcheck", "false");
      el.addEventListener("focus", onFocus);
      el.addEventListener("blur", onBlur);
      el.addEventListener("keydown", onKey);
    });

    return () => {
      els.forEach(el => {
        el.removeAttribute("contenteditable");
        el.removeAttribute("spellcheck");
        el.removeEventListener("focus", onFocus);
        el.removeEventListener("blur", onBlur);
        el.removeEventListener("keydown", onKey);
      });
      document.body.classList.remove("ice-pickmode");
    };
  }, [pickMode, content, user, location.pathname, refresh]);

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

  return (
    <>
      {/* Pick mode global styles */}
      <style>{`
        body.ice-pickmode [data-content-key] {
          outline: 1.5px dashed hsl(var(--primary) / 0.45) !important;
          outline-offset: 2px;
          cursor: text !important;
          border-radius: 4px;
        }
        body.ice-pickmode [data-content-key]:focus {
          outline: 2px solid hsl(var(--primary)) !important;
          background: hsl(var(--primary) / 0.08) !important;
        }
        body.ice-pickmode [data-content-key]:hover {
          outline: 2px solid hsl(var(--primary) / 0.8) !important;
        }
        body.ice-pickmode * { user-select: text !important; }
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

      {pickMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-4 py-2 rounded-full glass text-xs text-foreground shadow-lg" dir="rtl">
          انقر على أي نص لتعديله مباشرة • Enter للحفظ • Esc للإلغاء
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