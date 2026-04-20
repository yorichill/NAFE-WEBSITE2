export type Player = {
  name: string;
  tag: string;
  role: string;
  jersey: number;
  kd: number;
  country: string;
  gear?: { mouse: string; keyboard: string; headset: string };
};

export type Team = {
  slug: string;
  game: string;
  title: string;
  region: string;
  trophies: { year: number; event: string; place: string }[];
  roster: Player[];
};

export const TEAMS: Record<string, Team> = {
  valorant: {
    slug: "valorant",
    game: "VALORANT",
    title: "Fnatic Valorant",
    region: "EMEA",
    trophies: [
      { year: 2023, event: "VCT LOCK//IN São Paulo", place: "Champion" },
      { year: 2023, event: "VCT Masters Tokyo", place: "Finalist" },
      { year: 2024, event: "VCT EMEA Kickoff", place: "Champion" },
    ],
    roster: [
      {
        name: "Boaster",
        tag: "boaster",
        role: "IGL",
        jersey: 1,
        kd: 1.08,
        country: "UK",
        gear: { mouse: "Logitech G Pro X", keyboard: "Wooting 60HE", headset: "HyperX Cloud II" },
      },
      { name: "Derke", tag: "derke", role: "Duelist", jersey: 7, kd: 1.34, country: "FI" },
      { name: "Alfajer", tag: "alfajer", role: "Sentinel", jersey: 11, kd: 1.21, country: "TR" },
      { name: "Chronicle", tag: "chronicle", role: "Flex", jersey: 23, kd: 1.18, country: "RU" },
      { name: "Leo", tag: "leo", role: "Initiator", jersey: 42, kd: 1.26, country: "SE" },
    ],
  },
  lol: {
    slug: "lol",
    game: "LEAGUE OF LEGENDS",
    title: "Fnatic LoL",
    region: "LEC",
    trophies: [
      { year: 2011, event: "Worlds Season 1", place: "Champion" },
      { year: 2018, event: "Worlds", place: "Finalist" },
    ],
    roster: [
      { name: "Oscarinin", tag: "oscarinin", role: "Top", jersey: 2, kd: 3.4, country: "ES" },
      { name: "Razork", tag: "razork", role: "Jungle", jersey: 5, kd: 3.9, country: "ES" },
      { name: "Humanoid", tag: "humanoid", role: "Mid", jersey: 9, kd: 4.8, country: "CZ" },
      { name: "Noah", tag: "noah", role: "ADC", jersey: 14, kd: 4.2, country: "DK" },
      { name: "Jun", tag: "jun", role: "Support", jersey: 21, kd: 2.7, country: "KR" },
    ],
  },
  cs2: {
    slug: "cs2",
    game: "COUNTER-STRIKE 2",
    title: "Fnatic CS2",
    region: "EU",
    trophies: [
      { year: 2015, event: "ESL One Katowice", place: "Champion" },
      { year: 2015, event: "ESL One Cologne", place: "Champion" },
    ],
    roster: [
      { name: "fear", tag: "fear", role: "Rifler", jersey: 3, kd: 1.12, country: "UK" },
      { name: "KRIMZ", tag: "krimz", role: "Anchor", jersey: 8, kd: 1.09, country: "SE" },
      { name: "blameF", tag: "blamef", role: "AWP", jersey: 13, kd: 1.22, country: "DK" },
      { name: "matys", tag: "matys", role: "Entry", jersey: 17, kd: 1.15, country: "PL" },
      { name: "MATYS", tag: "matys2", role: "Support", jersey: 24, kd: 1.04, country: "PL" },
    ],
  },
};
