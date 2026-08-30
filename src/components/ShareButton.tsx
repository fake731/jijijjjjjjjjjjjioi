import { useState } from "react";
import { Share2, Link2, Check, X } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export const ShareButton = ({ title, text, url, className = "" }: ShareButtonProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = text || title;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        setOpen(false);
        return;
      } catch {
        // user cancelled or unsupported — fall through to manual
      }
    }
    setOpen(true);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("تم نسخ الرابط");
      setTimeout(() => { setCopied(false); setOpen(false); }, 1200);
    } catch {
      toast.error("تعذر النسخ");
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/40 backdrop-blur-xl border border-primary/20 text-sm text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
        aria-label="مشاركة"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">مشاركة</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-12 z-50 w-72 p-3 rounded-2xl bg-card/90 backdrop-blur-2xl border border-primary/20 shadow-2xl" dir="rtl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-foreground">مشاركة المحتوى</span>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-secondary">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{title}</p>
            <button
              onClick={copyLink}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
              <span>{copied ? "تم النسخ" : "نسخ الرابط"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
