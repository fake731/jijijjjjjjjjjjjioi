import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Construction } from "lucide-react";

const GuidePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <BookOpen className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              الدليل الكامل
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              الدليل الكامل للأمن السيبراني
            </p>
          </div>

          {/* Under Construction */}
          <div className="max-w-2xl mx-auto">
            <div className="cyber-card p-12 text-center">
              <Construction className="w-20 h-20 text-primary mx-auto mb-6 animate-float" />
              <h2 className="text-2xl font-bold text-primary mb-4">تحت الإنشاء</h2>
              <p className="text-muted-foreground">
                نعمل حالياً على إعداد دليل شامل للأمن السيبراني. ترقبوا المحتوى قريباً!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuidePage;
