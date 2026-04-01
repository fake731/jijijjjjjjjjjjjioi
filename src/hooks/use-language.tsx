import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "ar" | "en";

export interface LanguageInfo {
  id: Language;
  name: string;
  nativeName: string;
  dir: "rtl" | "ltr";
  flag: string;
}

export const languages: LanguageInfo[] = [
  { id: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇵🇸" },
  { id: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇺🇸" },
];

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    "nav.home": "الرئيسية",
    "nav.tools": "الأدوات",
    "nav.scripts": "السكربتات",
    "nav.scanner": "الاوامر",
    "nav.guide": "الدليل",
    "nav.download": "التحميل",
    "nav.ai": "الذكاء الاصطناعي",
    "nav.webdev": "تطوير الويب",
    "nav.password": "فحص كلمة المرور",
    "nav.inquiry": "الاستفسارات",
    "nav.privacy": "سياسة الخصوصية",
    "hero.title": "Qusay Kali",
    "hero.subtitle": "منصة للأمن السيبراني",
    "hero.description": "دليلك الشامل لتعلم الأمن السيبراني من الصفر إلى الاحتراف",
    "hero.cta.tools": "استكشف الأدوات",
    "hero.cta.guide": "ابدأ التعلم",
    "features.title": "ماذا نقدم لك؟",
    "features.tools.title": "الأدوات",
    "features.tools.desc": "أدوات الأمن السيبراني",
    "features.scripts.title": "السكربتات",
    "features.scripts.desc": "أكواد برمجية للاستخدام",
    "features.guide.title": "الدليل",
    "features.guide.desc": "تعلم خطوة بخطوة مع أدلة",
    "features.ai.title": "ذكاء اصطناعي",
    "features.ai.desc": "مساعد للإجابة على أسئلتك",
    "cta.title": "جاهز للبدء؟",
    "cta.description": "الموقع مجاني 100%",
    "cta.button": "ابدأ الآن",
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.developer": "تطوير",
    "common.search": "بحث",
    "common.download": "تحميل",
    "common.copy": "نسخ",
    "common.copied": "تم النسخ",
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.previous": "السابق",
    "tools.title": "الأدوات",
    "tools.subtitle": "أدوات الأمن السيبراني",
    "tools.search": "ابحث عن أداة...",
    "tools.categories.all": "الكل",
    "tools.categories.network": "الشبكات",
    "tools.categories.security": "الأمان",
    "tools.categories.recon": "الاستطلاع",
    "scripts.title": "السكربتات",
    "scripts.subtitle": "أكواد برمجية جاهزة للاستخدام",
    "scripts.search": "ابحث عن سكربت...",
    "ai.title": "الذكاء الاصطناعي",
    "ai.placeholder": "اكتب رسالتك هنا...",
    "ai.send": "إرسال",
    "theme.select": "اختر الثيم",
    "theme.language": "اللغة",
  },
  en: {
    "nav.home": "Home",
    "nav.tools": "Tools",
    "nav.scripts": "Scripts",
    "nav.scanner": "Commands",
    "nav.guide": "Guide",
    "nav.download": "Download",
    "nav.ai": "AI Assistant",
    "nav.webdev": "Web Development",
    "nav.password": "Password Checker",
    "nav.inquiry": "Inquiries",
    "nav.privacy": "Privacy Policy",
    "hero.title": "Qusay Kali",
    "hero.subtitle": "Cybersecurity Platform",
    "hero.description": "Explore the world of cybersecurity with tools, scripts, and educational guides",
    "hero.cta.tools": "Explore Tools",
    "hero.cta.guide": "Start Learning",
    "features.title": "What We Offer",
    "features.tools.title": "Tools",
    "features.tools.desc": "Cybersecurity tools",
    "features.scripts.title": "Scripts",
    "features.scripts.desc": "Ready-to-use programming scripts",
    "features.guide.title": "Guide",
    "features.guide.desc": "Learn step by step with guides",
    "features.ai.title": "AI Assistant",
    "features.ai.desc": "Assistant to answer your questions",
    "cta.title": "Ready to Start?",
    "cta.description": "Join us and explore the world of cybersecurity",
    "cta.button": "Get Started",
    "footer.rights": "All rights reserved",
    "footer.developer": "Developed by",
    "common.search": "Search",
    "common.download": "Download",
    "common.copy": "Copy",
    "common.copied": "Copied",
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "tools.title": "Tools",
    "tools.subtitle": "Cybersecurity tools collection",
    "tools.search": "Search for a tool...",
    "tools.categories.all": "All",
    "tools.categories.network": "Network",
    "tools.categories.security": "Security",
    "tools.categories.recon": "Reconnaissance",
    "scripts.title": "Scripts",
    "scripts.subtitle": "Ready-to-use programming scripts",
    "scripts.search": "Search for a script...",
    "ai.title": "AI Assistant",
    "ai.placeholder": "Type your message here...",
    "ai.send": "Send",
    "theme.select": "Select Theme",
    "theme.language": "Language",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
  currentLanguage: LanguageInfo;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    if (stored === "ar" || stored === "en") return stored;
    return "ar";
  });

  const currentLanguage = languages.find(l => l.id === language) || languages[0];

  useEffect(() => {
    const root = document.documentElement;
    root.dir = currentLanguage.dir;
    root.lang = language;
    localStorage.setItem("language", language);
    document.body.style.direction = currentLanguage.dir;
  }, [language, currentLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: currentLanguage.dir, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
