import { useState } from "react";

const C = {
  bg: "#060912", card: "#0f1826", brd: "#1e2d45",
  cyan: "#00E5FF", vio: "#7B61FF", tx: "#E8F2FF", mu: "#6B84B0"
};

interface Dept {
  id: string;
  name_en: string;
  name_he: string;
  color: string;
  icon: string;
  stat: string;
  stat_he: string;
  trained: string;
  outcome_en: string;
  outcome_he: string;
  status: "complete" | "planned";
}

interface Props {
  lang: "en" | "he";
}

const DEPTS: Dept[] = [
  { id:"procurement", name_en:"Procurement", name_he:"מחלקת רכש", color:"#00BFFF", icon:"🛒", stat:"9 months", stat_he:"9 חודשים", trained:"25", outcome_en:"Full digital flow: requisition to order to invoice", outcome_he:"תהליך דיגיטלי מלא: דרישה, הזמנה, חשבונית", status:"complete" },
  { id:"vendors", name_en:"Vendor Portal", name_he:"פורטל ספקים", color:"#22d3a5", icon:"🏭", stat:"800+", stat_he:"800+", trained:"700", outcome_en:"800+ active vendors with personal portal areas", outcome_he:"800+ ספקים עם אזור אישי בפורטל", status:"complete" },
  { id:"hr", name_en:"Human Resources", name_he:"מחלקת כוח אדם", color:"#FF6B6B", icon:"👥", stat:"450", stat_he:"450", trained:"450", outcome_en:"Employee portal: payslips, vacation, sick leave — all digital", outcome_he:"פורטל עובדים: תלושים, חופשות, חופשי מחלה — הכל דיגיטלי", status:"complete" },
  { id:"planning", name_en:"Planning & Building", name_he:"ועדת תכנון ובניה", color:"#F5C518", icon:"🏗️", stat:"GIS + D3", stat_he:"GIS + D3", trained:"5", outcome_en:"Digital permits, aerial imaging, GIS spatial analysis", outcome_he:"היתרים דיגיטליים, צילום אווירי, ניתוח GIS", status:"complete" },
  { id:"treasury", name_en:"Treasury", name_he:"גזברות", color:"#7B61FF", icon:"💰", stat:"ARMA", stat_he:"ARMA", trained:"2", outcome_en:"Automated tracking of all government funding tenders", outcome_he:"מעקב אוטומטי אחר קולות קוראים ממשלתיים", status:"complete" },
];

export function DeptBreakdown({ lang }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const rtl = lang === "he";

  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ fontFamily: "'Syne',sans-serif", color: "#E8F2FF", fontSize: 13, fontWeight: 700, marginBottom: 20, letterSpacing: 0.5, textTransform: "uppercase", opacity: 0.6 }}>
        {lang === "en" ? "Departments Digitized" : "מחלקות שעברו דיגיטציה"}
      </h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", direction: rtl ? "rtl" : "ltr" }}>
        {DEPTS.map(d => (
          <button
            key={d.id}
            onClick={() => setActive(active === d.id ? null : d.id)}
            style={{
              background: active === d.id ? (d.color + "22") : "rgba(15,24,38,0.7)",
              border: "1px solid " + (active === d.id ? d.color : C.brd),
              borderRadius: 10,
              padding: "8px 14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all .25s",
              boxShadow: active === d.id ? ("0 0 16px " + d.color + "44") : "none",
            }}
          >
            <span style={{ fontSize: 16 }}>{d.icon}</span>
            <span style={{ color: active === d.id ? d.color : C.mu, fontSize: 12, fontWeight: 700 }}>
              {lang === "en" ? d.name_en : d.name_he}
            </span>
          </button>
        ))}
      </div>
      {active && (() => {
        const d = DEPTS.find(x => x.id === active);
        if (!d) return null;
        return (
          <div style={{
            background: d.color + "0d",
            backdropFilter: "blur(14px)",
            border: "1px solid " + d.color + "44",
            borderRadius: 14,
            padding: "20px 22px",
            direction: rtl ? "rtl" : "ltr",
            animation: "fadeUp .35s ease both",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 28 }}>{d.icon}</span>
              <div>
                <h4 style={{ color: d.color, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, margin: 0 }}>
                  {lang === "en" ? d.name_en : d.name_he}
                </h4>
                <span style={{ color: C.mu, fontSize: 11 }}>
                  Complete
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
              <div style={{ background: d.color + "18", border: "1px solid " + d.color + "44", borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
                <div style={{ color: d.color, fontSize: 22, fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>
                  {lang === "en" ? d.stat : d.stat_he}
                </div>
                <div style={{ color: C.mu, fontSize: 10, marginTop: 2 }}>
                  {lang === "en" ? "Key Metric" : "מדד מרכזי"}
                </div>
              </div>
              <div style={{ background: "rgba(15,24,38,.85)", border: "1px solid " + C.brd, borderRadius: 8, padding: "8px 16px", textAlign: "center" }}>
                <div style={{ color: C.cyan, fontSize: 22, fontWeight: 800, fontFamily: "'Syne',sans-serif" }}>
                  {d.trained}
                </div>
                <div style={{ color: C.mu, fontSize: 10, marginTop: 2 }}>
                  {lang === "en" ? "Trained" : "הוכשרו"}
                </div>
              </div>
            </div>
            <p style={{ color: "#E8F2FF", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              {lang === "en" ? d.outcome_en : d.outcome_he}
            </p>
          </div>
        );
      })()}
    </div>
  );
}

