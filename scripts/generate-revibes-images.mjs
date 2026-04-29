import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROJ = path.join(ROOT, "public", "projects");

const COLORS = {
  purple: "#2E2D42",
  grey: "#B4B4BE",
  cyan: "#00EFFF",
  white: "#FFFFFF",
};

const LIGHT_LOGO = path.join(PROJ, "revibes-logo-light.png");
const DARK_LOGO = path.join(PROJ, "revibes-logo-dark.png");

const svgBuf = (s) => Buffer.from(s);

async function getResizedLogo(file, width) {
  const buf = await sharp(file).resize({ width }).png().toBuffer();
  const meta = await sharp(buf).metadata();
  return { buf, w: meta.width, h: meta.height };
}

async function generateHero() {
  const W = 1200;
  const H = 630;
  const stripH = 50;
  const stripY = H - stripH;

  const swatches = [
    { color: COLORS.cyan, label: "#00EFFF" },
    { color: COLORS.grey, label: "#B4B4BE" },
    { color: COLORS.white, label: "#FFFFFF" },
    { color: COLORS.purple, label: "#2E2D42", stroke: true },
  ];
  const swatchSize = 64;
  const swatchGap = 28;
  const stackH = swatches.length * swatchSize + (swatches.length - 1) * swatchGap;
  const stackStartY = Math.round((stripY - stackH) / 2);
  const swatchCx = 880;

  const swatchSvg = swatches
    .map((s, i) => {
      const cy = stackStartY + i * (swatchSize + swatchGap) + swatchSize / 2;
      const cx = swatchCx;
      const r = swatchSize / 2;
      const stroke = s.stroke ? `stroke="${COLORS.white}" stroke-opacity="0.5" stroke-width="1"` : "";
      return `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="${s.color}" ${stroke}/>
        <text x="${cx + r + 18}" y="${cy + 5}"
              font-family="'JetBrains Mono', Menlo, Consolas, monospace"
              font-size="14" font-weight="500" letter-spacing="1.2"
              fill="${COLORS.grey}">${s.label}</text>
      `;
    })
    .join("");

  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g1" cx="0.25" cy="0.4" r="0.55">
          <stop offset="0%" stop-color="${COLORS.cyan}" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="${COLORS.cyan}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="${COLORS.purple}"/>
      <rect width="${W}" height="${H}" fill="url(#g1)"/>
      <line x1="700" y1="60" x2="700" y2="${stripY - 60}" stroke="${COLORS.cyan}" stroke-opacity="0.18" stroke-width="1"/>
      ${swatchSvg}
      <rect x="0" y="${stripY}" width="${W}" height="${stripH}" fill="${COLORS.cyan}"/>
      <text x="${W / 2}" y="${stripY + stripH / 2 + 5}"
            font-family="'Inter', Helvetica, Arial, sans-serif"
            font-size="14" font-weight="700" letter-spacing="3.5"
            fill="${COLORS.purple}" text-anchor="middle">REVIBES — BRAND IDENTITY · EZO STUDIO</text>
    </svg>
  `;

  const logo = await getResizedLogo(LIGHT_LOGO, 460);
  const logoX = Math.round(330 - logo.w / 2);
  const logoY = Math.round((stripY) / 2 - logo.h / 2);

  const out = path.join(PROJ, "revibes.jpg");
  await sharp(svgBuf(bgSvg))
    .composite([{ input: logo.buf, left: logoX, top: logoY }])
    .jpeg({ quality: 92 })
    .toFile(out);
  return out;
}

async function generateBrandSystem() {
  const W = 800;
  const H = 500;
  const stripH = 40;
  const panelH = H - stripH;

  const swatchColors = [
    { fill: COLORS.purple, stroke: true },
    { fill: COLORS.grey, stroke: false },
    { fill: COLORS.cyan, stroke: false },
    { fill: COLORS.white, stroke: false },
  ];
  const swW = 150;
  const swH = 80;
  const swGap = 12;
  const totalW = swW * 4 + swGap * 3;
  const swStartX = Math.round((W - totalW) / 2);
  const swY = Math.round(panelH - swH - 28);
  const swatchSvg = swatchColors
    .map((s, i) => {
      const x = swStartX + i * (swW + swGap);
      const stroke = s.stroke
        ? `stroke="${COLORS.cyan}" stroke-opacity="0.4" stroke-width="1"`
        : `stroke="none"`;
      return `<rect x="${x}" y="${swY}" width="${swW}" height="${swH}" fill="${s.fill}" ${stroke}/>`;
    })
    .join("");

  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${panelH}" fill="${COLORS.purple}"/>
      ${swatchSvg}
      <rect x="0" y="${panelH}" width="${W}" height="${stripH}" fill="${COLORS.cyan}"/>
      <text x="${W / 2}" y="${panelH + stripH / 2 + 5}"
            font-family="'Inter', Helvetica, Arial, sans-serif"
            font-size="13" font-weight="700" letter-spacing="4"
            fill="${COLORS.purple}" text-anchor="middle">COLOR PALETTE</text>
    </svg>
  `;

  const logo = await getResizedLogo(LIGHT_LOGO, 400);
  const logoAreaCenter = Math.round((swY) / 2);
  const logoX = Math.round(W / 2 - logo.w / 2);
  const logoY = Math.round(logoAreaCenter - logo.h / 2);

  const out = path.join(PROJ, "revibes-brand-system.jpg");
  await sharp(svgBuf(bgSvg))
    .composite([{ input: logo.buf, left: logoX, top: logoY }])
    .jpeg({ quality: 92 })
    .toFile(out);
  return out;
}

