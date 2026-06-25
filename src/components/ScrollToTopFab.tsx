import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopFab = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="العودة للأعلى"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center
        glass-strong glass-interactive glow-border
        text-primary transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopFab;