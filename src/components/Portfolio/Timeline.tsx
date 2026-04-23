import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C } from "@/data/constants";
import { TIMELINE } from "@/data/timeline";
import { useInView } from "@/hooks";
import { SplitTitle } from "@/components/UI";
import { Section } from "./Section";
import { TLItem } from "./TLItem";

interface Props {
  lang: Lang;
  mob: boolean;
}

function TimelineLineDraw({ containerRef, rtl }: { containerRef: React.RefObject<HTMLDivElement>; rtl: boolean }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const upd = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (window.innerHeight * 0.52 - rect.top) / rect.height)
      );
      setPct(progress * 100);
    };
    window.addEventListener("scroll", upd, { passive: true });
    upd();
    return () => window.removeEventListener("scroll", upd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        [rtl ? "right" : "left"]: 130,
        top: 0,
        bottom: 0,
        width: 1,
        background: C.brd,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${pct}%`,
          background: `linear-gradient(to bottom,${C.cyan},${C.vio})`,
          boxShadow: `0 0 8px ${C.cyan}88`,
          transition: "height .12s linear",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${pct}%`,
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: C.cyan,
          boxShadow: `0 0 12px ${C.cyan},0 0 24px ${C.cyan}88`,
          transition: "top .12s linear",
          opacity: pct > 1 && pct < 99 ? 1 : 0,
        }}
      />
    </div>
  );
}

export function Timeline({ lang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const hf = t.hf;
  const [sectionRef, v] = useInView();
  const tlContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="timeline" mob={mob} dir={t.dir} ff={t.ff} innerRef={sectionRef}>
      <SplitTitle txt={t.tT} v={v} rtl={rtl} mob={mob} hf={hf} />
      {mob ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TIMELINE.map((item, i) => (
            <TLItem key={i} item={item} i={i} lang={lang} mob={true} />
          ))}
        </div>
      ) : (
        <div ref={tlContainerRef} style={{ position: "relative" }}>
          <TimelineLineDraw containerRef={tlContainerRef} rtl={rtl} />
          {TIMELINE.map((item, i) => (
            <TLItem key={i} item={item} i={i} lang={lang} mob={false} />
          ))}
        </div>
      )}
    </Section>
  );
}
