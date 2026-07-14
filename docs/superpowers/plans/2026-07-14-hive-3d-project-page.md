# HIVE-3D Project Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and validate a polished, responsive GitHub Pages project page for the ICML 2026 HIVE-3D paper.

**Architecture:** A single-route static Vite site keeps deployment simple and asset paths portable. Semantic page sections hold publication content, CSS owns the visual system and responsive layout, and a small JavaScript module provides progressive enhancement for navigation, image viewing, and BibTeX copying.

**Tech Stack:** Vite, semantic HTML, CSS, vanilla JavaScript, Vitest/jsdom, GitHub Actions.

## Global Constraints

- The site must deploy under a GitHub project subpath using relative asset URLs.
- The first version uses only camera-ready paper assets; code, model, and video links remain clearly marked “Coming Soon.”
- Motion must respect `prefers-reduced-motion`.
- All core content and navigation must remain usable without hover.
- No backend, analytics, cookies, or mandatory third-party runtime.

---

### Task 1: Static project foundation and deployment contract

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `.github/workflows/deploy.yml`
- Test: `tests/site-contract.test.js`

**Interfaces:**
- Produces: Vite commands `dev`, `test`, and `build`; relative production base `./`; GitHub Pages artifact deployment.

- [ ] Write a failing contract test that asserts the document contains `#overview`, `#method`, `#results`, and `#citation`, and that Vite uses `base: './'`.
- [ ] Run `npm test` and verify it fails because the site files do not exist.
- [ ] Initialize the site and add the minimal semantic section skeleton and deployment workflow.
- [ ] Run `npm test` and verify the contract passes.
- [ ] Commit with `chore: scaffold HIVE-3D project page`.

### Task 2: Paper assets and publication data

**Files:**
- Create: `public/paper/HIVE-3D_final.pdf`, `public/media/hero.png`, `public/media/pipeline.png`, `public/media/comparison.png`, `public/media/more-results.png`, `src/paper.js`
- Test: `tests/paper-data.test.js`

**Interfaces:**
- Produces: named export `paper` containing title, venue, authors, affiliations, abstract, metrics, links, and BibTeX.

- [ ] Write failing tests for the exact title, `ICML 2026`, 11 authors, paper URL, three method stages, and reported full-model geometry metrics (`CD 0.0035`, `F-Score 84.34`, `IoU 0.7449`).
- [ ] Run the focused test and verify it fails because `src/paper.js` is absent.
- [ ] Extract and crop the camera-ready PDF figures at publication resolution, copy the PDF, and implement the immutable publication data object.
- [ ] Run the focused test and verify all publication assertions pass.
- [ ] Commit with `feat: add HIVE-3D paper content and assets`.

### Task 3: Responsive research narrative

**Files:**
- Modify: `index.html`
- Create: `src/styles.css`, `src/main.js`
- Test: `tests/site-content.test.js`

**Interfaces:**
- Consumes: `paper` from `src/paper.js`.
- Produces: complete hero, motivation, method, result gallery, metrics, abstract, and citation sections; `renderPage(root, paper)`.

- [ ] Write failing content tests for the headline, complete author list, all three method stage names, result figure alt text, disabled future-resource labels, abstract, and citation content.
- [ ] Run the focused test and verify failures correspond to missing rendered content.
- [ ] Implement `renderPage`, the cinematic voxel-inspired visual system, fluid responsive grids, keyboard focus styling, and reduced-motion fallbacks.
- [ ] Run the focused test and then the full test suite; verify both pass without warnings.
- [ ] Commit with `feat: build HIVE-3D research narrative`.

### Task 4: Progressive interactions and release verification

**Files:**
- Modify: `src/main.js`, `src/styles.css`, `README.md`
- Create: `tests/interactions.test.js`

**Interfaces:**
- Produces: `copyCitation(text, clipboard)`, `setActiveSection(id)`, image-dialog open/close behavior, and deployment instructions.

- [ ] Write failing tests showing citation copy success and fallback behavior, active navigation updates, and Escape closing the result dialog.
- [ ] Run the interaction tests and verify they fail because the exported behaviors are missing.
- [ ] Implement the minimal interaction functions, connect them to accessible controls, and document GitHub Pages publication plus future-link updates.
- [ ] Run `npm test` and `npm run build`; verify a clean test run and successful production output with relative asset URLs.
- [ ] Inspect desktop and mobile layouts, confirm images/captions are legible and no content is clipped, then commit with `feat: finalize interactions and GitHub Pages release`.
