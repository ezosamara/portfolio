interface Props {
  lang: "en" | "he";
}

const BRAND = {
  mauve: "#905F68",
  rose: "#BD8087",
  blush: "#FFF4F6",
  cream: "#F5EAE3",
  black: "#0d0a0b",
  border: "rgba(144, 95, 104, 0.18)",
  text: "#2a1f22",
  muted: "#7a6166",
};

const PALETTE = [
  { name: "Dark Mauve", hex: "#905F68" },
  { name: "Rose", hex: "#BD8087" },
  { name: "Blush", hex: "#FFF4F6" },
  { name: "Cream", hex: "#F5EAE3" },
];

const GALLERY = [
  { src: "/projects/raghda-brand-system.jpg", label: "Brand Identity System" },
  { src: "/projects/raghda-business-card.jpg", label: "Business Cards" },
];

const FEATURES = [
  {
    icon: "✦",
    title: "9 Treatments",
    desc: "Illuminate, Revive, Hydrate, Detox, Balance, Glam facials, Lash Lifting, Brow Lifting, Brow Design",
  },
  {
    icon: "◷",
    title: "Online Booking",
    desc: "Clients schedule appointments directly from the website 24/7",
  },
  {
    icon: "❋",
    title: "GENEO Technology",
    desc: "Advanced OxyGeneo + TriPollar facial technology integrated",
  },
];

function FadeIn({
  children,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  inView?: boolean;
  style?: React.CSSProperties;
}) {
  return <div style={style ?? {}}>{children}</div>;
}

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  (e.target as HTMLImageElement).style.display = "none";
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  fontSize: 28,
  fontWeight: 500,
  color: BRAND.mauve,
  letterSpacing: 0.5,
  marginBottom: 20,
  textAlign: "center",
};

const cardBaseStyle: React.CSSProperties = {
  border: `1px solid ${BRAND.border}`,
  borderRadius: 14,
  padding: 28,
};

export default function RaghdaBeautyShowcase({ lang: _lang }: Props) {
  return (
    <div
      style={{
        margin: "48px 0",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: BRAND.text,
      }}
    >
      {/* SECTION 1 — Logo hero + brand colors row */}
      <FadeIn>
        <div
          style={{
            background: BRAND.cream,
            border: "1px solid rgba(144,95,104,0.15)",
            borderRadius: 14,
            height: "clamp(200px, 30vw, 320px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            marginBottom: 20,
          }}
        >
          <img
            src="/projects/raghda-logo-dark.png"
            alt="Raghda Beauty logo"
            style={{ width: "100%", maxWidth: 360, height: "auto", display: "block" }}
            onError={hideOnError}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {PALETTE.map((c) => (
            <div key={c.hex} style={{ textAlign: "center" }}>
              <div
                style={{
                  background: c.hex,
                  height: 36,
                  borderRadius: 6,
                  border: `1px solid ${BRAND.border}`,
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  fontFamily:
                    "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
                  fontSize: 10,
                  color: BRAND.muted,
                  letterSpacing: 0.4,
                }}
              >
                {c.hex}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            color: BRAND.muted,
            fontSize: 12,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            marginBottom: 56,
          }}
        >
          EN + Arabic bilingual identity
        </div>
      </FadeIn>

      {/* SECTION 2 — Color palette */}
      <FadeIn>
        <h3 style={sectionTitleStyle}>Color Palette</h3>
        <div
          style={{
            ...cardBaseStyle,
            background: "#ffffff",
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
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: c.hex,
                  margin: "0 auto 14px",
                  border: `1px solid ${BRAND.border}`,
                  boxShadow: "0 4px 14px rgba(144,95,104,0.12)",
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
      </FadeIn>

      {/* SECTION 3 — Typography */}
      <FadeIn>
        <h3 style={sectionTitleStyle}>Typography</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              ...cardBaseStyle,
              background: BRAND.cream,
              textAlign: "center",
              padding: "44px 28px",
            }}
          >
            <div
              style={{
                fontFamily:
                  "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: 56,
                fontWeight: 400,
                color: BRAND.mauve,
                lineHeight: 1,
                marginBottom: 18,
              }}
            >
              Rigot
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 1.6,
                textTransform: "uppercase",
                color: BRAND.muted,
              }}
            >
              Header Font
            </div>
          </div>
          <div
            style={{
              ...cardBaseStyle,
              background: BRAND.cream,
              textAlign: "center",
              padding: "44px 28px",
            }}
          >
            <div
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 38,
                fontWeight: 400,
                color: BRAND.mauve,
                lineHeight: 1.1,
                marginBottom: 18,
                letterSpacing: 0.4,
              }}
            >
              tt-chocolates
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 1.6,
                textTransform: "uppercase",
                color: BRAND.muted,
              }}
            >
              Body Type
            </div>
          </div>
        </div>
      </FadeIn>

      {/* SECTION 4 — Gallery */}
      <FadeIn>
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
                background: BRAND.blush,
              }}
            >
              <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: BRAND.cream, borderRadius: 10 }}>
                <img
                  src={g.src}
                  alt={g.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={hideOnError}
                />
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: BRAND.mauve,
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
      </FadeIn>

      {/* SECTION 5 — Website features */}
      <FadeIn>
        <h3 style={sectionTitleStyle}>Website Features</h3>
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
                background: BRAND.blush,
                textAlign: "center",
                padding: "28px 24px",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  color: BRAND.rose,
                  marginBottom: 14,
                  lineHeight: 1,
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  fontFamily:
                    "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: BRAND.mauve,
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
      </FadeIn>

      {/* SECTION 6 — Vision strip + CTA */}
      <FadeIn>
        <div
          style={{
            background: BRAND.cream,
            borderRadius: 14,
            border: `1px solid ${BRAND.border}`,
            padding: "56px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily:
                "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontSize: 32,
              fontWeight: 400,
              color: BRAND.mauve,
              lineHeight: 1.3,
              marginBottom: 32,
              letterSpacing: 0.4,
            }}
          >
            Beauty that starts from within
          </div>
          <a
            href="https://raghda-beauty.co.il"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              background: BRAND.mauve,
              color: BRAND.cream,
              textDecoration: "none",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1.6,
              textTransform: "uppercase",
              transition: "background .2s ease, transform .2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = BRAND.rose;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = BRAND.mauve;
            }}
          >
            Visit Website
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
