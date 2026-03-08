import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, User, Calendar, Shield, Globe, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "verify">("login");
  const [signupData, setSignupData] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
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
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const { data: loginData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Check if user is a developer
        if (loginData.user) {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", loginData.user.id)
            .eq("role", "developer")
            .maybeSingle();
          
          if (roleData) {
            toast.success("مرحباً بك أيها المطور!");
            navigate("/المطور");
            return;
          }
        }
        
        toast.success("تم تسجيل الدخول بنجاح!");
        navigate("/");
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/إعادة-كلمة-المرور`,
        });
        if (error) throw error;
        toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
        setMode("login");
      } else {
        // Signup
        if (!privacyAccepted) {
          toast.error("يجب الموافقة على سياسة الخصوصية للمتابعة");
          setLoading(false);
          return;
        }
        if (!displayName.trim()) {
          toast.error("يرجى إدخال الاسم");
          setLoading(false);
          return;
        }
        if (!age || parseInt(age) < 1 || parseInt(age) > 120) {
          toast.error("يرجى إدخال عمر صحيح");
          setLoading(false);
          return;
        }

        if (!country.trim()) {
          toast.error("يرجى إدخال البلد");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: displayName.trim(),
            },
          },
        });
        if (error) throw error;

        // Store signup data for after verification
        setSignupData({
          userId: data.user?.id,
          displayName: displayName.trim(),
          age: parseInt(age),
          country: country.trim(),
          city: city.trim() || null,
          phone: phone.trim() || null,
        });

        toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني");
        setMode("verify");
      }
    } catch (error: any) {
      const msg = error.message || "حدث خطأ";
      if (msg.includes("already registered") || msg.includes("already been registered")) {
        toast.error("هذا البريد الإلكتروني مسجل مسبقاً. جرب تسجيل الدخول بدلاً من ذلك.");
        setMode("login");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (mode === "forgot") return "نسيت كلمة المرور";
    if (mode === "signup") return "إنشاء حساب";
    return "تسجيل الدخول";
  };

  const getDescription = () => {
    if (mode === "forgot") return "أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور";
    if (mode === "signup") return "أنشئ حسابك الجديد للوصول لجميع الميزات";
    return "أدخل بياناتك لتسجيل الدخول";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-20 pb-10 px-4">
        <Card className="w-full max-w-md border-border/30 bg-card/80 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mb-2">
              <span className="text-primary font-bold text-3xl">Q</span>
            </div>
            <CardTitle className="text-2xl text-foreground">{getTitle()}</CardTitle>
            <CardDescription className="text-muted-foreground">{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name - signup only */}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-foreground">الاسم</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="أدخل اسمك"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50"
                      required
                      dir="auto"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Age - signup only */}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-foreground">العمر</Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="age"
                      type="number"
                      placeholder="أدخل عمرك"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50"
                      required
                      min={1}
                      max={120}
                      dir="ltr"
                    />
                  </div>
                </div>
              )}

              {/* Country - signup only */}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-foreground">البلد</Label>
                  <div className="relative">
                    <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="country"
                      type="text"
                      placeholder="مثال: فلسطين"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50"
                      required
                      dir="auto"
                    />
                  </div>
                </div>
              )}

              {/* City - signup only (optional) */}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-foreground">المدينة <span className="text-muted-foreground text-xs">(اختياري)</span></Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="city"
                      type="text"
                      placeholder="مثال: غزة"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50"
                      dir="auto"
                    />
                  </div>
                </div>
              )}

              {/* Phone - signup only (optional) */}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">رقم الهاتف <span className="text-muted-foreground text-xs">(اختياري)</span></Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+970..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50"
                      dir="ltr"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              {mode !== "forgot" && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
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
              )}

              {/* Privacy Policy - signup only */}
              {mode === "signup" && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/20">
                  <Checkbox
                    id="privacy"
                    checked={privacyAccepted}
                    onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    أوافق على <Link to="/سياسة-الخصوصية" target="_blank" className="text-primary font-medium hover:underline">سياسة الخصوصية</Link> وأسمح بإرسال معلوماتي (الاسم، البريد الإلكتروني، العمر) إلى مدير الموقع لأغراض إدارية وأمنية.
                  </label>
                </div>
              )}

              {/* Forgot password link */}
              {mode === "login" && (
                <div className="text-left">
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    هل نسيت كلمة المرور؟
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full h-12 gap-2" disabled={loading || (mode === "signup" && !privacyAccepted)}>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : mode === "forgot" ? (
                  "إرسال رابط الاستعادة"
                ) : mode === "login" ? (
                  <>
                    <LogIn className="h-4 w-4" />
                    تسجيل الدخول
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    إنشاء حساب
                  </>
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              {mode === "forgot" ? (
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  العودة لتسجيل الدخول
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {mode === "login" ? "ليس لديك حساب؟ إنشاء حساب جديد" : "لديك حساب؟ تسجيل الدخول"}
                </button>
              )}
            </div>

            {/* Developer Login Link */}
            {mode === "login" && (
              <div className="pt-4 border-t border-border/20">
                <Link
                  to="/دخول-المطور"
                  className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 hover:text-primary/80 transition-colors"
                >
                  <Shield className="w-3 h-3" />
                  دخول للمطورين
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
