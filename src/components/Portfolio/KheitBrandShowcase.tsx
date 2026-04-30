interface Props {
  lang: "en" | "he";
}

const BRAND = {
  primary: "#3A3656",
  secondary: "#8484B7",
  bgTint: "#E8E6F5",
  white: "#FFFFFF",
};

const COLORS = [
  { hex: "#3A3656", name: { en: "Deep Navy", he: "כחול כהה" } },
  { hex: "#8484B7", name: { en: "Lavender", he: "לבנדר" } },
  { hex: "#E8E6F5", name: { en: "Mist", he: "אפרפר" }, border: true },
  { hex: "#FFFFFF", name: { en: "White", he: "לבן" }, border: true },
];

const GALLERY = [
  { src: "/projects/kheit-brand-brand-system.jpg", label: { en: "Brand Identity System", he: "מערכת זהות מותג" } },
  { src: "/projects/kheit-brand-logo-variations.jpg", label: { en: "Logo Variations", he: "וריאציות לוגו" } },
];

const FEATURES = {
  en: [
    { icon: "\u{1F3DB}️", title: "Complete Logo System", desc: "6 logo variations covering print, digital, signage, and branded environments." },
    { icon: "🎨", title: "Visual Identity", desc: "Primary and secondary color palette with typography guidelines ensuring consistency." },
    { icon: "📏", title: "Brand Guidelines", desc: "Comprehensive brand guide covering logo usage, spacing rules, and approved color combinations." },
  ],
  he: [
    { icon: "\u{1F3DB}️", title: "מערכת לוגו מלאה", desc: "6 וריאציות לוגו להדפסה, דיגיטל, שילוט וסביבות ממותגות." },
    { icon: "🎨", title: "זהות ויזואלית", desc: "פלטת צבעים ראשית ומשנית עם הנחיות טיפוגרפיה לעקביות." },
    { icon: "📏", title: "מדריך מותגי", desc: "מדריך מותג מקיף הכולל שימוש בלוגו, כללי ריווח ושילובי צבע מאושרים." },
  ],
};

const CONTENT = {
  en: {
    badge: "Brand Identity",
    colorTitle: "Color Palette",
    typographyTitle: "Typography",
    galleryTitle: "Deliverables",
    featuresTitle: "Project Highlights",
    visionQuote: "Precision in numbers. Clarity in identity.",
    tagline: "Brand Identity · Logo System · Visual Guidelines",
    rtlLabel: "CPA & Financial Advisors",
  },
  he: {
    badge: "זהות מותג",
    colorTitle: "פלטת צבעים",
    typographyTitle: "טיפוגרפיה",
    galleryTitle: "תוצרים",
    featuresTitle: "נקודות בולטות",
    visionQuote: "דיוק במספרים. בהירות בזהות.",
    tagline: "זהות מותג · מערכת לוגו · הנחיות ויזואליות",
    rtlLabel: "רואי חשבון ויועצים",
  },
};

