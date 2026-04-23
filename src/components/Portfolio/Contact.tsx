import { useState } from "react";
import type { Lang } from "@/types";
import { TRANSLATIONS } from "@/data/translations";
import { COLORS as C, CONTACT } from "@/data/constants";
import { useInView } from "@/hooks";
import { SplitTitle } from "@/components/UI";
import { up, side, wipeUp } from "@/utils/animations";
import { Section } from "./Section";

interface Props {
  lang: Lang;
  mob: boolean;
}

export function Contact({ lang, mob }: Props) {
  const t = TRANSLATIONS[lang];
  const rtl = t.dir === "rtl";
  const hf = t.hf;
  const [ref, v] = useInView();
  const [form, setForm] = useState({ n: "", e: "", m: "" });
  const [sent, setSent] = useState(false);

  const fields: { ph: string; k: "n" | "e"; type: string }[] = [
    { ph: t.nP, k: "n", type: "text" },
    { ph: t.eP, k: "e", type: "email" },
  ];

  return (
    <Section id="contact" mob={mob} dir={t.dir} ff={t.ff} innerRef={ref}>
      <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
        <SplitTitle txt={t.cT} v={v} rtl={rtl} mob={mob} hf={hf} />
        <p
          style={{
            color: C.mu,
            marginBottom: 26,
            lineHeight: 1.8,
            fontSize: mob ? 14 : 15,
            ...up(v, 150),
          }}
        >
          {t.cS}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 22,
            textAlign: rtl ? "right" : "left",
          }}
        >
          {fields.map((f, i) => (
            <div key={f.k} style={side(v, 200 + i * 80, i % 2 === 0 ? -1 : 1)}>
              <input
                type={f.type}
                placeholder={f.ph}
                value={form[f.k]}
                onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                style={{
                  background: "rgba(15,24,38,.9)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${C.brd}`,
                  borderRadius: 8,
                  padding: "13px 14px",
                  color: C.tx,
                  fontSize: 14,
                  fontFamily: t.ff,
                  outline: "none",
                  direction: t.dir,
                  width: "100%",
                  boxSizing: "border-box",
                  transition: "border-color .2s,box-shadow .2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = C.cyan;
                  e.target.style.boxShadow = `0 0 0 3px rgba(0,229,255,.08)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = C.brd;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          ))}
          <div style={wipeUp(v, 360)}>
            <textarea
              placeholder={t.mP}
              rows={4}
              value={form.m}
              onChange={(e) => setForm({ ...form, m: e.target.value })}
              style={{
                background: "rgba(15,24,38,.9)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${C.brd}`,
                borderRadius: 8,
                padding: "13px 14px",
                color: C.tx,
                fontSize: 14,
                fontFamily: t.ff,
                resize: "vertical",
                outline: "none",
                direction: t.dir,
                width: "100%",
                boxSizing: "border-box",
                transition: "border-color .2s,box-shadow .2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = C.cyan;
                e.target.style.boxShadow = `0 0 0 3px rgba(0,229,255,.08)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = C.brd;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          <div style={up(v, 440)}>
            <button
              onClick={() => setSent(true)}
              style={{
                background: `linear-gradient(135deg,${C.cyan},${C.vio})`,
                color: C.bg,
                padding: "14px",
                borderRadius: 8,
                border: "none",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: t.ff,
                boxShadow: "0 4px 20px rgba(0,229,255,.2)",
                transition: "transform .25s,box-shadow .25s",
                width: "100%",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,229,255,.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,229,255,.2)";
              }}
            >
              {sent ? "✓" : t.sb}
            </button>
          </div>
          {sent && (
            <p
              style={{
                color: C.gr,
                fontSize: 12,
                textAlign: "center",
                animation: "fadeUp .5s ease both",
              }}
            >
              Message received! {/* TODO: Wire up Formspree or EmailJS to send. */}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
            ...up(v, 500),
          }}
        >
          {[
            ["✉️", "Email", `mailto:${CONTACT.email}`],
            ["🔗", "LinkedIn", CONTACT.linkedin],
            ["📞", "Call", `tel:${CONTACT.phone}`],
          ].map(([icon, label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{
                color: C.cyan,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                transition: "transform .2s,text-shadow .2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.textShadow = `0 0 12px ${C.cyan}`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              {icon} {label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
