import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Code2, Search, Copy, Check, Cpu, FileCode, Shield, Network, Bug,
  Loader2, Sparkles, BookOpen, ChevronDown, ChevronUp
} from "lucide-react";

interface ProgrammingItem {
  id: string;
  language: string;
  category: string;
  title: string;
  description: string | null;
  code_example: string | null;
  explanation: string | null;
  difficulty: string;
  order_index: number;
}

const LANGUAGES = [
  { id: "python", label: "Python", icon: Code2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  { id: "cpp", label: "C++", icon: Cpu, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { id: "javascript", label: "JavaScript", icon: FileCode, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  { id: "cybersecurity", label: "أمن سيبراني", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
  { id: "networks", label: "شبكات", icon: Network, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  { id: "vulnerabilities", label: "اكتشاف ثغرات", icon: Bug, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
];

const DIFFICULTY_LABEL: Record<string, { label: string; color: string }> = {
  beginner: { label: "مبتدئ", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  intermediate: { label: "متوسط", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  advanced: { label: "متقدم", color: "text-red-400 bg-red-500/10 border-red-500/30" },
};

const ProgrammingPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<ProgrammingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openLang, setOpenLang] = useState<string | null>("python");
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("programming_content")
        .select("*")
        .order("language")
        .order("order_index");
      if (error) {
        toast.error("تعذر تحميل المحتوى");
      } else {
        setItems((data || []) as any);
      }
      setLoading(false);
    })();
  }, []);

  const handleCopy = (id: string, code: string) => {
    if (!user) {
      toast.error("سجّل دخول لنسخ الكود");
      return;
    }
    navigator.clipboard.writeText(code + "\n\n# Qusay_kali");
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
    toast.success("تم النسخ");
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    items.forEach(i => { c[i.language] = (c[i.language] || 0) + 1; });
    return c;
  }, [items]);

  const filteredByLang = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result: Record<string, ProgrammingItem[]> = {};
    items.forEach(i => {
      if (q && !i.title.toLowerCase().includes(q) && !(i.description || "").toLowerCase().includes(q)) return;
      (result[i.language] = result[i.language] || []).push(i);
    });
    return result;
  }, [items, search]);

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 pt-28 pb-16 max-w-[1900px]">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-xl mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">قسم البرمجة الشامل</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold text-foreground mb-6 text-glow-sm leading-[0.95]">
            تعلّم البرمجة من الصفر
          </h1>
          <p className="text-xl md:text-3xl lg:text-4xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
            Python، C++، JavaScript، الأمن السيبراني، الشبكات، واكتشاف الثغرات — كل شيء في مكان واحد.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-10 max-w-3xl mx-auto">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن درس..."
            className="pr-12 h-16 text-lg bg-card/15 backdrop-blur-2xl border-primary/20 rounded-2xl"
          />
        </div>

        {/* Nested collapsibles: Language → Lessons → (theory + practice) */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-6">
            {LANGUAGES.map(L => {
              const list = filteredByLang[L.id] || [];
              if (search.trim() && list.length === 0) return null;
              const Icon = L.icon;
              const isOpen = openLang === L.id;
              return (
                <div key={L.id} className="glass-strong overflow-hidden transform-gpu will-change-transform">
                  <button
                    onClick={() => { setOpenLang(prev => prev === L.id ? null : L.id); setOpenTopic(null); }}
                    className="w-full flex items-center justify-between p-7 md:p-9 hover:bg-primary/5 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-5 md:gap-7">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${L.bg} border ${L.border} backdrop-blur-2xl flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${L.color}`} />
                      </div>
                      <div className="text-right">
                        <h2 className={`text-3xl md:text-5xl font-bold ${L.color}`}>{L.label}</h2>
                        <p className="text-sm md:text-lg text-muted-foreground mt-1">{counts[L.id] || 0} درس</p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-7 h-7 md:w-9 md:h-9 text-primary" />
                    ) : (
                      <ChevronDown className="w-7 h-7 md:w-9 md:h-9 text-muted-foreground" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden transform-gpu will-change-transform"
                      >
                        <div className="border-t border-primary/15 p-4 md:p-6 space-y-3 md:space-y-4">
                          {list.length === 0 ? (
                            <div className="text-center py-10">
                              <BookOpen className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                              <p className="text-sm text-muted-foreground">لا يوجد محتوى — اطلب من المطور إضافته.</p>
                            </div>
                          ) : list.map(it => {
                            const tid = it.id;
                            const isTopicOpen = openTopic === tid;
                            const diff = DIFFICULTY_LABEL[it.difficulty] || DIFFICULTY_LABEL.beginner;
                            return (
                              <div key={tid} className="glass overflow-hidden">
                                <button
                                  onClick={() => setOpenTopic(prev => prev === tid ? null : tid)}
                                  className="w-full flex items-center justify-between gap-4 px-5 md:px-7 py-5 md:py-6 hover:bg-primary/5 transition-colors duration-200"
                                >
                                  <h3 className="font-bold text-foreground text-xl md:text-3xl text-right leading-tight flex-1">
                                    {it.title}
                                  </h3>
                                  <div className="flex items-center gap-3">
                                    <span className={`text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full border whitespace-nowrap ${diff.color}`}>
                                      {diff.label}
                                    </span>
                                    {isTopicOpen ? (
                                      <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
                                    )}
                                  </div>
                                </button>
                                <AnimatePresence initial={false}>
                                  {isTopicOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                                      className="overflow-hidden transform-gpu will-change-transform"
                                    >
                                      <div className="border-t border-primary/10 p-5 md:p-7 space-y-5">
                                        {it.description && (
                                          <div className="p-5 md:p-6 rounded-2xl glass-soft">
                                            <p className="text-sm md:text-base font-bold text-primary mb-3 tracking-wide">الجانب النظري</p>
                                            <p className="text-base md:text-xl text-foreground/85 leading-loose">{it.description}</p>
                                          </div>
                                        )}
                                        {it.code_example && (
                                          <div className="relative p-5 md:p-6 rounded-2xl glass-soft">
                                            <p className="text-sm md:text-base font-bold text-primary mb-3 tracking-wide">الجانب العملي</p>
                                            <pre
                                              dir="ltr"
                                              className={`text-sm md:text-lg bg-card/15 backdrop-blur-2xl border border-primary/20 rounded-2xl p-5 md:p-6 overflow-x-auto font-mono leading-relaxed ${
                                                !user ? "select-none" : ""
                                              }`}
                                            >
                                              <code>{it.code_example}</code>
                                            </pre>
                                            <button
                                              onClick={() => handleCopy(it.id, it.code_example || "")}
                                              className="absolute top-12 left-6 w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary/15 transition-colors duration-200"
                                              title="نسخ"
                                            >
                                              {copiedId === it.id ? (
                                                <Check className="w-5 h-5 text-emerald-500" />
                                              ) : (
                                                <Copy className="w-5 h-5 text-muted-foreground" />
                                              )}
                                            </button>
                                          </div>
                                        )}
                                        {it.explanation && (
                                          <div className="p-5 md:p-6 rounded-2xl glass-soft">
                                            <p className="text-sm md:text-base font-bold text-primary mb-3 tracking-wide">شرح تفصيلي</p>
                                            <p className="text-base md:text-xl text-foreground/90 leading-loose">{it.explanation}</p>
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProgrammingPage;
