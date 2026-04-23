import { useEffect, useState } from "react";
import { COLORS as C } from "@/data/constants";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const h = () => {
      const d = document.documentElement;
      setP(
        d.scrollHeight - d.clientHeight > 0
          ? (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100
          : 0
      );
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: `${p}%`,
        background: `linear-gradient(90deg,${C.cyan},${C.vio})`,
        zIndex: 300,
        boxShadow: `0 0 10px ${C.cyan},0 0 20px rgba(0,229,255,.4)`,
        transition: "width .05s linear",
      }}
    />
  );
}
