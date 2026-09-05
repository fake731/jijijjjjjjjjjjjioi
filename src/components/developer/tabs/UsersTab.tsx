import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Trash2, ChevronDown, Copy, Mail, Code, Monitor, Smartphone, Tablet, ShieldCheck, ShieldOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const fieldLabels: Record<string, string> = {
  id: "المعرّف", email: "البريد", display_name: "الاسم", avatar_url: "الصورة",
  country: "البلد", city: "المدينة", region: "المنطقة", ip_address: "عنوان IP",
  phone: "الهاتف", age: "العمر", gender: "الجنس", device_type: "نوع الجهاز",
  user_agent: "المتصفح", created_at: "تاريخ التسجيل", updated_at: "آخر تحديث",
  timezone: "المنطقة الزمنية", language: "اللغة", bio: "نبذة",
};

const deviceIcon = (type: string | null) => {
  if (!type) return null;
  if (type.includes("موبايل")) return <Smartphone className="w-3.5 h-3.5" />;
  if (type.includes("تابلت")) return <Tablet className="w-3.5 h-3.5" />;
  return <Monitor className="w-3.5 h-3.5" />;
};

const UsersTab = () => {
  const { user } = useAuth();
  const {
    filteredProfiles, userSearch, setUserSearch, userSort, setUserSort,
    countryFilter, setCountryFilter, uniqueCountries,
    selectedUsers, setSelectedUsers, toggleUserSelection, selectAllUsers,
    expandedUser, setExpandedUser, confirmDelete, setConfirmDelete,
    handleDeleteUser, handleBulkDelete, deletingUser,
    userRoles, getUserEngagement, copyToClipboard, fetchAllData,
  } = useDeveloper();

  const [deviceFilter, setDeviceFilter] = useState("all");
  const [roleBusy, setRoleBusy] = useState<string | null>(null);

  const changeRole = async (userId: string, role: "developer" | "user") => {
    setRoleBusy(userId);
    try {
      if (role === "developer") {
        const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "developer" });
        if (error && !error.message.includes("duplicate")) throw error;
        toast.success("تمت ترقية المستخدم إلى مطور");
      } else {
        const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "developer");
        if (error) throw error;
        toast.success("تم إرجاع المستخدم إلى مستخدم عادي");
      }
      await fetchAllData();
    } catch (e: any) {
      toast.error(e?.message || "تعذّر تغيير الدور");
    } finally {
      setRoleBusy(null);
    }
  };

  const uniqueDevices = Array.from(new Set(filteredProfiles.map(p => (p as any).device_type).filter(Boolean))) as string[];

  const displayedProfiles = deviceFilter === "all"
    ? filteredProfiles
    : filteredProfiles.filter(p => (p as any).device_type === deviceFilter);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="border-border/30 bg-card/80">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="بحث بالاسم، الإيميل، البلد، الهاتف..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} className="pr-10 bg-secondary/30 border-border/30" dir="auto" />
            </div>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[160px] bg-secondary/30 border-border/30"><SelectValue placeholder="البلد" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع البلدان</SelectItem>
                {uniqueCountries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={deviceFilter} onValueChange={setDeviceFilter}>
              <SelectTrigger className="w-[150px] bg-secondary/30 border-border/30"><SelectValue placeholder="الجهاز" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأجهزة</SelectItem>
                {uniqueDevices.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={userSort} onValueChange={(v: any) => setUserSort(v)}>
              <SelectTrigger className="w-[140px] bg-secondary/30 border-border/30"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="oldest">الأقدم</SelectItem>
                <SelectItem value="name">الاسم</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary">{displayedProfiles.length} مستخدم</Badge>
          </div>
          {selectedUsers.size > 0 && (
            <div className="mt-3 pt-3 border-t border-border/20 flex items-center gap-3 flex-wrap">
              <Badge className="bg-primary/20 text-primary">{selectedUsers.size} محدد</Badge>
              <Button size="sm" variant="destructive" className="h-7 text-xs gap-1" onClick={handleBulkDelete}><Trash2 className="w-3 h-3" />حذف المحددين</Button>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setSelectedUsers(new Set())}>إلغاء التحديد</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/30 bg-card/80">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-secondary/20">
                  <th className="p-3 w-10"><input type="checkbox" checked={selectedUsers.size === displayedProfiles.length && displayedProfiles.length > 0} onChange={selectAllUsers} className="rounded accent-[hsl(var(--primary))]" /></th>
                  <th className="text-right p-3 text-muted-foreground font-medium">المستخدم</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">البريد</th>
                  <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">الدور</th>
                  <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">البلد</th>
                  <th className="text-right p-3 text-muted-foreground font-medium hidden lg:table-cell">الجهاز</th>
                  <th className="text-right p-3 text-muted-foreground font-medium hidden sm:table-cell">التاريخ</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">التفاعل</th>
                  <th className="text-center p-3 text-muted-foreground font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {displayedProfiles.map((p) => {
                  const engagement = getUserEngagement(p.id);
                  const dt = (p as any).device_type as string | null;
                  return (
                    <tr key={p.id} className={`border-b border-border/10 hover:bg-secondary/20 transition-colors group ${selectedUsers.has(p.id) ? "bg-primary/5" : ""}`}>
                      <td className="p-3"><input type="checkbox" checked={selectedUsers.has(p.id)} onChange={() => toggleUserSelection(p.id)} className="rounded accent-[hsl(var(--primary))]" /></td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {p.avatar_url ? <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover border border-border/30" /> : <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center"><span className="text-primary font-bold text-xs">{(p.display_name || "?")[0]}</span></div>}
                          <div>
                            <span className="text-foreground font-medium text-sm block">{p.display_name || "بدون اسم"}</span>
                            {userRoles[p.id] === "developer" && <Badge variant="outline" className="text-[8px] border-primary/40 text-primary">مطور</Badge>}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <button onClick={() => copyToClipboard(p.email || "")} className="text-muted-foreground hover:text-foreground text-xs flex items-center gap-1" dir="ltr">
                          {p.email || "—"}<Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </td>
                      <td className="p-3 hidden md:table-cell"><Badge variant={userRoles[p.id] === "developer" ? "default" : "secondary"} className="text-[10px]">{userRoles[p.id] || "user"}</Badge></td>
                      <td className="p-3 hidden md:table-cell">{p.country ? <Badge variant="outline" className="text-xs">{p.country}</Badge> : "—"}</td>
                      <td className="p-3 hidden lg:table-cell">
                        {dt ? (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            {deviceIcon(dt)}
                            <span className="text-xs">{dt}</span>
                          </div>
                        ) : "—"}
                      </td>
                      <td className="p-3 text-muted-foreground text-xs hidden sm:table-cell">{p.created_at ? new Date(p.created_at).toLocaleDateString("ar") : "—"}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-muted-foreground">{engagement.visits}z {engagement.chats}c</span>
                          <div className="w-12 h-1.5 bg-secondary/30 rounded-full overflow-hidden"><div className="h-full rounded-full bg-primary/60" style={{ width: `${Math.min(100, engagement.score * 2)}%` }} /></div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setExpandedUser(expandedUser === p.id ? null : p.id)}>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedUser === p.id ? "rotate-180" : ""}`} />
                          </Button>
                          {confirmDelete === p.id ? (
                            <>
                              <Button size="sm" variant="destructive" className="h-7 text-xs px-2" onClick={() => handleDeleteUser(p.id)} disabled={deletingUser === p.id}>{deletingUser === p.id ? "..." : "حذف"}</Button>
                              <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => setConfirmDelete(null)}>إلغاء</Button>
                            </>
                          ) : p.id !== user?.id ? (
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100" onClick={() => setConfirmDelete(p.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                          ) : <Badge variant="secondary" className="text-[10px]">أنت</Badge>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {(() => {
              const p = displayedProfiles.find(pr => pr.id === expandedUser);
              const eng = p ? getUserEngagement(p.id) : null;
              const dt = p ? ((p as any).device_type as string | null) : null;
              return (
                <Dialog open={!!p} onOpenChange={(o) => { if (!o) setExpandedUser(null); }}>
                  <DialogContent className="max-w-[96vw] w-[96vw] h-[92vh] overflow-y-auto p-4 sm:p-6">
                    {p && eng && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-right">تفاصيل: {p.display_name || p.email}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {[{ l: "الزيارات", v: eng.visits }, { l: "محادثات AI", v: eng.chats }, { l: "نقاط التفاعل", v: eng.score }, { l: "الدور", v: userRoles[p.id] || "user" }, { l: "الجهاز", v: dt || "غير محدد" }].map((item, i) => (
                              <div key={i} className="p-3 rounded-lg bg-card/80 border border-border/20">
                                <p className="text-[10px] text-muted-foreground">{item.l}</p>
                                <p className="text-lg font-bold text-foreground">{item.v}</p>
                              </div>
                            ))}
                          </div>

                          {/* Rename */}
                          <div className="flex gap-2 items-center flex-wrap">
                            <Input
                              value={nameDraft[p.id] ?? (p.display_name || "")}
                              onChange={(e) => setNameDraft({ ...nameDraft, [p.id]: e.target.value })}
                              placeholder="اسم المستخدم"
                              className="max-w-xs bg-secondary/30 border-border/30"
                              dir="auto"
                            />
                            <Button size="sm" className="h-9 gap-1" disabled={savingName === p.id} onClick={() => saveName(p.id)}>
                              <Pencil className="w-3.5 h-3.5" />{savingName === p.id ? "..." : "حفظ الاسم"}
                            </Button>
                          </div>

                          {/* All stored data for this user */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                            {Object.entries(p as Record<string, any>).map(([k, v]) => (
                              <div key={k} className="p-2.5 rounded-lg bg-card/70 border border-border/20 min-w-0">
                                <p className="text-[10px] text-muted-foreground">{fieldLabels[k] || k}</p>
                                <p className="text-xs text-foreground break-all" dir="auto">
                                  {v === null || v === undefined || v === "" ? "—" : typeof v === "object" ? JSON.stringify(v) : String(v)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={() => copyToClipboard(p.id)}><Copy className="w-3 h-3" />نسخ ID</Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={() => copyToClipboard(p.email || "")}><Mail className="w-3 h-3" />نسخ البريد</Button>
                            <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={() => copyToClipboard(JSON.stringify(p, null, 2))}><Code className="w-3 h-3" />نسخ JSON</Button>
                            {userRoles[p.id] === "developer" ? (
                              <Button size="sm" variant="outline" className="h-8 text-xs gap-1" disabled={roleBusy === p.id || p.id === user?.id} onClick={() => changeRole(p.id, "user")}>
                                <ShieldOff className="w-3 h-3" />{roleBusy === p.id ? "..." : "إرجاعه مستخدم"}
                              </Button>
                            ) : (
                              <Button size="sm" className="h-8 text-xs gap-1" disabled={roleBusy === p.id} onClick={() => changeRole(p.id, "developer")}>
                                <ShieldCheck className="w-3 h-3" />{roleBusy === p.id ? "..." : "ترقية إلى قصي"}
                              </Button>
                            )}
                            {p.id !== user?.id && (
                              <Button size="sm" variant="destructive" className="h-8 text-xs gap-1" disabled={deletingUser === p.id} onClick={async () => { await handleDeleteUser(p.id); setExpandedUser(null); }}>
                                <Trash2 className="w-3 h-3" />{deletingUser === p.id ? "..." : "حذف المستخدم"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              );
            })()}

            {displayedProfiles.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمين مطابقين</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersTab;
