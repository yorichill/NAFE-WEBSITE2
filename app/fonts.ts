import { Inter_Tight, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// --- Fonte display ---
// Maquette = Neue Machina (commerciale, Pangram Pangram).
// Par défaut on ship Space Grotesk (libre, feel géométrique/tech proche).
// Pour passer à Neue Machina :
//   1. Achète la licence sur pangrampangram.com
//   2. Dépose les .woff2 dans public/fonts/
//   3. Remplace ce bloc par le `localFont(...)` commenté plus bas
export const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "700"],
});

/*
import localFont from "next/font/local";
export const displayFont = localFont({
  src: [
    { path: "../public/fonts/NeueMachina-Regular.woff2", weight: "400" },
    { path: "../public/fonts/NeueMachina-Medium.woff2",  weight: "500" },
    { path: "../public/fonts/NeueMachina-Ultrabold.woff2", weight: "800" },
  ],
  variable: "--font-display",
  display: "swap",
});
*/

export const sansFont = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});
