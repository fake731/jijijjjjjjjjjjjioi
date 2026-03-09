import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Download, ChevronDown, ChevronUp, Copy, Image } from "lucide-react";
import { useState } from "react";

const AILogsTab = () => {
  const { aiLogs, filteredAiLogs, aiSearch, setAiSearch, expandedChat, setExpandedChat, exportCSV, copyToClipboard } = useDeveloper();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <>
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
                    {log.image_urls && log.image_urls.length > 0 && (
                      <Badge variant="secondary" className="text-xs shrink-0 gap-1">
                        <Image className="w-3 h-3" />
                        {log.image_urls.length}
                      </Badge>
                    )}
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
                    
                    {log.image_urls && log.image_urls.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <Image className="w-3 h-3" />
                          الصور المرفقة ({log.image_urls.length}):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {log.image_urls.map((url: string, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => setPreviewImage(url)}
                              className="relative group rounded-lg overflow-hidden border border-border/30 hover:border-primary/50 transition-colors"
                            >
                              <img
                                src={url}
                                alt={`صورة ${idx + 1}`}
                                className="h-24 w-24 object-cover"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <Search className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

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

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage}
              alt="معاينة الصورة"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold hover:bg-destructive/80 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AILogsTab;
