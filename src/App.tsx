import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import type { Lang } from "@/types";
import { FontLoader, GlobalStyles } from "@/components/UI";
import { Home } from "@/pages/Home";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { NotFound } from "@/pages/NotFound";

/** Wraps routes in a keyed div so each navigation triggers a fade-in. */
function AnimatedRoutes({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      style={{ animation: "fadeRouteIn .25s ease both" }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
        <Route
          path="/work/:slug"
          element={<ProjectDetail lang={lang} setLang={setLang} />}
        />
        <Route path="*" element={<NotFound lang={lang} />} />
      </Routes>
    </div>
  );
}

// Persist language choice across navigation within the session.
export default function App() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <>
      <FontLoader />
      <GlobalStyles />
      <BrowserRouter>
        <AnimatedRoutes lang={lang} setLang={setLang} />
      </BrowserRouter>
    </>
  );
}
