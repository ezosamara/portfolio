import { COLORS as C } from "@/data/constants";
import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";

interface Props {
  lang: Lang;
}

export function Footer({ lang }: Props) {
  const t = TRANSLATIONS[lang];
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "rgba(6,9,18,.95)",
        borderTop: `1px solid rgba(0,229,255,.07)`,
        padding: "24px",
        textAlign: "center",
        fontFamily: t.ff,
        position: "relative",
        zIndex: 1,
        direction: t.dir,
      }}
    >
      <p style={{ color: C.mu, fontSize: 12, margin: 0 }}>
        © {year} Moataz Samara · EZO Agency
      </p>
    </footer>
  );
}
