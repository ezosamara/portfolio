import { useEffect, useRef, useState } from "react";

const BRAND = {
  navy: "#253e5f",
  sky: "#baebff",
  white: "#ffffff",
  darkCard: "rgba(15,24,38,0.85)",
  brd: "#1e2d45",
  tx: "#E8F2FF",
};

const TX = {
  en: {
    dir: "ltr" as const,
    sectionLabel: "Brand Identity System",
    logoTitle: "The MN Mark",
    logoDesc: "The MN mark fuses both letters with a classic-modern aesthetic. Deep navy grounds the brand in authority; sky blue carries the aspirational horizon the company promises its clients.",
    colorsTitle: "Color Palette",
    colors: [
      { name: "Navy", hex: "#253e5f", dark: true },
      { name: "Sky Blue", hex: "#baebff", dark: false },
      { name: "White", hex: "#ffffff", dark: false, border: true },
    ],
    specTitle: "Specializations",
    specs: ["Boutique Construction", "Exposed Concrete", "Private Villas"],
    projectsTitle: "Projects Delivered",
    projects: [
      { name: "Harish - Flowers District 23", loc: "Harish" },
      { name: "HaNasi 63", loc: "Herzliya Pituah" },
      { name: "HaKadima", loc: "Herzliya Pituah" },
      { name: "HaTzevoni 16", loc: "Kfar Saba" },
      { name: "HaMelachim 7", loc: "Ramat HaSharon" },
      { name: "Almog 15", loc: "Arsuf" },
    ],
    galleryTitle: "Brand Materials",
    gallery: [
      { src: "/projects/mn-logo-versions.jpg", alt: "Logo versions" },
      { src: "/projects/mn-business-cards.jpg", alt: "Business cards" },
      { src: "/projects/mn-letterhead.jpg", alt: "Letterhead" },
      { src: "/projects/mn-hoodies.jpg", alt: "Branded hoodies" },
      { src: "/projects/mn-envelope.jpg", alt: "Branded envelope" },
      { src: "/projects/mn-social-media.jpg", alt: "Social media assets" },
    ],
    deliverablesTitle: "Brand Deliverables",
    deliverables: ["Logo System", "Brand Guide", "Business Cards", "Letterhead", "Webflow Website", "Social Assets"],
    cta: "View Live Site",
  },
  he: {
    dir: "rtl" as const,
    sectionLabel: "מערכת זהות מותג",
    logoTitle: "סמל מ.נ",
    logoDesc: "סמל MN משלב את שתי האותיות באסתטיקה קלאסית-מודרנית. הנייבי הכהה מעניק סמכות ומהימנות; התכלת נושאת את חלום האופק שהחברה מבטיחה ללקוחותיה.",
    colorsTitle: "לוח צבעים",
    colors: [
      { name: "נייבי", hex: "#253e5f", dark: true },
      { name: "תכלת", hex: "#baebff", dark: false },
      { name: "לבן", hex: "#ffffff", dark: false, border: true },
    ],
    specTitle: "התמחויות",
    specs: ["בנייה בוטיק", "עבודות בטון חשוף", "בתים פרטיים ווילות"],
    projectsTitle: "פרויקטים שיצרנו",
    projects: [
      { name: "חריש - שכונת הפרחים 23", loc: "חריש" },
      { name: "הנשיא 63", loc: "הרצליה פיתוח" },
      { name: "הקדמה", loc: "הרצליה פיתוח" },
      { name: "הצבעוני 16", loc: "כפר סבא" },
      { name: "המלכים 7", loc: "רמת השרון" },
      { name: "אלמוג 15", loc: "ארסוף" },
    ],
    galleryTitle: "חומרי המותג",
    gallery: [
      { src: "/projects/mn-logo-versions.jpg", alt: "גרסאות לוגו" },
      { src: "/projects/mn-business-cards.jpg", alt: "כרטיסי ביקור" },
      { src: "/projects/mn-letterhead.jpg", alt: "נייר מכתבים" },
      { src: "/projects/mn-hoodies.jpg", alt: "הודי ממותג" },
      { src: "/projects/mn-envelope.jpg", alt: "מעטפה ממותגת" },
      { src: "/projects/mn-social-media.jpg", alt: "נכסי רשתות חברתיות" },
    ],
    deliverablesTitle: "תוצרי המיתוג",
    deliverables: ["מערכת לוגו", "מדריך מותג", "כרטיסי ביקור", "נייר מכתבים", "אתר Webflow", "נכסי רשתות חברתיות"],
    cta: "לאתר החי",
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
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fadeIn = (delay = 0): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(20px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <div
      ref={ref}
      style={{
        direction: t.dir,
        fontFamily: rtl ? "'Heebo', sans-serif" : "'Inter', sans-serif",
        padding: "32px 0",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Section badge */}
      <div style={{ ...fadeIn(0), textAlign: "center" }}>
        <span style={{
          background: BRAND.sky,
          color: BRAND.navy,
          borderRadius: 20,
          padding: "4px 16px",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}>
          {t.sectionLabel}
        </span>
      </div>

      {/* Logo hero block */}
      <div style={{
        ...fadeIn(0.1),
        background: `linear-gradient(135deg, ${BRAND.navy} 0%, #1a2e47 100%)`,
        borderRadius: 16,
        padding: "36px 28px",
        display: "flex",
        flexDirection: rtl ? "row-reverse" : "row",
        alignItems: "center",
        gap: 28,
        flexWrap: "wrap",
      }}>
        <div style={{
          width: 96, height: 96, borderRadius: 14,
          border: `2px solid ${BRAND.sky}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          background: "rgba(186,235,255,0.06)",
        }}>
          <svg viewBox="0 0 80 80" width="68" height="68" fill="none">
            <rect x="8" y="12" width="12" height="56" fill={BRAND.white} rx="2" />
            <polygon points="20,12 60,12 60,24 40,48 20,24" fill={BRAND.sky} opacity="0.9" />
            <rect x="20" y="12" width="40" height="12" fill={BRAND.white} rx="2" />
            <rect x="60" y="12" width="12" height="56" fill={BRAND.white} rx="2" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{
            color: BRAND.sky, fontSize: 11, fontWeight: 700,
            letterSpacing: 2, textTransform: "uppercase", marginBottom: 8,
          }}>
            {t.logoTitle}
          </div>
          <p style={{
            color: "rgba(255,255,255,0.82)", fontSize: 14, lineHeight: 1.75, margin: 0,
            textAlign: rtl ? "right" : "left",
          }}>
            {t.logoDesc}
          </p>
        </div>
      </div>

      {/* Colors + Specializations row */}
      <div style={{
        ...fadeIn(0.2),
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
      }}>
        <div style={{ background: "#f0f7fc", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: BRAND.navy,
            letterSpacing: 1.5, textTransform: "uppercase",
            marginBottom: 16, textAlign: rtl ? "right" : "left",
          }}>
            {t.colorsTitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.colors.map(c => (
              <div key={c.hex} style={{
                display: "flex",
                flexDirection: rtl ? "row-reverse" : "row",
                alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 8,
                  background: c.hex,
                  border: (c as any).border ? "1.5px solid #ddd" : "none",
                  flexShrink: 0,
                  boxShadow: "0 2px 8px rgba(37,62,95,0.15)",
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.navy }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: BRAND.navy, borderRadius: 12, padding: "24px 20px" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: BRAND.sky,
            letterSpacing: 1.5, textTransform: "uppercase",
            marginBottom: 16, textAlign: rtl ? "right" : "left",
          }}>
            {t.specTitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.specs.map((s, i) => (
              <div key={s} style={{
                display: "flex",
                flexDirection: rtl ? "row-reverse" : "row",
                alignItems: "center", gap: 10,
                opacity: vis ? 1 : 0,
                transition: `opacity 0.4s ease ${0.35 + i * 0.1}s`,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.sky, flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div style={{
        ...fadeIn(0.3),
        background: BRAND.darkCard,
        backdropFilter: "blur(14px)",
        border: `1px solid ${BRAND.brd}`,
        borderRadius: 14,
        padding: "24px 22px",
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: "rgba(232,242,255,0.5)",
          letterSpacing: 1.5, textTransform: "uppercase",
          marginBottom: 16, textAlign: rtl ? "right" : "left",
        }}>
          {t.projectsTitle}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
          {t.projects.map((p, i) => (
            <div key={p.name} style={{
              background: "rgba(186,235,255,0.05)",
              border: `1px solid ${BRAND.brd}`,
              borderTop: `2px solid ${BRAND.sky}`,
              borderRadius: 10,
              padding: "12px 14px",
              textAlign: rtl ? "right" : "left",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(10px)",
              transition: `all 0.4s ease ${0.4 + i * 0.07}s`,
            }}>
              <div style={{ color: BRAND.tx, fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{p.name}</div>
              <div style={{ color: BRAND.sky, fontSize: 11 }}>{p.loc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery — 2-col layout for readable brand detail */}
      <div style={{ ...fadeIn(0.4) }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: "rgba(232,242,255,0.5)",
          letterSpacing: 1.5, textTransform: "uppercase",
          marginBottom: 14, textAlign: rtl ? "right" : "left",
        }}>
          {t.galleryTitle}
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 14,
        }}>
          {t.gallery.map((img, i) => (
            <div key={img.src} style={{
              borderRadius: 12,
              overflow: "hidden",
              border: `1px solid ${BRAND.brd}`,
              aspectRatio: "4/3",
              opacity: vis ? 1 : 0,
              transition: `opacity 0.4s ease ${0.5 + i * 0.06}s`,
              background: "rgba(15,24,38,0.5)",
            }}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables strip + CTA */}
      <div style={{
        ...fadeIn(0.5),
        background: BRAND.sky,
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex",
        flexDirection: rtl ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 14,
      }}>
        <div style={{
          display: "flex",
          flexDirection: rtl ? "row-reverse" : "row",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
        }}>
          <span style={{
            fontSize: 11, fontWeight: 700, color: BRAND.navy,
            letterSpacing: 1, textTransform: "uppercase", marginInlineEnd: 4,
          }}>
            {t.deliverablesTitle}:
          </span>
          {t.deliverables.map(d => (
            <span key={d} style={{
              background: BRAND.navy, color: BRAND.white,
              borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 500,
            }}>
              {d}
            </span>
          ))}
        </div>
        <a
          href="https://www.mn-towers.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: BRAND.navy, color: BRAND.white,
            borderRadius: 8, padding: "9px 18px",
            fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
          }}
        >
          {t.cta} {rtl ? "" : "->"}
        </a>
      </div>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";

/* ââ Brand tokens from the actual M.N Towers Brand Guide V.1 | 2022 ââ */
const BRAND = {
  navy: "#253E5F",
  dreamBlue: "#C6EAFF",
  white: "#ffffff",
  darkCard: "rgba(15,24,38,0.85)",
  brd: "#1e2d45",
};

/* ââ Gallery images (all in /public/projects/) ââ */
const GALLERY_IMAGES = [
  { src: "/projects/mn-logo-versions.jpg", en: "Logo Versions", he: "××¨×¡×××ª ××××" },
  { src: "/projects/mn-logo-chronology.jpg", en: "Logo Chronology", he: "××¨×× ×××××××ª ××××" },
  { src: "/projects/mn-business-cards.jpg", en: "Business Cards", he: "××¨×××¡× ×××§××¨" },
  { src: "/projects/mn-letterhead.jpg", en: "Letterhead", he: "× ×××¨××ª ×××ª×××" },
  { src: "/projects/mn-hoodies.jpg", en: "Branded Hoodies", he: "×§×¤××¦×× ×× ××××ª×××" },
  { src: "/projects/mn-envelope.jpg", en: "Envelope", he: "××¢××¤×" },
  { src: "/projects/mn-social-media.jpg", en: "Social Media", he: "×××× ×××¨×ª××ª" },
];

/* ââ Bilingual content â every fact sourced from the PDF ââ */
const TX = {
  en: {
    dir: "ltr" as const,
    sectionLabel: "Brand Guide",
    tagline: "Building the Dream",
    aboutTitle: "About M.N Towers",
    aboutDesc:
      "M.N Towers is a construction and engineering company operating for decades, now led by the second generation of founders. Their philosophy treats architecture as frozen music â every building is a potential for beauty, harmony, and an exceptional living environment.",
    valuesTitle: "Brand Values",
    values: [
      { title: "Reliability", desc: "Our buildings speak for themselves" },
      { title: "Seniority", desc: "Experience meets innovation in every project" },
      { title: "Professionalism", desc: "Working with the best professionals in the country" },
      { title: "Innovation", desc: "A new generation of M.N" },
    ],
    logoTitle: "Logo Design",
    logoDesc:
      "The MN mark fuses both Hebrew letters × and ×  with a classic-modern aesthetic. The colors represent stability and the dreamy sky-blue horizon the company promises its clients. 6 logo versions were developed to cover all use cases.",
    logoVersions: "6 Logo Versions",
    colorsTitle: "Color Palette",
    colors: [
      { name: "Stabilizing Navy", hex: "#253E5F", dark: true },
      { name: "Dreamy Blue", hex: "#C6EAFF", dark: false },
      { name: "Clean White", hex: "#ffffff", dark: false, border: true },
    ],
    fontsTitle: "Typography",
    fonts: [
      { name: "Dlilah / Dlilah Thin", role: "Headings & Designs" },
      { name: "Hebbo", role: "Body Text & General Use" },
    ],
    galleryTitle: "Brand Materials",
    deliverablesTitle: "Brand Deliverables",
    deliverables: [
      "Logo System",
      "Brand Guide",
      "Business Cards",
      "Letterhead",
      "Webflow Website",
    ],
    cta: "View Live Site â",
  },
  he: {
    dir: "rtl" as const,
    sectionLabel: "×¢×¨××ª ×××ª×",
    tagline: "××× ×× ××ª ×××××",
    aboutTitle: "×××××ª ×.×  ××××××",
    aboutDesc:
      "×¡××××ª ×××××× ×©×× × ××©×¤××¢× ×¢×××§××ª ×¢× ××××××ª× ×©× ×× ×××. ××ª×× ×ª×¤××¡×ª ×¢××× ××, ×§×× ×××¨×ª ×.×  ×××××× ××¤× × ×¢×©×¨××ª ×©× ××, ××××©××× ××¤×¢×× ×¢× ×××× ×¢× ××× ××××¨ ××©× × ×××××¡×××. ×ª×¤××¡×ª ××¢××× ××¤×× ×××ª ×× ×× ××× ×× ×¤××× ×¦××× ××××¤×, ××¨××× ×× ××¡××××ª ××××¨×× ×××¦××ª ×××¤×.",
    valuesTitle: "×¢×¨××× ×××©×¨×× ×××ª××××ª",
    values: [
      { title: "×××× ××ª", desc: "×××× ×× ×©×× × ××××¨×× ××¤× × ×¢×¦××" },
      { title: "×××ª×§", desc: "×××ª×§ ××××©× ××ª â ××¤××© ××××¦×¨ ×¢×××××ª ×××××¨××ª ××©×× ×××§×¦××¢×××ª" },
      { title: "××§×¦××¢×××ª", desc: "×× × ×¢××××× ×¢× ×× ×©× ××§×¦××¢ ××××××× ×××¨×¥" },
      { title: "×××©× ××ª", desc: "×××¨ ×××© ×©× ×.× " },
    ],
    logoTitle: "×¢××¦×× ×××××",
    logoDesc:
      "××¢×¨××× ×©× ×.×  ×××××× ×××©×¨×× ×××ª××××ª â ×¡××××§× ×§×××¡××ª ××©×××× ×¡××ª×¨ ×©× ×××©× ××ª ××ª××××× ××××××¨ ××× ×´××´ ××´× ×´ ×××¦××¢×× ×××¢×××× ×¢× ××¦××××ª ×××¡×¤×§×ª ××¢×××× ×©× ××××¨×. ××¦××¢×× × ×××¨× ××¦××¢× ××©×××× ×××××××× ×©×ª××¨×××ª ××××¤×§ ××××¤×××× ×©× ××§××××ª×× ×.",
    logoVersions: "6 ××¨×¡×××ª ××××",
    colorsTitle: "××× ×¦××¢××",
    colors: [
      { name: "×××× ××××¦×", hex: "#253E5F", dark: true },
      { name: "×××× ×××××", hex: "#C6EAFF", dark: false },
      { name: "××× × ×§×", hex: "#ffffff", dark: false, border: true },
    ],
    fontsTitle: "×××¤×××¨×¤××",
    fonts: [
      { name: "Dlilah / Dlilah Thin", role: "××××ª×¨××ª ××¢××¦××××" },
      { name: "Hebbo", role: "×××§×¡××× ××©××××© ×¨×××" },
    ],
    galleryTitle: "××××¨× ××××ª×",
    deliverablesTitle: "×ª××¦×¨× ××××ª××",
    deliverables: [
      "××¢×¨××ª ××××",
      "×××¨×× ×××ª×",
      "××¨×××¡× ×××§××¨",
      "× ×××¨××ª ×××ª×××",
      "××ª×¨ Webflow",
    ],
    cta: "â ×××ª×¨ ×××",
  },
};

interface Props {
  lang: "en" | "he";
}

export default function MNBrandShowcase({ lang }: Props) {
  const t = TX[lang];
  const rtl = t.dir === "rtl";
  const [vis, setVis] = useState(false);
  const [galVis, setGalVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const galRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGalVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (galRef.current) obs.observe(galRef.current);
    return () => obs.disconnect();
  }, []);

  const fadeIn = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(20px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <div
      ref={ref}
      style={{
        direction: t.dir,
        fontFamily: rtl ? "'Rubik',sans-serif" : "'Inter',sans-serif",
        padding: "32px 0",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Section badge */}
      <div style={{ ...fadeIn(0), textAlign: "center" }}>
        <span
          style={{
            background: BRAND.dreamBlue,
            color: BRAND.navy,
            borderRadius: 20,
            padding: "4px 16px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {t.sectionLabel}
        </span>
      </div>

      {/* Tagline banner */}
      <div
        style={{
          ...fadeIn(0.05),
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, #1a2e47 100%)`,
          borderRadius: 16,
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: BRAND.dreamBlue,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {"×.×  ××××××"} {"â"} M.N TOWERS
        </div>
        <div
          style={{
            color: BRAND.white,
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: rtl ? 4 : 3,
          }}
        >
          {t.tagline}
        </div>
      </div>

      {/* About section */}
      <div
        style={{
          ...fadeIn(0.1),
          background: "#f0f7fc",
          borderRadius: 14,
          padding: "24px 22px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: BRAND.navy,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 12,
            textAlign: rtl ? "right" : "left",
          }}
        >
          {t.aboutTitle}
        </div>
        <p
          style={{
            color: "#3a4a60",
            fontSize: 14,
            lineHeight: 1.8,
            margin: 0,
            textAlign: rtl ? "right" : "left",
          }}
        >
          {t.aboutDesc}
        </p>
      </div>

      {/* Brand values */}
      <div
        style={{
          ...fadeIn(0.15),
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {t.values.map((v, i) => (
          <div
            key={v.title}
            style={{
              background: BRAND.navy,
              borderRadius: 12,
              padding: "18px 16px",
              borderTop: `3px solid ${BRAND.dreamBlue}`,
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(10px)",
              transition: `all 0.4s ease ${0.2 + i * 0.08}s`,
              textAlign: rtl ? "right" : "left",
            }}
          >
            <div
              style={{
                color: BRAND.dreamBlue,
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              {v.title}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              {v.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Logo design section */}
      <div
        style={{
          ...fadeIn(0.2),
          background: `linear-gradient(135deg, ${BRAND.navy} 0%, #1a2e47 100%)`,
          borderRadius: 16,
          padding: "28px 24px",
          textAlign: rtl ? "right" : "left",
        }}
      >
        <div
          style={{
            color: BRAND.dreamBlue,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {t.logoTitle}
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: 14,
            lineHeight: 1.75,
            margin: "0 0 16px 0",
          }}
        >
          {t.logoDesc}
        </p>
        <span
          style={{
            background: "rgba(198,234,255,0.15)",
            color: BRAND.dreamBlue,
            borderRadius: 20,
            padding: "5px 14px",
            fontSize: 12,
            fontWeight: 600,
            border: "1px solid rgba(198,234,255,0.25)",
          }}
        >
          {t.logoVersions}
        </span>
      </div>

      {/* Colors + Typography row */}
      <div
        style={{
          ...fadeIn(0.25),
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {/* Color palette */}
        <div style={{ background: "#f0f7fc", borderRadius: 12, padding: "24px 20px" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BRAND.navy,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 16,
              textAlign: rtl ? "right" : "left",
            }}
          >
            {t.colorsTitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.colors.map((c) => (
              <div
                key={c.hex}
                style={{
                  display: "flex",
                  flexDirection: rtl ? "row-reverse" : "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: c.hex,
                    border: c.border ? "1.5px solid #ddd" : "none",
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(37,62,95,0.15)",
                  }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.navy }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>
                    {c.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div style={{ background: BRAND.navy, borderRadius: 12, padding: "24px 20px" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BRAND.dreamBlue,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 16,
              textAlign: rtl ? "right" : "left",
            }}
          >
            {t.fontsTitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {t.fonts.map((f, i) => (
              <div
                key={f.name}
                style={{
                  opacity: vis ? 1 : 0,
                  transition: `opacity 0.4s ease ${0.35 + i * 0.1}s`,
                  textAlign: rtl ? "right" : "left",
                }}
              >
                <div
                  style={{
                    color: BRAND.white,
                    fontSize: 15,
                    fontWeight: 600,
                    marginBottom: 3,
                  }}
                >
                  {f.name}
                </div>
                <div style={{ color: BRAND.dreamBlue, fontSize: 12, opacity: 0.8 }}>
                  {f.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ââ Brand Materials Gallery ââ */}
      <div ref={galRef} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            opacity: galVis ? 1 : 0,
            transform: galVis ? "none" : "translateY(20px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BRAND.navy,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {t.galleryTitle}
          </div>
          <div style={{ fontSize: 13, color: "#5a6a7e" }}>
            {lang === "en"
              ? "A selection of branded materials developed for M.N Towers"
              : "××××¨ ××××¨×× ××××ª××× ×©×¤××ª×× ×¢×××¨ ×.×  ××××××"}
          </div>
        </div>
        <div
          className="mn-gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 680px) {
              .mn-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className="mn-gallery-grid-item"
              style={{
                opacity: galVis ? 1 : 0,
                transform: galVis ? "none" : "translateY(16px)",
                transition: `opacity 0.5s ease ${0.08 * i}s, transform 0.5s ease ${0.08 * i}s`,
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `1px solid ${BRAND.brd}`,
                  aspectRatio: "16/9",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 28px rgba(37,62,95,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <img
                  src={img.src}
                  alt={lang === "en" ? img.en : img.he}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLDivElement).style.display = "none";
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: BRAND.navy,
                  fontWeight: 600,
                  marginTop: 6,
                  textAlign: "center",
                  opacity: 0.8,
                }}
              >
                {lang === "en" ? img.en : img.he}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables strip + CTA */}
      <div
        style={{
          ...fadeIn(0.3),
          background: BRAND.dreamBlue,
          borderRadius: 12,
          padding: "20px 24px",
          display: "flex",
          flexDirection: rtl ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: BRAND.navy,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginInlineEnd: 4,
            }}
          >
            {t.deliverablesTitle}:
          </span>
          {t.deliverables.map((d) => (
            <span
              key={d}
              style={{
                background: BRAND.navy,
                color: BRAND.white,
                borderRadius: 20,
                padding: "3px 12px",
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {d}
            </span>
          ))}
        </div>
        <a
          href="https://www.mn-towers.co.il/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: BRAND.navy,
            color: BRAND.white,
            borderRadius: 8,
            padding: "9px 18px",
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {t.cta}
        </a>
      </div>
    </div>
  );
}
