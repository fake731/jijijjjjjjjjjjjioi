import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface CopyCodeButtonProps {
  code: string;
  id?: string;
  watermark?: boolean;
  className?: string;
  label?: string;
}

export const CopyCodeButton = ({
  code,
  id = "code",
  watermark = true,
  className = "",
  label = "نسخ",
}: CopyCodeButtonProps) => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!user) {
      toast.error("سجّل دخول أولاً لنسخ الكود");
      return;
    }
    try {
      await navigator.clipboard.writeText(watermark ? `${code}\n\n# Qusay_kali` : code);
      setCopied(true);
      toast.success("تم نسخ الكود");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("تعذر النسخ");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 border border-border/50 text-xs text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all ${className}`}
      aria-label="نسخ الكود"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copied ? "تم" : label}</span>
    </button>
  );
};

export default CopyCodeButton;
