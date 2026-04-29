# SKILL: Brand Project From Zero

## CORRECT ORDER — ALWAYS THIS SEQUENCE

STEP 1: Extract brand data from PDF/materials (in Claude chat)
STEP 2: User uploads logos to public/projects/ via GitHub UI
STEP 3: Claude Code — component + images + slug gate + commit + push
STEP 4: Cowork — Notion entry (content only) + deploy trigger
STEP 5: Verify live at moataz.vercel.app/work/[slug]

## NEVER DO COWORK BEFORE CLAUDE CODE
Cowork does Notion only. Claude Code does all file work.
If Cowork runs first, it cannot commit files — GitHub MCP is read-only.

## CLAUDE CODE PROMPT STRUCTURE FOR NEW BRAND
Read .claude/skills/showcase-component-pattern.md
Read .claude/skills/image-generation-sharp.md
TASK 1: Download/find logo files at public/projects/[slug]-logo-*.png
TASK 2: Write scripts/generate-[brand]-images.mjs — run it — verify 3 images
TASK 3: Write src/components/Portfolio/[Name]Showcase.tsx
TASK 4: Wire slug gate in src/pages/ProjectDetail.tsx
TASK 5: npx tsc --noEmit — fix errors
TASK 6: git add specific files, commit, push, trigger deploy hook

## COMMON FAILURES
Blank component: opacity:0 never changed → set all opacity:1 immediately
Wrong folder: check for vite.config.ts not astro.config.mjs
Duplicate TS errors: projects.generated.ts duplicated → truncate from midpoint
Images broken: check public/projects/ has the files committed
