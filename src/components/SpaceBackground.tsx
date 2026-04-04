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

    // Stars - more varied
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.002,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.7 ? `hsl(${200 + Math.random() * 40}, 80%, 85%)` : `hsl(0, 0%, ${85 + Math.random() * 15}%)`,
    }));

    // Shooting stars
    const shootingStars: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number; width: number }> = [];
    let lastShoot = 0;

    // Realistic planets with textures
    const cx = () => width / 2;
    const cy = () => height / 2;
    const minDim = () => Math.min(width, height);

    const planetDefs = [
      { angle: 0, speed: 0.00025, distRatio: 0.15, size: 16, baseColor: [79, 195, 247], name: "mercury", hasRing: false, moons: 0 },
      { angle: 1.5, speed: 0.00018, distRatio: 0.22, size: 12, baseColor: [255, 183, 77], name: "venus", hasRing: false, moons: 0 },
      { angle: 3, speed: 0.00012, distRatio: 0.32, size: 18, baseColor: [76, 175, 80], name: "earth", hasRing: false, moons: 1 },
      { angle: 4.2, speed: 0.0001, distRatio: 0.4, size: 14, baseColor: [244, 67, 54], name: "mars", hasRing: false, moons: 2 },
      { angle: 2, speed: 0.00006, distRatio: 0.52, size: 28, baseColor: [255, 152, 0], name: "jupiter", hasRing: false, moons: 3 },
      { angle: 5, speed: 0.00004, distRatio: 0.64, size: 24, baseColor: [255, 193, 7], name: "saturn", hasRing: true, moons: 2 },
      { angle: 0.5, speed: 0.00003, distRatio: 0.76, size: 18, baseColor: [0, 188, 212], name: "uranus", hasRing: true, moons: 1 },
      { angle: 3.5, speed: 0.00002, distRatio: 0.86, size: 17, baseColor: [63, 81, 181], name: "neptune", hasRing: false, moons: 1 },
    ];

    const planets = planetDefs.map(p => ({
      ...p,
      angle: p.angle,
      moonAngles: Array.from({ length: p.moons }, () => Math.random() * Math.PI * 2),
    }));

    // Nebula clouds
    const nebulae = [
      { x: 0.2, y: 0.3, r: 0.25, h: 260, s: 50, l: 20, a: 0.03 },
      { x: 0.7, y: 0.6, r: 0.3, h: 320, s: 40, l: 15, a: 0.025 },
      { x: 0.5, y: 0.8, r: 0.2, h: 200, s: 60, l: 25, a: 0.02 },
    ];

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Nebulae
      for (const n of nebulae) {
        const nx = n.x * width;
        const ny = n.y * height;
        const nr = n.r * width;
        const breathe = 1 + Math.sin(time * 0.0003) * 0.05;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * breathe);
        grad.addColorStop(0, `hsla(${n.h}, ${n.s}%, ${n.l}%, ${n.a})`);
        grad.addColorStop(0.5, `hsla(${n.h + 20}, ${n.s - 10}%, ${n.l - 5}%, ${n.a * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Stars
      for (const star of stars) {
        const opacity = 0.3 + 0.7 * Math.abs(Math.sin(time * star.twinkleSpeed + star.phase));
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
        if (star.r > 1.4) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,220,255,${opacity * 0.08})`;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // Shooting stars
      if (time - lastShoot > 3000 + Math.random() * 5000) {
        lastShoot = time;
        const startX = Math.random() * width;
        const startY = Math.random() * height * 0.4;
        shootingStars.push({
          x: startX, y: startY,
          vx: (Math.random() - 0.3) * 10,
          vy: Math.random() * 5 + 3,
          life: 0, maxLife: 35 + Math.random() * 25,
          width: Math.random() * 1.5 + 0.8,
        });
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx; ss.y += ss.vy; ss.life++;
        const alpha = 1 - ss.life / ss.maxLife;
        if (alpha <= 0) { shootingStars.splice(i, 1); continue; }
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * 6, ss.y - ss.vy * 6);
        grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.8})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 6, ss.y - ss.vy * 6);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.stroke();
      }

      const scx = cx();
      const scy = cy();

      // Sun
      const sunPulse = 1 + Math.sin(time * 0.0008) * 0.06;
      const sunSize = 26 * sunPulse;

      // Corona
      for (let layer = 4; layer >= 0; layer--) {
        const r = sunSize * (2 + layer * 1.5);
        const a = 0.02 - layer * 0.003;
        const grad = ctx.createRadialGradient(scx, scy, sunSize * 0.5, scx, scy, r);
        grad.addColorStop(0, `rgba(255,200,50,${a})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(scx, scy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Sun core
      const sunGrad = ctx.createRadialGradient(scx - sunSize * 0.2, scy - sunSize * 0.2, 0, scx, scy, sunSize);
      sunGrad.addColorStop(0, "rgba(255,250,200,0.95)");
      sunGrad.addColorStop(0.4, "rgba(255,220,100,0.85)");
      sunGrad.addColorStop(0.7, "rgba(255,180,50,0.5)");
      sunGrad.addColorStop(1, "rgba(255,150,30,0.0)");
      ctx.beginPath();
      ctx.arc(scx, scy, sunSize, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Orbit lines
      for (const p of planets) {
        const dist = p.distRatio * minDim();
        ctx.beginPath();
        ctx.arc(scx, scy, dist, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.025)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Planets
      for (const p of planets) {
        p.angle += p.speed;
        const dist = p.distRatio * minDim();
        const px = scx + Math.cos(p.angle) * dist;
        const py = scy + Math.sin(p.angle) * dist;

        // Shadow direction from sun
        const shadowAngle = Math.atan2(py - scy, px - scx);

        // Glow
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3.5);
        glowGrad.addColorStop(0, `rgba(${p.baseColor.join(",")},0.15)`);
        glowGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Ring (Saturn/Uranus)
        if (p.hasRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(p.name === "uranus" ? 1.2 : 0.3);
          ctx.scale(1, 0.3);
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${p.baseColor.join(",")},0.2)`;
          ctx.lineWidth = 3;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${p.baseColor.join(",")},0.1)`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }

        // Planet body with 3D shading
        const lightX = px - Math.cos(shadowAngle) * p.size * 0.4;
        const lightY = py - Math.sin(shadowAngle) * p.size * 0.4;
        const pGrad = ctx.createRadialGradient(lightX, lightY, 0, px, py, p.size);
        const [r, g, b] = p.baseColor;
        pGrad.addColorStop(0, `rgba(${Math.min(255, r + 60)},${Math.min(255, g + 60)},${Math.min(255, b + 60)},1)`);
        pGrad.addColorStop(0.6, `rgba(${r},${g},${b},1)`);
        pGrad.addColorStop(1, `rgba(${Math.max(0, r - 80)},${Math.max(0, g - 80)},${Math.max(0, b - 80)},1)`);
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.fill();

        // Moons
        for (let m = 0; m < p.moonAngles.length; m++) {
          p.moonAngles[m] += 0.002 + m * 0.001;
          const moonDist = p.size * 2.2 + m * p.size * 0.8;
          const mx = px + Math.cos(p.moonAngles[m]) * moonDist;
          const my = py + Math.sin(p.moonAngles[m]) * moonDist * 0.5;
          ctx.beginPath();
          ctx.arc(mx, my, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(200,200,220,0.6)";
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
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
      style={{ opacity: 0.7 }}
    />
  );
};

export default SpaceBackground;
