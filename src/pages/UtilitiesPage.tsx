import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ShareButton from "@/components/ShareButton";
import QRCode from "qrcode";
import {
  Binary, Lock, Unlock, QrCode, Link2, Copy, Check, ArrowLeftRight,
  ShieldCheck, ShieldAlert, ExternalLink, Wrench,
  Fingerprint, FileKey, Hash, Braces, Clock, Type, Palette, Network,
} from "lucide-react";

/* ---------- shared bits ---------- */

const CopyBtn = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "تم النسخ" : "نسخ"}
    </button>
  );
};

const inputCls =
  "w-full rounded-xl bg-background/60 border border-primary/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors font-mono";

/* ---------- Base64 / Hex converter ---------- */

const Base64HexTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [format, setFormat] = useState<"base64" | "hex">("base64");

  const result = useMemo(() => {
    if (!input) return { text: "", error: "" };
    try {
      if (format === "base64") {
        if (mode === "encode") {
          return { text: btoa(unescape(encodeURIComponent(input))), error: "" };
        }
        return { text: decodeURIComponent(escape(atob(input.trim()))), error: "" };
      }
      if (mode === "encode") {
        const bytes = new TextEncoder().encode(input);
        return { text: Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join(""), error: "" };
      }
      const clean = input.replace(/[^0-9a-fA-F]/g, "");
      if (clean.length % 2 !== 0) throw new Error();
      const bytes = new Uint8Array(clean.match(/.{2}/g)!.map((h) => parseInt(h, 16)));
      return { text: new TextDecoder().decode(bytes), error: "" };
    } catch {
      return { text: "", error: "المدخل غير صالح لعملية فك الترميز" };
    }
  }, [input, mode, format]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["base64", "hex"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
              format === f ? "bg-primary/20 border-primary/60 text-primary" : "bg-card/40 border-border/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "base64" ? "Base64" : "Hex"}
          </button>
        ))}
        <button
          onClick={() => setMode((m) => (m === "encode" ? "decode" : "encode"))}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-secondary/60 border border-border/40 text-foreground hover:border-primary/40 transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4" />
          {mode === "encode" ? "الوضع: ترميز" : "الوضع: فك ترميز"}
        </button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder={mode === "encode" ? "اكتب النص المراد ترميزه..." : "الصق النص المرمّز..."}
        className={inputCls}
        dir="auto"
      />
      <div className="rounded-xl bg-card/40 border border-primary/15 p-4 min-h-[80px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">النتيجة</span>
          {result.text && <CopyBtn text={result.text} />}
        </div>
        {result.error ? (
          <p className="text-sm text-destructive">{result.error}</p>
        ) : (
          <p className="text-sm font-mono break-all text-foreground" dir="auto">{result.text || "—"}</p>
        )}
      </div>
    </div>
  );
};

/* ---------- AES encrypt / decrypt (Web Crypto: PBKDF2 + AES-GCM) ---------- */

const deriveKey = async (password: string, salt: BufferSource) => {
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

const toB64 = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf instanceof Uint8Array ? buf : new Uint8Array(buf))));
const fromB64 = (s: string): Uint8Array<ArrayBuffer> => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

