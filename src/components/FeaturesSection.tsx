import { Brain, Bug, Terminal, Code, BookOpen, Download } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "ذكاء اصطناعي متخصص",
    description: "(كلمة السر بالانستا) AI متقدم متخصص في الأمن السيبراني يجيب على جميع استفساراتك بدقة وسرعة",
    link: "/ai",
  },
  {
    icon: Terminal,
    title: "أوامر كالي لينكس",
    description: "+50 أمر أساسي لنظام كالي لينكس مع شرح كامل بالعربية والإنجليزية",
    link: "/scanner",
  },
  {
    icon: Terminal,
    title: "أدوات كالي لينكس",
    description: "+9 أداة احترافية مع شرح كامل للأوامر والاستخدامات المتقدمة",
    link: "/tools",
  },
  {
    icon: Code,
    title: "السكربتات الجاهزة",
    description: "سكربتات بسيطة",
    link: "/scripts",
  },
  {
    icon: BookOpen,
    title: "الدليل الكامل",
    description: "(تحت الانشاء) الدليل الكامل للأمن السيبراني",
    link: "/guide",
  },
  {
    icon: Download,
    title: "تنزيل كالي لينكس",
    description: "روابط تنزيل مباشرة لجميع إصدارات Kali Linux مع شرح التثبيت",
    link: "/download",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16 text-glow-sm">
          ميزات المنصة
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
