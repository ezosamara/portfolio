// ============================================================
// Portfolio CMS — TypeScript Interfaces
// Auto-consumed by components, populated by Notion fetcher
// ============================================================

export interface Project {
  id: string;
  slug: string;
  titleEN: string;
  titleHE: string;
  category: string;
  tags: string[];
  techStack: string[];
  shortDescEN: string;
  shortDescHE: string;
  overviewEN: string;
  overviewHE: string;
  challengeEN: string;
  challengeHE: string;
  solutionEN: string;
  solutionHE: string;
  outcomeEN: string;
  outcomeHE: string;
  clientEN: string;
  clientHE: string;
  roleEN: string;
  roleHE: string;
  durationEN: string;
  durationHE: string;
  year: string;
  url: string;
  heroImage: string;
  featured: boolean;
  published: boolean;
}

export interface TimelineItem {
  id: string;
  titleEN: string;
  titleHE: string;
  orgEN: string;
  orgHE: string;
  locationEN: string;
  locationHE: string;
  year: string;
  type: 'work' | 'edu';
  descriptionEN: string;
  descriptionHE: string;
  order: number;
}

export type Lang = 'en' | 'he';
