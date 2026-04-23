import { useEffect, useState } from "react";
import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C, GITHUB_USERNAME } from "@/data/constants";
import { useInView } from "@/hooks";
import { SplitTitle, Glass, tilt, untilt } from "@/components/UI";
import { up, scale } from "@/utils/animations";
import { Section } from "./Section";

interface Props {
  lang: Lang;
  mob: boolean;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
}

type GhStatus = "loading" | "ok" | "empty" | "error";

export function GitHubSection({ lang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const hf = t.hf;
  const [ref, v] = useInView();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [ghs, setGhs] = useState<GhStatus>("loading");

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Repo[]) => {
        if (Array.isArray(d) && d.length > 0) {
          setRepos(d.slice(0, 6));
          setGhs("ok");
        } else {
          setGhs("empty");
        }
      })
      .catch(() => setGhs("error"));
  }, []);

  return (
    <Section id="github" bg="rgba(13,18,32,.88)" mob={mob} dir={t.dir} ff={t.ff} innerRef={ref}>
      <SplitTitle txt={t.gT} v={v} rtl={rtl} mob={mob} hf={hf} />

      {ghs === "loading" ? (
        <p style={{ color: C.mu }}>{t.gL}</p>
      ) : ghs === "ok" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)",
            gap: mob ? 12 : 16,
            marginBottom: 28,
          }}
        >
          {repos.map((r, i) => (
            <div key={r.id} style={scale(v, i * 70)}>
              <a
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
              >
                <Glass
                  mob={mob}
                  onMouseMove={tilt(mob)}
                  onMouseLeave={untilt(mob)}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = C.cyan)}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = C.brd)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3
                      style={{
                        color: C.tx,
                        fontFamily: hf,
                        fontWeight: 700,
                        fontSize: 13,
                        margin: 0,
                        wordBreak: "break-word",
                      }}
                    >
                      {r.name}
                    </h3>
                    <span style={{ color: C.mu, fontSize: 15, flexShrink: 0 }}>↗</span>
                  </div>
                  <p style={{ color: C.mu, fontSize: 12, lineHeight: 1.55, flex: 1, margin: 0 }}>
                    {r.description || "—"}
                  </p>
                  <div style={{ display: "flex", gap: 12 }}>
                    {r.language && (
                      <span style={{ color: C.cyan, fontSize: 11, fontWeight: 600 }}>
                        ● {r.language}
                      </span>
                    )}
                    <span style={{ color: C.mu, fontSize: 11 }}>⭐ {r.stargazers_count}</span>
                  </div>
                </Glass>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: "rgba(15,24,38,.85)",
            border: `1px solid ${C.brd}`,
            borderRadius: 12,
            padding: "28px",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <p style={{ color: C.mu, fontSize: 14, marginBottom: 6 }}>{t.gE}</p>
          <code style={{ color: C.cyan, fontSize: 12 }}>{GITHUB_USERNAME}</code>
        </div>
      )}

      <div style={{ textAlign: "center", ...up(v, 400) }}>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            border: `1px solid rgba(0,229,255,.3)`,
            color: C.tx,
            padding: mob ? "10px 20px" : "11px 26px",
            borderRadius: 8,
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: t.ff,
            display: "inline-block",
            backdropFilter: "blur(10px)",
            transition: "all .25s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = C.cyan;
            e.currentTarget.style.background = "rgba(0,229,255,.07)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,229,255,.3)";
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "none";
          }}
        >
          {t.gV}
        </a>
      </div>
    </Section>
  );
}
