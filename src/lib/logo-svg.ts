import { BLUE, CROP, G_OPEN, PATH_BLUE, PATH_RED, PATH_SHIELD, RED } from "./logo-paths";

export type LogoVariant = "full" | "mark" | "lockup" | "shield";
export type LogoTone = "color" | "white";

const TITLE = "TUV Thuringen SouthAsia";

function art(tone: LogoTone, withBlue = true) {
  const blue = tone === "white" ? "#FFFFFF" : BLUE;
  return (
    G_OPEN +
    `<path fill="#FFFFFF" d="${PATH_SHIELD}"/>` +
    (withBlue ? `<path fill="${blue}" d="${PATH_BLUE}"/>` : "") +
    `<path fill="${RED}" d="${PATH_RED}"/>` +
    `</g>`
  );
}

/** Returns a standalone SVG document for the requested logo variant. */
export function logoSvg(variant: LogoVariant, tone: LogoTone = "color"): string {
  const open = (vb: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${TITLE}"><title>${TITLE}</title>`;

  if (variant === "lockup") {
    // horizontal lockup: TÜV + shield, then THÜRINGEN / SOUTH ASIA stacked to the right
    const [mx, my, mw, mh] = CROP.markOnly;
    const [wx, wy, ww, wh] = CROP.wordmark;
    const s = (0.8 * mh) / wh;
    const tw = ww * s;
    const th = wh * s;
    const gap = 180;
    const W = Math.round(mw + gap + tw);
    return (
      open(`0 0 ${W} ${mh}`) +
      `<defs><g id="tsa-art">${art(tone)}</g></defs>` +
      `<svg x="0" y="0" width="${mw}" height="${mh}" viewBox="${mx} ${my} ${mw} ${mh}"><use href="#tsa-art"/></svg>` +
      `<svg x="${mw + gap}" y="${((mh - th) / 2).toFixed(1)}" width="${tw.toFixed(1)}" height="${th.toFixed(1)}" viewBox="${wx} ${wy} ${ww} ${wh}"><use href="#tsa-art"/></svg>` +
      `</svg>`
    );
  }
  const crop = CROP[variant];
  return open(crop.join(" ")) + art(tone, variant !== "shield") + `</svg>`;
}

export const LOCKUP_RATIO = (() => {
  const [, , mw, mh] = CROP.markOnly;
  const [, , ww, wh] = CROP.wordmark;
  return (mw + 180 + ww * ((0.8 * mh) / wh)) / mh;
})();
