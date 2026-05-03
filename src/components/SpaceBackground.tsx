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

    // Stars with color variety
    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.2,
      twinkleSpeed: Math.random() * 0.012 + 0.002,
      phase: Math.random() * Math.PI * 2,
      color: (() => {
        const rnd = Math.random();
        if (rnd < 0.15) return `hsl(${30 + Math.random() * 20}, 90%, 85%)`;  // warm
        if (rnd < 0.3) return `hsl(${200 + Math.random() * 40}, 80%, 88%)`;  // blue
        return `hsl(0, 0%, ${82 + Math.random() * 18}%)`;
      })(),
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

    // Realistic planet textures using offscreen canvases
    interface PlanetDef {
      angle: number; speed: number; distRatio: number; size: number;
      colors: string[]; name: string; hasRing: boolean; moons: number;
      tilt: number; moonAngles: number[]; rotationPhase: number;
      eccentricity: number; inclination: number;
    }

    const planetDefs: Omit<PlanetDef, 'moonAngles' | 'rotationPhase'>[] = [
      { angle: 0, speed: 0.0040, distRatio: 0.10, size: 6, colors: ["#b5b5b5", "#8a8a8a", "#5e5e5e"], name: "mercury", hasRing: false, moons: 0, tilt: 0.03, eccentricity: 0.2, inclination: 0.12 },
      { angle: 1.5, speed: 0.0030, distRatio: 0.16, size: 10, colors: ["#e8c56d", "#d4a937", "#b88a20"], name: "venus", hasRing: false, moons: 0, tilt: 0.05, eccentricity: 0.01, inclination: 0.06 },
      { angle: 3, speed: 0.0022, distRatio: 0.23, size: 11, colors: ["#4a90d9", "#2d6a4f", "#3a7d44"], name: "earth", hasRing: false, moons: 1, tilt: 0.41, eccentricity: 0.017, inclination: 0 },
      { angle: 4.2, speed: 0.0017, distRatio: 0.31, size: 9, colors: ["#c1440e", "#e07a3a", "#8b3a0f"], name: "mars", hasRing: false, moons: 2, tilt: 0.44, eccentricity: 0.09, inclination: 0.03 },
      { angle: 2, speed: 0.0009, distRatio: 0.43, size: 24, colors: ["#c88b3a", "#e3a857", "#a0722a"], name: "jupiter", hasRing: false, moons: 4, tilt: 0.05, eccentricity: 0.05, inclination: 0.02 },
      { angle: 5, speed: 0.0006, distRatio: 0.56, size: 20, colors: ["#e8d68c", "#c9a94e", "#d4b96a"], name: "saturn", hasRing: true, moons: 3, tilt: 0.47, eccentricity: 0.06, inclination: 0.04 },
      { angle: 0.5, speed: 0.0004, distRatio: 0.69, size: 14, colors: ["#7ec8e3", "#9fd5e0", "#5fb8c9"], name: "uranus", hasRing: true, moons: 2, tilt: 1.71, eccentricity: 0.05, inclination: 0.01 },
      { angle: 3.5, speed: 0.00028, distRatio: 0.80, size: 13, colors: ["#3f51b5", "#5c6bc0", "#283593"], name: "neptune", hasRing: false, moons: 1, tilt: 0.49, eccentricity: 0.01, inclination: 0.03 },
    ];

    const planets: PlanetDef[] = planetDefs.map(p => ({
      ...p,
      moonAngles: Array.from({ length: p.moons }, () => Math.random() * Math.PI * 2),
      rotationPhase: Math.random() * Math.PI * 2,
    }));

    // Nebulae
    const nebulae = [
      { x: 0.15, y: 0.25, r: 0.22, h: 260, s: 45, l: 18, a: 0.02 },
      { x: 0.75, y: 0.55, r: 0.28, h: 320, s: 35, l: 14, a: 0.018 },
      { x: 0.45, y: 0.85, r: 0.18, h: 200, s: 55, l: 22, a: 0.012 },
    ];

    // Pre-render planet textures for performance
    const planetTextures = new Map<string, HTMLCanvasElement>();

    const createPlanetTexture = (name: string, size: number, colors: string[]) => {
      const s = size * 4; // higher res
      const offscreen = document.createElement("canvas");
      offscreen.width = s * 2;
      offscreen.height = s * 2;
      const oc = offscreen.getContext("2d");
      if (!oc) return offscreen;

      const cx2 = s;
      const cy2 = s;

      // Base sphere gradient
      const baseGrad = oc.createRadialGradient(cx2 - s * 0.2, cy2 - s * 0.2, s * 0.05, cx2, cy2, s);
      baseGrad.addColorStop(0, colors[0]);
      baseGrad.addColorStop(0.55, colors[1]);
      baseGrad.addColorStop(1, colors[2]);

      oc.beginPath();
      oc.arc(cx2, cy2, s, 0, Math.PI * 2);
      oc.fillStyle = baseGrad;
      oc.fill();

      // Surface details by planet type
      if (name === "jupiter") {
        // Horizontal bands
        oc.save();
        oc.beginPath();
        oc.arc(cx2, cy2, s, 0, Math.PI * 2);
        oc.clip();
        for (let i = 0; i < 12; i++) {
          const y = cy2 - s + (s * 2 / 12) * i;
          const h = s * 2 / 12 * 0.35;
          oc.fillStyle = `rgba(${i % 2 === 0 ? '160,100,40' : '80,50,20'},${0.12 + Math.sin(i * 1.5) * 0.04})`;
          oc.fillRect(cx2 - s, y, s * 2, h);
        }
        // Great Red Spot
        oc.beginPath();
        oc.ellipse(cx2 + s * 0.25, cy2 + s * 0.18, s * 0.22, s * 0.14, 0.15, 0, Math.PI * 2);
        const grsGrad = oc.createRadialGradient(cx2 + s * 0.25, cy2 + s * 0.18, 0, cx2 + s * 0.25, cy2 + s * 0.18, s * 0.2);
        grsGrad.addColorStop(0, "rgba(200,80,30,0.5)");
        grsGrad.addColorStop(0.6, "rgba(180,70,25,0.3)");
        grsGrad.addColorStop(1, "rgba(160,60,20,0.1)");
        oc.fillStyle = grsGrad;
        oc.fill();
        oc.restore();
      }

      if (name === "saturn") {
        oc.save();
        oc.beginPath();
        oc.arc(cx2, cy2, s, 0, Math.PI * 2);
        oc.clip();
        for (let i = 0; i < 8; i++) {
          const y = cy2 - s + (s * 2 / 8) * i;
          oc.fillStyle = `rgba(${i % 2 === 0 ? '180,150,80' : '140,110,50'},${0.1})`;
          oc.fillRect(cx2 - s, y, s * 2, s * 2 / 8 * 0.3);
        }
        oc.restore();
      }

      if (name === "earth") {
        oc.save();
        oc.beginPath();
        oc.arc(cx2, cy2, s, 0, Math.PI * 2);
        oc.clip();
        // Continents (simplified)
        const continents = [
          { x: 0.3, y: 0.35, rx: 0.2, ry: 0.15 },
          { x: 0.6, y: 0.4, rx: 0.18, ry: 0.25 },
          { x: 0.45, y: 0.7, rx: 0.12, ry: 0.1 },
        ];
        for (const c of continents) {
          oc.beginPath();
          oc.ellipse(cx2 - s + s * 2 * c.x, cy2 - s + s * 2 * c.y, s * c.rx, s * c.ry, 0.3, 0, Math.PI * 2);
          oc.fillStyle = "rgba(45,106,79,0.4)";
          oc.fill();
        }
        // Clouds
        for (let i = 0; i < 5; i++) {
          oc.beginPath();
          oc.ellipse(cx2 + Math.cos(i * 1.3) * s * 0.5, cy2 + Math.sin(i * 2.1) * s * 0.3, s * 0.28, s * 0.06, i * 0.4, 0, Math.PI * 2);
          oc.fillStyle = "rgba(255,255,255,0.12)";
          oc.fill();
        }
        oc.restore();
      }

      if (name === "mars") {
        oc.save();
        oc.beginPath();
        oc.arc(cx2, cy2, s, 0, Math.PI * 2);
        oc.clip();
        // Craters
        const craters = [
          { x: 0.3, y: 0.4, r: 0.12 },
          { x: 0.6, y: 0.3, r: 0.08 },
          { x: 0.5, y: 0.65, r: 0.15 },
          { x: 0.7, y: 0.6, r: 0.06 },
        ];
        for (const c of craters) {
          oc.beginPath();
          oc.arc(cx2 - s + s * 2 * c.x, cy2 - s + s * 2 * c.y, s * c.r, 0, Math.PI * 2);
          oc.fillStyle = "rgba(100,30,10,0.2)";
          oc.fill();
        }
        // Polar ice cap
        oc.beginPath();
        oc.ellipse(cx2, cy2 - s * 0.85, s * 0.3, s * 0.1, 0, 0, Math.PI * 2);
        oc.fillStyle = "rgba(255,255,255,0.2)";
        oc.fill();
        oc.restore();
      }

      if (name === "neptune" || name === "uranus") {
        oc.save();
        oc.beginPath();
        oc.arc(cx2, cy2, s, 0, Math.PI * 2);
        oc.clip();
        for (let i = 0; i < 4; i++) {
          const y = cy2 - s + (s * 2 / 4) * i + s * 0.1;
          oc.fillStyle = `rgba(255,255,255,${0.04 + i * 0.01})`;
          oc.fillRect(cx2 - s, y, s * 2, s * 0.08);
        }
        oc.restore();
      }

      // 3D specular highlight
      const specGrad = oc.createRadialGradient(cx2 - s * 0.3, cy2 - s * 0.3, 0, cx2 - s * 0.3, cy2 - s * 0.3, s * 0.6);
      specGrad.addColorStop(0, "rgba(255,255,255,0.25)");
      specGrad.addColorStop(0.4, "rgba(255,255,255,0.06)");
      specGrad.addColorStop(1, "transparent");
      oc.beginPath();
      oc.arc(cx2, cy2, s, 0, Math.PI * 2);
      oc.fillStyle = specGrad;
      oc.fill();

      // Terminator (dark side)
      const termGrad = oc.createRadialGradient(cx2 + s * 0.5, cy2 + s * 0.3, s * 0.1, cx2 + s * 0.3, cy2 + s * 0.2, s * 1.2);
      termGrad.addColorStop(0, "rgba(0,0,0,0.55)");
      termGrad.addColorStop(0.5, "rgba(0,0,0,0.25)");
      termGrad.addColorStop(1, "transparent");
      oc.beginPath();
      oc.arc(cx2, cy2, s, 0, Math.PI * 2);
      oc.fillStyle = termGrad;
      oc.fill();

      return offscreen;
    };

    // Generate textures
    for (const p of planets) {
      planetTextures.set(p.name, createPlanetTexture(p.name, p.size, p.colors));
    }

    const drawRings = (px: number, py: number, size: number, colors: string[], tiltAngle: number, front: boolean) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(0.35);

      const arcStart = front ? 0 : Math.PI;
      const arcEnd = front ? Math.PI : Math.PI * 2;

      for (let r = 0; r < 4; r++) {
        const ringR = size * (1.5 + r * 0.3);
        const ringW = size * (0.12 - r * 0.02);
        const alpha = 0.3 - r * 0.06;
        ctx.beginPath();
        ctx.ellipse(0, 0, ringR, ringR * 0.22, 0, arcStart, arcEnd);
        ctx.strokeStyle = `rgba(${parseInt(colors[0].slice(1,3),16)},${parseInt(colors[0].slice(3,5),16)},${parseInt(colors[0].slice(5,7),16)},${alpha})`;
        ctx.lineWidth = ringW;
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient background
      const bgGrad = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, "rgba(8,8,20,0.03)");
      bgGrad.addColorStop(1, "transparent");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Nebulae
      for (const n of nebulae) {
        const nx = n.x * width;
        const ny = n.y * height;
        const nr = n.r * Math.max(width, height) * 0.5;
        const breathe = 1 + Math.sin(time * 0.00025 + n.h) * 0.06;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * breathe);
        grad.addColorStop(0, `hsla(${n.h}, ${n.s}%, ${n.l}%, ${n.a})`);
        grad.addColorStop(0.4, `hsla(${n.h + 15}, ${n.s - 10}%, ${n.l - 3}%, ${n.a * 0.5})`);
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
        if (star.r > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,220,255,${opacity * 0.06})`;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // Shooting stars
      if (time - lastShoot > 4000 + Math.random() * 6000) {
        lastShoot = time;
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.35,
          vx: (Math.random() - 0.3) * 12,
          vy: Math.random() * 6 + 3,
          life: 0, maxLife: 30 + Math.random() * 20,
          width: Math.random() * 1.5 + 0.8,
        });
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx; ss.y += ss.vy; ss.life++;
        const alpha = 1 - ss.life / ss.maxLife;
        if (alpha <= 0) { shootingStars.splice(i, 1); continue; }
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * 8, ss.y - ss.vy * 8);
        grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.9})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 8, ss.y - ss.vy * 8);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.stroke();
      }

      const scx = cx();
      const scy = cy();

      // Sun with detailed corona
      const sunPulse = 1 + Math.sin(time * 0.0006) * 0.03;
      const sunSize = 26 * sunPulse;

      // Multi-layer corona
      for (let layer = 6; layer >= 0; layer--) {
        const r = sunSize * (2 + layer * 1.5);
        const a = 0.012 - layer * 0.0015;
        const grad = ctx.createRadialGradient(scx, scy, sunSize * 0.3, scx, scy, r);
        grad.addColorStop(0, `rgba(255,210,60,${a})`);
        grad.addColorStop(0.3, `rgba(255,170,40,${a * 0.6})`);
        grad.addColorStop(0.7, `rgba(255,120,20,${a * 0.3})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(scx, scy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Sun surface
      const sunGrad = ctx.createRadialGradient(scx - sunSize * 0.12, scy - sunSize * 0.12, 0, scx, scy, sunSize);
      sunGrad.addColorStop(0, "rgba(255,255,230,0.98)");
      sunGrad.addColorStop(0.25, "rgba(255,235,130,0.92)");
      sunGrad.addColorStop(0.5, "rgba(255,200,70,0.75)");
      sunGrad.addColorStop(0.8, "rgba(255,150,30,0.4)");
      sunGrad.addColorStop(1, "rgba(255,100,10,0.0)");
      ctx.beginPath();
      ctx.arc(scx, scy, sunSize, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Solar flares (dynamic)
      for (let f = 0; f < 5; f++) {
        const flareAngle = time * 0.0002 + f * Math.PI * 0.4;
        const flareLen = sunSize * (0.3 + Math.sin(time * 0.001 + f * 2) * 0.15);
        const fx = scx + Math.cos(flareAngle) * (sunSize + flareLen * 0.3);
        const fy = scy + Math.sin(flareAngle) * (sunSize + flareLen * 0.3);
        const fGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, flareLen);
        fGrad.addColorStop(0, "rgba(255,200,100,0.12)");
        fGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(fx, fy, flareLen, 0, Math.PI * 2);
        ctx.fillStyle = fGrad;
        ctx.fill();
      }

      // Orbit paths (subtle ellipses)
      for (const p of planets) {
        const dist = p.distRatio * minDim();
        ctx.beginPath();
        ctx.ellipse(scx, scy, dist, dist * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.025)";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 12]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Sort planets by Y position for depth ordering
      const planetPositions = planets.map(p => {
        p.angle += p.speed;
        p.rotationPhase += 0.006;
        const dist = p.distRatio * minDim();
        const ecc = p.eccentricity;
        const r = dist * (1 - ecc * ecc) / (1 + ecc * Math.cos(p.angle));
        const px = scx + Math.cos(p.angle) * r;
        const py = scy + Math.sin(p.angle) * r * 0.55;
        return { ...p, px, py, dist };
      });

      planetPositions.sort((a, b) => a.py - b.py);

      for (const p of planetPositions) {
        const { px, py } = p;
        const texture = planetTextures.get(p.name);

        // Draw back rings
        if (p.hasRing) {
          drawRings(px, py, p.size, p.colors, p.tilt, false);
        }

        // Atmosphere glow
        const atmColor = p.name === "earth" ? "100,180,255" :
          p.name === "venus" ? "255,200,100" :
          p.name === "mars" ? "255,120,60" :
          p.name === "neptune" ? "80,120,255" :
          p.name === "uranus" ? "130,210,230" :
          p.name === "jupiter" ? "200,160,80" :
          "180,180,200";
        const atmGrad = ctx.createRadialGradient(px, py, p.size * 0.85, px, py, p.size * 1.8);
        atmGrad.addColorStop(0, `rgba(${atmColor},0.1)`);
        atmGrad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, p.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = atmGrad;
        ctx.fill();

        // Draw planet from pre-rendered texture
        if (texture) {
          ctx.drawImage(texture, px - p.size, py - p.size, p.size * 2, p.size * 2);
        }

        // Front rings
        if (p.hasRing) {
          drawRings(px, py, p.size, p.colors, p.tilt, true);
        }

        // Moons with orbital motion
        for (let m = 0; m < p.moonAngles.length; m++) {
          p.moonAngles[m] += 0.004 + m * 0.002;
          const moonDist = p.size * (1.8 + m * 0.6);
          const mx = px + Math.cos(p.moonAngles[m]) * moonDist;
          const my = py + Math.sin(p.moonAngles[m]) * moonDist * 0.45;
          const moonSize = Math.max(1.2, p.size * 0.09);

          const mGrad = ctx.createRadialGradient(mx - moonSize * 0.3, my - moonSize * 0.3, 0, mx, my, moonSize);
          mGrad.addColorStop(0, "rgba(230,230,240,0.9)");
          mGrad.addColorStop(0.6, "rgba(170,170,190,0.7)");
          mGrad.addColorStop(1, "rgba(90,90,110,0.5)");
          ctx.beginPath();
          ctx.arc(mx, my, moonSize, 0, Math.PI * 2);
          ctx.fillStyle = mGrad;
          ctx.fill();
        }
      }

      // Watermark "Qusay"
      ctx.save();
      ctx.globalAlpha = 0.04;
      ctx.font = `bold ${minDim() * 0.15}px monospace`;
      ctx.fillStyle = "#8b5cf6";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.translate(cx(), cy());
      ctx.rotate(-0.2);
      ctx.fillText("Qusay", 0, 0);
      ctx.restore();

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
      // Re-generate textures on resize
      for (const p of planets) {
        planetTextures.set(p.name, createPlanetTexture(p.name, p.size, p.colors));
      }
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
      style={{ opacity: 0.8 }}
    />
  );
};

export default SpaceBackground;
