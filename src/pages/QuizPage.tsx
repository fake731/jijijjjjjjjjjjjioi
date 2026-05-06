import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Code, Shield, Network, Bug, Cpu, GraduationCap,
  CheckCircle2, XCircle, Trophy, Sparkles, ArrowRight, Loader2, LogIn,
  Globe, Database, Terminal, Lock, KeyRound, FileCode, Server, Smartphone, Wifi, Binary,
  Timer, Award, History, Flame, Star, Zap
} from "lucide-react";

interface QuizQuestion {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
  question_type: "mcq" | "challenge";
  challenge_prompt: string | null;
}

const CATEGORIES = [
  { id: "python", label: "Python", icon: Code, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  { id: "cpp", label: "C++", icon: Cpu, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  { id: "cybersecurity", label: "أمن سيبراني", icon: Shield, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
  { id: "networks", label: "شبكات", icon: Network, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  { id: "vulnerabilities", label: "اكتشاف ثغرات", icon: Bug, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  { id: "javascript", label: "JavaScript", icon: FileCode, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  { id: "web_security", label: "أمن الويب", icon: Globe, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  { id: "linux", label: "Linux & Bash", icon: Terminal, color: "text-lime-400", bg: "bg-lime-500/10", border: "border-lime-500/30" },
  { id: "cryptography", label: "التشفير", icon: Lock, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
  { id: "passwords", label: "كلمات المرور", icon: KeyRound, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30" },
  { id: "databases", label: "قواعد البيانات", icon: Database, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/30" },
  { id: "servers", label: "إدارة السيرفرات", icon: Server, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30" },
  { id: "mobile_security", label: "أمن الهاتف", icon: Smartphone, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" },
  { id: "wireless", label: "اللاسلكي", icon: Wifi, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30" },
  { id: "reverse_engineering", label: "هندسة عكسية", icon: Binary, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
];

const LEVELS = [
  { id: "easy", label: "سهل", color: "text-emerald-400", bg: "bg-emerald-500/10", time: 30 },
  { id: "medium", label: "متوسط", color: "text-amber-400", bg: "bg-amber-500/10", time: 25 },
  { id: "hard", label: "متقدم", color: "text-red-400", bg: "bg-red-500/10", time: 20 },
  { id: "auto", label: "ديناميكي", color: "text-primary", bg: "bg-primary/10", time: 25 },
];

interface Attempt {
  id: string;
  category: string;
  difficulty: string;
  score: number;
  total_questions: number;
  created_at: string;
}

interface Badge {
  id: string;
  badge_key: string;
  badge_label: string;
  earned_at: string;
}

const QuizPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"select" | "quiz" | "result">("select");
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [currentDifficulty, setCurrentDifficulty] = useState<string>(""); // for dynamic mode
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { picked: number; correct: boolean; challengeText?: string; aiScore?: number }>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [challengeText, setChallengeText] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [perQuestionTime, setPerQuestionTime] = useState(30);
  const [history, setHistory] = useState<Attempt[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  // Load history & badges
  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: hist }, { data: bg }] = await Promise.all([
        supabase.from("quiz_attempts").select("id,category,difficulty,score,total_questions,created_at")
          .eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
        supabase.from("user_badges").select("*").eq("user_id", user.id).order("earned_at", { ascending: false }),
      ]);
      setHistory((hist || []) as any);
      setBadges((bg || []) as any);
    })();
  }, [user, step]);

  // Timer
  useEffect(() => {
    if (step !== "quiz" || showExplanation) return;
    if (timeLeft <= 0) {
      // auto-fail current question
      const cur = questions[currentIdx];
      if (cur && !answers[cur.id]) {
        setAnswers(prev => ({ ...prev, [cur.id]: { picked: -1, correct: false } }));
        setStreak(0);
        setShowExplanation(true);
        toast.error("انتهى الوقت!");
      }
      return;
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, step, showExplanation, currentIdx, questions, answers]);

  const fetchQuestionsFor = async (cat: string, diff: string, limit = 10) => {
    const { data, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("category", cat)
      .eq("difficulty", diff)
      .limit(limit);
    if (error) throw error;
    return ((data || []) as any).map((q: any) => {
      const opts: string[] = Array.isArray(q.options) ? q.options : [];
      // Shuffle option order so correct answer is not always at the same position
      const indexed = opts.map((o, i) => ({ o, i }));
      for (let k = indexed.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [indexed[k], indexed[j]] = [indexed[j], indexed[k]];
      }
      const newOptions = indexed.map(x => x.o);
      const newCorrect = indexed.findIndex(x => x.i === q.correct_index);
      return { ...q, options: newOptions, correct_index: newCorrect >= 0 ? newCorrect : q.correct_index };
    }) as QuizQuestion[];
  };

  const startQuiz = async () => {
    if (!user) {
      toast.error("يجب تسجيل الدخول");
      navigate("/تسجيل-الدخول");
      return;
    }
    if (!category || !difficulty) return;
    setLoading(true);
    try {
      const startDiff = difficulty === "auto" ? "easy" : difficulty;
      const qs = await fetchQuestionsFor(category, startDiff);
      if (qs.length === 0) {
        toast.error("لا توجد أسئلة في هذا التخصص حالياً");
        setLoading(false);
        return;
      }
      const lvl = LEVELS.find(l => l.id === (difficulty === "auto" ? "medium" : difficulty));
      const t = lvl?.time || 25;
      setPerQuestionTime(t);
      setTimeLeft(t);
      setQuestions(qs);
      setCurrentDifficulty(startDiff);
      setCurrentIdx(0);
      setAnswers({});
      setStreak(0);
      setShowExplanation(false);
      setChallengeText("");
      setNewBadges([]);
      setStep("quiz");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const current = questions[currentIdx];
  const score = Object.values(answers).filter(a => a.correct).length;

  const handleMcqAnswer = (idx: number) => {
    if (!current || showExplanation) return;
    const correct = idx === current.correct_index;
    setAnswers(prev => ({ ...prev, [current.id]: { picked: idx, correct } }));
    setStreak(s => correct ? s + 1 : 0);
    setShowExplanation(true);
  };

  const evaluateChallenge = async () => {
    if (!current || !challengeText.trim()) return;
    setEvaluating(true);
    try {
      const { data } = await supabase.functions.invoke("ai-chat", {
        body: {
          message: `أنت مُقيّم اختبار. التحدي: "${current.challenge_prompt}". إجابة المستخدم: "${challengeText}". أعد JSON فقط: {"score": رقم 0-10, "feedback": "ملاحظة قصيرة"}`,
          conversation_id: null, history: [],
        },
      });
      let s = 0, fb = "تم التقييم";
      try {
        const txt = (data?.response || "").match(/\{[\s\S]*\}/)?.[0];
        if (txt) {
          const p = JSON.parse(txt);
          s = Math.max(0, Math.min(10, Number(p.score) || 0));
          fb = String(p.feedback || fb);
        }
      } catch {}
      const correct = s >= 6;
      setAnswers(prev => ({ ...prev, [current.id]: { picked: -1, correct, challengeText, aiScore: s } }));
      setStreak(x => correct ? x + 1 : 0);
      toast.success(`النتيجة: ${s}/10 — ${fb}`);
      setShowExplanation(true);
    } catch {
      toast.error("تعذر التقييم");
    } finally {
      setEvaluating(false);
    }
  };

  const next = async () => {
    setShowExplanation(false);
    setChallengeText("");
    setTimeLeft(perQuestionTime);

    // Dynamic difficulty: if streak=3 escalate, if missed 2 in a row demote
    if (difficulty === "auto" && currentIdx + 1 < questions.length) {
      const last3 = Object.values(answers).slice(-3).filter(a => a.correct).length;
      if (currentDifficulty === "easy" && last3 >= 2) {
        const more = await fetchQuestionsFor(category, "medium", 5).catch(() => []);
        if (more.length) {
          setQuestions(qs => [...qs.slice(0, currentIdx + 1), ...more]);
          setCurrentDifficulty("medium");
          toast.info("ترقّيت إلى المتوسط");
        }
      } else if (currentDifficulty === "medium" && last3 >= 2) {
        const more = await fetchQuestionsFor(category, "hard", 5).catch(() => []);
        if (more.length) {
          setQuestions(qs => [...qs.slice(0, currentIdx + 1), ...more]);
          setCurrentDifficulty("hard");
          toast.info("ترقّيت إلى المتقدم! 🔥");
        }
      }
    }

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      const finalScore = Object.values(answers).filter(a => a.correct).length;
      if (user) {
        await supabase.from("quiz_attempts").insert({
          user_id: user.id,
          category, difficulty,
          score: finalScore,
          total_questions: questions.length,
          details: Object.entries(answers).map(([qid, v]) => ({ qid, ...v })),
        });
        await awardBadges(finalScore, questions.length);
      }
      setStep("result");
    }
  };

  const awardBadges = async (sc: number, total: number) => {
    if (!user) return;
    const earned: { key: string; label: string }[] = [];
    if (sc === total) earned.push({ key: `perfect_${category}`, label: `إتقان ${CATEGORIES.find(c => c.id === category)?.label || category}` });
    if (sc >= total * 0.9) earned.push({ key: "ace", label: "نخبة 90%" });
    if (streak >= 5) earned.push({ key: "streak_5", label: "سلسلة 5 إجابات" });
    if (history.length === 0) earned.push({ key: "first_quiz", label: "أول اختبار" });

    for (const b of earned) {
      const { error } = await supabase.from("user_badges").insert({
        user_id: user.id, badge_key: b.key, badge_label: b.label,
      });
      if (!error) setNewBadges(prev => [...prev, b.label]);
    }
  };

  const reset = () => {
    setStep("select"); setCategory(""); setDifficulty("");
    setQuestions([]); setAnswers({}); setCurrentIdx(0); setStreak(0); setNewBadges([]);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 pt-28 pb-16 max-w-6xl" dir="rtl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-3">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-xs text-primary font-medium">قسم الاختبار</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-glow-sm">اختبر مهاراتك</h1>
          <p className="text-xs md:text-sm text-muted-foreground">15 تخصصاً · مع تايمر · شارات إنجاز · صعوبة ديناميكية</p>
        </div>

        {!user && step === "select" && (
          <Card className="border-amber-500/30 bg-amber-500/5 mb-6">
            <CardContent className="p-4 flex items-center gap-3">
              <LogIn className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-sm flex-1">سجّل دخول لبدء الاختبار وحفظ نتائجك.</p>
              <Button size="sm" onClick={() => navigate("/تسجيل-الدخول")}>دخول</Button>
            </CardContent>
          </Card>
        )}

        {/* SELECT */}
        {step === "select" && (
          <div className="space-y-6">
            {/* Stats summary */}
            {user && (badges.length > 0 || history.length > 0) && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <Card className="bg-card/50">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-foreground">{history.length}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">محاولة</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Award className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-foreground">{badges.length}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">شارة</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Flame className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <p className="text-lg sm:text-xl font-bold text-foreground">
                      {history.length > 0 ? Math.round((history.reduce((s, h) => s + (h.score / h.total_questions), 0) / history.length) * 100) : 0}%
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">معدل الدقة</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Badges */}
            {badges.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> شاراتك
                </h2>
                <div className="flex flex-wrap gap-2">
                  {badges.map(b => (
                    <span key={b.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs text-primary backdrop-blur-xl">
                      <Star className="w-3 h-3" />
                      {b.badge_label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">اختر التخصص</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {CATEGORIES.map(c => {
                  const Icon = c.icon;
                  const active = category === c.id;
                  const locked = !user;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        if (locked) { toast.error("سجّل دخول أولاً"); navigate("/تسجيل-الدخول"); return; }
                        setCategory(c.id);
                      }}
                      className={`relative p-4 sm:p-5 rounded-2xl border backdrop-blur-2xl transition-all text-right ${
                        active ? `${c.bg} ${c.border} shadow-lg scale-[1.03]`
                          : locked ? "border-border/20 bg-card/15 opacity-60"
                          : "border-border/30 bg-card/20 hover:bg-card/35"
                      }`}
                    >
                      {locked && <Lock className="absolute top-2 left-2 w-3.5 h-3.5 text-muted-foreground" />}
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center mb-3`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${c.color}`} />
                      </div>
                      <p className="font-bold text-foreground text-sm sm:text-base">{c.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground mb-4">اختر المستوى</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {LEVELS.map(l => {
                  const active = difficulty === l.id;
                  return (
                    <button key={l.id} onClick={() => setDifficulty(l.id)}
                      className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-2xl transition-all ${
                        active ? `${l.bg} border-current ${l.color} scale-[1.03]`
                          : "border-border/30 bg-card/20 text-foreground hover:bg-card/35"
                      }`}
                    >
                      <p className="font-bold text-sm sm:text-base">{l.label}</p>
                      <p className="text-xs mt-1 opacity-70">{l.time}ث/سؤال</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button onClick={startQuiz} disabled={!category || !difficulty || loading} className="w-full h-12 gap-2" size="lg">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              بدء الاختبار
            </Button>

            {/* History */}
            {user && history.length > 0 && (
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <History className="w-4 h-4 text-primary" /> آخر المحاولات
                  </h3>
                  <div className="space-y-2">
                    {history.map(h => {
                      const cat = CATEGORIES.find(c => c.id === h.category);
                      const pct = Math.round((h.score / h.total_questions) * 100);
                      return (
                        <div key={h.id} className="flex items-center justify-between p-2 rounded-xl bg-secondary/30 border border-border/20">
                          <div className="flex items-center gap-2 min-w-0">
                            {cat && <cat.icon className={`w-4 h-4 ${cat.color} shrink-0`} />}
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">{cat?.label || h.category}</p>
                              <p className="text-[10px] text-muted-foreground">{new Date(h.created_at).toLocaleDateString("ar")}</p>
                            </div>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                            pct >= 80 ? "bg-emerald-500/15 text-emerald-400" :
                            pct >= 50 ? "bg-amber-500/15 text-amber-400" :
                            "bg-red-500/15 text-red-400"
                          }`}>
                            {h.score}/{h.total_questions}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* QUIZ */}
        {step === "quiz" && current && (
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
                <span className="text-muted-foreground">سؤال {currentIdx + 1}/{questions.length}</span>
                <div className="flex items-center gap-2">
                  {streak >= 2 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                      <Flame className="w-3 h-3" /> {streak}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border ${
                    timeLeft <= 5 ? "bg-red-500/15 text-red-400 border-red-500/30 animate-pulse" :
                    "bg-primary/10 text-primary border-primary/30"
                  }`}>
                    <Timer className="w-3 h-3" /> {timeLeft}ث
                  </span>
                  <span className="text-primary font-medium">{score} ✓</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-secondary/40 overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
              </div>
              <div className="h-1 rounded-full bg-secondary/40 overflow-hidden">
                <div className={`h-full transition-all ${timeLeft <= 5 ? "bg-red-500" : "bg-amber-400"}`}
                  style={{ width: `${(timeLeft / perQuestionTime) * 100}%` }} />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-foreground leading-relaxed">{current.question}</h3>

              {current.question_type === "mcq" ? (
                <div className="space-y-2">
                  {current.options.map((opt, i) => {
                    const ans = answers[current.id];
                    const isPicked = ans?.picked === i;
                    const isCorrect = i === current.correct_index;
                    let cls = "border-border/30 bg-card/40 hover:bg-card/60";
                    if (showExplanation) {
                      if (isCorrect) cls = "border-emerald-500/40 bg-emerald-500/10";
                      else if (isPicked) cls = "border-red-500/40 bg-red-500/10";
                      else cls = "border-border/20 bg-card/20 opacity-60";
                    }
                    return (
                      <button key={i} onClick={() => handleMcqAnswer(i)} disabled={showExplanation}
                        className={`w-full p-3 rounded-xl border text-right transition-all flex items-center gap-3 ${cls}`}>
                        <span className="w-7 h-7 rounded-lg bg-secondary/40 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1 text-xs sm:text-sm">{opt}</span>
                        {showExplanation && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        {showExplanation && isPicked && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-secondary/30 border border-border/20 text-xs sm:text-sm">
                    <p className="text-xs text-primary mb-1 font-bold">التحدي:</p>
                    {current.challenge_prompt}
                  </div>
                  <Textarea value={challengeText} onChange={e => setChallengeText(e.target.value)}
                    rows={5} placeholder="اكتب إجابتك أو الكود..." disabled={showExplanation}
                    className="font-mono text-xs sm:text-sm" />
                  {!showExplanation && (
                    <Button onClick={evaluateChallenge} disabled={!challengeText.trim() || evaluating} className="w-full gap-2">
                      {evaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      تقييم بالذكاء الاصطناعي
                    </Button>
                  )}
                </div>
              )}

              {showExplanation && current.explanation && (
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs sm:text-sm">
                  <p className="text-xs text-primary mb-1 font-bold">شرح:</p>{current.explanation}
                </div>
              )}
              {showExplanation && (
                <Button onClick={next} className="w-full gap-2">
                  {currentIdx + 1 < questions.length ? "السؤال التالي" : "عرض النتيجة"}
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* RESULT */}
        {step === "result" && (
          <Card className="border-primary/30 bg-card/60">
            <CardContent className="p-6 sm:p-8 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">انتهى الاختبار!</h2>
              <p className="text-4xl font-bold text-primary">{score} / {questions.length}</p>
              <p className="text-sm text-muted-foreground">
                {score === questions.length ? "ممتاز! درجة كاملة 🎉" :
                 score >= questions.length * 0.7 ? "أداء جيد جداً" :
                 score >= questions.length * 0.5 ? "جيد، استمر" : "تحتاج لمزيد من الممارسة"}
              </p>
              {newBadges.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <p className="text-xs font-bold text-amber-400 mb-2 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3" /> شارات جديدة!
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {newBadges.map((b, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        ⭐ {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Button onClick={reset} variant="outline" className="flex-1">اختبار جديد</Button>
                <Button onClick={() => navigate("/")} className="flex-1">الرئيسية</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default QuizPage;
