import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HIVE-3D | ICML 2026",
  description: "HIVE-3D: Hierarchical Voxel Enhancement for High-Quality 3D Scene Generation, accepted at ICML 2026.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
