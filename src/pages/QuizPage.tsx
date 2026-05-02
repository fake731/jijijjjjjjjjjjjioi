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
  Globe, Database, Terminal, Lock, KeyRound, FileCode, Server, Smartphone, Wifi, Binary
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
  { id: "wireless", label: "اختراق الشبكات اللاسلكية", icon: Wifi, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/30" },
  { id: "reverse_engineering", label: "الهندسة العكسية", icon: Binary, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
];

const LEVELS = [
  { id: "easy", label: "سهل", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: "medium", label: "متوسط", color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: "hard", label: "متقدم", color: "text-red-400", bg: "bg-red-500/10" },
];

const QuizPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"select" | "quiz" | "result">("select");
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { picked: number; correct: boolean; challengeText?: string; aiScore?: number }>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [challengeText, setChallengeText] = useState("");
  const [evaluating, setEvaluating] = useState(false);

  const startQuiz = async () => {
    if (!user) {
      toast.error("يجب تسجيل الدخول لإجراء الاختبار");
      navigate("/تسجيل-الدخول");
      return;
    }
    if (!category || !difficulty) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("category", category)
      .eq("difficulty", difficulty)
      .limit(10);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    if (!data || data.length === 0) {
      toast.error("لا توجد أسئلة في هذا التخصص حالياً. اطلب من المطور إضافتها.");
      return;
    }
    setQuestions((data as any).map((q: any) => ({
      ...q,
      options: Array.isArray(q.options) ? q.options : []
    })));
    setCurrentIdx(0);
    setAnswers({});
    setShowExplanation(false);
    setChallengeText("");
    setStep("quiz");
  };

  const current = questions[currentIdx];

  const handleMcqAnswer = (idx: number) => {
    if (!current || showExplanation) return;
    const correct = idx === current.correct_index;
    setAnswers(prev => ({ ...prev, [current.id]: { picked: idx, correct } }));
    setShowExplanation(true);
  };

  const evaluateChallenge = async () => {
    if (!current || !challengeText.trim()) return;
    setEvaluating(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: {
          message: `أنت مُقيّم اختبار. التحدي: "${current.challenge_prompt}". إجابة المستخدم: "${challengeText}". قيّم من 0 إلى 10 وأعد JSON فقط بهذا الشكل: {"score": رقم, "feedback": "ملاحظات قصيرة"}`,
          conversation_id: null,
          history: [],
        },
      });
      let score = 0, feedback = "تم التقييم";
      try {
        const txt = (data?.response || "").match(/\{[\s\S]*\}/)?.[0];
        if (txt) {
          const parsed = JSON.parse(txt);
          score = Math.max(0, Math.min(10, Number(parsed.score) || 0));
          feedback = String(parsed.feedback || feedback);
        }
      } catch {}
      setAnswers(prev => ({
        ...prev,
        [current.id]: {
          picked: -1,
          correct: score >= 6,
          challengeText,
          aiScore: score,
        }
      }));
      toast.success(`النتيجة: ${score}/10 — ${feedback}`);
      setShowExplanation(true);
    } catch (e: any) {
      toast.error("تعذر التقييم. حاول لاحقاً.");
    } finally {
      setEvaluating(false);
    }
  };

  const next = async () => {
    setShowExplanation(false);
    setChallengeText("");
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // finalize
      const score = Object.values(answers).filter(a => a.correct).length;
      if (user) {
        await supabase.from("quiz_attempts").insert({
          user_id: user.id,
          category,
          difficulty,
          score,
          total_questions: questions.length,
          details: Object.entries(answers).map(([qid, v]) => ({ qid, ...v })),
        });
      }
      setStep("result");
    }
  };

  const reset = () => {
    setStep("select");
    setCategory("");
    setDifficulty("");
    setQuestions([]);
    setAnswers({});
    setCurrentIdx(0);
  };

  const score = Object.values(answers).filter(a => a.correct).length;

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl" dir="rtl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-xs text-primary font-medium">قسم الاختبار</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">اختبر معلوماتك</h1>
          <p className="text-muted-foreground text-sm">أسئلة متعددة الخيارات وتحديات عملية بتقييم AI</p>
        </div>

        {!user && step === "select" && (
          <Card className="border-amber-500/30 bg-amber-500/5 backdrop-blur-xl mb-6">
            <CardContent className="p-4 flex items-center gap-3">
              <LogIn className="w-5 h-5 text-amber-500 shrink-0" />
              <p className="text-sm flex-1">سجّل دخول لبدء الاختبار وحفظ نتائجك.</p>
              <Button size="sm" onClick={() => navigate("/تسجيل-الدخول")}>تسجيل الدخول</Button>
            </CardContent>
          </Card>
        )}

        {/* SELECT */}
        {step === "select" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-bold text-foreground mb-3">اختر التخصص</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORIES.map(c => {
                  const Icon = c.icon;
                  const active = category === c.id;
                  const locked = !user;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        if (locked) {
                          toast.error("سجّل دخول لاختيار التخصص");
                          navigate("/تسجيل-الدخول");
                          return;
                        }
                        setCategory(c.id);
                      }}
                      className={`relative p-4 rounded-2xl border backdrop-blur-xl transition-all text-right ${
                        active
                          ? `${c.bg} ${c.border} shadow-lg scale-[1.02]`
                          : locked
                            ? "border-border/20 bg-card/30 opacity-60 cursor-not-allowed"
                            : "border-border/30 bg-card/40 hover:bg-card/60"
                      }`}
                    >
                      {locked && (
                        <Lock className="absolute top-2 left-2 w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center mb-2`}>
                        <Icon className={`w-5 h-5 ${c.color}`} />
                      </div>
                      <p className="font-bold text-foreground text-sm">{c.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-foreground mb-3">اختر المستوى</h2>
              <div className="grid grid-cols-3 gap-3">
                {LEVELS.map(l => {
                  const active = difficulty === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setDifficulty(l.id)}
                      className={`p-4 rounded-2xl border backdrop-blur-xl transition-all ${
                        active
                          ? `${l.bg} border-current ${l.color} scale-[1.02]`
                          : "border-border/30 bg-card/40 text-foreground hover:bg-card/60"
                      }`}
                    >
                      <p className="font-bold text-sm">{l.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={startQuiz}
              disabled={!category || !difficulty || loading}
              className="w-full h-12 gap-2"
              size="lg"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              بدء الاختبار
            </Button>
          </div>
        )}

        {/* QUIZ */}
        {step === "quiz" && current && (
          <Card className="border-border/30 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">سؤال {currentIdx + 1} من {questions.length}</span>
                <span className="text-primary font-medium">النتيجة: {score}</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary/40 overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
              </div>

              <h3 className="text-lg font-bold text-foreground leading-relaxed">{current.question}</h3>

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
                      <button
                        key={i}
                        onClick={() => handleMcqAnswer(i)}
                        disabled={showExplanation}
                        className={`w-full p-3 rounded-xl border text-right transition-all flex items-center gap-3 ${cls}`}
                      >
                        <span className="w-7 h-7 rounded-lg bg-secondary/40 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1 text-sm">{opt}</span>
                        {showExplanation && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        {showExplanation && isPicked && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-secondary/30 border border-border/20 text-sm">
                    <p className="text-xs text-primary mb-1 font-bold">التحدي:</p>
                    {current.challenge_prompt}
                  </div>
                  <Textarea
                    value={challengeText}
                    onChange={e => setChallengeText(e.target.value)}
                    rows={5}
                    placeholder="اكتب إجابتك أو الكود هنا..."
                    disabled={showExplanation}
                    className="font-mono text-sm"
                  />
                  {!showExplanation && (
                    <Button
                      onClick={evaluateChallenge}
                      disabled={!challengeText.trim() || evaluating}
                      className="w-full gap-2"
                    >
                      {evaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      تقييم بالذكاء الاصطناعي
                    </Button>
                  )}
                </div>
              )}

              {showExplanation && current.explanation && (
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-sm">
                  <p className="text-xs text-primary mb-1 font-bold">شرح:</p>
                  {current.explanation}
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
          <Card className="border-primary/30 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">انتهى الاختبار!</h2>
              <p className="text-4xl font-bold text-primary">{score} / {questions.length}</p>
              <p className="text-sm text-muted-foreground">
                {score === questions.length ? "ممتاز! درجة كاملة 🎉" :
                 score >= questions.length * 0.7 ? "أداء جيد جداً" :
                 score >= questions.length * 0.5 ? "أداء جيد، استمر" :
                 "تحتاج لمزيد من الممارسة"}
              </p>
              <div className="flex gap-2">
                <Button onClick={reset} variant="outline" className="flex-1">اختبار جديد</Button>
                <Button onClick={() => navigate("/")} className="flex-1">العودة للرئيسية</Button>
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