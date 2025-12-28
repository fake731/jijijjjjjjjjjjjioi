import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bug, Search, AlertTriangle, Copy, Check, Terminal, Globe } from "lucide-react";
import { useState } from "react";

interface KaliCommand {
  command: string;
  description: { ar: string; en: string };
}

const kaliCommands: KaliCommand[] = [
  // Nmap Commands (10)
  { command: "nmap -sP 192.168.1.0/24", description: { ar: "فحص جميع الأجهزة في الشبكة", en: "Scan all devices in network" } },
  { command: "nmap -sS -sV 192.168.1.1", description: { ar: "فحص المنافذ مع إصدارات الخدمات", en: "Port scan with service versions" } },
  { command: "nmap -O 192.168.1.1", description: { ar: "اكتشاف نظام التشغيل", en: "OS detection" } },
  { command: "nmap -A -T4 192.168.1.1", description: { ar: "فحص شامل وسريع", en: "Aggressive fast scan" } },
  { command: "nmap --script vuln 192.168.1.1", description: { ar: "فحص الثغرات المعروفة", en: "Vulnerability scan" } },
  { command: "nmap -p 1-65535 192.168.1.1", description: { ar: "فحص جميع المنافذ", en: "Full port scan" } },
  { command: "nmap -sU 192.168.1.1", description: { ar: "فحص منافذ UDP", en: "UDP port scan" } },
  { command: "nmap -sN 192.168.1.1", description: { ar: "فحص خفي لتجاوز الجدار الناري", en: "Stealth null scan" } },
  { command: "nmap --script http-enum 192.168.1.1", description: { ar: "اكتشاف مجلدات الويب", en: "Web directory enumeration" } },
  { command: "nmap -oA scan_results 192.168.1.1", description: { ar: "حفظ النتائج بجميع الصيغ", en: "Save results in all formats" } },
  
  // Nikto Commands (5)
  { command: "nikto -h http://target.com", description: { ar: "فحص ثغرات خادم الويب", en: "Web server vulnerability scan" } },
  { command: "nikto -h http://target.com -ssl", description: { ar: "فحص موقع HTTPS", en: "HTTPS site scan" } },
  { command: "nikto -h http://target.com -Tuning 9", description: { ar: "فحص SQL Injection", en: "SQL Injection scan" } },
  { command: "nikto -h http://target.com -o report.html", description: { ar: "حفظ التقرير بصيغة HTML", en: "Save report as HTML" } },
  { command: "nikto -h http://target.com -evasion 1", description: { ar: "تجاوز IDS", en: "IDS evasion" } },
  
  // Dirb Commands (5)
  { command: "dirb http://target.com", description: { ar: "اكتشاف المجلدات المخفية", en: "Directory brute force" } },
  { command: "dirb http://target.com /usr/share/wordlists/dirb/big.txt", description: { ar: "استخدام قائمة كبيرة", en: "Use big wordlist" } },
  { command: "dirb http://target.com -a 'Mozilla/5.0'", description: { ar: "تغيير User-Agent", en: "Custom User-Agent" } },
  { command: "dirb http://target.com -o output.txt", description: { ar: "حفظ النتائج في ملف", en: "Save results to file" } },
  { command: "dirb http://target.com -X .php,.html", description: { ar: "البحث عن ملفات محددة", en: "Search specific extensions" } },
  
  // SQLMap Commands (5)
  { command: "sqlmap -u 'http://target.com/page?id=1'", description: { ar: "فحص SQL Injection", en: "SQL Injection test" } },
  { command: "sqlmap -u 'URL' --dbs", description: { ar: "استخراج قواعد البيانات", en: "Extract databases" } },
  { command: "sqlmap -u 'URL' -D db --tables", description: { ar: "استخراج الجداول", en: "Extract tables" } },
  { command: "sqlmap -u 'URL' -D db -T users --dump", description: { ar: "تفريغ بيانات الجدول", en: "Dump table data" } },
  { command: "sqlmap -u 'URL' --os-shell", description: { ar: "الحصول على Shell", en: "Get OS shell" } },
  
  // WhatWeb Commands (3)
  { command: "whatweb target.com", description: { ar: "اكتشاف تقنيات الموقع", en: "Detect website technologies" } },
  { command: "whatweb -a 3 target.com", description: { ar: "فحص عدواني", en: "Aggressive scan" } },
  { command: "whatweb --log-json=output.json target.com", description: { ar: "حفظ بصيغة JSON", en: "Save as JSON" } },
  
  // Wapiti Commands (3)
  { command: "wapiti -u http://target.com", description: { ar: "فحص ثغرات الويب الشامل", en: "Full web vulnerability scan" } },
  { command: "wapiti -u http://target.com -m sql,xss", description: { ar: "فحص SQL و XSS فقط", en: "SQL and XSS only" } },
  { command: "wapiti -u http://target.com -o report", description: { ar: "إنشاء تقرير HTML", en: "Generate HTML report" } },
  
  // Gobuster Commands (3)
  { command: "gobuster dir -u http://target.com -w wordlist.txt", description: { ar: "اكتشاف المجلدات بسرعة", en: "Fast directory discovery" } },
  { command: "gobuster dns -d target.com -w subdomains.txt", description: { ar: "اكتشاف النطاقات الفرعية", en: "Subdomain enumeration" } },
  { command: "gobuster vhost -u http://target.com -w hosts.txt", description: { ar: "اكتشاف Virtual Hosts", en: "Virtual host discovery" } },
  
  // SSLscan Commands (2)
  { command: "sslscan target.com", description: { ar: "فحص شهادة SSL", en: "SSL certificate scan" } },
  { command: "sslscan --show-certificate target.com", description: { ar: "عرض تفاصيل الشهادة", en: "Show certificate details" } },
  
  // Skipfish Commands (2)
  { command: "skipfish -o output http://target.com", description: { ar: "فحص أمان تطبيق الويب", en: "Web app security scan" } },
  { command: "skipfish -W wordlist.txt -o output http://target.com", description: { ar: "فحص مع قائمة مخصصة", en: "Scan with custom wordlist" } },
  
  // Recon-ng Commands (2)
  { command: "recon-ng", description: { ar: "تشغيل أداة الاستطلاع", en: "Start recon framework" } },
  { command: "recon-cli -w workspace -m recon/domains-hosts", description: { ar: "استطلاع النطاقات", en: "Domain reconnaissance" } },
];