const EncryptTool = () => {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [noPassword, setNoPassword] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async (encrypt: boolean) => {
    setError("");
    setOutput("");
    if (!text || (!noPassword && !password)) { setError(noPassword ? "أدخل النص" : "أدخل النص وكلمة المرور"); return; }
    setBusy(true);
    try {
      if (encrypt) {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        if (noPassword) {
          // مفتاح عشوائي مضمّن داخل الناتج — مناسب للإخفاء السريع فقط
          const rawKey = crypto.getRandomValues(new Uint8Array(32));
          const key = await crypto.subtle.importKey("raw", rawKey, "AES-GCM", false, ["encrypt"]);
          const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(text));
          setOutput(`QK2.${toB64(rawKey)}.${toB64(iv)}.${toB64(cipher)}`);
        } else {
          const salt = crypto.getRandomValues(new Uint8Array(16));
          const key = await deriveKey(password, salt);
          const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(text));
          setOutput(`QK1.${toB64(salt)}.${toB64(iv)}.${toB64(cipher)}`);
        }
      } else {
        const parts = text.trim().split(".");
        if (parts.length !== 4) throw new Error();
        if (parts[0] === "QK2") {
          const key = await crypto.subtle.importKey("raw", fromB64(parts[1]), "AES-GCM", false, ["decrypt"]);
          const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(parts[2]) }, key, fromB64(parts[3]));
          setOutput(new TextDecoder().decode(plain));
        } else if (parts[0] === "QK1") {
          const key = await deriveKey(password, fromB64(parts[1]));
          const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(parts[2]) }, key, fromB64(parts[3]));
          setOutput(new TextDecoder().decode(plain));
        } else throw new Error();
      }
    } catch {
      setError("فشلت العملية — تأكد من كلمة المرور والنص المشفّر");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 border border-primary/20 rounded-xl px-4 py-2.5">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
        تشفير AES-256-GCM حقيقي عبر Web Crypto — كل المعالجة تتم على جهازك ولا يُرسل أي شيء للخادم.
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none">
        <input
          type="checkbox"
          checked={noPassword}
          onChange={(e) => { setNoPassword(e.target.checked); setError(""); }}
          className="w-4 h-4 accent-[hsl(var(--primary))]"
        />
        تشفير بدون كلمة مرور (المفتاح يُولَّد تلقائياً ويُدمج داخل الناتج)
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="النص المراد تشفيره أو النص المشفّر لفكّه..."
        className={inputCls}
        dir="auto"
      />
      {!noPassword && (
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          className={inputCls}
        />
      )}
      {noPassword && (
        <p className="text-[11px] text-amber-400">
          تنبيه: بدون كلمة مرور يكون المفتاح داخل النص المشفّر — مناسب للإخفاء السريع وليس لحماية بيانات حساسة.
        </p>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => run(true)}
          disabled={busy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Lock className="w-4 h-4" /> تشفير
        </button>
        <button
          onClick={() => run(false)}
          disabled={busy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary/60 border border-primary/30 text-foreground text-sm font-medium hover:border-primary/60 transition-colors disabled:opacity-50"
        >
          <Unlock className="w-4 h-4" /> فك التشفير
        </button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {output && (
        <div className="rounded-xl bg-card/40 border border-primary/15 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">النتيجة</span>
            <CopyBtn text={output} />
          </div>
          <p className="text-sm font-mono break-all text-foreground" dir="auto">{output}</p>
        </div>
      )}
    </div>
  );
};


/* ---------- QR generator ---------- */

const QrTool = () => {
  const [text, setText] = useState("");
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (!text.trim()) { setDataUrl(""); return; }
    const t = setTimeout(() => {
      QRCode.toDataURL(text, { width: 512, margin: 2, color: { dark: "#000000", light: "#ffffff" } })
        .then(setDataUrl)
        .catch(() => setDataUrl(""));
    }, 250);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="اكتب رابطاً أو نصاً لتوليد رمز QR..."
        className={inputCls}
        dir="auto"
      />
      {dataUrl ? (
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="p-4 rounded-2xl bg-white shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)]">
            <img src={dataUrl} alt="QR Code" className="w-48 h-48 md:w-56 md:h-56" />
          </div>
          <a
            href={dataUrl}
            download="qr-code.png"
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            تحميل PNG
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-10 text-muted-foreground/50">
          <QrCode className="w-12 h-12" />
          <p className="text-sm">سيظهر رمز QR هنا فور الكتابة</p>
        </div>
      )}
    </div>
  );
};

/* ---------- Link checker ---------- */

interface LinkReport {
  valid: boolean;
  url?: URL;
  issues: string[];
  positives: string[];
  reachable?: boolean | null;
}

const analyzeLink = (raw: string): LinkReport => {
  const issues: string[] = [];
  const positives: string[] = [];
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return { valid: false, issues: ["الرابط غير صالح البنية"], positives };
  }

  if (url.protocol === "https:") positives.push("يستخدم HTTPS (اتصال مشفّر)");
  else issues.push("لا يستخدم HTTPS — الاتصال غير مشفّر");

  const host = url.hostname;
  const shorteners = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "is.gd", "cutt.ly", "rb.gy"];
  if (shorteners.includes(host)) issues.push("رابط مختصر — الوجهة الحقيقية مخفية");

  const suspicious = ["login", "verify", "secure", "account", "update", "bank", "paypal", "confirm", "signin"];
  const full = (host + url.pathname).toLowerCase();
  const hits = suspicious.filter((w) => full.includes(w));
  if (hits.length > 0 && !["github.com", "google.com", "microsoft.com"].includes(host)) {
    issues.push(`يحتوي كلمات شائعة في روابط التصيّد: ${hits.join(", ")}`);
  }

  if (/\d{1,3}(\.\d{1,3}){3}/.test(host)) issues.push("يستخدم عنوان IP مباشر بدلاً من اسم نطاق");
  if ((host.match(/-/g) || []).length >= 3) issues.push("عدد كبير من الشرطات في النطاق — مؤشر شائع للتصيّد");
  if (host.split(".").length > 4) issues.push("نطاقات فرعية كثيرة — قد تخفي النطاق الحقيقي");
  if (url.pathname.length > 100) issues.push("مسار طويل بشكل غير طبيعي");
  if (issues.length === 0) positives.push("لا توجد مؤشرات تصيّد واضحة في البنية");

  return { valid: true, url, issues, positives, reachable: null };
};

