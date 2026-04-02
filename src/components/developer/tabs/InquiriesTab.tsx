import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Trash2, Check, Mail, Phone, Clock } from "lucide-react";
import { toast } from "sonner";

const InquiriesTab = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  // Realtime
  useEffect(() => {
    const channel = supabase
      .channel('inquiries-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inquiries' }, (payload) => {
        setInquiries(prev => [payload.new as any, ...prev]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const markAsRead = async (id: string) => {
    await supabase.from("inquiries").update({ is_read: true } as any).eq("id", id);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
    toast.success("تم التحديد كمقروء");
  };

  const deleteInquiry = async (id: string) => {
    await supabase.from("inquiries").delete().eq("id", id);
    setInquiries(prev => prev.filter(i => i.id !== id));
    toast.success("تم حذف الاستفسار");
  };

  const unreadCount = inquiries.filter(i => !i.is_read).length;

  if (loading) {
    return <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="secondary">{inquiries.length} استفسار</Badge>
        {unreadCount > 0 && <Badge className="bg-primary/20 text-primary">{unreadCount} غير مقروء</Badge>}
      </div>

      <div className="space-y-3">
        {inquiries.map(inq => (
          <Card key={inq.id} className={`border-border/30 bg-card/80 ${!inq.is_read ? 'border-r-2 border-r-primary' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-foreground">{inq.name}</span>
                    {!inq.is_read && <Badge className="bg-primary text-primary-foreground text-[10px]">جديد</Badge>}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{inq.email}</span>
                    {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{inq.phone}</span>}
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(inq.created_at).toLocaleString("ar")}</span>
                  </div>
                  <p className="text-sm text-foreground bg-secondary/20 rounded-lg p-3 mt-2">{inq.message}</p>
                  {inq.file_name && <span className="text-xs text-muted-foreground">📎 {inq.file_name}</span>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {!inq.is_read && (
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => markAsRead(inq.id)} title="تحديد كمقروء">
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deleteInquiry(inq.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {inquiries.length === 0 && (
          <Card className="border-border/30 bg-card/80">
            <CardContent className="p-12 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">لا توجد استفسارات بعد</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InquiriesTab;
