import { useEffect, useRef, useState } from "react";

/* ── Brand tokens from the actual M.N Towers Brand Guide V.1 | 2022 ── */
const BRAND = {
  navy: "#253E5F",
  dreamBlue: "#C6EAFF",
  white: "#ffffff",
  darkCard: "rgba(15,24,38,0.85)",
  brd: "#1e2d45",
};

/* ── Bilingual content — every fact sourced from the PDF ── */
const TX = {
  en: {
    dir: "ltr" as const,
    sectionLabel: "Brand Guide",
    tagline: "Building the Dream",
    aboutTitle: "About M.N Towers",
    aboutDesc:
      "M.N Towers is a construction and engineering company operating for decades, now led by the second generation of founders. Their philosophy treats architecture as frozen music — every building is a potential for beauty, harmony, and an exceptional living environment.",
    valuesTitle: "Brand Values",
    values: [
      { title: "Reliability", desc: "Our buildings speak for themselves" },
      { title: "Seniority", desc: "Experience meets innovation in every project" },
      { title: "Professionalism", desc: "Working with the best professionals in the country" },
      { title: "Innovation", desc: "A new generation of M.N" },
    ],
    logoTitle: "Logo Design",
    logoDesc:
      "The MN mark fuses both Hebrew letters מ and נ with a classic-modern aesthetic. The colors represent stability and the dreamy sky-blue horizon the company promises its clients. 6 logo versions were developed to cover all use cases.",
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
    deliverablesTitle: "Brand Deliverables",
    deliverables: [
      "Logo System",
      "Brand Guide",
      "Business Cards",
      "Letterhead",
      "Webflow Website",
    ],
    cta: "View Live Site \u2192",
  },
  he: {
    dir: "rtl" as const,
    sectionLabel: "\u05e2\u05e8\u05db\u05ea \u05de\u05d5\u05ea\u05d2",
    tagline: "\u05d1\u05d5\u05e0\u05d9\u05dd \u05d0\u05ea \u05d4\u05d7\u05dc\u05d5\u05dd",
    aboutTitle: "\u05d0\u05d5\u05d3\u05d5\u05ea \u05de.\u05e0 \u05de\u05d2\u05d3\u05dc\u05d9\u05dd",
    aboutDesc:
      "\u05e1\u05d1\u05d9\u05d1\u05ea \u05d4\u05de\u05d7\u05d9\u05d9\u05d4 \u05e9\u05dc\u05e0\u05d5 \u05de\u05e9\u05e4\u05d9\u05e2\u05d4 \u05e2\u05de\u05d5\u05e7\u05d5\u05ea \u05e2\u05dc \u05d4\u05d5\u05d5\u05d9\u05d9\u05ea\u05d5 \u05e9\u05dc \u05db\u05dc \u05d0\u05d3\u05dd. \u05de\u05ea\u05d5\u05da \u05ea\u05e4\u05d9\u05e1\u05ea \u05e2\u05d5\u05dc\u05dd \u05d6\u05d5, \u05e7\u05de\u05d4 \u05d7\u05d1\u05e8\u05ea \u05de.\u05e0 \u05de\u05d2\u05d3\u05dc\u05d9\u05dd \u05dc\u05e4\u05e0\u05d9 \u05e2\u05e9\u05e8\u05d5\u05ea \u05e9\u05e0\u05d9\u05dd, \u05d5\u05de\u05de\u05e9\u05d9\u05db\u05d4 \u05dc\u05e4\u05e2\u05d5\u05dc \u05e2\u05d3 \u05d4\u05d9\u05d5\u05dd \u05e2\u05dc \u05d9\u05d3\u05d9 \u05d4\u05d3\u05d5\u05e8 \u05d4\u05e9\u05e0\u05d9 \u05dc\u05de\u05d9\u05d9\u05e1\u05d3\u05d9\u05dd. \u05ea\u05e4\u05d9\u05e1\u05ea \u05d4\u05e2\u05d5\u05dc\u05dd \u05dc\u05e4\u05d9\u05d4 \u05d1\u05d9\u05ea \u05d0\u05d5 \u05d1\u05e0\u05d9\u05d9\u05df \u05d4\u05dd \u05e4\u05d5\u05d8\u05e0\u05e6\u05d9\u05d0\u05dc \u05dc\u05d9\u05d5\u05e4\u05d9, \u05d4\u05e8\u05de\u05d5\u05e0\u05d9\u05d4 \u05d5\u05e1\u05d1\u05d9\u05d1\u05ea \u05de\u05d2\u05d5\u05e8\u05d9\u05dd \u05d9\u05d5\u05e6\u05d0\u05ea \u05d3\u05d5\u05e4\u05df.",
    valuesTitle: "\u05e2\u05e8\u05db\u05d9\u05dd \u05dc\u05d4\u05e9\u05e8\u05d0\u05d4 \u05de\u05d9\u05ea\u05d5\u05d2\u05d9\u05ea",
    values: [
      { title: "\u05d0\u05de\u05d9\u05e0\u05d5\u05ea", desc: "\u05d4\u05de\u05d1\u05e0\u05d9\u05dd \u05e9\u05dc\u05e0\u05d5 \u05de\u05d3\u05d1\u05e8\u05d9\u05dd \u05d1\u05e4\u05e0\u05d9 \u05e2\u05e6\u05de\u05dd" },
      { title: "\u05d5\u05d5\u05ea\u05e7", desc: "\u05d5\u05d5\u05ea\u05e7 \u05d5\u05d7\u05d3\u05e9\u05e0\u05d5\u05ea \u2014 \u05de\u05e4\u05d2\u05e9 \u05d4\u05d9\u05d5\u05e6\u05e8 \u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05de\u05d2\u05d5\u05de\u05e8\u05d5\u05ea \u05d1\u05e9\u05d9\u05d0 \u05d4\u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea" },
      { title: "\u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea", desc: "\u05d0\u05e0\u05d5 \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd \u05e2\u05dd \u05d0\u05e0\u05e9\u05d9 \u05de\u05e7\u05e6\u05d5\u05e2 \u05de\u05d4\u05d8\u05d5\u05d1\u05d9\u05dd \u05d1\u05d0\u05e8\u05e5" },
      { title: "\u05d7\u05d3\u05e9\u05e0\u05d5\u05ea", desc: "\u05d3\u05d5\u05e8 \u05d7\u05d3\u05e9 \u05e9\u05dc \u05de.\u05e0" },
    ],
    logoTitle: "\u05e2\u05d9\u05e6\u05d5\u05d1 \u05d4\u05dc\u05d5\u05d2\u05d5",
    logoDesc:
      "\u05d4\u05e2\u05e8\u05db\u05d9\u05dd \u05e9\u05dc \u05de.\u05e0 \u05de\u05d2\u05d3\u05dc\u05d9\u05dd \u05dc\u05d4\u05e9\u05e8\u05d0\u05d4 \u05de\u05d9\u05ea\u05d5\u05d2\u05d9\u05ea \u2014 \u05e1\u05d8\u05d8\u05d9\u05e7\u05d4 \u05e7\u05dc\u05d0\u05e1\u05d9\u05ea \u05d5\u05e9\u05d9\u05dc\u05d5\u05d1 \u05e1\u05d5\u05ea\u05e8 \u05e9\u05dc \u05d7\u05d3\u05e9\u05e0\u05d5\u05ea \u05de\u05ea\u05d1\u05d8\u05d0\u05d9\u05dd \u05d1\u05d7\u05d9\u05d1\u05d5\u05e8 \u05d1\u05d9\u05df \u05f4\u05de\u05f4 \u05d5\u05f4\u05e0\u05f4 \u05d5\u05d4\u05e6\u05d1\u05e2\u05d9\u05dd \u05d4\u05de\u05e2\u05d9\u05d3\u05d9\u05dd \u05e2\u05dc \u05d9\u05e6\u05d9\u05d1\u05d5\u05ea \u05d1\u05d0\u05e1\u05e4\u05e7\u05ea \u05d4\u05e2\u05d1\u05d5\u05d3\u05d4 \u05e9\u05dc \u05d4\u05d7\u05d1\u05e8\u05d4. \u05d4\u05e6\u05d1\u05e2\u05d9\u05dd \u05e0\u05d1\u05d7\u05e8\u05d5 \u05d1\u05e6\u05d1\u05e2\u05d9 \u05d4\u05e9\u05de\u05d9\u05d9\u05dd \u05d4\u05d7\u05dc\u05d5\u05de\u05d9\u05d9\u05dd \u05e9\u05ea\u05d5\u05e8\u05de\u05d5\u05ea \u05dc\u05d0\u05d5\u05e4\u05e7 \u05d4\u05d0\u05d5\u05e4\u05d8\u05d9\u05de\u05d9 \u05e9\u05dc \u05dc\u05e7\u05d5\u05d7\u05d5\u05ea\u05d9\u05e0\u05d5.",
    logoVersions: "6 \u05d2\u05e8\u05e1\u05d0\u05d5\u05ea \u05dc\u05d5\u05d2\u05d5",
    colorsTitle: "\u05dc\u05d5\u05d7 \u05e6\u05d1\u05e2\u05d9\u05dd",
    colors: [
      { name: "\u05db\u05d7\u05d5\u05dc \u05de\u05d9\u05d9\u05e6\u05d1", hex: "#253E5F", dark: true },
      { name: "\u05db\u05d7\u05d5\u05dc \u05d7\u05dc\u05d5\u05de\u05d9", hex: "#C6EAFF", dark: false },
      { name: "\u05dc\u05d1\u05df \u05e0\u05e7\u05d9", hex: "#ffffff", dark: false, border: true },
    ],
    fontsTitle: "\u05d8\u05d9\u05e4\u05d5\u05d2\u05e8\u05e4\u05d9\u05d4",
    fonts: [
      { name: "Dlilah / Dlilah Thin", role: "\u05dc\u05db\u05d5\u05ea\u05e8\u05d5\u05ea \u05d5\u05e2\u05d9\u05e6\u05d5\u05d1\u05d9\u05dd" },
      { name: "Hebbo", role: "\u05dc\u05d8\u05e7\u05e1\u05d8\u05d9\u05dd \u05d5\u05e9\u05d9\u05de\u05d5\u05e9 \u05e8\u05d2\u05d9\u05dc" },
    ],
    deliverablesTitle: "\u05ea\u05d5\u05e6\u05e8\u05d9 \u05d4\u05de\u05d9\u05ea\u05d5\u05d2",
    deliverables: [
      "\u05de\u05e2\u05e8\u05db\u05ea \u05dc\u05d5\u05d2\u05d5",
      "\u05de\u05d3\u05e8\u05d9\u05da \u05de\u05d5\u05ea\u05d2",
      "\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05d1\u05d9\u05e7\u05d5\u05e8",
      "\u05e0\u05d9\u05d9\u05e8\u05d5\u05ea \u05de\u05db\u05ea\u05d1\u05d9\u05dd",
      "\u05d0\u05ea\u05e8 Webflow",
    ],
    cta: "\u2190 \u05dc\u05d0\u05ea\u05e8 \u05d4\u05d7\u05d9",
  },
};

