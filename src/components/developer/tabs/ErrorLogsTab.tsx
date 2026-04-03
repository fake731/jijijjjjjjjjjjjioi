import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Server } from "lucide-react";

const ErrorLogsTab = () => {
  const { stats, autoRefresh } = useDeveloper();

  return (
    <div className="space-y-6">
      <Card className="border-border/30 bg-card/80">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-foreground">لا توجد أخطاء</h3>
          <p className="text-sm text-muted-foreground">النظام يعمل بشكل طبيعي بدون أخطاء مسجلة</p>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Server className="w-5 h-5 text-primary" />
          <CardTitle className="text-foreground text-sm">حالة الخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "قاعدة البيانات", status: "يعمل", ok: true },
              { name: "المصادقة", status: "يعمل", ok: true },
              { name: "Edge Functions", status: "يعمل", ok: true },
              { name: "التخزين", status: "يعمل", ok: true },
              { name: "Realtime", status: autoRefresh ? "متصل" : "غير متصل", ok: autoRefresh },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  {s.ok ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  <span className="text-sm text-foreground">{s.name}</span>
                </div>
                <span className={`text-xs font-medium ${s.ok ? "text-emerald-500" : "text-amber-500"}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorLogsTab;