async function generateBrandGuide() {
  const W = 800;
  const H = 500;
  const topH = 60;
  const bottomStripH = 8;

  const fonts = [
    { name: "Lastica Bold", weight: 700, sample: "REVIBES" },
    { name: "Lastica", weight: 400, sample: "REVIBES" },
    { name: "Lastica Light", weight: 300, sample: "REVIBES" },
    { name: "Heebo", weight: 400, sample: "Aa Bb 1 2 3" },
  ];
  const fontSectionY = 320;
  const fontSvg = fonts
    .map((f, i) => {
      const x = 60 + (i % 2) * 360;
      const y = fontSectionY + Math.floor(i / 2) * 70;
      return `
        <text x="${x}" y="${y}"
              font-family="'Inter', Helvetica, Arial, sans-serif"
              font-size="11" font-weight="700" letter-spacing="2"
              fill="${COLORS.grey}">${f.name.toUpperCase()}</text>
        <text x="${x}" y="${y + 30}"
              font-family="'Inter', Helvetica, Arial, sans-serif"
              font-size="22" font-weight="${f.weight}" letter-spacing="3"
              fill="${COLORS.purple}">${f.sample}</text>
      `;
    })
    .join("");

  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="${COLORS.white}"/>
      <rect x="0" y="0" width="${W}" height="${topH}" fill="${COLORS.purple}"/>
      <text x="${W / 2}" y="${topH / 2 + 5}"
            font-family="'Inter', Helvetica, Arial, sans-serif"
            font-size="14" font-weight="700" letter-spacing="3.5"
            fill="${COLORS.white}" text-anchor="middle">REVIBES BRAND GUIDE — EZO STUDIO</text>
      ${fontSvg}
      <rect x="0" y="${H - bottomStripH}" width="${W}" height="${bottomStripH}" fill="${COLORS.cyan}"/>
    </svg>
  `;

  const logo = await getResizedLogo(DARK_LOGO, 220);
  const logoAreaTop = topH + 20;
  const logoAreaBottom = fontSectionY - 30;
  const logoX = Math.round(W / 2 - logo.w / 2);
  const logoY = Math.round((logoAreaTop + logoAreaBottom) / 2 - logo.h / 2);

  const out = path.join(PROJ, "revibes-brand-guide.jpg");
  await sharp(svgBuf(bgSvg))
    .composite([{ input: logo.buf, left: logoX, top: logoY }])
    .jpeg({ quality: 92 })
    .toFile(out);
  return out;
}

async function main() {
  const results = await Promise.all([
    generateHero(),
    generateBrandSystem(),
    generateBrandGuide(),
  ]);
  for (const p of results) {
    const meta = await sharp(p).metadata();
    console.log(`OK ${path.basename(p)} (${meta.width}x${meta.height})`);
  }
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
