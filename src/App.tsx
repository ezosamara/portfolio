import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { Lang } from "@/types";
import { FontLoader, GlobalStyles } from "@/components/UI";
import { Home } from "@/pages/Home";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { NotFound } from "@/pages/NotFound";

// Persist language choice across navigation within the session.
// Could be upgraded to localStorage if desired.
export default function App() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <>
      <FontLoader />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
          <Route
            path="/work/:slug"
            element={<ProjectDetail lang={lang} setLang={setLang} />}
          />
          <Route path="*" element={<NotFound lang={lang} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
