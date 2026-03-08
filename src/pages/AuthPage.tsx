import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, User, Calendar, Shield, Globe, MapPin, Phone, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "email-sent" | "reset-sent">("login");
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
  const [geoDetecting, setGeoDetecting] = useState(false);
  const [geoDetected, setGeoDetected] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Detect device type from user agent
  const getDeviceType = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (/tablet|ipad/.test(ua)) return "تابلت";
    if (/mobile|android|iphone/.test(ua)) return "موبايل";
    return "كمبيوتر";
  };

  // Auto-detect country/city from IP when switching to signup mode
  useEffect(() => {
    if (mode !== "signup" || geoDetected) return;
    const detectGeo = async () => {
      setGeoDetecting(true);
      try {
        const res = await fetch("http://ip-api.com/json/?fields=country,city&lang=ar");
        if (!res.ok) throw new Error("Geo API failed");
        const data = await res.json();
        if (data.country && !country) setCountry(data.country);
        if (data.city && !city) setCity(data.city);
        setGeoDetected(true);
      } catch {
        // Silently fail - user can still enter manually
      } finally {
        setGeoDetecting(false);
      }
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

  if (user) {
    return <Navigate to="/" replace />;
  }

  const normalizeText = (value: unknown) => {
    if (typeof value !== "string") return null;
    const cleaned = value.trim();
    return cleaned.length ? cleaned : null;
  };

  const syncProfileFromMetadata = async (authUser: SupabaseUser) => {
    const metadata = authUser.user_metadata || {};
    const parsedAge = Number(metadata.age);

    const updates: Record<string, unknown> = {
      display_name: normalizeText(metadata.full_name),
      age: Number.isFinite(parsedAge) && parsedAge > 0 && parsedAge <= 120 ? parsedAge : null,
      country: normalizeText(metadata.country),
      city: normalizeText(metadata.city),
      phone: normalizeText(metadata.phone),
      device_type: normalizeText(metadata.device_type) || getDeviceType(),
      privacy_accepted: metadata.privacy_accepted === true,
      privacy_accepted_at: metadata.privacy_accepted_at ? new Date(metadata.privacy_accepted_at).toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: authUser.id, email: authUser.email || null, ...updates } as any, { onConflict: "id" });

    if (error) throw error;
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
        // Use published URL so the reset link opens the real site, not Lovable preview
        const siteOrigin = "https://jijijjjjjjjjjjjioi.lovable.app";
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${siteOrigin}/إعادة-كلمة-المرور`,
        });
        if (error) throw error;
        setMode("reset-sent");
      } else if (mode === "signup") {
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

        const deviceType = getDeviceType();

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: displayName.trim(),
              age: parseInt(age),
              country: country.trim(),
              city: city.trim() || null,
              phone: phone.trim() || null,
              device_type: deviceType,
              privacy_accepted: true,
              privacy_accepted_at: new Date().toISOString(),
            },
          },
        });
        if (error) throw error;

        const isExistingUser = !!data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0;
        if (isExistingUser) {
          toast.error("هذا البريد الإلكتروني مسجل مسبقاً. سجّل دخول مباشرة أو استخدم نسيت كلمة المرور.");
          setMode("login");
          return;
        }

        if (!data.user?.id) {
          toast.error("تعذر إنشاء الحساب حالياً، حاول مرة أخرى.");
          return;
        }

        if (data.session?.user) {
          await syncProfileFromMetadata(data.session.user);
          toast.success("تم إنشاء الحساب بنجاح!");
          navigate("/");
          return;
        }

        toast.success("تم إنشاء الحساب بنجاح! سجّل دخول الآن.");
        setMode("login");
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
    if (mode === "email-sent") return "تحقق من بريدك الإلكتروني";
    if (mode === "reset-sent") return "تحقق من بريدك الإلكتروني";
    if (mode === "forgot") return "نسيت كلمة المرور";
    if (mode === "signup") return "إنشاء حساب";
    return "تسجيل الدخول";
  };

  const getDescription = () => {
    if (mode === "email-sent") return "تم إرسال رابط التأكيد إلى بريدك الإلكتروني";
    if (mode === "reset-sent") return "تم إرسال رابط إعادة تعيين كلمة المرور";
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
            {mode === "reset-sent" ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                    <Mail className="w-10 h-10 text-primary" />
                  </div>
                </div>

                <div className="bg-secondary/30 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-foreground text-center">خطوات إعادة تعيين كلمة المرور:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-bold text-xs">1</span>
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">افتح بريدك الإلكتروني</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-bold text-xs">2</span>
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">اضغط على الرابط في الرسالة</p>
                        <p className="text-xs text-muted-foreground">تحقق من صندوق الوارد أو مجلد Spam</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">أدخل كلمة المرور الجديدة</p>
                        <p className="text-xs text-muted-foreground">سيتم توجيهك تلقائياً لصفحة إعادة التعيين</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={() => setMode("login")} className="w-full h-12 gap-2">
                  <ArrowRight className="w-4 h-4" />
                  العودة لتسجيل الدخول
                </Button>

                <p className="text-xs text-center text-muted-foreground/60">
                  لم يصلك الإيميل؟ تحقق من مجلد Spam أو حاول مرة أخرى
                </p>
              </div>
            ) : mode === "email-sent" ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center">
                    <Mail className="w-10 h-10 text-green-500" />
                  </div>
                </div>

                <div className="bg-secondary/30 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-foreground text-center">خطوات تفعيل حسابك:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-bold text-xs">1</span>
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">افتح بريدك الإلكتروني</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-bold text-xs">2</span>
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">ابحث عن رسالة التأكيد</p>
                        <p className="text-xs text-muted-foreground">تحقق من صندوق الوارد أو مجلد الرسائل غير المرغوبة (Spam)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary font-bold text-xs">3</span>
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">اضغط على زر "Confirm your mail" أو "Verify Email"</p>
                        <p className="text-xs text-muted-foreground">سيتم تفعيل حسابك تلقائياً</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-medium">ارجع هنا وسجّل دخول</p>
                        <p className="text-xs text-muted-foreground">بعد التأكيد، استخدم إيميلك وكلمة المرور لتسجيل الدخول</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setMode("login")}
                  className="w-full h-12 gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  الذهاب لتسجيل الدخول
                </Button>

                <p className="text-xs text-center text-muted-foreground/60">
                  لم يصلك الإيميل؟ تحقق من مجلد Spam أو أعد التسجيل بعد دقائق
                </p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="displayName" className="text-foreground">الاسم</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="displayName" type="text" placeholder="أدخل اسمك" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" required dir="auto" />
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
                      <Label htmlFor="age" className="text-foreground">العمر</Label>
                      <div className="relative">
                        <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="age" type="number" placeholder="أدخل عمرك" value={age} onChange={(e) => setAge(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" required min={1} max={120} dir="ltr" />
                      </div>
                    </div>
                  )}

                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-foreground flex items-center gap-2">
                        البلد
                        {geoDetecting && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
                        {geoDetected && country && <span className="text-[10px] text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">تم الكشف تلقائياً</span>}
                      </Label>
                      <div className="relative">
                        <Globe className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="country" type="text" placeholder={geoDetecting ? "جارٍ الكشف..." : "مثال: فلسطين"} value={country} onChange={(e) => setCountry(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" required dir="auto" />
                      </div>
                    </div>
                  )}

                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-foreground flex items-center gap-2">
                        المدينة <span className="text-muted-foreground text-xs">(اختياري)</span>
                        {geoDetected && city && <span className="text-[10px] text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">تم الكشف تلقائياً</span>}
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="city" type="text" placeholder={geoDetecting ? "جارٍ الكشف..." : "مثال: غزة"} value={city} onChange={(e) => setCity(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" dir="auto" />
                      </div>
                    </div>
                  )}

                  {mode === "signup" && (
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">رقم الهاتف <span className="text-muted-foreground text-xs">(اختياري)</span></Label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+970..." value={phone} onChange={(e) => setPhone(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 text-foreground placeholder:text-muted-foreground/50" dir="ltr" />
                      </div>
                    </div>
                  )}

                  {mode !== "forgot" && (
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
                  )}

                  {mode === "signup" && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/20">
                      <Checkbox id="privacy" checked={privacyAccepted} onCheckedChange={(checked) => setPrivacyAccepted(checked === true)} className="mt-0.5" />
                      <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        أوافق على <Link to="/سياسة-الخصوصية" target="_blank" className="text-primary font-medium hover:underline">سياسة الخصوصية</Link> وأسمح بإرسال معلوماتي (الاسم، البريد الإلكتروني، العمر، البلد/المدينة، نوع الجهاز) إلى مدير الموقع لأغراض إدارية وأمنية.
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
                    <button type="button" onClick={() => setMode("login")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      العودة لتسجيل الدخول
                    </button>
                  ) : (
                    <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {mode === "login" ? "ليس لديك حساب؟ إنشاء حساب جديد" : "لديك حساب؟ تسجيل الدخول"}
                    </button>
                  )}
                </div>

                {mode === "login" && (
                  <div className="pt-4 border-t border-border/20">
                    <Link to="/دخول-المطور" className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60 hover:text-primary/80 transition-colors">
                      <Shield className="w-3 h-3" />
                      دخول للمطورين
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
