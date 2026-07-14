"use client";

import { useEffect, useState } from "react";
import { paper } from "./paper-data";

const navItems = [
  ["overview", "Overview"], ["method", "Method"], ["results", "Results"], ["citation", "Citation"],
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [dialogImage, setDialogImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => reveal.observe(node));
    return () => reveal.disconnect();
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setDialogImage(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  async function copyBibtex() {
    try {
      await navigator.clipboard.writeText(paper.bibtex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const selection = window.getSelection();
      const code = document.querySelector("#bibtex-code");
      if (selection && code) { const range = document.createRange(); range.selectNodeContents(code); selection.removeAllRanges(); selection.addRange(range); }
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="HIVE-3D home"><span className="brand-mark">H</span>HIVE-3D</a>
        <nav aria-label="Primary navigation">{navItems.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <a className="header-paper" href={paper.links.paper}>Read paper <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="voxel-field" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="hero-copy reveal is-visible">
          <div className="eyebrow"><span>{paper.venue}</span><span>Seoul, South Korea</span></div>
          <h1 title="HIVE-3D: Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation"><span>HIVE-3D</span>Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation</h1>
          <p className="hero-lede">From one image to a detailed 3D world—refined component by component, from coarse structure to fine geometry.</p>
          <div className="hero-actions">
            <a className="button primary" href={paper.links.paper}>Paper <span>↗</span></a>
            <span className="button muted" aria-disabled="true">Code · Coming Soon</span>
            <span className="button muted" aria-disabled="true">Model · Coming Soon</span>
          </div>
        </div>
        <div className="hero-figure reveal is-visible">
          <div className="figure-frame"><img src="./media/hero.png" alt="HIVE-3D progressively increases voxel resolution across three scene-tree depths" /></div>
          <div className="figure-meta"><span>Coarse</span><span className="progress-line"/><span>Fine</span></div>
        </div>
        <div className="authors reveal is-visible">
          <p>{paper.authors.map((author, i) => <span key={author}>{author}{i < paper.authors.length - 1 ? ", " : ""}</span>)}</p>
          <div>{paper.affiliations.map((item, i) => <span key={item}><sup>{i + 1}</sup>{item}</span>)}<small>* Equal contribution</small></div>
        </div>
      </section>

      <section className="overview section" id="overview">
        <div className="section-label reveal"><span>01</span> Why hierarchy?</div>
        <div className="problem-grid">
          <div className="problem-copy reveal"><p className="kicker">A resolution bottleneck</p><h2>A whole scene should not be forced through a single coarse grid.</h2><p>Holistic generators preserve layout, but small objects receive only a handful of voxels. HIVE-3D keeps the global scene intact while recursively opening local regions for higher-resolution generation.</p></div>
          <div className="depth-visual reveal" aria-label="Progressive scene hierarchy from depth one to depth three">
            <div className="depth-row"><b>D1</b><span className="cube c1"/><em>4,478 voxels</em></div>
            <div className="depth-row"><b>D2</b><span className="cube c2"/><em>23,829 voxels</em></div>
            <div className="depth-row"><b>D3</b><span className="cube c3"/><em>45,079 voxels</em></div>
          </div>
        </div>
      </section>

      <section className="method section" id="method">
        <div className="section-label reveal"><span>02</span> Method</div>
        <div className="section-heading reveal"><p className="kicker">Coarse → fine</p><h2>One scene. Three precise moves.</h2><p>HIVE-3D turns a monolithic generation problem into a structured sequence of local refinements.</p></div>
        <button className="paper-figure reveal" onClick={() => setDialogImage({ src: "./media/pipeline.png", alt: "Overview of the HIVE-3D pipeline" })} aria-label="Open the full HIVE-3D method figure">
          <img src="./media/pipeline.png" alt="HIVE-3D pipeline with 2D-to-3D scene tree construction, component enhancement and hierarchical generation" />
          <span>Figure 2 · Method overview <i>Expand ↗</i></span>
        </button>
        <div className="stage-grid">{paper.stages.map((stage) => <article className="stage reveal" key={stage.number}><span>{stage.number}</span><h3>{stage.title}</h3><p>{stage.text}</p></article>)}</div>
      </section>

      <section className="results section" id="results">
        <div className="section-label reveal"><span>03</span> Results</div>
        <div className="section-heading reveal"><p className="kicker">High fidelity, globally coherent</p><h2>Details survive the journey back into the scene.</h2><p>Across diverse layouts, HIVE-3D restores fine geometry and textures that holistic baselines miss.</p></div>
        <button className="paper-figure wide reveal" onClick={() => setDialogImage({ src: "./media/comparison.png", alt: "Qualitative comparison against previous 3D scene generation methods" })} aria-label="Open the full qualitative comparison">
          <img src="./media/comparison.png" alt="Five-row comparison of MIDI, Gen3DSR, SceneGen, TRELLIS and HIVE-3D outputs" />
          <span>Figure 4 · Generation quality comparison <i>Expand ↗</i></span>
        </button>
        <div className="evidence-grid">
          <div className="metrics reveal"><p className="kicker">Geometry · Full model</p><div><article><strong>{paper.metrics.CD}</strong><span>Chamfer Distance ↓</span></article><article><strong>{paper.metrics.fScore}</strong><span>F-Score ↑</span></article><article><strong>{paper.metrics.iou}</strong><span>IoU ↑</span></article></div><small>Evaluated on the synthetic dataset. Lower CD and higher F-Score / IoU are better.</small></div>
          <button className="ablation reveal" onClick={() => setDialogImage({ src: "./media/ablation.png", alt: "Voxel super-resolution ablation results" })}><img src="./media/ablation.png" alt="Comparison showing that voxel super-resolution preserves fine pencil and vehicle geometry" /><span>Voxel-SR ablation ↗</span></button>
        </div>
      </section>

      <section className="publication section">
        <div className="section-label reveal"><span>04</span> Publication</div>
        <div className="abstract-grid"><div className="reveal"><p className="kicker">Abstract</p><h2>High-quality 3D scene generation, one hierarchy at a time.</h2></div><p className="abstract reveal">{paper.abstract}</p></div>
      </section>

      <section className="citation section" id="citation">
        <div className="citation-card reveal"><div><p className="kicker">If you find this work useful</p><h2>Cite HIVE-3D</h2></div><div className="code-wrap"><button onClick={copyBibtex}>{copied ? "Copied ✓" : "Copy BibTeX"}</button><pre id="bibtex-code"><code>{paper.bibtex}</code></pre></div></div>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">H</span>HIVE-3D</a><p>Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation</p><span>ICML 2026</span></footer>

      {dialogImage && <div className="dialog-backdrop" role="presentation" onClick={() => setDialogImage(null)}><div className="image-dialog" role="dialog" aria-modal="true" aria-label={dialogImage.alt} onClick={(e) => e.stopPropagation()}><button autoFocus onClick={() => setDialogImage(null)} aria-label="Close image">×</button><img src={dialogImage.src} alt={dialogImage.alt}/></div></div>}
    </main>
  );
}
