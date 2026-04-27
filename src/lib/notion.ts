// ============================================================
// Notion Client Wrapper — Build-time data fetcher
// Used by scripts/fetch-notion.ts during `npm run fetch`
//
// Outputs data in the app's canonical LocalizedText format:
//   { en: string, he: string }
// so generated files are directly consumable by components.
// ============================================================

import { Client } from '@notionhq/client';
import type { Project, ProjectDetail, ProjectCategory, TimelineItem, TimelineType } from '../types';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// --------------- Helpers ---------------

function richTextToString(prop: any): string {
  if (!prop) return '';
  if (typeof prop === 'string') return prop;
  if (Array.isArray(prop)) {
    return prop.map((block: any) => block.plain_text || '').join('');
  }
  return '';
}

function getTitleText(prop: any): string {
  if (!prop) return '';
  if (prop.type === 'title') return richTextToString(prop.title);
  return richTextToString(prop);
}

function getRichText(prop: any): string {
  if (!prop) return '';
  if (prop.type === 'rich_text') return richTextToString(prop.rich_text);
  return richTextToString(prop);
}

function getSelect(prop: any): string {
  if (!prop || prop.type !== 'select' || !prop.select) return '';
  return prop.select.name || '';
}

function getMultiSelect(prop: any): string[] {
  if (!prop || prop.type !== 'multi_select') return [];
  return (prop.multi_select || []).map((opt: any) => opt.name);
}

function getCheckbox(prop: any): boolean {
  if (!prop || prop.type !== 'checkbox') return false;
  return prop.checkbox === true;
}

function getUrl(prop: any): string {
  if (!prop) return '';
  if (prop.type === 'url') return prop.url || '';
  return '';
}

function getNumber(prop: any): number {
  if (!prop || prop.type !== 'number') return 0;
  return prop.number || 0;
}

function getFiles(prop: any): string {
  if (!prop || prop.type !== 'files' || !prop.files?.length) return '';
  const file = prop.files[0];
  if (file.type === 'external') return file.external?.url || '';
  if (file.type === 'file') return file.file?.url || '';
  return '';
}

// --------------- Fetchers ---------------

export async function fetchProjects(databaseId: string): Promise<Project[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: { property: 'Published', checkbox: { equals: true } },
    sorts: [{ property: 'Title EN', direction: 'ascending' }],
  });

  return response.results.map((page: any) => {
    const p = page.properties;

    // --- Required fields ---
    const project: Project = {
      slug: getRichText(p['Slug']),
      category: (getSelect(p['Category']) || 'Web Dev') as ProjectCategory,
      tags: getMultiSelect(p['Tags']),
      title: {
        en: getTitleText(p['Title EN']),
        he: getRichText(p['Title HE']),
      },
      shortDesc: {
        en: getRichText(p['Short Desc EN']),
        he: getRichText(p['Short Desc HE']),
      },
    };

    // --- Optional scalar fields ---
    const url = getUrl(p['URL']);
    if (url) project.url = url;

    // Hero image: always use static repo paths (Notion URLs expire after ~1 hour)
    const heroFilenameMap: Record<string, string> = {
      'kheit-cpa': 'kheit-cpa-platform.jpg',
      'tira-meat': 'tira-meat-boutique.jpg',
      'tira-municipality': 'tira-municipality-digitalization.jpg',
    };
    const filename = heroFilenameMap[project.slug] || `${project.slug}.jpg`;
    project.hero = `/projects/${filename}`;

    const year = getRichText(p['Year']);
    if (year) project.year = year;

    if (getCheckbox(p['Featured'])) project.featured = true;

    // --- Optional localized fields ---
    const clientEN = getRichText(p['Client EN']);
    const clientHE = getRichText(p['Client HE']);
    if (clientEN || clientHE) project.client = { en: clientEN, he: clientHE };

    const roleEN = getRichText(p['Role EN']);
    const roleHE = getRichText(p['Role HE']);
    if (roleEN || roleHE) project.role = { en: roleEN, he: roleHE };

    const durationEN = getRichText(p['Duration EN']);
    const durationHE = getRichText(p['Duration HE']);
    if (durationEN || durationHE) project.duration = { en: durationEN, he: durationHE };

    // --- Detail block (nested) ---
    const overviewEN = getRichText(p['Overview EN']);
    const overviewHE = getRichText(p['Overview HE']);
    const challengeEN = getRichText(p['Challenge EN']);
    const challengeHE = getRichText(p['Challenge HE']);
    const solutionEN = getRichText(p['Solution EN']);
    const solutionHE = getRichText(p['Solution HE']);
    const outcomeEN = getRichText(p['Outcome EN']);
    const outcomeHE = getRichText(p['Outcome HE']);
    const techStack = getMultiSelect(p['Tech Stack']);

    const hasDetail =
      overviewEN || overviewHE ||
      challengeEN || challengeHE ||
      solutionEN || solutionHE ||
      outcomeEN || outcomeHE ||
      techStack.length > 0;

    if (hasDetail) {
      const detail: ProjectDetail = {};
      if (overviewEN || overviewHE) detail.overview = { en: overviewEN, he: overviewHE };
      if (challengeEN || challengeHE) detail.challenge = { en: challengeEN, he: challengeHE };
      if (solutionEN || solutionHE) detail.solution = { en: solutionEN, he: solutionHE };
      if (outcomeEN || outcomeHE) detail.outcome = { en: outcomeEN, he: outcomeHE };
      if (techStack.length > 0) detail.techStack = techStack;
      project.detail = detail;
    }

    // Brand colors (comma-separated hex codes)
    const brandColors = getRichText(p['Brand Colors']);
    if (brandColors) project.brandColors = brandColors.split(',').map(c => c.trim()).filter(c => c.startsWith('#'));

    // Video URL
    const videoUrl = getUrl(p['Video URL']);
    if (videoUrl) project.videoUrl = videoUrl;

    // Metrics (up to 3)
    const metrics: { value: string; label: { en: string; he: string } }[] = [];
    for (let i = 1; i <= 3; i++) {
      const value = getRichText(p[`Metric ${i} Value`]);
      const labelEN = getRichText(p[`Metric ${i} Label EN`]);
      const labelHE = getRichText(p[`Metric ${i} Label HE`]);
      if (value && (labelEN || labelHE)) {
        metrics.push({ value, label: { en: labelEN, he: labelHE } });
      }
    }
    if (metrics.length > 0) {
      if (!project.detail) project.detail = {};
      project.detail.metrics = metrics;
    }

    // Gallery — generate filename array from Gallery Count
    const galleryCount = getNumber(p['Gallery Count']);
    if (galleryCount > 0) {
      if (!project.detail) project.detail = {};
      project.detail.gallery = Array.from({ length: Math.min(galleryCount, 6) }, (_, i) =>
        `/projects/${project.slug}/gallery-${i + 1}.jpg`
      );
    }

    return project;
  });
}

export async function fetchTimeline(databaseId: string): Promise<TimelineItem[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'Order', direction: 'ascending' }],
  });

  return response.results.map((page: any) => {
    const p = page.properties;
    return {
      year: getRichText(p['Year']),
      type: (getSelect(p['Type']) || 'work') as TimelineType,
      title: {
        en: getTitleText(p['Title EN']),
        he: getRichText(p['Title HE']),
      },
      org: {
        en: getRichText(p['Org EN']),
        he: getRichText(p['Org HE']),
      },
      loc: {
        en: getRichText(p['Location EN']),
        he: getRichText(p['Location HE']),
      },
      desc: {
        en: getRichText(p['Description EN']),
        he: getRichText(p['Description HE']),
      },
    };
  });
}
