import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      aria-label="hero"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center relative z-10" dir="rtl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-primary">Qusay_kali</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-l from-primary via-primary/80 to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
            Qusay Kali
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 mb-3 font-bold">
          منصة للأمن السيبراني
        </p>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-xl mx-auto">
          دليلك الشامل لتعلم الأمن السيبراني من الصفر إلى الاحتراف
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2 h-12 px-6">
            <Link to="/الادوات">
              استكشف الأدوات
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 h-12 px-6 backdrop-blur-xl">
            <Link to="/الدليل">
              <BookOpen className="w-4 h-4" />
              ابدأ التعلم
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;