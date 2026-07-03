import { useEffect, useState } from "react";

/**
 * Detects low-power / low-end devices and users who prefer reduced motion.
 * Used to automatically disable heavy background effects for smoother UX.
 */
export function useLowPowerDevice() {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    try {
      const nav = navigator as any;
      const cores = nav.hardwareConcurrency || 8;
      const mem = nav.deviceMemory || 8;
      const saveData = !!(nav.connection && nav.connection.saveData);
      const slowNet = nav.connection && /2g|slow-2g/i.test(nav.connection.effectiveType || "");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setLowPower(cores <= 4 || mem <= 4 || saveData || slowNet || reduce);
    } catch {
      setLowPower(false);
    }
  }, []);

  return lowPower;
}