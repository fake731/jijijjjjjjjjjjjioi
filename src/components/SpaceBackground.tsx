import { useEffect, useRef } from "react";

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    // Planets
    const planets = [
      { angle: 0, speed: 0.0003, dist: Math.min(width, height) * 0.18, size: 12, color: "#4fc3f7", glowColor: "rgba(79,195,247,0.3)" },
      { angle: 2, speed: 0.0005, dist: Math.min(width, height) * 0.3, size: 8, color: "#ab47bc", glowColor: "rgba(171,71,188,0.3)" },
      { angle: 4, speed: 0.0002, dist: Math.min(width, height) * 0.42, size: 18, color: "#ff7043", glowColor: "rgba(255,112,67,0.25)" },
      { angle: 1, speed: 0.0007, dist: Math.min(width, height) * 0.12, size: 5, color: "#66bb6a", glowColor: "rgba(102,187,106,0.3)" },
    ];

    const cx = width / 2;
    const cy = height / 2;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Stars
      for (const star of stars) {
        const opacity = 0.3 + 0.7 * Math.abs(Math.sin(time * star.twinkleSpeed + star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      // Planets
      for (const p of planets) {
        p.angle += p.speed;
        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * p.dist;

        // Glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
        gradient.addColorStop(0, p.glowColor);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Planet
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default SpaceBackground;
