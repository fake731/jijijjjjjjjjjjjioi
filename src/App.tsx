import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";
import { AuthProvider } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AIPage from "./pages/AIPage";
import AI2Page from "./pages/AI2Page";
import ToolsPage from "./pages/ToolsPage";
import ScannerPage from "./pages/ScannerPage";
import ScriptsPage from "./pages/ScriptsPage";
import GuidePage from "./pages/GuidePage";
import DownloadPage from "./pages/DownloadPage";
import WebDevPage from "./pages/WebDevPage";
import PasswordCheckerPage from "./pages/PasswordCheckerPage";
import InquiryPage from "./pages/InquiryPage";
import AuthPage from "./pages/AuthPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.25,
      ease: "easeIn" as const,
    },
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/تسجيل-الدخول" element={<AuthPage />} />
          <Route path="/إعادة-كلمة-المرور" element={<ResetPasswordPage />} />
          <Route path="/الملف-الشخصي" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/الذكاء" element={<AIPage />} />
          <Route path="/الذكاء2" element={<AI2Page />} />
          <Route path="/الادوات" element={<ToolsPage />} />
          <Route path="/الاوامر" element={<ScannerPage />} />
          <Route path="/السكربتات" element={<ScriptsPage />} />
          <Route path="/الدليل" element={<GuidePage />} />
          <Route path="/التحميل" element={<ProtectedRoute><DownloadPage /></ProtectedRoute>} />
          <Route path="/تطوير-الويب" element={<WebDevPage />} />
          <Route path="/فحص-كلمة-المرور" element={<PasswordCheckerPage />} />
          <Route path="/الاستفسارات" element={<InquiryPage />} />
          <Route path="/سياسة-الخصوصية" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
