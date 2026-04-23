import { useEffect, useRef, useState } from "react";
import type { Lang, TimelineItem } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C } from "@/data/constants";

interface Props {
  item: TimelineItem;
  i: number;
  lang: Lang;
  mob: boolean;
}

export function TLItem({ item, i, lang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const hf = t.hf;

  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setV(true);
          setTimeout(() => setScanned(true), 450);
          o.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);

  const isWork = item.type === "work";
  const ac = isWork ? C.cyan : C.vio;
  const flipX = (rtl ? 1 : -1) * (i % 2 === 0 ? -1 : 1);
  const badge = isWork ? `💼 ${t.wk}` : `🎓 ${t.ed}`;

  if (mob) {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          opacity: v ? 1 : 0,
          transform: v ? "none" : "translateY(28px)",
          transition: "opacity .6s ease,transform .6s ease",
        }}
      >
        <div
          style={{
            background: "rgba(15,24,38,.9)",
            backdropFilter: "blur(14px)",
            border: `1px solid ${v ? C.brd : "transparent"}`,
            borderRadius: 12,
            padding: "14px 14px 14px 22px",
            position: "relative",
            overflow: "hidden",
            transition: "border-color .5s .2s,box-shadow .3s",
          }}
        >
          <div
            style={{
              position: "absolute",
              [rtl ? "right" : "left"]: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: `linear-gradient(to bottom,${ac},${C.vio})`,
              borderRadius: "12px 0 0 12px",
              transform: v ? "scaleY(1)" : "scaleY(0)",
              transition: "transform .55s cubic-bezier(.23,1,.32,1) .25s",
              transformOrigin: "top",
            }}
          />
          {scanned && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg,transparent 0%,${ac}15 50%,transparent 100%)`,
                transform: "translateX(-100%)",
                animation: "scanOnce .7s ease forwards",
                pointerEvents: "none",
              }}
            />
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, gap: 6, flexWrap: "wrap" }}>
            <span style={{ color: ac, fontSize: 11, fontWeight: 700, opacity: v ? 1 : 0, transition: "opacity .4s .35s" }}>
              {item.year}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10, background: `${ac}18`, color: ac, opacity: v ? 1 : 0, transition: "opacity .4s .45s" }}>
              {badge}
            </span>
          </div>
          <h3 style={{ color: C.tx, fontFamily: hf, fontWeight: 700, fontSize: 14, margin: "0 0 3px", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(8px)", transition: "all .5s .5s" }}>
            {item.title[lang]}
          </h3>
          <p style={{ color: ac, fontSize: 12, margin: "0 0 4px", fontWeight: 600, opacity: v ? 1 : 0, transition: "opacity .4s .6s" }}>
            {item.org[lang]} · {item.loc[lang]}
          </p>
          <p style={{ color: C.mu, fontSize: 12, lineHeight: 1.65, margin: 0, opacity: v ? 1 : 0, transition: "opacity .4s .7s" }}>
            {item.desc[lang]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", marginBottom: 22, alignItems: "flex-start" }}>
      <div
        style={{
          width: 130,
          flexShrink: 0,
          paddingTop: 16,
          textAlign: rtl ? "left" : "right",
          [rtl ? "paddingLeft" : "paddingRight"]: 24,
          opacity: v ? 1 : 0,
          transform: v ? "none" : `translateX(${(rtl ? 1 : -1) * 24}px)`,
          transition: "opacity .6s ease .1s,transform .6s ease .1s",
        }}
      >
        <span style={{ color: ac, fontSize: 11, fontWeight: 700, display: "block", lineHeight: 1.4, letterSpacing: 0.5, textShadow: v ? `0 0 12px ${ac}99` : "none", transition: "text-shadow .5s .5s" }}>
          {item.year}
        </span>
      </div>

      <div style={{ width: 20, flexShrink: 0, display: "flex", justifyContent: "center", paddingTop: 18, position: "relative", zIndex: 2 }}>
        {v &&
          [0, 1, 2].map((ri) => (
            <div
              key={ri}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 22,
                height: 22,
                marginTop: -11,
                marginLeft: -11,
                borderRadius: "50%",
                border: `1.5px solid ${ac}`,
                opacity: 0,
                animation: `sonar 2.2s cubic-bezier(.2,.8,.3,1) ${ri * 380}ms 1`,
              }}
            />
          ))}
        <div
          style={{
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: ac,
            border: `2px solid ${C.bg}`,
            position: "relative",
            zIndex: 1,
            transform: v ? "scale(1)" : "scale(0)",
            transition: "transform .45s cubic-bezier(.34,1.56,.64,1) .2s",
            boxShadow: v ? `0 0 14px ${ac},0 0 30px ${ac}55` : "none",
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          [rtl ? "marginRight" : "marginLeft"]: 20,
          opacity: v ? 1 : 0,
          transform: v ? "none" : `perspective(800px) rotateY(${flipX * 16}deg) translateX(${flipX * -18}px)`,
          transition: "opacity .7s ease .05s,transform .8s cubic-bezier(.23,1,.32,1) .05s",
        }}
      >
        <div
          style={{
            background: "rgba(15,24,38,.9)",
            backdropFilter: "blur(14px)",
            border: `1px solid ${C.brd}`,
            borderRadius: 12,
            padding: "14px 18px",
            position: "relative",
            overflow: "hidden",
            transition: "border-color .3s,box-shadow .3s,transform .22s",
            cursor: "default",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = ac;
            e.currentTarget.style.boxShadow = `0 0 32px ${ac}25,inset 0 0 24px ${ac}07`;
            e.currentTarget.style.transform = rtl ? "translateX(-5px)" : "translateX(5px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = C.brd;
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "none";
          }}
        >
          <div style={{ position: "absolute", top: 0, [rtl ? "right" : "left"]: 0, height: 2, background: `linear-gradient(${rtl ? "270deg" : "90deg"},${ac},${C.vio})`, width: v ? "100%" : "0%", transition: "width .95s cubic-bezier(.23,1,.32,1) .38s" }} />
          {scanned && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg,transparent 0%,${ac}13 50%,transparent 100%)`,
                transform: "translateX(-100%)",
                animation: "scanOnce .85s ease forwards",
                pointerEvents: "none",
              }}
            />
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, gap: 8, flexWrap: "wrap" }}>
            <h3 style={{ color: C.tx, fontFamily: hf, fontWeight: 700, fontSize: 14, margin: 0, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(7px)", transition: "all .5s .48s" }}>
              {item.title[lang]}
            </h3>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, background: `${ac}18`, color: ac, opacity: v ? 1 : 0, transition: "opacity .4s .55s" }}>
              {badge}
            </span>
          </div>
          <p style={{ color: ac, fontSize: 12, margin: "0 0 4px", fontWeight: 600, opacity: v ? 1 : 0, transition: "opacity .4s .65s" }}>
            {item.org[lang]} · {item.loc[lang]}
          </p>
          <p style={{ color: C.mu, fontSize: 12, lineHeight: 1.65, margin: 0, opacity: v ? 1 : 0, transition: "opacity .4s .78s" }}>
            {item.desc[lang]}
          </p>
        </div>
      </div>
    </div>
  );
}
