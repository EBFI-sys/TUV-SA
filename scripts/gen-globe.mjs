// Builds src/data/globe-points.json: land dots on a 1.25° equal-area grid, tagged by coverage.
// h = 2 India (HQ), 1 Europe / USA / China / Kazakhstan, 0 other land. Runs before dev and build.
import fs from "node:fs";
import path from "node:path";
import { feature } from "topojson-client";
import { geoContains, geoBounds } from "d3-geo";

const out = path.resolve("src/data/globe-points.json");
if (fs.existsSync(out) && !process.argv.includes("--force")) process.exit(0);

const topo = JSON.parse(fs.readFileSync(path.resolve("node_modules/world-atlas/countries-110m.json"), "utf8"));
const countries = feature(topo, topo.objects.countries).features;
// ISO 3166-1 numeric codes for European countries (Russia excluded on purpose)
const europe = new Set("008 020 040 056 070 100 112 191 196 203 208 233 246 250 276 300 348 352 372 380 383 428 438 440 442 470 492 498 499 528 807 578 616 620 642 674 688 703 705 724 752 756 804 826 336".split(" "));
const core = { "356": 2, "840": 1, "156": 1, "398": 1 };
const boxes = countries.map((f) => ({ f, b: geoBounds(f) }));

const step = 1.25;
const pts = [];
for (let lat = -58; lat <= 80; lat += step) {
  const n = Math.max(1, Math.round((360 * Math.cos((lat * Math.PI) / 180)) / step));
  for (let i = 0; i < n; i++) {
    const lon = -180 + (i * 360) / n;
    for (const { f, b } of boxes) {
      const [[x0, y0], [x1, y1]] = b;
      if (lat < y0 || lat > y1) continue;
      if (x0 <= x1 && (lon < x0 || lon > x1)) continue;
      if (geoContains(f, [lon, lat])) {
        const h = core[f.id] ?? (europe.has(f.id) ? 1 : 0);
        pts.push(Math.round(lon * 10), Math.round(lat * 10), h);
        break;
      }
    }
  }
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(pts));
console.log(`globe: ${pts.length / 3} points`);
