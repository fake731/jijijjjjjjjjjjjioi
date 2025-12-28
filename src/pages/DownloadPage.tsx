import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Monitor, HardDrive, Smartphone, Terminal, ExternalLink, ChevronDown, ChevronUp, Globe } from "lucide-react";
import { useState } from "react";

interface DownloadOption {
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: typeof Monitor;
  size: string;
  link: string;
  category: "desktop" | "mobile" | "termux";
}

const downloads: DownloadOption[] = [
  {
    name: { ar: "Kali Linux ISO", en: "Kali Linux ISO" },
    description: { ar: "النسخة الكاملة للتثبيت على الجهاز", en: "Full version for PC installation" },
    icon: Monitor,
    size: "3.5 GB",
    link: "https://www.kali.org/get-kali/#kali-installer-images",
    category: "desktop",
  },
  {
    name: { ar: "Kali Virtual Machine", en: "Kali Virtual Machine" },
    description: { ar: "للتشغيل على VMware أو VirtualBox", en: "For VMware or VirtualBox" },
    icon: HardDrive,
    size: "3.2 GB",
    link: "https://www.kali.org/get-kali/#kali-virtual-machines",
    category: "desktop",
  },
  {
    name: { ar: "Kali NetHunter (Android)", en: "Kali NetHunter (Android)" },
    description: { ar: "نسخة للهواتف الأندرويد", en: "Android phone version" },
    icon: Smartphone,
    size: "1.8 GB",
    link: "https://www.kali.org/get-kali/#kali-mobile",
    category: "mobile",
  },
  {
    name: { ar: "iSH Shell (iOS/iPhone)", en: "iSH Shell (iOS/iPhone)" },
    description: { ar: "محاكي لينكس للآيفون والآيباد", en: "Linux emulator for iPhone/iPad" },
    icon: Smartphone,
    size: "50 MB",
    link: "https://apps.apple.com/app/ish-shell/id1436902243",
    category: "mobile",
  },
  {
    name: { ar: "Termux", en: "Termux" },
    description: { ar: "محاكي لينكس للأندرويد", en: "Linux emulator for Android" },
    icon: Terminal,
    size: "100 MB",
    link: "https://f-droid.org/packages/com.termux/",
    category: "termux",
  },
];

interface GuideStep {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
}

interface InstallGuide {
  title: { ar: string; en: string };
  steps: GuideStep[];
}

const installGuides: Record<string, InstallGuide> = {
  desktop: {
    title: { ar: "تثبيت كالي لينكس على الكمبيوتر", en: "Install Kali Linux on PC" },
    steps: [
      { title: { ar: "تحميل الملف", en: "Download file" }, description: { ar: "قم بتحميل ملف ISO من الرابط أعلاه", en: "Download the ISO file from the link above" } },
      { title: { ar: "إنشاء USB قابل للإقلاع", en: "Create bootable USB" }, description: { ar: "استخدم برنامج Rufus أو Etcher لحرق الملف على USB", en: "Use Rufus or Etcher to burn the file to USB" } },
      { title: { ar: "إعادة تشغيل الجهاز", en: "Restart computer" }, description: { ar: "أعد تشغيل جهازك واختر الإقلاع من USB", en: "Restart and boot from USB" } },
      { title: { ar: "اتبع خطوات التثبيت", en: "Follow installation" }, description: { ar: "اتبع التعليمات على الشاشة لإكمال التثبيت", en: "Follow on-screen instructions to complete" } },
      { title: { ar: "إعداد المستخدم", en: "User setup" }, description: { ar: "أنشئ اسم مستخدم وكلمة مرور", en: "Create username and password" } },
      { title: { ar: "تحديث النظام", en: "Update system" }, description: { ar: "شغّل: sudo apt update && sudo apt upgrade", en: "Run: sudo apt update && sudo apt upgrade" } },
    ],
  },
  iphone: {
    title: { ar: "تثبيت أدوات الاختراق على iPhone", en: "Install Hacking Tools on iPhone" },
    steps: [
      { title: { ar: "تحميل iSH Shell", en: "Download iSH Shell" }, description: { ar: "حمّل التطبيق من App Store مجاناً", en: "Download the app from App Store for free" } },
      { title: { ar: "فتح التطبيق", en: "Open the app" }, description: { ar: "افتح iSH Shell وانتظر التحميل الأولي", en: "Open iSH Shell and wait for initial setup" } },
      { title: { ar: "تحديث الحزم", en: "Update packages" }, description: { ar: "شغّل: apk update && apk upgrade", en: "Run: apk update && apk upgrade" } },
      { title: { ar: "تثبيت Python", en: "Install Python" }, description: { ar: "شغّل: apk add python3 python3-dev py3-pip", en: "Run: apk add python3 python3-dev py3-pip" } },
      { title: { ar: "تثبيت أدوات الشبكة", en: "Install network tools" }, description: { ar: "شغّل: apk add nmap curl wget git", en: "Run: apk add nmap curl wget git" } },
      { title: { ar: "تثبيت أدوات إضافية", en: "Install more tools" }, description: { ar: "شغّل: pip3 install requests beautifulsoup4", en: "Run: pip3 install requests beautifulsoup4" } },
      { title: { ar: "اختبار الأدوات", en: "Test tools" }, description: { ar: "جرب: nmap --version و python3 --version", en: "Try: nmap --version and python3 --version" } },
    ],
  },
  termux: {
    title: { ar: "تثبيت أدوات الاختراق على Termux", en: "Install Hacking Tools on Termux" },
    steps: [
      { title: { ar: "تحميل Termux", en: "Download Termux" }, description: { ar: "حمّل من F-Droid (لا تستخدم Play Store)", en: "Download from F-Droid (not Play Store)" } },
      { title: { ar: "منح الصلاحيات", en: "Grant permissions" }, description: { ar: "شغّل: termux-setup-storage للوصول للملفات", en: "Run: termux-setup-storage for file access" } },
      { title: { ar: "تحديث الحزم", en: "Update packages" }, description: { ar: "شغّل: pkg update && pkg upgrade", en: "Run: pkg update && pkg upgrade" } },
      { title: { ar: "تثبيت الأساسيات", en: "Install basics" }, description: { ar: "شغّل: pkg install python git curl wget nmap", en: "Run: pkg install python git curl wget nmap" } },
      { title: { ar: "تثبيت Metasploit", en: "Install Metasploit" }, description: { ar: "شغّل: pkg install unstable-repo && pkg install metasploit", en: "Run: pkg install unstable-repo && pkg install metasploit" } },
      { title: { ar: "تثبيت SQLMap", en: "Install SQLMap" }, description: { ar: "شغّل: pip install sqlmap", en: "Run: pip install sqlmap" } },
      { title: { ar: "تثبيت Hydra", en: "Install Hydra" }, description: { ar: "شغّل: pkg install hydra", en: "Run: pkg install hydra" } },
      { title: { ar: "تثبيت أدوات WiFi", en: "Install WiFi tools" }, description: { ar: "شغّل: pkg install aircrack-ng (يحتاج root)", en: "Run: pkg install aircrack-ng (needs root)" } },
      { title: { ar: "استنساخ أدوات GitHub", en: "Clone GitHub tools" }, description: { ar: "شغّل: git clone [رابط الأداة]", en: "Run: git clone [tool URL]" } },
      { title: { ar: "إنشاء alias", en: "Create alias" }, description: { ar: "أضف اختصارات في ~/.bashrc", en: "Add shortcuts to ~/.bashrc" } },
    ],
  },
};

