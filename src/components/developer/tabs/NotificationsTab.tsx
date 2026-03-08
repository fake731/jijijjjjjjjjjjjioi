import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Trash2, Bell } from "lucide-react";

const NotificationsTab = () => {
  const { profiles, notifTitle, setNotifTitle, notifMessage, setNotifMessage, notifTarget, setNotifTarget, sendingNotif, handleSendNotification, sentNotifications, handleDeleteNotification } = useDeveloper();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-border/30 bg-card/80">
        <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><Send className="w-5 h-5 text-primary" />إرسال إشعار</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">المستلم</label>
            <Select value={notifTarget} onValueChange={setNotifTarget}>
              <SelectTrigger className="bg-secondary/30 border-border/30"><SelectValue placeholder="اختر المستلم" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">📢 جميع المستخدمين</SelectItem>
                {profiles.map(p => <SelectItem key={p.id} value={p.id}>{p.display_name || p.email}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">العنوان</label>
            <Input value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} placeholder="عنوان الإشعار..." className="bg-secondary/30 border-border/30" dir="auto" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">الرسالة</label>
            <Textarea value={notifMessage} onChange={(e) => setNotifMessage(e.target.value)} placeholder="محتوى الإشعار..." className="bg-secondary/30 border-border/30 min-h-[100px]" dir="auto" />
          </div>
          <Button onClick={handleSendNotification} disabled={sendingNotif || !notifTitle.trim() || !notifMessage.trim()} className="w-full gap-2">
            {sendingNotif ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
            إرسال الإشعار
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader><CardTitle className="text-foreground flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />الإشعارات المرسلة ({sentNotifications.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {sentNotifications.map(n => (
              <div key={n.id} className="group rounded-lg p-3 bg-secondary/20 border border-border/20 hover:border-border/40 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground/60">
                      <span>{n.user_id ? profiles.find(p => p.id === n.user_id)?.email || "مستخدم محدد" : "📢 الجميع"}</span>
                      <span>•</span>
                      <span>{new Date(n.created_at).toLocaleString("ar")}</span>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => handleDeleteNotification(n.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            ))}
            {sentNotifications.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد إشعارات</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
