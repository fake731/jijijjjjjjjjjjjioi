import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { jsPDF } from "jspdf";
import { Download, X } from "lucide-react";

const LoginExportCard = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkExport = async () => {
      const { data } = await supabase
        .from("login_exports")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!data) setShow(true);
    };
    checkExport();
  }, [user]);

  const handleDownload = async () => {
    if (!user) return;

    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: [180, 100] });
    const w = 180, h = 100;

    // Background
    doc.setFillColor(10, 10, 26);
    doc.rect(0, 0, w, h, "F");

    // Border
    doc.setDrawColor(139, 92, 246);
    doc.setLineWidth(0.8);
    doc.rect(3, 3, w - 6, h - 6);

    // Inner border
    doc.setDrawColor(139, 92, 246);
    doc.setLineWidth(0.2);
    doc.rect(6, 6, w - 12, h - 12);

    // Watermark
    doc.saveGraphicsState();
    const gState = (doc as any).GState({ opacity: 0.06 });
    doc.setGState(gState);
    doc.setFontSize(40);
    doc.setTextColor(139, 92, 246);
    doc.text("Qusay_kali", w / 2, h / 2 + 5, { align: "center", angle: 15 });
    doc.restoreGraphicsState();

    // Logo
    doc.setFontSize(22);
    doc.setTextColor(139, 92, 246);
    doc.text("Qusay_kali", w / 2, 18, { align: "center" });

    // Subtitle
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Cybersecurity Platform", w / 2, 24, { align: "center" });

    // Divider
    doc.setDrawColor(139, 92, 246);
    doc.setLineWidth(0.3);
    doc.line(20, 28, w - 20, 28);

    // User info
    const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
    const email = user.email || "";
    const date = new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
    const time = new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
    const device = navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop";

    const lines = [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Date", value: date },
      { label: "Time", value: time },
      { label: "Device", value: device },
    ];

    lines.forEach((line, i) => {
      const y = 36 + i * 10;
      doc.setFontSize(9);
      doc.setTextColor(139, 92, 246);
      doc.text(line.label + ":", 15, y);
      doc.setTextColor(220, 220, 230);
      doc.setFontSize(9);
      doc.text(line.value, 42, y);
    });

    // Footer
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text("qusayk.netlify.app", w / 2, h - 6, { align: "center" });
    doc.text("@0oscp", w - 10, h - 6, { align: "right" });

    doc.save(`login-${user.email}-${Date.now()}.pdf`);

    await supabase.from("login_exports").insert({ user_id: user.id });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border/30 rounded-2xl p-6 max-w-[500px] w-full space-y-4 animate-scale-in">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary">بطاقة تسجيل الدخول</h3>
          <button onClick={() => setShow(false)} className="p-1 rounded-lg hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          مرحباً بك! يمكنك تحميل بطاقة تسجيل الدخول كملف PDF مع علامة Qusay_kali المائية
        </p>
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          تحميل PDF مع علامة مائية Qusay_kali
        </button>
      </div>
    </div>
  );
};

export default LoginExportCard;
