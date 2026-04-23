import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C, CONTACT } from "@/data/constants";
import { STATS, SKILLS, LANGUAGES } from "@/data/skills";
import { useInView } from "@/hooks";
import { SplitTitle, CountUp } from "@/components/UI";
import { up, side, scale, wipeUp } from "@/utils/animations";
import { Section } from "./Section";

interface Props {
  lang: Lang;
  mob: boolean;
}

export function About({ lang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const hf = t.hf;
  const [ref, v] = useInView();

  return (
    <Section id="about" bg="rgba(13,18,32,.88)" mob={mob} dir={t.dir} ff={t.ff} innerRef={ref}>
      <SplitTitle txt={t.aT} v={v} rtl={rtl} mob={mob} hf={hf} />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${mob ? 2 : 4},1fr)`,
          gap: mob ? 10 : 16,
          marginBottom: mob ? 28 : 40,
          ...up(v, 50),
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              background: "rgba(15,24,38,.85)",
              backdropFilter: "blur(12px)",
              border: `1px solid rgba(0,229,255,.15)`,
              borderRadius: 12,
              padding: mob ? "14px 10px" : "18px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: hf,
                fontSize: mob ? 28 : 36,
                fontWeight: 800,
                background: `linear-gradient(135deg,${C.cyan},${C.vio})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}
            >
              <CountUp to={s.n} suffix={s.s} v={v} delay={i * 150} />
            </div>
            <div
              style={{
                color: C.mu,
                fontSize: mob ? 11 : 12,
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              {s.label[lang]}
            </div>
          </div>
        ))}
      </div>

      {/* Bio + skills + languages */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr" : "3fr 2fr",
          gap: mob ? 24 : 52,
          alignItems: "start",
        }}
      >
        <div style={wipeUp(v, 200)}>
          <p
            style={{
              color: C.mu,
              lineHeight: 1.88,
              fontSize: mob ? 14 : 15,
              marginBottom: 22,
            }}
          >
            {t.aB}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
            {SKILLS.map((s, i) => (
              <span
                key={s}
                style={{
                  background: "rgba(123,97,255,.12)",
                  color: C.vio,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: 20,
                  ...scale(v, 320 + i * 35),
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <span style={{ color: C.mu, fontSize: 13 }}>📍 {CONTACT.locations}</span>
            <a
              href={`mailto:${CONTACT.email}`}
              style={{ color: C.cyan, fontSize: 13, textDecoration: "none" }}
            >
              ✉️ {CONTACT.email}
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C.cyan, fontSize: 13, textDecoration: "none" }}
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: mob ? "row" : "column",
            flexWrap: mob ? "wrap" : "nowrap",
            gap: 8,
            ...side(v, 300, rtl ? -1 : 1),
          }}
        >
          {LANGUAGES.map((l, i) => (
            <div
              key={l.en}
              style={{
                background: "rgba(15,24,38,.9)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${C.brd}`,
                borderRadius: 10,
                padding: "10px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flex: mob ? "1 1 calc(50% - 4px)" : "auto",
                minWidth: 0,
                ...scale(v, 380 + i * 60),
              }}
            >
              <span style={{ color: C.tx, fontWeight: 600, fontSize: 12 }}>
                {l[lang]}
              </span>
              <span
                style={{
                  color: i === LANGUAGES.length - 1 ? C.mu : C.cyan,
                  fontSize: 11,
                  fontWeight: 700,
                  marginLeft: 4,
                  flexShrink: 0,
                }}
              >
                {l.level[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
