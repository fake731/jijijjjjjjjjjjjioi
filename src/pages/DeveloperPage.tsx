import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Download, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DeveloperProvider, useDeveloper } from "@/components/developer/DeveloperContext";
import DeveloperSidebar, { type DevSection } from "@/components/developer/DeveloperSidebar";
import OverviewTab from "@/components/developer/tabs/OverviewTab";
import UsersTab from "@/components/developer/tabs/UsersTab";
import ManagementTab from "@/components/developer/tabs/ManagementTab";
import CountriesTab from "@/components/developer/tabs/CountriesTab";
import NotificationsTab from "@/components/developer/tabs/NotificationsTab";
import BroadcastTab from "@/components/developer/tabs/BroadcastTab";
import VisitsTab from "@/components/developer/tabs/VisitsTab";
import AILogsTab from "@/components/developer/tabs/AILogsTab";
import PagesTab from "@/components/developer/tabs/PagesTab";
import ExportTab from "@/components/developer/tabs/ExportTab";
import RealtimeTab from "@/components/developer/tabs/RealtimeTab";
import SecurityTab from "@/components/developer/tabs/SecurityTab";
import RetentionTab from "@/components/developer/tabs/RetentionTab";
import IpTrackingTab from "@/components/developer/tabs/IpTrackingTab";
import DeviceAnalyticsTab from "@/components/developer/tabs/DeviceAnalyticsTab";
import LoginHistoryTab from "@/components/developer/tabs/LoginHistoryTab";
import RateLimitsTab from "@/components/developer/tabs/RateLimitsTab";
import UserSearchAdvancedTab from "@/components/developer/tabs/UserSearchAdvancedTab";
import GeoMapTab from "@/components/developer/tabs/GeoMapTab";
import SystemHealthTab from "@/components/developer/tabs/SystemHealthTab";
import PerformanceTab from "@/components/developer/tabs/PerformanceTab";
import InquiriesTab from "@/components/developer/tabs/InquiriesTab";
import BannedUsersTab from "@/components/developer/tabs/BannedUsersTab";
import ApiLogsTab from "@/components/developer/tabs/ApiLogsTab";
import StorageManagerTab from "@/components/developer/tabs/StorageManagerTab";
import ErrorLogsTab from "@/components/developer/tabs/ErrorLogsTab";
import SessionMonitorTab from "@/components/developer/tabs/SessionMonitorTab";
import PermissionManagerTab from "@/components/developer/tabs/PermissionManagerTab";
import AuditTrailTab from "@/components/developer/tabs/AuditTrailTab";
import ContentModerationTab from "@/components/developer/tabs/ContentModerationTab";
import BackupRestoreTab from "@/components/developer/tabs/BackupRestoreTab";
import FeatureFlagsTab from "@/components/developer/tabs/FeatureFlagsTab";
import AISettingsTab from "@/components/developer/tabs/AISettingsTab";
import UserSegmentsTab from "@/components/developer/tabs/UserSegmentsTab";

const sectionTitles: Record<DevSection, string> = {
  overview: "لوحة القيادة",
  users: "إدارة المستخدمين",
  management: "إدارة متقدمة",
  countries: "البلدان والمناطق",
  notifications: "الإشعارات",
  broadcast: "البث العام",
  visits: "سجل الزيارات",
  ai: "محادثات الذكاء الاصطناعي",
  pages: "ترتيب الصفحات",
  export: "تصدير البيانات",
  realtime: "الوقت الحقيقي",
  security: "الأمان والتدقيق",
  retention: "النمو والاحتفاظ",
  "ip-tracking": "تتبع عناوين IP",
  "device-analytics": "تحليل الأجهزة",
  "login-history": "سجل الدخول",
  "banned-users": "المستخدمين المحظورين",
  "rate-limits": "حدود الاستخدام",
  "api-logs": "سجل API",
  "storage-manager": "إدارة التخزين",
  "error-logs": "سجل الأخطاء",
  "user-search-advanced": "بحث متقدم",
  "session-monitor": "مراقبة الجلسات",
  "geo-map": "خريطة جغرافية",
  "permission-manager": "إدارة الصلاحيات",
  "system-health": "صحة النظام",
  "audit-trail": "سجل التدقيق",
  "content-moderation": "مراقبة المحتوى",
  "backup-restore": "النسخ الاحتياطي",
  "feature-flags": "تبديل الميزات",
  "ai-settings": "إعدادات الذكاء الاصطناعي",
  "user-segments": "شرائح المستخدمين",
  "performance": "الأداء",
  "inquiries": "الاستفسارات",
  "inquiries": "الاستفسارات",
};

