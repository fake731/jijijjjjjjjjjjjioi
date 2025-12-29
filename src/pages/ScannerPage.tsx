import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, Copy, Check, Globe, FolderOpen, FileText, User, Settings, HardDrive, Network, Search, Trash2, Edit, Archive, Clock, Key, Shield, Monitor, Cpu, Database, Command, ArrowRight, Home, List, Eye, Download, Upload, Layers, Box, RefreshCw, Power, Zap } from "lucide-react";
import { useState } from "react";

interface KaliCommand {
  command: string;
  description: { ar: string; en: string };
  icon: React.ReactNode;
  category: string;
}

const kaliCommands: KaliCommand[] = [
  // Navigation Commands
  { command: "cd /path/to/directory", description: { ar: "تغيير المجلد الحالي", en: "Change current directory" }, icon: <FolderOpen className="w-4 h-4" />, category: "navigation" },
  { command: "cd ..", description: { ar: "الرجوع للمجلد السابق", en: "Go to parent directory" }, icon: <ArrowRight className="w-4 h-4 rotate-180" />, category: "navigation" },
  { command: "cd ~", description: { ar: "الذهاب للمجلد الرئيسي", en: "Go to home directory" }, icon: <Home className="w-4 h-4" />, category: "navigation" },
  { command: "pwd", description: { ar: "عرض المسار الحالي", en: "Print working directory" }, icon: <FolderOpen className="w-4 h-4" />, category: "navigation" },
  
  // Listing Commands
  { command: "ls", description: { ar: "عرض محتويات المجلد", en: "List directory contents" }, icon: <List className="w-4 h-4" />, category: "listing" },
  { command: "ls -la", description: { ar: "عرض كل الملفات مع التفاصيل", en: "List all files with details" }, icon: <Eye className="w-4 h-4" />, category: "listing" },
  { command: "ls -lh", description: { ar: "عرض الملفات بأحجام مقروءة", en: "List with human-readable sizes" }, icon: <FileText className="w-4 h-4" />, category: "listing" },
  { command: "tree", description: { ar: "عرض هيكل المجلدات", en: "Display directory tree" }, icon: <Layers className="w-4 h-4" />, category: "listing" },
  
  // File Operations
  { command: "cat filename", description: { ar: "عرض محتوى ملف", en: "Display file content" }, icon: <FileText className="w-4 h-4" />, category: "files" },
  { command: "head -n 10 filename", description: { ar: "عرض أول 10 أسطر", en: "Show first 10 lines" }, icon: <FileText className="w-4 h-4" />, category: "files" },
  { command: "tail -n 10 filename", description: { ar: "عرض آخر 10 أسطر", en: "Show last 10 lines" }, icon: <FileText className="w-4 h-4" />, category: "files" },
  { command: "less filename", description: { ar: "قراءة ملف مع التمرير", en: "View file with scrolling" }, icon: <Eye className="w-4 h-4" />, category: "files" },
  { command: "nano filename", description: { ar: "تحرير ملف بمحرر nano", en: "Edit file with nano" }, icon: <Edit className="w-4 h-4" />, category: "files" },
  { command: "vim filename", description: { ar: "تحرير ملف بمحرر vim", en: "Edit file with vim" }, icon: <Edit className="w-4 h-4" />, category: "files" },
  { command: "touch filename", description: { ar: "إنشاء ملف جديد", en: "Create new file" }, icon: <FileText className="w-4 h-4" />, category: "files" },
  { command: "cp source dest", description: { ar: "نسخ ملف أو مجلد", en: "Copy file or directory" }, icon: <Copy className="w-4 h-4" />, category: "files" },
  { command: "mv source dest", description: { ar: "نقل أو إعادة تسمية", en: "Move or rename" }, icon: <ArrowRight className="w-4 h-4" />, category: "files" },
  { command: "rm filename", description: { ar: "حذف ملف", en: "Remove file" }, icon: <Trash2 className="w-4 h-4" />, category: "files" },
  { command: "rm -rf directory", description: { ar: "حذف مجلد بمحتوياته", en: "Remove directory recursively" }, icon: <Trash2 className="w-4 h-4" />, category: "files" },
  { command: "mkdir dirname", description: { ar: "إنشاء مجلد جديد", en: "Create new directory" }, icon: <FolderOpen className="w-4 h-4" />, category: "files" },
  
  // User & Permissions
  { command: "sudo su", description: { ar: "الدخول كمستخدم root", en: "Switch to root user" }, icon: <Shield className="w-4 h-4" />, category: "permissions" },
  { command: "sudo command", description: { ar: "تنفيذ أمر كـ root", en: "Execute as root" }, icon: <Key className="w-4 h-4" />, category: "permissions" },
  { command: "whoami", description: { ar: "عرض اسم المستخدم الحالي", en: "Display current username" }, icon: <User className="w-4 h-4" />, category: "permissions" },
  { command: "chmod 755 file", description: { ar: "تغيير صلاحيات الملف", en: "Change file permissions" }, icon: <Shield className="w-4 h-4" />, category: "permissions" },
  { command: "chown user:group file", description: { ar: "تغيير مالك الملف", en: "Change file owner" }, icon: <User className="w-4 h-4" />, category: "permissions" },
  { command: "passwd", description: { ar: "تغيير كلمة المرور", en: "Change password" }, icon: <Key className="w-4 h-4" />, category: "permissions" },
  
  // System Information
  { command: "uname -a", description: { ar: "معلومات النظام الكاملة", en: "Full system information" }, icon: <Monitor className="w-4 h-4" />, category: "system" },
  { command: "df -h", description: { ar: "مساحة الأقراص", en: "Disk space usage" }, icon: <HardDrive className="w-4 h-4" />, category: "system" },
  { command: "free -h", description: { ar: "استخدام الذاكرة", en: "Memory usage" }, icon: <Cpu className="w-4 h-4" />, category: "system" },
  { command: "top", description: { ar: "مراقبة العمليات", en: "Monitor processes" }, icon: <Monitor className="w-4 h-4" />, category: "system" },
  { command: "htop", description: { ar: "مراقبة متقدمة للعمليات", en: "Advanced process monitor" }, icon: <Cpu className="w-4 h-4" />, category: "system" },
  { command: "ps aux", description: { ar: "عرض كل العمليات", en: "List all processes" }, icon: <List className="w-4 h-4" />, category: "system" },
  { command: "kill PID", description: { ar: "إنهاء عملية بالـ ID", en: "Kill process by ID" }, icon: <Power className="w-4 h-4" />, category: "system" },
  { command: "killall name", description: { ar: "إنهاء عملية بالاسم", en: "Kill process by name" }, icon: <Power className="w-4 h-4" />, category: "system" },
  
  // History & Search
  { command: "history", description: { ar: "عرض سجل الأوامر", en: "Show command history" }, icon: <Clock className="w-4 h-4" />, category: "history" },
  { command: "history | grep keyword", description: { ar: "البحث في السجل", en: "Search in history" }, icon: <Search className="w-4 h-4" />, category: "history" },
  { command: "find /path -name filename", description: { ar: "البحث عن ملف", en: "Find a file" }, icon: <Search className="w-4 h-4" />, category: "history" },
  { command: "grep pattern file", description: { ar: "البحث داخل ملف", en: "Search in file" }, icon: <Search className="w-4 h-4" />, category: "history" },
  { command: "locate filename", description: { ar: "بحث سريع عن ملف", en: "Quick file search" }, icon: <Zap className="w-4 h-4" />, category: "history" },
  
  // Network
  { command: "ifconfig", description: { ar: "عرض إعدادات الشبكة", en: "Network configuration" }, icon: <Network className="w-4 h-4" />, category: "network" },
  { command: "ip addr", description: { ar: "عرض عناوين IP", en: "Show IP addresses" }, icon: <Network className="w-4 h-4" />, category: "network" },
  { command: "ping host", description: { ar: "اختبار الاتصال", en: "Test connectivity" }, icon: <Network className="w-4 h-4" />, category: "network" },
  { command: "netstat -tuln", description: { ar: "عرض المنافذ المفتوحة", en: "Show open ports" }, icon: <Network className="w-4 h-4" />, category: "network" },
  { command: "wget URL", description: { ar: "تحميل ملف من الإنترنت", en: "Download file from URL" }, icon: <Download className="w-4 h-4" />, category: "network" },
  { command: "curl URL", description: { ar: "جلب محتوى من رابط", en: "Fetch content from URL" }, icon: <Download className="w-4 h-4" />, category: "network" },
  
  // Package Management
  { command: "apt update", description: { ar: "تحديث قائمة الحزم", en: "Update package list" }, icon: <RefreshCw className="w-4 h-4" />, category: "packages" },
  { command: "apt upgrade", description: { ar: "ترقية الحزم المثبتة", en: "Upgrade installed packages" }, icon: <Upload className="w-4 h-4" />, category: "packages" },
  { command: "apt install package", description: { ar: "تثبيت حزمة جديدة", en: "Install new package" }, icon: <Box className="w-4 h-4" />, category: "packages" },
  { command: "apt remove package", description: { ar: "إزالة حزمة", en: "Remove package" }, icon: <Trash2 className="w-4 h-4" />, category: "packages" },
  
  // Compression
  { command: "tar -cvf archive.tar files", description: { ar: "إنشاء أرشيف tar", en: "Create tar archive" }, icon: <Archive className="w-4 h-4" />, category: "compression" },
  { command: "tar -xvf archive.tar", description: { ar: "فك أرشيف tar", en: "Extract tar archive" }, icon: <Archive className="w-4 h-4" />, category: "compression" },
  { command: "gzip filename", description: { ar: "ضغط ملف بـ gzip", en: "Compress with gzip" }, icon: <Archive className="w-4 h-4" />, category: "compression" },
  { command: "unzip archive.zip", description: { ar: "فك ملف مضغوط", en: "Extract zip file" }, icon: <Archive className="w-4 h-4" />, category: "compression" },
  
  // Other Useful
  { command: "clear", description: { ar: "مسح الشاشة", en: "Clear terminal screen" }, icon: <Monitor className="w-4 h-4" />, category: "other" },
  { command: "exit", description: { ar: "الخروج من الطرفية", en: "Exit terminal" }, icon: <Power className="w-4 h-4" />, category: "other" },
  { command: "reboot", description: { ar: "إعادة تشغيل النظام", en: "Reboot system" }, icon: <RefreshCw className="w-4 h-4" />, category: "other" },
  { command: "shutdown now", description: { ar: "إيقاف النظام", en: "Shutdown system" }, icon: <Power className="w-4 h-4" />, category: "other" },
  { command: "man command", description: { ar: "عرض دليل الأمر", en: "Show command manual" }, icon: <FileText className="w-4 h-4" />, category: "other" },
  { command: "echo text", description: { ar: "طباعة نص", en: "Print text" }, icon: <Command className="w-4 h-4" />, category: "other" },
  { command: "date", description: { ar: "عرض التاريخ والوقت", en: "Show date and time" }, icon: <Clock className="w-4 h-4" />, category: "other" },
  { command: "cal", description: { ar: "عرض التقويم", en: "Show calendar" }, icon: <Clock className="w-4 h-4" />, category: "other" },
];

