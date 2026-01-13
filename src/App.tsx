import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import AIPage from "./pages/AIPage";
import AI2Page from "./pages/AI2Page";
import ToolsPage from "./pages/ToolsPage";
import ScannerPage from "./pages/ScannerPage";
import ScriptsPage from "./pages/ScriptsPage";
import GuidePage from "./pages/GuidePage";
import DownloadPage from "./pages/DownloadPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/ai2" element={<AI2Page />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/scripts" element={<ScriptsPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