export default function KheitBrandShowcase({ lang }: Props) {
  const c = CONTENT[lang];
  const rtl = lang === "he";

  const sectionTitle = (): React.CSSProperties => ({
    fontSize: 18,
    fontWeight: 700,
    color: BRAND.primary,
    marginBottom: 16,
    textAlign: rtl ? "right" : "left",
    fontFamily: rtl ? "'Rubik', sans-serif" : "'Syne', sans-serif",
  });

  return (
    <div style={{
      fontFamily: rtl ? "'Rubik', sans-serif" : "'Inter', sans-serif",
      direction: rtl ? "rtl" : "ltr",
      color: "#1a1a2e",
      paddingTop: 8,
    }}>

      {/* Badge */}
      <div style={{ marginBottom: 24, textAlign: rtl ? "right" : "left" }}>
        <span style={{
          background: `${BRAND.secondary}22`,
          color: BRAND.primary,
          fontSize: 12,
          fontWeight: 700,
          padding: "4px 14px",
          borderRadius: 20,
          letterSpacing: 1,
          textTransform: "uppercase" as const,
        }}>
          {c.badge}
        </span>
      </div>

      {/* Section 1 — Full Wordmark Hero */}
      <div style={{
        width: "100%",
        background: BRAND.primary,
        borderRadius: 14,
        border: `1px solid ${BRAND.secondary}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 32px",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.secondary}28 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <img
          src="/projects/kheit-brand-logo-wordmark.png"
          alt="KHEIT"
          style={{ maxWidth: "min(560px, 80%)", width: "100%", position: "relative", zIndex: 1 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>

      {/* Icon pair — white bg / dark bg */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div style={{
          background: BRAND.white,
          borderRadius: 12,
          border: `1px solid ${BRAND.secondary}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px",
          minHeight: 140,
        }}>
          <img
            src="/projects/kheit-brand-logo-dark.png"
            alt="KHEIT icon"
            style={{ width: "clamp(70px, 12vw, 110px)" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
        <div style={{
          background: BRAND.primary,
          borderRadius: 12,
          border: `1px solid ${BRAND.secondary}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px",
          minHeight: 140,
        }}>
          <img
            src="/projects/kheit-brand-logo-light.png"
            alt="KHEIT icon reversed"
            style={{ width: "clamp(70px, 12vw, 110px)" }}
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
                border: col.border ? `1.5px solid ${BRAND.secondary}` : "none",
                boxShadow: "0 2px 10px rgba(58,54,86,0.15)",
              }} />
              <span style={{ fontSize: 11, color: "#555", fontWeight: 600, textAlign: "center" }}>{col.name[lang]}</span>
              <span style={{ fontSize: 10, fontFamily: "monospace", color: "#999" }}>{col.hex}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — Typography */}
      <div style={{
        background: BRAND.bgTint, borderRadius: 14, padding: "20px 24px",
        marginBottom: 32, border: `1px solid ${BRAND.secondary}20`,
      }}>
        <h3 style={{ ...sectionTitle(), marginBottom: 12 }}>{c.typographyTitle}</h3>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center", flexDirection: rtl ? "row-reverse" : "row" }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: BRAND.primary, letterSpacing: 4, fontFamily: "sans-serif" }}>
              KHEIT
            </div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>Open Sans Hebrew Condensed</div>
          </div>
          <div style={{ width: 1, height: 48, background: `${BRAND.secondary}40` }} />
          <div style={{ textAlign: rtl ? "right" : "left" }}>
            <div style={{ fontSize: 14, color: BRAND.primary, fontWeight: 600 }}>{c.rtlLabel}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>340 Regular — Tagline</div>
          </div>
        </div>
      </div>

      {/* Section 4 — Gallery */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={sectionTitle()}>{c.galleryTitle}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {GALLERY.map((item) => (
            <div key={item.src} style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${BRAND.secondary}25`, background: BRAND.bgTint }}>
              <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                <img
                  src={item.src}
                  alt={item.label[lang]}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: BRAND.primary, textAlign: rtl ? "right" : "left" }}>
                {item.label[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5 — Feature Cards */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={sectionTitle()}>{c.featuresTitle}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {FEATURES[lang].map((f, i) => (
            <div key={i} style={{
              background: BRAND.bgTint, borderRadius: 12, padding: "18px 20px",
              border: `1px solid ${BRAND.secondary}25`, textAlign: rtl ? "right" : "left",
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <h4 style={{ color: BRAND.primary, fontWeight: 700, fontSize: 14, margin: "0 0 8px" }}>{f.title}</h4>
              <p style={{ color: "#666", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 6 — Vision Strip */}
      <div style={{
        background: BRAND.primary, borderRadius: 14, padding: "28px 32px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60, width: 200, height: 200,
          borderRadius: "50%", background: `${BRAND.secondary}20`, pointerEvents: "none",
        }} />
        <p style={{ fontStyle: "italic", fontSize: 20, color: BRAND.bgTint, margin: 0, fontWeight: 500, position: "relative", zIndex: 1 }}>
          "{c.visionQuote}"
        </p>
        <p style={{ color: `${BRAND.bgTint}80`, fontSize: 12, marginTop: 10, marginBottom: 0, position: "relative", zIndex: 1 }}>
          {c.tagline}
        </p>
      </div>

    </div>
  );
}
