// NAFE — shared data (mirrors lib/rosters.ts but with original org identity)

const TEAMS = {
  valorant: {
    slug: "valorant",
    game: "VALORANT",
    title: "NAFE Valorant",
    region: "EMEA",
    record: "14–3",
    next: { opp: "TEAM KOVA", when: "JEU · 21:00", map: "SUNSET" },
    trophies: [
      { year: 2023, event: "VCT LOCK//IN São Paulo", place: "Champion" },
      { year: 2024, event: "VCT EMEA Kickoff", place: "Champion" },
      { year: 2025, event: "VCT Masters Madrid", place: "Finaliste" },
      { year: 2026, event: "VCT EMEA Stage 1", place: "Champion" },
    ],
    roster: [
      { name: "Boaster", tag: "boaster", role: "IGL", jersey: 1, kd: 1.08, country: "UK", hs: 28, acs: 212, gear: { mouse: "Logi G Pro X", keyboard: "Wooting 60HE", headset: "HyperX Cloud II" } },
      { name: "Derke", tag: "derke", role: "Duelist", jersey: 7, kd: 1.34, country: "FI", hs: 34, acs: 268 },
      { name: "Alfajer", tag: "alfajer", role: "Sentinel", jersey: 11, kd: 1.21, country: "TR", hs: 31, acs: 241 },
      { name: "Chronicle", tag: "chronicle", role: "Flex", jersey: 23, kd: 1.18, country: "RU", hs: 29, acs: 229 },
      { name: "Leo", tag: "leo", role: "Initiator", jersey: 42, kd: 1.26, country: "SE", hs: 30, acs: 238 },
    ],
  },
  lol: {
    slug: "lol",
    game: "LEAGUE OF LEGENDS",
    title: "NAFE LoL",
    region: "LEC",
    record: "9–5",
    next: { opp: "MAD LIONS KOI", when: "VEN · 18:00", map: "SUMMONER'S RIFT" },
    trophies: [
      { year: 2024, event: "LEC Summer", place: "Finaliste" },
      { year: 2025, event: "LEC Winter", place: "Champion" },
      { year: 2026, event: "MSI Séoul", place: "Top 4" },
    ],
    roster: [
      { name: "Oscarinin", tag: "oscarinin", role: "Top", jersey: 2, kd: 3.4, country: "ES", hs: 0, acs: 0, gear: { mouse: "Razer Viper V3", keyboard: "Ducky One 3", headset: "Sennheiser HD 560s" } },
      { name: "Razork", tag: "razork", role: "Jungle", jersey: 5, kd: 3.9, country: "ES", hs: 0, acs: 0 },
      { name: "Humanoid", tag: "humanoid", role: "Mid", jersey: 9, kd: 4.8, country: "CZ", hs: 0, acs: 0 },
      { name: "Noah", tag: "noah", role: "ADC", jersey: 14, kd: 4.2, country: "DK", hs: 0, acs: 0 },
      { name: "Jun", tag: "jun", role: "Support", jersey: 21, kd: 2.7, country: "KR", hs: 0, acs: 0 },
    ],
  },
  cs2: {
    slug: "cs2",
    game: "COUNTER-STRIKE 2",
    title: "NAFE CS2",
    region: "EU",
    record: "22–6",
    next: { opp: "VIRTUS.ALT", when: "SAM · 20:30", map: "MIRAGE" },
    trophies: [
      { year: 2024, event: "ESL Pro League S20", place: "Champion" },
      { year: 2025, event: "IEM Katowice", place: "Top 4" },
      { year: 2026, event: "BLAST Paris Major", place: "Champion" },
    ],
    roster: [
      { name: "fear", tag: "fear", role: "Rifler", jersey: 3, kd: 1.12, country: "UK", hs: 47, acs: 82, gear: { mouse: "Zowie EC2-CW", keyboard: "Apex Pro TKL", headset: "HyperX Cloud III" } },
      { name: "KRIMZ", tag: "krimz", role: "Anchor", jersey: 8, kd: 1.09, country: "SE", hs: 49, acs: 79 },
      { name: "blameF", tag: "blamef", role: "AWP", jersey: 13, kd: 1.22, country: "DK", hs: 38, acs: 88 },
      { name: "matys", tag: "matys", role: "Entry", jersey: 17, kd: 1.15, country: "PL", hs: 51, acs: 84 },
      { name: "zonic", tag: "zonic", role: "Support", jersey: 24, kd: 1.04, country: "DK", hs: 44, acs: 71 },
    ],
  },
};

const SCORES = [
  { match: "NAFE vs KOVA", score: "13-11", game: "VALORANT", live: true },
  { match: "NAFE vs G2", score: "2-1", game: "LEC", live: false },
  { match: "NAFE vs NAVI-A", score: "16-14", game: "CS2", live: true },
  { match: "NAFE vs GEN", score: "À VENIR", game: "VALORANT", live: false },
  { match: "NAFE vs MAD", score: "1-0", game: "LEC", live: true },
  { match: "NAFE vs VIRTUS", score: "À VENIR", game: "CS2", live: false },
];

const MISSIONS = [
  { title: "Regarde 3 matchs live", xp: 150, done: true },
  { title: "Vote ton MVP de la semaine", xp: 80, done: true },
  { title: "Invite un ami au club", xp: 300, done: false },
  { title: "Achète un jersey officiel", xp: 500, done: false },
  { title: "Partage un highlight sur X", xp: 120, done: false },
];

const REWARDS = [
  { tier: "Rookie", need: 0, perk: "Badge digital + ticker perso" },
  { tier: "Starter", need: 1000, perk: "Meet & greet virtuel trimestriel" },
  { tier: "Veteran", need: 5000, perk: "Drop exclusif jersey numéroté" },
  { tier: "Legend", need: 15000, perk: "Finale offline + hospitalité VIP" },
];

const NAV = [
  { key: "home", label: "Hub", icon: "◉", href: "#/" },
  { key: "teams", label: "Teams", icon: "▣", href: "#/teams/valorant" },
  { key: "live", label: "Live", icon: "▶", href: "#/live" },
  { key: "calendar", label: "Calendrier", icon: "▤", href: "#/calendar" },
  { key: "news", label: "Actu", icon: "✎", href: "#/news" },
  { key: "club", label: "Club", icon: "✦", href: "#/club" },
  { key: "shop", label: "Shop", icon: "⊞", href: "#/shop" },
];

Object.assign(window, { TEAMS, SCORES, MISSIONS, REWARDS, NAV });
