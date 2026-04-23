import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  spd: number;
  ph: number;
  col: string;
}

interface Shoot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  len: number;
}

export function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let af = 0;
    let frame = 0;
    let stars: Star[] = [];
    let shoots: Shoot[] = [];

    const init = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      const n = Math.min(220, Math.floor((c.width * c.height) / 5500));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.8 + 0.15,
        spd: Math.random() * 0.007 + 0.001,
        ph: Math.random() * Math.PI * 2,
        col:
          Math.random() > 0.93
            ? "#00E5FF"
            : Math.random() > 0.87
            ? "#7B61FF"
            : Math.random() > 0.5
            ? "#E8F2FF"
            : "#a0b8d8",
      }));
    };

    const shoot = () => {
      shoots.push({
        x: Math.random() * c.width * 0.7,
        y: Math.random() * c.height * 0.35,
        vx: 6 + Math.random() * 5,
        vy: 3 + Math.random() * 2.5,
        a: 1,
        len: 90 + Math.random() * 70,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      frame++;
      if (frame % 160 === 0 && Math.random() > 0.35) shoot();

      stars.forEach((s) => {
        const a = ((Math.sin(frame * s.spd + s.ph) + 1) / 2) * 0.8 + 0.15;
        ctx.globalAlpha = a;
        ctx.fillStyle = s.col;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.3) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
          g.addColorStop(0, s.col + "55");
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.globalAlpha = a * 0.35;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      shoots = shoots.filter((s) => s.a > 0);
      shoots.forEach((s) => {
        ctx.globalAlpha = s.a;
        const g = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * (s.len / 5),
          s.y - s.vy * (s.len / 5)
        );
        g.addColorStop(0, "rgba(255,255,255,.95)");
        g.addColorStop(0.4, "rgba(180,230,255,.4)");
        g.addColorStop(1, "transparent");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * (s.len / 5), s.y - s.vy * (s.len / 5));
        ctx.stroke();
        s.x += s.vx;
        s.y += s.vy;
        s.a -= 0.016;
      });

      ctx.globalAlpha = 1;
      af = requestAnimationFrame(draw);
    };

    init();
    window.addEventListener("resize", init);
    draw();
    return () => {
      cancelAnimationFrame(af);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