const DownloadPage = () => {
  const [expandedGuide, setExpandedGuide] = useState<string | null>("desktop");
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const t = {
    title: language === "ar" ? "تنزيل أدوات الاختراق" : "Download Hacking Tools",
    subtitle: language === "ar" 
      ? "روابط تنزيل مباشرة لجميع المنصات مع شرح التثبيت" 
      : "Direct download links for all platforms with installation guides",
    desktopSection: language === "ar" ? "للكمبيوتر" : "For PC",
    mobileSection: language === "ar" ? "للهواتف" : "For Mobile",
    termuxSection: language === "ar" ? "Termux (أندرويد)" : "Termux (Android)",
    installGuides: language === "ar" ? "دليل التثبيت" : "Installation Guides",
  };

  const desktopDownloads = downloads.filter(d => d.category === "desktop");
  const mobileDownloads = downloads.filter(d => d.category === "mobile");
  const termuxDownloads = downloads.filter(d => d.category === "termux");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Download className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow">
                {t.title}
              </h1>
              <button
                onClick={() => setLanguage(prev => prev === "ar" ? "en" : "ar")}
                className="p-2 rounded-lg bg-secondary border border-border/50 hover:border-primary/50 transition-colors"
              >
                <Globe className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Desktop Downloads */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Monitor className="w-6 h-6" />
              {t.desktopSection}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {desktopDownloads.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-card p-6 group hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:box-glow-sm transition-all">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {language === "ar" ? item.name.ar : item.name.en}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {language === "ar" ? item.description.ar : item.description.en}
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span>{item.size}</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Downloads */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Smartphone className="w-6 h-6" />
              {t.mobileSection}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mobileDownloads.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-card p-6 group hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:box-glow-sm transition-all">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {language === "ar" ? item.name.ar : item.name.en}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {language === "ar" ? item.description.ar : item.description.en}
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span>{item.size}</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Termux Downloads */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Terminal className="w-6 h-6" />
              {t.termuxSection}
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {termuxDownloads.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-card p-6 group hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:box-glow-sm transition-all">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {language === "ar" ? item.name.ar : item.name.en}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {language === "ar" ? item.description.ar : item.description.en}
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span>{item.size}</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Installation Guides */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">{t.installGuides}</h2>
            <div className="space-y-4">
              {Object.entries(installGuides).map(([key, guide]) => (
                <div key={key} className="cyber-card overflow-hidden">
                  <button
                    onClick={() => setExpandedGuide(expandedGuide === key ? null : key)}
                    className="w-full p-5 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-primary">
                      {language === "ar" ? guide.title.ar : guide.title.en}
                    </h3>
                    {expandedGuide === key ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>

                  {expandedGuide === key && (
                    <div className="border-t border-border/30 p-6 animate-fade-in">
                      <div className="space-y-4">
                        {guide.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-4">
                            <span className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="font-bold text-foreground mb-1">
                                {language === "ar" ? step.title.ar : step.title.en}
                              </h4>
                              <p className="text-muted-foreground text-sm" dir="ltr">
                                {language === "ar" ? step.description.ar : step.description.en}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage;
