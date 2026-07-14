# HIVE-3D SceneDiver-Inspired Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark HIVE-3D site with a bright SceneDiver-inspired academic project page grounded in the camera-ready paper and publish it through the existing GitHub Pages workflow.

**Architecture:** Preserve the existing Vinext/Vite application and static export. Keep camera-ready facts in `app/paper-data.ts`, React structure and interaction in `app/page.tsx`, the responsive visual system in `app/globals.css`, and publication imagery in `public/media`.

**Tech Stack:** React 19, Vinext, Vite, TypeScript, CSS, Node test runner, GitHub Actions.

## Global Constraints

- Preserve `scripts/export-static.mjs`, `.openai/hosting.json`, and `.github/workflows/deploy.yml`.
- Use only facts and figures from `HIVE-3D_final.pdf`.
- Do not invent code, model, demo, or arXiv links.
- Respect `prefers-reduced-motion`, keyboard focus, Escape-to-close, and responsive mobile layouts.
- Ensure `dist/client/index.html` exists with project-subpath-safe asset references.

---

### Task 1: Camera-ready content contract and assets

**Files:**
- Modify: `tests/site-contract.test.mjs`, `app/paper-data.ts`
- Create: `public/media/teaser.png`, `public/media/method.png`, `public/media/qualitative.png`, `public/media/additional-results.png`, `public/media/ablation.png`

**Interfaces:**
- Produces: `paper` data with publication metadata, method stages, image metrics, geometry metrics, limitations, and BibTeX; stable media paths consumed by the page.

- [ ] Add failing assertions for SceneDiver-style section labels, complete publication metadata, image metrics, geometry metrics, and all five media paths.
- [ ] Run `npm test` and confirm failures correspond to absent redesign content.
- [ ] Render and crop camera-ready figures, then update `paper-data.ts` with the exact reported values.
- [ ] Run `npm test` and confirm publication-data assertions pass.
- [ ] Commit `feat: refresh camera-ready content and figures`.

### Task 2: Bright academic page structure

**Files:**
- Modify: `app/page.tsx`, `tests/site-contract.test.mjs`

**Interfaces:**
- Consumes: `paper` and `public/media/*`.
- Produces: centered hero, teaser, abstract, method, qualitative results, quantitative results, limitations, and BibTeX sections.

- [ ] Add failing source-contract assertions for `publication-hero`, `teaser`, `abstract`, `method`, `results`, `limitations`, and `BibTeX`.
- [ ] Run `npm test` and verify the new structural assertions fail.
- [ ] Replace the dark split layout with the complete bright academic narrative and preserve image-dialog and copy interactions.
- [ ] Run `npm test` and verify all structural assertions pass.
- [ ] Commit `feat: rebuild HIVE-3D academic narrative`.

### Task 3: SceneDiver-inspired responsive visual system

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`, `tests/site-contract.test.mjs`

**Interfaces:**
- Produces: white/light-gray visual system, centered max-width containers, rounded link pills, green accents, readable tables, mobile layouts, and accessible motion/focus rules.

- [ ] Add failing assertions for the light palette variables, rounded publication links, responsive media queries, focus-visible, and reduced-motion rules.
- [ ] Run `npm test` and verify the visual-contract assertions fail.
- [ ] Implement the complete stylesheet and publication metadata.
- [ ] Run `npm test` and verify all tests pass without warnings.
- [ ] Commit `style: adopt SceneDiver-inspired academic design`.

### Task 4: Build, repository hygiene, and publication

**Files:**
- Create: `.gitignore` if absent
- Preserve: `.github/workflows/deploy.yml`, `.openai/hosting.json`, `scripts/export-static.mjs`

**Interfaces:**
- Produces: clean source commit pushed to `origin/main`, triggering GitHub Pages.

- [ ] Ensure generated directories (`node_modules`, `dist`, `.wrangler`) are ignored and not staged.
- [ ] Run `npm test` and `npm run build`; require zero failures and exit code 0.
- [ ] Assert `dist/client/index.html` and `.nojekyll` exist and that generated HTML has no root-absolute asset URLs.
- [ ] Review `git diff --check` and `git status --short`, then commit only source changes.
- [ ] Push `main` to `origin` and inspect the resulting GitHub Actions run until it succeeds or exposes a concrete actionable failure.
