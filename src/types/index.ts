// ============================================================================
// CORE TYPES
// ============================================================================

export type Lang = "en" | "he";
export type Direction = "ltr" | "rtl";

export type ProjectCategory =
  | "Branding"
  | "Web Dev"
  | "Digital Marketing"
  | "AI & Automation"
  | "PR & Comms"
  | "Video";

export type TimelineType = "work" | "edu";

// ============================================================================
// I18N CONTENT BLOCKS
// ============================================================================

export interface LocalizedText {
  en: string;
  he: string;
}

export interface LocalizedStringArray {
  en: string[];
  he: string[];
}

// ============================================================================
// PROJECT (CMS ENGINE)
// ============================================================================

export interface ProjectMetric {
  label: LocalizedText;
  value: string; // numeric or short string, language-agnostic
}

export interface ProjectDetail {
  overview?: LocalizedText;
  challenge?: LocalizedText;
  solution?: LocalizedText;
  outcome?: LocalizedText;
  techStack?: string[];
  metrics?: ProjectMetric[];
  gallery?: string[]; // image URLs — TODO: replace with real assets
}

export interface Project {
  slug: string; // URL-safe identifier
  category: ProjectCategory;
  tags: string[];
  url?: string; // external live URL
  hero?: string; // hero image URL — TODO
  year?: string;
  client?: LocalizedText;
  role?: LocalizedText;
  duration?: LocalizedText;
  title: LocalizedText;
  shortDesc: LocalizedText;
  detail?: ProjectDetail;
  featured?: boolean;
}

// ============================================================================
// TIMELINE
// ============================================================================

export interface TimelineItem {
  year: string; // language-agnostic
  type: TimelineType;
  title: LocalizedText;
  org: LocalizedText;
  loc: LocalizedText;
  desc: LocalizedText;
}

// ============================================================================
// SERVICES
// ============================================================================

export interface Service {
  icon: string; // emoji or symbol
  title: LocalizedText;
  desc: LocalizedText;
}

// ============================================================================
// STATS
// ============================================================================

export interface Stat {
  n: number;
  s: string; // suffix (+, %, etc.)
  label: LocalizedText;
}

// ============================================================================
// TRANSLATIONS (UI STRINGS)
// ============================================================================

export interface NavLabels {
  about: string;
  services: string;
  work: string;
  timeline: string;
  github: string;
  contact: string;
}

export interface Translation {
  dir: Direction;
  ff: string; // body font family
  hf: string; // heading font family
  nav: NavLabels;
  roles: string[]; // typewriter roles
  hi: string;
  nm: string; // name
  sub: string; // subtitle
  c1: string; // cta primary
  c2: string; // cta secondary
  aT: string;
  aB: string;
  sT: string;
  wT: string;
  tT: string;
  gT: string;
  gL: string;
  gE: string;
  gV: string;
  cT: string;
  cS: string;
  nP: string;
  eP: string;
  mP: string;
  sb: string;
  wk: string;
  ed: string;
  backToWork: string;
  viewLive: string;
  challenge: string;
  solution: string;
  outcome: string;
  overview: string;
  techStack: string;
  client: string;
  role: string;
  duration: string;
  year: string;
  relatedWork: string;
  categoryLabels: Record<ProjectCategory | "All", string>;
}

export type Translations = Record<Lang, Translation>;