const LinkCheckerTool = () => {
  const [raw, setRaw] = useState("");
  const [report, setReport] = useState<LinkReport | null>(null);
  const [checking, setChecking] = useState(false);

  const check = async () => {
    if (!raw.trim()) return;
    const r = analyzeLink(raw.trim());
    setReport(r);
    if (!r.valid || !r.url) return;
    setChecking(true);
    // reachability probe (no-cors: opaque response proves the host answered)
    try {
      await Promise.race([
        fetch(r.url.origin, { mode: "no-cors", cache: "no-store" }),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 6000)),
      ]);
      setReport((prev) => (prev ? { ...prev, reachable: true } : prev));
    } catch {
      setReport((prev) => (prev ? { ...prev, reachable: false } : prev));
    } finally {
      setChecking(false);
    }
  };

  const level = report
    ? !report.valid || report.issues.length >= 2 ? "danger"
    : report.issues.length === 1 ? "warn" : "safe"
    : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="https://example.com"
          className={inputCls}
          dir="ltr"
        />
        <button
          onClick={check}
          disabled={checking}
          className="shrink-0 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {checking ? "جارٍ الفحص..." : "فحص"}
        </button>
      </div>

      {report && (
        <div className={`rounded-2xl border p-5 space-y-4 ${
          level === "safe" ? "border-emerald-500/40 bg-emerald-500/5"
          : level === "warn" ? "border-amber-500/40 bg-amber-500/5"
          : "border-destructive/40 bg-destructive/5"
        }`}>
          <div className="flex items-center gap-3">
            {level === "safe"
              ? <ShieldCheck className="w-6 h-6 text-emerald-500" />
              : <ShieldAlert className={`w-6 h-6 ${level === "warn" ? "text-amber-500" : "text-destructive"}`} />}
            <span className="font-bold text-foreground">
              {!report.valid ? "رابط غير صالح"
                : level === "safe" ? "يبدو آمناً"
                : level === "warn" ? "كن حذراً" : "مؤشرات خطرة"}
            </span>
          </div>

          {report.url && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="rounded-lg bg-background/50 p-2.5"><span className="text-muted-foreground block">النطاق</span><span className="font-mono text-foreground" dir="ltr">{report.url.hostname}</span></div>
              <div className="rounded-lg bg-background/50 p-2.5"><span className="text-muted-foreground block">البروتوكول</span><span className="font-mono text-foreground" dir="ltr">{report.url.protocol.replace(":", "")}</span></div>
              <div className="rounded-lg bg-background/50 p-2.5"><span className="text-muted-foreground block">المسار</span><span className="font-mono text-foreground truncate block" dir="ltr">{report.url.pathname}</span></div>
              <div className="rounded-lg bg-background/50 p-2.5">
                <span className="text-muted-foreground block">إمكانية الوصول</span>
                <span className="text-foreground">
                  {report.reachable === null ? (checking ? "..." : "—") : report.reachable ? "المضيف يستجيب" : "لا يستجيب"}
                </span>
              </div>
            </div>
          )}

          {report.positives.length > 0 && (
            <ul className="space-y-1.5">
              {report.positives.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-emerald-400"><Check className="w-4 h-4 shrink-0 mt-0.5" />{p}</li>
              ))}
            </ul>
          )}
          {report.issues.length > 0 && (
            <ul className="space-y-1.5">
              {report.issues.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-destructive"><ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />{p}</li>
              ))}
            </ul>
          )}
          <p className="text-[11px] text-muted-foreground">هذا الفحص تحليلي للبنية فقط ولا يغني عن الحذر — لا تفتح روابط مشبوهة أبداً.</p>
        </div>
      )}
    </div>
  );
};

