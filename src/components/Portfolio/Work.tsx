import { useState } from "react";
import { Link } from "react-router-dom";
import type { Lang, ProjectCategory } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C } from "@/data/constants";
import { PROJECTS, PROJECT_CATEGORIES, getFeaturedProjects } from "@/data/projects";
import { useInView } from "@/hooks";
import { SplitTitle, Glass, Tag, tilt, untilt } from "@/components/UI";
import { up, side, scale } from "@/utils/animations";
import { Section } from "./Section";

interface Props { lang: Lang; mob: boolean }

function Card({ p, lang, hf, mob, big }: {
  p: (typeof PROJECTS)[number]; lang: Lang; hf: string; mob: boolean; big?: boolean;
}) {
  const ar = big ? "2.2/1" : "16/9";
  const t = TRANSLATIONS[lang];
  return (
    <Link to={`/work/${p.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <Glass mob={mob} style={{ height: "100%", padding: 0, overflow: "hidden" }}
        onMouseMove={tilt(mob)} onMouseLeave={untilt(mob)}
        onMouseOver={e => (e.currentTarget.style.borderColor = C.cyan)}
        onMouseOut={e => (e.currentTarget.style.borderColor = C.brd)}>
        {p.hero ? (
          <img src={p.hero} alt={p.title[lang]} loading="lazy"
            onError={e => { e.currentTarget.style.display = "none"; const ph = e.currentTarget.nextElementSibling as HTMLElement; if (ph) ph.style.display = "flex"; }}
            style={{ width: "100%", aspectRatio: ar, objectFit: "cover", borderRadius: "10px 10px 0 0", display: "block" }} />
        ) : null}
        <div style={{ display: p.hero ? "none" : "flex", width: "100%", aspectRatio: ar, borderRadius: "10px 10px 0 0",
          background: `linear-gradient(135deg,rgba(0,229,255,.25),rgba(123,97,255,.25)),${C.sf}`,
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: big ? 64 : 40, fontWeight: 800, opacity: .3, color: C.tx }}>{p.title[lang].charAt(0)}</span>
        </div>
        <div style={{ padding: mob ? "12px 14px 14px" : big ? "20px 24px 24px" : "14px 16px 16px",
          display: "flex", flexDirection: "column", gap: big ? 10 : 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Tag label={t.categoryLabels[p.category]} />
            {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ color: C.mu, fontSize: 17, textDecoration: "none", transition: "color .2s" }}
              onMouseOver={e => (e.currentTarget.style.color = C.cyan)}
              onMouseOut={e => (e.currentTarget.style.color = C.mu)}>{"\u2197"}</a>}
          </div>
          <h3 style={{ color: C.tx, fontFamily: hf, fontWeight: 700,
            fontSize: big ? (mob ? 18 : 22) : (mob ? 14 : 15), margin: 0 }}>{p.title[lang]}</h3>
          <p style={{ color: C.mu, fontSize: big ? (mob ? 13 : 14) : (mob ? 12 : 13),
            lineHeight: 1.6, flex: 1, margin: 0 }}>{p.shortDesc[lang]}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {p.tags.map(tg => <Tag key={tg} label={tg} color={C.vio} />)}
          </div>
        </div>
      </Glass>
    </Link>
  );
}

const STATS = [
  { value: `${PROJECTS.length}+`, label: { en: "Projects Delivered", he: "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD \u05E9\u05D4\u05D5\u05E9\u05DC\u05DE\u05D5" } },
  { value: `${new Set(PROJECTS.map(p => p.category)).size}`, label: { en: "Disciplines", he: "\u05EA\u05D7\u05D5\u05DE\u05D9\u05DD" } },
  { value: "5+", label: { en: "Years Experience", he: "\u05E9\u05E0\u05D5\u05EA \u05E0\u05D9\u05E1\u05D9\u05D5\u05DF" } },
  { value: "100%", label: { en: "Client Satisfaction", he: "\u05E9\u05D1\u05D9\u05E2\u05D5\u05EA \u05DC\u05E7\u05D5\u05D7\u05D5\u05EA" } },
];

function StatTile({ stat, lang, hf, mob, delay, v }: {
  stat: typeof STATS[number]; lang: Lang; hf: string; mob: boolean; delay: number; v: boolean;
}) {
  return (
    <div style={{
      background: "rgba(15,24,38,.75)",
      border: "1px solid rgba(0,229,255,.12)",
      borderRadius: 14,
      padding: mob ? "20px 12px" : "26px 16px",
      textAlign: "center" as const,
      position: "relative" as const,
      overflow: "hidden" as const,
      transition: "border-color .3s, transform .3s",
      ...scale(v, delay),
    }}
      onMouseOver={e => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(0,229,255,.12)"; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 2,
        background: `linear-gradient(90deg, transparent, ${C.cyan}, ${C.vio}, transparent)` }} />
      <div style={{
        fontFamily: hf, fontSize: mob ? 30 : 38, fontWeight: 800,
        background: `linear-gradient(135deg, ${C.cyan}, ${C.vio})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", lineHeight: 1.1,
      }}>{stat.value}</div>
      <div style={{ color: C.mu, fontSize: mob ? 11 : 12, marginTop: 8, letterSpacing: 0.4, fontWeight: 600 }}>
        {stat.label[lang]}
      </div>
    </div>
  );
}

