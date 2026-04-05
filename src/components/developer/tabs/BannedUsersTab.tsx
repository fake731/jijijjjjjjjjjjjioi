import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserX, Shield, Ban, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

interface BannedUser {
  id: string;
  user_id: string;
  reason: string;
  created_at: string;
}

const BannedUsersTab = () => {
  const { profiles } = useDeveloper();
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [banReason, setBanReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const fetchBanned = async () => {
    setLoading(true);
    const { data } = await supabase.from("banned_users" as any).select("*").order("created_at", { ascending: false });
    setBannedUsers((data as any) || []);
    setLoading(false);
  };

  useEffect(() => { fetchBanned(); }, []);

  const handleBan = async () => {
    if (!selectedUserId) return;
    const { error } = await supabase.from("banned_users" as any).insert({
      user_id: selectedUserId,
      banned_by: (await supabase.auth.getUser()).data.user?.id,
      reason: banReason || "لا يوجد سبب محدد",
    } as any);
    if (error) {
      if (error.code === "23505") toast.error("هذا المستخدم محظور بالفعل");
      else toast.error("خطأ في الحظر");
      return;
    }
    toast.success("تم حظر المستخدم بنجاح");
    setSelectedUserId("");
    setBanReason("");
    fetchBanned();
  };

  const handleUnban = async (id: string) => {
    await supabase.from("banned_users" as any).delete().eq("id", id);
    toast.success("تم إلغاء الحظر");
    fetchBanned();
  };

  const bannedUserIds = new Set(bannedUsers.map(b => b.user_id));
  const availableProfiles = profiles.filter(p => !bannedUserIds.has(p.id));
  const filteredProfiles = availableProfiles.filter(p =>
    !search || (p.display_name || p.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Ban a user */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Ban className="w-5 h-5 text-destructive" />
          <CardTitle className="text-foreground text-sm">حظر مستخدم</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative">
            <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث عن مستخدم..."
              className="w-full h-10 pr-10 pl-4 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {search && filteredProfiles.length > 0 && (
            <div className="max-h-40 overflow-y-auto rounded-lg border border-border/20 divide-y divide-border/10">
              {filteredProfiles.slice(0, 10).map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedUserId(p.id); setSearch(""); }}
                  className="w-full flex items-center gap-3 p-2 hover:bg-secondary/50 text-right"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                    {(p.display_name || "?")[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{p.display_name || "بدون اسم"}</p>
                    <p className="text-xs text-muted-foreground" dir="ltr">{p.email}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {selectedUserId && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <p className="text-sm text-foreground mb-2">
                المستخدم: <span className="font-bold text-primary">{profiles.find(p => p.id === selectedUserId)?.display_name || selectedUserId}</span>
              </p>
              <input
                value={banReason}
                onChange={e => setBanReason(e.target.value)}
                placeholder="سبب الحظر (اختياري)..."
                className="w-full h-9 px-3 rounded-lg border border-border bg-background text-foreground text-sm mb-2"
              />
              <button
                onClick={handleBan}
                className="w-full h-9 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90"
              >
                تأكيد الحظر
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Banned list */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <UserX className="w-5 h-5 text-amber-500" />
          <CardTitle className="text-foreground text-sm">المستخدمون المحظورون</CardTitle>
          <Badge variant="secondary" className="text-xs">{bannedUsers.length}</Badge>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : bannedUsers.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-foreground font-bold">لا يوجد مستخدمين محظورين</p>
              <p className="text-sm text-muted-foreground">جميع المستخدمين في حالة نشطة</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {bannedUsers.map(b => {
                const profile = profiles.find(p => p.id === b.user_id);
                return (
                  <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-destructive/15 flex items-center justify-center">
                        <UserX className="w-4 h-4 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{profile?.display_name || "محذوف"}</p>
                        <p className="text-xs text-muted-foreground" dir="ltr">{profile?.email || b.user_id}</p>
                        {b.reason && <p className="text-xs text-destructive/80 mt-0.5">{b.reason}</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnban(b.id)}
                      className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors"
                      title="إلغاء الحظر"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BannedUsersTab;
