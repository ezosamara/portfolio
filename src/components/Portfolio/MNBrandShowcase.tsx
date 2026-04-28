import { useEffect, useRef, useState } from "react";

const BRAND = {
  navy: "#253e5f",
  sky: "#c6eaff",
  white: "#ffffff",
  darkCard: "rgba(15,24,38,0.88)",
  brd: "#1e2d45",
  tx: "#E8F2FF",
  mu: "#6B84B0",
};

const VALUES = {
  en: [
    { label: "Reliability", sub: "Our buildings speak for themselves" },
    { label: "Professionalism", sub: "Working with Israel's top contractors" },
    { label: "Experience", sub: "Decades of craftsmanship, second generation" },
    { label: "Innovation", sub: "The next generation of M.N" },
  ],
  he: [
    { label: "×××× ××ª", sub: "×××× ×× ×©×× × ××××¨×× ××¤× × ×¢×¦××" },
    { label: "××§×¦××¢×××ª", sub: "×× × ×¢××××× ×¢× ×× ×©× ××§×¦××¢ ××××××× ×××¨×¥" },
    { label: "×××ª×§", sub: "×××ª×§ ××××©× ××ª ××¤××© ××××¦×¨ ×¢×××××ª ×××××¨××ª" },
    { label: "×××©× ××ª", sub: "×××¨ ×××© ×©× ×.× " },
  ],
};

const GALLERY_ITEMS = {
  en: [
    { src: "/projects/mn-logo-chronology.jpg", label: "9 Logo Concepts", sub: "The design evolution" },
    { src: "/projects/mn-logo-versions.jpg", label: "Final Logo System", sub: "6 approved versions" },
    { src: "/projects/mn-business-cards.jpg", label: "Business Cards", sub: "Premium print design" },
    { src: "/projects/mn-letterhead.jpg", label: "Letterhead", sub: "Corporate stationery" },
    { src: "/projects/mn-hoodies.jpg", label: "Branded Merchandise", sub: "Navy and white hoodies" },
    { src: "/projects/mn-envelope.jpg", label: "Branded Envelope", sub: "Gold wax seal detail" },
    { src: "/projects/mn-social-media.jpg", label: "Digital Presence", sub: "Web, Facebook, Instagram" },
    { src: "/projects/mn-towers.jpg", label: "Brand Overview", sub: "Complete identity system" },
  ],
  he: [
    { src: "/projects/mn-logo-chronology.jpg", label: "9 ×§×× ×¡×¤××× ×××××", sub: "×ª×××× ××¢××¦××" },
    { src: "/projects/mn-logo-versions.jpg", label: "××¢×¨××ª ×××× ×¡××¤××ª", sub: "6 ××¨×¡×××ª ××××©×¨××ª" },
    { src: "/projects/mn-business-cards.jpg", label: "××¨×××¡× ×××§××¨", sub: "×¢××¦×× ××¤××¡ ×¤×¨×××××" },
    { src: "/projects/mn-letterhead.jpg", label: "× ×××¨ ×××ª×××", sub: "× ×××¨×ª ×¢×¡×§××ª" },
    { src: "/projects/mn-hoodies.jpg", label: "××¨×¦'× ×××× ××××ª×", sub: "×××× × ×××× ××××" },
    { src: "/projects/mn-envelope.jpg", label: "××¢××¤× ××××ª××ª", sub: "×¤×¨× ×××ª× ×©×¢××× ×××" },
    { src: "/projects/mn-social-media.jpg", label: "× ×××××ª ××××××××ª", sub: "××ª×¨, ×¤×××¡×××§, ××× ×¡×××¨×" },
    { src: "/projects/mn-towers.jpg", label: "×¡×§××¨×ª ×××ª×", sub: "××¢×¨××ª ××××ª ×©×××" },
  ],
};

