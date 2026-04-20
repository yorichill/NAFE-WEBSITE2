# Fnatic × Nafe — Refonte

Next.js 15 + Tailwind v3 + Framer Motion. Direction créative « NAFE TEAM » :
bleu électrique `#1E4FD8`, typo noire `#0A0A0A`, surfaces blanches, dark mode bleu-nuit.

## Démarrer

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## Pages

| Route                     | Contenu                                   |
| ------------------------- | ----------------------------------------- |
| `/`                       | Hub central · hero + roster Valorant      |
| `/teams/valorant`         | Roster, palmarès, gear signature          |
| `/teams/lol` · `/teams/cs2` | Mêmes sections, données dans `lib/rosters.ts` |
| `/club/dashboard`         | XP, rang, missions, paliers de fidélité   |

## Polices (`next/font`)

Wiré dans [`app/fonts.ts`](app/fonts.ts) et exposé via variables CSS `--font-display`,
`--font-sans`, `--font-mono` consommées par `tailwind.config.ts`.

| Rôle    | Fonte utilisée   | Cible maquette  | Source         |
| ------- | ---------------- | --------------- | -------------- |
| Display | Space Grotesk    | Neue Machina    | Google Fonts   |
| Sans    | Inter Tight      | Inter Tight     | Google Fonts   |
| Mono    | JetBrains Mono   | JetBrains Mono  | Google Fonts   |

### Passer à Neue Machina (production)

Neue Machina est une fonte commerciale (Pangram Pangram). Une fois la licence achetée :

1. Dépose les `.woff2` dans `public/fonts/` :
   - `NeueMachina-Regular.woff2`
   - `NeueMachina-Medium.woff2`
   - `NeueMachina-Ultrabold.woff2`
2. Dans [`app/fonts.ts`](app/fonts.ts), commente le bloc `Space_Grotesk` et décommente le bloc `localFont` fourni.
3. Redémarre `npm run dev`.

## Design tokens

| Token           | Valeur     | Usage                         |
| --------------- | ---------- | ----------------------------- |
| `nafe-blue`     | `#1E4FD8`  | CTA, accents, glow            |
| `nafe-ice`      | `#E8F0FF`  | Fond secondaire (light mode)  |
| `nafe-ink`      | `#0A0A0A`  | Typographie principale        |
| `nafe-night`    | `#050814`  | Fond dark mode                |
| `nafe-surface`  | `#0F1729`  | Cartes dark mode              |
| `steel-grey`    | `#6B7280`  | Labels, métadonnées           |

Tokens animés : `pulse-glow` (hover indicator), `ticker` (bandeau scores),
`shadow: nafe-glow` / `nafe-card`.

## Structure

```
app/
  layout.tsx          Shell (Ticker + Header + Sidebar)
  page.tsx            Hub central
  fonts.ts            next/font + variables CSS
  globals.css         Tokens CSS, clip-paths, grain
  teams/[game]/       Pages équipes dynamiques
  club/dashboard/     Espace membre
components/
  PlayerCard.tsx      Carte joueur 3D tilt + K/D
  RadialSidebar.tsx   Nav déployable au hover
  StickyHeader.tsx    Shrink au scroll
  ScoreTicker.tsx     Bandeau live scores
  ProgressRing.tsx    Jauge XP du dashboard
lib/
  rosters.ts          Source de vérité équipes/joueurs
  tokens.ts           Tokens typés (TypeScript)
tailwind.config.ts    Palette + animations + fonts
```
