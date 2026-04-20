// NAFE — configuration statique de l'organisation (non éditable côté user)
// Tout le contenu dynamique (joueurs, matchs, actus, scores, palmarès)
// vit dans window.store (cf. store.jsx). Vide par défaut — rempli via /admin.

const TEAMS_META = {
  valorant: { slug: "valorant", game: "VALORANT",          title: "NAFE Valorant", region: "EMEA" },
  lol:      { slug: "lol",      game: "LEAGUE OF LEGENDS", title: "NAFE LoL",      region: "LEC"  },
  cs2:      { slug: "cs2",      game: "COUNTER-STRIKE 2",  title: "NAFE CS2",      region: "EU"   },
};

// getTeam(slug) — merge méta + contenu dynamique du store
function getTeam(slug) {
  const meta = TEAMS_META[slug];
  if (!meta) return null;
  const roster = window.store.getPlayersByTeam(slug);
  const trophies = window.store.getTrophiesByTeam(slug);
  return { ...meta, roster, trophies };
}

// Missions & paliers club — structure de programme, non liée à des joueurs
const MISSIONS = [
  { title: "Regarde 3 matchs live",        xp: 150 },
  { title: "Vote ton MVP de la semaine",   xp: 80  },
  { title: "Invite un ami au club",        xp: 300 },
  { title: "Achète un jersey officiel",    xp: 500 },
  { title: "Partage un highlight sur X",   xp: 120 },
];

const REWARDS = [
  { tier: "Rookie",  need: 0,     perk: "Badge digital + ticker perso" },
  { tier: "Starter", need: 1000,  perk: "Meet & greet virtuel trimestriel" },
  { tier: "Veteran", need: 5000,  perk: "Drop exclusif jersey numéroté" },
  { tier: "Legend",  need: 15000, perk: "Finale offline + hospitalité VIP" },
];

const NAV = [
  { key: "home",     label: "Hub",        icon: "◉", href: "#/" },
  { key: "teams",    label: "Teams",      icon: "▣", href: "#/teams/valorant" },
  { key: "live",     label: "Live",       icon: "▶", href: "#/live" },
  { key: "calendar", label: "Calendrier", icon: "▤", href: "#/calendar" },
  { key: "news",     label: "Actu",       icon: "✎", href: "#/news" },
  { key: "club",     label: "Club",       icon: "✦", href: "#/club" },
  { key: "admin",    label: "Admin",      icon: "⚙", href: "#/admin" },
];

Object.assign(window, { TEAMS_META, getTeam, MISSIONS, REWARDS, NAV });
