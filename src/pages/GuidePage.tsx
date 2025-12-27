import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Shield, Target, Eye, Lock, Network, Database, Terminal, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Zap, Bug, FileCode, Server, Wifi, Key, Globe, Cpu } from "lucide-react";
import { useState } from "react";

interface SubTopic {
  title: string;
  content: string[];
}

interface GuideTopic {
  icon: React.ElementType;
  title: string;
  description: string;
  subTopics: SubTopic[];
}

const guideTopics: GuideTopic[] = [
  {
    icon: Shield,
    title: "أساسيات الأمن السيبراني",
    description: "تعرف على المفاهيم الأساسية والمبادئ الثلاثة للأمن السيبراني",
    subTopics: [
      {
        title: "ما هو الأمن السيبراني؟",
        content: [
          "الأمن السيبراني هو مجموعة من التقنيات والممارسات المصممة لحماية الأنظمة والشبكات والبيانات من الهجمات الإلكترونية",
          "يشمل حماية الأجهزة (Hardware) والبرمجيات (Software) والبيانات من الوصول غير المصرح به",
          "الهدف الرئيسي هو ضمان سرية وسلامة وتوافر المعلومات (CIA Triad)",
          "يتضمن عدة مجالات: أمن الشبكات، أمن التطبيقات، أمن المعلومات، التعافي من الكوارث",
          "أصبح الأمن السيبراني ضرورة ملحة مع تزايد الاعتماد على التكنولوجيا في جميع جوانب الحياة",
        ],
      },
      {
        title: "مثلث CIA - السرية والنزاهة والتوافر",
        content: [
          "السرية (Confidentiality): ضمان وصول المعلومات للأشخاص المصرح لهم فقط باستخدام التشفير والتحكم في الوصول",
          "النزاهة (Integrity): ضمان عدم تعديل البيانات بشكل غير مصرح به، باستخدام checksums وdigital signatures",
          "التوافر (Availability): ضمان توفر المعلومات والخدمات عند الحاجة إليها مع حماية من هجمات DDoS",
          "هذه المبادئ الثلاثة تشكل أساس أي استراتيجية أمنية ناجحة",
          "التوازن بين هذه المبادئ مهم - زيادة الأمان قد تؤثر على سهولة الاستخدام",
        ],
      },
      {
        title: "أنواع التهديدات السيبرانية",
        content: [
          "البرمجيات الخبيثة (Malware): فيروسات، ديدان، تروجان، رانسوموير، سبايوير",
          "هجمات التصيد (Phishing): رسائل مزيفة لخداع المستخدمين وسرقة بياناتهم",
          "هجمات الهندسة الاجتماعية: استغلال العامل البشري للوصول للمعلومات",
          "هجمات حجب الخدمة (DDoS): إغراق الخوادم بطلبات وهمية لتعطيلها",
          "التهديدات الداخلية: موظفون ساخطون أو مهملون يشكلون خطراً على المؤسسة",
          "التهديدات المتقدمة المستمرة (APT): هجمات معقدة تستهدف مؤسسات محددة لفترات طويلة",
        ],
      },
      {
        title: "طبقات الحماية (Defense in Depth)",
        content: [
          "الطبقة الفيزيائية: حماية الأجهزة والمراكز من الوصول غير المصرح به",
          "طبقة الشبكة: جدران حماية، IDS/IPS، تجزئة الشبكة، VPN",
          "طبقة التطبيقات: فحص المدخلات، إدارة الجلسات، التحقق من الصلاحيات",
          "طبقة البيانات: التشفير، النسخ الاحتياطي، التحكم في الوصول",
          "طبقة المستخدم: التوعية الأمنية، المصادقة الثنائية، سياسات كلمات المرور",
          "الفكرة: إذا فشلت طبقة واحدة، تبقى طبقات أخرى للحماية",
        ],
      },
    ],
  },
  {
    icon: Target,
    title: "أنواع الهجمات الإلكترونية",
    description: "تعلم أشهر أنواع الهجمات وكيفية عملها للحماية منها",
    subTopics: [
      {
        title: "هجمات التصيد (Phishing)",
        content: [
          "Spear Phishing: تصيد موجه لشخص أو منظمة محددة مع معلومات مخصصة",
          "Whaling: استهداف المدراء التنفيذيين والشخصيات المهمة",
          "Clone Phishing: نسخ رسائل شرعية وتعديلها مع روابط خبيثة",
          "Vishing: التصيد عبر المكالمات الهاتفية وانتحال هوية البنوك أو الشركات",
          "Smishing: التصيد عبر رسائل SMS مع روابط ضارة",
          "طرق الكشف: التحقق من عنوان المرسل، الروابط المشبوهة، الأخطاء الإملائية، الإلحاح غير المبرر",
        ],
      },
      {
        title: "هجمات حقن SQL (SQL Injection)",
        content: [
          "تعريف: إدخال أوامر SQL خبيثة عبر حقول الإدخال في التطبيقات",
          "In-band SQLi: استخدام نفس القناة للهجوم واستخراج البيانات",
          "Blind SQLi: لا تظهر النتائج مباشرة، يتم الاستدلال من سلوك التطبيق",
          "Out-of-band SQLi: إرسال البيانات لخادم خارجي يتحكم به المهاجم",
          "مثال بسيط: ' OR '1'='1 - يجعل الشرط صحيحاً دائماً",
          "الحماية: استخدام Prepared Statements، التحقق من المدخلات، مبدأ أقل الصلاحيات",
        ],
      },
      {
        title: "هجمات XSS (Cross-Site Scripting)",
        content: [
          "Stored XSS: تخزين الكود الخبيث في قاعدة البيانات وتنفيذه لكل زائر",
          "Reflected XSS: الكود في URL ويتم تنفيذه فور فتح الرابط",
          "DOM-based XSS: تعديل DOM مباشرة دون مرور بالخادم",
          "الخطورة: سرقة الجلسات (Session Hijacking)، تغيير المحتوى، نشر البرمجيات الخبيثة",
          "الحماية: ترميز المخرجات (Output Encoding)، Content Security Policy، HTTP-Only Cookies",
          "أمثلة: <script>alert('XSS')</script> أو <img src=x onerror=alert('XSS')>",
        ],
      },
      {
        title: "هجمات القوة الغاشمة (Brute Force)",
        content: [
          "Simple Brute Force: تجربة جميع الاحتمالات الممكنة بشكل منهجي",
          "Dictionary Attack: استخدام قائمة كلمات شائعة ومعدلة",
          "Hybrid Attack: دمج الطريقتين مع إضافة أرقام ورموز",
          "Credential Stuffing: استخدام بيانات مسربة من اختراقات سابقة",
          "الحماية: كلمات مرور قوية، تأخير بعد المحاولات الفاشلة، CAPTCHA، المصادقة الثنائية",
          "أدوات شائعة: Hydra, John the Ripper, Hashcat",
        ],
      },
      {
        title: "هجمات Man-in-the-Middle (MITM)",
        content: [
          "ARP Spoofing: تزييف جداول ARP لاعتراض الاتصالات في الشبكة المحلية",
          "DNS Spoofing: تزييف سجلات DNS لتوجيه المستخدمين لمواقع مزيفة",
          "SSL Stripping: تحويل اتصال HTTPS لـ HTTP غير مشفر",
          "Evil Twin: إنشاء نقطة وصول Wi-Fi مزيفة بنفس اسم شبكة شرعية",
          "الخطورة: سرقة بيانات الدخول، حقن محتوى خبيث، التجسس على الاتصالات",
          "الحماية: استخدام HTTPS، VPN، عدم الاتصال بشبكات عامة غير موثوقة",
        ],
      },
    ],
  },
  {
    icon: Eye,
    title: "اختبار الاختراق (Penetration Testing)",
    description: "تعرف على مراحل اختبار الاختراق الاحترافي والمنهجيات المعتمدة",
    subTopics: [
      {
        title: "مراحل اختبار الاختراق",
        content: [
          "1. التخطيط والاستطلاع: تحديد النطاق، جمع المعلومات السلبي والنشط",
          "2. المسح (Scanning): فحص المنافذ، اكتشاف الخدمات، تحديد نقاط الضعف",
          "3. الوصول (Gaining Access): استغلال الثغرات المكتشفة للحصول على وصول",
          "4. الحفاظ على الوصول: تثبيت backdoors، رفع الصلاحيات",
          "5. التغطية: إزالة الآثار وتنظيف السجلات (في الهجمات الحقيقية)",
          "6. التقرير: توثيق جميع الثغرات مع توصيات الإصلاح ودرجة الخطورة",
        ],
      },
      {
        title: "أنواع اختبار الاختراق",
        content: [
          "Black Box: لا معلومات مسبقة - يحاكي هجوم خارجي حقيقي",
          "White Box: معلومات كاملة عن الهدف - فحص شامل للكود والبنية",
          "Gray Box: معلومات جزئية - يحاكي مهاجم داخلي أو شريك",
          "Internal Testing: اختبار من داخل الشبكة كموظف",
          "External Testing: اختبار من خارج الشبكة كمهاجم خارجي",
          "Social Engineering Testing: اختبار مقاومة الموظفين للتصيد والخداع",
        ],
      },
      {
        title: "منهجيات اختبار الاختراق",
        content: [
          "OWASP Testing Guide: دليل شامل لاختبار تطبيقات الويب",
          "PTES (Penetration Testing Execution Standard): معيار شامل لاختبار الاختراق",
          "OSSTMM (Open Source Security Testing Methodology Manual): منهجية مفتوحة المصدر",
          "NIST SP 800-115: إرشادات المعهد الوطني للمعايير والتكنولوجيا",
          "ISSAF (Information Systems Security Assessment Framework): إطار تقييم شامل",
          "اختيار المنهجية يعتمد على نوع الهدف ومتطلبات العميل",
        ],
      },
      {
        title: "الاستطلاع وجمع المعلومات",
        content: [
          "Passive Reconnaissance: جمع معلومات بدون التفاعل مع الهدف (OSINT)",
          "أدوات: Google Dorks، Shodan، theHarvester، Maltego، WHOIS",
          "Active Reconnaissance: فحص مباشر للهدف قد يتم اكتشافه",
          "أدوات: Nmap، Nikto، Dirb/Gobuster، DNS enumeration",
          "المعلومات المطلوبة: عناوين IP، أسماء النطاقات الفرعية، التقنيات المستخدمة، الموظفين",
          "تذكر: الاستطلاع الجيد هو 80% من نجاح اختبار الاختراق",
        ],
      },
    ],
  },
  {
    icon: Lock,
    title: "التشفير والحماية",
    description: "أساسيات التشفير وأنواعه وكيفية استخدامه لحماية البيانات",
    subTopics: [
      {
        title: "أنواع التشفير",
        content: [
          "التشفير المتماثل (Symmetric): مفتاح واحد للتشفير وفك التشفير",
          "خوارزميات: AES (الأكثر استخداماً)، DES (قديم وضعيف)، 3DES، Blowfish",
          "التشفير غير المتماثل (Asymmetric): مفتاح عام للتشفير وخاص لفك التشفير",
          "خوارزميات: RSA، ECC (أسرع وأقوى)، DSA، ElGamal",
          "التشفير المختلط: استخدام كلا النوعين معاً (مثل TLS)",
          "المفتاح العام يمكن مشاركته، المفتاح الخاص يجب حمايته بشكل مطلق",
        ],
      },
      {
        title: "دوال الهاش (Hashing)",
        content: [
          "تعريف: تحويل أي بيانات لقيمة ثابتة الطول (بصمة رقمية)",
          "خصائص: أحادية الاتجاه، تغيير بسيط ينتج هاش مختلف تماماً",
          "MD5: 128-bit، سريع لكن ضعيف (collisions معروفة)",
          "SHA-1: 160-bit، أفضل من MD5 لكن أصبح ضعيفاً أيضاً",
          "SHA-256/512: آمن ومستخدم حالياً في معظم التطبيقات",
          "bcrypt/Argon2: مصممة خصيصاً لكلمات المرور مع salt",
        ],
      },
      {
        title: "البروتوكولات الآمنة",
        content: [
          "TLS/SSL: تأمين اتصالات الويب (HTTPS) ومعظم البروتوكولات",
          "SSH: Secure Shell للوصول الآمن للخوادم ونقل الملفات",
          "SFTP/SCP: نقل ملفات آمن عبر SSH",
          "IPsec: تأمين اتصالات الشبكة على مستوى IP (VPN)",
          "WPA3: أحدث معيار لتأمين شبكات Wi-Fi",
          "PGP/GPG: تشفير البريد الإلكتروني والملفات",
        ],
      },
      {
        title: "إدارة المفاتيح والشهادات",
        content: [
          "الشهادات الرقمية: إثبات هوية المواقع والخدمات (X.509)",
          "Certificate Authority (CA): جهة موثوقة تصدر الشهادات",
          "PKI (Public Key Infrastructure): بنية تحتية لإدارة المفاتيح",
          "Key Management: توليد، تخزين، توزيع، إلغاء المفاتيح",
          "Hardware Security Modules (HSM): أجهزة متخصصة لحماية المفاتيح",
          "أهمية: أمان التشفير يعتمد على سرية وإدارة المفاتيح بشكل صحيح",
        ],
      },
    ],
  },
  {
    icon: Network,
    title: "أمن الشبكات",
    description: "حماية الشبكات من التهديدات وأدوات المراقبة والحماية",
    subTopics: [
      {
        title: "جدران الحماية (Firewalls)",
        content: [
          "Packet Filtering: فلترة حسب IP والمنافذ والبروتوكولات",
          "Stateful Inspection: تتبع حالة الاتصالات وفحص السياق",
          "Application Layer: فحص محتوى التطبيقات (Layer 7)",
          "Next-Generation Firewall (NGFW): دمج IPS وDPI ومكافحة البرمجيات الخبيثة",
          "Web Application Firewall (WAF): حماية تطبيقات الويب من SQLi وXSS",
          "القواعد: Allow/Deny بناءً على المصدر والوجهة والمنفذ والبروتوكول",
        ],
      },
      {
        title: "أنظمة كشف ومنع التسلل",
        content: [
          "IDS (Intrusion Detection System): اكتشاف الأنشطة المشبوهة والتنبيه",
          "IPS (Intrusion Prevention System): اكتشاف ومنع الهجمات تلقائياً",
          "Signature-based: مقارنة مع أنماط هجمات معروفة",
          "Anomaly-based: اكتشاف السلوك غير الطبيعي مقارنة بالخط الأساسي",
          "Network-based (NIDS/NIPS): مراقبة حركة الشبكة",
          "Host-based (HIDS/HIPS): مراقبة نظام تشغيل واحد",
        ],
      },
      {
        title: "تجزئة الشبكة (Network Segmentation)",
        content: [
          "VLANs: شبكات محلية افتراضية لفصل حركة المرور",
          "DMZ: منطقة منزوعة السلاح للخوادم العامة",
          "Air Gap: فصل كامل عن الإنترنت للأنظمة الحساسة",
          "Micro-segmentation: تجزئة دقيقة على مستوى التطبيقات",
          "Zero Trust: لا تثق بأي شيء داخل أو خارج الشبكة",
          "الفائدة: تقليل نطاق الاختراق في حالة حدوثه",
        ],
      },
      {
        title: "VPN والاتصالات الآمنة",
        content: [
          "Site-to-Site VPN: ربط فروع المؤسسة بشكل آمن",
          "Remote Access VPN: اتصال الموظفين عن بعد",
          "بروتوكولات: OpenVPN، WireGuard، IPsec، L2TP",
          "Split Tunneling: توجيه حركة معينة فقط عبر VPN",
          "Always-On VPN: اتصال تلقائي دائم للأجهزة المؤسسية",
          "الاعتبارات: السرعة، التشفير، الخصوصية، الموثوقية",
        ],
      },
    ],
  },
  {
    icon: Database,
    title: "أمن تطبيقات الويب",
    description: "OWASP Top 10 وأفضل الممارسات لتطوير تطبيقات آمنة",
    subTopics: [
      {
        title: "OWASP Top 10 - 2021",
        content: [
          "A01 - Broken Access Control: الوصول لموارد غير مصرح بها",
          "A02 - Cryptographic Failures: ضعف في التشفير وحماية البيانات",
          "A03 - Injection: SQL، NoSQL، LDAP، OS injection",
          "A04 - Insecure Design: ثغرات في التصميم من البداية",
          "A05 - Security Misconfiguration: إعدادات افتراضية أو خاطئة",
          "A06 - Vulnerable Components: استخدام مكتبات قديمة أو معرضة",
          "A07 - Authentication Failures: ضعف في المصادقة وإدارة الجلسات",
          "A08 - Data Integrity Failures: ضعف في التحقق من سلامة البيانات",
          "A09 - Security Logging Failures: عدم كفاية التسجيل والمراقبة",
          "A10 - SSRF: Server-Side Request Forgery",
        ],
      },
      {
        title: "التحقق من المدخلات (Input Validation)",
        content: [
          "Whitelist vs Blacklist: استخدم القوائم البيضاء كلما أمكن",
          "Server-side Validation: لا تعتمد على التحقق في المتصفح فقط",
          "Parameterized Queries: استخدم Prepared Statements دائماً",
          "Output Encoding: ترميز المخرجات حسب السياق (HTML, JS, URL)",
          "File Upload Validation: التحقق من النوع والحجم والمحتوى",
          "Regular Expressions: استخدم regex دقيقة للتحقق من الصيغ",
        ],
      },
      {
        title: "إدارة الجلسات والمصادقة",
        content: [
          "Session ID: عشوائي وطويل بما يكفي (128-bit minimum)",
          "HTTP-Only Cookies: منع JavaScript من الوصول للجلسة",
          "Secure Flag: إرسال الكوكيز عبر HTTPS فقط",
          "SameSite Attribute: حماية من CSRF",
          "Session Timeout: انتهاء الجلسة بعد فترة عدم نشاط",
          "MFA/2FA: المصادقة متعددة العوامل للحسابات الحساسة",
        ],
      },
      {
        title: "حماية APIs",
        content: [
          "Authentication: JWT، OAuth 2.0، API Keys",
          "Rate Limiting: تحديد عدد الطلبات لمنع الإساءة",
          "Input Validation: التحقق من جميع المدخلات والمعلمات",
          "HTTPS Only: تشفير جميع الاتصالات",
          "CORS Policy: تحديد المصادر المسموح لها بالوصول",
          "API Versioning: إدارة الإصدارات وإلغاء القديم بأمان",
        ],
      },
    ],
  },
  {
    icon: Terminal,
    title: "أنظمة التشغيل والأدوات",
    description: "تعرف على توزيعات لينكس للأمن السيبراني وأهم الأدوات",
    subTopics: [
      {
        title: "توزيعات لينكس للأمن السيبراني",
        content: [
          "Kali Linux: الأشهر والأكثر استخداماً، +600 أداة مثبتة مسبقاً",
          "Parrot Security OS: بديل خفيف مع تركيز على الخصوصية",
          "BlackArch: مبني على Arch مع +2800 أداة",
          "BackBox: مبني على Ubuntu، سهل الاستخدام",
          "Pentoo: مبني على Gentoo للمتقدمين",
          "نصيحة: ابدأ بـ Kali Linux لتوفر الدعم والتوثيق",
        ],
      },
      {
        title: "أدوات فحص الشبكات",
        content: [
          "Nmap: الأداة الأساسية لفحص المنافذ واكتشاف الخدمات",
          "Masscan: أسرع ماسح منافذ، مناسب للشبكات الكبيرة",
          "Zenmap: واجهة رسومية لـ Nmap",
          "Angry IP Scanner: ماسح IP سريع وبسيط",
          "Netcat: سكين الجيش السويسري للشبكات",
          "Wireshark: تحليل حزم الشبكة بالتفصيل",
        ],
      },
      {
        title: "أدوات اختبار تطبيقات الويب",
        content: [
          "Burp Suite: الأداة الأساسية لاختبار تطبيقات الويب",
          "OWASP ZAP: بديل مجاني ومفتوح المصدر",
          "Nikto: فحص سريع لثغرات الخوادم",
          "SQLMap: أتمتة اكتشاف واستغلال SQL Injection",
          "Dirb/Gobuster: اكتشاف الملفات والمجلدات المخفية",
          "WPScan: فحص ثغرات WordPress",
        ],
      },
      {
        title: "أدوات الاستغلال",
        content: [
          "Metasploit Framework: أشهر إطار عمل للاستغلال",
          "Cobalt Strike: أداة تجارية متقدمة للفريق الأحمر",
          "Empire: إطار عمل PowerShell للتحكم عن بعد",
          "Mimikatz: استخراج كلمات المرور من ذاكرة Windows",
          "Hashcat/John: كسر كلمات المرور والهاشات",
          "Responder: هجمات LLMNR/NBT-NS في الشبكات المحلية",
        ],
      },
    ],
  },
  {
    icon: AlertTriangle,
    title: "القوانين والأخلاقيات",
    description: "الإطار القانوني والأخلاقي للعمل في الأمن السيبراني",
    subTopics: [
      {
        title: "القوانين والتشريعات",
        content: [
          "الاختراق بدون إذن جريمة جنائية في جميع الدول تقريباً",
          "Computer Fraud and Abuse Act (CFAA): القانون الأمريكي",
          "Computer Misuse Act: القانون البريطاني",
          "قوانين الجرائم الإلكترونية العربية: تختلف حسب الدولة",
          "GDPR: حماية البيانات الشخصية في الاتحاد الأوروبي",
          "العقوبات تتراوح من الغرامات المالية إلى السجن لسنوات",
        ],
      },
      {
        title: "أخلاقيات الهاكر الأخلاقي",
        content: [
          "احصل دائماً على إذن كتابي قبل أي اختبار",
          "العمل ضمن النطاق المتفق عليه فقط",
          "الإبلاغ عن جميع الثغرات المكتشفة للعميل",
          "عدم الإضرار بالأنظمة أو البيانات",
          "الحفاظ على سرية المعلومات المكتشفة",
          "الإفصاح المسؤول (Responsible Disclosure) للثغرات",
        ],
      },
      {
        title: "برامج Bug Bounty",
        content: [
          "HackerOne: أكبر منصة لبرامج مكافآت الثغرات",
          "Bugcrowd: منصة شائعة أخرى",
          "Synack: منصة مغلقة للباحثين المختارين",
          "Open Bug Bounty: للمواقع بدون برنامج رسمي",
          "نصائح: اقرأ القواعد جيداً، ابدأ بالبرامج العامة",
          "المكافآت تتراوح من $50 إلى $1,000,000+ للثغرات الحرجة",
        ],
      },
      {
        title: "الشهادات المهنية",
        content: [
          "CEH (Certified Ethical Hacker): شهادة أساسية شائعة",
          "OSCP (Offensive Security Certified Professional): عملية ومحترمة",
          "CISSP: للإدارة والاستراتيجية الأمنية",
          "CompTIA Security+: شهادة أساسية ممتازة للمبتدئين",
          "CISM/CISA: للحوكمة والتدقيق",
          "نصيحة: الشهادات مهمة لكن الخبرة العملية أهم",
        ],
      },
    ],
  },
];

