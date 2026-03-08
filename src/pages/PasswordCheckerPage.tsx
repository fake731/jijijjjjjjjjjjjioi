import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";
import PasswordGenerator from "@/components/PasswordGenerator";
import { Lock } from "lucide-react";

const PasswordCheckerPage = () => {
  const [testPassword, setTestPassword] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="cyber-icon-box">
                <Lock className="w-10 h-10 text-amber-500" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4">
              اختبار قوة كلمة المرور
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              افحص مدى قوة كلمة مرورك واحصل على نصائح لتحسينها
            </p>
          </div>
          <div className="space-y-8">
            <PasswordStrengthChecker externalPassword={testPassword} />
            <PasswordGenerator onTestPassword={setTestPassword} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordCheckerPage;
