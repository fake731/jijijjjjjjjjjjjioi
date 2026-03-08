import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.guide"), path: "/الدليل" },
    { label: t("nav.tools"), path: "/الادوات" },
    { label: t("nav.scripts"), path: "/السكربتات" },
    { label: t("nav.ai"), path: "/الذكاء" },
    { label: t("nav.scanner"), path: "/الاوامر" },
    { label: t("nav.webdev"), path: "/تطوير-الويب" },
    { label: t("nav.password"), path: "/فحص-كلمة-المرور" },
    { label: t("nav.inquiry"), path: "/الاستفسارات" },
    { label: t("nav.download"), path: "/التحميل" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:box-glow transition-all duration-300">
              <span className="text-primary font-bold text-xl">Q</span>
            </div>
            <span className="text-primary font-bold text-xl text-glow-sm">Qusay_kali</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  location.pathname === item.path
                    ? "nav-link-active"
                    : "nav-link"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </button>
            ) : (
              <Link
                to="/تسجيل-الدخول"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                دخول
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {user ? (
              <button
                onClick={signOut}
                className="w-10 h-10 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center justify-center"
              >
                <LogOut className="w-4 h-4 text-destructive" />
              </button>
            ) : (
              <Link
                to="/تسجيل-الدخول"
                className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center"
              >
                <LogIn className="w-4 h-4 text-primary" />
              </Link>
            )}
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={
                    location.pathname === item.path
                      ? "nav-link-active text-center"
                      : "nav-link text-center"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;