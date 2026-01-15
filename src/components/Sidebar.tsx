import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Terminal,
  MessageSquare,
  Scan,
  Code,
  BookOpen,
  Download,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface NavItem {
  path: string;
  icon: React.ElementType;
  labelKey: string;
}

const navItems: NavItem[] = [
  { path: "/", icon: Home, labelKey: "home" },
  { path: "/tools", icon: Terminal, labelKey: "tools" },
  { path: "/ai", icon: MessageSquare, labelKey: "ai" },
  { path: "/scanner", icon: Scan, labelKey: "scanner" },
  { path: "/scripts", icon: Code, labelKey: "scripts" },
  { path: "/guide", icon: BookOpen, labelKey: "guide" },
  { path: "/download", icon: Download, labelKey: "download" },
];

const navLabels: Record<string, { ar: string; en: string }> = {
  home: { ar: "الرئيسية", en: "Home" },
  tools: { ar: "الأدوات", en: "Tools" },
  ai: { ar: "المساعد", en: "AI" },
  scanner: { ar: "الماسح", en: "Scanner" },
  scripts: { ar: "السكربتات", en: "Scripts" },
  guide: { ar: "الدليل", en: "Guide" },
  download: { ar: "التحميل", en: "Download" },
};

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { language } = useLanguage();

  const sidebarVariants = {
    open: {
      width: 200,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    closed: {
      width: 64,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  const linkVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 },
    },
    closed: {
      opacity: 0,
      x: language === "ar" ? 10 : -10,
    },
  };

  return (
    <motion.aside
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="fixed top-20 right-0 h-[calc(100vh-5rem)] bg-card/95 backdrop-blur-xl border-l border-border/50 z-40 overflow-hidden flex flex-col"
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute top-4 left-2 p-2 rounded-lg bg-secondary hover:bg-primary/20 transition-colors"
      >
        {isOpen ? (
          <ChevronRight className="w-4 h-4 text-primary" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-primary" />
        )}
      </button>

      {/* Nav Items */}
      <nav className="flex-1 pt-16 px-2 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const label = navLabels[item.labelKey]?.[language] || item.labelKey;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {isOpen && (
                  <motion.span
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={linkVariants}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};

// Mobile Sidebar Button
export const MobileSidebarButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform md:hidden"
  >
    <Menu className="w-6 h-6" />
  </button>
);

// Mobile Sidebar Overlay
export const MobileSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const location = useLocation();
  const { language } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
          />
          {/* Sidebar */}
          <motion.aside
            initial={{ x: language === "ar" ? 300 : -300 }}
            animate={{ x: 0 }}
            exit={{ x: language === "ar" ? 300 : -300 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 h-full w-64 bg-card border-l border-border/50 z-50 md:hidden"
            style={{ direction: language === "ar" ? "rtl" : "ltr" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-lg hover:bg-primary/20 transition-colors"
            >
              <X className="w-5 h-5 text-primary" />
            </button>

            {/* Nav Items */}
            <nav className="pt-20 px-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                const label =
                  navLabels[item.labelKey]?.[language] || item.labelKey;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
