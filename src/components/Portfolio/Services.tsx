import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C } from "@/data/constants";
import { SERVICES } from "@/data/services";
import { useInView } from "@/hooks";
import { SplitTitle, Glass, tilt, untilt } from "@/components/UI";
import { scale } from "@/utils/animations";
import { Section } from "./Section";

interface Props {
  lang: Lang;
  mob: boolean;
}

export function Services({ lang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const hf = t.hf;
  const [ref, v] = useInView();

  return (
    <Section id="services" mob={mob} dir={t.dir} ff={t.ff} innerRef={ref}>
      <SplitTitle txt={t.sT} v={v} rtl={rtl} mob={mob} hf={hf} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mob ? "1fr 1fr" : "repeat(3,1fr)",
          gap: mob ? 12 : 16,
        }}
      >
        {SERVICES.map((s, i) => (
          <div key={i} style={scale(v, i * 90)}>
            <Glass
              mob={mob}
              onMouseMove={tilt(mob)}
              onMouseLeave={untilt(mob)}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = C.cyan)}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = C.brd)}
            >
              <div style={{ fontSize: mob ? 24 : 30 }}>{s.icon}</div>
              <h3
                style={{
                  color: C.tx,
                  fontFamily: hf,
                  fontWeight: 700,
                  fontSize: mob ? 13 : 16,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {s.title[lang]}
              </h3>
              <p
                style={{
                  color: C.mu,
                  fontSize: mob ? 11 : 13,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {s.desc[lang]}
              </p>
            </Glass>
          </div>
        ))}
      </div>
    </Section>
  );
}
