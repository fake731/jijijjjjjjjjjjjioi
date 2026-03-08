import { useDeveloper } from "./DeveloperContext";
import { Users, Eye, MessageSquare, Globe, UserPlus, Activity, Shield, Settings, Bell, Megaphone, BarChart3, Download, Zap, Monitor, ShieldCheck, TrendingUp, Clock, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type DevSection = "overview" | "users" | "management" | "countries" | "notifications" | "broadcast" | "visits" | "ai" | "pages" | "export" | "realtime" | "security" | "retention";

interface NavItem {
  id: DevSection;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
  group: string;
}

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "نظرة عامة",
    items: [
      { id: "overview", label: "لوحة القيادة", icon: BarChart3, group: "overview" },
      { id: "realtime", label: "الوقت الحقيقي", icon: Zap, group: "overview" },
    ],
  },
  {
    title: "إدارة المستخدمين",
    items: [
      { id: "users", label: "المستخدمين", icon: Users, group: "users" },
      { id: "management", label: "إدارة متقدمة", icon: Settings, group: "users" },
      { id: "countries", label: "البلدان", icon: Globe, group: "users" },
    ],
  },
  {
    title: "التواصل",
    items: [
      { id: "notifications", label: "الإشعارات", icon: Bell, group: "comm" },
      { id: "broadcast", label: "البث العام", icon: Megaphone, group: "comm" },
    ],
  },
  {
    title: "التحليلات",
    items: [
      { id: "visits", label: "سجل الزيارات", icon: Eye, group: "analytics" },
      { id: "ai", label: "محادثات AI", icon: MessageSquare, group: "analytics" },
      { id: "pages", label: "ترتيب الصفحات", icon: BarChart3, group: "analytics" },
      { id: "retention", label: "النمو والاحتفاظ", icon: TrendingUp, group: "analytics" },
    ],
  },
  {
    title: "النظام",
    items: [
      { id: "security", label: "الأمان والتدقيق", icon: ShieldCheck, group: "system" },
      { id: "export", label: "تصدير البيانات", icon: Download, group: "system" },
    ],
  },
];

interface Props {
  activeSection: DevSection;
  onSectionChange: (section: DevSection) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const DeveloperSidebar = ({ activeSection, onSectionChange, collapsed, onToggle }: Props) => {
  const { stats, autoRefresh, todayStats } = useDeveloper();

  return (
    <aside className={`sticky top-20 h-[calc(100vh-5rem)] transition-all duration-300 shrink-0 ${collapsed ? "w-16" : "w-64"} border-l border-border/30 bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden`}>
      <div className="h-full flex flex-col">
        {/* Toggle */}
        <button onClick={onToggle} className="p-3 border-b border-border/20 hover:bg-muted/50 transition-colors flex items-center justify-center">
          {collapsed ? <Shield className="w-5 h-5 text-primary" /> : (
            <div className="flex items-center gap-2 w-full">
              <Shield className="w-5 h-5 text-primary shrink-0" />
              <span className="text-sm font-bold text-foreground">لوحة المطور</span>
              {autoRefresh && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-auto" />}
            </div>
          )}
        </button>

        {/* Quick Stats (collapsed = icons only) */}
        {!collapsed && (
          <div className="p-3 border-b border-border/20 space-y-1.5">
            {[
              { icon: Users, value: stats.totalUsers, label: "مستخدم" },
              { icon: Eye, value: todayStats.visits, label: "زيارة اليوم" },
              { icon: MessageSquare, value: todayStats.chats, label: "محادثة اليوم" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <s.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-foreground font-bold">{s.value}</span>
                <span className="text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {navGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2 mb-1.5">{group.title}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-2.5 rounded-lg transition-all text-sm ${
                      collapsed ? "justify-center p-2.5" : "px-3 py-2"
                    } ${
                      activeSection === item.id
                        ? "bg-primary/15 text-primary font-medium border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && item.id === "realtime" && autoRefresh && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default DeveloperSidebar;