export function Work({ lang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const hf = t.hf;
  const [ref, v] = useInView();
  const [cat, setCat] = useState<"All" | ProjectCategory>("All");
  const featured = getFeaturedProjects();
  const hero = featured[0];
  const subFeat = featured.slice(1, 3);
  const all = cat === "All" ? PROJECTS : PROJECTS.filter(p => p.category === cat);
  const grid = cat === "All" ? all.filter(p => !p.featured) : all;

  return (
    <Section id="work" bg="rgba(13,18,32,.88)" mob={mob} dir={t.dir} ff={t.ff} innerRef={ref}>
      <SplitTitle txt={t.wT} v={v} rtl={rtl} mob={mob} hf={hf} />

      {/* Featured hero */}
      {cat === "All" && hero && (
        <div style={{ marginBottom: mob ? 12 : 16, ...up(v, 60) }}>
          <Card p={hero} lang={lang} hf={hf} mob={mob} big />
        </div>
      )}

      {/* Sub-featured row */}
      {cat === "All" && subFeat.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr",
          gap: mob ? 12 : 16, marginBottom: mob ? 20 : 28, ...up(v, 120) }}>
          {subFeat.map(p => <Card key={p.slug} p={p} lang={lang} hf={hf} mob={mob} />)}
        </div>
      )}

      {/* Category chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, overflowX: "auto",
        paddingBottom: 4, WebkitOverflowScrolling: "touch", scrollbarWidth: "none", ...up(v, 80) }}>
        {PROJECT_CATEGORIES.map((c, i) => (
          <button key={c} onClick={() => setCat(c)} style={{
            background: cat === c ? `linear-gradient(135deg,${C.cyan},${C.vio})` : "transparent",
            color: cat === c ? C.bg : C.mu,
            border: `1px solid ${cat === c ? C.cyan : C.brd}`,
            borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer",
            fontWeight: 700, whiteSpace: "nowrap", fontFamily: t.ff, flexShrink: 0,
            transition: "all .25s", ...scale(v, i * 50) }}>
            {t.categoryLabels[c]}
          </button>
        ))}
      </div>

      {/* Asymmetric grid */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)",
        gap: mob ? 12 : 16 }}>
        {grid.map((p, i) => {
          const pair = Math.floor(i / 2);
          const first = i % 2 === 0;
          const span = mob ? 1 : (pair % 2 === 0 ? (first ? 2 : 1) : (first ? 1 : 2));
          return (
            <div key={p.slug} style={{ gridColumn: `span ${span}`,
              ...(mob ? up(v, i * 55) : side(v, i * 50, first ? -1 : 1)) }}>
              <Card p={p} lang={lang} hf={hf} mob={mob} />
            </div>
          );
        })}
      </div>

      {/* Stats summary panel */}
      <div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: mob ? 10 : 16, marginTop: mob ? 32 : 48 }}>
        {STATS.map((s, i) => (
          <StatTile key={i} stat={s} lang={lang} hf={hf} mob={mob} delay={i * 80} v={v} />
        ))}
      </div>
    </Section>
  );
                                                           }
