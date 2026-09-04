import { Brain, Terminal, Wrench, Code, BookOpen, Download, Globe, Lock, Mail, Trophy, Braces, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const handleTiltMove = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const px = x / rect.width;
  const py = y / rect.height;
  el.style.setProperty("--tilt-x", `${(0.5 - py) * 10}deg`);
  el.style.setProperty("--tilt-y", `${(px - 0.5) * 10}deg`);
  el.style.setProperty("--spot-x", `${px * 100}%`);
  el.style.setProperty("--spot-y", `${py * 100}%`);
  el.style.setProperty("--spot-opacity", "1");
};
const handleTiltLeave = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  el.style.setProperty("--tilt-x", "0deg");
  el.style.setProperty("--tilt-y", "0deg");
  el.style.setProperty("--spot-opacity", "0");
};

const FeaturesSection = () => {
  const { t } = useLanguage();
  useScrollReveal();
  
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
      icon: Braces,
      title: "البرمجة",
      description: "تعلم Python و C++ و JS وأكثر مع شرح كامل",
      link: "/البرمجة",
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-500/30",
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
      icon: Trophy,
      title: "الاختبار",
      description: "اختبر مهاراتك في 15 تخصصاً مع ثلاث مستويات",
      link: "/الاختبار",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
    },
    {
      icon: Wand2,
      title: "أدوات سريعة",
      description: "Base64، تشفير، QR، فك ضغط الأكواد وأكثر",
      link: "/أدوات-سريعة",
      color: "text-teal-400",
      bg: "bg-teal-500/10",
      border: "border-teal-500/30",
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
    <section className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16 text-glow-sm">
          {t("features.title")}
        </h2>

        {/* Features Grid */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))" }}
        >
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="glass-strong glass-interactive glow-border reveal-on-scroll p-6 group focus-visible:outline-none"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
            >
              {/* Icon */}
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <div className={`w-12 h-12 rounded-xl backdrop-blur-2xl ${feature.bg} border ${feature.border} flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_-4px_currentColor]`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
              </div>

              {/* Title */}
              <h3
                className="font-bold text-primary mb-3 group-hover:text-glow-sm transition-all duration-300"
                style={{ fontSize: "clamp(1.15rem, 2.6vw, 1.45rem)" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="text-muted-foreground leading-relaxed"
                style={{ fontSize: "clamp(0.9rem, 1.8vw, 1rem)" }}
              >
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