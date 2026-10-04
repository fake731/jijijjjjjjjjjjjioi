import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButton from "@/components/ShareButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Search, Loader2, ChevronDown, ChevronUp, Tag, Lightbulb, Link2, Hash,
} from "lucide-react";

interface Term {
  id: string;
  term: string;
  term_ar: string;
  category: string;
  short_definition: string;
  definition: string;
  example: string;
  related: string;
}

const CATEGORIES: Record<string, { label: string; cls: string }> = {
  general: { label: "عام", cls: "text-slate-300 bg-slate-500/10 border-slate-500/30" },
  security: { label: "أمان", cls: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
  malware: { label: "برمجيات خبيثة", cls: "text-rose-400 bg-rose-500/10 border-rose-500/30" },
  network: { label: "شبكات", cls: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
  web: { label: "ويب", cls: "text-violet-400 bg-violet-500/10 border-violet-500/30" },
  crypto: { label: "تشفير", cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  linux: { label: "لينكس", cls: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
};

const catOf = (c: string) => CATEGORIES[c] || { label: c, cls: "text-muted-foreground bg-muted/40 border-border/40" };

const GlossaryPage = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [letter, setLetter] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("glossary_terms").select("*").order("term");
      if (error) toast.error("تعذر تحميل القاموس");
      setTerms((data as Term[]) || []);
      setLoading(false);
    })();
  }, []);

  const letters = useMemo(() => {
    const set = new Set<string>();
    terms.forEach(t => {
      const first = (t.term || "").trim()[0];
      if (first && /[a-zA-Z]/.test(first)) set.add(first.toUpperCase());
    });
    return Array.from(set).sort();
  }, [terms]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return terms.filter(t => {
      if (category !== "all" && t.category !== category) return false;
      if (letter) {
        const first = (t.term || "").trim()[0]?.toUpperCase();
        if (first !== letter) return false;
      }
      if (!q) return true;
      return [t.term, t.term_ar, t.short_definition, t.definition, t.example, t.related]
        .some(v => (v || "").toLowerCase().includes(q));
    });
  }, [terms, search, category, letter]);

  const grouped = useMemo(() => {
    const map: Record<string, Term[]> = {};
    filtered.forEach(t => {
      const first = (t.term || "?").trim()[0]?.toUpperCase() || "?";
      (map[first] = map[first] || []).push(t);
    });
    return Object.keys(map).sort().map(k => ({ letter: k, items: map[k] }));
  }, [filtered]);

  const reset = () => { setSearch(""); setCategory("all"); setLetter(""); };

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 pt-28 pb-16 max-w-[1500px]">
        <div className="flex items-center justify-between gap-3 mb-6">
          <Breadcrumbs />
          <ShareButton title="قاموس المصطلحات — Qusay_kali" />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="glow-orbit float-soft w-20 h-20 rounded-3xl bg-primary/10 border border-primary/30 backdrop-blur-2xl flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="font-bold text-primary text-glow mb-3" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
            قاموس المصطلحات
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}>
            شرح مختصر لكل كلمة تصادفها في الأمن السيبراني، مع مثال يثبّتها في ذهنك.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن مصطلح بالعربي أو الإنجليزي..."
            className="w-full pr-10 pl-4 py-3 rounded-2xl bg-card/50 border border-border/40 text-sm focus:border-primary/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setCategory("all")}
            className={`glass-chip px-3 py-1.5 rounded-full text-sm transition-all ${category === "all" ? "border-primary/50 text-primary" : "text-muted-foreground"}`}
          >
            الكل ({terms.length})
          </button>
          {Object.entries(CATEGORIES).map(([key, c]) => {
            const n = terms.filter(t => t.category === key).length;
            if (!n) return null;
            return (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`glass-chip px-3 py-1.5 rounded-full text-sm transition-all ${category === key ? "border-primary/50 text-primary" : "text-muted-foreground"}`}
              >
                {c.label} ({n})
              </button>
            );
          })}
        </div>

        {/* Alphabet index */}
        <div className="flex flex-wrap items-center justify-center gap-1 mb-8">
          <button onClick={reset} className="glass-chip px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-primary transition-colors">
            إعادة
          </button>
          {letters.map(l => (
            <button
              key={l}
              onClick={() => setLetter(letter === l ? "" : l)}
              dir="ltr"
              className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                letter === l ? "bg-primary/20 border border-primary/50 text-primary" : "bg-card/40 border border-border/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-elevated rounded-3xl p-12 text-center text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>لا توجد نتائج مطابقة</p>
            <button onClick={reset} className="mt-4 text-sm text-primary hover:underline">إعادة الضبط</button>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(group => (
              <section key={group.letter}>
                <div className="flex items-center gap-3 mb-3">
                  <span dir="ltr" className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold">
                    {group.letter}
                  </span>
                  <span className="text-xs text-muted-foreground">{group.items.length} مصطلح</span>
                </div>
                <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" }}>
                  {group.items.map(t => {
                    const open = openId === t.id;
                    const c = catOf(t.category);
                    return (
                      <div key={t.id} className="glass-interactive glass-elevated rounded-2xl border border-border/30 p-4 h-fit">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 dir="ltr" className="font-bold text-primary font-mono truncate" style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)" }}>
                              {t.term}
                            </h3>
                            <p className="text-foreground font-bold text-sm mt-0.5">{t.term_ar}</p>
                          </div>
                          <span className={`shrink-0 text-[10px] px-2 py-1 rounded-full border ${c.cls}`}>{c.label}</span>
                        </div>

                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.short_definition}</p>

                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-foreground/90 mt-3 leading-relaxed border-t border-border/30 pt-3">
                                {t.definition}
                              </p>
                              {t.example && (
                                <div className="mt-3 rounded-xl bg-secondary/40 border border-border/30 p-3">
                                  <div className="flex items-center gap-1.5 text-[11px] text-primary mb-1">
                                    <Lightbulb className="w-3 h-3" /> مثال
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed">{t.example}</p>
                                </div>
                              )}
                              {t.related && (
                                <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                  <Link2 className="w-3 h-3 text-muted-foreground" />
                                  {t.related.split(",").map(r => (
                                    <button
                                      key={r}
                                      onClick={() => setSearch(r.trim())}
                                      className="glass-chip px-2 py-0.5 rounded-full text-[11px] text-primary hover:text-foreground transition-colors"
                                      dir="ltr"
                                    >
                                      {r.trim()}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                          onClick={() => setOpenId(open ? null : t.id)}
                          className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          {open ? "إغلاق" : "الشرح الكامل"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-10 text-xs text-muted-foreground">
            <Hash className="w-3.5 h-3.5" />
            {filtered.length} من {terms.length} مصطلح
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GlossaryPage;