const DeveloperContent = () => {
  const { fetchAllData, refreshing, exportCSV, profiles, visits, autoRefresh } = useDeveloper();
  const [activeSection, setActiveSection] = useState<DevSection>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => { fetchAllData(); }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <OverviewTab />;
      case "users": return <UsersTab />;
      case "management": return <ManagementTab />;
      case "countries": return <CountriesTab />;
      case "notifications": return <NotificationsTab />;
      case "broadcast": return <BroadcastTab />;
      case "visits": return <VisitsTab />;
      case "ai": return <AILogsTab />;
      case "pages": return <PagesTab />;
      case "export": return <ExportTab />;
      case "realtime": return <RealtimeTab />;
      case "security": return <SecurityTab />;
      case "retention": return <RetentionTab />;
      case "ip-tracking": return <IpTrackingTab />;
      case "device-analytics": return <DeviceAnalyticsTab />;
      case "login-history": return <LoginHistoryTab />;
      case "rate-limits": return <RateLimitsTab />;
      case "user-search-advanced": return <UserSearchAdvancedTab />;
      case "geo-map": return <GeoMapTab />;
      case "system-health": return <SystemHealthTab />;
      case "performance": return <PerformanceTab />;
      case "inquiries": return <InquiriesTab />;
      case "banned-users": return <BannedUsersTab />;
      case "api-logs": return <ApiLogsTab />;
      case "storage-manager": return <StorageManagerTab />;
      case "error-logs": return <ErrorLogsTab />;
      case "session-monitor": return <SessionMonitorTab />;
      case "permission-manager": return <PermissionManagerTab />;
      case "audit-trail": return <AuditTrailTab />;
      case "content-moderation": return <ContentModerationTab />;
      case "backup-restore": return <BackupRestoreTab />;
      case "feature-flags": return <FeatureFlagsTab />;
      case "user-segments": return <UserSegmentsTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">لوحة المطور المتقدمة</h1>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">مركز التحكم والإدارة الشاملة</p>
              {autoRefresh && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-500 font-medium">مباشر</span>
                </div>
              )}
            </div>
          </div>
          <Badge variant="outline" className="border-primary/40 text-primary">مطور</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => exportCSV(profiles, "users-export")} className="gap-2">
            <Download className="w-4 h-4" />تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={fetchAllData} disabled={refreshing} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />تحديث
          </Button>
        </div>
      </div>

      {/* Layout: Sidebar + Content */}
      <div className="flex gap-4 md:gap-6 flex-col md:flex-row">
        <div className="hidden md:block">
          <DeveloperSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
        {/* Mobile tabs */}
        <div className="md:hidden overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {Object.entries(sectionTitles).map(([key, title]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key as DevSection)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                  activeSection === key ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground"
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
        <main className="flex-1 min-w-0">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-foreground">{sectionTitles[activeSection]}</h2>
          </div>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

const DeveloperPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { navigate("/تسجيل-الدخول"); return; }
    if (user) checkRole();
  }, [user, authLoading]);

  const checkRole = async () => {
    if (!user) return;
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "developer").maybeSingle();
    setIsDeveloper(!!data);
    setChecking(false);
  };

  if (authLoading || checking) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
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
      <DeveloperProvider>
        <DeveloperContent />
      </DeveloperProvider>
      <Footer />
    </div>
  );
};

export default DeveloperPage;
