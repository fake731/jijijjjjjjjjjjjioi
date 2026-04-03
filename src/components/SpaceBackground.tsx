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
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.003,
      phase: Math.random() * Math.PI * 2,
    }));

    // Shooting stars
    const shootingStars: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }> = [];
    let lastShoot = 0;

    // Planets
    const planets = [
      { angle: 0, speed: 0.0003, dist: Math.min(width, height) * 0.18, size: 14, color: "#4fc3f7", glowColor: "rgba(79,195,247,0.25)", ringColor: "rgba(79,195,247,0.15)", hasRing: false },
      { angle: 2, speed: 0.0005, dist: Math.min(width, height) * 0.3, size: 9, color: "#ab47bc", glowColor: "rgba(171,71,188,0.25)", ringColor: "rgba(171,71,188,0.15)", hasRing: true },
      { angle: 4, speed: 0.0002, dist: Math.min(width, height) * 0.42, size: 20, color: "#ff7043", glowColor: "rgba(255,112,67,0.2)", ringColor: "rgba(255,112,67,0.12)", hasRing: true },
      { angle: 1, speed: 0.0007, dist: Math.min(width, height) * 0.12, size: 6, color: "#66bb6a", glowColor: "rgba(102,187,106,0.25)", ringColor: "", hasRing: false },
      { angle: 3, speed: 0.00015, dist: Math.min(width, height) * 0.5, size: 10, color: "#42a5f5", glowColor: "rgba(66,165,245,0.2)", ringColor: "", hasRing: false },
    ];

    const cx = width / 2;
    const cy = height / 2;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Nebula effect (subtle)
      const nebulaGrad = ctx.createRadialGradient(width * 0.3, height * 0.4, 0, width * 0.3, height * 0.4, width * 0.4);
      nebulaGrad.addColorStop(0, "rgba(100, 50, 180, 0.03)");
      nebulaGrad.addColorStop(0.5, "rgba(50, 100, 200, 0.02)");
      nebulaGrad.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // Stars
      for (const star of stars) {
        const opacity = 0.2 + 0.8 * Math.abs(Math.sin(time * star.twinkleSpeed + star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();

        // Larger stars get a subtle glow
        if (star.r > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,220,255,${opacity * 0.1})`;
          ctx.fill();
        }
      }

      // Shooting stars
      if (time - lastShoot > 4000 + Math.random() * 6000) {
        lastShoot = time;
        const startX = Math.random() * width;
        const startY = Math.random() * height * 0.5;
        shootingStars.push({
          x: startX, y: startY,
          vx: (Math.random() - 0.3) * 8,
          vy: Math.random() * 4 + 2,
          life: 0, maxLife: 40 + Math.random() * 30,
        });
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
        const alpha = 1 - ss.life / ss.maxLife;
        if (alpha <= 0) { shootingStars.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 5, ss.y - ss.vy * 5);
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Sun (center glow)
      const sunX = cx;
      const sunY = cy;
      const sunPulse = 1 + Math.sin(time * 0.001) * 0.05;
      const sunSize = 22 * sunPulse;

      // Outer glow
      const sunGlow3 = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize * 6);
      sunGlow3.addColorStop(0, "rgba(255,200,50,0.06)");
      sunGlow3.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize * 6, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow3;
      ctx.fill();

      // Mid glow
      const sunGlow2 = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize * 3);
      sunGlow2.addColorStop(0, "rgba(255,180,50,0.15)");
      sunGlow2.addColorStop(0.5, "rgba(255,150,30,0.05)");
      sunGlow2.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize * 3, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow2;
      ctx.fill();

      // Core
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize);
      sunGlow.addColorStop(0, "rgba(255,230,100,0.9)");
      sunGlow.addColorStop(0.6, "rgba(255,180,50,0.5)");
      sunGlow.addColorStop(1, "rgba(255,150,30,0.0)");
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // Orbit lines (faint)
      for (const p of planets) {
        ctx.beginPath();
        ctx.arc(cx, cy, p.dist, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
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

        // Ring
        if (p.hasRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1, 0.3);
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.strokeStyle = p.ringColor;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }

        // Planet body with gradient
        const pgGrad = ctx.createRadialGradient(px - p.size * 0.3, py - p.size * 0.3, 0, px, py, p.size);
        pgGrad.addColorStop(0, p.color);
        pgGrad.addColorStop(1, `${p.color}88`);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = pgGrad;
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
      // Reposition stars
      stars.forEach(star => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      });
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
      style={{ opacity: 0.65 }}
    />
  );
};

export default SpaceBackground;
