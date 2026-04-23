import { useEffect } from "react";
import { FONTS_HREF } from "@/data/constants";

export function FontLoader() {
  useEffect(() => {
    if (document.getElementById("pf-fonts")) return;
    const l = document.createElement("link");
    l.id = "pf-fonts";
    l.rel = "stylesheet";
    l.href = FONTS_HREF;
    document.head.appendChild(l);
  }, []);
  return null;
}
