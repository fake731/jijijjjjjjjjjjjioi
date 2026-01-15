import { useState, ReactNode } from "react";
import { Sidebar, MobileSidebar, MobileSidebarButton } from "./Sidebar";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";

interface ToolsLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export const ToolsLayout = ({ children, showSidebar = false }: ToolsLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { language } = useLanguage();

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Mobile Sidebar Button */}
      <MobileSidebarButton onClick={() => setMobileSidebarOpen(true)} />

      {/* Main Content */}
      <motion.div
        animate={{
          marginRight: sidebarOpen ? 200 : 64,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden md:block"
        style={{ direction: language === "ar" ? "rtl" : "ltr" }}
      >
        {children}
      </motion.div>

      {/* Mobile Content */}
      <div className="md:hidden">{children}</div>
    </div>
  );
};

export default ToolsLayout;
