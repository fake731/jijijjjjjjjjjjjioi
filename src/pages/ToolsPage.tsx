import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, ExternalLink } from "lucide-react";

const tools = [
  { name: "Nmap", description: "أداة فحص الشبكات واكتشاف المنافذ المفتوحة" },
  { name: "Metasploit", description: "إطار عمل لاختبار الاختراق وتنفيذ الثغرات" },
  { name: "Burp Suite", description: "أداة لفحص تطبيقات الويب واكتشاف الثغرات" },
  { name: "Wireshark", description: "أداة تحليل حزم الشبكة" },
  { name: "John the Ripper", description: "أداة لكسر كلمات المرور" },
  { name: "Hydra", description: "أداة لهجمات القوة الغاشمة" },
  { name: "SQLMap", description: "أداة آلية لاكتشاف واستغلال ثغرات SQL Injection" },
  { name: "Aircrack-ng", description: "مجموعة أدوات لاختبار أمان شبكات Wi-Fi" },
  { name: "Nikto", description: "أداة فحص الثغرات في خوادم الويب" },
];

const ToolsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Terminal className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              أدوات كالي لينكس
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              +9 أداة احترافية مع شرح كامل للأوامر والاستخدامات المتقدمة
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <div key={index} className="cyber-card p-6 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:box-glow-sm transition-all duration-300">
                    <Terminal className="w-6 h-6 text-primary" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{tool.name}</h3>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolsPage;
