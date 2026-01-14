import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-cyber-bg cyber-grid overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 py-32 text-center relative z-10">
        {/* Shield Icon */}
        <div className="flex justify-center mb-8 animate-float">
          <div className="cyber-icon-box">
            <Shield className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary text-glow mb-6 animate-fade-in">
          {t("hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in [animation-delay:0.2s]">
          {t("hero.subtitle")}
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground/70 mb-10 animate-fade-in [animation-delay:0.3s]">
          {t("hero.description")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.4s]">
          <Link to="/tools" className="cyber-button-primary">
            {t("hero.cta.tools")}
          </Link>
          <Link to="/guide" className="cyber-button-outline">
            {t("hero.cta.guide")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;