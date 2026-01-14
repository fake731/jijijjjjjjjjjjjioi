import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const CTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-glow-sm">
          {t("cta.title")}
        </h2>
        
        <p className="text-muted-foreground text-lg mb-10">
          {t("cta.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/guide" className="cyber-button-primary">
            {t("nav.guide")}
          </Link>
          <Link to="/tools" className="cyber-button-outline">
            {t("nav.tools")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;