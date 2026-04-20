// NAFE — Calendar / Calendrier page

const { useState: useCalState, useMemo } = React;

// Build a synthetic fixture list for April-May 2026
const FIXTURES = [
  { date: "2026-04-14", time: "18:00", game: "VAL", event: "VCT EMEA Stage 1", opp: "Team Heretics", result: "13-9 / 13-7", status: "won", loc: "Berlin" },
  { date: "2026-04-16", time: "21:00", game: "VAL", event: "VCT EMEA Stage 1", opp: "Team KOVA",     result: "En cours",    status: "live", loc: "Paris" },
  { date: "2026-04-17", time: "19:30", game: "LOL", event: "LEC Stage 2 · W3", opp: "G2 Esports",     result: "1-2",         status: "lost", loc: "Berlin" },
  { date: "2026-04-18", time: "18:00", game: "CS2", event: "BLAST Open Stage", opp: "Virtus.alt",    result: "À venir",    status: "soon", loc: "Copenhague" },
  { date: "2026-04-19", time: "17:00", game: "LOL", event: "LEC Stage 2 · W3", opp: "Karmine Corp",  result: "À venir",    status: "soon", loc: "Berlin" },
  { date: "2026-04-20", time: "16:00", game: "VAL", event: "VCT EMEA Stage 1", opp: "KOI",           result: "À venir",    status: "soon", loc: "Paris" },
  { date: "2026-04-22", time: "20:30", game: "CS2", event: "BLAST Open Stage", opp: "FaZe Clan",     result: "À venir",    status: "soon", loc: "Copenhague" },
  { date: "2026-04-23", time: "19:00", game: "LOL", event: "LEC Stage 2 · W4", opp: "Fnatic Alt",    result: "À venir",    status: "soon", loc: "Berlin" },
  { date: "2026-04-24", time: "12:00", game: "DROP", event: "Jersey 2026",     opp: "",             result: "Drop public", status: "drop", loc: "En ligne" },
  { date: "2026-04-25", time: "18:00", game: "VAL", event: "VCT EMEA Stage 1", opp: "GiantX",        result: "À venir",    status: "soon", loc: "Paris" },
  { date: "2026-04-26", time: "17:30", game: "CS2", event: "IEM Dallas Qual",  opp: "Natus Vincere", result: "À venir",    status: "soon", loc: "En ligne" },
  { date: "2026-04-30", time: "20:00", game: "VAL", event: "VCT EMEA Playoff", opp: "TBD",           result: "Qualifié",   status: "soon", loc: "Berlin" },
  { date: "2026-05-02", time: "15:00", game: "LOL", event: "LEC Stage 2 · W5", opp: "MAD Lions KOI", result: "À venir",    status: "soon", loc: "Berlin" },
  { date: "2026-05-03", time: "19:00", game: "CS2", event: "BLAST Bounty",     opp: "Astralis",      result: "À venir",    status: "soon", loc: "Londres" },
  { date: "2026-05-05", time: "21:00", game: "EVENT", event: "Meet & Greet Veteran+", opp: "",       result: "Club",       status: "event", loc: "Paris" },
  { date: "2026-05-08", time: "18:00", game: "VAL", event: "VCT EMEA Playoff", opp: "TBD",           result: "À venir",    status: "soon", loc: "Berlin" },
  { date: "2026-05-10", time: "16:00", game: "LOL", event: "LEC Stage 2 · W6", opp: "Team Vitality", result: "À venir",    status: "soon", loc: "Berlin" },
  { date: "2026-05-15", time: "20:00", game: "CS2", event: "IEM Dallas",       opp: "TBD",           result: "À venir",    status: "soon", loc: "Dallas" },
];

const GAME_FILTERS = [
  { k: "ALL",  label: "Tout",         color: null },
  { k: "VAL",  label: "Valorant",     color: null },
  { k: "LOL",  label: "League",       color: null },
  { k: "CS2",  label: "CS2",          color: null },
  { k: "DROP", label: "Drops & Events", color: null },
];

