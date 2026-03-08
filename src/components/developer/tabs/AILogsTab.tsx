import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Download, ChevronDown, ChevronUp, Copy } from "lucide-react";

const AILogsTab = () => {
  const { aiLogs, filteredAiLogs, aiSearch, setAiSearch, expandedChat, setExpandedChat, exportCSV, copyToClipboard } = useDeveloper();

  return (
    <Card className="border-border/30 bg-card/80">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-foreground flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" />محادثات AI ({aiLogs.length})</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث في المحادثات..." value={aiSearch} onChange={(e) => setAiSearch(e.target.value)} className="pr-10 bg-secondary/30 border-border/30 h-9 text-sm" dir="auto" />
            </div>
            <Button size="sm" variant="outline" className="h-9 gap-1" onClick={() => exportCSV(aiLogs.slice(0, 500), "ai-logs-export")}><Download className="w-3.5 h-3.5" />تصدير</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredAiLogs.map(log => (
            <div key={log.id} className="rounded-lg bg-secondary/20 border border-border/20 overflow-hidden">
              <button onClick={() => setExpandedChat(expandedChat === log.id ? null : log.id)} className="w-full p-4 flex items-center justify-between text-right hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <Badge variant="outline" className="text-xs shrink-0">{log.ai_version}</Badge>
                  <span className="text-sm text-foreground truncate">{log.message}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:inline">{log.user_email || "مجهول"} • {new Date(log.created_at).toLocaleString("ar")}</span>
                  {expandedChat === log.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>
              {expandedChat === log.id && (
                <div className="px-4 pb-4 space-y-3 border-t border-border/20 pt-3">
                  <div><p className="text-xs text-muted-foreground mb-1">المستخدم:</p><p className="text-sm text-foreground bg-primary/10 rounded-lg p-3">{log.message}</p></div>
                  {log.response && <div><p className="text-xs text-muted-foreground mb-1">الرد:</p><p className="text-sm text-muted-foreground bg-secondary/30 rounded-lg p-3 whitespace-pre-wrap">{log.response}</p></div>}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{log.user_email || "مجهول"} • {new Date(log.created_at).toLocaleString("ar")}</span>
                    <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(log.message + "\n\n" + (log.response || ""))}><Copy className="w-3 h-3" />نسخ</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filteredAiLogs.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد محادثات مطابقة</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default AILogsTab;
