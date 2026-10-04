import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButton from "@/components/ShareButton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Network, Crosshair, Code2, Globe, Flag, Terminal, Lock, Wrench,
  BookOpen, GraduationCap, Sparkles, Layers, FileText, Loader2, CheckCircle2,
  Circle, ArrowLeft, ExternalLink, Search, Percent, ListChecks,
} from "lucide-react";

interface PathRow {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
  accent: string;
  category: string;
  order_index: number;
}

interface StepRow {
  id: string;
  path_id: string;
  title: string;
  description: string;
  step_type: string;
  target_route: string;
  external_url: string;
  difficulty: string;
  order_index: number;
}

const ICONS: Record<string, typeof Shield> = {
  Shield, Network, Crosshair, Code2, Globe, Flag, Terminal, Lock, Wrench,
  BookOpen, GraduationCap, Sparkles, Layers, FileText,
};

const ACCENTS: Record<string, { text: string; bg: string; border: string; glow: string; bar: string }> = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "group-hover:shadow-[0_0_28px_-6px_rgba(34,211,238,0.55)]", bar: "bg-cyan-400" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "group-hover:shadow-[0_0_28px_-6px_rgba(96,165,250,0.55)]", bar: "bg-blue-400" },
  rose: { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", glow: "group-hover:shadow-[0_0_28px_-6px_rgba(251,113,133,0.55)]", bar: "bg-rose-400" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "group-hover:shadow-[0_0_28px_-6px_rgba(52,211,153,0.55)]", bar: "bg-emerald-400" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30", glow: "group-hover:shadow-[0_0_28px_-6px_rgba(167,139,250,0.55)]", bar: "bg-violet-400" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "group-hover:shadow-[0_0_28px_-6px_rgba(251,191,36,0.55)]", bar: "bg-amber-400" },
  slate: { text: "text-slate-300", bg: "bg-slate-500/10", border: "border-slate-500/30", glow: "group-hover:shadow-[0_0_28px_-6px_rgba(148,163,184,0.55)]", bar: "bg-slate-400" },
  fuchsia: { text: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", glow: "group-hover:shadow-[0_0_28px_-6px_rgba(232,121,249,0.55)]", bar: "bg-fuchsia-400" },
};

const accentOf = (a: string) => ACCENTS[a] || ACCENTS.cyan;
const iconOf = (name: string) => ICONS[name] || BookOpen;

const STEP_ICON: Record<string, typeof Shield> = {
  topic: BookOpen,
  tool: Wrench,
  lesson: FileText,
  quiz: Sparkles,
  quickref: Layers,
  external: ExternalLink,
};

