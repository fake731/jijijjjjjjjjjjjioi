import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";

const VisitsTab = () => {
  const { visits, filteredVisits, visitSearch, setVisitSearch } = useDeveloper();

  return (
    <Card className="border-border/30 bg-card/80">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-foreground flex items-center gap-2"><Eye className="w-5 h-5 text-primary" />سجل الزيارات ({visits.length})</CardTitle>
          <div className="relative w-64">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="بحث في الصفحات..." value={visitSearch} onChange={(e) => setVisitSearch(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 h-9 text-sm" dir="auto" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border/30 bg-secondary/20">
              <th className="text-right p-3 text-muted-foreground font-medium">الصفحة</th>
              <th className="text-right p-3 text-muted-foreground font-medium">الوقت</th>
              <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">المتصفح</th>
            </tr></thead>
            <tbody>
              {filteredVisits.map(v => (
                <tr key={v.id} className="border-b border-border/10 hover:bg-secondary/20">
                  <td className="p-3 text-foreground" dir="ltr">{decodeURIComponent(v.page_path)}</td>
                  <td className="p-3 text-muted-foreground text-xs">{new Date(v.visited_at).toLocaleString("ar")}</td>
                  <td className="p-3 text-muted-foreground text-[10px] max-w-[200px] truncate hidden md:table-cell" dir="ltr">{v.user_agent?.split(" ").slice(0, 3).join(" ") || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredVisits.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد زيارات مطابقة</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitsTab;
