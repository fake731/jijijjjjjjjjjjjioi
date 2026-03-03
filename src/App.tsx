import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import AIPage from "./pages/AIPage";
import AI2Page from "./pages/AI2Page";
import ToolsPage from "./pages/ToolsPage";
import ScannerPage from "./pages/ScannerPage";
import ScriptsPage from "./pages/ScriptsPage";
import GuidePage from "./pages/GuidePage";
import DownloadPage from "./pages/DownloadPage";
import WebDevPage from "./pages/WebDevPage";
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
          <Route path="/ai" element={<AIPage />} />
          <Route path="/ai2" element={<AI2Page />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/scripts" element={<ScriptsPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/webdev" element={<WebDevPage />} />
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
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
