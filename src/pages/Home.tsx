import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { useWindowWidth, useScrollY } from "@/hooks";
import {
  StarCanvas,
  Nebula,
  ScrollProgress,
  FloatingParticles,
} from "@/components/UI";
import {
  Navigation,
  Hero,
  About,
  Services,
  Work,
  Timeline,
  GitHubSection,
  Contact,
  Footer,
} from "@/components/Portfolio";

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export function Home({ lang, setLang }: Props) {
  const w = useWindowWidth();
  const mob = w < 768;
  const sm = w < 480;
  const sy = useScrollY();
  const t = TRANSLATIONS[lang];

  return (
    <div
      style={{
        background: "#060912",
        color: "#E8F2FF",
        minHeight: "100vh",
        fontFamily: t.ff,
        direction: t.dir,
      }}
    >
      <StarCanvas />
      <Nebula />
      <ScrollProgress />
      <FloatingParticles sy={sy} />
      <Navigation lang={lang} setLang={setLang} mob={mob} />
      <Hero lang={lang} mob={mob} sm={sm} />
      <About lang={lang} mob={mob} />
      <Services lang={lang} mob={mob} />
      <Work lang={lang} mob={mob} />
      <Timeline lang={lang} mob={mob} />
      <GitHubSection lang={lang} mob={mob} />
      <Contact lang={lang} mob={mob} />
      <Footer lang={lang} />
    </div>
  );
}
