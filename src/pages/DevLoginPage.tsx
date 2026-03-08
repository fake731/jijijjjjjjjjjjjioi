import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock, Shield, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const ALLOWED_DEV_EMAILS = [
  "faketeam39@gmail.com",
  "qusaysawalhy39@gmail.com",
  "sawalhy007@gmail.com",
];

const DevLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/المطور" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check email before even trying to sign in
    if (!ALLOWED_DEV_EMAILS.includes(email.trim().toLowerCase())) {
      toast.error("هذا البريد غير مصرح له بالدخول كمطور");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data.user) {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "developer")
          .maybeSingle();

        if (roleData) {
          toast.success("مرحباً بك أيها المطور!");
          navigate("/المطور");
        } else {
          await supabase.auth.signOut();
          toast.error("هذا الحساب غير مصرح له بالدخول كمطور");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-20 pb-10 px-4">
        <Card className="w-full max-w-md border-primary/20 bg-card/80 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mb-2">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">دخول المطورين</CardTitle>
            <CardDescription className="text-muted-foreground">هذه الصفحة مخصصة للمطورين المصرح لهم فقط</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dev-email" className="text-foreground">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dev-email"
                    type="email"
                    placeholder="developer@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dev-password" className="text-foreground">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dev-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50"
                    required
                    dir="ltr"
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 gap-2" disabled={loading}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    دخول كمطور
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default DevLoginPage;
