import { useState } from "react";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Copy, Mail, Phone, Globe, Monitor } from "lucide-react";

const UserSearchAdvancedTab = () => {
  const { profiles, userRoles, copyToClipboard, getUserEngagement } = useDeveloper();
  const [query, setQuery] = useState("");

  const results = query.length < 2 ? [] : profiles.filter(p => {
    const q = query.toLowerCase();
    return (p.display_name || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.country || "").toLowerCase().includes(q) ||
      (p.city || "").toLowerCase().includes(q) ||
      (p.phone || "").includes(q) ||
      ((p as any).ip_address || "").includes(q) ||
      ((p as any).device_type || "").toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <Card className="border-border/30 bg-card/80">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="ابحث بالاسم، الإيميل، البلد، المدينة، الهاتف، IP، الجهاز..."
              className="pr-11 bg-secondary/30 border-border/30 h-12 text-base"
              dir="auto"
            />
          </div>
          {query.length > 0 && query.length < 2 && (
            <p className="text-xs text-muted-foreground mt-2">اكتب حرفين على الأقل للبحث</p>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-3">
          <Badge variant="secondary">{results.length} نتيجة</Badge>
          {results.map(p => {
            const eng = getUserEngagement(p.id);
            return (
              <Card key={p.id} className="border-border/30 bg-card/80 hover:border-border/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                          <span className="text-primary font-bold">{(p.display_name || "?")[0]}</span>
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{p.display_name || "بدون اسم"}</p>
                          {userRoles[p.id] && <Badge variant="outline" className="text-[10px]">{userRoles[p.id]}</Badge>}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{p.email || "—"}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{p.phone || "—"}</span>
                        <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{p.country || "—"} {p.city ? `/ ${p.city}` : ""}</span>
                        <span className="flex items-center gap-1"><Monitor className="w-3 h-3" />{(p as any).device_type || "—"}</span>
                        <span>IP: {(p as any).ip_address || "—"}</span>
                        <span>تفاعل: {eng.score} نقطة</span>
                      </div>
                    </div>
                    <button onClick={() => copyToClipboard(p.email || "")} className="text-muted-foreground hover:text-primary">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserSearchAdvancedTab;
