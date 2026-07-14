export const paper = {
  title: "HIVE-3D: Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation",
  venue: "ICML 2026",
  authors: [
    "Bin Zang*", "Wenting Zheng*", "Xiaoliang Luo", "Zhiyuan Fang",
    "Shi Li", "Lvchun Wang", "Wei Yu", "Yi Zhao", "Tian Xie",
    "Yuchi Huo", "Rengan Xie",
  ],
  affiliations: [
    "State Key Laboratory of CAD&CG, Zhejiang University",
    "China Mobile (Jiangxi) Virtual Reality Technology Co., Ltd.",
  ],
  abstract: "Recently, a line of works can generate impressive 3D objects from a single image, but they are limited by restricted representation resolution, making them unsuitable for 3D scene generation. We introduce HIVE-3D, a novel method for high-quality 3D scene generation based on a hierarchical voxel enhancement framework. Given a single scene image, HIVE-3D first produces a coarse initial scene, aligns hierarchical 2D image components with 3D scene components, and organizes them into a component tree. A voxel super-resolution model then refines each target instance while maintaining consistency with its coarse voxels. Coarse-to-fine enhancement of images and voxels produces high-resolution, high-quality 3D scenes and achieves state-of-the-art performance.",
  stages: [
    { number: "01", title: "2D-to-3D Scene Tree", text: "Lift hierarchical image segments into 3D through attention-based matching, preserving the global layout while exposing local components." },
    { number: "02", title: "Voxel Super-Resolution", text: "Condition generation on both the fine image and coarse voxels to synthesize richer geometry without losing structural identity." },
    { number: "03", title: "Hierarchical Generation", text: "Refine from root to leaves, estimate scale and pose, then register every enhanced component back into a coherent scene." },
  ],
  metrics: { CD: "0.0035", fScore: "84.34", iou: "0.7449" },
  links: { paper: "./paper/HIVE-3D_final.pdf", code: "Coming Soon", model: "Coming Soon" },
  bibtex: `@inproceedings{zang2026hive3d,
  title     = {HIVE-3D: Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation},
  author    = {Zang, Bin and Zheng, Wenting and Luo, Xiaoliang and Fang, Zhiyuan and Li, Shi and Wang, Lvchun and Yu, Wei and Zhao, Yi and Xie, Tian and Huo, Yuchi and Xie, Rengan},
  booktitle = {Proceedings of the 43rd International Conference on Machine Learning},
  year      = {2026}
}`,
} as const;
