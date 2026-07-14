import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the project page exposes the complete research narrative", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");
  assert.match(page, /HIVE-3D: Hierarchical Voxel Enhancement/);
  assert.match(page, /id="overview"/);
  assert.match(page, /id="method"/);
  assert.match(page, /id="results"/);
  assert.match(page, /id="citation"/);
  assert.match(page, /ICML 2026/);
});

test("publication data preserves the camera-ready facts", async () => {
  const data = await readFile(new URL("app/paper-data.ts", root), "utf8");
  assert.match(data, /Bin Zang/);
  assert.match(data, /Rengan Xie/);
  assert.match(data, /CD:\s*"0\.0035"/);
  assert.match(data, /fScore:\s*"84\.34"/);
  assert.match(data, /iou:\s*"0\.7449"/);
  assert.match(data, /Coming Soon/);
});

test("accessibility and deployment fallbacks are explicit", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  const workflow = await readFile(new URL(".github/workflows/deploy.yml", root), "utf8");
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(workflow, /actions\/deploy-pages/);
  assert.match(workflow, /dist\/client/);
});

test("the build includes a GitHub Pages static export", async () => {
  const packageJson = await readFile(new URL("package.json", root), "utf8");
  const exporter = await readFile(new URL("scripts/export-static.mjs", root), "utf8");
  assert.match(packageJson, /scripts\/export-static\.mjs/);
  assert.match(exporter, /dist\/client\/index\.html/);
  assert.match(exporter, /\.nojekyll/);
  assert.match(exporter, /replaceAll\('href="\//);
});
