import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

const PagesTab = () => {
  const { topPagesData, COLORS } = useDeveloper();

  return (
    <Card className="border-border/30 bg-card/80">
      <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" />ترتيب الصفحات حسب الزيارات</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topPagesData.map((page, i) => {
            const max = topPagesData[0]?.value || 1;
            const percent = (page.value / max) * 100;
            return (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-5 text-center">{i + 1}</span>
                    <span className="text-foreground" dir="ltr">{page.name}</span>
                  </div>
                  <Badge variant="secondary">{page.value} زيارة</Badge>
                </div>
                <div className="h-2.5 bg-secondary/30 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            );
          })}
          {topPagesData.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default PagesTab;