/* ---------- Hash generator ---------- */

const HashTool = () => {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<{ algo: string; value: string }[]>([]);

  useEffect(() => {
    if (!text) { setHashes([]); return; }
    const algos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    const data = new TextEncoder().encode(text);
    Promise.all(
      algos.map(async (algo) => ({
        algo,
        value: Array.from(new Uint8Array(await crypto.subtle.digest(algo, data)))
          .map((b) => b.toString(16).padStart(2, "0")).join(""),
      }))
    ).then(setHashes);
  }, [text]);

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="اكتب النص لحساب البصمة..." className={inputCls} dir="auto" />
      {hashes.map((h) => (
        <div key={h.algo} className="rounded-xl bg-card/40 border border-primary/15 p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-primary">{h.algo}</span>
            <CopyBtn text={h.value} />
          </div>
          <p className="text-xs font-mono break-all text-foreground" dir="ltr">{h.value}</p>
        </div>
      ))}
      {!text && <p className="text-sm text-muted-foreground text-center py-6">SHA-1 / SHA-256 / SHA-384 / SHA-512</p>}
    </div>
  );
};

/* ---------- JWT decoder ---------- */

const JwtTool = () => {
  const [token, setToken] = useState("");
  const parsed = useMemo(() => {
    if (!token.trim()) return null;
    try {
      const [h, p] = token.trim().split(".");
      const dec = (s: string) => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))));
      const payload = dec(p);
      const exp = payload.exp ? new Date(payload.exp * 1000) : null;
      return { header: dec(h), payload, exp, expired: exp ? exp.getTime() < Date.now() : null };
    } catch {
      return { error: true } as any;
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <textarea value={token} onChange={(e) => setToken(e.target.value)} rows={3} placeholder="الصق رمز JWT هنا..." className={inputCls} dir="ltr" />
      {parsed?.error && <p className="text-sm text-destructive">الرمز غير صالح</p>}
      {parsed && !parsed.error && (
        <>
          {parsed.exp && (
            <div className={`rounded-xl px-4 py-2.5 text-sm border ${parsed.expired ? "border-destructive/40 bg-destructive/5 text-destructive" : "border-emerald-500/40 bg-emerald-500/5 text-emerald-400"}`}>
              {parsed.expired ? "منتهي الصلاحية" : "ساري"} — {parsed.exp.toLocaleString("ar")}
            </div>
          )}
          {(["header", "payload"] as const).map((k) => (
            <div key={k} className="rounded-xl bg-card/40 border border-primary/15 p-3">
              <span className="text-xs font-bold text-primary block mb-1.5">{k === "header" ? "الترويسة" : "الحمولة"}</span>
              <pre className="text-xs font-mono text-foreground overflow-x-auto" dir="ltr">{JSON.stringify(parsed[k], null, 2)}</pre>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

/* ---------- URL encoder ---------- */

const UrlTool = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const result = useMemo(() => {
    if (!input) return "";
    try { return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input); }
    catch { return "المدخل غير صالح"; }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setMode((m) => (m === "encode" ? "decode" : "encode"))}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-secondary/60 border border-border/40 text-foreground hover:border-primary/40 transition-colors"
      >
        <ArrowLeftRight className="w-4 h-4" />
        {mode === "encode" ? "الوضع: ترميز URL" : "الوضع: فك ترميز URL"}
      </button>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} placeholder="النص أو الرابط..." className={inputCls} dir="auto" />
      <div className="rounded-xl bg-card/40 border border-primary/15 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">النتيجة</span>
          {result && <CopyBtn text={result} />}
        </div>
        <p className="text-sm font-mono break-all text-foreground" dir="auto">{result || "—"}</p>
      </div>
    </div>
  );
};

/* ---------- UUID / random generator ---------- */

const UuidTool = () => {
  const [count, setCount] = useState(5);
  const [items, setItems] = useState<string[]>([]);
  const gen = () => setItems(Array.from({ length: count }, () => crypto.randomUUID()));
  const genHex = () => setItems(Array.from({ length: count }, () =>
    Array.from(crypto.getRandomValues(new Uint8Array(16))).map((b) => b.toString(16).padStart(2, "0")).join("")
  ));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.min(50, Math.max(1, +e.target.value || 1)))} className="w-24 rounded-xl bg-background/60 border border-primary/20 px-3 py-2 text-sm text-foreground" />
        <button onClick={gen} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">توليد UUID v4</button>
        <button onClick={genHex} className="px-4 py-2 rounded-xl bg-secondary/60 border border-primary/30 text-foreground text-sm hover:border-primary/60 transition-colors">توليد مفتاح Hex</button>
      </div>
      {items.length > 0 && (
        <div className="rounded-xl bg-card/40 border border-primary/15 p-4 space-y-2">
          <div className="flex justify-end"><CopyBtn text={items.join("\n")} /></div>
          {items.map((v) => <p key={v} className="text-xs font-mono break-all text-foreground" dir="ltr">{v}</p>)}
        </div>
      )}
    </div>
  );
};

