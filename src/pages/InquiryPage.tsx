import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquirySection from "@/components/InquirySection";
import { Mail } from "lucide-react";

const InquiryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Mail className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              الاستفسارات
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              تواصل معنا وأرسل استفساراتك - نحن هنا لمساعدتك
            </p>
          </div>
          <InquirySection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InquiryPage;
