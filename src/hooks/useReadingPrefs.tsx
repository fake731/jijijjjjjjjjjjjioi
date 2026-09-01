import { createContext, useContext, useCallback, useEffect, useMemo, useState, ReactNode } from "react";

export interface Bookmark {
  path: string;
  title: string;
  addedAt: number;
}

interface ReadingPrefsValue {
  readingMode: boolean;
  toggleReadingMode: () => void;
  fontScale: number;
  increaseFont: () => void;
  decreaseFont: () => void;
  resetFont: () => void;
  bookmarks: Bookmark[];
  isBookmarked: (path: string) => boolean;
  toggleBookmark: (bookmark: Omit<Bookmark, "addedAt">) => void;
  removeBookmark: (path: string) => void;
  shortcutsOpen: boolean;
  setShortcutsOpen: (open: boolean) => void;
  bookmarksOpen: boolean;
  setBookmarksOpen: (open: boolean) => void;
}

const STORAGE_KEY = "qk_reading_prefs";
const BOOKMARKS_KEY = "qk_bookmarks";
const MIN_SCALE = 0.85;
const MAX_SCALE = 1.4;

const ReadingPrefsContext = createContext<ReadingPrefsValue | undefined>(undefined);

const readJSON = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const ReadingPrefsProvider = ({ children }: { children: ReactNode }) => {
  const [readingMode, setReadingMode] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    const prefs = readJSON<{ readingMode?: boolean; fontScale?: number }>(STORAGE_KEY, {});
    if (typeof prefs.readingMode === "boolean") setReadingMode(prefs.readingMode);
    if (typeof prefs.fontScale === "number") setFontScale(prefs.fontScale);
    setBookmarks(readJSON<Bookmark[]>(BOOKMARKS_KEY, []));
  }, []);

  // Persist + apply to the document element.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ readingMode, fontScale }));
    document.documentElement.classList.toggle("reading-mode", readingMode);
    document.documentElement.style.setProperty("--font-scale", String(fontScale));
  }, [readingMode, fontScale]);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const clamp = (v: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(v.toFixed(2))));

  const value = useMemo<ReadingPrefsValue>(() => ({
    readingMode,
    toggleReadingMode: () => setReadingMode((v) => !v),
    fontScale,
    increaseFont: () => setFontScale((v) => clamp(v + 0.05)),
    decreaseFont: () => setFontScale((v) => clamp(v - 0.05)),
    resetFont: () => setFontScale(1),
    bookmarks,
    isBookmarked: (path: string) => bookmarks.some((b) => b.path === path),
    toggleBookmark: (bm) =>
      setBookmarks((list) =>
        list.some((b) => b.path === bm.path)
          ? list.filter((b) => b.path !== bm.path)
          : [{ ...bm, addedAt: Date.now() }, ...list].slice(0, 50)
      ),
    removeBookmark: (path: string) => setBookmarks((list) => list.filter((b) => b.path !== path)),
    shortcutsOpen,
    setShortcutsOpen,
    bookmarksOpen,
    setBookmarksOpen,
  }), [readingMode, fontScale, bookmarks, shortcutsOpen, bookmarksOpen]);

  return <ReadingPrefsContext.Provider value={value}>{children}</ReadingPrefsContext.Provider>;
};

export const useReadingPrefs = () => {
  const ctx = useContext(ReadingPrefsContext);
  if (!ctx) throw new Error("useReadingPrefs must be used inside ReadingPrefsProvider");
  return ctx;
};

/** Registers global keyboard shortcuts; ignores typing inside inputs/editables. */
export const useGlobalShortcuts = () => {
  const {
    toggleReadingMode, increaseFont, decreaseFont, resetFont,
    setShortcutsOpen, setBookmarksOpen, toggleBookmark,
  } = useReadingPrefs();

  const handler = useCallback((e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;

    const key = e.key;
    if (e.altKey && !e.ctrlKey && !e.metaKey) {
      if (key.toLowerCase() === "r") { e.preventDefault(); toggleReadingMode(); return; }
      if (key.toLowerCase() === "b") { e.preventDefault(); setBookmarksOpen(true); return; }
      if (key.toLowerCase() === "d") {
        e.preventDefault();
        toggleBookmark({ path: window.location.pathname, title: document.title || window.location.pathname });
        return;
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
      if (key === "+" || key === "=") { e.preventDefault(); increaseFont(); return; }
      if (key === "_" || key === "-") { e.preventDefault(); decreaseFont(); return; }
      if (key === ")" || key === "0") { e.preventDefault(); resetFont(); return; }
    }
    if (key === "?" || (e.shiftKey && key === "/")) { e.preventDefault(); setShortcutsOpen(true); }
  }, [toggleReadingMode, increaseFont, decreaseFont, resetFont, setShortcutsOpen, setBookmarksOpen, toggleBookmark]);

  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
};
