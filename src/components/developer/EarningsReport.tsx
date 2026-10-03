import { useMemo } from "react";
import { jsPDF } from "jspdf";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, TrendingUp } from "lucide-react";

interface Props { reqs: any[]; wds: any[] }

const monthKey = (d: string) => d.slice(0, 7);

const EarningsReport = ({ reqs, wds }: Props) => {
  const approved = reqs.filter((r) => r.status === "approved");

  const months = useMemo(() => {
    const map: Record<string, { month: string; subs: number; support: number; withdrawn: number }> = {};
    const get = (k: string) => (map[k] ||= { month: k, subs: 0, support: 0, withdrawn: 0 });
    approved.forEach((r) => {
      const m = get(monthKey(r.reviewed_at || r.created_at));
      if (r.kind === "subscription") m.subs += Number(r.amount_usd); else m.support += Number(r.amount_usd);
    });
    wds.filter((w) => w.status !== "cancelled").forEach((w) => { get(monthKey(w.completed_at || w.created_at)).withdrawn += Number(w.amount_usd); });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month)).slice(-12);
  }, [reqs, wds]);

  const totalSubs = approved.filter((r) => r.kind === "subscription").reduce((s, r) => s + Number(r.amount_usd), 0);
  const totalSupport = approved.filter((r) => r.kind !== "subscription").reduce((s, r) => s + Number(r.amount_usd), 0);
  const totalWd = wds.filter((w) => w.status !== "cancelled").reduce((s, w) => s + Number(w.amount_usd), 0);
  const total = totalSubs + totalSupport;
  const pct = (v: number) => (total ? Math.round((v / total) * 100) : 0);

  const exportPdf = () => {
    const doc = new jsPDF();
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const mark = () => {
      doc.setFontSize(40); doc.setTextColor(230, 230, 230);
      doc.text("Qusay_kali", W / 2, H / 2, { align: "center", angle: 30 });
    };
    mark();
    doc.setFontSize(20); doc.setTextColor(0, 150, 200);
    doc.text("Earnings Report", W / 2, 20, { align: "center" });
    doc.setFontSize(9); doc.setTextColor(120);
    doc.text(`Generated ${new Date().toISOString().slice(0, 10)} - Qusay_kali`, W / 2, 27, { align: "center" });

    doc.setFontSize(12); doc.setTextColor(30);
    let y = 42;
    [["Subscriptions", totalSubs], ["Support / donations", totalSupport], ["Total received", total], ["Withdrawn", totalWd], ["Available balance", total - totalWd]]
      .forEach(([l, v]) => { doc.text(String(l), 20, y); doc.text(`$${(v as number).toFixed(2)}`, W - 20, y, { align: "right" }); y += 8; });

    y += 6;
    doc.setFontSize(13); doc.setTextColor(0, 150, 200); doc.text("Monthly breakdown", 20, y); y += 8;
    doc.setFontSize(10); doc.setTextColor(80);
    const cols = [20, 65, 110, 155];
    ["Month", "Subscriptions", "Support", "Withdrawn"].forEach((h, i) => doc.text(h, cols[i], y));
    y += 2; doc.line(20, y, W - 20, y); y += 6;
    doc.setTextColor(30);
    months.forEach((m) => {
      if (y > H - 20) { doc.addPage(); mark(); doc.setFontSize(10); doc.setTextColor(30); y = 20; }
      [m.month, `$${m.subs.toFixed(2)}`, `$${m.support.toFixed(2)}`, `$${m.withdrawn.toFixed(2)}`].forEach((t, i) => doc.text(t, cols[i], y));
      y += 7;
    });
    if (!months.length) doc.text("No data yet.", 20, y);
    doc.save(`earnings-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <Card><CardContent className="p-4 space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" />الأرباح الشهرية</h3>
        <Button size="sm" variant="outline" onClick={exportPdf} className="gap-1"><FileDown className="w-4 h-4" />تصدير PDF</Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[["الاشتراكات", totalSubs, pct(totalSubs)], ["الدعم", totalSupport, pct(totalSupport)]].map(([l, v, p]) => (
          <div key={l as string} className="rounded-lg border border-border/40 p-3">
            <p className="text-xs text-muted-foreground">{l}</p>
            <p className="text-lg font-bold text-primary" dir="ltr">${(v as number).toFixed(2)}</p>
            <div className="h-1.5 rounded bg-muted mt-2 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${p}%` }} /></div>
            <p className="text-[10px] text-muted-foreground mt-1">{p}%</p>
          </div>
        ))}
      </div>

      <div className="h-64" dir="ltr">
        {months.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center pt-20">لا توجد أرباح بعد.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={months}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Bar dataKey="subs" name="اشتراكات" stackId="a" fill="hsl(var(--primary))" />
              <Bar dataKey="support" name="دعم" stackId="a" fill="hsl(var(--accent))" />
              <Bar dataKey="withdrawn" name="مسحوب" fill="hsl(var(--destructive))" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </CardContent></Card>
  );
};

export default EarningsReport;
