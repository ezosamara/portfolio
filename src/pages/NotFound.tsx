import { Link } from "react-router-dom";
import { COLORS as C } from "@/data/constants";
import type { Lang } from "@/types";
import { StarCanvas, Nebula } from "@/components/UI";

export function NotFound({ lang }: { lang: Lang }) {
  const isHe = lang === "he";
  return (
    <div
      style={{
        background: C.bg,
        color: C.tx,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
        direction: isHe ? "rtl" : "ltr",
      }}
    >
      <StarCanvas />
      <Nebula />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: 96,
            fontWeight: 800,
            background: `linear-gradient(135deg,${C.cyan},${C.vio})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </div>
        <p style={{ color: C.mu, fontSize: 16, marginBottom: 32 }}>
          {isHe ? "הדף שחיפשת לא נמצא." : "Page not found."}
        </p>
        <Link
          to="/"
          style={{
            background: `linear-gradient(135deg,${C.cyan},${C.vio})`,
            color: C.bg,
            padding: "12px 28px",
            borderRadius: 8,
            fontWeight: 700,
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          {isHe ? "חזרה לדף הבית" : "Back Home"}
        </Link>
      </div>
    </div>
  );
}
