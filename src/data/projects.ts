import type { Project, ProjectCategory } from "@/types";
import { projects as _notionProjects } from './projects.generated';

export const PROJECT_CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Branding",
  "Web Dev",
  "Digital Marketing",
  "AI & Automation",
  "PR & Comms",
  "Video",
];

// ============================================================================
// STATIC FALLBACK — used when Notion-generated data is empty.
// Once Notion CMS is populated and `npm run fetch` runs at build time,
// the generated array takes over automatically.
// ============================================================================

const STATIC_PROJECTS: Project[] = [
  {
    slug: "kheit-cpa-platform",
    category: "Web Dev",
    tags: ["React", "Webflow", "CMS"],
    url: "https://kheit.com",
    year: "2024",
    featured: true,
    // hero: TODO — add hero image path once assets are exported
    client: { en: "KHEIT CPA", he: "KHEIT רואי חשבון" },
    role: { en: "Lead Developer & Designer", he: "מפתח ומעצב ראשי" },
    duration: { en: "3 months", he: "3 חודשים" },
    title: {
      en: "KHEIT CPA Platform",
      he: "פלטפורמת KHEIT רואי חשבון",
    },
    shortDesc: {
      en: "Full-stack CPA management system with admin, employee & client portals.",
      he: "מערכת ניהול מלאה לרואי חשבון עם פורטלים לאדמין, עובדים ולקוחות.",
    },
    detail: {
      overview: {
        en: "A bespoke CPA practice management platform with three role-based portals, built to replace a patchwork of spreadsheets and email threads.",
        he: "פלטפורמה מותאמת אישית לניהול משרד רואי חשבון עם שלושה פורטלים מבוססי תפקיד, שהחליפה מערך מבוזר של גיליונות ואימיילים.",
      },
      challenge: {
        en: "The firm had no single source of truth. Client files lived in email, tasks in spreadsheets, and billing in a separate tool. Onboarding a new employee took weeks.",
        he: "למשרד לא היה מקור אמת יחיד. קבצי לקוחות היו באימייל, משימות בגיליונות וחיובים בכלי נפרד. הכשרת עובד חדש ארכה שבועות.",
      },
      solution: {
        en: "Designed and built a unified platform with admin, employee, and client views. Integrated document upload, task routing, and a client-facing progress tracker.",
        he: "עיצבתי ובניתי פלטפורמה מאוחדת עם תצוגות לאדמין, עובד ולקוח. שילבתי העלאת מסמכים, הפצת משימות ומעקב התקדמות ללקוח.",
      },
      outcome: {
        en: "Cut admin time by an estimated 40%, gave clients self-serve visibility, and made onboarding a one-day process.",
        he: "חתכה את זמן הניהול בכ-40%, נתנה ללקוחות שקיפות עצמאית והפכה את הקליטה לתהליך של יום.",
      },
      techStack: ["React", "Webflow CMS", "REST APIs", "Tailwind-style tokens"],
      // gallery: TODO — add screenshot URLs
    },
  },
  {
    slug: "tira-meat-boutique",
    category: "Branding",
    tags: ["Logo", "Brand Guide", "Print"],
    year: "2023",
    featured: true,
    client: { en: "Tira Meat Boutique", he: "קצביית טירה" },
    role: { en: "Brand Designer", he: "מעצב מותג" },
    title: { en: "Tira Meat Boutique", he: "קצביית טירה בוטיק" },
    shortDesc: {
      en: "Premium brand identity — logo, palette, typography & social media kit.",
      he: "זהות מותג פרימיום — לוגו, פלטה, טיפוגרפיה וערכת רשתות חברתיות.",
    },
    detail: {
      overview: {
        en: "A full brand identity system for a premium local butcher positioning itself above the commodity market.",
        he: "מערכת זהות מלאה לקצבייה מקומית פרימיום המבקשת למצב את עצמה מעל השוק הרגיל.",
      },
      techStack: ["Illustrator", "InDesign", "Figma"],
    },
  },
  {
    slug: "revibes",
    category: "Branding",
    tags: ["Logo", "Identity"],
    year: "2023",
    title: { en: "Revibes", he: "Revibes" },
    shortDesc: {
      en: "Modern lifestyle brand with cohesive visual system.",
      he: "מותג לייפסטייל מודרני עם מערכת ויזואלית מגובשת.",
    },
  },
  {
    slug: "swanx",
    category: "Branding",
    tags: ["Logo", "Brand"],
    year: "2022",
    title: { en: "SWANX", he: "SWANX" },
    shortDesc: {
      en: "Bold, minimal brand identity design.",
      he: "עיצוב זהות מותג מינימלי ונועז.",
    },
  },
  {
    slug: "orthodont-clinic",
    category: "Branding",
    tags: ["Medical", "Logo"],
    year: "2022",
    title: { en: "Orthodont Clinic", he: "מרפאת אורתודונט" },
    shortDesc: {
      en: "Clean, trustworthy brand for a dental clinic.",
      he: "מותג נקי ואמין למרפאת שיניים.",
    },
  },
  {
    slug: "spotless-cleaning-co",
    category: "Branding",
    tags: ["Logo", "Social"],
    year: "2023",
    title: { en: "Spotless Cleaning Co.", he: "Spotless Cleaning" },
    shortDesc: {
      en: "Fresh, minimal identity for a cleaning company.",
      he: "זהות רעננה ומינימלית לחברת ניקיון.",
    },
  },
  {
    slug: "venturexp",
    category: "Web Dev",
    tags: ["Webflow", "Business"],
    url: "https://venturexp.ca",
    year: "2024",
    title: { en: "VentureXP", he: "VentureXP" },
    shortDesc: {
      en: "Business-focused landing page.",
      he: "דף נחיתה ממוקד עסקים.",
    },
  },
  {
    slug: "raghda-portfolio",
    category: "Web Dev",
    tags: ["Webflow", "Portfolio"],
    url: "https://raghda.webflow.io",
    year: "2024",
    title: { en: "Raghda Portfolio", he: "תיק עבודות ראגדה" },
    shortDesc: {
      en: "Personal portfolio on Webflow.",
      he: "תיק עבודות אישי ב-Webflow.",
    },
  },
  {
    slug: "spotless-site",
    category: "Web Dev",
    tags: ["Webflow", "Service"],
    url: "https://sptclean.webflow.io",
    year: "2023",
    title: { en: "Spotless Site", he: "אתר Spotless" },
    shortDesc: {
      en: "Full service website for a cleaning company.",
      he: "אתר תדמית מלא לחברת ניקיון.",
    },
  },
  {
    slug: "rmf-pgm",
    category: "Web Dev",
    tags: ["Webflow"],
    url: "https://rmf-pgm.webflow.io",
    year: "2024",
    title: { en: "RMF PGM", he: "RMF PGM" },
    shortDesc: {
      en: "Professional web presence for a medical practice.",
      he: "נוכחות דיגיטלית מקצועית למרפאה.",
    },
  },
  {
    slug: "meretz-campaigns",
    category: "PR & Comms",
    tags: ["Politics", "Strategy", "Media"],
    year: "2014–2023",
    featured: true,
    client: { en: "Meretz Party", he: "מפלגת מרצ" },
    role: { en: "PR Specialist", he: "איש יחסי ציבור" },
    duration: { en: "9 years", he: "9 שנים" },
    title: { en: "Meretz Campaigns", he: "קמפיינים למרצ" },
    shortDesc: {
      en: "PR & Knesset campaign management (2014–2023).",
      he: "יחסי ציבור וניהול קמפיינים לכנסת (2014–2023).",
    },
    detail: {
      overview: {
        en: "Nine years managing Knesset campaign communications and Arabic community media outreach for a progressive Israeli party.",
        he: "תשע שנים בניהול תקשורת קמפיינים לכנסת ופנייה תקשורתית לקהילה הערבית עבור מפלגה פרוגרסיבית בישראל.",
      },
      challenge: {
        en: "Reaching audiences across multiple languages and communities with consistent messaging under tight election cycles.",
        he: "הגעה לקהלים במספר שפות וקהילות עם מסרים עקביים תחת לוחות זמנים צפופים של מערכות בחירות.",
      },
      solution: {
        en: "Built a media relations playbook, coordinated press cycles, and led bilingual content strategy across earned and paid channels.",
        he: "בניתי ספר משחק לקשרי תקשורת, תיאמתי מחזורי עיתונות והובלתי אסטרטגיית תוכן דו-לשונית בערוצים שונים.",
      },
    },
  },
  {
    slug: "tira-municipality-digitalization",
    category: "AI & Automation",
    tags: ["Gov-Tech", "Automation", "Data"],
    year: "2022–2024",
    featured: true,
    client: { en: "Tira Municipality", he: "עיריית טירה" },
    role: { en: "Digitalization Manager", he: "מנהל דיגיטציה" },
    duration: { en: "2 years", he: "שנתיים" },
    title: { en: "Tira Municipality Digitalization", he: "דיגיטציה בעיריית טירה" },
    shortDesc: {
      en: "Digital transformation across 5 municipal departments.",
      he: "טרנספורמציה דיגיטלית בחמש מחלקות עירוניות.",
    },
    detail: {
      overview: {
        en: "Led the end-to-end digital transformation of five municipal departments — HR, planning, welfare, vendor management, and citizen services.",
        he: "הובלתי טרנספורמציה דיגיטלית מקצה לקצה בחמש מחלקות עירוניות — משאבי אנוש, תכנון, רווחה, ניהול ספקים ושירותי תושב.",
      },
      challenge: {
        en: "Paper-based workflows, fragmented systems, and low public trust in the speed of municipal services.",
        he: "תהליכי עבודה על נייר, מערכות מבוזרות ואמון ציבורי נמוך במהירות השירות העירוני.",
      },
      solution: {
        en: "Rolled out digital intake forms, a vendor portal, and internal automations; trained department leads and built reporting dashboards.",
        he: "הטמעתי טפסי קליטה דיגיטליים, פורטל ספקים ואוטומציות פנימיות; הכשרתי ראשי מחלקות ובניתי דשבורדים.",
      },
      outcome: {
        en: "Measurable reduction in service turnaround time and a replicable playbook other municipalities have referenced.",
        he: "קיצור מדיד של זמני טיפול בשירות וספר משחק שעיריות נוספות מתייחסות אליו.",
      },
    },
  },
  {
    slug: "ezo-client-campaigns",
    category: "Digital Marketing",
    tags: ["Meta", "Google", "Content"],
    year: "2020–Present",
    featured: true,
    client: { en: "Multiple (EZO Agency)", he: "מרובה (EZO)" },
    role: { en: "Founder & Director", he: "מייסד ומנכ״ל" },
    title: { en: "EZO Client Campaigns", he: "קמפיינים ללקוחות EZO" },
    shortDesc: {
      en: "Multi-client campaigns across retail, services & public sectors.",
      he: "קמפיינים רב-לקוחיים בקמעונאות, שירותים וסקטור הציבורי.",
    },
    detail: {
      overview: {
        en: "EZO runs end-to-end paid + organic campaigns for a rotating roster of 15+ clients, with dedicated creative, media buying, and reporting.",
        he: "EZO מפעילה קמפיינים מלאים בתשלום ואורגני ליותר מ-15 לקוחות מתחלפים, עם קריאייטיב, רכש מדיה ודיווח ייעודיים.",
      },
      techStack: ["Meta Ads", "Google Ads", "GA4", "Looker Studio"],
    },
  },
];

// ============================================================================
// EXPORT — Notion-generated data takes priority over static fallback
// ============================================================================

export const PROJECTS: Project[] =
  _notionProjects.length > 0 ? _notionProjects : STATIC_PROJECTS;

// ============================================================================
// HELPERS
// ============================================================================

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const getFeaturedProjects = (): Project[] =>
  PROJECTS.filter((p) => p.featured);

export const getRelatedProjects = (
  project: Project,
  limit = 3
): Project[] =>
  PROJECTS.filter(
    (p) => p.slug !== project.slug && p.category === project.category
  ).slice(0, limit);
