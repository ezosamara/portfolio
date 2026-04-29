# SKILL: Image Generation with Sharp

## SCRIPT LOCATION
scripts/generate-[brand]-images.mjs

## LOGO RULES
1. Always use real logo file — never recreate with text/shapes
2. Light logo (white/cream) on DARK backgrounds
3. Dark logo (brand color) on LIGHT backgrounds
4. Get dimensions before compositing:
   const meta = await sharp(logoFile).metadata();
   const h = Math.round(meta.height * (targetW / meta.width));
   const left = Math.round((canvasW - targetW) / 2);
   const top = Math.round((canvasH - h) / 2);

## HERO RECIPE (1200x630)
const base = await sharp({ create:{ width:1200, height:630, channels:3, background:"#BRAND_COLOR" }}).jpeg().toBuffer();
const decorSVG = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <radialGradient/> decorative circles etc
</svg>`);
const logo = await sharp(logoFile).resize(420).toBuffer();
await sharp(base).composite([{input:decorSVG,top:0,left:0},{input:logo,top:logoTop,left:logoLeft}]).jpeg({quality:90}).toFile(output);

## FILE NAMING
[slug].jpg = hero (1200x630)
[slug]-brand-system.jpg = color palette + logo (800x500)
[slug]-business-card.jpg = card mockup (800x500)
[slug]-logo-light.png = white/light logo
[slug]-logo-dark.png = dark/colored logo

## QUALITY
Hero: jpeg quality 90. Gallery: jpeg quality 88. Never below 85.
