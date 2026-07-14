# HIVE-3D SceneDiver-Inspired Redesign

## Goal

Redesign the HIVE-3D ICML 2026 project page as a bright, centered academic publication site inspired by SceneDiver while retaining a restrained voxel-green identity and using only camera-ready paper facts and figures.

## Visual direction

- White canvas, light-gray section bands, charcoal text, and a restrained green accent.
- Centered publication hero with title, authors, affiliations, venue, and rounded resource buttons.
- Large paper figures shown without decorative dark frames.
- Inter font stack, generous vertical rhythm, narrow readable body text, and compact academic captions.
- Motion limited to gentle reveal transitions and image expansion; reduced-motion preferences are respected.

## Content structure

1. Publication hero with complete camera-ready metadata.
2. Figure 1 teaser and one-sentence contribution.
3. Abstract on a light-gray band.
4. Method overview from Figure 2 and three explanatory stages.
5. Qualitative comparison gallery using camera-ready results.
6. Quantitative results covering image-space and geometry metrics.
7. Limitations, BibTeX, and publication links.

## Components and behavior

- Sticky, unobtrusive navigation for Abstract, Method, Results, and BibTeX.
- Rounded Paper, Code, and Model controls; unreleased resources remain visibly disabled.
- Click-to-expand figures with Escape and backdrop close behavior.
- Copy BibTeX control with success feedback and selection fallback.
- Responsive single-column layout below tablet width.

## Data and assets

- Source of truth: `HIVE-3D_final.pdf` camera-ready manuscript.
- Reuse the bundled PDF and refresh cropped figures at publication resolution.
- Include Figure 1, Figure 2, Figure 4, Figure 5 or additional camera-ready results, and geometry ablation evidence.
- Do not invent code, model, demo, or arXiv links.

## Architecture

- Preserve the existing Vinext/Vite application, static export, GitHub Pages workflow, and paper data module.
- Concentrate presentation changes in `app/page.tsx` and `app/globals.css`.
- Keep publication facts in `app/paper-data.ts` and assets under `public/media`.

## Verification

- Contract tests verify required publication sections, metadata, accessibility fallbacks, and static export.
- `npm test` and `npm run build` must pass.
- Generated `dist/client/index.html` must exist and use subpath-safe asset references.
- Commit only source files and push to the existing `main` branch.
