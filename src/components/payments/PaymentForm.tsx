import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { usePaymentSettings } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Check, Loader2, ShieldCheck, Upload, Lock } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  kind: "subscription" | "donation";
  planKey?: string;
  amount?: number;
  onDone?: () => void;
}

const CopyRow = ({ label, value }: { label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/20 bg-background/50 px-3 py-2.5">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-mono text-foreground truncate" dir="ltr">{value}</span>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
        title="نسخ"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-primary" />}
      </button>
    </div>
  );
};

const PaymentForm = ({ kind, planKey, amount, onDone }: Props) => {
  const { user } = useAuth();
  const settings = usePaymentSettings();
  const [sender, setSender] = useState("");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [custom, setCustom] = useState<string>(amount ? String(amount) : "5");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const finalAmount = kind === "subscription" ? Number(amount || 0) : Number(custom || 0);

  if (!user) {
    return (
      <div className="rounded-xl border border-primary/20 bg-background/50 p-5 text-center space-y-3">
        <Lock className="w-6 h-6 text-primary mx-auto" />
        <p className="text-sm text-muted-foreground">سجّل الدخول أولاً لإتمام عملية الدفع.</p>
        <Link to="/تسجيل-الدخول">
          <Button size="sm">تسجيل الدخول</Button>
        </Link>
      </div>
    );
  }

  const submit = async () => {
    if (!finalAmount || finalAmount <= 0) {
      toast.error("أدخل مبلغاً صحيحاً");
      return;
    }
    if (!sender.trim()) {
      toast.error("أدخل اسم المُحوِّل");
      return;
    }
    setBusy(true);
    try {
      let proofPath: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() || "png";
        const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("payment-proofs").upload(path, file, {
          upsert: false,
          contentType: file.type || undefined,
        });
        if (upErr) throw upErr;
        proofPath = path;
      }
      const { error } = await supabase.from("payment_requests").insert({
        user_id: user.id,
        user_email: user.email,
        kind,
        plan_key: kind === "subscription" ? planKey : null,
        amount_usd: finalAmount,
        sender_name: sender.trim(),
        transfer_reference: reference.trim() || null,
        proof_path: proofPath,
        note: note.trim() || null,
        status: "pending",
      });
      if (error) throw error;
      toast.success("تم إرسال طلبك، سيتم التفعيل بعد مراجعة التحويل");
      setSender("");
      setReference("");
      setNote("");
      setFile(null);
      onDone?.();
    } catch (e: any) {
      toast.error(e.message || "تعذّر إرسال الطلب");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="space-y-2">
        <CopyRow label="الآيبان" value={settings?.iban || ""} />
        <CopyRow label="رقم الحساب" value={settings?.account_number || ""} />
        <CopyRow label="اسم صاحب الحساب" value={settings?.account_holder || ""} />
        {settings?.bank_name ? <CopyRow label="البنك" value={settings.bank_name} /> : null}
      </div>

      {settings?.instructions && (
        <p className="text-xs text-muted-foreground leading-relaxed">{settings.instructions}</p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs">المبلغ بالدولار</Label>
          <Input
            type="number"
            min={1}
            value={kind === "subscription" ? amount : custom}
            onChange={(e) => setCustom(e.target.value)}
            disabled={kind === "subscription"}
            dir="ltr"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">اسم المُحوِّل</Label>
          <Input value={sender} onChange={(e) => setSender(e.target.value)} placeholder="الاسم كما في التحويل" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">رقم مرجع التحويل</Label>
          <Input value={reference} onChange={(e) => setReference(e.target.value)} dir="ltr" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">صورة إشعار التحويل</Label>
          <label className="flex items-center gap-2 h-10 px-3 rounded-md border border-input bg-background/40 cursor-pointer text-xs text-muted-foreground hover:border-primary/40 transition-colors">
            <Upload className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{file ? file.name : "اختر صورة أو ملف"}</span>
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">ملاحظة</Label>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
      </div>

      <div className="flex items-start gap-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>الاتصال مشفّر (TLS) وملفات الإثبات تُخزَّن في مساحة خاصة مقفلة لا يصل إليها إلا أنت وقصي عبر روابط مؤقتة موقّعة.</p>
      </div>

      <Button onClick={submit} disabled={busy} className="w-full gap-2">
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
        {kind === "subscription" ? "أرسل إثبات الدفع وفعّل الاشتراك" : "أرسل الدعم"}
      </Button>
    </div>
  );
};

export default PaymentForm;
