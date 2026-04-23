import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C } from "@/data/constants";

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
  mob: boolean;
}

const NAV_IDS = ["about", "services", "work", "timeline", "github", "contact"] as const;
type NavId = (typeof NAV_IDS)[number];

export function Navigation({ lang, setLang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const px = mob ? 16 : 24;
  const navLabels: Record<NavId, string> = {
    about: t.nav.about,
    services: t.nav.services,
    work: t.nav.work,
    timeline: t.nav.timeline,
    github: t.nav.github,
    contact: t.nav.contact,
  };

  const hrefFor = (id: NavId) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "rgba(6,9,18,.9)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid rgba(0,229,255,.07)`,
        direction: t.dir,
      }}
    >
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `0 ${px}px`,
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 20,
            background: `linear-gradient(135deg,${C.cyan},${C.vio})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: 1,
            textDecoration: "none",
          }}
        >
          MO.
        </Link>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {(["en", "he"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                background: lang === l ? C.cyan : "transparent",
                color: lang === l ? C.bg : C.mu,
                border: `1px solid ${lang === l ? C.cyan : "rgba(107,132,176,.3)"}`,
                borderRadius: 6,
                padding: "2px 8px",
                fontSize: 11,
                cursor: "pointer",
                fontWeight: 700,
                transition: "all .2s",
              }}
            >
              {l === "en" ? "EN" : "עב"}
            </button>
          ))}

          {mob ? (
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "transparent",
                border: `1px solid rgba(107,132,176,.3)`,
                borderRadius: 6,
                padding: "5px 9px",
                cursor: "pointer",
                color: C.tx,
                fontSize: 16,
                marginLeft: 4,
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          ) : (
            <div style={{ display: "flex", gap: 18, marginLeft: 16 }}>
              {NAV_IDS.map((id) => (
                <a
                  key={id}
                  href={hrefFor(id)}
                  style={{
                    color: C.mu,
                    fontSize: 12,
                    textDecoration: "none",
                    fontWeight: 600,
                    transition: "color .2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = C.cyan)}
                  onMouseOut={(e) => (e.currentTarget.style.color = C.mu)}
                >
                  {navLabels[id]}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {mob && menuOpen && (
        <div
          style={{
            borderTop: `1px solid rgba(0,229,255,.07)`,
            padding: "10px 16px",
            background: "rgba(6,9,18,.97)",
          }}
        >
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={hrefFor(id)}
              onClick={() => setMenuOpen(false)}
              style={{
                color: C.mu,
                fontSize: 14,
                textDecoration: "none",
                fontWeight: 600,
                padding: "11px 4px",
                borderBottom: `1px solid rgba(30,45,69,.5)`,
                display: "block",
                textAlign: rtl ? "right" : "left",
                fontFamily: t.ff,
              }}
            >
              {navLabels[id]}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
