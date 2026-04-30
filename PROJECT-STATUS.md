# PORTFOLIO PROJECT — STATUS BRIEF
Last updated: April 30, 2026

---

## THE PROJECT

**Live site:** https://moataz.vercel.app
**Repo:** github.com/ezosamara/portfolio (private, main branch)
**Local:** C:\Projects\portfolio
**Stack:** Vite + React 18 + TypeScript + Notion CMS + Vercel
**Owner:** Moataz Samara — EZO Agency

---

## LIVE PROJECTS (all verified)

| Project | Slug | Has Showcase Component |
|---------|------|----------------------|
| KHEIT CPA Platform | kheit-cpa-platform | No (CMS only) |
| Tira Municipality | tira-municipality | Yes — TiraDataViz.tsx |
| MN Towers Brand Identity | mn-towers | Yes — MNBrandShowcase.tsx |
| Raghda Beauty Brand Identity | raghda-beauty | Yes — RaghdaBeautyShowcase.tsx |
| Revibes Brand Identity | revibes | Yes — RevibesShowcase.tsx |

All accessible at moataz.vercel.app/work/[slug]

---

## TOOLING — WHO DOES WHAT

| Task | Tool |
|------|------|
| Write components (.tsx) | Claude Code in VS Code |
| Generate images (sharp) | Claude Code in VS Code |
| Git commits + push | Claude Code in VS Code |
| Trigger Vercel deploy | Claude Code in VS Code |
| Notion CMS entries | Cowork only |
| Nothing else | Cowork — GitHub MCP is read-only (403) |

**RULE: Claude Code first. Cowork second (Notion only).**

---

## DEPLOY COMMAND (run from Claude Code)

```bash
HOOK=$(grep -E "^DEPLOY_HOOK_URL=" c:/Projects/portfolio/.env | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'" | tr -d '\r'); curl -X POST -s -w "\nHTTP %{http_code}\n" "$HOOK"
```

HTTP 201 = accepted. Build takes 60-90 seconds.

---

## NOTION CMS

Projects Database ID: 78f13fdbc7f942a9b17e7e224f85dcc9
Timeline Database ID: 77103c1e4a3c4ee8b1b7b62c9ff2a72b
Deploy hook: stored in C:\Projects\portfolio\.env as DEPLOY_HOOK_URL

---

## SKILLS — IN THE REPO

All 5 skill files live at .claude/skills/ in the repo.
Claude Code reads them with: cat .claude/skills/[name].md

| Skill file | Purpose |
|-----------|---------|
| brand-project-from-zero.md | Full new project workflow, step by step |
| showcase-component-pattern.md | Exact TSX structure for showcase components |
| image-generation-sharp.md | Sharp recipes for hero + brand + card images |
| claude-code-execution.md | Correct paths, git workflow, deploy hook |
| portfolio-qa-checklist.md | 6-point check before closing any session |

---

## HARD RULES — NEVER BREAK THESE

1. **Never fake logos.** Always `<img src="/projects/[slug]-logo.png">`. Never SVG text approximations.
2. **No Hebrew strings in JSX.** English only in component code. Bilingual text in TX/CONTENT objects.
3. **No IntersectionObserver animations.** All content opacity:1 immediately on mount.
4. **Never touch projects.generated.ts.** It gets overwritten on every Vercel build.
5. **onError on every image tag.** Always hide gracefully if file missing.
6. **GitHub MCP is read-only.** Never try push_files or create_or_update_file — always 403.
7. **Two failures = stop.** Never retry the same approach a third time.
8. **No secrets in output.** Scan before sharing any report (ntn_, deploy hook URLs).

---

## NEW BRAND PROJECT — CORRECT ORDER

```
Step 1 — Claude Code:
  cat .claude/skills/brand-project-from-zero.md
  cat .claude/skills/showcase-component-pattern.md
  cat .claude/skills/image-generation-sharp.md
  → Download logos from Drive
  → Write [Name]Showcase.tsx component
  → Write scripts/generate-[brand]-images.mjs + run it
  → Wire slug gate in src/pages/ProjectDetail.tsx
  → npx tsc --noEmit (zero errors before committing)
  → git add + commit + push
  → Trigger deploy hook

Step 2 — Cowork (Notion only):
  → Create page in Projects DB (ID: 78f13fdbc7f942a9b17e7e224f85dcc9)
  → Fill all bilingual fields (EN + HE)
  → Set Published = true
  → Trigger deploy hook

Step 3 — Verify:
  → moataz.vercel.app/work/[slug] loads
  → Component visible, logos load, EN/HE toggle works
```

---

## SHOWCASE COMPONENT STRUCTURE

Every brand showcase follows this section order:
1. Logo card — full-width, real logo file, no SVG fake
2. Color palette — 4 swatches with hex codes
3. Gallery — 2-4 deliverable images from scripts/generate-*.mjs
4. Feature cards — 3 cards with project outcomes
5. Vision strip — brand tagline
6. CTA — Visit Website link

Props: `lang: "en" | "he"` only. Inline styles only. Export default always.

---

## IMAGE GENERATION

Hero images generated with sharp via scripts/generate-[brand]-images.mjs
Logo files: public/projects/[slug]-logo-light.png + [slug]-logo-dark.png
All images: public/projects/[slug]*.jpg

Light logo = white/cream version → use on DARK backgrounds
Dark logo = brand color version → use on LIGHT backgrounds

---

## KNOWN ISSUES THAT COST HOURS

| Issue | Cause | Fix |
|-------|-------|-----|
| Blank showcase component | opacity:0 never changes | Set all opacity:1, remove IntersectionObserver |
| Wrong folder in VS Code | Astro project open instead | Open C:\Projects\portfolio (has vite.config.ts) |
| Duplicate TS errors | projects.generated.ts doubled | Truncate file from midpoint where duplication starts |
| git lock errors | OneDrive or crash | rm .git/ORIG_HEAD.lock then retry |
| Skills not found | /mnt/skills/user/ is Linux sandbox only | Skills are in .claude/skills/ in repo |
| Cowork can't commit | GitHub MCP read-only | Claude Code does all file work |

---

## PENDING / NEXT STEPS

- [ ] Add more brand projects (same workflow as Raghda/Revibes)
- [ ] Add Tira Meat Boutique showcase component
- [ ] Add SWANX showcase component
- [ ] Wire Formspree or EmailJS to contact form
- [ ] Delete old Cowork workspace at C:\Users\vanez\OneDrive\Documents\PORTPFOLIO

---

## QUICK REFERENCE

```bash
# TypeScript check
npx tsc --noEmit

# Check images exist
ls public/projects/ | grep [slug]

# Git fix diverged branch
git stash push --include-untracked -m "stash" && git pull origin main --no-rebase && git push origin main

# Trigger deploy
HOOK=$(grep -E "^DEPLOY_HOOK_URL=" c:/Projects/portfolio/.env | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'" | tr -d '\r'); curl -X POST -s -w "\nHTTP %{http_code}\n" "$HOOK"
```
