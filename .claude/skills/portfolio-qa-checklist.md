# SKILL: Portfolio QA Checklist

## RUN BEFORE CLOSING EVERY SESSION

1. CODE CLEAN
   git status → working tree clean
   npx tsc --noEmit → zero errors

2. COMPONENT WIRED
   ProjectDetail.tsx has import + slug gate for this project
   Slug in gate = EXACTLY slug in Notion

3. IMAGES EXIST
   ls public/projects/ | grep [slug]
   Minimum: [slug].jpg + [slug]-logo-*.png

4. NOTION CORRECT
   Slug field matches gate exactly
   Published = TRUE

5. LIVE PAGE WORKS
   moataz.vercel.app/work/[slug] loads
   Component visible (not blank)
   EN/HE toggle works
   Metrics show

6. WORK GRID SHOWS PROJECT
   moataz.vercel.app → Work section
   Card appears with hero image

## KNOWN ISSUES
Blank component: remove all IntersectionObserver — set opacity:1 everywhere
Wrong folder: vite.config.ts = correct, astro.config.mjs = wrong
Duplicate TS: projects.generated.ts doubled → truncate second half
Stale deploy: trigger hook, wait 90s, hard refresh Ctrl+Shift+R

## QUICK COMMANDS
npx tsc --noEmit
ls public/projects/
HOOK=$(grep -E "^DEPLOY_HOOK_URL=" .env | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'"); curl -X POST "$HOOK"
git stash push --include-untracked -m "stash" && git pull origin main --no-rebase && git push origin main
