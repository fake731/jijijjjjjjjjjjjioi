import { useDeveloper } from "../DeveloperContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Trash2, ChevronDown, Copy, Mail, Code } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const UsersTab = () => {
  const { user } = useAuth();
  const {
    filteredProfiles, userSearch, setUserSearch, userSort, setUserSort,
    countryFilter, setCountryFilter, uniqueCountries,
    selectedUsers, setSelectedUsers, toggleUserSelection, selectAllUsers,
    expandedUser, setExpandedUser, confirmDelete, setConfirmDelete,
    handleDeleteUser, handleBulkDelete, deletingUser,
    userRoles, getUserEngagement, copyToClipboard,
  } = useDeveloper();

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
            <Select value={userSort} onValueChange={(v: any) => setUserSort(v)}>
              <SelectTrigger className="w-[140px] bg-secondary/30 border-border/30"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="oldest">الأقدم</SelectItem>
                <SelectItem value="name">الاسم</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary">{filteredProfiles.length} مستخدم</Badge>
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
                  <th className="p-3 w-10"><input type="checkbox" checked={selectedUsers.size === filteredProfiles.length && filteredProfiles.length > 0} onChange={selectAllUsers} className="rounded accent-[hsl(var(--primary))]" /></th>
                  <th className="text-right p-3 text-muted-foreground font-medium">المستخدم</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">البريد</th>
                  <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">الدور</th>
                  <th className="text-right p-3 text-muted-foreground font-medium hidden md:table-cell">البلد</th>
                  <th className="text-right p-3 text-muted-foreground font-medium hidden sm:table-cell">التاريخ</th>
                  <th className="text-right p-3 text-muted-foreground font-medium">التفاعل</th>
                  <th className="text-center p-3 text-muted-foreground font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((p) => {
                  const engagement = getUserEngagement(p.id);
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
            {expandedUser && (() => {
              const p = filteredProfiles.find(pr => pr.id === expandedUser);
              if (!p) return null;
              const eng = getUserEngagement(p.id);
              return (
                <div className="p-4 bg-secondary/10 border-t border-border/20 space-y-3">
                  <h4 className="text-sm font-bold text-foreground">تفاصيل: {p.display_name || p.email}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[{ l: "الزيارات", v: eng.visits }, { l: "محادثات AI", v: eng.chats }, { l: "نقاط التفاعل", v: eng.score }, { l: "الدور", v: userRoles[p.id] || "user" }].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-card/80 border border-border/20">
                        <p className="text-[10px] text-muted-foreground">{item.l}</p>
                        <p className="text-lg font-bold text-foreground">{item.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(p.id)}><Copy className="w-3 h-3" />نسخ ID</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(p.email || "")}><Mail className="w-3 h-3" />نسخ البريد</Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(JSON.stringify(p, null, 2))}><Code className="w-3 h-3" />نسخ JSON</Button>
                  </div>
                </div>
              );
            })()}
            {filteredProfiles.length === 0 && <p className="text-center text-muted-foreground py-8">لا يوجد مستخدمين مطابقين</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersTab;