const GuidePage = () => {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [expandedSubTopic, setExpandedSubTopic] = useState<string | null>(null);

  const toggleTopic = (index: number) => {
    setExpandedTopic(expandedTopic === index ? null : index);
    setExpandedSubTopic(null);
  };

  const toggleSubTopic = (id: string) => {
    setExpandedSubTopic(expandedSubTopic === id ? null : id);
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
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              الدليل الكامل
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              دليلك الشامل لتعلم الأمن السيبراني من الصفر إلى الاحتراف - {guideTopics.length} أقسام رئيسية مع شرح مفصل
            </p>
          </div>

          {/* Guide Topics */}
          <div className="max-w-5xl mx-auto space-y-4">
            {guideTopics.map((topic, index) => (
              <div key={index} className="cyber-card overflow-hidden">
                {/* Topic Header */}
                <button
                  onClick={() => toggleTopic(index)}
                  className="w-full p-6 flex items-center justify-between hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                      <topic.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-right">
                      <h2 className="text-xl md:text-2xl font-bold text-primary">{topic.title}</h2>
                      <p className="text-muted-foreground text-sm mt-1">{topic.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden md:block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {topic.subTopics.length} موضوع
                    </span>
                    {expandedTopic === index ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* SubTopics */}
                {expandedTopic === index && (
                  <div className="border-t border-border/30 p-4 space-y-3 animate-fade-in">
                    {topic.subTopics.map((subTopic, subIndex) => {
                      const subTopicId = `${index}-${subIndex}`;
                      return (
                        <div key={subIndex} className="rounded-xl bg-secondary/30 overflow-hidden">
                          <button
                            onClick={() => toggleSubTopic(subTopicId)}
                            className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                                {subIndex + 1}
                              </span>
                              <h3 className="text-lg font-semibold text-foreground">{subTopic.title}</h3>
                            </div>
                            {expandedSubTopic === subTopicId ? (
                              <ChevronUp className="w-5 h-5 text-primary" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            )}
                          </button>

                          {expandedSubTopic === subTopicId && (
                            <div className="px-4 pb-4 space-y-2 animate-fade-in">
                              {subTopic.content.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">نصائح للمبتدئين</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-secondary/30 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">تعلم الأساسيات</h4>
                  <p className="text-muted-foreground text-sm">ابدأ بتعلم الشبكات، لينكس، والبرمجة قبل الأمن السيبراني</p>
                </div>
                <div className="p-6 rounded-xl bg-secondary/30 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">تدرب باستمرار</h4>
                  <p className="text-muted-foreground text-sm">استخدم منصات مثل HackTheBox و TryHackMe للتدريب العملي</p>
                </div>
                <div className="p-6 rounded-xl bg-secondary/30 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">كن أخلاقياً</h4>
                  <p className="text-muted-foreground text-sm">استخدم معرفتك لحماية الأنظمة واحترم القوانين دائماً</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuidePage;