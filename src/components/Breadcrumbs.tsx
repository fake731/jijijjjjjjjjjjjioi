import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items?: Crumb[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  "/": "الرئيسية",
  "/الدليل": "الدليل",
  "/الادوات": "الأدوات",
  "/البرمجة": "البرمجة",
  "/السكربتات": "السكربتات",
  "/الذكاء": "الذكاء الاصطناعي",
  "/الاوامر": "الأوامر",
  "/تطوير-الويب": "تطوير الويب",
  "/فحص-كلمة-المرور": "فحص كلمة المرور",
  "/الاختبار": "الاختبار",
  "/الاستفسارات": "الاستفسارات",
  "/التحميل": "التحميل",
  "/سياسة-الخصوصية": "سياسة الخصوصية",
  "/تسجيل-الدخول": "تسجيل الدخول",
  "/لوحة-التحكم": "لوحة التحكم",
  "/الملف-الشخصي": "الملف الشخصي",
  "/المطور": "المطور",
};

export const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  const location = useLocation();
  const decodedPath = (() => {
    try { return decodeURIComponent(location.pathname); } catch { return location.pathname; }
  })();

  const generatedItems: Crumb[] = (() => {
    if (items) return items;
    const parts = decodedPath.split("/").filter(Boolean);
    const crumbs: Crumb[] = [{ label: "الرئيسية", path: "/" }];
    let built = "";
    parts.forEach((part) => {
      built += `/${part}`;
      crumbs.push({ label: routeLabels[built] || part, path: built });
    });
    return crumbs;
  })();

  if (generatedItems.length <= 1) return null;

  return (
    <nav
      dir="rtl"
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm text-muted-foreground flex-wrap ${className}`}
    >
      {generatedItems.map((crumb, idx) => {
        const isLast = idx === generatedItems.length - 1;
        return (
          <div key={idx} className="flex items-center gap-2">
            {idx === 0 ? (
              <Link
                to={crumb.path || "/"}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{crumb.label}</span>
              </Link>
            ) : isLast ? (
              <span className="text-foreground font-medium">{crumb.label}</span>
            ) : (
              <Link
                to={crumb.path || "#"}
                className="hover:text-primary transition-colors"
              >
                {crumb.label}
              </Link>
            )}
            {!isLast && <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground/50" />}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
