import { useState, useEffect, useRef } from "react";
import { Search, Terminal, Wrench, FileCode, X, ArrowRight, BookOpen, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchItem {
  title: string;
  description: string;
  type: "command" | "tool" | "script" | "guide" | "download";
  link: string;
}

const searchData: SearchItem[] = [
  // Commands
  { title: "cd /path", description: "تغيير المجلد الحالي", type: "command", link: "/scanner" },
  { title: "ls -la", description: "عرض كل الملفات مع التفاصيل", type: "command", link: "/scanner" },
  { title: "pwd", description: "عرض المسار الحالي", type: "command", link: "/scanner" },
  { title: "cat filename", description: "عرض محتوى ملف", type: "command", link: "/scanner" },
  { title: "chmod 755", description: "تغيير صلاحيات الملف", type: "command", link: "/scanner" },
  { title: "sudo su", description: "الدخول كمستخدم root", type: "command", link: "/scanner" },
  { title: "ifconfig", description: "عرض إعدادات الشبكة", type: "command", link: "/scanner" },
  { title: "netstat -tuln", description: "عرض المنافذ المفتوحة", type: "command", link: "/scanner" },
  { title: "ping", description: "اختبار الاتصال", type: "command", link: "/scanner" },
  { title: "wget", description: "تحميل ملف من الإنترنت", type: "command", link: "/scanner" },
  { title: "apt update", description: "تحديث قائمة الحزم", type: "command", link: "/scanner" },
  { title: "grep", description: "البحث داخل ملف", type: "command", link: "/scanner" },
  { title: "find", description: "البحث عن ملف", type: "command", link: "/scanner" },
  { title: "tar", description: "إنشاء أو فك أرشيف", type: "command", link: "/scanner" },
  { title: "ssh", description: "الاتصال عن بعد", type: "command", link: "/scanner" },
  
  // Tools
  { title: "Nmap", description: "فحص الشبكات والمنافذ", type: "tool", link: "/tools" },
  { title: "Metasploit", description: "إطار اختبار الاختراق", type: "tool", link: "/tools" },
  { title: "Burp Suite", description: "اختبار تطبيقات الويب", type: "tool", link: "/tools" },
  { title: "Wireshark", description: "تحليل حركة الشبكة", type: "tool", link: "/tools" },
  { title: "John the Ripper", description: "كسر كلمات المرور", type: "tool", link: "/tools" },
  { title: "Hydra", description: "هجمات Brute Force", type: "tool", link: "/tools" },
  { title: "Aircrack-ng", description: "اختراق شبكات WiFi", type: "tool", link: "/tools" },
  { title: "SQLMap", description: "حقن قواعد البيانات", type: "tool", link: "/tools" },
  { title: "Hashcat", description: "كسر التشفير المتقدم", type: "tool", link: "/tools" },
  { title: "Nikto", description: "فحص ثغرات الويب", type: "tool", link: "/tools" },
  { title: "Dirb", description: "اكتشاف المجلدات المخفية", type: "tool", link: "/tools" },
  { title: "Gobuster", description: "فحص DNS والمجلدات", type: "tool", link: "/tools" },
  { title: "Netcat", description: "أداة الشبكات الشاملة", type: "tool", link: "/tools" },
  
  // Scripts
  { title: "Port Scanner", description: "ماسح المنافذ بايثون", type: "script", link: "/scripts" },
  { title: "Password Generator", description: "مولد كلمات المرور", type: "script", link: "/scripts" },
  { title: "Hash Cracker", description: "فك تشفير الهاش", type: "script", link: "/scripts" },
  { title: "Network Scanner", description: "ماسح الشبكة", type: "script", link: "/scripts" },
  { title: "Keylogger", description: "راصد لوحة المفاتيح", type: "script", link: "/scripts" },
  { title: "Backdoor", description: "باب خلفي بسيط", type: "script", link: "/scripts" },

  // Guide Topics
  { title: "أساسيات الأمن السيبراني", description: "المفاهيم الأساسية ومثلث CIA", type: "guide", link: "/guide" },
  { title: "CIA Triad", description: "السرية والنزاهة والتوافر", type: "guide", link: "/guide" },
  { title: "اختبار الاختراق", description: "Penetration Testing ومراحله", type: "guide", link: "/guide" },
  { title: "هجمات SQL Injection", description: "حقن قواعد البيانات", type: "guide", link: "/guide" },
  { title: "هجمات XSS", description: "Cross-Site Scripting", type: "guide", link: "/guide" },
  { title: "هجمات التصيد", description: "Phishing والهندسة الاجتماعية", type: "guide", link: "/guide" },
  { title: "أمن الشبكات", description: "Network Security", type: "guide", link: "/guide" },
  { title: "التشفير", description: "Cryptography والتشفير", type: "guide", link: "/guide" },
  { title: "OWASP Top 10", description: "أهم عشر ثغرات في تطبيقات الويب", type: "guide", link: "/guide" },
  { title: "أمن السحاب", description: "Cloud Security", type: "guide", link: "/guide" },
  { title: "التحقيق الجنائي الرقمي", description: "Digital Forensics", type: "guide", link: "/guide" },
  { title: "البرمجة للأمن السيبراني", description: "Python و Bash و PowerShell", type: "guide", link: "/guide" },
  { title: "إدارة المخاطر", description: "Risk Management", type: "guide", link: "/guide" },
  { title: "أمن الهواتف", description: "Mobile Security", type: "guide", link: "/guide" },
  { title: "Privilege Escalation", description: "رفع الصلاحيات", type: "guide", link: "/guide" },
  
  // Download Topics
  { title: "تحميل كالي لينكس", description: "خطوات تنزيل كالي لينكس", type: "download", link: "/download" },
  { title: "Kali Linux ISO", description: "تحميل ملف ISO الرسمي", type: "download", link: "/download" },
  { title: "VirtualBox Installation", description: "تثبيت كالي على VirtualBox", type: "download", link: "/download" },
  { title: "VMware Installation", description: "تثبيت كالي على VMware", type: "download", link: "/download" },
  { title: "WSL Installation", description: "تثبيت كالي على Windows WSL", type: "download", link: "/download" },
  { title: "Dual Boot", description: "تثبيت كالي بجانب Windows", type: "download", link: "/download" },
  { title: "Live USB", description: "تشغيل كالي من USB", type: "download", link: "/download" },
  { title: "Kali NetHunter", description: "كالي للهواتف الذكية", type: "download", link: "/download" },
  { title: "Kali ARM", description: "كالي لأجهزة Raspberry Pi", type: "download", link: "/download" },
  { title: "متطلبات النظام", description: "System Requirements", type: "download", link: "/download" },
  { title: "Termux كالي", description: "تثبيت كالي على Termux", type: "download", link: "/download" },
];

const QuickSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.includes(query)
      );
      setResults(filtered.slice(0, 10));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (item: SearchItem) => {
    navigate(item.link);
    setIsOpen(false);
    setQuery("");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "command":
        return <Terminal className="w-4 h-4" />;
      case "tool":
        return <Wrench className="w-4 h-4" />;
      case "script":
        return <FileCode className="w-4 h-4" />;
      case "guide":
        return <BookOpen className="w-4 h-4" />;
      case "download":
        return <Download className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "command":
        return "أمر";
      case "tool":
        return "أداة";
      case "script":
        return "سكربت";
      case "guide":
        return "دليل";
      case "download":
        return "تحميل";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/80 border border-border/50 hover:border-primary/50 hover:bg-secondary transition-all w-full max-w-xl mx-auto"
      >
        <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-muted-foreground text-sm flex-1 text-right">
          ابحث عن أي أداة، أمر، سكربت، دليل أو خطوات التحميل...
        </span>
        <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-background/50 text-xs text-muted-foreground border border-border/50">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(false);
            setQuery("");
          }}
        >
          <div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cyber-card overflow-hidden shadow-2xl shadow-primary/10">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-border/50">
                <Search className="w-5 h-5 text-primary" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن أي أداة، أمر، سكربت، دليل أو خطوات التحميل..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
                  dir="rtl"
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto p-2">
                  {results.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(item)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/80 transition-colors group text-right"
                    >
                      <span className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                        {getIcon(item.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {item.title}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                            {getTypeLabel(item.type)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity rotate-180" />
                    </button>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {query.length > 0 && results.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>لا توجد نتائج لـ "{query}"</p>
                </div>
              )}

              {/* Quick Links */}
              {query.length === 0 && (
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-3">روابط سريعة</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate("/scanner")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                    >
                      <Terminal className="w-4 h-4 text-primary" />
                      <span>أوامر كالي</span>
                    </button>
                    <button
                      onClick={() => navigate("/tools")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                    >
                      <Wrench className="w-4 h-4 text-primary" />
                      <span>الأدوات</span>
                    </button>
                    <button
                      onClick={() => navigate("/scripts")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                    >
                      <FileCode className="w-4 h-4 text-primary" />
                      <span>السكربتات</span>
                    </button>
                    <button
                      onClick={() => navigate("/guide")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                    >
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>الدليل الكامل</span>
                    </button>
                    <button
                      onClick={() => navigate("/download")}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
                    >
                      <Download className="w-4 h-4 text-primary" />
                      <span>التحميل</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickSearch;
