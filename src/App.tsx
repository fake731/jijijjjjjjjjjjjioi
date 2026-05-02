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
import SpaceBackground from "@/components/SpaceBackground";
import CustomCursor from "@/components/CustomCursor";
import LoginExportCard from "@/components/LoginExportCard";
import InlineContentEditor from "@/components/InlineContentEditor";
import { SiteContentProvider } from "@/hooks/useSiteContent";
import { usePageVisit } from "@/hooks/usePageVisit";
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
import DeveloperPage from "./pages/DeveloperPage";
import DevLoginPage from "./pages/DevLoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const PageVisitTracker = () => {
  // Tracks every page view for both guests and signed-in users, with IP geo data.
  usePageVisit();
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <PageVisitTracker />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial="initial" animate="animate" exit="exit" variants={pageVariants}>
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
            <Route path="/التحميل" element={<DownloadPage />} />
            <Route path="/تطوير-الويب" element={<WebDevPage />} />
            <Route path="/فحص-كلمة-المرور" element={<PasswordCheckerPage />} />
            <Route path="/الاستفسارات" element={<InquiryPage />} />
            <Route path="/سياسة-الخصوصية" element={<PrivacyPolicyPage />} />
            <Route path="/دخول-المطور" element={<DevLoginPage />} />
            <Route path="/المطور" element={<ProtectedRoute><DeveloperPage /></ProtectedRoute>} />
            <Route path="/لوحة-التحكم" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
            <Route path="/الاختبار" element={<QuizPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SiteContentProvider>
            <TooltipProvider>
              <SpaceBackground />
              <CustomCursor />
              <LoginExportCard />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <InlineContentEditor />
                <AnimatedRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </SiteContentProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
