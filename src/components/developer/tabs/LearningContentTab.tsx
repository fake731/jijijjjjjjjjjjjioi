import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Search } from "lucide-react";

type TableName = "learning_paths" | "learning_steps" | "glossary_terms" | "cheat_sheets";
type Field = { key: string; label: string; type?: "text" | "textarea" | "number" | "bool" | "json" | "path" };

const CONFIG: Record<TableName, { label: string; titleKey: string; order: string; fields: Field[] }> = {
  learning_paths: {
    label: "المسارات", titleKey: "title_ar", order: "order_index",
    fields: [
      { key: "slug", label: "المعرّف (slug)" }, { key: "title_ar", label: "العنوان بالعربي" },
      { key: "title_en", label: "العنوان بالإنجليزي" }, { key: "description_ar", label: "الوصف بالعربي", type: "textarea" },
      { key: "description_en", label: "الوصف بالإنجليزي", type: "textarea" }, { key: "icon", label: "الأيقونة" },
      { key: "accent", label: "اللون" }, { key: "category", label: "التصنيف" },
      { key: "order_index", label: "الترتيب", type: "number" }, { key: "active", label: "مفعّل", type: "bool" },
    ],
  },
  learning_steps: {
    label: "خطوات المسارات", titleKey: "title", order: "order_index",
    fields: [
      { key: "path_id", label: "المسار", type: "path" }, { key: "title", label: "العنوان" },
      { key: "description", label: "الوصف", type: "textarea" }, { key: "step_type", label: "النوع (topic/tool/lesson/quiz/quickref/external)" },
      { key: "target_route", label: "صفحة الموقع" }, { key: "external_url", label: "رابط خارجي" },
      { key: "difficulty", label: "المستوى (beginner/intermediate/advanced)" }, { key: "order_index", label: "الترتيب", type: "number" },
    ],
  },
  glossary_terms: {
    label: "المصطلحات", titleKey: "term", order: "term",
    fields: [
      { key: "term", label: "المصطلح" }, { key: "term_ar", label: "بالعربي" }, { key: "category", label: "التصنيف" },
      { key: "short_definition", label: "تعريف قصير" }, { key: "definition", label: "الشرح", type: "textarea" },
      { key: "example", label: "مثال", type: "textarea" }, { key: "related", label: "مصطلحات ذات صلة" },
    ],
  },
  cheat_sheets: {
    label: "أوراق الأوامر", titleKey: "title", order: "order_index",
    fields: [
      { key: "title", label: "العنوان" }, { key: "tool_name", label: "اسم الأداة" }, { key: "category", label: "التصنيف" },
      { key: "language", label: "اللغة (bash/python...)" }, { key: "icon", label: "الأيقونة" }, { key: "accent", label: "اللون" },
      { key: "description", label: "الوصف", type: "textarea" },
      { key: "commands", label: "الأوامر (JSON)", type: "json" },
      { key: "order_index", label: "الترتيب", type: "number" }, { key: "active", label: "مفعّل", type: "bool" },
    ],
  },
};

const emptyRow = (t: TableName): any => {
  const r: any = {};
  CONFIG[t].fields.forEach((f) => {
    r[f.key] = f.type === "number" ? 0 : f.type === "bool" ? true : f.type === "json" ? "[]" : "";
  });
  return r;
};

const LearningContentTab = () => {
  const { toast } = useToast();
  const [table, setTable] = useState<TableName>("learning_paths");
  const [rows, setRows] = useState<any[]>([]);
  const [paths, setPaths] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const cfg = CONFIG[table];

  const load = async () => {
    setLoading(true);
    const { data, error } = await (supabase.from(table) as any).select("*").order(cfg.order);
    if (error) toast({ title: "خطأ", description: error.message, variant: "destructive" });
    setRows(data || []);
    const { data: p } = await supabase.from("learning_paths").select("id,title_ar").order("order_index");
    setPaths(p || []);
    setLoading(false);
  };
  useEffect(() => { setEditing(null); setQ(""); load(); }, [table]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? rows.filter((r) => JSON.stringify(r).toLowerCase().includes(s)) : rows;
  }, [rows, q]);

  const save = async () => {
    const payload: any = {};
    for (const f of cfg.fields) {
      let v = editing[f.key];
      if (f.type === "json") {
        try { v = typeof v === "string" ? JSON.parse(v) : v; } catch { toast({ title: "صيغة JSON غير صحيحة", variant: "destructive" }); return; }
      }
      if (f.type === "number") v = Number(v) || 0;
      payload[f.key] = v;
    }
    const q2 = editing.id
      ? (supabase.from(table) as any).update(payload).eq("id", editing.id)
      : (supabase.from(table) as any).insert(payload);
    const { error } = await q2;
    if (error) return toast({ title: "فشل الحفظ", description: error.message, variant: "destructive" });
    toast({ title: "تم الحفظ" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذا العنصر نهائياً؟")) return;
    const { error } = await (supabase.from(table) as any).delete().eq("id", id);
    if (error) return toast({ title: "فشل الحذف", description: error.message, variant: "destructive" });
    load();
  };

  const startEdit = (r: any) => {
    const copy = { ...r };
    cfg.fields.forEach((f) => { if (f.type === "json") copy[f.key] = JSON.stringify(r[f.key] ?? [], null, 2); });
    setEditing(copy);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(CONFIG) as TableName[]).map((t) => (
          <Button key={t} size="sm" variant={t === table ? "default" : "outline"} onClick={() => setTable(t)}>
            {CONFIG[t].label}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث..." className="pr-9" />
        </div>
        <Button onClick={() => setEditing(emptyRow(table))} className="gap-2"><Plus className="w-4 h-4" />إضافة</Button>
      </div>

      {editing && (
        <Card className="border-primary/40">
          <CardContent className="p-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              {cfg.fields.map((f) => (
                <label key={f.key} className={`space-y-1 text-sm ${f.type === "textarea" || f.type === "json" ? "sm:col-span-2" : ""}`}>
                  <span className="text-muted-foreground">{f.label}</span>
                  {f.type === "textarea" || f.type === "json" ? (
                    <Textarea rows={f.type === "json" ? 10 : 3} dir={f.type === "json" ? "ltr" : undefined}
                      className={f.type === "json" ? "font-mono text-xs" : ""}
                      value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                  ) : f.type === "bool" ? (
                    <div><input type="checkbox" checked={!!editing[f.key]} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })} /></div>
                  ) : f.type === "path" ? (
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3"
                      value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}>
                      <option value="">اختر المسار</option>
                      {paths.map((p) => <option key={p.id} value={p.id}>{p.title_ar}</option>)}
                    </select>
                  ) : (
                    <Input type={f.type === "number" ? "number" : "text"} value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                  )}
                </label>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditing(null)} className="gap-2"><X className="w-4 h-4" />إلغاء</Button>
              <Button onClick={save} className="gap-2"><Save className="w-4 h-4" />حفظ</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">{loading ? "جاري التحميل..." : `${filtered.length} عنصر`}</p>
      <div className="grid gap-2">
        {filtered.map((r) => (
          <Card key={r.id} className="glass-interactive">
            <CardContent className="p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{r[cfg.titleKey]}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {table === "learning_steps" ? paths.find((p) => p.id === r.path_id)?.title_ar : r.category || r.short_definition}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => startEdit(r)}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningContentTab;
