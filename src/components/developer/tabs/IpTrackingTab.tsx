import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, MapPin, Globe } from "lucide-react";

const IpTrackingTab = () => {
  const { profiles } = useDeveloper();

  const usersWithIp = profiles.filter((p: any) => p.ip_address);

  return (
    <div className="space-y-6">
      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Wifi className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">عناوين IP للمستخدمين ({usersWithIp.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {usersWithIp.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">لا توجد عناوين IP مسجلة بعد</p>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {usersWithIp.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                      <Wifi className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.display_name || "بدون اسم"}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-mono text-primary">{p.ip_address}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {p.country && <><Globe className="w-3 h-3" /><span>{p.country}</span></>}
                      {p.device_type && <span className="mx-1">•</span>}
                      {p.device_type && <span>{p.device_type}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IpTrackingTab;
