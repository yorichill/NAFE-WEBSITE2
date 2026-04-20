import type { Metadata } from "next";
import "./globals.css";
import { displayFont, sansFont, monoFont } from "./fonts";
import { RadialSidebar } from "@/components/RadialSidebar";
import { StickyHeader } from "@/components/StickyHeader";
import { ScoreTicker } from "@/components/ScoreTicker";

export const metadata: Metadata = {
  title: "Fnatic × Nafe — Esport Premium",
  description:
    "L'écosystème Fnatic repensé sous la direction créative Nafe. Matchs live, rosters, statistiques et programme de fidélité.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`dark ${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen bg-nafe-night text-white font-sans antialiased">
        <ScoreTicker />
        <StickyHeader />
        <RadialSidebar />
        <main className="pl-16 pt-24 min-h-screen relative">
          <div className="absolute inset-0 bg-scan-line pointer-events-none opacity-40" />
          <div className="relative z-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
