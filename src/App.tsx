import { Suspense, lazy } from "react";
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
import MagneticCursorGlow from "@/components/MagneticCursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTopFab from "@/components/ScrollToTopFab";
import ShootingStars from "@/components/ShootingStars";
import AuroraOverlay from "@/components/AuroraOverlay";
import LoginExportCard from "@/components/LoginExportCard";
import InlineContentEditor from "@/components/InlineContentEditor";
import InstagramFab from "@/components/InstagramFab";
import { SiteContentProvider } from "@/hooks/useSiteContent";
import { usePageVisit } from "@/hooks/usePageVisit";
import { useDeviceNotifications } from "@/hooks/useDeviceNotifications";
import PageSkeleton from "@/components/PageSkeleton";
import { useLowPowerDevice } from "@/hooks/useLowPowerDevice";
import { ReadingPrefsProvider } from "@/hooks/useReadingPrefs";
import ReadingTools from "@/components/ReadingTools";

// Eagerly-loaded routes: Home + NotFound stay in the main bundle so the LCP
// hero paints instantly. Everything else is code-split.
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const AIPage = lazy(() => import("./pages/AIPage"));
const AI2Page = lazy(() => import("./pages/AI2Page"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));
const ScannerPage = lazy(() => import("./pages/ScannerPage"));
const ScriptsPage = lazy(() => import("./pages/ScriptsPage"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const DownloadPage = lazy(() => import("./pages/DownloadPage"));
const WebDevPage = lazy(() => import("./pages/WebDevPage"));
const PasswordCheckerPage = lazy(() => import("./pages/PasswordCheckerPage"));
const InquiryPage = lazy(() => import("./pages/InquiryPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const DeveloperPage = lazy(() => import("./pages/DeveloperPage"));
const DevLoginPage = lazy(() => import("./pages/DevLoginPage"));
const UserDashboardPage = lazy(() => import("./pages/UserDashboardPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const ProgrammingPage = lazy(() => import("./pages/ProgrammingPage"));

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

const DeviceNotifications = () => {
  // Surfaces new in-DB notifications as native device notifications.
  useDeviceNotifications();
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <PageVisitTracker />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial="initial" animate="animate" exit="exit" variants={pageVariants}>
          <Suspense fallback={<PageSkeleton />}>
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
            <Route path="/البرمجة" element={<ProgrammingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const AppShell = () => {
  // Auto-disable heavy background effects on low-end devices / reduced motion.
  const lowPower = useLowPowerDevice();
  return (
    <TooltipProvider>
      <SpaceBackground />
      {!lowPower && <AuroraOverlay />}
      {!lowPower && <ShootingStars />}
      <CustomCursor />
      {!lowPower && <MagneticCursorGlow />}
      <ScrollProgress />
      <LoginExportCard />
      <InstagramFab />
      <ScrollToTopFab />
      {!lowPower && <div className="noise-overlay" aria-hidden />}
      {!lowPower && <div className="vignette-overlay" aria-hidden />}
      {!lowPower && <div className="scanlines-overlay" aria-hidden />}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <InlineContentEditor />
        <DeviceNotifications />
        <ReadingTools />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SiteContentProvider>
            <ReadingPrefsProvider>
              <AppShell />
            </ReadingPrefsProvider>
          </SiteContentProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
