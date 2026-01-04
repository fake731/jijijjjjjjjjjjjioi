import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, Copy, Check, Globe, FolderOpen, FileText, User, Settings, HardDrive, Network, Search, Trash2, Edit, Archive, Clock, Key, Shield, Monitor, Cpu, Database, Command, ArrowRight, Home, List, Eye, Download, Upload, Layers, Box, RefreshCw, Power, Zap, Wifi, Bug, Server } from "lucide-react";
import { useState } from "react";

interface KaliCommand {
  command: string;
  description: { ar: string; en: string };
  icon: React.ReactNode;
  category: string;
}

const kaliCommands: KaliCommand[] = [
  // Navigation Commands
  { command: "cd /path/to/directory", description: { ar: "تغيير المجلد الحالي", en: "Change current directory" }, icon: <FolderOpen className="w-5 h-5" />, category: "navigation" },
  { command: "cd ..", description: { ar: "الرجوع للمجلد السابق", en: "Go to parent directory" }, icon: <ArrowRight className="w-5 h-5 rotate-180" />, category: "navigation" },
  { command: "cd ~", description: { ar: "الذهاب للمجلد الرئيسي", en: "Go to home directory" }, icon: <Home className="w-5 h-5" />, category: "navigation" },
  { command: "cd -", description: { ar: "الرجوع للمجلد السابق", en: "Go to previous directory" }, icon: <ArrowRight className="w-5 h-5" />, category: "navigation" },
  { command: "pwd", description: { ar: "عرض المسار الحالي", en: "Print working directory" }, icon: <FolderOpen className="w-5 h-5" />, category: "navigation" },
  { command: "pushd /path", description: { ar: "حفظ المجلد والانتقال", en: "Save directory and change" }, icon: <FolderOpen className="w-5 h-5" />, category: "navigation" },
  { command: "popd", description: { ar: "العودة للمجلد المحفوظ", en: "Return to saved directory" }, icon: <FolderOpen className="w-5 h-5" />, category: "navigation" },
  
  // Listing Commands
  { command: "ls", description: { ar: "عرض محتويات المجلد", en: "List directory contents" }, icon: <List className="w-5 h-5" />, category: "listing" },
  { command: "ls -la", description: { ar: "عرض كل الملفات مع التفاصيل", en: "List all files with details" }, icon: <Eye className="w-5 h-5" />, category: "listing" },
  { command: "ls -lh", description: { ar: "عرض الملفات بأحجام مقروءة", en: "List with human-readable sizes" }, icon: <FileText className="w-5 h-5" />, category: "listing" },
  { command: "ls -R", description: { ar: "عرض المحتويات بشكل متداخل", en: "List recursively" }, icon: <Layers className="w-5 h-5" />, category: "listing" },
  { command: "ls -t", description: { ar: "ترتيب حسب وقت التعديل", en: "Sort by modification time" }, icon: <Clock className="w-5 h-5" />, category: "listing" },
  { command: "ls -S", description: { ar: "ترتيب حسب الحجم", en: "Sort by file size" }, icon: <HardDrive className="w-5 h-5" />, category: "listing" },
  { command: "tree", description: { ar: "عرض هيكل المجلدات", en: "Display directory tree" }, icon: <Layers className="w-5 h-5" />, category: "listing" },
  { command: "tree -L 2", description: { ar: "عرض شجرة بعمق مستويين", en: "Tree with 2 level depth" }, icon: <Layers className="w-5 h-5" />, category: "listing" },
  
  // File Operations
  { command: "cat filename", description: { ar: "عرض محتوى ملف", en: "Display file content" }, icon: <FileText className="w-5 h-5" />, category: "files" },
  { command: "head -n 10 filename", description: { ar: "عرض أول 10 أسطر", en: "Show first 10 lines" }, icon: <FileText className="w-5 h-5" />, category: "files" },
  { command: "tail -n 10 filename", description: { ar: "عرض آخر 10 أسطر", en: "Show last 10 lines" }, icon: <FileText className="w-5 h-5" />, category: "files" },
  { command: "tail -f logfile", description: { ar: "متابعة ملف السجل", en: "Follow log file in realtime" }, icon: <Eye className="w-5 h-5" />, category: "files" },
  { command: "less filename", description: { ar: "قراءة ملف مع التمرير", en: "View file with scrolling" }, icon: <Eye className="w-5 h-5" />, category: "files" },
  { command: "more filename", description: { ar: "عرض ملف صفحة صفحة", en: "View file page by page" }, icon: <Eye className="w-5 h-5" />, category: "files" },
  { command: "nano filename", description: { ar: "تحرير ملف بمحرر nano", en: "Edit file with nano" }, icon: <Edit className="w-5 h-5" />, category: "files" },
  { command: "vim filename", description: { ar: "تحرير ملف بمحرر vim", en: "Edit file with vim" }, icon: <Edit className="w-5 h-5" />, category: "files" },
  { command: "touch filename", description: { ar: "إنشاء ملف جديد", en: "Create new file" }, icon: <FileText className="w-5 h-5" />, category: "files" },
  { command: "cp source dest", description: { ar: "نسخ ملف أو مجلد", en: "Copy file or directory" }, icon: <Copy className="w-5 h-5" />, category: "files" },
  { command: "cp -r source dest", description: { ar: "نسخ مجلد بمحتوياته", en: "Copy directory recursively" }, icon: <Copy className="w-5 h-5" />, category: "files" },
  { command: "mv source dest", description: { ar: "نقل أو إعادة تسمية", en: "Move or rename" }, icon: <ArrowRight className="w-5 h-5" />, category: "files" },
  { command: "rm filename", description: { ar: "حذف ملف", en: "Remove file" }, icon: <Trash2 className="w-5 h-5" />, category: "files" },
  { command: "rm -rf directory", description: { ar: "حذف مجلد بمحتوياته", en: "Remove directory recursively" }, icon: <Trash2 className="w-5 h-5" />, category: "files" },
  { command: "mkdir dirname", description: { ar: "إنشاء مجلد جديد", en: "Create new directory" }, icon: <FolderOpen className="w-5 h-5" />, category: "files" },
  { command: "mkdir -p path/to/dir", description: { ar: "إنشاء مجلدات متداخلة", en: "Create nested directories" }, icon: <FolderOpen className="w-5 h-5" />, category: "files" },
  { command: "ln -s source link", description: { ar: "إنشاء رابط رمزي", en: "Create symbolic link" }, icon: <FileText className="w-5 h-5" />, category: "files" },
  { command: "wc -l filename", description: { ar: "عدد أسطر الملف", en: "Count file lines" }, icon: <FileText className="w-5 h-5" />, category: "files" },
  { command: "diff file1 file2", description: { ar: "مقارنة ملفين", en: "Compare two files" }, icon: <FileText className="w-5 h-5" />, category: "files" },
  
  // User & Permissions
  { command: "sudo su", description: { ar: "الدخول كمستخدم root", en: "Switch to root user" }, icon: <Shield className="w-5 h-5" />, category: "permissions" },
  { command: "sudo command", description: { ar: "تنفيذ أمر كـ root", en: "Execute as root" }, icon: <Key className="w-5 h-5" />, category: "permissions" },
  { command: "whoami", description: { ar: "عرض اسم المستخدم الحالي", en: "Display current username" }, icon: <User className="w-5 h-5" />, category: "permissions" },
  { command: "id", description: { ar: "معلومات المستخدم والمجموعات", en: "User and groups info" }, icon: <User className="w-5 h-5" />, category: "permissions" },
  { command: "chmod 755 file", description: { ar: "تغيير صلاحيات الملف", en: "Change file permissions" }, icon: <Shield className="w-5 h-5" />, category: "permissions" },
  { command: "chmod +x file", description: { ar: "جعل الملف قابل للتنفيذ", en: "Make file executable" }, icon: <Shield className="w-5 h-5" />, category: "permissions" },
  { command: "chown user:group file", description: { ar: "تغيير مالك الملف", en: "Change file owner" }, icon: <User className="w-5 h-5" />, category: "permissions" },
  { command: "passwd", description: { ar: "تغيير كلمة المرور", en: "Change password" }, icon: <Key className="w-5 h-5" />, category: "permissions" },
  { command: "useradd username", description: { ar: "إضافة مستخدم جديد", en: "Add new user" }, icon: <User className="w-5 h-5" />, category: "permissions" },
  { command: "userdel username", description: { ar: "حذف مستخدم", en: "Delete user" }, icon: <User className="w-5 h-5" />, category: "permissions" },
  { command: "groupadd groupname", description: { ar: "إنشاء مجموعة جديدة", en: "Create new group" }, icon: <User className="w-5 h-5" />, category: "permissions" },
  
  // System Information
  { command: "uname -a", description: { ar: "معلومات النظام الكاملة", en: "Full system information" }, icon: <Monitor className="w-5 h-5" />, category: "system" },
  { command: "hostname", description: { ar: "اسم الجهاز", en: "Display hostname" }, icon: <Monitor className="w-5 h-5" />, category: "system" },
  { command: "uptime", description: { ar: "مدة تشغيل النظام", en: "System uptime" }, icon: <Clock className="w-5 h-5" />, category: "system" },
  { command: "df -h", description: { ar: "مساحة الأقراص", en: "Disk space usage" }, icon: <HardDrive className="w-5 h-5" />, category: "system" },
  { command: "du -sh folder", description: { ar: "حجم المجلد", en: "Folder size" }, icon: <HardDrive className="w-5 h-5" />, category: "system" },
  { command: "free -h", description: { ar: "استخدام الذاكرة", en: "Memory usage" }, icon: <Cpu className="w-5 h-5" />, category: "system" },
  { command: "top", description: { ar: "مراقبة العمليات", en: "Monitor processes" }, icon: <Monitor className="w-5 h-5" />, category: "system" },
  { command: "htop", description: { ar: "مراقبة متقدمة للعمليات", en: "Advanced process monitor" }, icon: <Cpu className="w-5 h-5" />, category: "system" },
  { command: "ps aux", description: { ar: "عرض كل العمليات", en: "List all processes" }, icon: <List className="w-5 h-5" />, category: "system" },
  { command: "ps aux | grep process", description: { ar: "البحث عن عملية معينة", en: "Find specific process" }, icon: <Search className="w-5 h-5" />, category: "system" },
  { command: "kill PID", description: { ar: "إنهاء عملية بالـ ID", en: "Kill process by ID" }, icon: <Power className="w-5 h-5" />, category: "system" },
  { command: "kill -9 PID", description: { ar: "إنهاء عملية بالقوة", en: "Force kill process" }, icon: <Power className="w-5 h-5" />, category: "system" },
  { command: "killall name", description: { ar: "إنهاء عملية بالاسم", en: "Kill process by name" }, icon: <Power className="w-5 h-5" />, category: "system" },
  { command: "dmesg", description: { ar: "رسائل النواة", en: "Kernel messages" }, icon: <Monitor className="w-5 h-5" />, category: "system" },
  { command: "lsblk", description: { ar: "عرض الأقراص", en: "List block devices" }, icon: <HardDrive className="w-5 h-5" />, category: "system" },
  { command: "lscpu", description: { ar: "معلومات المعالج", en: "CPU information" }, icon: <Cpu className="w-5 h-5" />, category: "system" },
  { command: "lsusb", description: { ar: "أجهزة USB المتصلة", en: "List USB devices" }, icon: <Monitor className="w-5 h-5" />, category: "system" },
  { command: "lspci", description: { ar: "أجهزة PCI المتصلة", en: "List PCI devices" }, icon: <Monitor className="w-5 h-5" />, category: "system" },
  
  // History & Search
  { command: "history", description: { ar: "عرض سجل الأوامر", en: "Show command history" }, icon: <Clock className="w-5 h-5" />, category: "history" },
  { command: "history | grep keyword", description: { ar: "البحث في السجل", en: "Search in history" }, icon: <Search className="w-5 h-5" />, category: "history" },
  { command: "!!", description: { ar: "تنفيذ آخر أمر", en: "Execute last command" }, icon: <Zap className="w-5 h-5" />, category: "history" },
  { command: "!n", description: { ar: "تنفيذ أمر من السجل", en: "Execute command n from history" }, icon: <Clock className="w-5 h-5" />, category: "history" },
  { command: "find /path -name filename", description: { ar: "البحث عن ملف", en: "Find a file" }, icon: <Search className="w-5 h-5" />, category: "history" },
  { command: "find /path -type f -size +100M", description: { ar: "البحث عن ملفات كبيرة", en: "Find large files" }, icon: <Search className="w-5 h-5" />, category: "history" },
  { command: "grep pattern file", description: { ar: "البحث داخل ملف", en: "Search in file" }, icon: <Search className="w-5 h-5" />, category: "history" },
  { command: "grep -r pattern /path", description: { ar: "البحث في كل الملفات", en: "Recursive search" }, icon: <Search className="w-5 h-5" />, category: "history" },
  { command: "grep -i pattern file", description: { ar: "بحث بدون حساسية الحروف", en: "Case insensitive search" }, icon: <Search className="w-5 h-5" />, category: "history" },
  { command: "locate filename", description: { ar: "بحث سريع عن ملف", en: "Quick file search" }, icon: <Zap className="w-5 h-5" />, category: "history" },
  { command: "which command", description: { ar: "مسار الأمر", en: "Command location" }, icon: <Search className="w-5 h-5" />, category: "history" },
  { command: "whereis command", description: { ar: "مسارات الأمر والدليل", en: "Command and manual locations" }, icon: <Search className="w-5 h-5" />, category: "history" },
  
  // Network
  { command: "ifconfig", description: { ar: "عرض إعدادات الشبكة", en: "Network configuration" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "ip addr", description: { ar: "عرض عناوين IP", en: "Show IP addresses" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "ip link", description: { ar: "عرض واجهات الشبكة", en: "Show network interfaces" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "ping host", description: { ar: "اختبار الاتصال", en: "Test connectivity" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "ping -c 5 host", description: { ar: "5 محاولات اتصال", en: "Ping 5 times" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "traceroute host", description: { ar: "تتبع مسار الاتصال", en: "Trace route to host" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "netstat -tuln", description: { ar: "عرض المنافذ المفتوحة", en: "Show open ports" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "netstat -anp", description: { ar: "عرض كل الاتصالات", en: "Show all connections" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "ss -tuln", description: { ar: "بديل netstat الحديث", en: "Modern netstat alternative" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "nslookup domain", description: { ar: "استعلام DNS", en: "DNS lookup" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "dig domain", description: { ar: "استعلام DNS متقدم", en: "Advanced DNS query" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "host domain", description: { ar: "معلومات النطاق", en: "Domain info" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "wget URL", description: { ar: "تحميل ملف من الإنترنت", en: "Download file from URL" }, icon: <Download className="w-5 h-5" />, category: "network" },
  { command: "wget -c URL", description: { ar: "استكمال التحميل", en: "Resume download" }, icon: <Download className="w-5 h-5" />, category: "network" },
  { command: "curl URL", description: { ar: "جلب محتوى من رابط", en: "Fetch content from URL" }, icon: <Download className="w-5 h-5" />, category: "network" },
  { command: "curl -O URL", description: { ar: "تحميل ملف", en: "Download file" }, icon: <Download className="w-5 h-5" />, category: "network" },
  { command: "ssh user@host", description: { ar: "الاتصال عن بعد", en: "Remote connection" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "ssh -p port user@host", description: { ar: "اتصال SSH بمنفذ مخصص", en: "SSH with custom port" }, icon: <Network className="w-5 h-5" />, category: "network" },
  { command: "scp file user@host:/path", description: { ar: "نسخ ملف عن بعد", en: "Secure copy file" }, icon: <Upload className="w-5 h-5" />, category: "network" },
  { command: "arp -a", description: { ar: "جدول ARP", en: "ARP table" }, icon: <Network className="w-5 h-5" />, category: "network" },
  
  // Package Management
  { command: "apt update", description: { ar: "تحديث قائمة الحزم", en: "Update package list" }, icon: <RefreshCw className="w-5 h-5" />, category: "packages" },
  { command: "apt upgrade", description: { ar: "ترقية الحزم المثبتة", en: "Upgrade installed packages" }, icon: <Upload className="w-5 h-5" />, category: "packages" },
  { command: "apt full-upgrade", description: { ar: "ترقية كاملة للنظام", en: "Full system upgrade" }, icon: <Upload className="w-5 h-5" />, category: "packages" },
  { command: "apt install package", description: { ar: "تثبيت حزمة جديدة", en: "Install new package" }, icon: <Box className="w-5 h-5" />, category: "packages" },
  { command: "apt remove package", description: { ar: "إزالة حزمة", en: "Remove package" }, icon: <Trash2 className="w-5 h-5" />, category: "packages" },
  { command: "apt purge package", description: { ar: "إزالة حزمة مع الإعدادات", en: "Remove package with config" }, icon: <Trash2 className="w-5 h-5" />, category: "packages" },
  { command: "apt search keyword", description: { ar: "البحث عن حزمة", en: "Search for package" }, icon: <Search className="w-5 h-5" />, category: "packages" },
  { command: "apt show package", description: { ar: "معلومات الحزمة", en: "Package information" }, icon: <Box className="w-5 h-5" />, category: "packages" },
  { command: "apt autoremove", description: { ar: "إزالة الحزم غير المستخدمة", en: "Remove unused packages" }, icon: <Trash2 className="w-5 h-5" />, category: "packages" },
  { command: "dpkg -l", description: { ar: "قائمة الحزم المثبتة", en: "List installed packages" }, icon: <List className="w-5 h-5" />, category: "packages" },
  { command: "dpkg -i package.deb", description: { ar: "تثبيت ملف .deb", en: "Install .deb file" }, icon: <Box className="w-5 h-5" />, category: "packages" },
  
  // Compression
  { command: "tar -cvf archive.tar files", description: { ar: "إنشاء أرشيف tar", en: "Create tar archive" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  { command: "tar -xvf archive.tar", description: { ar: "فك أرشيف tar", en: "Extract tar archive" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  { command: "tar -czvf archive.tar.gz files", description: { ar: "إنشاء أرشيف مضغوط", en: "Create gzip compressed archive" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  { command: "tar -xzvf archive.tar.gz", description: { ar: "فك أرشيف gzip", en: "Extract gzip archive" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  { command: "gzip filename", description: { ar: "ضغط ملف بـ gzip", en: "Compress with gzip" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  { command: "gunzip filename.gz", description: { ar: "فك ضغط gzip", en: "Decompress gzip" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  { command: "zip archive.zip files", description: { ar: "إنشاء ملف zip", en: "Create zip file" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  { command: "unzip archive.zip", description: { ar: "فك ملف مضغوط", en: "Extract zip file" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  { command: "7z x archive.7z", description: { ar: "فك أرشيف 7z", en: "Extract 7z archive" }, icon: <Archive className="w-5 h-5" />, category: "compression" },
  
  // Other Useful
  { command: "clear", description: { ar: "مسح الشاشة", en: "Clear terminal screen" }, icon: <Monitor className="w-5 h-5" />, category: "other" },
  { command: "reset", description: { ar: "إعادة تعيين الطرفية", en: "Reset terminal" }, icon: <RefreshCw className="w-5 h-5" />, category: "other" },
  { command: "exit", description: { ar: "الخروج من الطرفية", en: "Exit terminal" }, icon: <Power className="w-5 h-5" />, category: "other" },
  { command: "reboot", description: { ar: "إعادة تشغيل النظام", en: "Reboot system" }, icon: <RefreshCw className="w-5 h-5" />, category: "other" },
  { command: "shutdown now", description: { ar: "إيقاف النظام", en: "Shutdown system" }, icon: <Power className="w-5 h-5" />, category: "other" },
  { command: "man command", description: { ar: "عرض دليل الأمر", en: "Show command manual" }, icon: <FileText className="w-5 h-5" />, category: "other" },
  { command: "command --help", description: { ar: "مساعدة سريعة", en: "Quick help" }, icon: <FileText className="w-5 h-5" />, category: "other" },
  { command: "echo text", description: { ar: "طباعة نص", en: "Print text" }, icon: <Command className="w-5 h-5" />, category: "other" },
  { command: "echo $VARIABLE", description: { ar: "عرض متغير بيئي", en: "Show environment variable" }, icon: <Settings className="w-5 h-5" />, category: "other" },
  { command: "export VAR=value", description: { ar: "تعيين متغير بيئي", en: "Set environment variable" }, icon: <Settings className="w-5 h-5" />, category: "other" },
  { command: "date", description: { ar: "عرض التاريخ والوقت", en: "Show date and time" }, icon: <Clock className="w-5 h-5" />, category: "other" },
  { command: "cal", description: { ar: "عرض التقويم", en: "Show calendar" }, icon: <Clock className="w-5 h-5" />, category: "other" },
  { command: "alias name='command'", description: { ar: "إنشاء اختصار أمر", en: "Create command alias" }, icon: <Command className="w-5 h-5" />, category: "other" },
  { command: "crontab -e", description: { ar: "تحرير المهام المجدولة", en: "Edit scheduled tasks" }, icon: <Clock className="w-5 h-5" />, category: "other" },
  { command: "watch -n 1 command", description: { ar: "تنفيذ أمر كل ثانية", en: "Execute command every second" }, icon: <Eye className="w-5 h-5" />, category: "other" },
  { command: "screen", description: { ar: "جلسة طرفية مستمرة", en: "Persistent terminal session" }, icon: <Monitor className="w-5 h-5" />, category: "other" },
  { command: "tmux", description: { ar: "مدير جلسات متقدم", en: "Advanced session manager" }, icon: <Monitor className="w-5 h-5" />, category: "other" },
  
  // Security Commands
  { command: "nikto -h target", description: { ar: "فحص أمان الويب", en: "Web security scan" }, icon: <Shield className="w-5 h-5" />, category: "security" },
  { command: "nmap -sV target", description: { ar: "فحص الخدمات", en: "Service scan" }, icon: <Network className="w-5 h-5" />, category: "security" },
  { command: "nmap -sS -p- target", description: { ar: "فحص كل المنافذ", en: "Full port scan" }, icon: <Network className="w-5 h-5" />, category: "security" },
  { command: "hydra -l admin -P pass.txt ssh://target", description: { ar: "هجوم SSH", en: "SSH brute force" }, icon: <Key className="w-5 h-5" />, category: "security" },
  { command: "sqlmap -u 'URL?id=1'", description: { ar: "فحص SQL Injection", en: "SQL injection scan" }, icon: <Database className="w-5 h-5" />, category: "security" },
  { command: "dirb http://target /usr/share/wordlists/dirb/common.txt", description: { ar: "اكتشاف المجلدات", en: "Directory discovery" }, icon: <FolderOpen className="w-5 h-5" />, category: "security" },
  { command: "gobuster dir -u http://target -w wordlist.txt", description: { ar: "Fuzzing المجلدات", en: "Directory fuzzing" }, icon: <Search className="w-5 h-5" />, category: "security" },
  { command: "john --wordlist=rockyou.txt hash.txt", description: { ar: "كسر الهاش", en: "Crack hash" }, icon: <Key className="w-5 h-5" />, category: "security" },
  { command: "hashcat -m 0 hash.txt wordlist.txt", description: { ar: "كسر هاش GPU", en: "GPU hash cracking" }, icon: <Cpu className="w-5 h-5" />, category: "security" },
  { command: "msfconsole", description: { ar: "تشغيل Metasploit", en: "Start Metasploit" }, icon: <Terminal className="w-5 h-5" />, category: "security" },
  { command: "airmon-ng start wlan0", description: { ar: "تفعيل وضع المراقبة", en: "Enable monitor mode" }, icon: <Wifi className="w-5 h-5" />, category: "security" },
  { command: "airodump-ng wlan0mon", description: { ar: "مسح شبكات WiFi", en: "Scan WiFi networks" }, icon: <Wifi className="w-5 h-5" />, category: "security" },
  { command: "wpscan --url http://target", description: { ar: "فحص WordPress", en: "WordPress scan" }, icon: <Globe className="w-5 h-5" />, category: "security" },
  { command: "enum4linux -a target", description: { ar: "استطلاع SMB", en: "SMB enumeration" }, icon: <Server className="w-5 h-5" />, category: "security" },
  { command: "smbclient -L //target", description: { ar: "قائمة مشاركات SMB", en: "List SMB shares" }, icon: <HardDrive className="w-5 h-5" />, category: "security" },
  { command: "crackmapexec smb target -u user -p pass", description: { ar: "فحص SMB", en: "SMB check" }, icon: <Shield className="w-5 h-5" />, category: "security" },
  { command: "responder -I eth0", description: { ar: "التقاط NTLM", en: "Capture NTLM" }, icon: <Eye className="w-5 h-5" />, category: "security" },
  { command: "tcpdump -i eth0 -w capture.pcap", description: { ar: "التقاط الحزم", en: "Capture packets" }, icon: <Network className="w-5 h-5" />, category: "security" },
  { command: "netdiscover -i eth0", description: { ar: "اكتشاف الشبكة", en: "Network discovery" }, icon: <Network className="w-5 h-5" />, category: "security" },
  { command: "arp-scan -l", description: { ar: "فحص ARP", en: "ARP scan" }, icon: <Network className="w-5 h-5" />, category: "security" },
  { command: "whatweb http://target", description: { ar: "بصمات تقنيات الويب", en: "Web tech fingerprint" }, icon: <Globe className="w-5 h-5" />, category: "security" },
  { command: "theHarvester -d domain.com -b all", description: { ar: "جمع المعلومات", en: "Info gathering" }, icon: <Search className="w-5 h-5" />, category: "security" },
  { command: "sublist3r -d domain.com", description: { ar: "اكتشاف النطاقات الفرعية", en: "Subdomain discovery" }, icon: <Globe className="w-5 h-5" />, category: "security" },
  { command: "nuclei -u https://target", description: { ar: "فحص الثغرات", en: "Vulnerability scan" }, icon: <Bug className="w-5 h-5" />, category: "security" },
  { command: "masscan -p1-65535 target --rate=10000", description: { ar: "فحص سريع للمنافذ", en: "Fast port scan" }, icon: <Zap className="w-5 h-5" />, category: "security" },
  { command: "ffuf -u http://target/FUZZ -w wordlist.txt", description: { ar: "Fuzzing الويب", en: "Web fuzzing" }, icon: <Search className="w-5 h-5" />, category: "security" },
  { command: "./linpeas.sh", description: { ar: "تصعيد صلاحيات Linux", en: "Linux privilege escalation" }, icon: <Shield className="w-5 h-5" />, category: "security" },
  { command: "searchsploit keyword", description: { ar: "بحث عن ثغرات", en: "Search exploits" }, icon: <Bug className="w-5 h-5" />, category: "security" },
  
  // Git Commands
  { command: "git clone URL", description: { ar: "استنساخ مستودع", en: "Clone repository" }, icon: <Download className="w-5 h-5" />, category: "git" },
  { command: "git pull", description: { ar: "تحديث المستودع", en: "Update repository" }, icon: <RefreshCw className="w-5 h-5" />, category: "git" },
  { command: "git status", description: { ar: "حالة التغييرات", en: "Check status" }, icon: <Eye className="w-5 h-5" />, category: "git" },
  { command: "git add .", description: { ar: "إضافة كل الملفات", en: "Add all files" }, icon: <Upload className="w-5 h-5" />, category: "git" },
  { command: "git commit -m 'message'", description: { ar: "حفظ التغييرات", en: "Commit changes" }, icon: <FileText className="w-5 h-5" />, category: "git" },
  { command: "git push", description: { ar: "رفع التغييرات", en: "Push changes" }, icon: <Upload className="w-5 h-5" />, category: "git" },
  { command: "git branch", description: { ar: "عرض الفروع", en: "List branches" }, icon: <Layers className="w-5 h-5" />, category: "git" },
  { command: "git checkout branch", description: { ar: "التبديل للفرع", en: "Switch branch" }, icon: <ArrowRight className="w-5 h-5" />, category: "git" },
  { command: "git log --oneline", description: { ar: "سجل مختصر", en: "Short log" }, icon: <Clock className="w-5 h-5" />, category: "git" },
  { command: "git diff", description: { ar: "عرض التغييرات", en: "Show changes" }, icon: <Eye className="w-5 h-5" />, category: "git" },
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
  { id: "security", label: { ar: "الأمان", en: "Security" } },
  { id: "git", label: { ar: "Git", en: "Git" } },
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
                  className="cyber-card p-5 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-14 h-14 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                      {cmd.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <code className="text-primary text-base font-mono bg-background/50 px-3 py-2 rounded-lg break-all flex-1" dir="ltr">
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
                      <p className="text-muted-foreground text-base">
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