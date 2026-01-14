import { Brain, Terminal, Wrench, Code, BookOpen, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Brain,
      title: t("features.ai.title"),
      description: t("features.ai.desc"),
      link: "/ai",
    },
    {
      icon: Terminal,
      title: t("nav.scanner"),
      description: t("features.tools.desc"),
      link: "/scanner",
    },
    {
      icon: Wrench,
      title: t("features.tools.title"),
      description: t("features.tools.desc"),
      link: "/tools",
    },
    {
      icon: Code,
      title: t("features.scripts.title"),
      description: t("features.scripts.desc"),
      link: "/scripts",
    },
    {
      icon: BookOpen,
      title: t("features.guide.title"),
      description: t("features.guide.desc"),
      link: "/guide",
    },
    {
      icon: Download,
      title: t("nav.download"),
      description: t("features.tools.desc"),
      link: "/download",
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16 text-glow-sm">
          {t("features.title")}
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="cyber-card p-6 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:box-glow-sm transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-glow-sm transition-all duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;