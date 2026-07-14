import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the project page exposes the complete bright academic narrative", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  for (const marker of ["publication-hero", 'id="teaser"', 'id="abstract"', 'id="method"', 'id="results"', 'id="limitations"', 'id="BibTeX"']) {
    assert.match(page, new RegExp(marker));
  }
  for (const path of ["teaser.png", "method.png", "qualitative.png", "additional-results.png", "ablation.png"]) {
    assert.match(page, new RegExp(path.replace(".", "\\.")));
  }
});

test("the hero uses a green title treatment with the venue below the title", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const data = await readFile(new URL("app/paper-data.ts", root), "utf8");
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(page, /<h1>[\s\S]*<\/h1>\s*<p className="venue-line">\{paper\.venue\}<\/p>/);
  assert.match(data, /venue:\s*"ICML 2026"/);
  assert.doesNotMatch(data, /PMLR 306/);
  assert.match(css, /--accent:\s*#59b783/i);
  assert.match(css, /\.publication-hero h1 em\{color:var\(--accent\)/);
  assert.match(css, /\.venue-line\{[^}]*border:\s*1\.5px solid/);
  assert.match(css, /\.venue-line\{[^}]*font-size:\s*16px/);
});

test("publication data preserves camera-ready facts and metrics", async () => {
  const data = await readFile(new URL("app/paper-data.ts", root), "utf8");
  for (const fact of ["Bin Zang", "Rengan Xie", 'volume    = \\{306\\}', 'CD: "0.0035"', 'fScore: "84.34"', 'iou: "0.7449"', 'SSIM: "0.79"', 'PSNR: "13.39"', 'LPIPS: "0.33"', 'CLIP: "0.97"']) {
    assert.match(data, new RegExp(fact));
  }
  assert.match(data, /TRELLIS/);
});

test("the visual system is light, responsive, and accessible", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(css, /--accent:\s*#59b783/i);
  assert.match(css, /--surface:\s*#f7fbf8/i);
  assert.match(css, /\.paper-figure button:hover\{[^}]*transform:translateY\(-6px\)/);
  assert.match(css, /transition:transform \.25s ease,box-shadow \.25s ease/);
  assert.match(css, /\.publication-links/);
  assert.match(css, /border-radius:\s*999px/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media\s*\(max-width:/);
});

test("paper figures reveal a full-image hover preview over a faded page", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(page, /hoverImage/);
  assert.match(page, /onMouseEnter=\{\(\) => setHoverImage/);
  assert.match(page, /onMouseLeave=\{\(\) => setHoverImage\(null\)\}/);
  assert.match(page, /className="hover-preview"/);
  assert.match(css, /\.hover-preview\{position:fixed;inset:0/);
  assert.match(css, /object-fit:contain/);
  assert.match(css, /backdrop-filter:blur/);
});

test("clicking a paper figure opens a viewport-sized faded lightbox", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  assert.match(page, /setDialogImage\(\{ src, alt \}\)/);
  assert.match(page, /className="dialog-backdrop"/);
  assert.match(css, /\.image-dialog\{[^}]*width:94vw;[^}]*height:90vh/);
  assert.match(css, /\.image-dialog img\{[^}]*max-width:100%;[^}]*max-height:100%;[^}]*object-fit:contain/);
  assert.match(css, /\.dialog-backdrop\{[^}]*backdrop-filter:blur/);
});

test("the build keeps GitHub Pages static-export support", async () => {
  const workflow = await readFile(new URL(".github/workflows/deploy.yml", root), "utf8");
  const packageJson = await readFile(new URL("package.json", root), "utf8");
  const exporter = await readFile(new URL("scripts/export-static.mjs", root), "utf8");
  assert.match(workflow, /actions\/deploy-pages/);
  assert.match(workflow, /dist\/client/);
  assert.match(packageJson, /scripts\/export-static\.mjs/);
  assert.match(exporter, /dist\/client\/index\.html/);
  assert.match(exporter, /\.nojekyll/);
});
