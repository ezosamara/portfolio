import { useState } from "react";
import { Link } from "react-router-dom";
import type { Lang, ProjectCategory } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C } from "@/data/constants";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { useInView } from "@/hooks";
import { SplitTitle, Glass, Tag, tilt, untilt } from "@/components/UI";
import { up, side, scale } from "@/utils/animations";
import { Section } from "./Section";

interface Props {
  lang: Lang;
  mob: boolean;
}

export function Work({ lang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const hf = t.hf;
  const [ref, v] = useInView();
  const [cat, setCat] = useState<"All" | ProjectCategory>("All");

  const filtered = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  return (
    <Section id="work" bg="rgba(13,18,32,.88)" mob={mob} dir={t.dir} ff={t.ff} innerRef={ref}>
      <SplitTitle txt={t.wT} v={v} rtl={rtl} mob={mob} hf={hf} />

      {/* Category filter chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 28,
          overflowX: "auto",
          paddingBottom: 4,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          ...up(v, 80),
        }}
      >
        {PROJECT_CATEGORIES.map((c, i) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              background:
                cat === c
                  ? `linear-gradient(135deg,${C.cyan},${C.vio})`
                  : "transparent",
              color: cat === c ? C.bg : C.mu,
              border: `1px solid ${cat === c ? C.cyan : C.brd}`,
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 700,
              whiteSpace: "nowrap",
              fontFamily: t.ff,
              flexShrink: 0,
              transition: "all .25s",
              ...scale(v, i * 50),
            }}
          >
            {t.categoryLabels[c]}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)",
          gap: mob ? 12 : 16,
        }}
      >
        {filtered.map((p, i) => (
          <div key={p.slug} style={mob ? up(v, i * 55) : side(v, i * 50, i % 2 === 0 ? -1 : 1)}>
            <Link to={`/work/${p.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <Glass
                mob={mob}
                style={{ height: "100%", padding: 0, overflow: "hidden" }}
                onMouseMove={tilt(mob)}
                onMouseLeave={untilt(mob)}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = C.cyan)}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = C.brd)}
              >
                {/* Hero image with gradient fallback */}
                {p.hero ? (
                  <img
                    src={p.hero}
                    alt={p.title[lang]}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                    style={{
                      width: "100%",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                      display: "block",
                    }}
                  />
                ) : null}
                <div
                  style={{
                    display: p.hero ? "none" : "flex",
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: "10px 10px 0 0",
                    background: `linear-gradient(135deg, rgba(0,229,255,0.25) 0%, rgba(123,97,255,0.25) 100%), ${C.sf}`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 40, fontWeight: 800, opacity: 0.3, color: C.tx }}>
                    {p.title[lang].charAt(0)}
                  </span>
                </div>

                {/* Card content */}
                <div style={{ padding: mob ? "12px 14px 14px" : "14px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Tag label={t.categoryLabels[p.category]} />
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          color: C.mu,
                          fontSize: 17,
                          textDecoration: "none",
                          transition: "color .2s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = C.cyan)}
                        onMouseOut={(e) => (e.currentTarget.style.color = C.mu)}
                      >
                        ↗
                      </a>
                    )}
                  </div>
                  <h3
                    style={{
                      color: C.tx,
                      fontFamily: hf,
                      fontWeight: 700,
                      fontSize: mob ? 14 : 15,
                      margin: 0,
                    }}
                  >
                    {p.title[lang]}
                  </h3>
                  <p
                    style={{
                      color: C.mu,
                      fontSize: mob ? 12 : 13,
                      lineHeight: 1.6,
                      flex: 1,
                      margin: 0,
                    }}
                  >
                    {p.shortDesc[lang]}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.map((tg) => (
                      <Tag key={tg} label={tg} color={C.vio} />
                    ))}
                  </div>
                </div>
              </Glass>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
