import { useEffect, useState } from "react";

/**
 * Global "pause animations" switch. Persisted in localStorage and exposed as:
 *  - useAnimationsPaused(): reactive hook
 *  - animationsPausedRef / subscribeAnimationsPaused(): non-reactive access for
 *    canvas render loops (SpaceBackground) that must not re-render on toggle.
 *  - toggleAnimationsPaused(): flip the switch.
 * When paused, a `animations-paused` class is set on <html>, and index.css
 * pauses every CSS animation site-wide for a lag-free experience.
 */

const STORAGE_KEY = "qk-animations-paused";

const readInitial = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const applyClass = (paused: boolean) => {
  try {
    document.documentElement.classList.toggle("animations-paused", paused);
  } catch { /* noop */ }
};

let current = readInitial();
applyClass(current);

const listeners = new Set<(v: boolean) => void>();

export const getAnimationsPaused = () => current;

export const subscribeAnimationsPaused = (cb: (v: boolean) => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const toggleAnimationsPaused = () => {
  current = !current;
  try {
    localStorage.setItem(STORAGE_KEY, current ? "1" : "0");
  } catch { /* noop */ }
  applyClass(current);
  listeners.forEach((cb) => cb(current));
};

/** Reactive hook for UI toggles and conditional rendering of heavy overlays. */
export function useAnimationsPaused() {
  const [paused, setPaused] = useState(current);

  useEffect(() => {
    setPaused(current);
    return subscribeAnimationsPaused(setPaused);
  }, []);

  return paused;
}
