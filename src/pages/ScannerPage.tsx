import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bug, Search, AlertTriangle } from "lucide-react";
import { useState } from "react";

const ScannerPage = () => {
  const [url, setUrl] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Bug className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              مكتشف الثغرات
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              أداة فحص الثغرات الأمنية تجريبة
            </p>
          </div>

          {/* Scanner Interface */}
          <div className="max-w-3xl mx-auto">
            <div className="cyber-card p-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="أدخل رابط الموقع للفحص..."
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-right"
                />
                <button className="cyber-button-primary flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  فحص
                </button>
              </div>

              {/* Warning Notice */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-destructive mb-1">تنبيه مهم</h4>
                  <p className="text-muted-foreground text-sm">
                    هذه الأداة للأغراض التعليمية فقط. استخدم هذه الأداة فقط على المواقع التي تملك إذناً لفحصها.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ScannerPage;
