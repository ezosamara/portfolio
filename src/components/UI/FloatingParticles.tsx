import { COLORS as C } from "@/data/constants";

interface ParticleCfg {
  t: number;
  l?: number;
  r?: number;
  s: number;
  sp: number;
  col: string;
  fl: number;
}

const PTS: ParticleCfg[] = [
  { t: 12, l: 18, s: 4, sp: 0.018, col: C.cyan, fl: 3.2 },
  { t: 28, l: 78, s: 3, sp: -0.014, col: C.vio, fl: 2.8 },
  { t: 52, r: 8, s: 5, sp: 0.016, col: C.cyan, fl: 4 },
  { t: 68, l: 42, s: 3, sp: -0.011, col: C.vio, fl: 3.5 },
  { t: 82, r: 25, s: 4, sp: 0.012, col: "#a0b0ff", fl: 2.5 },
  { t: 38, l: 4, s: 3, sp: -0.009, col: C.cyan, fl: 3.8 },
  { t: 60, r: 45, s: 4, sp: 0.014, col: C.vio, fl: 2.2 },
];

export function FloatingParticles({ sy }: { sy: number }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {PTS.map((p, i) => {
        const horizontal: React.CSSProperties =
          p.l != null ? { left: `${p.l}%` } : { right: `${p.r}%` };
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `calc(${p.t}% + ${sy * p.sp}px)`,
              ...horizontal,
              width: p.s,
              height: p.s,
              borderRadius: "50%",
              background: p.col,
              boxShadow: `0 0 ${p.s * 3}px ${p.col}`,
              opacity: 0.55,
              animation: `floatY ${p.fl}s ease-in-out ${i * 400}ms infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
