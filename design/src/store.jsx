// NAFE — localStorage-backed CRUD store
// Source unique de vérité pour tout contenu visible côté user.
// L'espace /admin manipule ces données, les pages publiques les lisent.

(function () {
  const KEYS = {
    players: "nafe:players",
    matches: "nafe:matches",
    news:    "nafe:news",
    scores:  "nafe:scores",
    trophies:"nafe:trophies",
  };

  const uid = (p) =>
    `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

  function read(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const v = JSON.parse(raw);
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  }

  function write(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent("store:update", { detail: { key } }));
  }

  function crud(key, prefix) {
    return {
      list: () => read(key),
      get: (id) => read(key).find((x) => x.id === id),
      add: (item) => {
        const all = read(key);
        const id = item.id || uid(prefix);
        const row = { ...item, id, createdAt: item.createdAt || Date.now() };
        all.push(row);
        write(key, all);
        return row;
      },
      update: (id, patch) => {
        const all = read(key).map((x) => (x.id === id ? { ...x, ...patch } : x));
        write(key, all);
      },
      remove: (id) => {
        write(
          key,
          read(key).filter((x) => x.id !== id)
        );
      },
      clear: () => write(key, []),
    };
  }

  const players  = crud(KEYS.players,  "pl");
  const matches  = crud(KEYS.matches,  "mt");
  const news     = crud(KEYS.news,     "nw");
  const scores   = crud(KEYS.scores,   "sc");
  const trophies = crud(KEYS.trophies, "tr");

  const store = {
    KEYS,
    uid,
    players,
    matches,
    news,
    scores,
    trophies,

    // --- queries croisées utilisées par les pages publiques ---
    getPlayersByTeam: (team) =>
      players.list().filter((p) => p.team === team),

    getTrophiesByTeam: (team) =>
      trophies.list().filter((t) => t.team === team),

    getLiveMatch: () =>
      matches.list().find((m) => m.status === "live"),

    getUpcomingMatches: (limit = 8) =>
      matches
        .list()
        .filter((m) => m.status === "soon" || m.status === "live")
        .sort((a, b) =>
          `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
        )
        .slice(0, limit),

    getFeaturedNews: () =>
      news.list().find((n) => n.featured) ||
      news.list().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))[0],

    // --- seed de démonstration facultatif ---
    seedDemo: () => {
      if (players.list().length > 0) return;
      players.add({ team: "valorant", name: "Exemple",  tag: "exemple",  role: "Duelist", jersey: 7, kd: 0, country: "FR", hs: 0, acs: 0 });
      matches.add({ date: new Date().toISOString().slice(0,10), time: "20:00", game: "VAL", event: "Événement exemple", opp: "Adversaire", result: "À venir", status: "soon", loc: "En ligne" });
      news.add({ date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(), cat: "Annonce", game: "CLUB", title: "Premier post de test", lede: "Crée, modifie ou supprime cette actu depuis l'espace Admin.", author: "Staff", readTime: "1 min", featured: true });
    },

    wipeAll: () => {
      Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
      window.dispatchEvent(new CustomEvent("store:update", { detail: { key: "*" } }));
    },

    subscribe: (cb) => {
      window.addEventListener("store:update", cb);
      return () => window.removeEventListener("store:update", cb);
    },

    // Hook React : force un re-render à chaque update du store
    useVersion: () => {
      const [v, setV] = React.useState(0);
      React.useEffect(() => {
        const cb = () => setV((x) => x + 1);
        window.addEventListener("store:update", cb);
        return () => window.removeEventListener("store:update", cb);
      }, []);
      return v;
    },
  };

  window.store = store;
})();
