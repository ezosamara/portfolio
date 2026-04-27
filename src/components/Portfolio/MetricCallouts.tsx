import type { Lang } from "@/types";
import { COLORS as C } from "@/data/constants";

interface Metric {
  value: string;
  label: { en: string; he: string };
}

interface Props {
  metrics: Metric[];
  lang: Lang;
  hf: string;
  mob: boolean;
}

export function MetricCallouts({ metrics, lang, hf, mob }: Props) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)`,
      gap: mob ? 10 : 14, marginBottom: 32 }}>
      {metrics.map((m, i) => (
        <div key={i} style={{
          background: "rgba(15,24,38,.85)",
          border: "1px solid rgba(0,229,255,.15)",
          borderRadius: 14,
          padding: mob ? "18px 12px" : "22px 16px",
          textAlign: "center" as const,
          position: "relative" as const,
          overflow: "hidden" as const,
          transition: "border-color .3s, transform .3s",
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,.15)"; e.currentTarget.style.transform = "translateY(0)"; }}>
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 2,
            background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.vio}, transparent)` }} />
          <div style={{
            fontFamily: hf,
            fontSize: mob ? 28 : 34,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${C.cyan}, ${C.vio})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1.1,
          }}>{m.value}</div>
          <div style={{ color: C.mu, fontSize: mob ? 11 : 12, marginTop: 6, letterSpacing: 0.3 }}>
            {m.label[lang]}
          </div>
        </div>
      ))}
    </div>
  );
}
