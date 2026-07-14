# HIVE-3D Project Page Design

## Goal

Create a polished, English-language project page for the ICML 2026 paper “HIVE-3D: Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation.” The page must work as a static GitHub Pages site and should be easy to update when code, models, or videos become public.

## Design direction

Use a cinematic research-storytelling layout inspired by the pacing of the SceneDiver project page without copying its branding. HIVE-3D receives its own visual identity: near-black spatial backgrounds, warm amber highlights, cool cyan accents, voxel-grid textures, and restrained depth effects. The experience should feel technical, precise, and premium rather than template-like.

## Content architecture

1. Hero: paper title, ICML 2026 badge, full author list, affiliations, concise one-line claim, and links for paper, code, model, and BibTeX.
2. Motivation: explain why holistic single-image 3D scene generation loses local detail.
3. Core idea: visualize the coarse-to-fine hierarchy and emphasize progressive voxel counts and scene-tree depth.
4. Method: three focused stages—2D-to-3D scene-tree construction, voxel super-resolution, and hierarchical scene generation.
5. Results: large image-led comparisons extracted from the paper, with captions that explain what improves.
6. Evidence: compact quantitative cards and an ablation table using values reported in the paper.
7. Publication: abstract, paper preview/download, BibTeX copy control, acknowledgements/contact.

## Interaction

- Sticky navigation with active-section indication.
- Subtle scroll reveals and pointer-responsive background depth; all motion respects reduced-motion preferences.
- Result gallery with expandable images.
- Copy-to-clipboard BibTeX action with visible success feedback.
- Paper button points to a bundled PDF. Code and model buttons show “Coming Soon” until URLs are available.

## Technical architecture

- Static Vite site using semantic HTML, modular CSS, and small vanilla JavaScript modules.
- No server, database, analytics, cookies, or mandatory third-party runtime.
- Assets stored locally and referenced with relative paths so project-site deployments such as `username.github.io/HIVE-3D/` work correctly.
- GitHub Actions workflow deploys the production build to GitHub Pages.

## Responsive and accessible behavior

- Desktop uses wide editorial compositions; tablet and mobile collapse to a single reading column.
- Keyboard-visible focus states, meaningful alt text, sufficient contrast, semantic landmarks, and reduced-motion support are required.
- Interactive controls remain usable without hover.

## Error and fallback behavior

- Missing future links remain clearly disabled rather than leading to broken pages.
- Images use fixed aspect ratios and neutral fallback backgrounds to avoid layout shifts.
- Clipboard failure falls back to selecting the BibTeX text.

## Verification

- Production build must complete without errors.
- Inspect the site at desktop and mobile widths.
- Verify navigation, image expansion, BibTeX copying, relative asset paths, reduced-motion behavior, and GitHub Pages deployment configuration.

## Scope

The first version uses figures extracted from the camera-ready PDF. Interactive 3D models, released code, checkpoints, datasets, and demo videos are intentionally excluded until public assets or URLs are supplied.