const ScannerPage = () => {
  const [url, setUrl] = useState("");
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const t = {
    title: language === "ar" ? "مكتشف الثغرات" : "Vulnerability Scanner",
    subtitle: language === "ar" ? "40 أمر كالي لينكس لاكتشاف الثغرات" : "40 Kali Linux commands for vulnerability scanning",
    placeholder: language === "ar" ? "أدخل رابط الموقع للفحص..." : "Enter website URL to scan...",
    scan: language === "ar" ? "فحص" : "Scan",
    warning: language === "ar" ? "تنبيه مهم" : "Important Warning",
    warningText: language === "ar" 
      ? "هذه الأداة للأغراض التعليمية فقط. استخدم هذه الأوامر فقط على المواقع التي تملك إذناً لفحصها." 
      : "This tool is for educational purposes only. Use these commands only on websites you have permission to scan.",
    commandsTitle: language === "ar" ? "أوامر كالي لينكس للفحص" : "Kali Linux Scanning Commands",
    commandsCount: language === "ar" ? `${kaliCommands.length} أمر` : `${kaliCommands.length} commands`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Bug className="w-10 h-10 text-primary" />
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
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Scanner Interface */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="cyber-card p-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  dir="ltr"
                />
                <button className="cyber-button-primary flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  {t.scan}
                </button>
              </div>

              {/* Warning Notice */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-destructive mb-1">{t.warning}</h4>
                  <p className="text-muted-foreground text-sm">{t.warningText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kali Commands Section */}
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
                <Terminal className="w-6 h-6" />
                {t.commandsTitle}
              </h2>
              <span className="text-muted-foreground text-sm">{t.commandsCount}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kaliCommands.map((cmd, index) => (
                <div
                  key={index}
                  className="cyber-card p-4 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-primary text-sm font-mono bg-background/50 px-2 py-1 rounded break-all" dir="ltr">
                          {cmd.command}
                        </code>
                        <button
                          onClick={() => copyCommand(cmd.command)}
                          className="p-1.5 rounded-lg hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                        >
                          {copiedCommand === cmd.command ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {language === "ar" ? cmd.description.ar : cmd.description.en}
                      </p>
                    </div>
                  </div>
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

export default ScannerPage;
