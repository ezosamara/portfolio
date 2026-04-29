interface Props {
  lang: "en" | "he";
}

const BRAND = {
  purple: "#2E2D42",
  grey: "#B4B4BE",
  cyan: "#00EFFF",
  white: "#FFFFFF",
  border: "rgba(0, 239, 255, 0.15)",
  text: "#e9eef6",
  muted: "#9aa3b2",
};

const PALETTE = [
  { name: "Dark Purple", hex: "#2E2D42" },
  { name: "Basic Grey", hex: "#B4B4BE" },
  { name: "Bright Cyan", hex: "#00EFFF" },
  { name: "White", hex: "#FFFFFF" },
];

const GALLERY = [
  { src: "/projects/revibes-brand-system.jpg", label: "Brand Identity System" },
  { src: "/projects/revibes-brand-guide.jpg", label: "Brand Guide" },
  { src: "/projects/revibes-logo-light.png", label: "Logo — Light Version" },
  { src: "/projects/revibes-logo-dark.png", label: "Logo — Dark Version" },
];

const FEATURES = [
  {
    icon: "✿",
    title: "The Flower Mark",
    desc: "Blooming petals represent growth. The cyan center dot represents scent dispersal — RE + VIBES.",
  },
  {
    icon: "⁂",
    title: "Bilingual System",
    desc: "Full identity in Hebrew and English. Lastica for EN, Heebo for HE.",
  },
  {
    icon: "⧗",
    title: "Brand Guide",
    desc: "Logo rules, color system, typography, spacing and application guidelines.",
  },
];

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  (e.target as HTMLImageElement).style.display = "none";
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: 26,
  fontWeight: 700,
  color: BRAND.text,
  letterSpacing: 0.4,
  marginBottom: 20,
  textAlign: "center",
};

const cardBaseStyle: React.CSSProperties = {
  border: `1px solid ${BRAND.border}`,
  borderRadius: 14,
  padding: 28,
};

export default function RevibesShowcase({ lang: _lang }: Props) {
  return (
    <div
      style={{
        margin: "48px 0",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: BRAND.text,
      }}
    >
      {/* SECTION 1 — Logo display */}
      <div
        style={{
          background: BRAND.purple,
          border: `1px solid ${BRAND.border}`,
          borderRadius: 14,
          height: "clamp(200px, 30vw, 320px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          marginBottom: 56,
          overflow: "hidden",
        }}
      >
        <img
          src="/projects/revibes-logo-light.png"
          alt="Revibes logo"
          style={{ width: "100%", maxWidth: 360, height: "auto", display: "block" }}
          onError={hideOnError}
        />
      </div>

      {/* SECTION 2 — Color palette */}
      <h3 style={sectionTitleStyle}>Color Palette</h3>
      <div
        style={{
          ...cardBaseStyle,
          background: "rgba(46,45,66,0.5)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 24,
          padding: "36px 28px",
          marginBottom: 56,
        }}
      >
        {PALETTE.map((c) => (
          <div key={c.hex} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: c.hex,
                margin: "0 auto 14px",
                border: `1px solid ${BRAND.border}`,
                boxShadow: "0 4px 14px rgba(0,239,255,0.08)",
              }}
            />
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: BRAND.text,
                marginBottom: 4,
                letterSpacing: 0.3,
              }}
            >
              {c.name}
            </div>
            <div
              style={{
                fontFamily:
                  "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
                fontSize: 11,
                color: BRAND.muted,
                letterSpacing: 0.5,
              }}
            >
              {c.hex}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 3 — Gallery */}
      <h3 style={sectionTitleStyle}>Brand Deliverables</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 18,
          marginBottom: 56,
        }}
      >
        {GALLERY.map((g) => (
          <div
            key={g.src}
            style={{
              border: `1px solid ${BRAND.border}`,
              borderRadius: 10,
              overflow: "hidden",
              background: BRAND.purple,
            }}
          >
            <div
              style={{
                aspectRatio: "16 / 10",
                overflow: "hidden",
                background: BRAND.purple,
              }}
            >
              <img
                src={g.src}
                alt={g.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={hideOnError}
              />
            </div>
            <div
              style={{
                padding: "12px 16px",
                fontSize: 12,
                fontWeight: 600,
                color: BRAND.cyan,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              {g.label}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 4 — Brand story */}
      <h3 style={sectionTitleStyle}>Brand Story</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
          marginBottom: 56,
        }}
      >
        {FEATURES.map((f) => (
          <div
            key={f.title}
            style={{
              ...cardBaseStyle,
              background: "rgba(46,45,66,0.5)",
              textAlign: "center",
              padding: "28px 24px",
            }}
          >
            <div
              style={{
                fontSize: 30,
                color: BRAND.cyan,
                marginBottom: 14,
                lineHeight: 1,
              }}
            >
              {f.icon}
            </div>
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: BRAND.text,
                marginBottom: 10,
                letterSpacing: 0.3,
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: BRAND.muted,
              }}
            >
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      {/* SECTION 5 — Vision strip */}
      <div
        style={{
          background: BRAND.cyan,
          borderRadius: 14,
          padding: "44px 32px",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: BRAND.purple,
            lineHeight: 1.3,
            marginBottom: 10,
            letterSpacing: 0.4,
          }}
        >
          The flower that never stops refreshing.
        </div>
        <div
          style={{
            fontFamily: "'Heebo', system-ui, sans-serif",
            fontSize: 16,
            fontWeight: 500,
            color: BRAND.purple,
            opacity: 0.7,
            direction: "rtl",
          }}
        >
          {"ריוויבס"}
        </div>
      </div>

      {/* SECTION 6 — CTA */}
      <div style={{ textAlign: "center" }}>
        <a
          href="https://www.revibes.co.il"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: BRAND.cyan,
            color: BRAND.purple,
            textDecoration: "none",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            transition: "background .2s ease, transform .2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = BRAND.white;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = BRAND.cyan;
          }}
        >
          Visit Website
        </a>
      </div>
    </div>
  );
}
