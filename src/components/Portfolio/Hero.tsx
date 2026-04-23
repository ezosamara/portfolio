import { useState } from "react";
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

  return (
    <section
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
              transition: "transform .25s,box-shadow .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = `0 10px 36px rgba(0,229,255,.45)`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,229,255,.25)`;
            }}
          >
            {t.c1}
          </a>
          <a
            href="#contact"
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
              transition: "all .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = C.cyan;
              e.currentTarget.style.background = "rgba(0,229,255,.07)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,229,255,.35)";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "none";
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
