import { useEffect, useRef } from "react";

/**
 * Soft cyber glow that follows the cursor across the page.
 * Fixed-position blurred orb — purely decorative, pointer-events disabled.
 */
const MagneticCursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx - 200}px, ${cy - 200}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] w-[400px] h-[400px] rounded-full opacity-50 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, hsl(var(--primary) / 0.06) 35%, transparent 65%)",
        filter: "blur(28px)",
        willChange: "transform",
      }}
    />
  );
};

export default MagneticCursorGlow;