/* ---------- JSON formatter ---------- */

const JsonTool = () => {
  const [input, setInput] = useState("");
  const res = useMemo(() => {
    if (!input.trim()) return { text: "", error: "" };
    try { return { text: JSON.stringify(JSON.parse(input), null, 2), error: "" }; }
    catch (e: any) { return { text: "", error: e.message || "JSON غير صالح" }; }
  }, [input]);

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={5} placeholder='{"key": "value"}' className={inputCls} dir="ltr" />
      <div className="flex gap-2">
        <button onClick={() => { try { setInput(JSON.stringify(JSON.parse(input))); } catch { /* noop */ } }} className="px-4 py-2 rounded-xl bg-secondary/60 border border-primary/30 text-foreground text-sm hover:border-primary/60 transition-colors">ضغط (Minify)</button>
        <button onClick={() => setInput(res.text || input)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">تنسيق</button>
      </div>
      {res.error ? (
        <p className="text-sm text-destructive">{res.error}</p>
      ) : res.text && (
        <div className="rounded-xl bg-card/40 border border-primary/15 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">النتيجة</span>
            <CopyBtn text={res.text} />
          </div>
          <pre className="text-xs font-mono text-foreground overflow-x-auto" dir="ltr">{res.text}</pre>
        </div>
      )}
    </div>
  );
};

/* ---------- Timestamp converter ---------- */

const TimeTool = () => {
  const [ts, setTs] = useState("");
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  useEffect(() => {
    const i = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(i);
  }, []);

  const parsed = useMemo(() => {
    const v = ts.trim();
    if (!v) return null;
    const n = Number(v);
    const d = !isNaN(n) ? new Date(n > 1e12 ? n : n * 1000) : new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }, [ts]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-card/40 border border-primary/15 p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground block">الوقت الحالي (Unix)</span>
          <span className="text-lg font-mono text-primary" dir="ltr">{now}</span>
        </div>
        <CopyBtn text={String(now)} />
      </div>
      <input value={ts} onChange={(e) => setTs(e.target.value)} placeholder="1735689600 أو 2025-01-01" className={inputCls} dir="ltr" />
      {parsed && (
        <div className="rounded-xl bg-card/40 border border-primary/15 p-4 space-y-2 text-sm">
          <p className="text-foreground">التاريخ المحلي: <span className="text-primary">{parsed.toLocaleString("ar")}</span></p>
          <p className="text-foreground" dir="ltr">ISO: <span className="font-mono text-primary">{parsed.toISOString()}</span></p>
          <p className="text-foreground" dir="ltr">Unix: <span className="font-mono text-primary">{Math.floor(parsed.getTime() / 1000)}</span></p>
        </div>
      )}
    </div>
  );
};

/* ---------- Text analyzer ---------- */

const TextTool = () => {
  const [text, setText] = useState("");
  const stats = useMemo(() => ({
    chars: text.length,
    noSpace: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split("\n").length : 0,
    read: Math.max(1, Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200)),
  }), [text]);

  const transforms: { label: string; fn: (s: string) => string }[] = [
    { label: "أحرف كبيرة", fn: (s) => s.toUpperCase() },
    { label: "أحرف صغيرة", fn: (s) => s.toLowerCase() },
    { label: "عكس النص", fn: (s) => [...s].reverse().join("") },
    { label: "إزالة الفراغات الزائدة", fn: (s) => s.replace(/\s+/g, " ").trim() },
    { label: "سطر واحد", fn: (s) => s.replace(/\n+/g, " ") },
  ];

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="الصق النص هنا..." className={inputCls} dir="auto" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center">
        {[["أحرف", stats.chars], ["بدون فراغ", stats.noSpace], ["كلمات", stats.words], ["أسطر", stats.lines], ["دقائق قراءة", stats.read]].map(([l, v]) => (
          <div key={l as string} className="rounded-xl bg-card/40 border border-primary/15 p-3">
            <span className="block text-lg font-bold text-primary">{v as number}</span>
            <span className="text-[11px] text-muted-foreground">{l as string}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {transforms.map((tr) => (
          <button key={tr.label} onClick={() => setText((s) => tr.fn(s))} className="px-3 py-1.5 rounded-lg text-xs bg-secondary/60 border border-border/40 text-foreground hover:border-primary/50 transition-colors">
            {tr.label}
          </button>
        ))}
        {text && <CopyBtn text={text} />}
      </div>
    </div>
  );
};

/* ---------- Color converter ---------- */

const ColorTool = () => {
  const [hex, setHex] = useState("#22d3ee");
  const rgb = useMemo(() => {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }, [hex]);

  const hsl = useMemo(() => {
    if (!rgb) return null;
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const d = max - min;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
    }
    h = Math.round(h * 60); if (h < 0) h += 360;
    return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
  }, [rgb]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input type="color" value={rgb ? hex : "#000000"} onChange={(e) => setHex(e.target.value)} className="w-14 h-12 rounded-xl bg-transparent border border-primary/20 cursor-pointer" />
        <input value={hex} onChange={(e) => setHex(e.target.value)} className={inputCls} dir="ltr" placeholder="#22d3ee" />
      </div>
      {rgb && hsl ? (
        <div className="space-y-2">
          {[
            ["HEX", hex.startsWith("#") ? hex.toLowerCase() : `#${hex.toLowerCase()}`],
            ["RGB", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`],
            ["HSL", `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`],
            ["CSS Variable", `${hsl.h} ${hsl.s}% ${hsl.l}%`],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-card/40 border border-primary/15 p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-xs text-muted-foreground block">{l}</span>
                <span className="text-sm font-mono text-foreground" dir="ltr">{v}</span>
              </div>
              <CopyBtn text={v} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-destructive">قيمة HEX غير صالحة</p>
      )}
    </div>
  );
};

/* ---------- Subnet calculator ---------- */

const SubnetTool = () => {
  const [input, setInput] = useState("192.168.1.10/24");
  const res = useMemo(() => {
    const m = /^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/.exec(input.trim());
    if (!m) return null;
    const parts = m[1].split(".").map(Number);
    const bits = Number(m[2]);
    if (parts.some((p) => p > 255) || bits > 32) return null;
    const ip = parts.reduce((a, p) => (a << 8) + p, 0) >>> 0;
    const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
    const net = (ip & mask) >>> 0;
    const bcast = (net | (~mask >>> 0)) >>> 0;
    const fmt = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");
    const hosts = bits >= 31 ? 0 : Math.pow(2, 32 - bits) - 2;
    return {
      network: fmt(net), broadcast: fmt(bcast), mask: fmt(mask),
      first: hosts ? fmt(net + 1) : "—", last: hosts ? fmt(bcast - 1) : "—",
      hosts, wildcard: fmt(~mask >>> 0),
    };
  }, [input]);

  return (
    <div className="space-y-4">
      <input value={input} onChange={(e) => setInput(e.target.value)} className={inputCls} dir="ltr" placeholder="192.168.1.10/24" />
      {res ? (
        <div className="grid grid-cols-2 gap-2">
          {[["الشبكة", res.network], ["البث", res.broadcast], ["القناع", res.mask], ["Wildcard", res.wildcard], ["أول مضيف", res.first], ["آخر مضيف", res.last], ["عدد المضيفين", String(res.hosts)]].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-card/40 border border-primary/15 p-3">
              <span className="text-xs text-muted-foreground block">{l}</span>
              <span className="text-sm font-mono text-foreground" dir="ltr">{v}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-destructive">صيغة غير صالحة — استخدم CIDR مثل 10.0.0.1/16</p>
      )}
    </div>
  );
};

/* ---------- Page ---------- */

const tools = [
  { id: "convert", label: "محوّل Base64 / Hex", icon: Binary, color: "text-cyan-400", component: Base64HexTool },
  { id: "crypto", label: "تشفير وفك تشفير", icon: Lock, color: "text-emerald-400", component: EncryptTool },
  { id: "qr", label: "مولّد QR", icon: QrCode, color: "text-violet-400", component: QrTool },
  { id: "link", label: "فاحص الروابط", icon: Link2, color: "text-amber-400", component: LinkCheckerTool },
  { id: "hash", label: "مولّد البصمات Hash", icon: Fingerprint, color: "text-rose-400", component: HashTool },
  { id: "jwt", label: "فاكّ ترميز JWT", icon: FileKey, color: "text-orange-400", component: JwtTool },
  { id: "url", label: "ترميز الروابط URL", icon: Link2, color: "text-sky-400", component: UrlTool },
  { id: "uuid", label: "مولّد UUID ومفاتيح", icon: Hash, color: "text-lime-400", component: UuidTool },
  { id: "json", label: "منسّق JSON", icon: Braces, color: "text-teal-400", component: JsonTool },
  { id: "time", label: "محوّل الوقت Unix", icon: Clock, color: "text-indigo-400", component: TimeTool },
  { id: "text", label: "محلّل النصوص", icon: Type, color: "text-fuchsia-400", component: TextTool },
  { id: "color", label: "محوّل الألوان", icon: Palette, color: "text-pink-400", component: ColorTool },
  { id: "subnet", label: "حاسبة الشبكات", icon: Network, color: "text-yellow-400", component: SubnetTool },
] as const;


const UtilitiesPage = () => {
  const [active, setActive] = useState<(typeof tools)[number]["id"]>("convert");
  const ActiveTool = tools.find((t) => t.id === active)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs />
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Wrench className="w-10 h-10 text-cyan-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">أدوات سريعة</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              أدوات عملية فورية تعمل بالكامل على جهازك — ترميز، تشفير، QR، وفحص روابط
            </p>
            <div className="flex justify-center mt-4">
              <ShareButton title="أدوات سريعة — Qusay_kali" />
            </div>
          </div>

          {/* Tool tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
            {tools.map((t) => {
              const Icon = t.icon;
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-primary/15 border-primary/60 shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)]"
                      : "bg-card/40 border-primary/10 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? t.color : "text-muted-foreground"}`} />
                  <span className={`text-xs font-medium text-center leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active tool */}
          <div className="rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-xl p-5 md:p-7">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/30">
              <ActiveTool.icon className={`w-5 h-5 ${ActiveTool.color}`} />
              <h2 className="text-lg font-bold text-foreground">{ActiveTool.label}</h2>
            </div>
            <ActiveTool.component />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UtilitiesPage;
