interface Props {
  lang: "en" | "he";
}

const BRAND = {
  dark: "#1D1D20",
  primary: "#3A3656",
  secondary: "#8484B7",
  silver: "#C8C8D2",
  white: "#FFFFFF",
};

const COLORS = [
  { hex: "#1D1D20", name: { en: "Charcoal", he: "פחם" } },
  { hex: "#3A3656", name: { en: "Deep Navy", he: "כחול כהה" } },
  { hex: "#8484B7", name: { en: "Silver Blue", he: "כסף-כחול" } },
  { hex: "#FFFFFF", name: { en: "White", he: "לבן" }, border: true },
];

const FONTS = {
  en: [
    { name: "Tholoth", role: "Arabic logo calligraphy", sample: "مثقال سمارة", size: 22 },
    { name: "ARTISRAELISNS", role: "Hebrew logo typeface", sample: "מת'קאל סמארה", size: 18 },
    { name: "Montaser Arabic", role: "Arabic body & files", sample: "مكتب محاماة", size: 16 },
    { name: "Rubik", role: "Hebrew general use", sample: "משרד עורכי דין", size: 16 },
  ],
  he: [
    { name: "Tholoth", role: "קליגרפייה ערבית ללוגו", sample: "مثقال سمارة", size: 22 },
    { name: "ARTISRAELISNS", role: "טיפוגרפייה עברית ללוגו", sample: "מת'קאל סמארה", size: 18 },
    { name: "Montaser Arabic", role: "גוף לערבית", sample: "مكتب محاماة", size: 16 },
    { name: "Rubik", role: "שימוש כללי בעברית", sample: "משרד עורכי דין", size: 16 },
  ],
};

const GALLERY = [
  { src: "/projects/mithkal-samara-print.jpg", label: { en: "Business Cards & Stationery", he: "כרטיסי ביקור ונייריית" } },
  { src: "/projects/mithkal-samara-applications.jpg", label: { en: "Brand Applications", he: "יישומי מותג" } },
  { src: "/projects/mithkal-samara-logo-variations-page.jpg", label: { en: "Logo Variations", he: "וריאציות לוגו" } },
  { src: "/projects/mithkal-samara-icons.jpg", label: { en: "Icon System", he: "מערכת איקונים" } },
  { src: "/projects/mithkal-samara-typography.jpg", label: { en: "Typography System", he: "מערכת טיפוגרפיה" } },
  { src: "/projects/mithkal-samara-brand-system.jpg", label: { en: "Brand Identity System", he: "מערכת זהות מותג" } },
];

const FEATURES = {
  en: [
    { icon: "⚖️", title: "Calligraphic Mark", desc: "A bespoke Arabic calligraphy-inspired monogram — refined, authoritative, and instantly recognizable." },
    { icon: "🖨️", title: "Print System", desc: "Business cards, letterhead, and envelopes designed for a professional legal environment." },
    { icon: "🏙️", title: "Brand Applications", desc: "Signage, branded merchandise, and stationery — consistent identity across every touchpoint." },
    { icon: "🔤", title: "Typography System", desc: "4 typefaces across Arabic and Hebrew — Tholoth for the logo, Rubik and Montaser for body text." },
  ],
  he: [
    { icon: "⚖️", title: "סמל קליגרפי", desc: "מונוגרמה מורשה בסגנון כתב ערבי — מורשה, סמכותית ובלתי נשכחת." },
    { icon: "🖨️", title: "מערכת הדפסה", desc: "כרטיסי ביקור, נייר מכתבים ומעטפות שונו לסביבה משפטית מקצועית." },
    { icon: "🏙️", title: "יישומי מותג", desc: "שילוט, מוצרים ממותגים ונייריית — זהות עקבית בכל נקודת מגע." },
    { icon: "🔤", title: "מערכת טיפוגרפיה", desc: "4 גופנים בערבית ועברית — Tholoth ללוגו, Rubik ו-Montaser לגוף." },
  ],
};