const categories = [
  { id: "all", label: { ar: "الكل", en: "All" } },
  { id: "navigation", label: { ar: "التنقل", en: "Navigation" } },
  { id: "listing", label: { ar: "العرض", en: "Listing" } },
  { id: "files", label: { ar: "الملفات", en: "Files" } },
  { id: "permissions", label: { ar: "الصلاحيات", en: "Permissions" } },
  { id: "system", label: { ar: "النظام", en: "System" } },
  { id: "history", label: { ar: "البحث", en: "Search" } },
  { id: "network", label: { ar: "الشبكة", en: "Network" } },
  { id: "packages", label: { ar: "الحزم", en: "Packages" } },
  { id: "compression", label: { ar: "الضغط", en: "Compression" } },
  { id: "other", label: { ar: "أخرى", en: "Other" } },
];

const ScannerPage = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const filteredCommands = kaliCommands.filter((cmd) => {
    const matchesCategory = activeCategory === "all" || cmd.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description[language].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const t = {
    title: language === "ar" ? "أوامر كالي لينكس" : "Kali Linux Commands",
    subtitle: language === "ar" ? "أهم الأوامر الأساسية لنظام كالي لينكس" : "Essential commands for Kali Linux",
    searchPlaceholder: language === "ar" ? "ابحث عن أمر..." : "Search for a command...",
    commandsCount: language === "ar" ? `${filteredCommands.length} أمر` : `${filteredCommands.length} commands`,
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
                <Terminal className="w-10 h-10 text-primary" />
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

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary border border-border/50 text-muted-foreground hover:border-primary/50"
                }`}
              >
                {language === "ar" ? cat.label.ar : cat.label.en}
              </button>
            ))}
          </div>

          {/* Commands Count */}
          <div className="text-center mb-6">
            <span className="text-muted-foreground text-sm">{t.commandsCount}</span>
          </div>

          {/* Commands Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCommands.map((cmd, index) => (
                <div
                  key={index}
                  className="cyber-card p-4 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                      {cmd.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-primary text-sm font-mono bg-background/50 px-2 py-1 rounded break-all flex-1" dir="ltr">
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