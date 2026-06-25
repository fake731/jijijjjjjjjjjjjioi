import { useCallback, useRef } from "react";

/**
 * Lightweight 3D tilt + spotlight hook.
 * Attach the returned handlers to any element styled with `.glass-interactive`.
 */
export const useTilt = (maxTilt = 6) => {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const tiltY = (px - 0.5) * (maxTilt * 2);
      const tiltX = (0.5 - py) * (maxTilt * 2);
      el.style.setProperty("--tilt-x", `${tiltX}deg`);
      el.style.setProperty("--tilt-y", `${tiltY}deg`);
      el.style.setProperty("--spot-x", `${px * 100}%`);
      el.style.setProperty("--spot-y", `${py * 100}%`);
      el.style.setProperty("--spot-opacity", "1");
    },
    [maxTilt]
  );

  const onMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--spot-opacity", "0");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};