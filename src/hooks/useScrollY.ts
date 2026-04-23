import { useEffect, useState } from "react";

export function useScrollY(): number {
  const [sy, setSy] = useState(0);
  useEffect(() => {
    const h = () => setSy(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return sy;
}
