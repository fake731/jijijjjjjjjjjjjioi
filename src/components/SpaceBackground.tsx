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
    const stars = Array.from({ length: 350 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.002,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.7
        ? `hsl(${200 + Math.random() * 40}, 80%, 85%)`
        : `hsl(0, 0%, ${85 + Math.random() * 15}%)`,
    }));

    // Shooting stars
    const shootingStars: Array<{
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; width: number;
    }> = [];
    let lastShoot = 0;

    const cx = () => width / 2;
    const cy = () => height / 2;
    const minDim = () => Math.min(width, height);

    // Planet definitions with realistic colors and texture bands
    const planetDefs = [
      { angle: 0, speed: 0.0006, distRatio: 0.12, size: 8, colors: ["#b5b5b5", "#8a8a8a", "#6e6e6e"], name: "mercury", hasRing: false, moons: 0, tilt: 0.03 },
      { angle: 1.5, speed: 0.00045, distRatio: 0.18, size: 11, colors: ["#e8c56d", "#d4a937", "#c99a2e"], name: "venus", hasRing: false, moons: 0, tilt: 0.05 },
      { angle: 3, speed: 0.00035, distRatio: 0.26, size: 12, colors: ["#4a90d9", "#2d6a4f", "#3a7d44"], name: "earth", hasRing: false, moons: 1, tilt: 0.41 },
      { angle: 4.2, speed: 0.00028, distRatio: 0.34, size: 10, colors: ["#c1440e", "#e07a3a", "#8b3a0f"], name: "mars", hasRing: false, moons: 2, tilt: 0.44 },
      { angle: 2, speed: 0.00015, distRatio: 0.46, size: 26, colors: ["#c88b3a", "#e3a857", "#a0722a"], name: "jupiter", hasRing: false, moons: 4, tilt: 0.05 },
      { angle: 5, speed: 0.0001, distRatio: 0.58, size: 22, colors: ["#e8d68c", "#c9a94e", "#d4b96a"], name: "saturn", hasRing: true, moons: 3, tilt: 0.47 },
      { angle: 0.5, speed: 0.00007, distRatio: 0.7, size: 16, colors: ["#7ec8e3", "#9fd5e0", "#5fb8c9"], name: "uranus", hasRing: true, moons: 2, tilt: 1.71 },
      { angle: 3.5, speed: 0.00005, distRatio: 0.82, size: 15, colors: ["#3f51b5", "#5c6bc0", "#283593"], name: "neptune", hasRing: false, moons: 1, tilt: 0.49 },
    ];

    const planets = planetDefs.map(p => ({
      ...p,
      angle: p.angle,
      moonAngles: Array.from({ length: p.moons }, () => Math.random() * Math.PI * 2),
      rotationPhase: Math.random() * Math.PI * 2,
    }));

    // Nebula clouds
    const nebulae = [
      { x: 0.2, y: 0.3, r: 0.25, h: 260, s: 50, l: 20, a: 0.025 },
      { x: 0.7, y: 0.6, r: 0.3, h: 320, s: 40, l: 15, a: 0.02 },
      { x: 0.5, y: 0.8, r: 0.2, h: 200, s: 60, l: 25, a: 0.015 },
    ];

    // Helper: draw a 3D planet with bands and shading
    const drawPlanet = (
      px: number, py: number, size: number,
      colors: string[], shadowAngle: number,
      name: string, rotPhase: number, time: number
    ) => {
      ctx.save();

      // Clip to circle
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Base gradient (3D sphere shading)
      const lightOffX = -Math.cos(shadowAngle) * size * 0.35;
      const lightOffY = -Math.sin(shadowAngle) * size * 0.35;
      const baseGrad = ctx.createRadialGradient(
        px + lightOffX, py + lightOffY, size * 0.05,
        px, py, size
      );
      baseGrad.addColorStop(0, colors[0]);
      baseGrad.addColorStop(0.5, colors[1]);
      baseGrad.addColorStop(1, colors[2]);
      ctx.fillStyle = baseGrad;
      ctx.fillRect(px - size, py - size, size * 2, size * 2);

      // Atmospheric bands (horizontal stripes for gas giants)
      if (name === "jupiter" || name === "saturn") {
        const bandCount = name === "jupiter" ? 8 : 5;
        for (let i = 0; i < bandCount; i++) {
          const bandY = py - size + (size * 2 / bandCount) * i + Math.sin(time * 0.0003 + i) * 1.5;
          const bandH = size * 2 / bandCount * 0.4;
          ctx.fillStyle = `rgba(0,0,0,${0.06 + Math.sin(i * 1.3) * 0.03})`;
          ctx.fillRect(px - size, bandY, size * 2, bandH);
        }
        // Great red spot for Jupiter
        if (name === "jupiter") {
          const spotX = px + Math.cos(rotPhase + time * 0.0004) * size * 0.3;
          const spotY = py + size * 0.2;
          ctx.beginPath();
          ctx.ellipse(spotX, spotY, size * 0.18, size * 0.12, 0.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(180,80,40,0.35)";
          ctx.fill();
        }
      }

      // Earth features
      if (name === "earth") {
        // Subtle cloud wisps
        for (let i = 0; i < 4; i++) {
          const cx2 = px + Math.cos(rotPhase + time * 0.0002 + i * 1.5) * size * 0.5;
          const cy2 = py + Math.sin(i * 2.1) * size * 0.3;
          ctx.beginPath();
          ctx.ellipse(cx2, cy2, size * 0.3, size * 0.08, i * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.15)";
          ctx.fill();
        }
      }

      // Mars surface texture
      if (name === "mars") {
        for (let i = 0; i < 3; i++) {
          const cx2 = px + Math.cos(rotPhase + i * 2) * size * 0.4;
          const cy2 = py + Math.sin(rotPhase + i * 1.5) * size * 0.3;
          ctx.beginPath();
          ctx.arc(cx2, cy2, size * 0.15, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(100,30,10,0.2)";
          ctx.fill();
        }
      }

      ctx.restore();

      // Atmosphere glow
      const glowGrad = ctx.createRadialGradient(px, py, size * 0.9, px, py, size * 1.6);
      const atmosphereColor = name === "earth" ? "100,180,255" :
        name === "venus" ? "255,200,100" :
        name === "mars" ? "255,120,60" :
        name === "neptune" ? "80,120,255" : `${parseInt(colors[0].slice(1,3),16)},${parseInt(colors[0].slice(3,5),16)},${parseInt(colors[0].slice(5,7),16)}`;
      glowGrad.addColorStop(0, `rgba(${atmosphereColor},0.12)`);
      glowGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(px, py, size * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Specular highlight (glossy reflection)
      const specGrad = ctx.createRadialGradient(
        px + lightOffX * 0.8, py + lightOffY * 0.8, 0,
        px + lightOffX * 0.8, py + lightOffY * 0.8, size * 0.5
      );
      specGrad.addColorStop(0, "rgba(255,255,255,0.18)");
      specGrad.addColorStop(0.5, "rgba(255,255,255,0.04)");
      specGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      // Terminator shadow (dark side)
      const termGrad = ctx.createRadialGradient(
        px - lightOffX * 1.5, py - lightOffY * 1.5, size * 0.2,
        px - lightOffX * 0.8, py - lightOffY * 0.8, size * 1.1
      );
      termGrad.addColorStop(0, "rgba(0,0,0,0.5)");
      termGrad.addColorStop(0.6, "rgba(0,0,0,0.2)");
      termGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = termGrad;
      ctx.fill();
    };

    // Draw rings (Saturn/Uranus style)
    const drawRings = (px: number, py: number, size: number, colors: string[], tilt: number, name: string) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(name === "uranus" ? 1.2 : 0.3);

      for (let r = 0; r < 3; r++) {
        const ringR = size * (1.6 + r * 0.35);
        const ringW = size * 0.12 - r * 0.02;
        ctx.beginPath();
        ctx.ellipse(0, 0, ringR, ringR * 0.25, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${parseInt(colors[0].slice(1,3),16)},${parseInt(colors[0].slice(3,5),16)},${parseInt(colors[0].slice(5,7),16)},${0.25 - r * 0.06})`;
        ctx.lineWidth = ringW;
        ctx.stroke();
      }

      // Ring shadow on planet
      ctx.beginPath();
      ctx.ellipse(0, size * 0.08, size * 0.9, size * 0.06, 0, 0, Math.PI);
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fill();

      ctx.restore();
    };

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
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.4,
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
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 6, ss.y - ss.vy * 6);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.stroke();
      }

      const scx = cx();
      const scy = cy();

      // Sun with realistic corona
      const sunPulse = 1 + Math.sin(time * 0.0008) * 0.04;
      const sunSize = 28 * sunPulse;

      // Solar corona layers
      for (let layer = 5; layer >= 0; layer--) {
        const r = sunSize * (2.5 + layer * 1.8);
        const a = 0.015 - layer * 0.002;
        const grad = ctx.createRadialGradient(scx, scy, sunSize * 0.5, scx, scy, r);
        grad.addColorStop(0, `rgba(255,200,50,${a})`);
        grad.addColorStop(0.4, `rgba(255,160,30,${a * 0.5})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(scx, scy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Sun surface with granulation effect
      const sunGrad = ctx.createRadialGradient(scx - sunSize * 0.15, scy - sunSize * 0.15, 0, scx, scy, sunSize);
      sunGrad.addColorStop(0, "rgba(255,255,220,0.98)");
      sunGrad.addColorStop(0.3, "rgba(255,230,120,0.9)");
      sunGrad.addColorStop(0.6, "rgba(255,190,60,0.7)");
      sunGrad.addColorStop(0.85, "rgba(255,140,30,0.4)");
      sunGrad.addColorStop(1, "rgba(255,100,10,0.0)");
      ctx.beginPath();
      ctx.arc(scx, scy, sunSize, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Orbit paths
      for (const p of planets) {
        const dist = p.distRatio * minDim();
        ctx.beginPath();
        ctx.arc(scx, scy, dist, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.02)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Planets
      for (const p of planets) {
        p.angle += p.speed;
        p.rotationPhase += 0.008;
        const dist = p.distRatio * minDim();
        const px = scx + Math.cos(p.angle) * dist;
        const py = scy + Math.sin(p.angle) * dist * 0.6; // Elliptical orbit for depth

        const shadowAngle = Math.atan2(py - scy, px - scx);

        // Draw back rings (behind planet)
        if (p.hasRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(p.name === "uranus" ? 1.2 : 0.3);
          for (let r = 0; r < 3; r++) {
            const ringR = p.size * (1.6 + r * 0.35);
            ctx.beginPath();
            ctx.ellipse(0, 0, ringR, ringR * 0.25, 0, Math.PI, Math.PI * 2);
            ctx.strokeStyle = `rgba(${parseInt(p.colors[0].slice(1,3),16)},${parseInt(p.colors[0].slice(3,5),16)},${parseInt(p.colors[0].slice(5,7),16)},${0.15 - r * 0.04})`;
            ctx.lineWidth = p.size * 0.1 - r * 0.015;
            ctx.stroke();
          }
          ctx.restore();
        }

        // Planet body
        drawPlanet(px, py, p.size, p.colors, shadowAngle, p.name, p.rotationPhase, time);

        // Front rings (in front of planet)
        if (p.hasRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(p.name === "uranus" ? 1.2 : 0.3);
          for (let r = 0; r < 3; r++) {
            const ringR = p.size * (1.6 + r * 0.35);
            ctx.beginPath();
            ctx.ellipse(0, 0, ringR, ringR * 0.25, 0, 0, Math.PI);
            ctx.strokeStyle = `rgba(${parseInt(p.colors[0].slice(1,3),16)},${parseInt(p.colors[0].slice(3,5),16)},${parseInt(p.colors[0].slice(5,7),16)},${0.2 - r * 0.05})`;
            ctx.lineWidth = p.size * 0.1 - r * 0.015;
            ctx.stroke();
          }
          ctx.restore();
        }

        // Moons
        for (let m = 0; m < p.moonAngles.length; m++) {
          p.moonAngles[m] += 0.003 + m * 0.0015;
          const moonDist = p.size * 2 + m * p.size * 0.7;
          const mx = px + Math.cos(p.moonAngles[m]) * moonDist;
          const my = py + Math.sin(p.moonAngles[m]) * moonDist * 0.5;
          const moonSize = Math.max(1.5, p.size * 0.1);

          // Moon with mini 3D shading
          const mGrad = ctx.createRadialGradient(mx - moonSize * 0.3, my - moonSize * 0.3, 0, mx, my, moonSize);
          mGrad.addColorStop(0, "rgba(220,220,235,0.9)");
          mGrad.addColorStop(0.7, "rgba(160,160,180,0.7)");
          mGrad.addColorStop(1, "rgba(80,80,100,0.5)");
          ctx.beginPath();
          ctx.arc(mx, my, moonSize, 0, Math.PI * 2);
          ctx.fillStyle = mGrad;
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
      style={{ opacity: 0.75 }}
    />
  );
};

export default SpaceBackground;
