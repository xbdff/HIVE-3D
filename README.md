# HIVE-3D Project Page

Official project page for **HIVE-3D: Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation**, accepted at ICML 2026.

## Local preview

```bash
npm install
npm run dev
```

## Build

```bash
npm test
npm run build
```

The deployable static site is generated in `dist/client`. The build also creates `index.html` and `.nojekyll` for GitHub Pages.

## Publish on GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The included workflow builds and publishes the site automatically on every push to `main`.

## Updating release links

Edit `app/paper-data.ts` when code or models become public. Replace the corresponding `Coming Soon` values and update the buttons in `app/page.tsx` to links.
