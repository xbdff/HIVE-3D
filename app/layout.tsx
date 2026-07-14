import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HIVE-3D | ICML 2026",
  description: "Hierarchical voxel enhancement for high-quality 3D scene generation from a single image.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
