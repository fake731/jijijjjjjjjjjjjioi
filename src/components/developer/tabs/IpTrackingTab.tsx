import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Wifi, Globe, MapPin, Loader2, Search } from "lucide-react";

interface IPLog {
  id: string;
  user_id: string | null;
  ip_address: string;
  country: string | null;
  city: string | null;
  region: string | null;
  isp: string | null;
  user_agent: string | null;
  page_path: string | null;
  created_at: string;
}

const IpTrackingTab = () => {
  const [logs, setLogs] = useState<IPLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("ip_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      setLogs((data as IPLog[]) || []);
      setLoading(false);
    })();
  }, []);

  // unique IPs
  const uniqueIps = new Set(logs.map(l => l.ip_address)).size;
  const uniqueCountries = new Set(logs.map(l => l.country).filter(Boolean)).size;

  const filtered = logs.filter(l =>
    !search ||
    l.ip_address.includes(search) ||
    (l.country?.toLowerCase().includes(search.toLowerCase())) ||
    (l.city?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4" dir="rtl">
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-3 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">إجمالي السجلات</p>
              <p className="text-lg font-bold text-foreground">{logs.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <div>
              <p className="text-xs text-muted-foreground">IP فريد</p>
              <p className="text-lg font-bold text-foreground">{uniqueIps}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground">دول</p>
              <p className="text-lg font-bold text-foreground">{uniqueCountries}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث IP/دولة/مدينة..." className="pr-10" />
      </div>

      <Card className="border-border/30 bg-card/60 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Wifi className="w-4 h-4 text-primary" />
            سجل تتبع IP ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">لا توجد سجلات</p>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filtered.map(l => (
                <div key={l.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-primary" dir="ltr">{l.ip_address}</span>
                    {!l.user_id && <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 text-[10px]">ضيف</span>}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {l.country && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{l.country}</span>}
                    {l.city && <span>• {l.city}</span>}
                    <span className="text-[10px]">{new Date(l.created_at).toLocaleString("ar")}</span>
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
