import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentForm from "./PaymentForm";

const SupportSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-8" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="glass-elevated rounded-2xl border border-primary/20 p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">ادعم الموقع</h2>
                <p className="text-xs text-muted-foreground">أي مبلغ يساعد في استمرار المحتوى المجاني.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/الاشتراك" className="px-4 py-2 rounded-xl border border-primary/30 text-sm text-primary hover:bg-primary/10">باقات الذكاء</Link>
              <button onClick={() => setOpen(!open)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                {open ? "إغلاق" : "ادعم الآن"}
              </button>
            </div>
          </div>
          {open && <PaymentForm kind="donation" onDone={() => setOpen(false)} />}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
