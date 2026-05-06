import { Brain, Terminal, Wrench, Code, BookOpen, Download, Globe, Lock, Mail, GraduationCap, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Brain,
      title: t("features.ai.title"),
      description: t("features.ai.desc"),
      link: "/الذكاء",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
    },
    {
      icon: Terminal,
      title: "اوامر كالي لينكس",
      description: "تعلم أوامر كالي لينكس",
      link: "/الاوامر",
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
    },
    {
      icon: Wrench,
      title: t("features.tools.title"),
      description: t("features.tools.desc"),
      link: "/الادوات",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
    },
    {
      icon: Code,
      title: t("features.scripts.title"),
      description: t("features.scripts.desc"),
      link: "/السكربتات",
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
    },
    {
      icon: Code2,
      title: "البرمجة",
      description: "تعلم Python و C++ و JS وأكثر مع شرح كامل",
      link: "/البرمجة",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
    },
    {
      icon: BookOpen,
      title: t("features.guide.title"),
      description: t("features.guide.desc"),
      link: "/الدليل",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
    },
    {
      icon: Globe,
      title: t("nav.webdev"),
      description: "تعلم تطوير الويب من الصفر",
      link: "/تطوير-الويب",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
    },
    {
      icon: Lock,
      title: t("nav.password"),
      description: "افحص قوة كلمة مرورك",
      link: "/فحص-كلمة-المرور",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
    },
    {
      icon: Mail,
      title: t("nav.inquiry"),
      description: "تواصل معنا",
      link: "/الاستفسارات",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
    },
    {
      icon: GraduationCap,
      title: "الاختبار",
      description: "اختبر مهاراتك في 15 تخصصاً مع ثلاث مستويات",
      link: "/الاختبار",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
    },
    {
      icon: Download,
      title: t("nav.download"),
      description: t("features.tools.desc"),
      link: "/التحميل",
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
              className="glass p-6 group hover:border-primary/45 hover:bg-card/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.4)]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                <div className={`w-12 h-12 rounded-xl backdrop-blur-xl ${feature.bg} border ${feature.border} flex items-center justify-center group-hover:box-glow-sm transition-all duration-300`}>
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