const TX = {
  en: {
    dir: "ltr" as const,
    badge: "Brand Identity System",
    logoTitle: "The MN Mark",
    logoDesc: "M.N Towers' values â classical stability combined with contrasting innovation â are expressed through the fusion of M and N. The sky-blue palette, chosen to reflect the dreamy horizon the company promises its clients, shifts across applications while always conveying stability and aspiration.",
    philosophyLabel: "Brand Philosophy",
    philosophy: "\"Architecture is frozen music\" â Johann Wolfgang von Goethe",
    valuesTitle: "Brand Values",
    colorsTitle: "Color System",
    colors: [
      { name: "Dreamy Blue", hex: "#c6eaff", desc: "Sky, aspiration, the dreamed horizon" },
      { name: "Stabilizing Blue", hex: "#253e5f", desc: "Authority, reliability, craftsmanship" },
      { name: "Clean White", hex: "#ffffff", desc: "Like our work â pure and precise", border: true },
    ],
    galleryTitle: "Deliverables",
    deliverables: ["Logo System", "Brand Guide", "Business Cards", "Letterhead", "Merchandise", "Webflow Website", "Social Assets"],
    cta: "View Live Site",
  },
  he: {
    dir: "rtl" as const,
    badge: "××¢×¨××ª ××××ª ×××ª×",
    logoTitle: "××××× ×©×× ×",
    logoDesc: "×¢×¨×× ×.×  ×××××× â ×¡××××§× ×§×××¡××ª ××©×××× ×¡××ª×¨ ×©× ×××©× ××ª â ××ª××××× ××××××¨ ××× ×' ×-× '. ×¦××¢× ××ª×××ª × ×××¨× ××¦××¢× ××©×××× ×××××××× ×©×ª××¨×××ª ××××¤×§ ××××¤×××× ×©× ××§××××ª×× ×.",
    philosophyLabel: "×¤××××¡××¤×××ª ××××ª×",
    philosophy: "\"××××¨×××××ª ××× ×××××§× ×©×§×¤××\" â ××××× ××××¤×× × ×¤×× ××ª×",
    valuesTitle: "×¢×¨×× ××××ª×",
    colorsTitle: "××¢×¨××ª ××¦××¢××",
    colors: [
      { name: "×××× ×××××", hex: "#c6eaff", desc: "×©××××, ×©×××¤×, ××××¤×§ ××××××" },
      { name: "×××× ××××¦×", hex: "#253e5f", desc: "×¡××××ª, ××××× ××ª, ××§×¦××¢×××ª" },
      { name: "××× × ×§×", hex: "#ffffff", desc: "××× ××¢×××××ª ×©×× × â × ×§× ××××××§", border: true },
    ],
    galleryTitle: "×ª××¦×¨××",
    deliverables: ["××¢×¨××ª ××××", "×××¨×× ×××ª×", "××¨×××¡× ×××§××¨", "× ×××¨ ×××ª×××", "××¨×¦'× ××××", "××ª×¨ Webflow", "× ××¡× ×¨×©×ª××ª"],
    cta: "×××ª×¨ ×××",
  },
};

interface Props { lang: "en" | "he"; }

