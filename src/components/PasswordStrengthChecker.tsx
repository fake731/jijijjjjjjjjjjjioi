import { useState, useEffect } from "react";
import { Shield, Eye, EyeOff, Copy, Check, Lightbulb } from "lucide-react";

interface Props {
  externalPassword?: string;
}

const PasswordStrengthChecker = ({ externalPassword }: Props) => {
  const [password, setPassword] = useState(externalPassword || "");
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
    if (!password) return { label: "ادخل كلمة المرور", color: "text-muted-foreground" };
    if (score < 30) return { label: "ضعيفة جدا", color: "text-destructive" };
    if (score < 50) return { label: "ضعيفة", color: "text-destructive" };
    if (score < 70) return { label: "متوسطة", color: "text-orange-500" };
    if (score < 90) return { label: "قوية", color: "text-green-500" };
    return { label: "قوية جدا", color: "text-green-400" };
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
    { key: "length8", label: "8 احرف على الاقل", met: checks.length8 },
    { key: "length12", label: "12 حرف او اكثر", met: checks.length12 },
    { key: "uppercase", label: "احرف كبيرة (A-Z)", met: checks.uppercase },
    { key: "lowercase", label: "احرف صغيرة (a-z)", met: checks.lowercase },
    { key: "numbers", label: "ارقام (0-9)", met: checks.numbers },
    { key: "special", label: "رموز خاصة (!@#$%)", met: checks.special },
    { key: "noRepeat", label: "بدون تكرار متتالي", met: checks.noRepeat },
    { key: "mixed", label: "مزيج كامل من الانواع", met: checks.mixed },
  ];

  const getSuggestions = () => {
    const suggestions: string[] = [];
    if (!checks.length8) suggestions.push("اجعل كلمة المرور 8 احرف على الاقل");
    if (!checks.length12) suggestions.push("يفضل ان تكون 12 حرف او اكثر لحماية افضل");
    if (!checks.uppercase) suggestions.push("اضف احرف كبيرة مثل: A, B, C");
    if (!checks.lowercase) suggestions.push("اضف احرف صغيرة مثل: a, b, c");
    if (!checks.numbers) suggestions.push("اضف ارقام مثل: 1, 2, 3");
    if (!checks.special) suggestions.push("اضف رموز خاصة مثل: @, #, $, %, !");
    if (!checks.noRepeat) suggestions.push("تجنب تكرار نفس الحرف اكثر من مرتين متتاليتين");
    if (!checks.noSequence) suggestions.push("تجنب التسلسلات مثل: 123, abc");
    if (!checks.mixed) suggestions.push("استخدم مزيج من الاحرف الكبيرة والصغيرة والارقام والرموز");
    return suggestions;
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const suggestions = password ? getSuggestions() : [];

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
          placeholder="ادخل كلمة المرور هنا..."
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
              <span>{c.met ? "✓" : "✗"}</span>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {password && suggestions.length > 0 && score < 90 && (
        <div className="mt-6 p-5 rounded-xl bg-orange-500/10 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-orange-500">نصائح لتحسين كلمة المرور</h3>
          </div>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default PasswordStrengthChecker;
