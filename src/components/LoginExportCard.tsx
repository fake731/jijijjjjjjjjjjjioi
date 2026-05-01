import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
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
    const name = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
    const email = user.email || "";
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    const device = navigator.userAgent.includes("Mobile") ? "Mobile" : "Desktop";

    const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = [
      ["Field", "Value"],
      ["Watermark", "Qusay_kali"],
      ["Platform", "Qusay Kali - Cybersecurity"],
      ["Name", name],
      ["Email", email],
      ["Date", date],
      ["Time", time],
      ["Device", device],
      ["UserAgent", navigator.userAgent],
      ["Instagram", "@0oscp"],
    ];
    const csv = "\uFEFF" + rows.map(r => r.map(escape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `login-${user.email}-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

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
          مرحباً بك! يمكنك تحميل بيانات تسجيل الدخول كملف CSV يحمل علامة Qusay_kali
        </p>
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          تحميل CSV مع علامة Qusay_kali
        </button>
      </div>
    </div>
  );
};

export default LoginExportCard;
