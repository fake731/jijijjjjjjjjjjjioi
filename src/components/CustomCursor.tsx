import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        cursor.style.opacity = "1";
        visible.current = true;
      }
      cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    };

    const onLeave = () => {
      cursor.style.opacity = "0";
      visible.current = false;
    };

    const onEnter = () => {
      cursor.style.opacity = "1";
      visible.current = true;
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: "2px solid hsl(var(--primary))",
        boxShadow: "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)",
        opacity: 0,
        transition: "opacity 0.15s ease",
        willChange: "transform",
      }}
    />
  );
};

export default CustomCursor;
