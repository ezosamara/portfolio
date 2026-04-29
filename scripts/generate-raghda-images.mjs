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
  const bottomH = 60;
  const halfW = W / 2;
  const panelH = H - bottomH;

  const swatches = [COLORS.mauve, COLORS.rose, COLORS.blush, COLORS.cream];
  const swH = 40;
  const swatchSvg = swatches
    .map(
      (c, i) =>
        `<rect x="${halfW}" y="${i * swH}" width="${halfW}" height="${swH}" fill="${c}"/>`
    )
    .join("");

  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${halfW}" height="${panelH}" fill="${COLORS.dark}"/>
      <rect x="${halfW}" y="0" width="${halfW}" height="${panelH}" fill="${COLORS.cream}"/>
      ${swatchSvg}
      <rect x="0" y="${panelH}" width="${W}" height="${bottomH}" fill="${COLORS.mauve}"/>
      <text x="${W / 2}" y="${panelH + bottomH / 2 + 7}"
            font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="20" font-weight="600" letter-spacing="3"
            fill="white" text-anchor="middle">RAGHDA BEAUTY — BRAND IDENTITY</text>
    </svg>
  `;

  const logo = await getResizedLogo(LIGHT_LOGO, 300);
  const logoX = Math.round(halfW / 2 - logo.w / 2);
  const logoY = Math.round(panelH / 2 - logo.h / 2);

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
  const bottomH = 50;
  const panelH = H - bottomH;

  const logo = await getResizedLogo(DARK_LOGO, 240);
  const leftCenterX = W * 0.25;
  const logoX = Math.round(leftCenterX - logo.w / 2);
  const logoY = Math.round(panelH / 2 - logo.h / 2);

  const dotR = 40;
  const dotGap = 30;
  const gridW = dotR * 4 + dotGap;
  const gridH = dotR * 4 + dotGap;
  const rightCenterX = W * 0.75;
  const gridStartX = Math.round(rightCenterX - gridW / 2);
  const gridStartY = Math.round(panelH / 2 - gridH / 2);
  const c1x = gridStartX + dotR;
  const c2x = gridStartX + dotR * 3 + dotGap;
  const r1y = gridStartY + dotR;
  const r2y = gridStartY + dotR * 3 + dotGap;

  const stroke = `stroke="${COLORS.mauve}" stroke-opacity="0.3" stroke-width="1.5"`;

  const bgSvg = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${panelH}" fill="${COLORS.blush}"/>
      <rect x="0" y="${panelH}" width="${W}" height="${bottomH}" fill="${COLORS.mauve}"/>
      <text x="${W / 2}" y="${panelH + bottomH / 2 + 5}"
            font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="14" font-weight="600" letter-spacing="3"
            fill="white" text-anchor="middle">COLOR PALETTE</text>
      <circle cx="${c1x}" cy="${r1y}" r="${dotR}" fill="${COLORS.mauve}"/>
      <circle cx="${c2x}" cy="${r1y}" r="${dotR}" fill="${COLORS.rose}"/>
      <circle cx="${c1x}" cy="${r2y}" r="${dotR}" fill="${COLORS.blush}" ${stroke}/>
      <circle cx="${c2x}" cy="${r2y}" r="${dotR}" fill="${COLORS.cream}" ${stroke}/>
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
