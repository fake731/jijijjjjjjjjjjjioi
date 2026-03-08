import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, UserCheck, Trash2, Mail, MessageSquare, History } from "lucide-react";

const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: <Database className="w-6 h-6 text-primary" />,
      title: "البيانات التي نجمعها",
      content: [
        "الاسم الكامل أو اسم العرض",
        "البريد الإلكتروني",
        "العمر",
        "الصورة الشخصية (اختياري)",
        "البلد والمدينة (يتم كشفها تلقائياً من عنوان IP مع إمكانية التعديل يدوياً)",
        "رقم الهاتف (اختياري)",
        "نوع الجهاز المستخدم (موبايل، كمبيوتر، تابلت) — يتم كشفه تلقائياً",
        "تاريخ إنشاء الحساب",
        "سجل زيارات الصفحات",
      ],
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "محادثات الذكاء الاصطناعي",
      content: [
        "يتم حفظ جميع الرسائل المرسلة إلى الذكاء الاصطناعي وردوده عليها",
        "يمكن للمطور الاطلاع على المحادثات لأغراض تحسين الخدمة ومراقبة الأداء",
        "يتم ربط المحادثات بحسابك (الاسم والبريد الإلكتروني) عند تسجيل الدخول",
        "المحادثات غير المسجّل صاحبها تظهر كـ'مجهول' في سجلات المطور",
      ],
    },
    {
      icon: <History className="w-6 h-6 text-primary" />,
      title: "سجل المحادثات",
      content: [
        "يمكنك العودة لمحادثاتك السابقة مع الذكاء الاصطناعي في أي وقت",
        "يتم تجميع الرسائل في محادثات منفصلة لسهولة الرجوع إليها",
        "سجل المحادثات مرتبط بحسابك فقط ولا يمكن لمستخدم آخر رؤيته",
      ],
    },
    {
      icon: <Eye className="w-6 h-6 text-primary" />,
      title: "كيف نستخدم بياناتك",
      content: [
        "إدارة حسابك وتوفير تجربة مخصصة",
        "مناداتك باسمك في محادثات الذكاء الاصطناعي",
        "التواصل معك بخصوص تحديثات الموقع",
        "تحسين خدماتنا وأدواتنا بناءً على أنماط الاستخدام",
        "أغراض أمنية وإدارية لحماية الموقع",
      ],
    },
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "حماية البيانات",
      content: [
        "نستخدم تشفير SSL/TLS لحماية نقل البيانات",
        "البيانات مخزنة في قواعد بيانات مؤمنة مع سياسات وصول صارمة (RLS)",
        "كلمات المرور مشفرة ولا يمكن لأحد الاطلاع عليها",
        "لا نشارك بياناتك مع أطراف ثالثة أو شركات إعلانية",
        "رمز التحقق يُرسل إلى بريدك الإلكتروني عند التسجيل لضمان أمان حسابك",
      ],
    },
    {
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      title: "من يمكنه الوصول لبياناتك",
      content: [
        "المطور فقط يمكنه الاطلاع على بيانات الحسابات ومحادثات AI لأغراض إدارية",
        "المطور لديه صلاحيات إدارة الحسابات بما في ذلك إزالة المستخدمين عند الضرورة",
        "لا يمكن لأي مستخدم آخر رؤية بياناتك الشخصية أو محادثاتك",
        "لا نبيع أو نشارك بياناتك مع جهات خارجية",
      ],
    },
    {
      icon: <Trash2 className="w-6 h-6 text-primary" />,
      title: "حقوقك",
      content: [
        "يمكنك تعديل بياناتك الشخصية في أي وقت من صفحة الملف الشخصي",
        "يمكنك طلب حذف حسابك وجميع بياناتك بالتواصل مع المطور",
        "يمكنك الاطلاع على جميع البيانات المخزنة عنك",
        "يمكنك مراجعة سجل محادثاتك السابقة مع الذكاء الاصطناعي",
      ],
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "التواصل",
      content: [
        "لأي استفسارات حول الخصوصية، تواصل معنا عبر صفحة الاستفسارات",
        "أو عبر انستغرام: @0oscp",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              سياسة الخصوصية
            </h1>
            <p className="text-muted-foreground text-lg">
              نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              آخر تحديث: مارس 2026
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="cyber-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-2 mr-4">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-1.5 text-xs">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground">
              باستخدامك لهذا الموقع وإنشاء حساب، فإنك توافق على سياسة الخصوصية هذه.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
