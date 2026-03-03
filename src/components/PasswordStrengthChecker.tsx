import { useState } from "react";
import { Shield, Eye, EyeOff, Copy, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const checkStrength = (pwd: string) => {
    let score = 0;
    const checks = {
      length8: pwd.length >= 8,
      length12: pwd.length >= 12,
      length16: pwd.length >= 16,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pwd),
      noRepeat: !/(.)\1{2,}/.test(pwd),
      noSequence: !/(?:abc|bcd|cde|def|efg|123|234|345|456|567|678|789)/i.test(pwd),
      mixed: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/.test(pwd),
    };

    if (checks.length8) score += 10;
    if (checks.length12) score += 15;
    if (checks.length16) score += 10;
    if (checks.uppercase) score += 10;
    if (checks.lowercase) score += 10;
    if (checks.numbers) score += 10;
    if (checks.special) score += 15;
    if (checks.noRepeat) score += 5;
    if (checks.noSequence) score += 5;
    if (checks.mixed) score += 10;

    return { score: Math.min(score, 100), checks };
  };

  const { score, checks } = checkStrength(password);

  const getStrengthLabel = () => {
    if (!password) return { label: "أدخل كلمة المرور", color: "text-muted-foreground" };
    if (score < 30) return { label: "ضعيفة جداً 😰", color: "text-destructive" };
    if (score < 50) return { label: "ضعيفة 😟", color: "text-destructive" };
    if (score < 70) return { label: "متوسطة 🤔", color: "text-orange-500" };
    if (score < 90) return { label: "قوية 💪", color: "text-green-500" };
    return { label: "قوية جداً 🔒", color: "text-green-400" };
  };

  const getProgressColor = () => {
    if (score < 30) return "bg-destructive";
    if (score < 50) return "bg-destructive/80";
    if (score < 70) return "bg-orange-500";
    if (score < 90) return "bg-green-500";
    return "bg-green-400";
  };

  const { label, color } = getStrengthLabel();

  const criteriaList = [
    { key: "length8", label: "8 أحرف على الأقل", met: checks.length8 },
    { key: "length12", label: "12 حرف أو أكثر", met: checks.length12 },
    { key: "uppercase", label: "أحرف كبيرة (A-Z)", met: checks.uppercase },
    { key: "lowercase", label: "أحرف صغيرة (a-z)", met: checks.lowercase },
    { key: "numbers", label: "أرقام (0-9)", met: checks.numbers },
    { key: "special", label: "رموز خاصة (!@#$%)", met: checks.special },
    { key: "noRepeat", label: "بدون تكرار متتالي", met: checks.noRepeat },
    { key: "mixed", label: "مزيج كامل من الأنواع", met: checks.mixed },
  ];

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cyber-card p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">اختبار قوة كلمة المرور</h2>
          <p className="text-muted-foreground text-sm">افحص مدى قوة كلمة مرورك</p>
        </div>
      </div>

      {/* Input */}
      <div className="relative mb-6">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="أدخل كلمة المرور هنا..."
          className="w-full h-14 px-4 pr-24 rounded-xl border border-border bg-background text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-ring font-mono"
          dir="ltr"
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
          </button>
          {password && (
            <button onClick={copyPassword} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {password && (
        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center">
            <span className={`text-lg font-bold ${color}`}>{label}</span>
            <span className="text-muted-foreground text-sm">{score}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      )}

      {/* Criteria */}
      {password && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {criteriaList.map((c) => (
            <div
              key={c.key}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                c.met ? "bg-green-500/10 text-green-500" : "bg-secondary text-muted-foreground"
              }`}
            >
              <span>{c.met ? "✅" : "❌"}</span>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Time to crack estimation */}
      {password && (
        <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border/50">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">وقت الكسر التقريبي: </span>
            {score < 30 && "أقل من ثانية ⚡"}
            {score >= 30 && score < 50 && "بضع دقائق ⏱️"}
            {score >= 50 && score < 70 && "بضع ساعات إلى أيام 📅"}
            {score >= 70 && score < 90 && "سنوات 📆"}
            {score >= 90 && "ملايين السنين 🔐"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthChecker;
