import { useState, useEffect, useRef } from "react";
import type { Lang } from "@/types";
import { COLORS as C } from "@/data/constants";

/* ------------------------------------------------------------------ */
/*  Tira Municipality — Data Visualization                            */
/*  Pure CSS animations, no external chart libs                       */
/* ------------------------------------------------------------------ */

interface Props {
  lang: Lang;
  mob: boolean;
  hf: string;
  ff: string;
}

/* ---- static data ---- */
const DEPARTMENTS = [
  { key: "procurement", en: "Procurement", he: "רכש", pct: 100, months: 9, color: C.cyan },
  { key: "vendors",     en: "Vendor Portal", he: "פורטל ספקים", pct: 100, months: 7, color: C.vio },
  { key: "hr",          en: "Human Resources", he: "משאבי אנוש", pct: 100, months: 6, color: "#22d3a5" },
  { key: "planning",    en: "Planning & Building", he: "תכנון ובנייה", pct: 100, months: 8, color: "#FF6B6B" },
  { key: "treasury",    en: "Treasury", he: "גזברות", pct: 100, months: 5, color: "#FFD93D" },
];

const METRICS = [
  { value: 5,   label: { en: "Departments", he: "מחלקות" }, icon: "🏛️" },
  { value: 450, label: { en: "Employees Trained", he: "עובדים הוכשרו" }, icon: "👥", suffix: "+" },
  { value: 800, label: { en: "Active Vendors", he: "ספקים פעילים" }, icon: "🏢", suffix: "+" },
  { value: 40,  label: { en: "Admin Time Saved", he: "חיסכון בזמן ניהול" }, icon: "⏱️", suffix: "%" },
];

/* ---- animated counter hook ---- */
function useCounter(target: number, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, active]);
  return val;
}

/* ---- intersection observer hook ---- */
function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---- ring chart SVG ---- */
function Ring({ pct, size, stroke, color, delay, active }: { pct: number; size: number; stroke: number; color: string; delay: number; active: boolean }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = active ? circ - (circ * pct) / 100 : circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: `stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) ${delay}s` }} />
    </svg>
  );
}

/* ---- single metric card (hooks-safe) ---- */
const RING_COLORS = [C.cyan, C.vio, "#22d3a5", "#FFD93D"];

function MetricRingCard({ metric, index, mob, hf, lang, inView }: {
  metric: typeof METRICS[number]; index: number; mob: boolean; hf: string; lang: Lang; inView: boolean;
}) {
  const count = useCounter(metric.value, 1600, inView);
  return (
    <div style={{
      background: "rgba(15,24,38,.85)", border: `1px solid ${C.brd}`, borderRadius: 14,
      padding: mob ? "16px 10px" : "20px 14px", textAlign: "center",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
      transition: `opacity .6s ease ${index * 0.12}s, transform .6s ease ${index * 0.12}s`,
    }}>
      <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
        <Ring pct={100} size={mob ? 64 : 76} stroke={5}
          color={RING_COLORS[index]} delay={index * 0.15} active={inView} />
        <span style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          fontSize: mob ? 18 : 22, fontFamily: hf, fontWeight: 800,
          background: `linear-gradient(135deg,${C.cyan},${C.vio})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          {count}{metric.suffix || ""}
        </span>
      </div>
      <div style={{ color: C.mu, fontSize: 11, fontWeight: 600, letterSpacing: 0.3 }}>
        {metric.label[lang]}
      </div>
    </div>
  );
}

/* ---- main component ---- */
export function TiraDataViz({ lang, mob, hf, ff }: Props) {
  const { ref, inView } = useInView(0.15);

  return (
    <div ref={ref} style={{ margin: `${mob ? 28 : 40}px 0`, fontFamily: ff }}>

      {/* Section heading */}
      <h3 style={{
        fontFamily: hf, fontSize: mob ? 18 : 22, fontWeight: 700, color: C.tx, marginBottom: 8,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 20 }}>📊</span>
        {lang === "he" ? "נתוני הפרויקט" : "Project Impact"}
      </h3>
      <p style={{ color: C.mu, fontSize: 13, marginBottom: mob ? 20 : 28, lineHeight: 1.6 }}>
        {lang === "he"
          ? "תוצאות מדידות של הטרנספורמציה הדיגיטלית בעיריית טירה"
          : "Measurable outcomes from Tira Municipality's digital transformation"}
      </p>

      {/* ── Metric rings row ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: mob ? 12 : 16,
        marginBottom: mob ? 24 : 32,
      }}>
        {METRICS.map((m, i) => (
          <MetricRingCard key={m.icon} metric={m} index={i} mob={mob} hf={hf} lang={lang} inView={inView} />
        ))}
      </div>

      {/* ── Department progress bars ── */}
      <div style={{
        background: "rgba(15,24,38,.82)", backdropFilter: "blur(14px)",
        border: `1px solid ${C.brd}`, borderRadius: 14, padding: mob ? "18px 16px" : "24px 28px",
      }}>
        <h4 style={{
          fontFamily: hf, fontSize: 13, fontWeight: 700, color: C.tx,
          letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 18,
        }}>
          {lang === "he" ? "מחלקות שעברו דיגיטציה" : "Digitalized Departments"}
        </h4>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {DEPARTMENTS.map((dept, i) => (
            <div key={dept.key}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ color: C.tx, fontSize: 13, fontWeight: 500 }}>
                  {dept[lang]}
                </span>
                <span style={{ color: C.mu, fontSize: 11 }}>
                  {dept.months} {lang === "he" ? "חודשים" : "months"}
                </span>
              </div>
              <div style={{
                width: "100%", height: 6, borderRadius: 3,
                background: "rgba(255,255,255,.06)", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", borderRadius: 3,
                  background: `linear-gradient(90deg, ${dept.color}, ${dept.color}cc)`,
                  width: inView ? `${dept.pct}%` : "0%",
                  transition: `width 1.4s cubic-bezier(.4,0,.2,1) ${0.3 + i * 0.15}s`,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* timeline dots */}
        <div style={{ marginTop: 22, paddingTop: 16, borderTop: `1px solid ${C.brd}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.cyan}, ${C.vio})`, opacity: inView ? 0.5 : 0, transition: "opacity 1s ease .6s" }} />
            {["2022", "2023", "2024"].map((yr, i) => (
              <div key={yr} style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: i === 2 ? C.cyan : C.vio, margin: "0 auto 6px",
                  boxShadow: `0 0 8px ${i === 2 ? C.cyan : C.vio}60`,
                  opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0)",
                  transition: `all .5s ease ${0.8 + i * 0.2}s`,
                }} />
                <span style={{ color: C.mu, fontSize: 11, fontWeight: 600 }}>{yr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
