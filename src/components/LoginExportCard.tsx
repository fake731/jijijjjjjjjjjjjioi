import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Download, X } from "lucide-react";

const LoginExportCard = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!user) return;
    const checkExport = async () => {
      const { data } = await supabase
        .from("login_exports" as any)
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!data) setShow(true);
    };
    checkExport();
  }, [user]);

  useEffect(() => {
    if (!show || !canvasRef.current || !user) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const w = 600, h = 340;
    canvas.width = w;
    canvas.height = h;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#0a0a1a");
    bg.addColorStop(0.5, "#111133");
    bg.addColorStop(1, "#0a0a1a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = "rgba(139, 92, 246, 0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, w - 8, h - 8);

    // Inner glow border
    ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    // Logo text
    ctx.font = "bold 32px monospace";
    ctx.fillStyle = "#8b5cf6";
    ctx.textAlign = "center";
    ctx.fillText("Qusay_kali", w / 2, 55);

    // Subtitle
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("Cybersecurity Platform", w / 2, 78);

    // Divider
    ctx.beginPath();
    ctx.moveTo(60, 95);
    ctx.lineTo(w - 60, 95);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // User info
    ctx.textAlign = "right";
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    
    const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
    const email = user.email || "";
    const date = new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
    const time = new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });

    const lines = [
      { label: "الاسم", value: name },
      { label: "البريد", value: email },
      { label: "التاريخ", value: date },
      { label: "الوقت", value: time },
      { label: "الجهاز", value: navigator.userAgent.includes("Mobile") ? "موبايل" : "كمبيوتر" },
    ];

    lines.forEach((line, i) => {
      const y = 125 + i * 32;
      ctx.fillStyle = "rgba(139, 92, 246, 0.8)";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(line.label + ":", w - 40, y);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = "14px monospace";
      ctx.textAlign = "left";
      ctx.fillText(line.value, 40, y);
      ctx.textAlign = "right";
    });

    // Watermark
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.font = "bold 60px monospace";
    ctx.fillStyle = "#8b5cf6";
    ctx.textAlign = "center";
    ctx.translate(w / 2, h / 2 + 20);
    ctx.rotate(-0.3);
    ctx.fillText("Qusay_kali", 0, 0);
    ctx.restore();

    // Footer
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.textAlign = "center";
    ctx.fillText("qusayk.netlify.app • تسجيل دخول آمن", w / 2, h - 20);
  }, [show, user]);

  const handleDownload = async () => {
    if (!canvasRef.current || !user) return;
    const link = document.createElement("a");
    link.download = `login-${user.email}-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();

    await supabase.from("login_exports" as any).insert({ user_id: user.id } as any);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card border border-border/30 rounded-2xl p-6 max-w-[650px] w-full space-y-4 animate-scale-in">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-primary">بطاقة تسجيل الدخول</h3>
          <button onClick={() => setShow(false)} className="p-1 rounded-lg hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <canvas ref={canvasRef} className="w-full rounded-xl border border-border/20" style={{ maxWidth: 600 }} />
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          تحميل كصورة مع علامة مائية Qusay_kali
        </button>
      </div>
    </div>
  );
};

export default LoginExportCard;
