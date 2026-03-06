import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "ar" | "en" | "es" | "zh" | "hi";

export interface LanguageInfo {
  id: Language;
  name: string;
  nativeName: string;
  dir: "rtl" | "ltr";
  flag: string;
}

export const languages: LanguageInfo[] = [
  { id: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇸🇦" },
  { id: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇺🇸" },
  { id: "es", name: "Spanish", nativeName: "Español", dir: "ltr", flag: "🇪🇸" },
  { id: "zh", name: "Chinese", nativeName: "中文", dir: "ltr", flag: "🇨🇳" },
  { id: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
];

// Translations
export const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.tools": "الأدوات",
    "nav.scripts": "السكربتات",
    "nav.scanner": "اكتب اوامر",
    "nav.guide": "الدليل",
    "nav.download": "التحميل",
    "nav.ai": "الذكاء الاصطناعي",
    "nav.webdev": "تطوير الويب",
    "nav.password": "فحص كلمة المرور",
    "nav.inquiry": "الاستفسارات",
    
    // Hero Section
    "hero.title": "Qusay Kali",
    "hero.subtitle": "منصة للأمن السيبراني",
    "hero.description": "اكتشف عالم الأمن السيبراني مع أدوات وسكربتات وأدلة تعليمية",
    "hero.cta.tools": "استكشف الأدوات",
    "hero.cta.guide": "ابدأ التعلم",
    
    // Features
    "features.title": "ماذا نقدم لك؟",
    "features.tools.title": "الأدوات",
    "features.tools.desc": "أدوات الأمن السيبراني",
    "features.scripts.title": "السكربتات",
    "features.scripts.desc": "أكواد برمجية للاستخدام",
    "features.guide.title": "الدليل",
    "features.guide.desc": "تعلم خطوة بخطوة مع أدلة",
    "features.ai.title": "ذكاء اصطناعي",
    "features.ai.desc": "مساعد للإجابة على أسئلتك",
    
    // CTA
    "cta.title": "جاهز للبدء؟",
    "cta.description": "انضم إلينا واكتشف عالم الأمن السيبراني",
    "cta.button": "ابدأ الآن",
    
    // Footer
    "footer.rights": "جميع الحقوق محفوظة",
    "footer.developer": "تطوير",
    
    // Common
    "common.search": "بحث",
    "common.download": "تحميل",
    "common.copy": "نسخ",
    "common.copied": "تم النسخ",
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.previous": "السابق",
    
    // Tools Page
    "tools.title": "الأدوات",
    "tools.subtitle": "أدوات الأمن السيبراني",
    "tools.search": "ابحث عن أداة...",
    "tools.categories.all": "الكل",
    "tools.categories.network": "الشبكات",
    "tools.categories.security": "الأمان",
    "tools.categories.recon": "الاستطلاع",
    
    // Scripts Page
    "scripts.title": "السكربتات",
    "scripts.subtitle": "أكواد برمجية جاهزة للاستخدام",
    "scripts.search": "ابحث عن سكربت...",
    
    // AI Page
    "ai.title": "الذكاء الاصطناعي",
    "ai.placeholder": "اكتب رسالتك هنا...",
    "ai.send": "إرسال",
    
    // Theme
    "theme.select": "اختر الثيم",
    "theme.language": "اللغة",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.tools": "Tools",
    "nav.scripts": "Scripts",
    "nav.scanner": "Scanner",
    "nav.guide": "Guide",
    "nav.download": "Download",
    "nav.ai": "AI Assistant",
    "nav.webdev": "Web Development",
    "nav.password": "Password Checker",
    "nav.inquiry": "Inquiries",
    
    // Hero Section
    "hero.title": "Qusay Kali",
    "hero.subtitle": "Cybersecurity Platform",
    "hero.description": "Explore the world of cybersecurity with tools, scripts, and educational guides",
    "hero.cta.tools": "Explore Tools",
    "hero.cta.guide": "Start Learning",
    
    // Features
    "features.title": "What We Offer",
    "features.tools.title": "Tools",
    "features.tools.desc": "Cybersecurity tools",
    "features.scripts.title": "Scripts",
    "features.scripts.desc": "Ready-to-use programming scripts",
    "features.guide.title": "Guide",
    "features.guide.desc": "Learn step by step with guides",
    "features.ai.title": "AI Assistant",
    "features.ai.desc": "Assistant to answer your questions",
    
    // CTA
    "cta.title": "Ready to Start?",
    "cta.description": "Join us and explore the world of cybersecurity",
    "cta.button": "Get Started",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.developer": "Developed by",
    
    // Common
    "common.search": "Search",
    "common.download": "Download",
    "common.copy": "Copy",
    "common.copied": "Copied",
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    
    // Tools Page
    "tools.title": "Tools",
    "tools.subtitle": "Cybersecurity tools collection",
    "tools.search": "Search for a tool...",
    "tools.categories.all": "All",
    "tools.categories.network": "Network",
    "tools.categories.security": "Security",
    "tools.categories.recon": "Reconnaissance",
    
    // Scripts Page
    "scripts.title": "Scripts",
    "scripts.subtitle": "Ready-to-use programming scripts",
    "scripts.search": "Search for a script...",
    
    // AI Page
    "ai.title": "AI Assistant",
    "ai.placeholder": "Type your message here...",
    "ai.send": "Send",
    
    // Theme
    "theme.select": "Select Theme",
    "theme.language": "Language",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.tools": "Herramientas",
    "nav.scripts": "Scripts",
    "nav.scanner": "Escáner",
    "nav.guide": "Guía",
    "nav.download": "Descargar",
    "nav.ai": "Asistente IA",
    "nav.webdev": "Desarrollo Web",
    "nav.password": "Verificador",
    "nav.inquiry": "Consultas",
    
    // Hero Section
    "hero.title": "Qusay Kali",
    "hero.subtitle": "Plataforma Completa de Ciberseguridad",
    "hero.description": "Explora el mundo de la ciberseguridad con herramientas, scripts y guías educativas completas",
    "hero.cta.tools": "Explorar Herramientas",
    "hero.cta.guide": "Comenzar a Aprender",
    
    // Features
    "features.title": "¿Qué Ofrecemos?",
    "features.tools.title": "Herramientas Profesionales",
    "features.tools.desc": "Conjunto completo de herramientas de ciberseguridad",
    "features.scripts.title": "Scripts Listos",
    "features.scripts.desc": "Scripts de programación listos para usar",
    "features.guide.title": "Guía Completa",
    "features.guide.desc": "Aprende paso a paso con guías detalladas",
    "features.ai.title": "Asistente IA",
    "features.ai.desc": "Asistente inteligente para responder tus preguntas",
    
    // CTA
    "cta.title": "¿Listo para Empezar?",
    "cta.description": "Únete a nosotros y explora el mundo de la ciberseguridad",
    "cta.button": "Comenzar Ahora",
    
    // Footer
    "footer.rights": "Todos los derechos reservados",
    "footer.developer": "Desarrollado por",
    
    // Common
    "common.search": "Buscar",
    "common.download": "Descargar",
    "common.copy": "Copiar",
    "common.copied": "Copiado",
    "common.loading": "Cargando...",
    "common.error": "Ocurrió un error",
    "common.back": "Atrás",
    "common.next": "Siguiente",
    "common.previous": "Anterior",
    
    // Tools Page
    "tools.title": "Herramientas",
    "tools.subtitle": "Colección profesional de herramientas de ciberseguridad",
    "tools.search": "Buscar herramienta...",
    "tools.categories.all": "Todas",
    "tools.categories.network": "Red",
    "tools.categories.security": "Seguridad",
    "tools.categories.recon": "Reconocimiento",
    
    // Scripts Page
    "scripts.title": "Scripts",
    "scripts.subtitle": "Scripts de programación listos para usar",
    "scripts.search": "Buscar script...",
    
    // AI Page
    "ai.title": "Asistente IA",
    "ai.placeholder": "Escribe tu mensaje aquí...",
    "ai.send": "Enviar",
    
    // Theme
    "theme.select": "Seleccionar Tema",
    "theme.language": "Idioma",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.tools": "工具",
    "nav.scripts": "脚本",
    "nav.scanner": "扫描器",
    "nav.guide": "指南",
    "nav.download": "下载",
    "nav.ai": "AI助手",
    "nav.webdev": "网页开发",
    "nav.password": "密码检测",
    "nav.inquiry": "咨询",
    
    // Hero Section
    "hero.title": "Qusay Kali",
    "hero.subtitle": "完整的网络安全平台",
    "hero.description": "通过全面的工具、脚本和教育指南探索网络安全世界",
    "hero.cta.tools": "探索工具",
    "hero.cta.guide": "开始学习",
    
    // Features
    "features.title": "我们提供什么？",
    "features.tools.title": "专业工具",
    "features.tools.desc": "完整的网络安全工具集",
    "features.scripts.title": "现成脚本",
    "features.scripts.desc": "即用型编程脚本",
    "features.guide.title": "全面指南",
    "features.guide.desc": "通过详细指南逐步学习",
    "features.ai.title": "AI助手",
    "features.ai.desc": "智能助手回答您的问题",
    
    // CTA
    "cta.title": "准备开始了吗？",
    "cta.description": "加入我们，探索网络安全世界",
    "cta.button": "立即开始",
    
    // Footer
    "footer.rights": "版权所有",
    "footer.developer": "开发者",
    
    // Common
    "common.search": "搜索",
    "common.download": "下载",
    "common.copy": "复制",
    "common.copied": "已复制",
    "common.loading": "加载中...",
    "common.error": "发生错误",
    "common.back": "返回",
    "common.next": "下一个",
    "common.previous": "上一个",
    
    // Tools Page
    "tools.title": "工具",
    "tools.subtitle": "专业网络安全工具集合",
    "tools.search": "搜索工具...",
    "tools.categories.all": "全部",
    "tools.categories.network": "网络",
    "tools.categories.security": "安全",
    "tools.categories.recon": "侦察",
    
    // Scripts Page
    "scripts.title": "脚本",
    "scripts.subtitle": "即用型编程脚本",
    "scripts.search": "搜索脚本...",
    
    // AI Page
    "ai.title": "AI助手",
    "ai.placeholder": "在此输入您的消息...",
    "ai.send": "发送",
    
    // Theme
    "theme.select": "选择主题",
    "theme.language": "语言",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.tools": "उपकरण",
    "nav.scripts": "स्क्रिप्ट्स",
    "nav.scanner": "स्कैनर",
    "nav.guide": "गाइड",
    "nav.download": "डाउनलोड",
    "nav.ai": "AI सहायक",
    "nav.webdev": "वेब विकास",
    "nav.password": "पासवर्ड जांच",
    "nav.inquiry": "पूछताछ",
    
    // Hero Section
    "hero.title": "Qusay Kali",
    "hero.subtitle": "संपूर्ण साइबर सुरक्षा प्लेटफ़ॉर्म",
    "hero.description": "व्यापक उपकरणों, स्क्रिप्ट्स और शैक्षिक गाइडों के साथ साइबर सुरक्षा की दुनिया का अन्वेषण करें",
    "hero.cta.tools": "उपकरण खोजें",
    "hero.cta.guide": "सीखना शुरू करें",
    
    // Features
    "features.title": "हम क्या प्रदान करते हैं?",
    "features.tools.title": "पेशेवर उपकरण",
    "features.tools.desc": "साइबर सुरक्षा उपकरणों का पूरा सेट",
    "features.scripts.title": "तैयार स्क्रिप्ट्स",
    "features.scripts.desc": "उपयोग के लिए तैयार प्रोग्रामिंग स्क्रिप्ट्स",
    "features.guide.title": "व्यापक गाइड",
    "features.guide.desc": "विस्तृत गाइडों के साथ कदम दर कदम सीखें",
    "features.ai.title": "AI सहायक",
    "features.ai.desc": "आपके सवालों का जवाब देने के लिए स्मार्ट सहायक",
    
    // CTA
    "cta.title": "शुरू करने के लिए तैयार?",
    "cta.description": "हमसे जुड़ें और साइबर सुरक्षा की दुनिया का अन्वेषण करें",
    "cta.button": "अभी शुरू करें",
    
    // Footer
    "footer.rights": "सर्वाधिकार सुरक्षित",
    "footer.developer": "द्वारा विकसित",
    
    // Common
    "common.search": "खोज",
    "common.download": "डाउनलोड",
    "common.copy": "कॉपी",
    "common.copied": "कॉपी किया गया",
    "common.loading": "लोड हो रहा है...",
    "common.error": "एक त्रुटि हुई",
    "common.back": "वापस",
    "common.next": "अगला",
    "common.previous": "पिछला",
    
    // Tools Page
    "tools.title": "उपकरण",
    "tools.subtitle": "पेशेवर साइबर सुरक्षा उपकरण संग्रह",
    "tools.search": "उपकरण खोजें...",
    "tools.categories.all": "सभी",
    "tools.categories.network": "नेटवर्क",
    "tools.categories.security": "सुरक्षा",
    "tools.categories.recon": "टोही",
    
    // Scripts Page
    "scripts.title": "स्क्रिप्ट्स",
    "scripts.subtitle": "उपयोग के लिए तैयार प्रोग्रामिंग स्क्रिप्ट्स",
    "scripts.search": "स्क्रिप्ट खोजें...",
    
    // AI Page
    "ai.title": "AI सहायक",
    "ai.placeholder": "अपना संदेश यहाँ लिखें...",
    "ai.send": "भेजें",
    
    // Theme
    "theme.select": "थीम चुनें",
    "theme.language": "भाषा",
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
    return (stored as Language) || "ar";
  });

  const currentLanguage = languages.find(l => l.id === language) || languages[0];

  useEffect(() => {
    const root = document.documentElement;
    root.dir = currentLanguage.dir;
    root.lang = language;
    localStorage.setItem("language", language);
    
    // Update body direction
    document.body.style.direction = currentLanguage.dir;
  }, [language, currentLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      dir: currentLanguage.dir,
      currentLanguage 
    }}>
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