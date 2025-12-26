import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Shield, Target, Eye, Lock, Network, Database, Terminal, AlertTriangle, CheckCircle } from "lucide-react";

const guideTopics = [
  {
    icon: Shield,
    title: "أساسيات الأمن السيبراني",
    content: [
      "الأمن السيبراني هو ممارسة حماية الأنظمة والشبكات والبرامج من الهجمات الرقمية",
      "يشمل حماية البيانات الحساسة من الوصول غير المصرح به",
      "يتضمن ثلاثة مبادئ أساسية: السرية، النزاهة، والتوافر (CIA Triad)",
      "السرية: ضمان وصول المعلومات للأشخاص المصرح لهم فقط",
      "النزاهة: ضمان عدم تعديل البيانات بشكل غير مصرح به",
      "التوافر: ضمان توفر المعلومات عند الحاجة إليها",
    ],
  },
  {
    icon: Target,
    title: "أنواع الهجمات الإلكترونية",
    content: [
      "هجمات التصيد (Phishing): رسائل مزيفة لسرقة المعلومات",
      "هجمات البرمجيات الخبيثة (Malware): فيروسات، تروجان، رانسوموير",
      "هجمات حجب الخدمة (DDoS): إغراق الخادم بالطلبات",
      "هجمات الرجل في المنتصف (MITM): اعتراض الاتصالات",
      "هجمات SQL Injection: حقن أوامر في قواعد البيانات",
      "هجمات XSS: حقن أكواد خبيثة في صفحات الويب",
      "هجمات القوة الغاشمة (Brute Force): تجربة كلمات مرور متعددة",
    ],
  },
  {
    icon: Eye,
    title: "اختبار الاختراق (Penetration Testing)",
    content: [
      "اختبار الاختراق هو محاكاة هجوم على نظام لاكتشاف الثغرات",
      "المراحل: الاستطلاع → المسح → الاستغلال → ما بعد الاستغلال → التقرير",
      "الاستطلاع السلبي: جمع معلومات بدون التفاعل مع الهدف",
      "الاستطلاع النشط: فحص مباشر للهدف",
      "أنواع الاختبار: Black Box، White Box، Gray Box",
      "يجب الحصول على إذن كتابي قبل أي اختبار اختراق",
    ],
  },
  {
    icon: Lock,
    title: "التشفير والحماية",
    content: [
      "التشفير المتماثل: مفتاح واحد للتشفير وفك التشفير (AES, DES)",
      "التشفير غير المتماثل: مفتاح عام وخاص (RSA, ECC)",
      "دوال الهاش: تحويل البيانات لقيمة ثابتة (MD5, SHA-256)",
      "الشهادات الرقمية: إثبات هوية المواقع (SSL/TLS)",
      "VPN: تشفير الاتصال وإخفاء الهوية",
      "المصادقة الثنائية (2FA): طبقة حماية إضافية",
    ],
  },
  {
    icon: Network,
    title: "أمن الشبكات",
    content: [
      "جدار الحماية (Firewall): فلترة حركة المرور",
      "نظام كشف التسلل (IDS): مراقبة الأنشطة المشبوهة",
      "نظام منع التسلل (IPS): حظر الهجمات تلقائياً",
      "تجزئة الشبكة: فصل الأجزاء الحساسة",
      "مراقبة الشبكة: تحليل حركة المرور باستمرار",
      "بروتوكولات آمنة: HTTPS, SSH, SFTP",
    ],
  },
  {
    icon: Database,
    title: "أمن تطبيقات الويب",
    content: [
      "OWASP Top 10: أهم 10 ثغرات في تطبيقات الويب",
      "التحقق من المدخلات: منع الحقن",
      "إدارة الجلسات بشكل آمن",
      "حماية من CSRF: رموز مضادة للتزوير",
      "Content Security Policy: منع XSS",
      "تحديث المكتبات والإطارات باستمرار",
    ],
  },
  {
    icon: Terminal,
    title: "أنظمة التشغيل والأدوات",
    content: [
      "Kali Linux: توزيعة مخصصة لاختبار الاختراق",
      "Parrot OS: بديل خفيف لكالي",
      "Metasploit: إطار عمل للاستغلال",
      "Nmap: فحص الشبكات والمنافذ",
      "Burp Suite: اختبار تطبيقات الويب",
      "Wireshark: تحليل حزم الشبكة",
    ],
  },
  {
    icon: AlertTriangle,
    title: "القوانين والأخلاقيات",
    content: [
      "الاختراق بدون إذن جريمة يعاقب عليها القانون",
      "احصل دائماً على إذن كتابي قبل أي اختبار",
      "الهاكر الأخلاقي يعمل لصالح الحماية",
      "الإفصاح المسؤول عن الثغرات",
      "احترام خصوصية البيانات",
      "برامج Bug Bounty للإبلاغ عن الثغرات",
    ],
  },
];

const GuidePage = () => {
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
              دليلك الشامل لتعلم الأمن السيبراني من الصفر إلى الاحتراف
            </p>
          </div>

          {/* Guide Topics */}
          <div className="max-w-5xl mx-auto space-y-8">
            {guideTopics.map((topic, index) => (
              <div key={index} className="cyber-card overflow-hidden">
                <div className="p-6 border-b border-border/30 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <topic.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">{topic.title}</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {topic.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="cyber-card p-8 text-center">
              <h3 className="text-xl font-bold text-primary mb-4">نصائح للمبتدئين</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-muted-foreground">
                <div className="p-4">
                  <div className="text-3xl mb-2">📚</div>
                  <p>تعلم الأساسيات أولاً: الشبكات، لينكس، البرمجة</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <p>تدرب على منصات مثل HackTheBox و TryHackMe</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🔒</div>
                  <p>كن أخلاقياً واحترم القوانين دائماً</p>
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
