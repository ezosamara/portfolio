// ============================================================
// Data barrel export
//
// Components should import from here or from individual files:
//   import { PROJECTS, getProjectBySlug } from '@/data/projects';
//   import { TIMELINE } from '@/data/timeline';
//
// The barrel re-exports everything for convenience.
// Data source priority: Notion-generated > static fallback.
// Run `npm run fetch` to regenerate from Notion.
// ============================================================

export type { Project, TimelineItem, Lang, ProjectCategory } from '../types';

// Projects
export {
    PROJECTS,
    PROJECT_CATEGORIES,
    getProjectBySlug,
    getFeaturedProjects,
    getRelatedProjects,
} from './projects';

// Timeline
export { TIMELINE } from './timeline';

// Translations, constants, services, skills
export { TRANSLATIONS } from './translations';
export { COLORS, GITHUB_USERNAME } from './constants';
