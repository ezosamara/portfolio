# SKILL: Claude Code Execution

## CORRECT PROJECT PATH
Always: C:\Projects\portfolio
NOT OneDrive path. NOT C:\Users\vanez\portfolio (Astro project).
Verify: look for vite.config.ts in file tree. If astro.config.mjs = wrong folder.

## SKILLS LOCATION
Skills are at .claude/skills/ in this repo.
Read with: cat .claude/skills/[skill-name].md
They are NOT at /mnt/skills/user/ on Windows — that path is Linux sandbox only.

## STANDARD PROMPT STRUCTURE
Read .claude/skills/[relevant].md before starting.
TASK 1 — [name]: [instructions]
COMMIT — one commit:
  git add [specific files]
  git commit -m "[message]"
  git push origin main
REPORT: confirm each task, file sizes if images, commit hash.

## GIT WORKFLOW
Diverged branches: git pull origin main --no-rebase
Lock file error: rm c:/Projects/portfolio/.git/ORIG_HEAD.lock then retry
Would be overwritten: git stash push --include-untracked -m "stash" then pull
Remote is always canonical.

## DEPLOY HOOK
HOOK=$(grep -E "^DEPLOY_HOOK_URL=" c:/Projects/portfolio/.env | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'" | tr -d '\r'); curl -X POST -s -w "\nHTTP %{http_code}\n" "$HOOK"
HTTP 201 = accepted. 60-90 seconds to build. Never navigate to vercel.com.

## TYPESCRIPT — ALWAYS BEFORE COMMIT
npx tsc --noEmit 2>&1 | head -20
No output = no errors = safe to commit. If errors: fix first.

## KNOWN BUILD BLOCKER
projects.generated.ts duplication — duplicate identifier errors ~line 484.
Fix: find where content repeats, delete from that point to end of file.
