import { useEffect, useRef } from "react";

/**
 * Random cinematic shooting stars across the viewport.
 * Pure CSS streaks; respects prefers-reduced-motion.
 */
const ShootingStars = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const host = ref.current;
    if (!host) return;

    let alive = true;
    const spawn = () => {
      if (!alive || !host) return;
      const star = document.createElement("span");
      star.className = "shooting-star";
      const top = Math.random() * 60;
      const left = 60 + Math.random() * 40;
      const duration = 1100 + Math.random() * 900;
      const angle = -18 - Math.random() * 14;
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.setProperty("--angle", `${angle}deg`);
      star.style.animationDuration = `${duration}ms`;
      host.appendChild(star);
      setTimeout(() => star.remove(), duration + 100);
      setTimeout(spawn, 2200 + Math.random() * 4200);
    };
    const t = setTimeout(spawn, 1500);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  return <div ref={ref} aria-hidden className="shooting-stars-host" />;
};

export default ShootingStars;