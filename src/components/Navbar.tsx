import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "الرئيسية", path: "/" },
  { label: "الدليل الكامل", path: "/guide" },
  { label: "ادوات كالي", path: "/tools" },
  { label: "السكربتات", path: "/scripts" },
  { label: "الذكاء الاصطناعي", path: "/ai" },
  { label: "مكتشف الثغرات", path: "/scanner" },
  { label: "تنزيل كالي", path: "/download" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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

          {/* Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
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