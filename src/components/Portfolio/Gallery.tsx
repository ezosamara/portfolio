import { useState } from "react";
import type { Lang } from "@/types";
import { COLORS as C } from "@/data/constants";

interface Props {
  images: string[];
  title: string;
  mob: boolean;
  lang: Lang;
}

export function Gallery({ images, title, mob }: Props) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) return null;

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: `1px solid ${C.brd}`, marginBottom: 12 }}>
        <img src={images[active]} alt={`${title} ${active + 1}`}
          style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block", transition: "opacity .3s" }}
          loading="lazy" onError={e => { e.currentTarget.style.display = "none"; }} />
        {images.length > 1 && (
          <>
            <button onClick={() => setActive(i => (i - 1 + images.length) % images.length)}
              style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", border: "none",
                color: C.tx, width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
                fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseOver={e => (e.currentTarget.style.background = "rgba(0,229,255,.35)")}
              onMouseOut={e => (e.currentTarget.style.background = "rgba(0,0,0,.55)")}>&lsaquo;</button>
            <button onClick={() => setActive(i => (i + 1) % images.length)}
              style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                background: "rgba(0,0,0,.55)", backdropFilter: "blur(6px)", border: "none",
                color: C.tx, width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
                fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseOver={e => (e.currentTarget.style.background = "rgba(0,229,255,.35)")}
              onMouseOut={e => (e.currentTarget.style.background = "rgba(0,0,0,.55)")}>&rsaquo;</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4,
          scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {images.map((src, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ flex: "0 0 auto", width: mob ? 56 : 72, height: mob ? 38 : 48,
                borderRadius: 8, overflow: "hidden", cursor: "pointer", padding: 0,
                border: i === active ? `2px solid ${C.cyan}` : `1px solid ${C.brd}`,
                opacity: i === active ? 1 : 0.6, transition: "all .2s",
                background: "transparent" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
