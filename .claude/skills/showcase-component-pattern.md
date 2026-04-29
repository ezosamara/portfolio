# SKILL: Showcase Component Pattern

## LOCATION
src/components/Portfolio/[BrandName]Showcase.tsx

## REQUIRED PROPS
interface Props { lang: "en" | "he"; }
export default function [BrandName]Showcase({ lang }: Props)

## STANDARD SECTION ORDER
1. Logo — full-width card with real logo image
2. Color Palette — swatches with hex codes
3. Typography — font names (optional)
4. Gallery — 2-4 deliverable images
5. Feature Cards — 3 cards with outcomes
6. Vision Strip — tagline
7. CTA — Visit Website link

## LOGO SECTION (proven pattern)
<div style={{ width:"100%", height:"clamp(200px,30vw,320px)", background:"#BRAND_BG",
  borderRadius:14, border:"1px solid rgba(0,0,0,0.1)",
  display:"flex", alignItems:"center", justifyContent:"center" }}>
  <img src="/projects/[slug]-logo-light.png" alt="[Brand]"
    style={{ maxWidth:360, width:"70%" }}
    onError={(e)=>{ (e.target as HTMLImageElement).style.display="none"; }} />
</div>

## CRITICAL RULES
1. No Hebrew strings in JSX — use escaped unicode or English only
2. No IntersectionObserver animations — opacity:1 always, renders immediately
3. No glassmorphism on light brands
4. No invented content — every string from source documents
5. onError on every image
6. Inline styles only
7. export default always
8. Never include logo PNGs in gallery if shown in Section 1

## WIRING INTO PROJECTDETAIL.TSX
Import: import [Name]Showcase from "@/components/Portfolio/[Name]Showcase";
Gate: {project.slug === "[slug]" && <[Name]Showcase lang={lang} />}
Slug must EXACTLY match Notion database slug field.
