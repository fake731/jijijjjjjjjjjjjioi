import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Eye, MessageSquare, Shield, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DeveloperPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [checking, setChecking] = useState(true);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [visits, setVisits] = useState<any[]>([]);
  const [aiLogs, setAiLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalVisits: 0, totalAiChats: 0 });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/تسجيل-الدخول");
      return;
    }
    if (user) checkDeveloperRole();
  }, [user, authLoading]);

  const checkDeveloperRole = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "developer")
      .maybeSingle();

    if (data) {
      setIsDeveloper(true);
      fetchAllData();
    } else {
      setIsDeveloper(false);
    }
    setChecking(false);
  };

  const fetchAllData = async () => {
    const [profilesRes, visitsRes, logsRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("page_visits").select("*").order("visited_at", { ascending: false }).limit(200),
      supabase.from("ai_chat_logs").select("*").order("created_at", { ascending: false }).limit(200),
    ]);

    const p = profilesRes.data || [];
    const v = visitsRes.data || [];
    const l = logsRes.data || [];
    setProfiles(p);
    setVisits(v);
    setAiLogs(l);
    setStats({ totalUsers: p.length, totalVisits: v.length, totalAiChats: l.length });
  };

  if (authLoading || checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isDeveloper) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="max-w-md border-destructive/30">
            <CardContent className="p-8 text-center space-y-4">
              <Shield className="w-16 h-16 mx-auto text-destructive" />
              <h2 className="text-xl font-bold text-foreground">غير مصرح</h2>
              <p className="text-muted-foreground">هذه الصفحة مخصصة للمطورين فقط.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">لوحة المطور</h1>
          <Badge variant="outline" className="border-primary/40 text-primary">مطور</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/30 bg-card/80">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                <p className="text-sm text-muted-foreground">إجمالي المستخدمين</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/80">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalVisits}</p>
                <p className="text-sm text-muted-foreground">إجمالي الزيارات</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/80">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalAiChats}</p>
                <p className="text-sm text-muted-foreground">محادثات الذكاء الاصطناعي</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" dir="rtl">
          <TabsList className="mb-4">
            <TabsTrigger value="users">المستخدمين</TabsTrigger>
            <TabsTrigger value="visits">الزيارات</TabsTrigger>
            <TabsTrigger value="ai">محادثات AI</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <CardTitle className="text-foreground">المستخدمين المسجلين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-right p-3 text-muted-foreground font-medium">الاسم</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">البريد</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">العمر</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">الخصوصية</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">التسجيل</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profiles.map((p) => (
                        <tr key={p.id} className="border-b border-border/10 hover:bg-secondary/20">
                          <td className="p-3 text-foreground">{p.display_name || "—"}</td>
                          <td className="p-3 text-foreground" dir="ltr">{p.email || "—"}</td>
                          <td className="p-3 text-foreground">{p.age || "—"}</td>
                          <td className="p-3">
                            <Badge variant={p.privacy_accepted ? "default" : "destructive"} className="text-xs">
                              {p.privacy_accepted ? "موافق" : "غير موافق"}
                            </Badge>
                          </td>
                          <td className="p-3 text-muted-foreground text-xs">
                            {p.created_at ? new Date(p.created_at).toLocaleDateString("ar") : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {profiles.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمين</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visits">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <CardTitle className="text-foreground">سجل الزيارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-right p-3 text-muted-foreground font-medium">الصفحة</th>
                        <th className="text-right p-3 text-muted-foreground font-medium">الوقت</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visits.map((v) => (
                        <tr key={v.id} className="border-b border-border/10 hover:bg-secondary/20">
                          <td className="p-3 text-foreground" dir="ltr">{v.page_path}</td>
                          <td className="p-3 text-muted-foreground text-xs">
                            {new Date(v.visited_at).toLocaleString("ar")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {visits.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">لا يوجد زيارات مسجلة</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="border-border/30 bg-card/80">
              <CardHeader>
                <CardTitle className="text-foreground">محادثات الذكاء الاصطناعي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-lg bg-secondary/20 border border-border/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{log.ai_version}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {log.user_email || "مجهول"} • {new Date(log.created_at).toLocaleString("ar")}
                        </span>
                      </div>
                      <p className="text-sm text-foreground"><strong>الرسالة:</strong> {log.message}</p>
                      {log.response && (
                        <p className="text-sm text-muted-foreground line-clamp-3"><strong>الرد:</strong> {log.response}</p>
                      )}
                    </div>
                  ))}
                  {aiLogs.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">لا يوجد محادثات مسجلة</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default DeveloperPage;
