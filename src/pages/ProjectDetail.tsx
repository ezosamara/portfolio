import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C } from "@/data/constants";
import { getProjectBySlug, getRelatedProjects, PROJECTS } from "@/data/projects";
import { useWindowWidth } from "@/hooks";
import { StarCanvas, Nebula, ScrollProgress, Tag, Glass, tilt, untilt } from "@/components/UI";
import { Navigation } from "@/components/Portfolio";
import { TiraDataViz } from "@/components/Portfolio/TiraDataViz";
import { Gallery } from "@/components/Portfolio/Gallery";
import { MetricCallouts } from "@/components/Portfolio/MetricCallouts";
import { DeptBreakdown } from "@/components/Portfolio/DeptBreakdown";
import MNBrandShowcase from "@/components/Portfolio/MNBrandShowcase";
import RaghdaBeautyShowcase from "@/components/Portfolio/RaghdaBeautyShowcase";

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
}

function InfoBlock({ label, value, ff }: { label: string; value: string; ff: string }) {
  return (
    <div style={{ background: "rgba(15,24,38,.85)", border: `1px solid ${C.brd}`, borderRadius: 10, padding: "12px 16px" }}>
      <div style={{ color: C.mu, fontSize: 11, fontWeight: 700, marginBottom: 4, letterSpacing: 0.5 }}>{label.toUpperCase()}</div>
      <div style={{ color: C.tx, fontSize: 14, fontFamily: ff }}>{value}</div>
    </div>
  );
}

