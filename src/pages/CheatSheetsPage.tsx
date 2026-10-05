import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search, Loader2, Copy, Check, ScrollText } from "lucide-react";

interface Cmd { cmd?: string; command?: string; desc?: string; description?: string }
interface Sheet { id: string; title: string; tool_name: string; category: string; description: string; commands: Cmd[] }

const CopyBtn = ({ text }: { text: string }) => {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1200); }}
      className="shrink-0 w-7 h-7 rounded-md hover:bg-primary/15 flex items-center justify-center"
      aria-label="نسخ"
    >
      {ok ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
    </button>
  );
};

const CheatSheetsPage = () => {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [active, setActive] = useState("all");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("cheat_sheets").select("*").eq("active", true).order("order_index");
      if (error) toast.error("تعذر تحميل أوراق الأوامر");
      setSheets((data as unknown as Sheet[]) || []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return sheets
      .filter(sh => active === "all" || sh.id === active)
      .map(sh => ({
        ...sh,
        commands: (sh.commands || []).filter(c =>
          !s || `${c.cmd ?? c.command ?? ""} ${c.desc ?? c.description ?? ""} ${sh.tool_name}`.toLowerCase().includes(s)),
      }))
      .filter(sh => sh.commands.length > 0);
  }, [sheets, q, active]);

  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <Breadcrumbs />
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/15 flex items-center justify-center mb-3">
            <ScrollText className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-brand">أوراق الأوامر</h1>
          <p className="text-muted-foreground mt-2">أهم أوامر الأدوات في مكان واحد، انسخ وشغّل مباشرة.</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-5">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="ابحث عن أمر..."
            className="w-full pr-10 pl-4 py-3 rounded-xl bg-card/60 border border-border/40 focus:border-primary outline-none" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[{ id: "all", tool_name: "الكل" }, ...sheets].map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${active === s.id ? "bg-primary/20 border-primary text-primary" : "border-border/40 text-muted-foreground hover:text-foreground"}`}>
              {s.tool_name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">لا توجد نتائج</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(sh => (
              <section key={sh.id} className="glass-interactive rounded-2xl p-5 border border-border/30 bg-card/50">
                <h2 className="text-lg font-bold text-foreground">{sh.title}</h2>
                <p className="text-xs text-muted-foreground mb-4">{sh.description}</p>
                <ul className="space-y-2">
                  {sh.commands.map((c, i) => {
                    const cmd = c.cmd ?? c.command ?? "";
                    return (
                      <li key={i} className="rounded-lg bg-background/50 border border-border/20 p-2.5">
                        <div className="flex items-center gap-2" dir="ltr">
                          <code className="flex-1 text-sm text-primary font-mono break-all">{cmd}</code>
                          <CopyBtn text={cmd} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{c.desc ?? c.description}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheatSheetsPage;
