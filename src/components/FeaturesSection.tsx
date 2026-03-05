import { Brain, Terminal, Wrench, Code, BookOpen, Download, Globe, Lock, Mail } from "lucide-react";
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
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
    },
    {
      icon: Terminal,
      title: t("nav.scanner"),
      description: t("features.tools.desc"),
      link: "/scanner",
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
    },
    {
      icon: Wrench,
      title: t("features.tools.title"),
      description: t("features.tools.desc"),
      link: "/tools",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
    },
    {
      icon: Code,
      title: t("features.scripts.title"),
      description: t("features.scripts.desc"),
      link: "/scripts",
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
    },
    {
      icon: BookOpen,
      title: t("features.guide.title"),
      description: t("features.guide.desc"),
      link: "/guide",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
    },
    {
      icon: Globe,
      title: t("nav.webdev"),
      description: "دليل لتعلم تطوير الويب",
      link: "/webdev",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      icon: Lock,
      title: t("nav.password"),
      description: "افحص قوة كلمة مرورك",
      link: "/password-checker",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
    },
    {
      icon: Mail,
      title: t("nav.inquiry"),
      description: "تواصل معنا",
      link: "/inquiry",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
    },
    {
      icon: Download,
      title: t("nav.download"),
      description: t("features.tools.desc"),
      link: "/download",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
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
                <div className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center group-hover:box-glow-sm transition-all duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
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