import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
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
          Qusay_kali
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          منصة احترافية متخصصة في الأمن السيبراني
        </p>

        {/* AI Tag */}
        <p className="text-lg text-muted-foreground/70 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          ذكاء اصطناعي • Ai (Qusay_kali)
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Link to="/ai" className="cyber-button-primary">
            ابدأ مع الذكاء الاصطناعي
          </Link>
          <Link to="/scanner" className="cyber-button-outline">
            فحص الثغرات
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
