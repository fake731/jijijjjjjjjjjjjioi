import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Shield, Target, Eye, Lock, Network, Database, Terminal, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Zap, Bug, FileCode, Server, Wifi, Key, Globe, Cpu, Cloud, Smartphone, Code, Radio, Search, Users, Layers, Activity, HardDrive, MonitorSpeaker, Fingerprint, ShieldCheck, Skull, Crosshair, Binary, Braces, Wrench } from "lucide-react";
import { useState } from "react";

interface SubTopic {
  title: string;
  content: string[];
}

interface GuideTopic {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  subTopics: SubTopic[];
}

const guideTopics: GuideTopic[] = [
  {
    icon: Shield,
    title: "أساسيات الأمن السيبراني",
    description: "تعرف على المفاهيم الأساسية والمبادئ الثلاثة للأمن السيبراني",
    color: "text-blue-500",
    subTopics: [
      {
        title: "ما هو الأمن السيبراني؟",
        content: [
          "الأمن السيبراني هو مجموعة من التقنيات والممارسات المصممة لحماية الأنظمة والشبكات والبيانات من الهجمات الإلكترونية",
          "يشمل حماية الأجهزة (Hardware) والبرمجيات (Software) والبيانات من الوصول غير المصرح به",
          "الهدف الرئيسي هو ضمان سرية وسلامة وتوافر المعلومات (CIA Triad)",
          "يتضمن عدة مجالات: أمن الشبكات، أمن التطبيقات، أمن المعلومات، التعافي من الكوارث",
          "أصبح الأمن السيبراني ضرورة ملحة مع تزايد الاعتماد على التكنولوجيا في جميع جوانب الحياة",
          "يُقدر حجم سوق الأمن السيبراني بأكثر من 200 مليار دولار عالمياً",
          "الطلب على متخصصي الأمن السيبراني يتزايد بشكل كبير مع نقص حاد في الكوادر المؤهلة",
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
          "AAA Model: Authentication (التحقق من الهوية)، Authorization (التفويض)، Accounting (المحاسبة)",
          "مبدأ أقل الصلاحيات (Least Privilege): منح المستخدمين الحد الأدنى من الصلاحيات اللازمة",
          "الفصل بين الواجبات (Separation of Duties): توزيع المهام الحساسة على أكثر من شخص",
        ],
      },
      {
        title: "أنواع التهديدات السيبرانية",
        content: [
          "البرمجيات الخبيثة (Malware): فيروسات، ديدان، تروجان، رانسوموير، سبايوير، أدوير، روتكيت",
          "هجمات التصيد (Phishing): رسائل مزيفة لخداع المستخدمين وسرقة بياناتهم",
          "هجمات الهندسة الاجتماعية: استغلال العامل البشري للوصول للمعلومات",
          "هجمات حجب الخدمة (DDoS): إغراق الخوادم بطلبات وهمية لتعطيلها",
          "التهديدات الداخلية: موظفون ساخطون أو مهملون يشكلون خطراً على المؤسسة",
          "التهديدات المتقدمة المستمرة (APT): هجمات معقدة تستهدف مؤسسات محددة لفترات طويلة",
          "هجمات سلسلة التوريد (Supply Chain Attacks): استهداف موردي البرمجيات للوصول لعملائهم",
          "Cryptojacking: استخدام موارد الضحية لتعدين العملات الرقمية بدون إذن",
          "Formjacking: سرقة بيانات بطاقات الدفع من نماذج الويب",
          "Zero-Day Exploits: استغلال ثغرات غير معروفة قبل إصدار تصحيح لها",
        ],
      },
      {
        title: "طبقات الحماية (Defense in Depth)",
        content: [
          "الطبقة الفيزيائية: حماية الأجهزة والمراكز من الوصول غير المصرح به، كاميرات مراقبة، أقفال بيومترية",
          "طبقة الشبكة: جدران حماية، IDS/IPS، تجزئة الشبكة، VPN، Network Access Control",
          "طبقة التطبيقات: فحص المدخلات، إدارة الجلسات، التحقق من الصلاحيات، WAF",
          "طبقة البيانات: التشفير، النسخ الاحتياطي، التحكم في الوصول، DLP",
          "طبقة المستخدم: التوعية الأمنية، المصادقة الثنائية، سياسات كلمات المرور",
          "الفكرة: إذا فشلت طبقة واحدة، تبقى طبقات أخرى للحماية",
          "طبقة المراقبة: SIEM، تحليل السجلات، مراقبة الشبكة على مدار الساعة",
          "خطة الاستجابة للحوادث: إجراءات محددة للتعامل مع الاختراقات",
        ],
      },
      {
        title: "إدارة المخاطر الأمنية",
        content: [
          "تحديد الأصول (Asset Identification): معرفة ما تريد حمايته وتصنيفه حسب الأهمية",
          "تحليل التهديدات (Threat Analysis): تحديد التهديدات المحتملة ومصادرها",
          "تقييم الثغرات (Vulnerability Assessment): فحص نقاط الضعف في الأنظمة",
          "حساب المخاطر: Risk = Threat × Vulnerability × Impact",
          "معالجة المخاطر: Accept (قبول)، Mitigate (تخفيف)، Transfer (نقل)، Avoid (تجنب)",
          "المراقبة المستمرة: متابعة التهديدات الجديدة وتحديث الإجراءات",
          "Business Impact Analysis (BIA): تحليل تأثير الحوادث على الأعمال",
          "Risk Register: سجل لتوثيق وتتبع المخاطر المحددة",
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
          "Whaling: استهداف المدراء التنفيذيين والشخصيات المهمة (C-Level)",
          "Clone Phishing: نسخ رسائل شرعية وتعديلها مع روابط خبيثة",
          "Vishing: التصيد عبر المكالمات الهاتفية وانتحال هوية البنوك أو الشركات",
          "Smishing: التصيد عبر رسائل SMS مع روابط ضارة",
          "Business Email Compromise (BEC): انتحال هوية المدراء لطلب تحويلات مالية",
          "Angler Phishing: التصيد عبر حسابات خدمة عملاء وهمية على مواقع التواصل",
          "طرق الكشف: التحقق من عنوان المرسل، الروابط المشبوهة، الأخطاء الإملائية، الإلحاح غير المبرر",
          "أدوات مساعدة: PhishTank، VirusTotal، URL2PNG للتحقق من الروابط",
        ],
      },
      {
        title: "هجمات حقن SQL (SQL Injection)",
        content: [
          "تعريف: إدخال أوامر SQL خبيثة عبر حقول الإدخال في التطبيقات",
          "In-band SQLi: استخدام نفس القناة للهجوم واستخراج البيانات (UNION-based, Error-based)",
          "Blind SQLi: لا تظهر النتائج مباشرة، يتم الاستدلال من سلوك التطبيق (Boolean-based, Time-based)",
          "Out-of-band SQLi: إرسال البيانات لخادم خارجي يتحكم به المهاجم",
          "Second-Order SQLi: حقن يتم تخزينه وتنفيذه لاحقاً",
          "مثال بسيط: ' OR '1'='1 - يجعل الشرط صحيحاً دائماً",
          "مثال متقدم: ' UNION SELECT username, password FROM users--",
          "الحماية: استخدام Prepared Statements، التحقق من المدخلات، مبدأ أقل الصلاحيات",
          "أدوات الاختبار: SQLMap، Havij، BBQSQL",
          "استخراج قواعد البيانات: INFORMATION_SCHEMA للحصول على هيكل قاعدة البيانات",
        ],
      },
      {
        title: "هجمات XSS (Cross-Site Scripting)",
        content: [
          "Stored XSS: تخزين الكود الخبيث في قاعدة البيانات وتنفيذه لكل زائر (أخطر نوع)",
          "Reflected XSS: الكود في URL ويتم تنفيذه فور فتح الرابط",
          "DOM-based XSS: تعديل DOM مباشرة دون مرور بالخادم",
          "Mutation XSS (mXSS): استغلال طريقة تحليل المتصفح للـ HTML",
          "الخطورة: سرقة الجلسات (Session Hijacking)، تغيير المحتوى، نشر البرمجيات الخبيثة",
          "Cookie Stealing: document.cookie وإرساله لخادم المهاجم",
          "Keylogging: تسجيل ضغطات المفاتيح عبر JavaScript",
          "الحماية: ترميز المخرجات (Output Encoding)، Content Security Policy، HTTP-Only Cookies",
          "أمثلة: <script>alert('XSS')</script> أو <img src=x onerror=alert('XSS')>",
          "أدوات الاختبار: XSStrike، Dalfox، XSSer",
        ],
      },
      {
        title: "هجمات القوة الغاشمة (Brute Force)",
        content: [
          "Simple Brute Force: تجربة جميع الاحتمالات الممكنة بشكل منهجي",
          "Dictionary Attack: استخدام قائمة كلمات شائعة ومعدلة (rockyou.txt, SecLists)",
          "Hybrid Attack: دمج الطريقتين مع إضافة أرقام ورموز",
          "Credential Stuffing: استخدام بيانات مسربة من اختراقات سابقة",
          "Password Spraying: تجربة كلمة مرور شائعة على حسابات متعددة",
          "Reverse Brute Force: تجربة اسم مستخدم مع كلمة مرور ثابتة",
          "الحماية: كلمات مرور قوية، تأخير بعد المحاولات الفاشلة، CAPTCHA، المصادقة الثنائية",
          "Account Lockout Policy: قفل الحساب بعد عدد معين من المحاولات",
          "أدوات شائعة: Hydra, John the Ripper, Hashcat, Medusa, Burp Intruder",
          "قواعد كلمات المرور: Hashcat rules، John Jumbo rules لتوليد تحويلات",
        ],
      },
      {
        title: "هجمات Man-in-the-Middle (MITM)",
        content: [
          "ARP Spoofing/Poisoning: تزييف جداول ARP لاعتراض الاتصالات في الشبكة المحلية",
          "DNS Spoofing/Cache Poisoning: تزييف سجلات DNS لتوجيه المستخدمين لمواقع مزيفة",
          "SSL Stripping: تحويل اتصال HTTPS لـ HTTP غير مشفر (أداة: sslstrip)",
          "HTTPS Spoofing: إنشاء شهادات مزيفة لاعتراض الاتصالات المشفرة",
          "Evil Twin: إنشاء نقطة وصول Wi-Fi مزيفة بنفس اسم شبكة شرعية",
          "Session Hijacking: سرقة جلسة مستخدم نشطة",
          "IP Spoofing: تزوير عنوان IP المصدر",
          "الخطورة: سرقة بيانات الدخول، حقن محتوى خبيث، التجسس على الاتصالات",
          "الحماية: استخدام HTTPS، HSTS، VPN، عدم الاتصال بشبكات عامة غير موثوقة",
          "أدوات: Ettercap، Bettercap، Wireshark، mitmproxy",
        ],
      },
      {
        title: "هجمات حجب الخدمة (DoS/DDoS)",
        content: [
          "DoS: هجوم من مصدر واحد لاستنزاف موارد الهدف",
          "DDoS: هجوم موزع من مصادر متعددة (Botnets)",
          "Volumetric Attacks: إغراق عرض النطاق (UDP Flood, ICMP Flood, DNS Amplification)",
          "Protocol Attacks: استنزاف موارد الخادم (SYN Flood, Ping of Death, Smurf Attack)",
          "Application Layer Attacks: استهداف الطبقة السابعة (HTTP Flood, Slowloris)",
          "DNS Amplification: استغلال خوادم DNS لتضخيم الهجوم حتى 70x",
          "NTP Amplification: استغلال خوادم NTP للتضخيم",
          "Memcached Amplification: تضخيم يصل لـ 51,000x",
          "الحماية: CDN، Anycast، Rate Limiting، Cloud-based DDoS Protection",
          "أدوات الحماية: Cloudflare، Akamai، AWS Shield",
        ],
      },
      {
        title: "هجمات الهندسة الاجتماعية",
        content: [
          "Pretexting: إنشاء سيناريو مزيف للحصول على معلومات (ادعاء أنك من الدعم الفني)",
          "Baiting: ترك أجهزة USB مصابة في أماكن عامة",
          "Quid Pro Quo: تقديم خدمة مقابل معلومات",
          "Tailgating/Piggybacking: الدخول خلف شخص مصرح له بدون تصريح",
          "Shoulder Surfing: مراقبة شخص يدخل كلمة مروره",
          "Dumpster Diving: البحث في القمامة عن معلومات مفيدة",
          "Watering Hole: إصابة مواقع يزورها الضحايا المستهدفون",
          "Impersonation: انتحال شخصية موظف أو مسؤول",
          "الحماية: التدريب والتوعية، التحقق من الهوية، سياسات أمنية صارمة",
          "Social Engineering Toolkit (SET): أداة أتمتة هجمات الهندسة الاجتماعية",
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
          "1. التخطيط والاستطلاع: تحديد النطاق، جمع المعلومات السلبي والنشط، توقيع العقود",
          "2. المسح (Scanning): فحص المنافذ، اكتشاف الخدمات، تحديد نقاط الضعف، OS Fingerprinting",
          "3. الوصول (Gaining Access): استغلال الثغرات المكتشفة للحصول على وصول أولي",
          "4. الحفاظ على الوصول: تثبيت backdoors، رفع الصلاحيات (Privilege Escalation)",
          "5. الحركة الجانبية (Lateral Movement): التنقل بين الأنظمة داخل الشبكة",
          "6. استخراج البيانات (Exfiltration): سرقة البيانات الحساسة كإثبات",
          "7. التغطية: إزالة الآثار وتنظيف السجلات (في الهجمات الحقيقية)",
          "8. التقرير: توثيق جميع الثغرات مع توصيات الإصلاح ودرجة الخطورة (CVSS)",
          "9. إعادة الاختبار: التحقق من إصلاح الثغرات بعد المعالجة",
        ],
      },
      {
        title: "أنواع اختبار الاختراق",
        content: [
          "Black Box: لا معلومات مسبقة - يحاكي هجوم خارجي حقيقي",
          "White Box: معلومات كاملة عن الهدف - فحص شامل للكود والبنية (Code Review)",
          "Gray Box: معلومات جزئية - يحاكي مهاجم داخلي أو شريك",
          "Internal Testing: اختبار من داخل الشبكة كموظف (Insider Threat)",
          "External Testing: اختبار من خارج الشبكة كمهاجم خارجي",
          "Blind Testing: المختبر لا يعرف شيئاً والهدف لا يعرف بالاختبار",
          "Double Blind: لا أحد يعرف بالاختبار سوى الإدارة العليا",
          "Social Engineering Testing: اختبار مقاومة الموظفين للتصيد والخداع",
          "Physical Penetration Testing: اختبار الأمن الفيزيائي للمباني",
          "Wireless Penetration Testing: اختبار أمن الشبكات اللاسلكية",
        ],
      },
      {
        title: "منهجيات اختبار الاختراق",
        content: [
          "OWASP Testing Guide (OTG): دليل شامل لاختبار تطبيقات الويب - أكثر من 90 حالة اختبار",
          "PTES (Penetration Testing Execution Standard): معيار شامل لاختبار الاختراق",
          "OSSTMM (Open Source Security Testing Methodology Manual): منهجية مفتوحة المصدر علمية",
          "NIST SP 800-115: إرشادات المعهد الوطني للمعايير والتكنولوجيا",
          "ISSAF (Information Systems Security Assessment Framework): إطار تقييم شامل",
          "CREST: معيار بريطاني معتمد لاختبار الاختراق",
          "PCI DSS Penetration Testing: متطلبات اختبار بطاقات الدفع",
          "Cyber Kill Chain: نموذج Lockheed Martin لفهم مراحل الهجوم",
          "MITRE ATT&CK Framework: قاعدة معرفية لتكتيكات وتقنيات المهاجمين",
          "اختيار المنهجية يعتمد على نوع الهدف ومتطلبات العميل والمعايير المطلوبة",
        ],
      },
      {
        title: "الاستطلاع وجمع المعلومات",
        content: [
          "Passive Reconnaissance: جمع معلومات بدون التفاعل مع الهدف (OSINT)",
          "Google Dorks: استخدام محركات البحث للعثور على معلومات حساسة (site:, filetype:, inurl:)",
          "Shodan/Censys: محركات بحث للأجهزة المتصلة بالإنترنت",
          "WHOIS/DNS Records: معلومات تسجيل النطاقات وسجلات DNS",
          "Wayback Machine: أرشيف الإنترنت لمشاهدة إصدارات قديمة من المواقع",
          "theHarvester: جمع البريد الإلكتروني والنطاقات الفرعية",
          "Maltego: أداة تحليل الروابط وتصور العلاقات",
          "Active Reconnaissance: فحص مباشر للهدف قد يتم اكتشافه",
          "Nmap: فحص المنافذ والخدمات ونظام التشغيل",
          "تذكر: الاستطلاع الجيد هو 80% من نجاح اختبار الاختراق",
        ],
      },
      {
        title: "استغلال الثغرات (Exploitation)",
        content: [
          "Metasploit Framework: أشهر إطار عمل للاستغلال مع آلاف الـ exploits",
          "Exploit-DB: قاعدة بيانات استغلالات عامة مع أكواد جاهزة",
          "CVE Database: قاعدة بيانات الثغرات المعروفة",
          "Zero-Day Exploits: استغلالات لثغرات غير معروفة - الأكثر قيمة",
          "Buffer Overflow: استغلال أخطاء إدارة الذاكرة لتنفيذ كود",
          "Shellcode: كود صغير يتم تنفيذه بعد نجاح الاستغلال (reverse shell, bind shell)",
          "Payload Generation: msfvenom لإنشاء payloads مخصصة",
          "Post-Exploitation: جمع المعلومات بعد الوصول، رفع الصلاحيات",
          "Pivoting: استخدام الجهاز المخترق للوصول لأجهزة أخرى",
          "Persistence: تثبيت وصول دائم للعودة لاحقاً",
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
          "التشفير المتماثل (Symmetric): مفتاح واحد للتشفير وفك التشفير - سريع",
          "خوارزميات: AES (الأكثر استخداماً - 128/192/256 bit)، DES (قديم وضعيف)، 3DES، Blowfish، Twofish، ChaCha20",
          "التشفير غير المتماثل (Asymmetric): مفتاح عام للتشفير وخاص لفك التشفير - بطيء لكن آمن",
          "خوارزميات: RSA (2048+ bit)، ECC (أسرع وأقوى)، DSA، ElGamal، Ed25519",
          "التشفير المختلط: استخدام كلا النوعين معاً (مثل TLS) - يجمع السرعة والأمان",
          "المفتاح العام يمكن مشاركته، المفتاح الخاص يجب حمايته بشكل مطلق",
          "Key Exchange: Diffie-Hellman لتبادل المفاتيح بشكل آمن",
          "Elliptic Curve Cryptography (ECC): نفس الأمان بمفاتيح أصغر (256-bit ECC ≈ 3072-bit RSA)",
          "Post-Quantum Cryptography: خوارزميات مقاومة للحوسبة الكمومية (Lattice-based)",
        ],
      },
      {
        title: "دوال الهاش (Hashing)",
        content: [
          "تعريف: تحويل أي بيانات لقيمة ثابتة الطول (بصمة رقمية فريدة)",
          "خصائص: أحادية الاتجاه، تغيير بسيط ينتج هاش مختلف تماماً (Avalanche Effect)",
          "MD5: 128-bit، سريع لكن ضعيف (collisions معروفة) - لا يستخدم للأمان",
          "SHA-1: 160-bit، أفضل من MD5 لكن أصبح ضعيفاً أيضاً (2017 collision)",
          "SHA-256/384/512: آمن ومستخدم حالياً في معظم التطبيقات",
          "SHA-3 (Keccak): تصميم مختلف تماماً كبديل لـ SHA-2",
          "bcrypt: مصممة لكلمات المرور مع salt وcost factor قابل للتعديل",
          "Argon2: الفائز في Password Hashing Competition - الأفضل حالياً",
          "HMAC: Hash-based Message Authentication Code للتحقق من سلامة الرسائل",
          "استخدامات: تخزين كلمات المرور، التحقق من سلامة الملفات، التوقيع الرقمي",
        ],
      },
      {
        title: "البروتوكولات الآمنة",
        content: [
          "TLS 1.3: أحدث إصدار - أسرع وأكثر أماناً (إزالة خوارزميات ضعيفة)",
          "SSL/TLS: تأمين اتصالات الويب (HTTPS) ومعظم البروتوكولات",
          "SSH: Secure Shell للوصول الآمن للخوادم ونقل الملفات (Port 22)",
          "SFTP/SCP: نقل ملفات آمن عبر SSH",
          "IPsec: تأمين اتصالات الشبكة على مستوى IP (VPN - Transport/Tunnel mode)",
          "WPA3: أحدث معيار لتأمين شبكات Wi-Fi (SAE - Dragonfly)",
          "PGP/GPG: تشفير البريد الإلكتروني والملفات (Web of Trust)",
          "S/MIME: تشفير البريد الإلكتروني المؤسسي (Certificate-based)",
          "DNSSEC: تأمين استعلامات DNS من التزوير",
          "HTTPS Everywhere: فرض استخدام HTTPS على جميع المواقع",
        ],
      },
      {
        title: "إدارة المفاتيح والشهادات",
        content: [
          "الشهادات الرقمية X.509: إثبات هوية المواقع والخدمات",
          "Certificate Authority (CA): جهة موثوقة تصدر الشهادات (DigiCert, Let's Encrypt)",
          "Root CA → Intermediate CA → End Entity Certificate (Chain of Trust)",
          "PKI (Public Key Infrastructure): بنية تحتية متكاملة لإدارة المفاتيح",
          "Certificate Revocation: CRL و OCSP لإلغاء الشهادات المخترقة",
          "Key Management: توليد، تخزين، توزيع، تدوير، إلغاء المفاتيح",
          "Hardware Security Modules (HSM): أجهزة متخصصة لحماية المفاتيح",
          "Key Escrow: تخزين نسخة احتياطية من المفاتيح لدى طرف ثالث",
          "Perfect Forward Secrecy (PFS): حماية الاتصالات السابقة حتى لو سُرق المفتاح",
          "Certificate Pinning: ربط التطبيق بشهادة معينة لمنع MITM",
        ],
      },
      {
        title: "تشفير البيانات",
        content: [
          "Encryption at Rest: تشفير البيانات المخزنة (BitLocker, LUKS, FileVault)",
          "Encryption in Transit: تشفير البيانات أثناء النقل (TLS, VPN)",
          "End-to-End Encryption (E2EE): التشفير من المرسل للمستقبل فقط (Signal, WhatsApp)",
          "Full Disk Encryption (FDE): تشفير القرص الصلب بالكامل",
          "File-Level Encryption: تشفير ملفات محددة",
          "Database Encryption: TDE (Transparent Data Encryption)",
          "Column-Level Encryption: تشفير أعمدة محددة في قاعدة البيانات",
          "Tokenization: استبدال البيانات الحساسة برموز (بطاقات الائتمان)",
          "Data Masking: إخفاء جزء من البيانات (XXX-XXX-1234)",
          "Secure Key Storage: استخدام Vault أو HSM لتخزين المفاتيح",
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
          "Packet Filtering: فلترة حسب IP والمنافذ والبروتوكولات (Layer 3-4)",
          "Stateful Inspection: تتبع حالة الاتصالات وفحص السياق",
          "Application Layer Firewall: فحص محتوى التطبيقات (Layer 7)",
          "Next-Generation Firewall (NGFW): دمج IPS وDPI ومكافحة البرمجيات الخبيثة وSSL inspection",
          "Web Application Firewall (WAF): حماية تطبيقات الويب من SQLi وXSS (ModSecurity, Cloudflare)",
          "Cloud Firewall: جدران حماية سحابية (AWS Security Groups, Azure NSG)",
          "القواعد: Allow/Deny بناءً على المصدر والوجهة والمنفذ والبروتوكول",
          "Default Deny: رفض كل شيء ثم السماح بما هو مطلوب فقط",
          "Firewall Evasion: تقنيات تجاوز جدران الحماية (Fragmentation, Tunneling)",
          "أدوات: iptables, nftables, pfSense, Palo Alto, Fortinet",
        ],
      },
      {
        title: "أنظمة كشف ومنع التسلل",
        content: [
          "IDS (Intrusion Detection System): اكتشاف الأنشطة المشبوهة والتنبيه فقط",
          "IPS (Intrusion Prevention System): اكتشاف ومنع الهجمات تلقائياً",
          "Signature-based: مقارنة مع أنماط هجمات معروفة (سريع، يفوت Zero-Day)",
          "Anomaly-based: اكتشاف السلوك غير الطبيعي مقارنة بالخط الأساسي (يكتشف الجديد، false positives)",
          "Heuristic-based: تحليل سلوكي للكشف عن البرمجيات الخبيثة",
          "Network-based (NIDS/NIPS): مراقبة حركة الشبكة (Snort, Suricata, Zeek)",
          "Host-based (HIDS/HIPS): مراقبة نظام تشغيل واحد (OSSEC, Wazuh)",
          "Hybrid IDS: دمج أنواع متعددة للحصول على تغطية أفضل",
          "SIEM Integration: دمج مع أنظمة إدارة الأحداث الأمنية",
          "Tuning: ضبط القواعد لتقليل False Positives/Negatives",
        ],
      },
      {
        title: "تجزئة الشبكة (Network Segmentation)",
        content: [
          "VLANs: شبكات محلية افتراضية لفصل حركة المرور (Layer 2)",
          "Subnetting: تقسيم الشبكة لشبكات فرعية (Layer 3)",
          "DMZ: منطقة منزوعة السلاح للخوادم العامة (Web, Mail, DNS)",
          "Air Gap: فصل كامل عن الإنترنت للأنظمة الحساسة (SCADA, Military)",
          "Micro-segmentation: تجزئة دقيقة على مستوى التطبيقات والـ workloads",
          "Zero Trust Network Access (ZTNA): لا تثق بأي شيء داخل أو خارج الشبكة",
          "Software-Defined Networking (SDN): تجزئة برمجية مرنة",
          "Network Access Control (NAC): التحقق قبل السماح بالاتصال",
          "الفائدة: تقليل نطاق الاختراق في حالة حدوثه (Blast Radius)",
          "East-West Traffic Control: مراقبة حركة المرور الداخلية",
        ],
      },
      {
        title: "VPN والاتصالات الآمنة",
        content: [
          "Site-to-Site VPN: ربط فروع المؤسسة بشكل آمن (IPsec Tunnel)",
          "Remote Access VPN: اتصال الموظفين عن بعد بشكل آمن",
          "بروتوكولات: OpenVPN، WireGuard (الأسرع)، IPsec، L2TP، IKEv2",
          "SSL VPN: VPN عبر HTTPS - لا يحتاج برامج خاصة",
          "Split Tunneling: توجيه حركة معينة فقط عبر VPN (أسرع، أقل أماناً)",
          "Full Tunneling: توجيه كل الحركة عبر VPN (أبطأ، أكثر أماناً)",
          "Always-On VPN: اتصال تلقائي دائم للأجهزة المؤسسية",
          "VPN Kill Switch: قطع الإنترنت إذا انقطع VPN",
          "Double VPN / Multi-hop: المرور عبر أكثر من خادم VPN",
          "الاعتبارات: السرعة، التشفير، الخصوصية، الموثوقية، No-Log Policy",
        ],
      },
      {
        title: "أمن الشبكات اللاسلكية",
        content: [
          "WEP: قديم وضعيف جداً - يُكسر في دقائق (لا تستخدمه أبداً)",
          "WPA: أفضل من WEP لكنه ضعيف أيضاً (TKIP)",
          "WPA2: المعيار الحالي - AES-CCMP (WPA2-Personal, WPA2-Enterprise)",
          "WPA3: أحدث وأقوى - SAE (Simultaneous Authentication of Equals)",
          "Evil Twin Attack: إنشاء نقطة وصول مزيفة بنفس الاسم",
          "Deauthentication Attack: فصل المستخدمين لإجبارهم على إعادة الاتصال",
          "PMKID Attack: استخراج hash بدون الحاجة لـ handshake كامل",
          "Rogue Access Point: نقطة وصول غير مصرح بها في الشبكة",
          "أدوات: Aircrack-ng، Wifite، Hashcat، Fluxion",
          "الحماية: WPA3، MAC Filtering، Hidden SSID، 802.1X، Wireless IDS",
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
          "A01 - Broken Access Control: الوصول لموارد غير مصرح بها (IDOR, Privilege Escalation)",
          "A02 - Cryptographic Failures: ضعف في التشفير وحماية البيانات الحساسة",
          "A03 - Injection: SQL، NoSQL، LDAP، OS Command، XPath injection",
          "A04 - Insecure Design: ثغرات في التصميم من البداية (Threat Modeling مهم)",
          "A05 - Security Misconfiguration: إعدادات افتراضية أو خاطئة أو مكشوفة",
          "A06 - Vulnerable Components: استخدام مكتبات قديمة أو معرضة للخطر",
          "A07 - Authentication Failures: ضعف في المصادقة وإدارة الجلسات",
          "A08 - Data Integrity Failures: ضعف في التحقق من سلامة البيانات (Insecure Deserialization)",
          "A09 - Security Logging Failures: عدم كفاية التسجيل والمراقبة",
          "A10 - SSRF: Server-Side Request Forgery - إجبار الخادم على طلبات داخلية",
        ],
      },
      {
        title: "التحقق من المدخلات (Input Validation)",
        content: [
          "Whitelist vs Blacklist: استخدم القوائم البيضاء كلما أمكن (أكثر أماناً)",
          "Server-side Validation: لا تعتمد على التحقق في المتصفح فقط - يمكن تجاوزه",
          "Parameterized Queries: استخدم Prepared Statements دائماً لمنع SQL Injection",
          "Output Encoding: ترميز المخرجات حسب السياق (HTML, JS, URL, CSS)",
          "File Upload Validation: التحقق من النوع والحجم والمحتوى (Magic Bytes)",
          "Regular Expressions: استخدم regex دقيقة للتحقق من الصيغ المتوقعة",
          "Canonicalization: توحيد المدخلات قبل التحقق (Path Traversal)",
          "Input Length Limits: تحديد الحد الأقصى للمدخلات",
          "Content-Type Validation: التحقق من نوع المحتوى المرسل",
          "الأدوات: OWASP ESAPI، DOMPurify، Validator.js",
        ],
      },
      {
        title: "إدارة الجلسات والمصادقة",
        content: [
          "Session ID: عشوائي وطويل بما يكفي (128-bit minimum، cryptographically random)",
          "HTTP-Only Cookies: منع JavaScript من الوصول للجلسة (XSS protection)",
          "Secure Flag: إرسال الكوكيز عبر HTTPS فقط",
          "SameSite Attribute: حماية من CSRF (Strict, Lax, None)",
          "Session Timeout: انتهاء الجلسة بعد فترة عدم نشاط (15-30 دقيقة)",
          "Absolute Timeout: انتهاء الجلسة بغض النظر عن النشاط (8 ساعات)",
          "Session Regeneration: تجديد Session ID بعد تسجيل الدخول",
          "MFA/2FA: المصادقة متعددة العوامل (TOTP, SMS, Hardware Keys)",
          "Password Policy: حد أدنى للطول والتعقيد، منع كلمات المرور الشائعة",
          "Account Lockout: قفل الحساب بعد محاولات فاشلة متعددة",
        ],
      },
      {
        title: "حماية APIs",
        content: [
          "Authentication: JWT (تحقق من signature وexpiry)، OAuth 2.0، API Keys",
          "Authorization: التحقق من الصلاحيات لكل طلب (RBAC, ABAC)",
          "Rate Limiting: تحديد عدد الطلبات لمنع الإساءة والـ DoS",
          "Input Validation: التحقق من جميع المدخلات والمعلمات",
          "HTTPS Only: تشفير جميع الاتصالات - لا HTTP أبداً",
          "CORS Policy: تحديد المصادر المسموح لها بالوصول بدقة",
          "API Versioning: إدارة الإصدارات وإلغاء القديم بأمان",
          "Request Size Limits: تحديد الحد الأقصى لحجم الطلبات",
          "API Gateway: نقطة مركزية للتحكم والمراقبة",
          "Logging & Monitoring: تسجيل جميع الطلبات ومراقبة الأنماط المشبوهة",
        ],
      },
      {
        title: "أمان الـ Headers",
        content: [
          "Content-Security-Policy (CSP): التحكم في مصادر المحتوى ومنع XSS",
          "X-Frame-Options: منع Clickjacking (DENY, SAMEORIGIN)",
          "X-Content-Type-Options: منع MIME sniffing (nosniff)",
          "Strict-Transport-Security (HSTS): فرض HTTPS (max-age, includeSubDomains)",
          "X-XSS-Protection: حماية XSS في المتصفحات القديمة",
          "Referrer-Policy: التحكم في معلومات المصدر المرسلة",
          "Permissions-Policy: التحكم في APIs المتصفح (camera, microphone, geolocation)",
          "Cache-Control: التحكم في التخزين المؤقت للبيانات الحساسة",
          "Set-Cookie Attributes: Secure, HttpOnly, SameSite, Path, Domain",
          "الأدوات: SecurityHeaders.com، Mozilla Observatory",
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
          "Kali Linux: الأشهر والأكثر استخداماً، +600 أداة مثبتة مسبقاً، دعم ممتاز",
          "Parrot Security OS: بديل خفيف مع تركيز على الخصوصية وأدوات تطوير",
          "BlackArch: مبني على Arch Linux مع +2800 أداة - للمتقدمين",
          "BackBox: مبني على Ubuntu، سهل الاستخدام للمبتدئين",
          "Pentoo: مبني على Gentoo للمتقدمين - تخصيص عالي",
          "CAINE: توزيعة متخصصة في التحقيق الجنائي الرقمي",
          "Tails: توزيعة للخصوصية المطلقة - تعمل من USB",
          "Whonix: توزيعة مبنية على Tor للخصوصية القصوى",
          "REMnux: متخصصة في تحليل البرمجيات الخبيثة",
          "نصيحة: ابدأ بـ Kali Linux لتوفر الدعم والتوثيق الممتاز",
        ],
      },
      {
        title: "أدوات فحص الشبكات",
        content: [
          "Nmap: الأداة الأساسية لفحص المنافذ واكتشاف الخدمات وOS detection",
          "Masscan: أسرع ماسح منافذ في العالم، مناسب للشبكات الكبيرة (ملايين الأجهزة)",
          "Zenmap: واجهة رسومية لـ Nmap - سهلة للمبتدئين",
          "Angry IP Scanner: ماسح IP سريع وبسيط عبر الأنظمة",
          "Netcat (nc): سكين الجيش السويسري للشبكات - ألف استخدام",
          "Wireshark: تحليل حزم الشبكة بالتفصيل - الأقوى في مجاله",
          "tcpdump: تحليل الحزم من سطر الأوامر",
          "Hping3: أداة متقدمة لفحص TCP/IP وإنشاء حزم مخصصة",
          "Responder: أداة LLMNR/NBT-NS/MDNS poisoning",
          "Arp-scan: اكتشاف الأجهزة في الشبكة المحلية",
        ],
      },
      {
        title: "أدوات اختبار تطبيقات الويب",
        content: [
          "Burp Suite: الأداة الأساسية لاختبار تطبيقات الويب - Professional الأقوى",
          "OWASP ZAP: بديل مجاني ومفتوح المصدر - ممتاز للمبتدئين",
          "Nikto: فحص سريع لثغرات الخوادم والإعدادات الخاطئة",
          "SQLMap: أتمتة اكتشاف واستغلال SQL Injection - قوي جداً",
          "Dirb/Gobuster/Feroxbuster: اكتشاف الملفات والمجلدات المخفية",
          "WPScan: فحص ثغرات WordPress بالتفصيل",
          "Nuclei: ماسح ثغرات سريع مع قوالب جاهزة",
          "Wfuzz: أداة fuzzing متقدمة للويب",
          "Subfinder/Amass: اكتشاف النطاقات الفرعية",
          "Httpx: فحص سريع لخوادم HTTP/HTTPS",
        ],
      },
      {
        title: "أدوات الاستغلال",
        content: [
          "Metasploit Framework: أشهر إطار عمل للاستغلال - آلاف الـ exploits والـ payloads",
          "Cobalt Strike: أداة تجارية متقدمة للفريق الأحمر - $3,500/سنة",
          "Empire: إطار عمل PowerShell للتحكم عن بعد (تم إيقافه، بدائل: Starkiller)",
          "Mimikatz: استخراج كلمات المرور من ذاكرة Windows - أيقونة",
          "Hashcat: أسرع أداة لكسر الهاشات باستخدام GPU",
          "John the Ripper: أداة كلاسيكية لكسر كلمات المرور",
          "Responder: هجمات LLMNR/NBT-NS في الشبكات المحلية",
          "CrackMapExec: أداة شاملة لاختبار Active Directory",
          "Impacket: مكتبة Python لبروتوكولات Windows",
          "BloodHound: تحليل وتصور مسارات الهجوم في AD",
        ],
      },
      {
        title: "أدوات الهندسة العكسية وتحليل البرمجيات",
        content: [
          "Ghidra: أداة NSA المجانية للهندسة العكسية - قوية جداً",
          "IDA Pro: المعيار الذهبي للهندسة العكسية (مدفوعة)",
          "Radare2/Cutter: أداة مفتوحة المصدر مع واجهة رسومية",
          "x64dbg/x32dbg: debugger لـ Windows",
          "GDB: debugger لـ Linux",
          "OllyDbg: debugger كلاسيكي لـ Windows",
          "Binwalk: تحليل واستخراج Firmware",
          "Strings: استخراج النصوص من الملفات الثنائية",
          "PEiD/Detect It Easy: كشف packers وcompilers",
          "Volatility: تحليل ذاكرة RAM للتحقيق الجنائي",
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
          "الاختراق بدون إذن جريمة جنائية في جميع الدول تقريباً - لا استثناءات",
          "Computer Fraud and Abuse Act (CFAA): القانون الأمريكي - عقوبات تصل لـ 20 سنة",
          "Computer Misuse Act 1990: القانون البريطاني",
          "قوانين الجرائم الإلكترونية العربية: تختلف حسب الدولة",
          "GDPR: حماية البيانات الشخصية في الاتحاد الأوروبي - غرامات تصل لـ 4% من الإيرادات",
          "HIPAA: حماية المعلومات الصحية في أمريكا",
          "PCI DSS: معيار أمان بيانات بطاقات الدفع",
          "SOX: قانون Sarbanes-Oxley للشركات المدرجة",
          "العقوبات تتراوح من الغرامات المالية إلى السجن لسنوات عديدة",
          "حتى 'الاختبار بدون قصد' قد يعتبر جريمة - احصل على إذن كتابي دائماً",
        ],
      },
      {
        title: "أخلاقيات الهاكر الأخلاقي",
        content: [
          "احصل دائماً على إذن كتابي (Written Authorization) قبل أي اختبار",
          "Letter of Authorization/Rules of Engagement: وثيقة تحدد النطاق والقواعد",
          "العمل ضمن النطاق المتفق عليه فقط - لا تتجاوز الحدود",
          "الإبلاغ عن جميع الثغرات المكتشفة للعميل بشكل كامل وصادق",
          "عدم الإضرار بالأنظمة أو البيانات - الهدف اكتشاف الثغرات لا التدمير",
          "الحفاظ على سرية المعلومات المكتشفة - NDA ملزم قانونياً",
          "الإفصاح المسؤول (Responsible Disclosure) للثغرات",
          "عدم استخدام المعلومات المكتشفة لأغراض شخصية",
          "التعاون مع فرق الأمن في المؤسسة",
          "المحافظة على التطوير المهني والتعلم المستمر",
        ],
      },
      {
        title: "برامج Bug Bounty",
        content: [
          "HackerOne: أكبر منصة لبرامج مكافآت الثغرات (+2000 برنامج)",
          "Bugcrowd: منصة شائعة أخرى مع مجتمع نشط",
          "Synack: منصة مغلقة للباحثين المختارين - مكافآت أعلى",
          "Intigriti: منصة أوروبية متنامية",
          "Open Bug Bounty: للمواقع بدون برنامج رسمي (حذراً)",
          "Google VRP: برنامج جوجل - مكافآت تصل لـ $31,337+",
          "Microsoft MSRC: برنامج مايكروسوفت",
          "نصائح: اقرأ القواعد جيداً، ابدأ بالبرامج العامة، ابني سمعة",
          "المكافآت تتراوح من $50 إلى $1,000,000+ للثغرات الحرجة",
          "الإبلاغ: اكتب تقارير واضحة مع PoC وخطوات إعادة الإنتاج",
        ],
      },
      {
        title: "الشهادات المهنية",
        content: [
          "CEH (Certified Ethical Hacker): شهادة أساسية شائعة من EC-Council",
          "OSCP (Offensive Security Certified Professional): عملية ومحترمة - 24 ساعة امتحان",
          "OSWE: متخصصة في اختبار تطبيقات الويب",
          "OSEP: متقدمة للتهرب من الحماية والـ Red Team",
          "CISSP: للإدارة والاستراتيجية الأمنية - 8 مجالات",
          "CompTIA Security+: شهادة أساسية ممتازة للمبتدئين",
          "CompTIA CySA+: تحليل الأمن السيبراني",
          "CISM/CISA: للحوكمة والتدقيق من ISACA",
          "GPEN/GWAPT: شهادات SANS - عالية الجودة ومكلفة",
          "نصيحة: الشهادات مهمة لكن الخبرة العملية والـ CTFs أهم",
        ],
      },
    ],
  },
  {
    icon: Cloud,
    title: "أمن السحابة (Cloud Security)",
    description: "حماية البيانات والتطبيقات في البيئات السحابية",
    subTopics: [
      {
        title: "نماذج الحوسبة السحابية",
        content: [
          "IaaS (Infrastructure as a Service): البنية التحتية كخدمة - AWS EC2, Azure VMs",
          "PaaS (Platform as a Service): المنصة كخدمة - Heroku, Google App Engine",
          "SaaS (Software as a Service): البرمجيات كخدمة - Office 365, Salesforce",
          "FaaS (Function as a Service): Serverless - AWS Lambda, Azure Functions",
          "Shared Responsibility Model: العميل والمزود يتشاركون المسؤولية الأمنية",
          "IaaS: العميل مسؤول عن كل شيء فوق hypervisor",
          "PaaS: العميل مسؤول عن التطبيقات والبيانات",
          "SaaS: العميل مسؤول عن البيانات والوصول فقط",
          "Multi-tenancy: عزل البيانات بين العملاء المختلفين",
          "Cloud-native Security: تصميم الأمان للسحابة من البداية",
        ],
      },
      {
        title: "أمن AWS",
        content: [
          "IAM (Identity and Access Management): إدارة الهويات والصلاحيات",
          "MFA: المصادقة متعددة العوامل لجميع الحسابات",
          "S3 Bucket Security: عدم جعل الـ buckets عامة، التشفير، Bucket Policies",
          "VPC (Virtual Private Cloud): عزل الشبكات، Security Groups، NACLs",
          "CloudTrail: تسجيل جميع API calls للتدقيق",
          "GuardDuty: كشف التهديدات الذكي",
          "Security Hub: لوحة تحكم مركزية للأمان",
          "Config: مراقبة تغييرات الإعدادات والامتثال",
          "KMS: إدارة مفاتيح التشفير",
          "AWS Organizations + SCPs: التحكم في الحسابات المتعددة",
        ],
      },
      {
        title: "أمن Azure",
        content: [
          "Azure Active Directory: إدارة الهويات المركزية",
          "Conditional Access: سياسات وصول ذكية حسب السياق",
          "Azure Security Center (Defender for Cloud): مراقبة وتوصيات أمنية",
          "Network Security Groups (NSGs): قواعد جدار الحماية",
          "Azure Sentinel: SIEM سحابي متكامل",
          "Key Vault: تخزين آمن للأسرار والمفاتيح والشهادات",
          "Azure Policy: فرض الامتثال والإعدادات",
          "Just-in-Time VM Access: تقليل سطح الهجوم",
          "Private Link: اتصال خاص بدون مرور عبر الإنترنت",
          "Azure Firewall: جدار حماية مُدار",
        ],
      },
      {
        title: "أمن الحاويات (Container Security)",
        content: [
          "Docker Security: عزل الحاويات، User Namespaces، Seccomp، AppArmor",
          "Image Security: فحص الصور، استخدام صور رسمية موثوقة، Minimal Images",
          "Registry Security: تأمين سجلات الصور (Harbor, ECR, ACR)",
          "Kubernetes Security: RBAC، Network Policies، Pod Security Standards",
          "Secrets Management: عدم تخزين الأسرار في الصور أو المتغيرات البيئية",
          "Runtime Security: Falco، Sysdig، Aqua Security",
          "Admission Controllers: OPA/Gatekeeper للتحقق من السياسات",
          "Service Mesh Security: Istio، Linkerd للتشفير والمراقبة",
          "Supply Chain Security: Cosign، SLSA للتحقق من سلسلة التوريد",
          "Trivy، Clair، Anchore: أدوات فحص الثغرات في الصور",
        ],
      },
    ],
  },
  {
    icon: Smartphone,
    title: "أمن تطبيقات الموبايل",
    description: "حماية تطبيقات الجوال على Android و iOS",
    subTopics: [
      {
        title: "OWASP Mobile Top 10",
        content: [
          "M1 - Improper Platform Usage: استخدام خاطئ لميزات النظام",
          "M2 - Insecure Data Storage: تخزين بيانات حساسة بشكل غير آمن",
          "M3 - Insecure Communication: اتصالات غير مشفرة",
          "M4 - Insecure Authentication: ضعف في المصادقة",
          "M5 - Insufficient Cryptography: تشفير ضعيف أو تطبيق خاطئ",
          "M6 - Insecure Authorization: ضعف في التفويض",
          "M7 - Client Code Quality: ثغرات في كود التطبيق",
          "M8 - Code Tampering: التلاعب بالتطبيق",
          "M9 - Reverse Engineering: الهندسة العكسية للتطبيق",
          "M10 - Extraneous Functionality: وظائف تطوير متروكة في الإنتاج",
        ],
      },
      {
        title: "أمن Android",
        content: [
          "APK Structure: AndroidManifest.xml، classes.dex، resources",
          "Decompilation: apktool، jadx، dex2jar لفك التجميع",
          "Root Detection Bypass: Frida، Magisk Hide، objection",
          "SSL Pinning Bypass: Frida scripts، objection",
          "Insecure Storage: SharedPreferences، SQLite databases غير مشفرة",
          "Intent Vulnerabilities: Broadcast receivers، Deep links",
          "WebView Security: JavaScript injection، File access",
          "Drozer: أداة اختبار أمان Android",
          "MobSF: تحليل ثابت وديناميكي للتطبيقات",
          "Burp Suite Mobile Assistant: اعتراض حركة التطبيقات",
        ],
      },
      {
        title: "أمن iOS",
        content: [
          "IPA Structure: Info.plist، executable، frameworks",
          "Jailbreak Detection: checkra1n، unc0ver، Palera1n",
          "Keychain Security: تخزين آمن للبيانات الحساسة",
          "Data Protection Classes: مستويات الحماية المختلفة",
          "App Transport Security (ATS): فرض HTTPS",
          "Binary Analysis: class-dump، Hopper، IDA",
          "Frida for iOS: Instrumentation وتعديل السلوك",
          "objection: أتمتة اختبار الأمان",
          "Cycript: تفاعل مع تطبيقات iOS أثناء التشغيل",
          "iMazing، 3uTools: استخراج وتحليل التطبيقات",
        ],
      },
      {
        title: "تقنيات الحماية",
        content: [
          "Certificate Pinning: ربط التطبيق بشهادة معينة لمنع MITM",
          "Code Obfuscation: تشويش الكود لصعوبة الهندسة العكسية (ProGuard، R8)",
          "Anti-Tampering: كشف التعديل على التطبيق",
          "Root/Jailbreak Detection: اكتشاف الأجهزة المعدلة",
          "Secure Storage: Android Keystore، iOS Keychain",
          "Biometric Authentication: Face ID، Touch ID، Fingerprint",
          "Runtime Application Self-Protection (RASP): حماية أثناء التشغيل",
          "Device Binding: ربط التطبيق بجهاز معين",
          "Emulator Detection: اكتشاف المحاكيات",
          "Dynamic Loading: تحميل أجزاء حساسة من الخادم",
        ],
      },
    ],
  },
  {
    icon: Radio,
    title: "أمن إنترنت الأشياء (IoT Security)",
    description: "حماية الأجهزة المتصلة والأنظمة الذكية",
    subTopics: [
      {
        title: "تحديات أمن IoT",
        content: [
          "موارد محدودة: ذاكرة ومعالجة قليلة تمنع التشفير القوي",
          "تحديثات صعبة: كثير من الأجهزة لا تُحدث أبداً",
          "Default Credentials: كلمات مرور افتراضية لا تُغير (admin:admin)",
          "عمر طويل: أجهزة تعمل لسنوات بدون دعم",
          "تنوع كبير: آلاف المصنعين والبروتوكولات",
          "Physical Access: الأجهزة قد تكون في أماكن غير آمنة",
          "Lack of Standards: غياب معايير أمان موحدة",
          "Supply Chain: ثغرات في مكونات الطرف الثالث",
          "Botnets: Mirai وأمثاله استغلوا ملايين الأجهزة",
          "Privacy Concerns: جمع بيانات ضخمة من المستخدمين",
        ],
      },
      {
        title: "هجمات IoT الشائعة",
        content: [
          "Default Password Attacks: استخدام كلمات المرور الافتراضية",
          "Firmware Attacks: استخراج وتحليل واستغلال الـ firmware",
          "JTAG/UART Attacks: الوصول عبر منافذ التصحيح",
          "Side-Channel Attacks: استخراج معلومات من الاستهلاك الكهربائي أو الإشعاع",
          "Replay Attacks: إعادة إرسال أوامر مسجلة",
          "Man-in-the-Middle: اعتراض الاتصالات",
          "Zigbee/Z-Wave Attacks: هجمات على بروتوكولات المنزل الذكي",
          "Bluetooth Attacks: BlueBorne، Bluesnarfing، Bluebugging",
          "RF Attacks: اعتراض إشارات الراديو (أجهزة التحكم، السيارات)",
          "Botnet Recruitment: تجنيد الأجهزة في شبكات الروبوت",
        ],
      },
      {
        title: "أدوات اختبار IoT",
        content: [
          "Binwalk: استخراج وتحليل Firmware",
          "Firmware-mod-kit: تعديل Firmware",
          "Flashrom: قراءة وكتابة شرائح Flash",
          "OpenWRT: نظام تشغيل مفتوح للراوترات",
          "Shodan/Censys: البحث عن أجهزة IoT المكشوفة",
          "Wireshark: تحليل بروتوكولات IoT",
          "Ubertooth: تحليل Bluetooth",
          "HackRF/RTL-SDR: تحليل إشارات الراديو",
          "Bus Pirate: تحليل واجهات الأجهزة (I2C، SPI، UART)",
          "Attify Badge: أداة شاملة لاختبار IoT",
        ],
      },
      {
        title: "حماية أجهزة IoT",
        content: [
          "تغيير كلمات المرور الافتراضية فوراً",
          "التحديثات التلقائية للـ Firmware",
          "تجزئة الشبكة: عزل أجهزة IoT في VLAN منفصلة",
          "Secure Boot: التحقق من سلامة الـ firmware قبل التشغيل",
          "Encrypted Communications: TLS/DTLS لجميع الاتصالات",
          "Mutual Authentication: التحقق المتبادل بين الجهاز والخادم",
          "Hardware Security Modules: حماية المفاتيح",
          "Firmware Signing: توقيع التحديثات رقمياً",
          "Disable Unused Services: تعطيل الخدمات غير المستخدمة",
          "Regular Security Audits: فحوصات أمنية دورية",
        ],
      },
    ],
  },
  {
    icon: Search,
    title: "التحقيق الجنائي الرقمي (Digital Forensics)",
    description: "تحليل الأدلة الرقمية والتحقيق في الحوادث الأمنية",
    subTopics: [
      {
        title: "أساسيات التحقيق الجنائي",
        content: [
          "تعريف: جمع وتحليل وحفظ الأدلة الرقمية بطريقة مقبولة قانونياً",
          "Chain of Custody: توثيق تسلسل حيازة الأدلة",
          "Order of Volatility: جمع الأدلة الأكثر تقلباً أولاً (RAM → Disk)",
          "Integrity: الحفاظ على سلامة الأدلة (Write Blockers، Hashing)",
          "Documentation: توثيق كل خطوة بالتفصيل",
          "Legal Considerations: الامتثال للقوانين المحلية والدولية",
          "Anti-Forensics: تقنيات يستخدمها المجرمون لإخفاء الأدلة",
          "Timeline Analysis: ترتيب الأحداث زمنياً",
          "Artifact Analysis: تحليل البقايا الرقمية",
          "Reporting: كتابة تقارير واضحة للمحاكم أو الإدارة",
        ],
      },
      {
        title: "تحقيق أنظمة Windows",
        content: [
          "Registry Analysis: HKLM، HKCU، NTUSER.DAT، SAM",
          "Event Logs: Security، System، Application logs",
          "Prefetch Files: دليل على تشغيل البرامج",
          "LNK Files: اختصارات تكشف الملفات المستخدمة",
          "Jump Lists: قوائم الملفات الأخيرة لكل تطبيق",
          "Browser Artifacts: History، Cookies، Cache، Downloads",
          "Shellbags: دليل على المجلدات التي تم الوصول إليها",
          "NTFS Artifacts: $MFT، $LogFile، $UsnJrnl",
          "Memory Analysis: استخراج العمليات والاتصالات من RAM",
          "أدوات: FTK، EnCase، Autopsy، Volatility",
        ],
      },
      {
        title: "تحقيق أنظمة Linux",
        content: [
          "Log Files: /var/log/auth.log، syslog، messages",
          "User History: .bash_history، .zsh_history",
          "File System: ext4 journal، deleted files",
          "Process Information: /proc filesystem",
          "Network Connections: netstat، ss، /proc/net",
          "Cron Jobs: scheduled tasks المجدولة",
          "Installed Packages: dpkg، rpm logs",
          "User Accounts: /etc/passwd، /etc/shadow",
          "SSH Artifacts: authorized_keys، known_hosts",
          "أدوات: Sleuth Kit، Autopsy، dc3dd، log2timeline",
        ],
      },
      {
        title: "تحليل الذاكرة (Memory Forensics)",
        content: [
          "أهمية RAM: تحتوي على بيانات غير موجودة على القرص",
          "Memory Acquisition: DumpIt، FTK Imager، LiME للـ Linux",
          "Volatility Framework: الأداة الأساسية لتحليل الذاكرة",
          "Process Analysis: العمليات الجارية والمخفية",
          "Network Connections: الاتصالات النشطة",
          "Injected Code: كود محقون في العمليات",
          "Registry in Memory: مفاتيح الريجستري",
          "Passwords & Keys: كلمات مرور ومفاتيح تشفير",
          "Malware Artifacts: آثار البرمجيات الخبيثة",
          "YARA Rules: اكتشاف أنماط البرمجيات الخبيثة",
        ],
      },
    ],
  },
  {
    icon: Skull,
    title: "تحليل البرمجيات الخبيثة",
    description: "فهم وتحليل الفيروسات والبرمجيات الضارة",
    subTopics: [
      {
        title: "أنواع البرمجيات الخبيثة",
        content: [
          "Viruses: تحتاج لملف مضيف وتنتشر عند التنفيذ",
          "Worms: تنتشر ذاتياً عبر الشبكة بدون تدخل",
          "Trojans: تتنكر كبرامج شرعية",
          "Ransomware: تشفير الملفات وطلب فدية (WannaCry، NotPetya، LockBit)",
          "Spyware: تجسس وسرقة معلومات",
          "Adware: عرض إعلانات مزعجة",
          "Rootkits: إخفاء وجود البرمجيات الخبيثة (Kernel، User-mode)",
          "Bootkits: إصابة boot sector قبل نظام التشغيل",
          "Fileless Malware: تعمل في الذاكرة فقط",
          "RAT (Remote Access Trojan): تحكم عن بعد كامل",
        ],
      },
      {
        title: "التحليل الثابت (Static Analysis)",
        content: [
          "تعريف: تحليل الملف بدون تشغيله",
          "File Hashing: MD5، SHA256 للتعريف والمقارنة",
          "VirusTotal: فحص بعشرات محركات مكافحة الفيروسات",
          "Strings Analysis: استخراج النصوص والمؤشرات",
          "PE Analysis: فحص هيكل ملفات Windows (headers، sections، imports)",
          "Packer Detection: كشف التغليف والتشويش (UPX، Themida)",
          "Import Analysis: الدوال المستوردة تكشف السلوك",
          "Disassembly: تحويل لـ Assembly (IDA، Ghidra)",
          "Decompilation: إعادة بناء الكود المصدري",
          "YARA Rules: كتابة قواعد للكشف",
        ],
      },
      {
        title: "التحليل الديناميكي (Dynamic Analysis)",
        content: [
          "تعريف: تشغيل البرمجية في بيئة معزولة ومراقبتها",
          "Sandboxing: ANY.RUN، Cuckoo، Joe Sandbox، Hybrid Analysis",
          "Process Monitoring: Process Monitor، Process Explorer",
          "File System Monitoring: تتبع الملفات المُنشأة والمُعدلة",
          "Registry Monitoring: تتبع تغييرات الريجستري",
          "Network Monitoring: Wireshark، Fiddler، INetSim",
          "API Monitoring: تتبع استدعاءات النظام (API Monitor)",
          "Debugging: x64dbg، OllyDbg للتحليل التفاعلي",
          "Memory Dumps: تحليل الذاكرة أثناء التشغيل",
          "Behavioral Indicators: تحديد مؤشرات السلوك (IOCs)",
        ],
      },
      {
        title: "مؤشرات الاختراق (Indicators of Compromise)",
        content: [
          "File Indicators: Hashes، أسماء ملفات، مسارات",
          "Network Indicators: IPs، Domains، URLs",
          "Host Indicators: Registry keys، Services، Scheduled tasks",
          "Behavioral Indicators: أنماط سلوك معينة",
          "STIX/TAXII: معايير تبادل معلومات التهديدات",
          "Threat Intelligence Platforms: MISP، OpenCTI، ThreatConnect",
          "IOC Sharing: تبادل المؤشرات مع المجتمع الأمني",
          "YARA Rules: قواعد للكشف عن البرمجيات الخبيثة",
          "Sigma Rules: قواعد للكشف في السجلات",
          "Snort/Suricata Rules: قواعد للكشف في الشبكة",
        ],
      },
    ],
  },
  {
    icon: Users,
    title: "الفريق الأحمر والأزرق (Red/Blue Team)",
    description: "فهم أدوار الهجوم والدفاع في الأمن السيبراني",
    subTopics: [
      {
        title: "الفريق الأحمر (Red Team)",
        content: [
          "تعريف: محاكاة هجمات حقيقية لاختبار دفاعات المؤسسة",
          "الفرق عن Pentest: أوسع نطاقاً، أطول مدة، يشمل الهندسة الاجتماعية والفيزيائي",
          "Objectives: تحقيق أهداف محددة (سرقة بيانات، الوصول لـ Domain Admin)",
          "TTPs: Tactics, Techniques, Procedures المستخدمة",
          "MITRE ATT&CK: إطار عمل لتصنيف التكتيكات والتقنيات",
          "C2 (Command & Control): Cobalt Strike، Covenant، Sliver",
          "Evasion: تجاوز أنظمة الحماية (AV، EDR)",
          "Phishing Campaigns: حملات تصيد لاختبار الموظفين",
          "Physical Testing: اختبار الأمن الفيزيائي",
          "Reporting: تقرير شامل بالنتائج والتوصيات",
        ],
      },
      {
        title: "الفريق الأزرق (Blue Team)",
        content: [
          "تعريف: الدفاع عن المؤسسة واكتشاف والاستجابة للتهديدات",
          "SOC (Security Operations Center): مركز عمليات الأمن",
          "SIEM: جمع وتحليل السجلات (Splunk، ELK، QRadar)",
          "EDR (Endpoint Detection and Response): حماية النقاط النهائية",
          "Threat Hunting: البحث الاستباقي عن التهديدات",
          "Incident Response: الاستجابة للحوادث الأمنية",
          "Threat Intelligence: استخبارات التهديدات",
          "Vulnerability Management: إدارة الثغرات",
          "Security Awareness: توعية الموظفين",
          "Tabletop Exercises: تمارين محاكاة للحوادث",
        ],
      },
      {
        title: "الفريق البنفسجي (Purple Team)",
        content: [
          "تعريف: دمج الأحمر والأزرق للتحسين المستمر",
          "Collaboration: تعاون بين الفريقين بدلاً من المنافسة",
          "Attack Simulation: محاكاة هجمات وقياس الاستجابة",
          "Detection Engineering: تطوير قواعد الكشف معاً",
          "Gap Analysis: تحديد الفجوات في الدفاعات",
          "Continuous Improvement: تحسين مستمر للدفاعات",
          "Metrics: قياس الأداء (MTTD، MTTR)",
          "Atomic Red Team: اختبارات صغيرة للتكتيكات",
          "MITRE ATT&CK Mapping: ربط الاختبارات بالإطار",
          "Lessons Learned: توثيق الدروس المستفادة",
        ],
      },
      {
        title: "الاستجابة للحوادث (Incident Response)",
        content: [
          "Preparation: التحضير والتخطيط المسبق",
          "Identification: اكتشاف وتحديد الحادثة",
          "Containment: احتواء الحادثة ومنع انتشارها",
          "Eradication: إزالة التهديد من الأنظمة",
          "Recovery: استعادة الأنظمة للعمل الطبيعي",
          "Lessons Learned: توثيق الدروس المستفادة",
          "Playbooks: إجراءات موثقة لأنواع الحوادث المختلفة",
          "Communication: التواصل مع الأطراف المعنية",
          "Legal/Compliance: الامتثال للمتطلبات القانونية",
          "Post-Incident Review: مراجعة ما بعد الحادثة",
        ],
      },
    ],
  },
  {
    icon: Braces,
    title: "البرمجة للأمن السيبراني",
    description: "لغات البرمجة والأتمتة في مجال الأمن",
    subTopics: [
      {
        title: "Python للأمن السيبراني",
        content: [
          "لماذا Python: سهولة التعلم، مكتبات ضخمة، مجتمع نشط",
          "Scapy: إنشاء وتحليل حزم الشبكة",
          "Requests: التعامل مع HTTP/HTTPS",
          "BeautifulSoup/Scrapy: استخراج البيانات من الويب",
          "Paramiko: التعامل مع SSH",
          "Cryptography: تشفير وفك تشفير",
          "Pwntools: أداة للـ CTF والـ Binary Exploitation",
          "Impacket: بروتوكولات Windows (SMB، MSRPC)",
          "Socket Programming: برمجة الشبكات منخفضة المستوى",
          "Malware Development: كتابة أدوات للاختبار (للتعليم فقط)",
        ],
      },
      {
        title: "Bash Scripting",
        content: [
          "أتمتة المهام: أتمتة فحوصات الأمان المتكررة",
          "Log Analysis: تحليل السجلات والبحث فيها",
          "System Administration: إدارة أنظمة Linux",
          "Reconnaissance Scripts: سكربتات جمع المعلومات",
          "Backup Automation: أتمتة النسخ الاحتياطي",
          "Monitoring Scripts: سكربتات المراقبة",
          "File Processing: معالجة الملفات والنصوص",
          "Network Tools: أدوات شبكية بسيطة",
          "Cron Jobs: جدولة المهام",
          "One-liners: أوامر قوية من سطر واحد",
        ],
      },
      {
        title: "PowerShell للأمن",
        content: [
          "Active Directory: استعلام وإدارة AD",
          "Event Log Analysis: تحليل سجلات Windows",
          "Incident Response: أتمتة الاستجابة للحوادث",
          "Forensics: جمع الأدلة الرقمية",
          "Remote Administration: إدارة الأجهزة عن بعد",
          "Security Baselines: تطبيق والتحقق من معايير الأمان",
          "Offensive PowerShell: PowerShell Empire، Nishang",
          "AMSI Bypass: تجاوز Anti-Malware Scan Interface",
          "Constrained Language Mode: وضع اللغة المقيدة",
          "PowerShell Logging: تفعيل وتحليل السجلات",
        ],
      },
      {
        title: "لغات أخرى مهمة",
        content: [
          "C/C++: فهم Buffer Overflow، كتابة Exploits، تطوير أدوات منخفضة المستوى",
          "Assembly: فهم الهندسة العكسية وكتابة Shellcode",
          "JavaScript: اختبار أمان الويب، كتابة XSS payloads",
          "Go (Golang): أدوات سريعة ومستقلة (Cobalt Strike alternatives)",
          "Rust: أدوات أمنية آمنة الذاكرة",
          "SQL: فهم واستغلال SQL Injection",
          "Ruby: Metasploit مكتوب بـ Ruby",
          "Lua: Nmap scripts (NSE)",
          "PHP: فهم ثغرات تطبيقات PHP الشائعة",
          "Regex: التعبيرات النمطية للبحث والتحليل",
        ],
      },
    ],
  },
  {
    icon: Wrench,
    title: "مصادر التعلم والتطبيق",
    description: "منصات التدريب والموارد لتطوير مهاراتك",
    subTopics: [
      {
        title: "منصات التدريب العملي",
        content: [
          "HackTheBox: منصة CTF وLabs متقدمة (Machines، Challenges، Pro Labs)",
          "TryHackMe: ممتازة للمبتدئين مع مسارات تعليمية (Learning Paths)",
          "PentesterLab: تركيز على اختبار تطبيقات الويب",
          "VulnHub: أجهزة افتراضية مجانية للتنزيل والتدريب",
          "Offensive Security Proving Grounds: من صناع OSCP",
          "PortSwigger Web Security Academy: دورة مجانية ممتازة للويب",
          "PicoCTF: CTF للمبتدئين من CMU",
          "OverTheWire: Wargames للمبتدئين (Bandit، Natas)",
          "Root-Me: تحديات متنوعة بالفرنسية والإنجليزية",
          "CyberDefenders: تركيز على Blue Team والـ DFIR",
        ],
      },
      {
        title: "دورات وكورسات",
        content: [
          "Offensive Security (OSCP/OSWE/OSEP): الأفضل للعمل العملي",
          "SANS Institute: دورات عالية الجودة (مكلفة جداً)",
          "EC-Council (CEH، CPENT): شهادات معروفة",
          "eLearnSecurity/INE: EJPT، eCPPT، eWPT",
          "Coursera/edX: دورات جامعية مجانية",
          "Udemy: دورات متنوعة بأسعار رخيصة",
          "Cybrary: دورات مجانية ومدفوعة",
          "YouTube: مصادر مجانية ممتازة (IppSec، John Hammond، LiveOverflow)",
          "TCM Security: دورات عملية بأسعار معقولة",
          "Zero Point Security (RTO): تدريب Red Team متقدم",
        ],
      },
      {
        title: "كتب ومراجع",
        content: [
          "The Web Application Hacker's Handbook: الكتاب الأساسي لأمن الويب",
          "Hacking: The Art of Exploitation: أساسيات الاستغلال",
          "Penetration Testing (Georgia Weidman): دليل شامل للمبتدئين",
          "The Hacker Playbook 3: تكتيكات Red Team",
          "Black Hat Python/Go: برمجة أدوات الأمان",
          "Practical Malware Analysis: تحليل البرمجيات الخبيثة",
          "Blue Team Handbook: دليل الفريق الأزرق",
          "RTFM/BTFM: مراجع سريعة للـ Red/Blue Team",
          "OWASP Testing Guide: دليل اختبار الويب المجاني",
          "NIST Cybersecurity Framework: إطار العمل الأساسي",
        ],
      },
      {
        title: "مجتمعات ومصادر",
        content: [
          "Reddit: r/netsec، r/hacking، r/AskNetsec",
          "Twitter/X: متابعة الباحثين الأمنيين",
          "Discord: HackTheBox، TryHackMe، InfoSec Prep",
          "GitHub: أدوات مفتوحة المصدر وأبحاث",
          "Awesome Security: قوائم منسقة للموارد",
          "Security Newsletters: tl;dr sec، This Week in Security",
          "Podcasts: Darknet Diaries، Security Now، Risky Business",
          "Conferences: DEF CON، Black Hat، BSides (فيديوهات مجانية)",
          "Bug Bounty Write-ups: تعلم من تقارير الآخرين",
          "CTF Write-ups: حلول التحديات السابقة",
        ],
      },
      {
        title: "نصائح للمسار المهني",
        content: [
          "ابدأ بالأساسيات: الشبكات، Linux، البرمجة قبل الأمن",
          "تعلم بالممارسة: النظرية وحدها لا تكفي",
          "شارك في CTFs: تطوير مهارات حل المشكلات",
          "ابني Portfolio: مشاريع، Write-ups، مساهمات",
          "احصل على شهادات: تفتح أبواب التوظيف",
          "شارك في Bug Bounty: دخل إضافي وخبرة حقيقية",
          "انضم للمجتمعات: التواصل مع المحترفين",
          "تابع الأخبار: التهديدات والأدوات الجديدة",
          "تخصص: اختر مجالاً وتعمق فيه",
          "لا تتوقف: هذا المجال يتطور باستمرار",
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

  // Calculate total topics and items
  const totalSubTopics = guideTopics.reduce((acc, topic) => acc + topic.subTopics.length, 0);
  const totalItems = guideTopics.reduce((acc, topic) => 
    acc + topic.subTopics.reduce((subAcc, sub) => subAcc + sub.content.length, 0), 0
  );

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
              الدليل الكامل للأمن السيبراني
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
              تعلم الأمن السيبراني خطوة بخطوة
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                {guideTopics.length} قسم رئيسي
              </span>
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                {totalSubTopics} موضوع فرعي
              </span>
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium">
                +{totalItems} نقطة تعليمية
              </span>
            </div>
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
                  <div className="flex items-center gap-5">
                    <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center" style={{ width: '72px', height: '72px' }}>
                      <topic.icon className="w-9 h-9 text-primary" />
                    </div>
                    <div className="text-right">
                      <h2 className="text-2xl md:text-3xl font-bold text-primary">{topic.title}</h2>
                      <p className="text-muted-foreground text-base mt-2">{topic.description}</p>
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
                            <div className="flex items-center gap-4">
                              <span className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold text-base">
                                {subIndex + 1}
                              </span>
                              <h3 className="text-xl font-semibold text-foreground">{subTopic.title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="hidden sm:block text-xs text-muted-foreground">
                                {subTopic.content.length} نقطة
                              </span>
                              {expandedSubTopic === subTopicId ? (
                                <ChevronUp className="w-5 h-5 text-primary" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </button>

                          {expandedSubTopic === subTopicId && (
                            <div className="px-5 pb-5 space-y-3 animate-fade-in">
                              {subTopic.content.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-start gap-4 p-4 rounded-xl bg-background/50">
                                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                                  <p className="text-foreground text-base leading-relaxed">{item}</p>
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

        </div>
        
        {/* End of content */}
      </main>
      <Footer />
    </div>
  );
};

export default GuidePage;
