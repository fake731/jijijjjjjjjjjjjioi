import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Monitor, HardDrive, Smartphone, ExternalLink } from "lucide-react";

const downloads = [
  {
    name: "Kali Linux ISO",
    description: "النسخة الكاملة للتثبيت على الجهاز",
    icon: Monitor,
    size: "3.5 GB",
    link: "https://www.kali.org/get-kali/#kali-installer-images",
  },
  {
    name: "Kali Virtual Machine",
    description: "للتشغيل على VMware أو VirtualBox",
    icon: HardDrive,
    size: "3.2 GB",
    link: "https://www.kali.org/get-kali/#kali-virtual-machines",
  },
  {
    name: "Kali NetHunter",
    description: "نسخة للهواتف الذكية",
    icon: Smartphone,
    size: "1.8 GB",
    link: "https://www.kali.org/get-kali/#kali-mobile",
  },
];

const DownloadPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Download className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              تنزيل كالي لينكس
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              روابط تنزيل مباشرة لجميع إصدارات Kali Linux مع شرح التثبيت
            </p>
          </div>

          {/* Download Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {downloads.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-card p-6 group text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:box-glow-sm transition-all duration-300">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <span className="text-sm">{item.size}</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          {/* Installation Guide */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">خطوات التثبيت</h2>
            <div className="cyber-card p-8">
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <p>قم بتحميل ملف ISO المناسب لجهازك</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <p>استخدم برنامج مثل Rufus لحرق الملف على USB</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <p>أعد تشغيل الجهاز وقم بالإقلاع من USB</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">4</span>
                  <p>اتبع خطوات التثبيت على الشاشة</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage;
