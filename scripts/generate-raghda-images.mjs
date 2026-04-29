import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJ = path.join(ROOT, "public", "projects");

const COLORS = {
  mauve: "#905F68",
  rose: "#BD8087",
  blush: "#FFF4F6",
  cream: "#F5EAE3",
  dark: "#0d0a0b",
};

const LIGHT_LOGO = path.join(PROJ, "raghda-logo-light.png");
const DARK_LOGO = path.join(PROJ, "raghda-logo-dark.png");

async function svgToBuffer(svg) {
  return Buffer.from(svg);
}

async function getResizedLogo(file, width) {
  const buf = await sharp(file).resize({ width }).png().toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, w: meta.width, h: meta.height };
}

async function generateHero() {
  const W = 1200;
  const H = 630;

  // Bottom color strip: 4 rects, 300px wide, at y=580, 50px tall
  const stripY = 580;
  const stripH = 50;
  const stripColors = [COLORS.mauve, COLORS.rose, COLORS.blush, COLORS.cream];
  const stripSvg = stripColors
    .map(
      (c, i) =>
        `<rect x="${i * 300}" y="${stripY}" width="300" height="${stripH}" fill="${c}"/>`
    )
    .join("");

  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rg1" cx="0.75" cy="0.4" r="0.5">
          <stop offset="0%" stop-color="${COLORS.rose}" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="${COLORS.rose}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="rg2" cx="0.2" cy="0.65" r="0.45">
          <stop offset="0%" stop-color="${COLORS.mauve}" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="${COLORS.mauve}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="${COLORS.cream}"/>
      <rect width="${W}" height="${H}" fill="url(#rg1)"/>
      <rect width="${W}" height="${H}" fill="url(#rg2)"/>
      <circle cx="${W * 0.75}" cy="${H * 0.4}" r="250"
              fill="none" stroke="${COLORS.mauve}" stroke-opacity="0.2" stroke-width="1"/>
      <circle cx="${W * 0.2}" cy="${H * 0.65}" r="160"
              fill="none" stroke="${COLORS.rose}" stroke-opacity="0.15" stroke-width="1"/>
      <circle cx="${W * 0.85}" cy="${H * 0.75}" r="90"
              fill="none" stroke="${COLORS.mauve}" stroke-opacity="0.25" stroke-width="1"/>
      ${stripSvg}
      <text x="${W / 2}" y="610"
            font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="14" font-weight="500" letter-spacing="6"
            fill="${COLORS.mauve}" fill-opacity="0.7"
            text-anchor="middle">BRAND IDENTITY · WEBFLOW · PRINT</text>
    </svg>
  `;

  // Logo: dark logo, 420px wide, center at (600, 280)
  const logo = await getResizedLogo(DARK_LOGO, 420);
  const logoX = Math.round(600 - logo.w / 2);
  const logoY = Math.round(280 - logo.h / 2);

  const out = path.join(PROJ, "raghda-beauty.jpg");
  await sharp(await svgToBuffer(bgSvg))
    .composite([{ input: logo.buf, left: logoX, top: logoY }])
    .jpeg({ quality: 92 })
    .toFile(out);
  return out;
}

async function generateBrandSystem() {
  const W = 800;
  const H = 500;
  const bottomH = 40;
  const panelH = H - bottomH;

  // Logo (light, since bg is dark): 300px wide, center horizontally at x=250, vertically centered in panel
  const logo = await getResizedLogo(LIGHT_LOGO, 300);
  const logoX = Math.round(250 - logo.w / 2);
  const logoY = Math.round(panelH / 2 - logo.h / 2);

  // 4 swatches stacked, each 80h x 200w, x=500, vertically centered in panel
  const swatches = [
    { fill: COLORS.mauve, border: false },
    { fill: COLORS.rose, border: false },
    { fill: COLORS.blush, border: true },
    { fill: COLORS.cream, border: true },
  ];
  const swH = 80;
  const swW = 200;
  const stackH = swatches.length * swH;
  const swStartY = Math.round((panelH - stackH) / 2);
  const swatchSvg = swatches
    .map((s, i) => {
      const y = swStartY + i * swH;
      const stroke = s.border
        ? `stroke="${COLORS.rose}" stroke-width="1"`
        : `stroke="none"`;
      return `<rect x="500" y="${y}" width="${swW}" height="${swH}" fill="${s.fill}" ${stroke}/>`;
    })
    .join("");

  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${panelH}" fill="${COLORS.dark}"/>
      <line x1="470" y1="0" x2="470" y2="${panelH}"
            stroke="${COLORS.mauve}" stroke-opacity="0.3" stroke-width="1"/>
      ${swatchSvg}
      <rect x="0" y="${panelH}" width="${W}" height="${bottomH}" fill="${COLORS.mauve}"/>
      <text x="${W / 2}" y="${panelH + bottomH / 2 + 5}"
            font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="13" font-weight="600" letter-spacing="4"
            fill="white" text-anchor="middle">COLOR PALETTE</text>
    </svg>
  `;

  const out = path.join(PROJ, "raghda-brand-system.jpg");
  await sharp(await svgToBuffer(bgSvg))
    .composite([{ input: logo.buf, left: logoX, top: logoY }])
    .jpeg({ quality: 92 })
    .toFile(out);
  return out;
}

async function generateBusinessCard() {
  const W = 800;
  const H = 500;
  const cardW = 520;
  const cardH = 290;
  const cardX = (W - cardW) / 2;
  const cardY = (H - cardH) / 2;

  const logo = await getResizedLogo(DARK_LOGO, 180);
  const logoX = Math.round(cardX + cardW / 2 - logo.w / 2);
  const logoY = Math.round(cardY + 70);
  const lineY = logoY + logo.h + 26;

  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${H}" fill="#1a1214"/>
      <rect x="${cardX + 5}" y="${cardY + 8}" width="${cardW}" height="${cardH}"
            fill="black" fill-opacity="0.45" rx="6"/>
      <rect x="${cardX + 2}" y="${cardY + 4}" width="${cardW}" height="${cardH}"
            fill="black" fill-opacity="0.25" rx="6"/>
      <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}"
            fill="${COLORS.cream}" rx="6"/>
      <line x1="${cardX + cardW / 2 - 60}" y1="${lineY}"
            x2="${cardX + cardW / 2 + 60}" y2="${lineY}"
            stroke="${COLORS.mauve}" stroke-opacity="0.35" stroke-width="1"/>
      <text x="${W / 2}" y="${lineY + 24}"
            font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="14" font-weight="500" letter-spacing="1.5"
            fill="${COLORS.mauve}" text-anchor="middle">raghda-beauty.co.il</text>
    </svg>
  `;

  const out = path.join(PROJ, "raghda-business-card.jpg");
  await sharp(await svgToBuffer(bgSvg))
    .composite([{ input: logo.buf, left: logoX, top: logoY }])
    .jpeg({ quality: 92 })
    .toFile(out);
  return out;
}

async function main() {
  const results = await Promise.all([
    generateHero(),
    generateBrandSystem(),
    generateBusinessCard(),
  ]);
  for (const p of results) {
    const meta = await sharp(p).metadata();
    console.log(`✓ ${path.basename(p)} (${meta.width}x${meta.height})`);
  }
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