function NarrativeCard({ heading, body, accent, ff, hf }: { heading: string; body: string; accent: string; ff: string; hf: string }) {
  return (
    <div style={{ background: "rgba(15,24,38,.82)", backdropFilter: "blur(14px)", border: `1px solid ${C.brd}`, borderRadius: 14, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: `linear-gradient(90deg,${accent},${C.vio})` }} />
      <h3 style={{ fontFamily: hf, color: accent, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{heading}</h3>
      <p style={{ color: C.mu, lineHeight: 1.8, fontSize: 14, fontFamily: ff }}>{body}</p>
    </div>
  );
}

export function ProjectDetail({ lang, setLang }: Props) {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const related = project ? getRelatedProjects(project) : [];
  const w = useWindowWidth();
  const mob = w < 768;
  const t = TRANSLATIONS[lang];
  const hf = t.hf;
  const rtl = t.dir === "rtl";
  const px = mob ? 16 : 24;

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const d = project.detail;
  const hasNarrative = d?.challenge || d?.solution || d?.outcome;

  return (
    <div style={{ background: C.bg, color: C.tx, minHeight: "100vh", fontFamily: t.ff, direction: t.dir }}>
      <StarCanvas />
      <Nebula />
      <ScrollProgress />
      <Navigation lang={lang} setLang={setLang} mob={mob} />

      {/* Hero band */}
      <div style={{ paddingTop: 56, position: "relative", zIndex: 1, background: "rgba(13,18,32,.9)", borderBottom: `1px solid ${C.brd}` }}>
        {/* Hero image with gradient fallback */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {project.hero ? (
            <img
              src={project.hero}
              alt={project.title[lang]}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = "flex";
              }}
              style={{
                width: "100%",
                height: mob ? 200 : 320,
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : null}
          <div
            style={{
              display: project.hero ? "none" : "flex",
              width: "100%",
              height: mob ? 200 : 320,
              background: `linear-gradient(135deg, rgba(0,229,255,0.25) 0%, rgba(123,97,255,0.25) 100%), ${C.sf}`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 800, opacity: 0.3, color: C.tx }}>
              {project.title[lang].charAt(0)}
            </span>
          </div>
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: `32px ${px}px 40px` }}>
          <Link to="/#work" style={{ color: C.mu, textDecoration: "none", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, transition: "color .2s" }}
            onMouseOver={(e) => (e.currentTarget.style.color = C.cyan)}
            onMouseOut={(e) => (e.currentTarget.style.color = C.mu)}>
            {t.backToWork}
          </Link>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            <Tag label={t.categoryLabels[project.category]} color={C.cyan} />
            {project.tags.map((tag) => <Tag key={tag} label={tag} color={C.vio} />)}
          </div>
          <h1 style={{ fontFamily: hf, fontSize: mob ? 28 : 44, fontWeight: 800, margin: "0 0 12px", background: `linear-gradient(135deg,${C.tx} 0%,${C.cyan} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.15 }}>
            {project.title[lang]}
          </h1>
          <p style={{ color: C.mu, fontSize: mob ? 14 : 16, lineHeight: 1.7, maxWidth: 600 }}>{project.shortDesc[lang]}</p>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, color: C.cyan, fontWeight: 700, fontSize: 14, textDecoration: "none", border: "1px solid rgba(0,229,255,.3)", padding: "9px 18px", borderRadius: 8, transition: "all .25s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(0,229,255,.07)"; e.currentTarget.style.borderColor = C.cyan; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,229,255,.3)"; }}>
              {t.viewLive}
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: `${mob ? 36 : 56}px ${px}px`, position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "2fr 1fr", gap: mob ? 32 : 52, alignItems: "start" }}>

          {/* Left — narrative */}
          <div>
            {d?.overview && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: hf, color: C.tx, fontSize: mob ? 18 : 22, fontWeight: 700, marginBottom: 14 }}>{t.overview}</h2>
                <p style={{ color: C.mu, lineHeight: 1.88, fontSize: mob ? 14 : 15, fontFamily: t.ff }}>{d.overview[lang]}</p>
              </div>
            )}
            {hasNarrative && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                {d?.challenge && <NarrativeCard heading={t.challenge} body={d.challenge[lang]} accent={C.cyan} ff={t.ff} hf={hf} />}
                {d?.solution && <NarrativeCard heading={t.solution} body={d.solution[lang]} accent={C.vio} ff={t.ff} hf={hf} />}
                {d?.outcome && <NarrativeCard heading={t.outcome} body={d.outcome[lang]} accent="#22d3a5" ff={t.ff} hf={hf} />}
              </div>
            )}
            {slug === "tira-municipality" && (
              <TiraDataViz lang={lang} mob={mob} hf={hf} ff={t.ff} />
            )}
            {d?.techStack && d.techStack.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontFamily: hf, color: C.tx, fontSize: 14, fontWeight: 700, marginBottom: 12, letterSpacing: 0.5 }}>{t.techStack}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {d.techStack.map((tech) => <Tag key={tech} label={tech} color={C.vio} />)}
                </div>
              </div>
            )}
            {d?.metrics && d.metrics.length > 0 && (
              <MetricCallouts metrics={d.metrics} lang={lang} hf={hf} mob={mob} />
            )}
            {project.slug === "mn-towers" && <MNBrandShowcase lang={lang} />}
            {project.slug === "raghda-beauty" && <RaghdaBeautyShowcase lang={lang} />}
            {project.slug === "tira-municipality" && (
              <DeptBreakdown lang={lang} />
            )}
            {d?.gallery && d.gallery.length > 0 && (
              <Gallery images={d.gallery} title={project.title[lang]} mob={mob} lang={lang} />
            )}
          </div>

          {/* Right — meta sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {project.client && <InfoBlock label={t.client} value={project.client[lang]} ff={t.ff} />}
            {project.role && <InfoBlock label={t.role} value={project.role[lang]} ff={t.ff} />}
            {project.duration && <InfoBlock label={t.duration} value={project.duration[lang]} ff={t.ff} />}
            {project.year && <InfoBlock label={t.year} value={project.year} ff={t.ff} />}
            <InfoBlock label={t.categoryLabels[project.category]} value={project.category} ff={t.ff} />
          </div>
        </div>

        {/* Related work */}
        {related.length > 0 && (
          <div style={{ marginTop: mob ? 48 : 72 }}>
            <h2 style={{ fontFamily: hf, color: C.tx, fontSize: mob ? 20 : 26, fontWeight: 800, marginBottom: 24 }}>{t.relatedWork}</h2>
            <div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: mob ? 12 : 16 }}>
              {related.map((p) => (
                <Link key={p.slug} to={`/work/${p.slug}`} style={{ textDecoration: "none" }}>
                  <Glass mob={mob} onMouseMove={tilt(mob)} onMouseLeave={untilt(mob)}
                    onMouseOver={(e) => (e.currentTarget.style.borderColor = C.cyan)}
                    onMouseOut={(e) => (e.currentTarget.style.borderColor = C.brd)} style={{ height: "100%" }}>
                    <Tag label={t.categoryLabels[p.category]} />
                    <h3 style={{ color: C.tx, fontFamily: hf, fontWeight: 700, fontSize: 14, margin: 0 }}>{p.title[lang]}</h3>
                    <p style={{ color: C.mu, fontSize: 12, lineHeight: 1.6, margin: 0 }}>{p.shortDesc[lang]}</p>
                  </Glass>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: rtl ? "right" : "left", marginTop: 40 }}>
          <Link to="/#work"
            style={{ border: "1px solid rgba(0,229,255,.3)", color: C.tx, padding: "11px 26px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, display: "inline-block", backdropFilter: "blur(10px)", fontFamily: t.ff, transition: "all .25s" }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.background = "rgba(0,229,255,.07)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,.3)"; e.currentTarget.style.background = "transparent"; }}>
            {t.backToWork}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const ALL_PROJECT_SLUGS = PROJECTS.map((p) => p.slug);