const DIFF: Record<string, { label: string; cls: string }> = {
  beginner: { label: "مبتدئ", cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  intermediate: { label: "متوسط", cls: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  advanced: { label: "متقدم", cls: "text-rose-400 bg-rose-500/10 border-rose-500/30" },
};

const LearningPathsPage = () => {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const [paths, setPaths] = useState<PathRow[]>([]);
  const [steps, setSteps] = useState<StepRow[]>([]);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const activeSlug = params.get("path");
  const activePath = useMemo(
    () => paths.find(p => p.slug === activeSlug) || null,
    [paths, activeSlug]
  );

  useEffect(() => {
    (async () => {
      const [p, s] = await Promise.all([
        supabase.from("learning_paths").select("*").eq("active", true).order("order_index"),
        supabase.from("learning_steps").select("*").order("order_index"),
      ]);
      if (p.error || s.error) toast.error("تعذر تحميل المسارات");
      setPaths((p.data as PathRow[]) || []);
      setSteps((s.data as StepRow[]) || []);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!user) { setDone(new Set()); return; }
    (async () => {
      const { data } = await supabase.from("user_path_progress").select("step_id").eq("user_id", user.id);
      setDone(new Set((data || []).map((r: any) => r.step_id)));
    })();
  }, [user]);

  const toggle = async (step: StepRow) => {
    if (!user) {
      toast.error("سجّل دخولك لحفظ تقدّمك");
      return;
    }
    setSaving(step.id);
    const isDone = done.has(step.id);
    if (isDone) {
      const { error } = await supabase.from("user_path_progress")
        .delete().eq("user_id", user.id).eq("step_id", step.id);
      if (!error) setDone(prev => { const n = new Set(prev); n.delete(step.id); return n; });
      else toast.error(error.message);
    } else {
      const { error } = await supabase.from("user_path_progress")
        .insert({ user_id: user.id, step_id: step.id, path_id: step.path_id });
      if (!error) {
        setDone(prev => new Set(prev).add(step.id));
        const total = steps.filter(s => s.path_id === step.path_id).length;
        const nowDone = steps.filter(s => s.path_id === step.path_id && (done.has(s.id) || s.id === step.id)).length;
        if (total > 0 && nowDone === total) toast.success("أنهيت هذا المسار بالكامل — أحسنت");
      } else toast.error(error.message);
    }
    setSaving(null);
  };

  const stats = useMemo(() => {
    const total = steps.length;
    const completed = steps.filter(s => done.has(s.id)).length;
    return {
      paths: paths.length,
      steps: total,
      completed,
      percent: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [paths, steps, done]);

  const pathSteps = useMemo(
    () => steps.filter(s => s.path_id === activePath?.id).sort((a, b) => a.order_index - b.order_index),
    [steps, activePath]
  );

  const visiblePaths = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return paths;
    return paths.filter(p =>
      [p.title_ar, p.title_en, p.description_ar, p.description_en, p.category]
        .some(v => (v || "").toLowerCase().includes(q))
    );
  }, [paths, search]);

  const openPath = (slug: string) => {
    setBusy(slug);
    setParams(prev => {
      const n = new URLSearchParams(prev);
      n.set("path", slug);
      return n;
    });
    setTimeout(() => setBusy(null), 250);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closePath = () => {
    setParams(prev => {
      const n = new URLSearchParams(prev);
      n.delete("path");
      return n;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 pt-28 pb-16 max-w-[1600px]">
        <div className="flex items-center justify-between gap-3 mb-6">
          <Breadcrumbs />
          <ShareButton title="مسارات التعلّم — Qusay_kali" />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="glow-orbit float-soft w-20 h-20 rounded-3xl bg-primary/10 border border-primary/30 backdrop-blur-2xl flex items-center justify-center">
              <Layers className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="font-bold text-primary text-glow mb-3" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
            مسارات التعلّم
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}>
            ابدأ من هنا، واتبع الخطوات بالترتيب. تقدّمك يُحفظ تلقائياََََََََََََََََََََََََََََََََََُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُُ
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm">
              <ListChecks className="w-3.5 h-3.5 text-primary" /> {stats.paths} مسار
            </span>
            <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm">
              <Layers className="w-3.5 h-3.5 text-primary" /> {stats.steps} خطوة
            </span>
            <span className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm">
              <Percent className="w-3.5 h-3.5 text-primary" /> {stats.percent}% مكتمل
            </span>
            <Link to="/القاموس" className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-primary hover:text-foreground transition-colors">
              <BookOpen className="w-3.5 h-3.5" /> قاموس المصطلحات
            </Link>
            <Link to="/اوراق-سريعة" className="glass-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-primary hover:text-foreground transition-colors">
              <FileText className="w-3.5 h-3.5" /> أوراق الأوامر
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activePath ? (
          /* ===== Path detail ===== */
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <button onClick={closePath} className="mb-5 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> كل المسارات
            </button>

            <div className={`glass-elevated prism-border rounded-3xl p-6 mb-6 border ${accentOf(activePath.accent).border}`}>
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 shrink-0 rounded-2xl ${accentOf(activePath.accent).bg} border ${accentOf(activePath.accent).border} flex items-center justify-center`}>
                  {(() => { const I = iconOf(activePath.icon); return <I className={`w-7 h-7 ${accentOf(activePath.accent).text}`} />; })()}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold text-primary text-glow-sm text-2xl">{activePath.title_ar}</h2>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{activePath.description_ar}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>تقدّمك في هذا المسار</span>
                  <span className="font-bold text-foreground">
                    {pathSteps.filter(s => done.has(s.id)).length} / {pathSteps.length}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${accentOf(activePath.accent).bar}`}
                    style={{ width: `${pathSteps.length ? (pathSteps.filter(s => done.has(s.id)).length / pathSteps.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {pathSteps.map((step, i) => {
                const isDone = done.has(step.id);
                const StepIcon = STEP_ICON[step.step_type] || BookOpen;
                const diff = DIFF[step.difficulty] || DIFF.beginner;
                return (
                  <div
                    key={step.id}
                    className={`glass-interactive rounded-2xl border p-4 transition-all ${
                      isDone ? "border-emerald-500/40 bg-emerald-500/5" : "border-border/30 bg-card/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggle(step)}
                        disabled={saving === step.id}
                        className="mt-0.5 shrink-0 disabled:opacity-50"
                        aria-label={isDone ? "إلغاء الإكمال" : "تعليم كمكتمل"}
                      >
                        {saving === step.id
                          ? <Loader2 className="w-6 h-6 animate-spin text-primary" />
                          : isDone
                            ? <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            : <Circle className="w-6 h-6 text-muted-foreground/50 hover:text-primary transition-colors" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-muted-foreground">خطوة {i + 1}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${diff.cls}`}>{diff.label}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                            <StepIcon className="w-3 h-3" />
                            {step.step_type === "quiz" ? "اختبار" : step.step_type === "tool" ? "أداة" : step.step_type === "lesson" ? "درس" : step.step_type === "quickref" ? "مرجع" : "موضوع"}
                          </span>
                        </div>
                        <h3 className={`font-bold mt-1 ${isDone ? "text-emerald-300 line-through decoration-emerald-500/40" : "text-foreground"}`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.description}</p>

                        {(step.target_route || step.external_url) && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {step.target_route && (
                              <Link
                                to={step.target_route}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all hover-lift-pro ${accentOf(activePath.accent).border} ${accentOf(activePath.accent).bg} ${accentOf(activePath.accent).text}`}
                              >
                                ابدأ الخطوة <ArrowLeft className="w-3.5 h-3.5" />
                              </Link>
                            )}
                            {step.external_url && (
                              <a
                                href={step.external_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 bg-secondary/40 text-xs text-muted-foreground hover:text-foreground transition-all"
                              >
                                مصدر خارجي <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ===== Paths grid ===== */
          <>
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث في المسارات..."
                className="w-full pr-10 pl-4 py-3 rounded-2xl bg-card/50 border border-border/40 text-sm focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}>
              <AnimatePresence>
                {visiblePaths.map((p, index) => {
                  const list = steps.filter(s => s.path_id === p.id);
                  const doneCount = list.filter(s => done.has(s.id)).length;
                  const pct = list.length ? Math.round((doneCount / list.length) * 100) : 0;
                  const A = accentOf(p.accent);
                  const I = iconOf(p.icon);
                  return (
                    <motion.button
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => openPath(p.slug)}
                      disabled={busy === p.slug}
                      className={`glass-strong glass-interactive glow-border text-right rounded-3xl p-6 border ${A.border} group relative overflow-hidden`}
                    >
                      <div className={`absolute inset-x-0 -bottom-16 h-32 ${A.bg} blur-3xl opacity-60 pointer-events-none`} />
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-2xl ${A.bg} border ${A.border} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>
                          <I className={`w-6 h-6 ${A.text}`} />
                        </div>
                        {pct > 0 && (
                          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            {pct}%
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-primary mb-2 group-hover:text-glow-sm transition-all" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.35rem)" }}>
                        {p.title_ar}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description_ar}</p>
                      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="glass-chip px-2.5 py-1 rounded-full">{list.length} خطوة</span>
                        <span className={`inline-flex items-center gap-1 ${A.text}`}>
                          {pct > 0 ? `أكملت ${doneCount}` : "ابدأ الآن"} <ArrowLeft className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <div className="mt-3 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${A.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            {visiblePaths.length === 0 && (
              <div className="glass-elevated rounded-3xl p-12 text-center text-muted-foreground">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>لا يوجد مسار بهذا الاسم</p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LearningPathsPage;
