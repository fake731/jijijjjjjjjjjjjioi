import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, User, Shield, Globe, Phone, ArrowRight, Loader2, KeyRound, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "otp" | "new-password">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [geoDetecting, setGeoDetecting] = useState(false);
  const [detectedIp, setDetectedIp] = useState("");
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // OTP state
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotFullName, setForgotFullName] = useState("");

  // New password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // OTP timer countdown
  useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const getDeviceType = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (/tablet|ipad/.test(ua)) return "تابلت";
    if (/mobile|android|iphone/.test(ua)) return "موبايل";
    return "كمبيوتر";
  };

  useEffect(() => {
    if (mode !== "signup") return;
    const detectGeo = async () => {
      setGeoDetecting(true);
      try {
        const res = await fetch("http://ip-api.com/json/?fields=country,city,query&lang=ar");
        if (!res.ok) throw new Error("Geo API failed");
        const data = await res.json();
        if (data.country && !country) setCountry(data.country);
        if (data.query) setDetectedIp(data.query);
      } catch { /* silent */ } finally { setGeoDetecting(false); }
    };
    detectGeo();
  }, [mode]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  const normalizeText = (value: unknown) => {
    if (typeof value !== "string") return null;
    const cleaned = value.trim();
    return cleaned.length ? cleaned : null;
  };

  const syncProfileFromMetadata = async (authUser: SupabaseUser) => {
    const metadata = authUser.user_metadata || {};
    const updates: Record<string, unknown> = {
      display_name: normalizeText(metadata.full_name),
      country: normalizeText(metadata.country),
      phone: normalizeText(metadata.phone),
      device_type: normalizeText(metadata.device_type) || getDeviceType(),
      ip_address: normalizeText(metadata.ip_address),
      privacy_accepted: metadata.privacy_accepted === true,
      privacy_accepted_at: metadata.privacy_accepted_at ? new Date(metadata.privacy_accepted_at).toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: authUser.id, email: authUser.email || null, ...updates } as any, { onConflict: "id" });
    if (error) throw error;
  };

  const handleForgotSubmit = async () => {
    if (!forgotEmail.trim() || !forgotFullName.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني والاسم الرباعي");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/password-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ action: "request", email: forgotEmail.trim(), full_name: forgotFullName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "حدث خطأ");

      setGeneratedOtp(data.otp);
      setOtpTimer(60);
      setOtpAttempts(0);
      setOtpCode("");
      setMode("otp");
      toast.success("تم توليد كود التحقق");
    } catch (err: any) {
      toast.error(err.message || "البيانات غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) return;
    await handleForgotSubmit();
  };

  const handleVerifyOtp = async () => {
    if (otpCode.length !== 6) {
      toast.error("يرجى إدخال الكود كاملاً");
      return;
    }
    if (otpAttempts >= 5) {
      toast.error("تم تجاوز الحد الأقصى للمحاولات");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/password-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ action: "verify", email: forgotEmail.trim(), otp: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOtpAttempts(prev => prev + 1);
        throw new Error(data.error || "الكود غير صحيح");
      }
      setMode("new-password");
      toast.success("تم التحقق بنجاح!");
    } catch (err: any) {
      toast.error(err.message || "البيانات غير صحيحة أو الكود غير صالح");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/password-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ action: "reset", email: forgotEmail.trim(), new_password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "حدث خطأ");

      // Auto login
      const { error } = await supabase.auth.signInWithPassword({ email: forgotEmail.trim(), password: newPassword });
      if (error) {
        toast.success("تم تحديث كلمة المرور! سجّل دخول الآن.");
        setMode("login");
      } else {
        toast.success("تم تحديث كلمة المرور وتسجيل الدخول بنجاح!");
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const { data: loginData, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (loginData.user) {
          await syncProfileFromMetadata(loginData.user);
          const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", loginData.user.id).eq("role", "developer").maybeSingle();
          if (roleData) { toast.success("مرحباً بك أيها المطور!"); navigate("/المطور"); return; }
        }
        toast.success("تم تسجيل الدخول بنجاح!");
        navigate("/");
      } else if (mode === "signup") {
        if (!privacyAccepted) { toast.error("يجب الموافقة على سياسة الخصوصية للمتابعة"); setLoading(false); return; }
        if (!fullName.trim()) { toast.error("يرجى إدخال الاسم الرباعي"); setLoading(false); return; }
        const deviceType = getDeviceType();
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: fullName.trim(), country: country.trim() || null, phone: phone.trim() || null,
              device_type: deviceType, ip_address: detectedIp || null,
              privacy_accepted: true, privacy_accepted_at: new Date().toISOString(),
            },
          },
        });
        if (error) throw error;
        const isExistingUser = !!data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0;
        if (isExistingUser) { toast.error("هذا البريد مسجل مسبقاً. سجّل دخول أو استخدم نسيت كلمة المرور."); setMode("login"); return; }
        if (!data.user?.id) { toast.error("تعذر إنشاء الحساب حالياً."); return; }
        if (data.session?.user) { await syncProfileFromMetadata(data.session.user); toast.success("تم إنشاء الحساب بنجاح!"); navigate("/"); return; }
        toast.success("تم إنشاء الحساب بنجاح! سجّل دخول الآن.");
        setMode("login");
      }
    } catch (error: any) {
      const msg = error.message || "حدث خطأ";
      if (msg.includes("already registered")) { toast.error("هذا البريد مسجل مسبقاً."); setMode("login"); }
      else toast.error(msg);
    } finally { setLoading(false); }
  };

  const getTitle = () => {
    if (mode === "new-password") return "تعيين كلمة مرور جديدة";
    if (mode === "otp") return "التحقق من الكود";
    if (mode === "forgot") return "استعادة كلمة المرور";
    if (mode === "signup") return "إنشاء حساب";
    return "تسجيل الدخول";
  };

  const getDescription = () => {
    if (mode === "new-password") return "أدخل كلمة المرور الجديدة";
    if (mode === "otp") return "أدخل كود التحقق المكون من 6 أرقام";
    if (mode === "forgot") return "أدخل بريدك الإلكتروني واسمك الرباعي";
    if (mode === "signup") return "أنشئ حسابك للوصول لجميع الميزات";
    return "أدخل بياناتك لتسجيل الدخول";
  };

  return (
    <div className="min-h-screen bg-background relative z-10">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen pt-20 pb-10 px-4">
        <Card className="w-full max-w-md border-border/30 bg-card/80 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mb-2">
              {mode === "otp" ? <KeyRound className="w-8 h-8 text-primary" /> :
               mode === "new-password" ? <Lock className="w-8 h-8 text-primary" /> :
               <span className="text-primary font-bold text-3xl">Q</span>}
            </div>
            <CardTitle className="text-2xl text-foreground">{getTitle()}</CardTitle>
            <CardDescription className="text-muted-foreground">{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OTP Verification */}
            {mode === "otp" && (
              <div className="space-y-6">
                <div className="bg-secondary/30 rounded-xl p-4 text-center space-y-3">
                  <p className="text-sm text-foreground font-medium">كود التحقق الخاص بك:</p>
                  <div className="text-4xl font-mono font-bold text-primary tracking-[0.5em] select-all cursor-pointer" onClick={() => { navigator.clipboard.writeText(generatedOtp); toast.success("تم نسخ الكود!"); }}>
                    {generatedOtp}
                  </div>
                  <p className="text-xs text-muted-foreground">اضغط على الكود لنسخه</p>
                </div>

                <div className="flex justify-center" dir="ltr">
                  <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    المحاولات: {otpAttempts}/5
                  </span>
                  <span className={`font-mono ${otpTimer <= 10 ? "text-destructive" : "text-muted-foreground"}`}>
                    {otpTimer > 0 ? `${otpTimer} ثانية` : "انتهى الوقت"}
                  </span>
                </div>

                <Button onClick={handleVerifyOtp} disabled={loading || otpCode.length !== 6 || otpAttempts >= 5} className="w-full h-12 gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  تحقق من الكود
                </Button>

                {otpTimer === 0 && (
                  <Button variant="outline" onClick={handleResendOtp} disabled={loading} className="w-full">
                    إعادة إرسال الكود
                  </Button>
                )}

                <button type="button" onClick={() => setMode("forgot")} className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  العودة
                </button>
              </div>
            )}

            {/* New Password */}
            {mode === "new-password" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">كلمة المرور الجديدة</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pr-10 pl-10 bg-secondary/30 border-border/30 text-foreground" required dir="ltr" minLength={6} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-3 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground" required dir="ltr" minLength={6} />
                  </div>
                </div>
                <Button onClick={handleResetPassword} disabled={loading} className="w-full h-12 gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "تحديث كلمة المرور"}
                </Button>
              </div>
            )}

            {/* Forgot Password */}
            {mode === "forgot" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground" placeholder="example@email.com" dir="ltr" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">الاسم الرباعي</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input type="text" value={forgotFullName} onChange={(e) => setForgotFullName(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground" placeholder="محمد أحمد علي حسن" dir="auto" />
                  </div>
                </div>
                <Button onClick={handleForgotSubmit} disabled={loading} className="w-full h-12 gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "التحقق وإرسال الكود"}
                </Button>
                <button type="button" onClick={() => setMode("login")} className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  العودة لتسجيل الدخول
                </button>
              </div>
            )}

            {/* Login / Signup */}
            {(mode === "login" || mode === "signup") && (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground">الاسم الرباعي</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="fullName" type="text" placeholder="محمد أحمد علي حسن" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" required dir="auto" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" required dir="ltr" />
                    </div>
                  </div>

                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">رقم الهاتف</Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+970..." value={phone} onChange={(e) => setPhone(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" dir="ltr" />
                      </div>
                    </div>
                  )}

                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-foreground flex items-center gap-2">
                        البلد {geoDetecting && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
                      </Label>
                      <div className="relative">
                        <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="country" type="text" placeholder={geoDetecting ? "جارٍ الكشف..." : "مثال: فلسطين"} value={country} onChange={(e) => setCountry(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" dir="auto" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10 pl-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" required dir="ltr" minLength={6} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-3 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {mode === "signup" && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/20">
                      <Checkbox id="privacy" checked={privacyAccepted} onCheckedChange={(checked) => setPrivacyAccepted(checked === true)} className="mt-0.5" />
                      <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        أوافق على <Link to="/سياسة-الخصوصية" target="_blank" className="text-primary font-medium hover:underline">سياسة الخصوصية</Link> وأسمح بإرسال معلوماتي إلى مدير الموقع لأغراض إدارية وأمنية.
                      </label>
                    </div>
                  )}

                  {mode === "login" && (
                    <div className="text-left">
                      <button type="button" onClick={() => setMode("forgot")} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                        هل نسيت كلمة المرور؟
                      </button>
                    </div>
                  )}

                  <Button type="submit" className="w-full h-12 gap-2" disabled={loading || (mode === "signup" && !privacyAccepted)}>
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : mode === "login" ? (
                      <><LogIn className="h-4 w-4" /> تسجيل الدخول</>
                    ) : (
                      <><UserPlus className="h-4 w-4" /> إنشاء حساب</>
                    )}
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {mode === "login" ? "ليس لديك حساب؟ إنشاء حساب جديد" : "لديك حساب؟ تسجيل الدخول"}
                  </button>
                </div>

                {mode === "login" && (
                  <div className="pt-4 border-t border-border/20">
                    <Link to="/دخول-المطور" className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 hover:text-primary/80 transition-colors">
                      <Shield className="w-3 h-3" />
                      دخول المطور
                    </Link>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
