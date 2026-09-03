import { useEffect, useRef, useState } from "react";
import { Play, Youtube, X, ExternalLink, Gauge, MonitorPlay } from "lucide-react";

/**
 * ضع هنا معرّفات فيديوهات يوتيوب (الجزء بعد v= في الرابط).
 * مثال: https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  "dQw4w9WgXcQ"
 */
export const VIDEO_IDS: { id: string; title: string }[] = [];

const CHANNEL_URL = "https://www.youtube.com/@Qusay_kali";

const QUALITIES = [
  { value: "hd1080", label: "1080p" },
  { value: "hd720", label: "720p" },
  { value: "large", label: "480p" },
  { value: "medium", label: "360p" },
  { value: "small", label: "240p" },
  { value: "default", label: "تلقائي" },
];

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const loadYT = () =>
  new Promise<any>((resolve) => {
    if (window.YT?.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT);
    };
    if (!document.getElementById("yt-iframe-api")) {
      const s = document.createElement("script");
      s.id = "yt-iframe-api";
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  });

const PlayerModal = ({ videoId, title, onClose }: { videoId: string; title: string; onClose: () => void }) => {
  const holder = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);
  const [quality, setQuality] = useState("default");
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    let cancelled = false;
    loadYT().then((YT) => {
      if (cancelled || !holder.current) return;
      player.current = new YT.Player(holder.current, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1, autoplay: 1 },
      });
    });
    return () => {
      cancelled = true;
      try { player.current?.destroy?.(); } catch { /* noop */ }
    };
  }, [videoId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-background/85 backdrop-blur-xl" onClick={onClose}>
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-2xl border border-primary/25 bg-card/80 backdrop-blur-2xl overflow-hidden shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.5)]"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/30">
          <h3 className="text-sm font-bold text-foreground truncate">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-secondary/60 border border-border/40 flex items-center justify-center shrink-0" aria-label="إغلاق">
            <X className="w-4 h-4 text-primary" />
          </button>
        </div>

        <div className="aspect-video bg-black">
          <div ref={holder} className="w-full h-full" />
        </div>

        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-t border-border/30">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MonitorPlay className="w-4 h-4 text-primary" /> الجودة
          </div>
          <select
            value={quality}
            onChange={(e) => {
              setQuality(e.target.value);
              try { player.current?.setPlaybackQuality?.(e.target.value); } catch { /* noop */ }
            }}
            className="rounded-lg bg-background/60 border border-primary/25 px-2.5 py-1.5 text-xs text-foreground"
          >
            {QUALITIES.map((q) => <option key={q.value} value={q.value}>{q.label}</option>)}
          </select>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
            <Gauge className="w-4 h-4 text-primary" /> السرعة
          </div>
          <select
            value={speed}
            onChange={(e) => {
              const v = Number(e.target.value);
              setSpeed(v);
              try { player.current?.setPlaybackRate?.(v); } catch { /* noop */ }
            }}
            className="rounded-lg bg-background/60 border border-primary/25 px-2.5 py-1.5 text-xs text-foreground"
          >
            {SPEEDS.map((s) => <option key={s} value={s}>{s}x</option>)}
          </select>

          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> فتح في يوتيوب
          </a>
        </div>
      </div>
    </div>
  );
};

const LatestVideos = () => {
  const [openVideo, setOpenVideo] = useState<{ id: string; title: string } | null>(null);

  return (
    <section className="py-10 relative" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <Youtube className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">آخر الفيديوهات</h2>
          </div>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs bg-card/40 border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> القناة
          </a>
        </div>

        {VIDEO_IDS.length === 0 ? (
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 py-10 rounded-2xl border border-primary/15 bg-card/30 backdrop-blur-xl text-muted-foreground hover:border-primary/40 transition-colors"
          >
            <Youtube className="w-10 h-10 text-red-500" />
            <p className="text-sm">لا توجد فيديوهات مضافة بعد — تابع القناة على يوتيوب</p>
          </a>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VIDEO_IDS.map((v) => (
              <button
                key={v.id}
                onClick={() => setOpenVideo(v)}
                className="group text-right rounded-2xl overflow-hidden border border-primary/15 bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground line-clamp-2">{v.title}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {openVideo && (
        <PlayerModal videoId={openVideo.id} title={openVideo.title} onClose={() => setOpenVideo(null)} />
      )}
    </section>
  );
};

export default LatestVideos;