export default function MNBrandShowcase({ lang }: Props) {
  const t = TX[lang];
  const rtl = t.dir === "rtl";
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(22px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <div ref={ref} style={{ direction: t.dir, fontFamily: rtl ? "'Heebo', sans-serif" : "'Inter', sans-serif", padding: "32px 0", display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Badge */}
      <div style={{ ...fadeIn(0), textAlign: "center" }}>
        <span style={{ background: BRAND.sky, color: BRAND.navy, borderRadius: 20, padding: "4px 18px", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
          {t.badge}
        </span>
      </div>

      {/* Philosophy quote */}
      <div style={{ ...fadeIn(0.05), background: "linear-gradient(135deg, #253e5f 0%, #1a2e47 100%)", borderRadius: 14, padding: "28px 32px", textAlign: "center" }}>
        <div style={{ color: "#c6eaff", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>{t.philosophyLabel}</div>
        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 15, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>{t.philosophy}</p>
      </div>

      {/* Logo + Colors grid */}
      <div style={{ ...fadeIn(0.1), display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {/* Logo card */}
        <div style={{ background: "linear-gradient(145deg, #253e5f, #1a2e47)", borderRadius: 14, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: 12, border: "2px solid #c6eaff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(198,234,255,0.06)", overflow: "hidden" }}>
              <img src="/projects/mn-logo-mark.svg" alt="MN Towers Logo" width="76" height="76" style={{ borderRadius: 8, objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ color: "#c6eaff", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{t.logoTitle}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>M + N Â· Classic-Modern</div>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, lineHeight: 1.75, margin: 0, textAlign: rtl ? "right" : "left" }}>{t.logoDesc}</p>
        </div>

        {/* Colors card */}
        <div style={{ background: "#eef7fc", borderRadius: 14, padding: "28px 24px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.navy, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 18, textAlign: rtl ? "right" : "left" }}>{t.colorsTitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {t.colors.map(c => (
              <div key={c.hex} style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, background: c.hex, border: (c as any).border ? "1.5px solid #ccc" : "none", flexShrink: 0, boxShadow: "0 3px 12px rgba(37,62,95,0.18)" }} />
                <div style={{ textAlign: rtl ? "right" : "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.navy }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace", marginBottom: 2 }}>{c.hex}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Values */}
      <div style={{ ...fadeIn(0.15), background: BRAND.darkCard, backdropFilter: "blur(14px)", border: "1px solid #1e2d45", borderRadius: 14, padding: "24px 22px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(232,242,255,0.45)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, textAlign: rtl ? "right" : "left" }}>{t.valuesTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          {VALUES[lang].map((v, i) => (
            <div key={v.label} style={{ background: "rgba(198,234,255,0.05)", border: "1px solid #1e2d45", borderTop: "2px solid #c6eaff", borderRadius: 10, padding: "14px 14px", textAlign: rtl ? "right" : "left", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(12px)", transition: `all 0.45s ease ${0.2 + i * 0.07}s` }}>
              <div style={{ color: "#c6eaff", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{v.label}</div>
              <div style={{ color: BRAND.mu, fontSize: 11, lineHeight: 1.5 }}>{v.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div style={{ ...fadeIn(0.2) }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(232,242,255,0.45)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, textAlign: rtl ? "right" : "left" }}>{t.galleryTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {GALLERY_ITEMS[lang].map((img, i) => (
            <div key={img.src} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #1e2d45", background: BRAND.darkCard, opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(14px)", transition: `all 0.5s ease ${0.25 + i * 0.06}s` }}>
              <div style={{ aspectRatio: "16/10", overflow: "hidden", background: "linear-gradient(135deg, #253e5f88, #0d1a2a)" }}>
                <img src={img.src} alt={img.label} loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                  onMouseOver={e => { (e.target as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseOut={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div style={{ padding: "12px 14px", textAlign: rtl ? "right" : "left" }}>
                <div style={{ color: BRAND.tx, fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{img.label}</div>
                <div style={{ color: "#c6eaff", fontSize: 11, opacity: 0.8 }}>{img.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables strip + CTA */}
      <div style={{ ...fadeIn(0.3), background: BRAND.sky, borderRadius: 14, padding: "22px 26px", display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          {t.deliverables.map(d => (
            <span key={d} style={{ background: BRAND.navy, color: BRAND.white, borderRadius: 20, padding: "4px 13px", fontSize: 12, fontWeight: 500 }}>{d}</span>
          ))}
        </div>
        <a href="https://www.mn-towers.co.il/" target="_blank" rel="noopener noreferrer"
          style={{ background: BRAND.navy, color: BRAND.white, borderRadius: 9, padding: "10px 20px", fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
          {t.cta} {rtl ? "" : "â"}
        </a>
      </div>
    </div>
  );
}
