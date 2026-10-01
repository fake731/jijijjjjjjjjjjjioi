import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Check, X, FileImage, Wallet, Loader2 } from "lucide-react";

const PaymentsTab = () => {
  const { user } = useAuth();
  const [reqs, setReqs] = useState<any[]>([]);
  const [wds, setWds] = useState<any[]>([]);
  const [filter, setFilter] = useState("pending");
  const [busy, setBusy] = useState<string | null>(null);
  const [wd, setWd] = useState({ amount: "", method: "تحويل بنكي", destination: "", note: "" });

  const load = async () => {
    const [{ data: r }, { data: w }] = await Promise.all([
      supabase.from("payment_requests").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("withdrawals").select("*").order("created_at", { ascending: false }).limit(200),
    ]);
    setReqs(r || []);
    setWds(w || []);
  };
  useEffect(() => { load(); }, []);

  const received = reqs.filter((r) => r.status === "approved").reduce((s, r) => s + Number(r.amount_usd), 0);
  const withdrawn = wds.filter((w) => w.status !== "cancelled").reduce((s, w) => s + Number(w.amount_usd), 0);
  const balance = received - withdrawn;

  const viewProof = async (path: string) => {
    const { data, error } = await supabase.storage.from("payment-proofs").createSignedUrl(path, 120);
    if (error || !data) return toast.error("تعذر فتح الإثبات");
    window.open(data.signedUrl, "_blank", "noopener");
  };

  const approve = async (r: any) => {
    setBusy(r.id);
    try {
      if (r.kind === "subscription" && r.plan_key) {
        const { data: plan } = await supabase.from("subscription_plans").select("duration_days").eq("plan_key", r.plan_key).maybeSingle();
        const days = plan?.duration_days || 30;
        const now = new Date();
        const expires = new Date(now.getTime() + days * 86400000);
        const { error } = await supabase.from("user_subscriptions").upsert({
          user_id: r.user_id, plan_key: r.plan_key, status: "active",
          started_at: now.toISOString(), expires_at: expires.toISOString(),
          granted_by: user?.id, source_request_id: r.id,
        }, { onConflict: "user_id" });
        if (error) throw error;
      }
      const { error } = await supabase.from("payment_requests").update({
        status: "approved", reviewed_by: user?.id, reviewed_at: new Date().toISOString(),
      }).eq("id", r.id);
      if (error) throw error;
      await supabase.from("notifications").insert({
        user_id: r.user_id, sent_by: user?.id, title: "تم استلام الدفعة",
        message: r.kind === "subscription" ? "تم تفعيل اشتراكك في الذكاء الاصطناعي لمدة شهر. شكراً لك!" : "تم استلام دعمك، شكراً لك!",
      });
      toast.success("تمت الموافقة");
      load();
    } catch (e: any) { toast.error(e.message || "خطأ"); }
    setBusy(null);
  };

  const reject = async (r: any) => {
    const reason = prompt("سبب الرفض") || "";
    setBusy(r.id);
    const { error } = await supabase.from("payment_requests").update({
      status: "rejected", rejection_reason: reason, reviewed_by: user?.id, reviewed_at: new Date().toISOString(),
    }).eq("id", r.id);
    if (error) toast.error(error.message);
    else {
      await supabase.from("notifications").insert({ user_id: r.user_id, sent_by: user?.id, title: "تم رفض طلب الدفع", message: reason || "يرجى التواصل مع قصي." });
      toast.success("تم الرفض"); load();
    }
    setBusy(null);
  };

  const addWithdrawal = async () => {
    const amount = Number(wd.amount);
    if (!amount || amount <= 0) return toast.error("أدخل مبلغاً صحيحاً");
    if (amount > balance) return toast.error("المبلغ أكبر من الرصيد المتاح");
    const { error } = await supabase.from("withdrawals").insert({
      amount_usd: amount, method: wd.method, destination: wd.destination || null, note: wd.note || null,
      status: "completed", created_by: user?.id, completed_at: new Date().toISOString(),
    });
    if (error) return toast.error(error.message);
    toast.success("تم تسجيل السحب");
    setWd({ amount: "", method: "تحويل بنكي", destination: "", note: "" });
    load();
  };

  const list = reqs.filter((r) => filter === "all" || r.status === filter);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[["المستلم", received], ["المسحوب", withdrawn], ["الرصيد المتاح", balance]].map(([l, v]) => (
          <Card key={l as string}><CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{l}</p>
            <p className="text-2xl font-bold text-primary" dir="ltr">${(v as number).toFixed(2)}</p>
          </CardContent></Card>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {[["pending", "معلّقة"], ["approved", "مقبولة"], ["rejected", "مرفوضة"], ["all", "الكل"]].map(([k, l]) => (
          <Button key={k} size="sm" variant={filter === k ? "default" : "outline"} onClick={() => setFilter(k)}>{l}</Button>
        ))}
      </div>

      <div className="space-y-3">
        {list.length === 0 && <p className="text-sm text-muted-foreground">لا توجد طلبات.</p>}
        {list.map((r) => (
          <Card key={r.id}><CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-3 justify-between">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{r.kind === "subscription" ? `اشتراك ${r.plan_key}` : "دعم"}</Badge>
                <span className="font-bold text-primary" dir="ltr">${Number(r.amount_usd).toFixed(2)}</span>
                <Badge variant={r.status === "approved" ? "default" : r.status === "rejected" ? "destructive" : "secondary"}>{r.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">{r.user_email} · {r.sender_name || "-"} · مرجع: {r.transfer_reference || "-"}</p>
              {r.note && <p className="text-xs text-foreground/80">{r.note}</p>}
              <p className="text-[10px] text-muted-foreground">{new Date(r.created_at).toLocaleString("ar")}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {r.proof_path && <Button size="sm" variant="outline" onClick={() => viewProof(r.proof_path)}><FileImage className="w-4 h-4" /></Button>}
              {r.status === "pending" && <>
                <Button size="sm" disabled={busy === r.id} onClick={() => approve(r)} className="gap-1">
                  {busy === r.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}قبول
                </Button>
                <Button size="sm" variant="destructive" disabled={busy === r.id} onClick={() => reject(r)} className="gap-1"><X className="w-4 h-4" />رفض</Button>
              </>}
            </div>
          </CardContent></Card>
        ))}
      </div>

      <Card><CardContent className="p-4 space-y-3">
        <h3 className="font-bold flex items-center gap-2"><Wallet className="w-5 h-5 text-primary" />تسجيل سحب</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input type="number" min="0" step="0.01" placeholder="المبلغ $" value={wd.amount} onChange={(e) => setWd({ ...wd, amount: e.target.value })} />
          <Input placeholder="الطريقة" value={wd.method} onChange={(e) => setWd({ ...wd, method: e.target.value })} />
          <Input placeholder="الوجهة" value={wd.destination} onChange={(e) => setWd({ ...wd, destination: e.target.value })} />
          <Input placeholder="ملاحظة" value={wd.note} onChange={(e) => setWd({ ...wd, note: e.target.value })} />
        </div>
        <Button onClick={addWithdrawal}>تسجيل السحب</Button>
        <div className="space-y-2 pt-2">
          {wds.map((w) => (
            <div key={w.id} className="flex justify-between text-sm border-b border-border/30 pb-1">
              <span>{w.method} {w.destination ? `· ${w.destination}` : ""}</span>
              <span dir="ltr" className="text-primary">-${Number(w.amount_usd).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  );
};

export default PaymentsTab;
