import { useState, useEffect, useRef, useCallback } from "react";
import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C } from "@/data/constants";
import { useTypewriter } from "@/hooks";

interface Props {
  lang: Lang;
  mob: boolean;
  sm: boolean;
}

export function Hero({ lang, mob, sm }: Props) {
  const t = TRANSLATIONS[lang];
  const hf = t.hf;
  const px = mob ? 16 : 24;
  const typed = useTypewriter(t.roles);
  const [nameGlitch, setNameGlitch] = useState(false);

  /* ── Cursor spotlight (pointer:fine only) ── */
  const spotRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLSectionElement>(null);
  const hasFine = useRef(false);

  useEffect(() => {
    hasFine.current = window.matchMedia("(pointer:fine)").matches;
    if (!hasFine.current) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (spotRef.current) {
          spotRef.current.style.transform = `translate(${e.clientX - 200}px,${e.clientY - 200}px)`;
          spotRef.current.style.opacity = "1";
        }
      });
    };
    const onLeave = () => {
      if (spotRef.current) spotRef.current.style.opacity = "0";
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Magnetic CTA helper (pointer:fine only) ── */
  const magnetize = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!hasFine.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxPull = 10;
      const radius = 100;
      if (dist < radius) {
        const pull = (1 - dist / radius) * maxPull;
        const tx = (dx / dist) * pull;
        const ty = (dy / dist) * pull;
        e.currentTarget.style.transform = `translate(${tx}px,${ty}px)`;
      }
    },
    [],
  );
  const demagnetize = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "none";
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        paddingTop: 56,
        paddingBottom: 24,
        direction: t.dir,
      }}
    >
      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        style={{
          position: "fixed",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle,rgba(0,229,255,0.08),transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
          transition: "opacity .3s",
          willChange: "transform",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 55% 45%,rgba(0,100,180,.1) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontFamily: t.ff,
          padding: `0 ${px}px`,
          width: "100%",
          maxWidth: 660,
          position: "relative",
        }}
      >
        <div style={{ marginBottom: 14, animation: "fadeUp .8s ease .1s both" }}>
          <span
            style={{
              color: C.cyan,
              fontSize: sm ? 11 : 13,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              borderBottom: `1px solid rgba(0,229,255,.3)`,
              paddingBottom: 4,
            }}
          >
            {t.hi}
          </span>
        </div>
        <h1
          onMouseEnter={() => {
            setNameGlitch(true);
            setTimeout(() => setNameGlitch(false), 500);
          }}
          style={{
            fontFamily: hf,
            fontSize: sm ? 36 : mob ? 50 : 72,
            fontWeight: 800,
            margin: "0 0 12px",
            lineHeight: 1.08,
            background: `linear-gradient(135deg,#E8F2FF 0%,${C.cyan} 50%,${C.vio} 100%)`,
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: `gradShift 6s ease infinite, fadeUp .9s ease .2s both${
              nameGlitch ? ", glitch .5s steps(1) both" : ""
            }`,
            cursor: "default",
          }}
        >
          {t.nm}
        </h1>
        <div
          style={{
            height: mob ? 40 : 54,
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeUp .9s ease .4s both",
          }}
        >
          <p
            style={{
              color: C.cyan,
              fontSize: mob ? 17 : 26,
              fontWeight: 700,
              fontFamily: hf,
              margin: 0,
            }}
          >
            {typed}
            <span
              style={{
                animation: "blink 1s step-end infinite",
                color: C.cyan,
              }}
            >
              |
            </span>
          </p>
        </div>
        <p
          style={{
            color: C.mu,
            fontSize: mob ? 13 : 15,
            marginBottom: 38,
            lineHeight: 1.65,
            animation: "fadeUp .9s ease .5s both",
          }}
        >
          {t.sub}
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeUp .9s ease .6s both",
          }}
        >
          <a
            href="#work"
            onMouseMove={magnetize}
            onMouseLeave={demagnetize}
            style={{
              background: `linear-gradient(135deg,${C.cyan},${C.vio})`,
              color: C.bg,
              padding: mob ? "12px 22px" : "13px 30px",
              borderRadius: 8,
              fontWeight: 700,
              textDecoration: "none",
              fontSize: mob ? 13 : 14,
              fontFamily: t.ff,
              boxShadow: `0 4px 24px rgba(0,229,255,.25)`,
              transition: "transform .18s ease-out,box-shadow .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = `0 10px 36px rgba(0,229,255,.45)`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,229,255,.25)`;
            }}
          >
            {t.c1}
          </a>
          <a
            href="#contact"
            onMouseMove={magnetize}
            onMouseLeave={demagnetize}
            style={{
              border: `1px solid rgba(0,229,255,.35)`,
              color: C.tx,
              padding: mob ? "12px 22px" : "13px 30px",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: mob ? 13 : 14,
              fontFamily: t.ff,
              backdropFilter: "blur(10px)",
              transition: "all .18s ease-out",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = C.cyan;
              e.currentTarget.style.background = "rgba(0,229,255,.07)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,.35)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {t.c2}
          </a>
        </div>
        <div
          style={{
            marginTop: mob ? 52 : 76,
            color: C.mu,
            fontSize: 22,
            animation: "bounce 2.5s ease-in-out infinite",
          }}
        >
          ↓
        </div>
      </div>
    </section>
  );
}