interface Props {
  lang: "en" | "he";
}

export default function MNBrandShowcase({ lang }: Props) {
  const t = TX[lang];
  const rtl = t.dir === "rtl";
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
          \u05de.\u05e0 \u05de\u05d2\u05d3\u05dc\u05d9\u05dd \u2014 M.N TOWERS
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
            border: `1px solid rgba(198,234,255,0.25)`,
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
                    border: (c as any).border ? "1.5px solid #ddd" : "none",
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
import { useEffect, useRef, useState } from "react";

const BRAND = {
  navy: "#253e5f",
  sky: "#baebff",
  skyDim: "#8bc8e8",
  white: "#ffffff",
  darkCard: "rgba(15,24,38,0.85)",
  brd: "#1e2d45",
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
      { name: "Harish — Flowers District 23", loc: "Harish" },
      { name: "HaNasi 63", loc: "Herzliya Pituah" },
      { name: "HaKadima", loc: "Herzliya Pituah" },
      { name: "HaTzevoni 16", loc: "Kfar Saba" },
      { name: "HaMelachim 7", loc: "Ramat HaSharon" },
      { name: "Almog 15", loc: "Arsuf" },
    ],
    deliverablesTitle: "Brand Deliverables",
    deliverables: ["Logo System", "Brand Guide", "Business Cards", "Letterhead", "Webflow Website", "Social Assets"],
    cta: "View Live Site \u2192",
  },
  he: {
    dir: "rtl" as const,
    sectionLabel: "\u05de\u05e2\u05e8\u05db\u05ea \u05d6\u05d4\u05d5\u05ea \u05de\u05d5\u05ea\u05d2",
    logoTitle: "\u05e1\u05de\u05dc \u05de.\u05e0",
    logoDesc: "\u05e1\u05de\u05dc MN \u05de\u05e9\u05dc\u05d1 \u05d0\u05ea \u05e9\u05ea\u05d9 \u05d4\u05d0\u05d5\u05ea\u05d9\u05d5\u05ea \u05d1\u05d0\u05e1\u05ea\u05d8\u05d9\u05e7\u05d4 \u05e7\u05dc\u05d0\u05e1\u05d9\u05ea-\u05de\u05d5\u05d3\u05e8\u05e0\u05d9\u05ea. \u05d4\u05e0\u05d9\u05d9\u05d1\u05d9 \u05d4\u05db\u05d4\u05d4 \u05de\u05e2\u05e0\u05d9\u05e7 \u05e1\u05de\u05db\u05d5\u05ea \u05d5\u05de\u05d4\u05d9\u05de\u05e0\u05d5\u05ea; \u05d4\u05ea\u05db\u05dc\u05ea \u05e0\u05d5\u05e9\u05d0\u05ea \u05d0\u05ea \u05d7\u05dc\u05d5\u05dd \u05d4\u05d0\u05d5\u05e4\u05e7 \u05e9\u05d4\u05d7\u05d1\u05e8\u05d4 \u05de\u05d1\u05d8\u05d9\u05d7\u05d4 \u05dc\u05dc\u05e7\u05d5\u05d7\u05d5\u05ea\u05d9\u05d4.",
    colorsTitle: "\u05dc\u05d5\u05d7 \u05e6\u05d1\u05e2\u05d9\u05dd",
    colors: [
      { name: "\u05e0\u05d9\u05d9\u05d1\u05d9", hex: "#253e5f", dark: true },
      { name: "\u05ea\u05db\u05dc\u05ea", hex: "#baebff", dark: false },
      { name: "\u05dc\u05d1\u05df", hex: "#ffffff", dark: false, border: true },
    ],
    specTitle: "\u05d4\u05ea\u05de\u05d7\u05d5\u05d9\u05d5\u05ea",
    specs: ["\u05d1\u05e0\u05d9\u05d9\u05d4 \u05d1\u05d5\u05d8\u05d9\u05e7", "\u05e2\u05d1\u05d5\u05d3\u05d5\u05ea \u05d1\u05d8\u05d5\u05df \u05d7\u05e9\u05d5\u05e3", "\u05d1\u05ea\u05d9\u05dd \u05e4\u05e8\u05d8\u05d9\u05d9\u05dd \u05d5\u05d5\u05d9\u05dc\u05d5\u05ea"],
    projectsTitle: "\u05e4\u05e8\u05d5\u05d9\u05e7\u05d8\u05d9\u05dd \u05e9\u05d9\u05e6\u05e8\u05e0\u05d5",
    projects: [
      { name: "\u05d7\u05e8\u05d9\u05e9 \u2014 \u05e9\u05db\u05d5\u05e0\u05ea \u05d4\u05e4\u05e8\u05d7\u05d9\u05dd 23", loc: "\u05d7\u05e8\u05d9\u05e9" },
      { name: "\u05d4\u05e0\u05e9\u05d9\u05d0 63", loc: "\u05d4\u05e8\u05e6\u05dc\u05d9\u05d4 \u05e4\u05d9\u05ea\u05d5\u05d7" },
      { name: "\u05d4\u05e7\u05d3\u05de\u05d4", loc: "\u05d4\u05e8\u05e6\u05dc\u05d9\u05d4 \u05e4\u05d9\u05ea\u05d5\u05d7" },
      { name: "\u05d4\u05e6\u05d1\u05e2\u05d5\u05e0\u05d9 16", loc: "\u05db\u05e4\u05e8 \u05e1\u05d1\u05d0" },
      { name: "\u05d4\u05de\u05dc\u05db\u05d9\u05dd 7", loc: "\u05e8\u05de\u05ea \u05d4\u05e9\u05e8\u05d5\u05df" },
      { name: "\u05d0\u05dc\u05de\u05d5\u05d2 15", loc: "\u05d0\u05e8\u05e1\u05d5\u05e3" },
    ],
    deliverablesTitle: "\u05ea\u05d5\u05e6\u05e8\u05d9 \u05d4\u05de\u05d9\u05ea\u05d5\u05d2",
    deliverables: ["\u05de\u05e2\u05e8\u05db\u05ea \u05dc\u05d5\u05d2\u05d5", "\u05de\u05d3\u05e8\u05d9\u05da \u05de\u05d5\u05ea\u05d2", "\u05db\u05e8\u05d8\u05d9\u05e1\u05d9 \u05d1\u05d9\u05e7\u05d5\u05e8", "\u05e0\u05d9\u05d9\u05e8 \u05de\u05db\u05ea\u05d1\u05d9\u05dd", "\u05d0\u05ea\u05e8 Webflow", "\u05e0\u05db\u05e1\u05d9 \u05e8\u05e9\u05ea\u05d5\u05ea \u05d7\u05d1\u05e8\u05ea\u05d9\u05d5\u05ea"],
    cta: "\u2190 \u05dc\u05d0\u05ea\u05e8 \u05d4\u05d7\u05d9",
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

  const fadeIn = (delay = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none" : "translateY(20px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <div ref={ref} style={{ direction: t.dir, fontFamily: rtl ? "'Rubik',sans-serif" : "'Inter',sans-serif", padding: "32px 0", display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Section badge */}
      <div style={{ ...fadeIn(0), textAlign: "center" }}>
        <span style={{ background: BRAND.sky, color: BRAND.navy, borderRadius: 20, padding: "4px 16px", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
          {t.sectionLabel}
        </span>
      </div>

      {/* Logo hero */}
      <div style={{ ...fadeIn(0.1), background: `linear-gradient(135deg, ${BRAND.navy} 0%, #1a2e47 100%)`, borderRadius: 16, padding: "36px 28px", display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
        <div style={{ width: 96, height: 96, borderRadius: 14, border: `2px solid ${BRAND.sky}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(186,235,255,0.06)" }}>
          <svg viewBox="0 0 80 80" width="68" height="68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="12" width="12" height="56" fill={BRAND.white} rx="2"/>
            <polygon points="20,12 60,12 60,24 40,48 20,24" fill={BRAND.sky} opacity="0.9"/>
            <rect x="20" y="12" width="40" height="12" fill={BRAND.white} rx="2"/>
            <rect x="60" y="12" width="12" height="56" fill={BRAND.white} rx="2"/>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ color: BRAND.sky, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{t.logoTitle}</div>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 14, lineHeight: 1.75, margin: 0, textAlign: rtl ? "right" : "left" }}>{t.logoDesc}</p>
        </div>
      </div>

      {/* Colors + Specs row */}
      <div style={{ ...fadeIn(0.2), display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {/* Color palette */}
        <div style={{ background: "#f0f7fc", borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.navy, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, textAlign: rtl ? "right" : "left" }}>{t.colorsTitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.colors.map(c => (
              <div key={c.hex} style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: c.hex, border: (c as any).border ? "1.5px solid #ddd" : "none", flexShrink: 0, boxShadow: "0 2px 8px rgba(37,62,95,0.15)" }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.navy }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div style={{ background: BRAND.navy, borderRadius: 12, padding: "24px 20px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.sky, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, textAlign: rtl ? "right" : "left" }}>{t.specTitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.specs.map((s, i) => (
              <div key={s} style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 10, opacity: vis ? 1 : 0, transition: `opacity 0.4s ease ${0.35 + i * 0.1}s` }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.sky, flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div style={{ ...fadeIn(0.3), background: BRAND.darkCard, backdropFilter: "blur(14px)", border: `1px solid ${BRAND.brd}`, borderRadius: 14, padding: "24px 22px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(232,242,255,0.5)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16, textAlign: rtl ? "right" : "left" }}>{t.projectsTitle}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
          {t.projects.map((p, i) => (
            <div key={p.name} style={{
              background: "rgba(186,235,255,0.05)",
              border: `1px solid ${BRAND.brd}`,
              borderRadius: 10, padding: "12px 14px",
              borderTop: `2px solid ${BRAND.sky}`,
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(10px)",
              transition: `all 0.4s ease ${0.4 + i * 0.07}s`,
              textAlign: rtl ? "right" : "left",
            }}>
              <div style={{ color: "rgba(232,242,255,0.9)", fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{p.name}</div>
              <div style={{ color: BRAND.sky, fontSize: 11 }}>{p.loc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables strip + CTA */}
      <div style={{ ...fadeIn(0.4), background: BRAND.sky, borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: BRAND.navy, letterSpacing: 1, textTransform: "uppercase", marginInlineEnd: 4 }}>{t.deliverablesTitle}:</span>
          {t.deliverables.map(d => (
            <span key={d} style={{ background: BRAND.navy, color: BRAND.white, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 500 }}>{d}</span>
          ))}
        </div>
        <a href="https://www.mn-towers.co.il/" target="_blank" rel="noopener noreferrer"
          style={{ background: BRAND.navy, color: BRAND.white, borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
          {t.cta}
        </a>
      </div>
    </div>
  );
  }