const CONTENT = {
  en: {
    badge: "Brand Identity",
    logoLabel: "Mithkal Samara — Law Office",
    colorTitle: "Color Palette",
    typographyTitle: "Typography",
    galleryTitle: "Deliverables",
    featuresTitle: "Project Highlights",
    visionQuote: "Authority in every detail.",
    tagline: "Brand Identity · Logo System · Print · Brand Applications",
    typefaceLabel: "TYPEFACE",
    bodyLabel: "BODY & GENERAL FONTS",
  },
  he: {
    badge: "זהות מותג",
    logoLabel: "מת'קאל סמארה — משרד עורכי דין",
    colorTitle: "פלטת צבעים",
    typographyTitle: "טיפוגרפיה",
    galleryTitle: "תוצרים",
    featuresTitle: "נקודות בולטות",
    visionQuote: "סמכותיות בכל פרט.",
    tagline: "זהות מותג · מערכת לוגו · הדפסה · יישומים",
    typefaceLabel: "גופני סמל",
    bodyLabel: "גופני גוף",
  },
};

export default function MithkalSamaraShowcase({ lang }: Props) {
  const c = CONTENT[lang];
  const rtl = lang === "he";

  const sectionTitle = (): React.CSSProperties => ({
    fontSize: 18,
    fontWeight: 700,
    color: BRAND.white,
    marginBottom: 16,
    textAlign: rtl ? "right" : "left",
    fontFamily: rtl ? "'Rubik', sans-serif" : "'Syne', sans-serif",
  });

  return (
    <div style={{
      fontFamily: rtl ? "'Rubik', sans-serif" : "'Inter', sans-serif",
      direction: rtl ? "rtl" : "ltr",
      color: BRAND.white,
      paddingTop: 8,
    }}>

      {/* Badge */}
      <div style={{ marginBottom: 24, textAlign: rtl ? "right" : "left" }}>
        <span style={{
          background: `${BRAND.secondary}28`,
          color: BRAND.silver,
          fontSize: 12,
          fontWeight: 700,
          padding: "4px 14px",
          borderRadius: 20,
          letterSpacing: 1,
          textTransform: "uppercase" as const,
          border: `1px solid ${BRAND.secondary}40`,
        }}>
          {c.badge}
        </span>
      </div>

      {/* Section 1 — Logo Hero */}
      <div style={{
        width: "100%",
        background: BRAND.dark,
        borderRadius: 14,
        border: `1px solid ${BRAND.secondary}30`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "44px 32px 32px",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60, width: 260, height: 260,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.secondary}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <img
          src="/projects/mithkal-samara-logo-light.png"
          alt="Mithkal Samara"
          style={{ width: "clamp(140px, 20vw, 220px)", position: "relative", zIndex: 1 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <p style={{ color: BRAND.silver, fontSize: 13, marginTop: 16, marginBottom: 0, textAlign: "center", opacity: 0.8 }}>
          {c.logoLabel}
        </p>
      </div>

      {/* Logo pair — both on white bg */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div style={{
          background: BRAND.white, borderRadius: 12,
          border: `1px solid ${BRAND.secondary}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px 20px", minHeight: 130,
        }}>
          <img
            src="/projects/mithkal-samara-logo-dark.png"
            alt="Mithkal Samara vertical logo"
            style={{ width: "clamp(80px, 14vw, 130px)" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <div style={{
          background: BRAND.dark, borderRadius: 12,
          border: `1px solid ${BRAND.secondary}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "24px 20px", minHeight: 130,
        }}>
          <img
            src="/projects/mithkal-samara-logo-horizontal.png"
            alt="Mithkal Samara horizontal logo"
            style={{ width: "clamp(120px, 20vw, 200px)" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      </div>

      {/* Section 2 — Color Palette */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={sectionTitle()}>{c.colorTitle}</h3>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: rtl ? "flex-end" : "flex-start" }}>
          {COLORS.map((col) => (
            <div key={col.hex} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%", background: col.hex,
                border: col.border ? `1.5px solid ${BRAND.secondary}` : `1px solid ${BRAND.secondary}40`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }} />
              <span style={{ fontSize: 11, color: BRAND.silver, fontWeight: 600, textAlign: "center" }}>{col.name[lang]}</span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: `${BRAND.silver}80` }}>{col.hex}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — Typography (full 4-font system) */}
      <div style={{
        background: `${BRAND.primary}40`,
        borderRadius: 14,
        padding: "22px 24px",
        marginBottom: 32,
        border: `1px solid ${BRAND.secondary}25`,
      }}>
        <h3 style={{ ...sectionTitle(), marginBottom: 18 }}>{c.typographyTitle}</h3>

        {/* Typeface row */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: `${BRAND.silver}70`, marginBottom: 10, textTransform: "uppercase" as const }}>
            {c.typefaceLabel}
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", flexDirection: rtl ? "row-reverse" : "row" }}>
            {FONTS[lang].slice(0, 2).map((f) => (
              <div key={f.name} style={{
                flex: "1 1 180px",
                background: `${BRAND.dark}80`,
                borderRadius: 10,
                padding: "14px 16px",
                border: `1px solid ${BRAND.secondary}20`,
              }}>
                <div style={{ fontSize: f.size, color: BRAND.silver, fontFamily: "serif", marginBottom: 6, direction: "rtl" }}>
                  {f.sample}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: BRAND.white }}>{f.name}</div>
                <div style={{ fontSize: 11, color: `${BRAND.silver}70`, marginTop: 2 }}>{f.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body fonts row */}
        <div style={{ height: 1, background: `${BRAND.secondary}25`, marginBottom: 14 }} />
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: `${BRAND.silver}70`, marginBottom: 10, textTransform: "uppercase" as const }}>
            {c.bodyLabel}
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", flexDirection: rtl ? "row-reverse" : "row" }}>
            {FONTS[lang].slice(2).map((f) => (
              <div key={f.name} style={{
                flex: "1 1 180px",
                background: `${BRAND.dark}80`,
                borderRadius: 10,
                padding: "14px 16px",
                border: `1px solid ${BRAND.secondary}20`,
              }}>
                <div style={{ fontSize: f.size, color: BRAND.silver, fontFamily: f.name === "Rubik" ? "'Rubik', sans-serif" : "sans-serif", marginBottom: 6, direction: "rtl" }}>
                  {f.sample}
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: BRAND.white }}>{f.name}</div>
                <div style={{ fontSize: 11, color: `${BRAND.silver}70`, marginTop: 2 }}>{f.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4 — Gallery (6 images) */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={sectionTitle()}>{c.galleryTitle}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {GALLERY.map((item) => (
            <div key={item.src} style={{
              borderRadius: 12, overflow: "hidden",
              border: `1px solid ${BRAND.secondary}25`,
              background: BRAND.dark,
            }}>
              <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                <img
                  src={item.src}
                  alt={item.label[lang]}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: BRAND.silver, textAlign: rtl ? "right" : "left" }}>
                {item.label[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5 — Feature Cards */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={sectionTitle()}>{c.featuresTitle}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 }}>
          {FEATURES[lang].map((f, i) => (
            <div key={i} style={{
              background: `${BRAND.primary}35`,
              borderRadius: 12,
              padding: "18px 20px",
              border: `1px solid ${BRAND.secondary}25`,
              textAlign: rtl ? "right" : "left",
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <h4 style={{ color: BRAND.white, fontWeight: 700, fontSize: 14, margin: "0 0 8px" }}>{f.title}</h4>
              <p style={{ color: BRAND.silver, fontSize: 13, lineHeight: 1.65, margin: 0, opacity: 0.85 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6 — Vision Strip */}
      <div style={{
        background: BRAND.dark,
        borderRadius: 14,
        padding: "28px 32px",
        textAlign: "center",
        border: `1px solid ${BRAND.secondary}30`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -50, right: -50, width: 180, height: 180,
          borderRadius: "50%", background: `${BRAND.secondary}15`, pointerEvents: "none",
        }} />
        <p style={{ fontStyle: "italic", fontSize: 20, color: BRAND.silver, margin: 0, fontWeight: 500, position: "relative", zIndex: 1 }}>
          "{c.visionQuote}"
        </p>
        <p style={{ color: `${BRAND.silver}60`, fontSize: 12, marginTop: 10, marginBottom: 0, position: "relative", zIndex: 1 }}>
          {c.tagline}
        </p>
      </div>

    </div>
  );
}
