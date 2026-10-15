import type { ReactNode } from "react";
import "../globals.css";
import { fraunces, inter } from "@/lib/fonts";

export const metadata = {
  title: "NDS Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
