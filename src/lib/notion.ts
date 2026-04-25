// ============================================================
// Notion Client Wrapper — Build-time data fetcher
// Used by scripts/fetch-notion.ts during `npm run fetch`
// ============================================================

import { Client } from '@notionhq/client';
import type { Project, TimelineItem } from '../data/types';

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
    sorts: [{ property: 'Title EN', direction: 'ascending' }],
  });

  return response.results.map((page: any) => {
    const p = page.properties;
    return {
      id: page.id,
      slug: getRichText(p['Slug']),
      titleEN: getTitleText(p['Title EN']),
      titleHE: getRichText(p['Title HE']),
      category: getSelect(p['Category']),
      tags: getMultiSelect(p['Tags']),
      techStack: getMultiSelect(p['Tech Stack']),
      shortDescEN: getRichText(p['Short Desc EN']),
      shortDescHE: getRichText(p['Short Desc HE']),
      overviewEN: getRichText(p['Overview EN']),
      overviewHE: getRichText(p['Overview HE']),
      challengeEN: getRichText(p['Challenge EN']),
      challengeHE: getRichText(p['Challenge HE']),
      solutionEN: getRichText(p['Solution EN']),
      solutionHE: getRichText(p['Solution HE']),
      outcomeEN: getRichText(p['Outcome EN']),
      outcomeHE: getRichText(p['Outcome HE']),
      clientEN: getRichText(p['Client EN']),
      clientHE: getRichText(p['Client HE']),
      roleEN: getRichText(p['Role EN']),
      roleHE: getRichText(p['Role HE']),
      durationEN: getRichText(p['Duration EN']),
      durationHE: getRichText(p['Duration HE']),
      year: getRichText(p['Year']),
      url: getUrl(p['URL']) || getUrl(p['userDefined:URL']),
      heroImage: getFiles(p['Hero Image']),
      featured: getCheckbox(p['Featured']),
      published: getCheckbox(p['Published']),
    };
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
      id: page.id,
      titleEN: getTitleText(p['Title EN']),
      titleHE: getRichText(p['Title HE']),
      orgEN: getRichText(p['Org EN']),
      orgHE: getRichText(p['Org HE']),
      locationEN: getRichText(p['Location EN']),
      locationHE: getRichText(p['Location HE']),
      year: getRichText(p['Year']),
      type: getSelect(p['Type']) as 'work' | 'edu',
      descriptionEN: getRichText(p['Description EN']),
      descriptionHE: getRichText(p['Description HE']),
      order: getNumber(p['Order']),
    };
  });
}
