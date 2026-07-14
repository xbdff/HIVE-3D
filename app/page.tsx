"use client";

import { useEffect, useState } from "react";
import { paper } from "./paper-data";

const navItems = [["abstract", "Abstract"], ["method", "Method"], ["results", "Results"], ["BibTeX", "BibTeX"]];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [dialogImage, setDialogImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setDialogImage(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  async function copyBibtex() {
    try { await navigator.clipboard.writeText(paper.bibtex); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
    catch { document.querySelector<HTMLElement>("#bibtex-code")?.focus(); }
  }

  const Figure = ({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) => (
    <figure className={`paper-figure ${className}`}>
      <button type="button" onClick={() => setDialogImage({ src, alt })} aria-label={`Expand ${caption}`}><img src={src} alt={alt} /></button>
      <figcaption>{caption}<span>Click to expand ↗</span></figcaption>
    </figure>
  );

  return <main>
    <header className="site-header"><a className="wordmark" href="#top">HIVE-3D</a><nav aria-label="Section navigation">{navItems.map(([id,label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><a className="header-link" href={paper.links.paper}>Paper ↗</a></header>

    <section className="publication-hero" id="top">
      <h1><em>HIVE-3D</em>: Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation</h1>
      <p className="venue-line">{paper.venue}</p>
      <p className="authors">{paper.authors.map((author, index) => <span key={author}>{author}{index < paper.authors.length - 1 ? ", " : ""}</span>)}</p>
      <div className="affiliations"><p><sup>1</sup> {paper.affiliations[0]}</p><p><sup>2</sup> {paper.affiliations[1]}</p><small>* Equal contribution</small></div>
      <div className="publication-links"><a href={paper.links.paper}>▤ Paper</a><span aria-disabled="true">⌘ Code · Soon</span><span aria-disabled="true">◇ Model · Soon</span></div>
    </section>

    <section className="teaser shell" id="teaser"><Figure src="./media/teaser.png" alt="HIVE-3D progressively enhances a scene from coarse to fine hierarchy levels" caption="HIVE-3D progressively enhances a coarse scene into high-resolution components and a coherent final scene." /></section>

    <section className="band" id="abstract"><div className="shell text-grid"><div><p className="eyebrow">Abstract</p><h2>High-quality scenes,<br/><em>one hierarchy at a time.</em></h2></div><p className="abstract-copy">{paper.abstract}</p></div></section>

    <section className="shell section" id="method"><div className="section-heading"><p className="eyebrow">Method</p><h2>From one image to a structured, high-resolution 3D scene.</h2><p>Instead of forcing the entire scene through one restricted voxel grid, HIVE-3D decomposes enhancement into a coarse-to-fine hierarchy.</p></div><Figure src="./media/method.png" alt="Overview of the HIVE-3D method" caption="Method overview: scene-tree construction, voxel super-resolution, and hierarchical scene generation." />
      <div className="stage-list">{paper.stages.map(stage => <article key={stage.number}><span>{stage.number}</span><div><h3>{stage.title}</h3><p>{stage.text}</p></div></article>)}</div>
    </section>

    <section className="band results" id="results"><div className="shell"><div className="section-heading"><p className="eyebrow">Results</p><h2>Fine geometry returns without sacrificing the whole scene.</h2><p>Across synthetic and real images, the hierarchy restores small objects, thin structures, and local texture while retaining global coherence.</p></div><Figure src="./media/qualitative.png" alt="Qualitative comparison with prior 3D scene generation methods" caption="Qualitative comparison with MIDI, Gen3DSR, SceneGen, TRELLIS, and HIVE-3D." />
        <div className="result-gallery"><Figure src="./media/additional-results.png" alt="Additional HIVE-3D generation results" caption="Additional generation results." /><Figure src="./media/ablation.png" alt="Voxel super-resolution ablation" caption="Voxel super-resolution ablation." /></div>
        <div className="metric-layout"><div className="metric-card"><p className="eyebrow">Geometry · Full model</p><div className="metric-row"><strong>{paper.geometryMetrics.CD}<small>CD ↓</small></strong><strong>{paper.geometryMetrics.fScore}<small>F-Score ↑</small></strong><strong>{paper.geometryMetrics.iou}<small>IoU ↑</small></strong></div></div><div className="metric-card green"><p className="eyebrow">Image-space · Ours</p><div className="metric-row four"><strong>{paper.imageMetrics.SSIM}<small>SSIM ↑</small></strong><strong>{paper.imageMetrics.PSNR}<small>PSNR ↑</small></strong><strong>{paper.imageMetrics.LPIPS}<small>LPIPS ↓</small></strong><strong>{paper.imageMetrics.CLIP}<small>CLIP ↑</small></strong></div></div></div>
        <div className="table-wrap"><table><thead><tr><th>Method</th><th>SSIM ↑</th><th>PSNR ↑</th><th>LPIPS ↓</th><th>CLIP ↑</th></tr></thead><tbody>{paper.baselines.map(row => <tr className={row.name === "Ours" ? "ours" : ""} key={row.name}><th>{row.name}</th><td>{row.SSIM}</td><td>{row.PSNR}</td><td>{row.LPIPS}</td><td>{row.CLIP}</td></tr>)}</tbody></table></div>
      </div></section>

    <section className="shell section limitation" id="limitations"><p className="eyebrow">Limitations</p><h2>Where the current pipeline can improve.</h2><p>{paper.limitation}</p></section>

    <section className="band bibtex" id="BibTeX"><div className="shell"><div className="bibtex-head"><div><p className="eyebrow">Citation</p><h2>BibTeX</h2></div><button onClick={copyBibtex}>{copied ? "Copied ✓" : "Copy citation"}</button></div><pre id="bibtex-code" tabIndex={-1}><code>{paper.bibtex}</code></pre></div></section>
    <footer><div className="shell"><strong>HIVE-3D</strong><p>Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation</p><span>ICML 2026</span></div></footer>
    {dialogImage && <div className="dialog-backdrop" role="presentation" onClick={() => setDialogImage(null)}><div className="image-dialog" role="dialog" aria-modal="true" aria-label={dialogImage.alt} onClick={event => event.stopPropagation()}><button autoFocus onClick={() => setDialogImage(null)} aria-label="Close expanded image">×</button><img src={dialogImage.src} alt={dialogImage.alt}/></div></div>}
  </main>;
}
