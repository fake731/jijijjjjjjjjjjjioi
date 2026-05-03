import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Code2, Search, Copy, Check, Cpu, FileCode, Shield, Network, Bug,
  Loader2, Sparkles, BookOpen
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
  const [activeLang, setActiveLang] = useState("python");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const filtered = useMemo(() => {
    return items.filter(i =>
      i.language === activeLang &&
      (search === "" ||
        i.title.toLowerCase().includes(search.toLowerCase()) ||
        (i.description || "").toLowerCase().includes(search.toLowerCase()))
    );
  }, [items, activeLang, search]);

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

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-4 pt-24 pb-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-4">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">قسم البرمجة الشامل</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            تعلّم البرمجة من الصفر
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Python، C++، JavaScript، الأمن السيبراني، الشبكات، واكتشاف الثغرات — كل شيء في مكان واحد.
          </p>
        </div>

        {/* Language tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {LANGUAGES.map(L => {
            const Icon = L.icon;
            const active = activeLang === L.id;
            return (
              <button
                key={L.id}
                onClick={() => setActiveLang(L.id)}
                className={`p-3 rounded-2xl border backdrop-blur-2xl transition-all text-center ${
                  active
                    ? `${L.bg} ${L.border} scale-[1.02] shadow-lg`
                    : "border-border/30 bg-card/40 hover:bg-card/60"
                }`}
              >
                <Icon className={`w-5 h-5 mx-auto mb-1 ${active ? L.color : "text-muted-foreground"}`} />
                <p className={`text-xs font-bold ${active ? L.color : "text-foreground"}`}>{L.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{counts[L.id] || 0} درس</p>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن درس..."
            className="pr-10 h-11 bg-card/40 backdrop-blur-2xl border-primary/15"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center">
              <BookOpen className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">لا يوجد محتوى مطابق — اطلب من المطور إضافته.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(it => {
              const diff = DIFFICULTY_LABEL[it.difficulty] || DIFFICULTY_LABEL.beginner;
              return (
                <Card key={it.id} className="overflow-hidden hover:border-primary/40 transition-all">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-foreground text-base leading-tight">{it.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${diff.color}`}>
                        {diff.label}
                      </span>
                    </div>
                    {it.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed">{it.description}</p>
                    )}
                    {it.code_example && (
                      <div className="relative">
                        <pre
                          dir="ltr"
                          className={`text-xs bg-secondary/40 border border-border/30 rounded-xl p-3 overflow-x-auto font-mono leading-relaxed ${
                            !user ? "select-none" : ""
                          }`}
                        >
                          <code>{it.code_example}</code>
                        </pre>
                        <button
                          onClick={() => handleCopy(it.id, it.code_example || "")}
                          className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-card/80 backdrop-blur border border-border/40 flex items-center justify-center hover:bg-primary/15 transition-colors"
                          title="نسخ"
                        >
                          {copiedId === it.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    )}
                    {it.explanation && (
                      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                        <p className="text-[10px] font-bold text-primary mb-1">شرح:</p>
                        <p className="text-xs text-foreground/90 leading-relaxed">{it.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
