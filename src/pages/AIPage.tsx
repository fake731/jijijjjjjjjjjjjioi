import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Lock, MessageSquare } from "lucide-react";

const AIPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Brain className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              الذكاء الاصطناعي
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              AI متقدم متخصص في الأمن السيبراني يجيب على جميع استفساراتك
            </p>
          </div>

          {/* Chat Interface Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="cyber-card p-8 text-center">
              <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-primary mb-4">كلمة السر مطلوبة</h2>
              <p className="text-muted-foreground mb-6">
                للوصول إلى الذكاء الاصطناعي، يرجى إدخال كلمة السر الموجودة في الانستغرام
              </p>
              <input
                type="password"
                placeholder="أدخل كلمة السر..."
                className="w-full max-w-md px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIPage;
