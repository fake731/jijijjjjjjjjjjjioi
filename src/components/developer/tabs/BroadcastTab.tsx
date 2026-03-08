import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Megaphone, Send, Users } from "lucide-react";

const BroadcastTab = () => {
  const { broadcastTitle, setBroadcastTitle, broadcastMsg, setBroadcastMsg, sendingNotif, handleBroadcast, selectedUsers, notifTitle, setNotifTitle, notifMessage, setNotifMessage, handleBulkNotify } = useDeveloper();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-primary/30 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2"><Megaphone className="w-5 h-5 text-primary" />بث رسالة عامة</CardTitle>
          <CardDescription className="text-muted-foreground">إرسال إشعار لجميع المستخدمين</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input value={broadcastTitle} onChange={(e) => setBroadcastTitle(e.target.value)} placeholder="📢 عنوان الرسالة العامة..." className="bg-secondary/30 border-border/30" dir="auto" />
          <Textarea value={broadcastMsg} onChange={(e) => setBroadcastMsg(e.target.value)} placeholder="اكتب رسالتك هنا..." className="bg-secondary/30 border-border/30 min-h-[120px]" dir="auto" />
          <Button onClick={handleBroadcast} disabled={sendingNotif || !broadcastTitle.trim() || !broadcastMsg.trim()} className="w-full gap-2">
            {sendingNotif ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Megaphone className="w-4 h-4" />}
            بث الرسالة للجميع
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2"><Send className="w-5 h-5 text-primary" />إرسال مجمّع للمحددين</CardTitle>
          <CardDescription className="text-muted-foreground">حدد مستخدمين من قسم "المستخدمين" ثم أرسل لهم</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-secondary/20 border border-border/20 text-center">
            <Users className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-foreground font-medium">{selectedUsers.size} مستخدم محدد</p>
            <p className="text-xs text-muted-foreground mt-1">اذهب لقسم المستخدمين لتحديد المستلمين</p>
          </div>
          <Input value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} placeholder="عنوان الإشعار..." className="bg-secondary/30 border-border/30" dir="auto" />
          <Textarea value={notifMessage} onChange={(e) => setNotifMessage(e.target.value)} placeholder="محتوى الإشعار..." className="bg-secondary/30 border-border/30 min-h-[80px]" dir="auto" />
          <Button onClick={handleBulkNotify} disabled={selectedUsers.size === 0 || !notifTitle.trim() || !notifMessage.trim()} className="w-full gap-2" variant="outline">
            <Send className="w-4 h-4" />إرسال لـ {selectedUsers.size} مستخدم
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BroadcastTab;
