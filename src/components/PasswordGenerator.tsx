import { useState, useCallback } from "react";
import { Wand2, Copy, Check, RefreshCw, Settings2, User, ArrowUp, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  onTestPassword?: (password: string) => void;
}

const PasswordGenerator = ({ onTestPassword }: Props) => {
  const { user, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [length, setLength] = useState(16);
  const [name, setName] = useState("");
  const [useNameBase, setUseNameBase] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  const leetMap: Record<string, string> = {
    a: "@", e: "3", i: "!", o: "0", s: "$", t: "7", l: "1", g: "9", b: "8",
  };

  const generateFromName = useCallback(() => {
    if (!name.trim()) return;
    const cleanName = name.trim().replace(/\s+/g, "");
    
    // Transform name with leet speak
    let base = "";
    for (const char of cleanName) {
      const lower = char.toLowerCase();
      if (Math.random() > 0.5 && leetMap[lower]) {
        base += leetMap[lower];
      } else if (Math.random() > 0.5) {
        base += char.toUpperCase();
      } else {
        base += char.toLowerCase();
      }
    }

    // Add random numbers and symbols to reach desired length
    const extras = "!@#$%^&*0123456789";
    while (base.length < length) {
      base += extras[Math.floor(Math.random() * extras.length)];
    }

    // Trim if too long, then shuffle middle part (keep first 2 recognizable)
    base = base.slice(0, length);
    const first = base.slice(0, 2);
    const last = base.slice(2);
    const shuffled = last.split("").sort(() => Math.random() - 0.5).join("");
    
    setPassword(first + shuffled);
  }, [name, length]);

  const generate = useCallback(() => {
    let chars = "";
    const selected = Object.entries(options).filter(([, v]) => v);
    if (selected.length === 0) return;

    selected.forEach(([key]) => {
      chars += charSets[key as keyof typeof charSets];
    });

    let result = "";
    selected.forEach(([key]) => {
      const set = charSets[key as keyof typeof charSets];
      result += set[Math.floor(Math.random() * set.length)];
    });

    for (let i = result.length; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(
      result.split("").sort(() => Math.random() - 0.5).join("")
    );
  }, [length, options]);

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleOption = (key: keyof typeof options) => {
    const newOptions = { ...options, [key]: !options[key] };
    if (Object.values(newOptions).every((v) => !v)) return;
    setOptions(newOptions);
  };

  const activeCount = Object.values(options).filter(Boolean).length;
  const strength =
    length >= 20 && activeCount >= 3
      ? { label: "قوية جداً", color: "text-green-400", bg: "bg-green-400" }
      : length >= 12 && activeCount >= 3
        ? { label: "قوية", color: "text-green-500", bg: "bg-green-500" }
        : length >= 8 && activeCount >= 2
          ? { label: "متوسطة", color: "text-orange-500", bg: "bg-orange-500" }
          : { label: "ضعيفة", color: "text-destructive", bg: "bg-destructive" };

  const optionsList = [
    { key: "uppercase" as const, label: "أحرف كبيرة (A-Z)", icon: "AB" },
    { key: "lowercase" as const, label: "أحرف صغيرة (a-z)", icon: "ab" },
    { key: "numbers" as const, label: "أرقام (0-9)", icon: "12" },
    { key: "symbols" as const, label: "رموز (!@#$)", icon: "#!" },
  ];

  return (
    <div className="cyber-card p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
          <Wand2 className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">مولد كلمات المرور</h2>
          <p className="text-muted-foreground text-sm">أنشئ كلمة مرور قوية وآمنة</p>
        </div>
      </div>

      {/* Generated Password Display */}
      <div className="relative mb-6">
        <div className="w-full min-h-[56px] px-4 pr-24 py-3 rounded-xl border border-border bg-background text-foreground text-lg font-mono flex items-center break-all" dir="ltr">
          {password || <span className="text-muted-foreground">اضغط "توليد" لإنشاء كلمة مرور</span>}
        </div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
          {password && onTestPassword && (
            <button
              onClick={() => { onTestPassword(password); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              title="اختبر القوة"
            >
              <ArrowUp className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          <button
            onClick={copyPassword}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            title="نسخ"
          >
            {copied ? (
              <Check className="w-5 h-5 text-primary" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Strength Indicator */}
      {password && (
        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-bold ${strength.color}`}>{strength.label}</span>
            <span className="text-muted-foreground text-xs">{password.length} حرف</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${strength.bg}`}
              style={{
                width: `${Math.min(100, (length / 32) * 100 * (activeCount / 4) * 1.5)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setUseNameBase(false)}
          className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
            !useNameBase
              ? "bg-primary/10 border-primary/40 text-primary"
              : "bg-secondary/50 border-border text-muted-foreground"
          }`}
        >
          <RefreshCw className="w-4 h-4 inline-block ml-2" />
          توليد عشوائي
        </button>
        <button
          onClick={() => setUseNameBase(true)}
          className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
            useNameBase
              ? "bg-primary/10 border-primary/40 text-primary"
              : "bg-secondary/50 border-border text-muted-foreground"
          }`}
        >
          <User className="w-4 h-4 inline-block ml-2" />
          من اسمك
        </button>
      </div>

      {/* Settings */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Settings2 className="w-4 h-4" />
          <span className="text-sm font-medium">خيارات التخصيص</span>
        </div>

        {/* Name Input (when name-based mode) */}
        {useNameBase && (
          <div className="space-y-2">
            <label className="text-sm text-foreground font-medium">ادخل اسمك أو كلمة مفتاحية</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={!loading && !user ? "سجل دخول أولاً" : "مثال: Qusay"}
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono"
              dir="ltr"
              disabled={!loading && !user}
              maxLength={30}
            />
            <p className="text-xs text-muted-foreground">
              سيتم تحويل اسمك إلى كلمة مرور قوية باستخدام رموز وأرقام بديلة
            </p>
          </div>
        )}

        {/* Length Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm text-foreground font-medium">طول كلمة المرور</label>
            <span className="text-lg font-bold text-primary font-mono w-10 text-center">{length}</span>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 rounded-full bg-secondary appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>6</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Options (random mode only) */}
        {!useNameBase && (
          <div className="grid grid-cols-2 gap-3">
            {optionsList.map((opt) => (
              <button
                key={opt.key}
                onClick={() => toggleOption(opt.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-sm ${
                  options[opt.key]
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "bg-secondary/50 border-border text-muted-foreground hover:border-border/80"
                }`}
              >
                <span className="font-mono text-xs font-bold w-6">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={useNameBase ? generateFromName : generate}
          disabled={!user || (useNameBase && !name.trim())}
          className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className="w-5 h-5" />
          <span>{useNameBase ? "توليد من الاسم" : "توليد كلمة مرور"}</span>
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