const STATUS_LABEL = {
  won:  { label: "VICTOIRE", color: "#00D68F" },
  lost: { label: "DÉFAITE",  color: "#E53E3E" },
  live: { label: "EN DIRECT", color: "#E53E3E" },
  soon: { label: "À VENIR",  color: null },
  drop: { label: "DROP",     color: null },
  event:{ label: "ÉVÉNEMENT", color: null },
};

function CalendarPage({ accent }) {
  const [game, setGame] = useCalState("ALL");
  const [view, setView] = useCalState("month"); // month | list
  const [cursor, setCursor] = useCalState(new Date(2026, 3, 1)); // April 2026

  const filtered = useMemo(() => {
    if (game === "ALL") return FIXTURES;
    if (game === "DROP") return FIXTURES.filter(f => f.game === "DROP" || f.game === "EVENT");
    return FIXTURES.filter(f => f.game === game);
  }, [game]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const monthName = cursor.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7; // make Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const evts = filtered.filter(f => f.date === iso);
    cells.push({ d, iso, evts });
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const stats = {
    matches: filtered.filter(f => ["VAL", "LOL", "CS2"].includes(f.game)).length,
    wins: filtered.filter(f => f.status === "won").length,
    live: filtered.filter(f => f.status === "live").length,
  };

  return (
    <div className="nafe-page">
      <section className="nafe-team__hero">
        <span className="nafe-eyebrow" style={{ color: accent }}>
          Saison 2026 · Toutes compétitions
        </span>
        <h1 className="nafe-display nafe-team__title">CALENDRIER<span style={{ color: accent }}>.</span></h1>
        <p className="nafe-team__lede">
          Matchs officiels, drops, événements club — une source unique pour
          suivre NAFE TEAM au jour le jour.
        </p>
      </section>

      {/* Stat bar */}
      <section className="nafe-cal__stats">
        <div className="nafe-cal__stat">
          <span className="nafe-mono nafe-cal__statL">MATCHS AFFICHÉS</span>
          <span className="nafe-display nafe-cal__statV">{String(stats.matches).padStart(2, "0")}</span>
        </div>
        <div className="nafe-cal__stat">
          <span className="nafe-mono nafe-cal__statL">VICTOIRES</span>
          <span className="nafe-display nafe-cal__statV" style={{ color: "#00D68F" }}>{String(stats.wins).padStart(2, "0")}</span>
        </div>
        <div className="nafe-cal__stat">
          <span className="nafe-mono nafe-cal__statL">EN DIRECT</span>
          <span className="nafe-display nafe-cal__statV" style={{ color: accent }}>{String(stats.live).padStart(2, "0")}</span>
        </div>
        <div className="nafe-cal__stat">
          <span className="nafe-mono nafe-cal__statL">MOIS AFFICHÉ</span>
          <span className="nafe-display nafe-cal__statV" style={{ textTransform: "uppercase", fontSize: 24 }}>
            {monthName}
          </span>
        </div>
      </section>

      {/* Filters + view toggle */}
      <section className="nafe-cal__toolbar">
        <div className="nafe-cal__filters">
          {GAME_FILTERS.map(f => (
            <button
              key={f.k}
              className={`nafe-news__chip ${game === f.k ? "is-active" : ""}`}
              style={game === f.k ? { background: accent, color: "#fff", borderColor: accent } : {}}
              onClick={() => setGame(f.k)}
            >
              <span className="nafe-mono">{f.label.toUpperCase()}</span>
              <span className="nafe-news__chipN nafe-mono">
                {f.k === "ALL" ? FIXTURES.length
                  : f.k === "DROP" ? FIXTURES.filter(x => x.game === "DROP" || x.game === "EVENT").length
                  : FIXTURES.filter(x => x.game === f.k).length}
              </span>
            </button>
          ))}
        </div>
        <div className="nafe-cal__viewToggle">
          <button
            className={`nafe-tweaks__seg ${view === "month" ? "is-active" : ""}`}
            style={view === "month" ? { background: accent } : {}}
            onClick={() => setView("month")}
          >MOIS</button>
          <button
            className={`nafe-tweaks__seg ${view === "list" ? "is-active" : ""}`}
            style={view === "list" ? { background: accent } : {}}
            onClick={() => setView("list")}
          >LISTE</button>
        </div>
      </section>

      {view === "month" ? (
        <section className="nafe-cal__grid">
          <div className="nafe-cal__gridHead">
            <button className="nafe-cal__navBtn" onClick={() => setCursor(new Date(year, month - 1, 1))}>←</button>
            <span className="nafe-display nafe-cal__gridTitle">{monthName}</span>
            <button className="nafe-cal__navBtn" onClick={() => setCursor(new Date(year, month + 1, 1))}>→</button>
          </div>
          <div className="nafe-cal__dow">
            {["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"].map(d => (
              <span key={d} className="nafe-mono">{d}</span>
            ))}
          </div>
          <div className="nafe-cal__cells">
            {cells.map((c, i) => (
              <div key={i} className={`nafe-cal__cell ${!c ? "is-empty" : ""} ${c?.evts?.length ? "has-evt" : ""}`}>
                {c && (
                  <>
                    <span className="nafe-mono nafe-cal__cellDay">{String(c.d).padStart(2, "0")}</span>
                    <div className="nafe-cal__cellList">
                      {c.evts.map((e, j) => (
                        <div
                          key={j}
                          className={`nafe-cal__evt nafe-cal__evt--${e.game.toLowerCase()} nafe-cal__evt--${e.status}`}
                          style={e.status === "live" ? { borderColor: accent, background: `${accent}22` } : {}}
                        >
                          <span className="nafe-mono nafe-cal__evtGame">{e.game}</span>
                          <span className="nafe-cal__evtText">
                            {e.opp ? `vs ${e.opp}` : e.event}
                          </span>
                          <span className="nafe-mono nafe-cal__evtTime">{e.time}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="nafe-cal__list">
          {filtered.map((e, i) => {
            const dObj = new Date(e.date);
            const day = dObj.getDate();
            const dow = dObj.toLocaleDateString("fr-FR", { weekday: "short" }).toUpperCase();
            const mo = dObj.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
            const status = STATUS_LABEL[e.status];
            return (
              <div key={i} className="nafe-cal__row">
                <div className="nafe-cal__rowDate">
                  <span className="nafe-mono nafe-cal__rowDow">{dow}</span>
                  <span className="nafe-display nafe-cal__rowDay">{String(day).padStart(2, "0")}</span>
                  <span className="nafe-mono nafe-cal__rowMo">{mo}</span>
                </div>
                <div className="nafe-cal__rowGame" data-game={e.game}>
                  <span className="nafe-mono">{e.game}</span>
                </div>
                <div className="nafe-cal__rowMain">
                  <p className="nafe-display nafe-cal__rowOpp">
                    {e.opp ? `NAFE vs ${e.opp}` : e.event}
                  </p>
                  <p className="nafe-mono nafe-cal__rowEvent">
                    {e.opp ? e.event : ""} {e.opp && "·"} {e.loc}
                  </p>
                </div>
                <span className="nafe-mono nafe-cal__rowTime">{e.time}</span>
                <span
                  className="nafe-mono nafe-cal__rowStatus"
                  style={{ color: status.color || (e.status === "live" ? accent : "rgba(255,255,255,0.65)") }}
                >
                  {e.status === "live" && <span className="nafe-pulse" style={{ marginRight: 8 }} />}
                  {status.label}
                </span>
                <span className="nafe-mono nafe-cal__rowResult">{e.result}</span>
              </div>
            );
          })}
        </section>
      )}

      {/* Subscribe to calendar */}
      <section className="nafe-news__newsletter nafe-clip-card" style={{ marginTop: 60 }}>
        <div>
          <span className="nafe-eyebrow" style={{ color: accent }}>Synchronise</span>
          <h3 className="nafe-display nafe-news__nlTitle">
            Le calendrier NAFE dans ton agenda.
          </h3>
          <p className="nafe-news__nlLede">
            Google Calendar, Apple Calendar, Outlook — un clic, tout est là.
          </p>
        </div>
        <div className="nafe-news__nlForm">
          <button className="nafe-btn nafe-btn--ghost">.ICS</button>
          <button className="nafe-btn nafe-btn--accent" style={{ background: accent }}>
            Ajouter au calendrier
          </button>
        </div>
      </section>
    </div>
  );
}

window.CalendarPage = CalendarPage;
