import type { Stat } from "@/types";

export const SKILLS: string[] = [
  "Digital Strategy",
  "Brand Identity",
  "Webflow",
  "React",
  "Data Science",
  "AI/ML Tools",
  "Meta & Google Ads",
  "Video Editing",
  "Political PR",
  "SEO",
  "Campaign Analytics",
  "Gov Tech",
];

// Personal/biographical — kept because it describes the person,
// not a site-level language toggle.
export const LANGUAGES: { en: string; he: string; level: { en: string; he: string } }[] = [
  { en: "Arabic", he: "ערבית", level: { en: "Native", he: "שפת אם" } },
  { en: "Hebrew", he: "עברית", level: { en: "Fluent", he: "שוטפת" } },
  { en: "English", he: "אנגלית", level: { en: "Fluent", he: "שוטפת" } },
  { en: "Albanian", he: "אלבנית", level: { en: "Basic", he: "בסיסית" } },
];

export const STATS: Stat[] = [
  { n: 5, s: "+", label: { en: "Years Exp.", he: "שנות ניסיון" } },
  { n: 13, s: "+", label: { en: "Projects", he: "פרויקטים" } },
  { n: 3, s: "", label: { en: "Languages", he: "שפות" } },
  { n: 4, s: "", label: { en: "Countries", he: "מדינות" } },
];
