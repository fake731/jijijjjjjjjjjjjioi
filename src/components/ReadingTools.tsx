import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen, AArrowUp, AArrowDown, RotateCcw, Bookmark, BookmarkCheck,
  Keyboard, Settings2, X, Trash2,
} from "lucide-react";
import { useReadingPrefs, useGlobalShortcuts } from "@/hooks/useReadingPrefs";

const routeTitle = (path: string) => {
  const clean = decodeURIComponent(path).replace(/^\//, "");
  return clean ? clean.replace(/-/g, " ") : "الرئيسية";
};

const ShortcutRow = ({ keys, label }: { keys: string; label: string }) => (
  <div className="flex items-center justify-between gap-4 py-2 border-b border-border/40 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <kbd className="px-2 py-1 rounded-md bg-muted/60 border border-border/60 text-xs font-mono">{keys}</kbd>
  </div>
);

const ReadingTools = () => {
  useGlobalShortcuts();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    readingMode, toggleReadingMode,
    fontScale, increaseFont, decreaseFont, resetFont,
    bookmarks, isBookmarked, toggleBookmark, removeBookmark,
    shortcutsOpen, setShortcutsOpen, bookmarksOpen, setBookmarksOpen,
  } = useReadingPrefs();

  const path = location.pathname;
  const bookmarked = isBookmarked(path);

  const iconBtn =
    "w-10 h-10 rounded-xl flex items-center justify-center border border-border/60 bg-background/60 backdrop-blur-xl text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors";

  return (
    <>
      {/* Floating launcher + panel */}
      <div className="fixed bottom-20 right-5 z-[55] flex flex-col items-end gap-2">
        {open && (
          <div className="flex flex-col gap-2 p-2 rounded-2xl border border-border/60 bg-background/70 backdrop-blur-2xl shadow-xl animate-in fade-in slide-in-from-bottom-2">
            <button className={iconBtn} onClick={toggleReadingMode} title="وضع القراءة (Alt+R)" aria-label="وضع القراءة">
              <BookOpen className={`w-4 h-4 ${readingMode ? "text-primary" : ""}`} />
            </button>
            <button className={iconBtn} onClick={increaseFont} title="تكبير الخط" aria-label="تكبير الخط">
              <AArrowUp className="w-4 h-4" />
            </button>
            <button className={iconBtn} onClick={decreaseFont} title="تصغير الخط" aria-label="تصغير الخط">
              <AArrowDown className="w-4 h-4" />
            </button>
            <button className={iconBtn} onClick={resetFont} title={`إعادة الحجم (${Math.round(fontScale * 100)}%)`} aria-label="إعادة حجم الخط">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              className={iconBtn}
              onClick={() => toggleBookmark({ path, title: routeTitle(path) })}
              title="إضافة للمفضلة (Alt+D)"
              aria-label="إضافة للمفضلة"
            >
              {bookmarked ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button className={iconBtn} onClick={() => setBookmarksOpen(true)} title="قائمة المفضلة (Alt+B)" aria-label="قائمة المفضلة">
              <span className="relative">
                <Bookmark className="w-4 h-4" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-2 -left-2 text-[10px] px-1 rounded-full bg-primary text-primary-foreground">
                    {bookmarks.length}
                  </span>
                )}
              </span>
            </button>
            <button className={iconBtn} onClick={() => setShortcutsOpen(true)} title="اختصارات لوحة المفاتيح (?)" aria-label="الاختصارات">
              <Keyboard className="w-4 h-4" />
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="أدوات القراءة"
          className="w-12 h-12 rounded-2xl flex items-center justify-center border border-border/60 bg-background/70 backdrop-blur-2xl text-foreground hover:text-primary hover:border-primary/60 transition-colors shadow-lg"
        >
          {open ? <X className="w-5 h-5" /> : <Settings2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Bookmarks drawer */}
      {bookmarksOpen && (
        <div className="fixed inset-0 z-[80] flex" onClick={() => setBookmarksOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div
            className="relative ms-auto h-full w-full max-w-sm border-s border-border/60 bg-background/85 backdrop-blur-2xl p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">المفضلة</h2>
              <button onClick={() => setBookmarksOpen(false)} aria-label="إغلاق" className={iconBtn}>
                <X className="w-4 h-4" />
              </button>
            </div>
            {bookmarks.length === 0 ? (
              <p className="text-sm text-muted-foreground">لا توجد صفحات محفوظة بعد. استخدم Alt+D لحفظ الصفحة الحالية.</p>
            ) : (
              <ul className="space-y-2">
                {bookmarks.map((b) => (
                  <li key={b.path} className="flex items-center gap-2 p-3 rounded-xl border border-border/50 bg-card/40">
                    <button
                      className="flex-1 text-start text-sm hover:text-primary transition-colors truncate"
                      onClick={() => { navigate(b.path); setBookmarksOpen(false); }}
                    >
                      {b.title}
                    </button>
                    <button onClick={() => removeBookmark(b.path)} aria-label="حذف" className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Shortcuts dialog */}
      {shortcutsOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" onClick={() => setShortcutsOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md rounded-2xl border border-border/60 bg-background/90 backdrop-blur-2xl p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold">اختصارات لوحة المفاتيح</h2>
              <button onClick={() => setShortcutsOpen(false)} aria-label="إغلاق" className={iconBtn}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <ShortcutRow keys="Ctrl / ⌘ + K" label="البحث السريع" />
            <ShortcutRow keys="Alt + R" label="وضع القراءة" />
            <ShortcutRow keys="Alt + D" label="حفظ الصفحة في المفضلة" />
            <ShortcutRow keys="Alt + B" label="فتح قائمة المفضلة" />
            <ShortcutRow keys="Ctrl + Shift + +" label="تكبير الخط" />
            <ShortcutRow keys="Ctrl + Shift + -" label="تصغير الخط" />
            <ShortcutRow keys="Ctrl + Shift + 0" label="إعادة حجم الخط" />
            <ShortcutRow keys="?" label="عرض هذه القائمة" />
          </div>
        </div>
      )}
    </>
  );
};

export default ReadingTools;
