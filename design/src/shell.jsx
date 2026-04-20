// NAFE — layout shell: ticker, sidebar, sticky header, background layers

const { useState, useEffect, useRef } = React;

// ========== ScoreTicker ==========
function ScoreTicker() {
  window.store.useVersion();
  const scores = window.store.scores.list();
  if (!scores.length) return null;
  const doubled = [...scores, ...scores];
  return (
    <div className="nafe-ticker">
      <div className="nafe-ticker__track">
        {doubled.map((s, i) => (
          <span key={i} className="nafe-ticker__item">
            {s.live && <span className="nafe-ticker__dot" />}
            <span className="nafe-ticker__game">{s.game}</span>
            <span className="nafe-ticker__match">{s.match}</span>
            <span className="nafe-ticker__score">{s.score}</span>
            <span className="nafe-ticker__sep">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ========== StickyHeader ==========
function StickyHeader({ route, onNav }) {
  const [shrunk, setShrunk] = useState(false);
  useEffect(() => {
    const scroller = document.querySelector(".nafe-main");
    if (!scroller) return;
    const onScroll = () => setShrunk(scroller.scrollTop > 80);
    scroller.addEventListener("scroll", onScroll);
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nafe-header ${shrunk ? "is-shrunk" : ""}`}>
      <a href="#/" onClick={(e) => { e.preventDefault(); onNav("#/"); }} className="nafe-logo">
        NAFE<span className="nafe-logo__slash">/</span>TEAM
      </a>
      <nav className="nafe-header__nav">
        <a href="#/teams/valorant" onClick={(e) => { e.preventDefault(); onNav("#/teams/valorant"); }}
           className={route.startsWith("/teams") ? "is-active" : ""}>Roster</a>
        <a href="#/live" onClick={(e) => { e.preventDefault(); onNav("#/live"); }}
           className={route === "/live" ? "is-active" : ""}>Live</a>
        <a href="#/calendar" onClick={(e) => { e.preventDefault(); onNav("#/calendar"); }}
           className={route === "/calendar" ? "is-active" : ""}>Calendrier</a>
        <a href="#/news" onClick={(e) => { e.preventDefault(); onNav("#/news"); }}
           className={route === "/news" ? "is-active" : ""}>Actu</a>
        <a href="#/club" onClick={(e) => { e.preventDefault(); onNav("#/club"); }}
           className={route === "/club" ? "is-active" : ""}>Club</a>
        <button className="nafe-btn nafe-btn--accent nafe-btn--sm">S'inscrire</button>
      </nav>
    </header>
  );
}

// ========== Sidebar ==========
function Sidebar({ route, onNav }) {
  const [hover, setHover] = useState(null);

  const sections = {
    home: [{ label: "Accueil", href: "#/" }],
    teams: [
      { label: "Valorant", href: "#/teams/valorant" },
      { label: "League of Legends", href: "#/teams/lol" },
      { label: "CS2", href: "#/teams/cs2" },
    ],
    live: [{ label: "Match en cours", href: "#/live" }],
    calendar: [{ label: "Mois & liste", href: "#/calendar" }],
    news: [{ label: "Dernières dépêches", href: "#/news" }],
    club: [{ label: "Dashboard", href: "#/club" }],
    admin: [
      { label: "Joueurs", href: "#/admin/players" },
      { label: "Matchs & calendrier", href: "#/admin/matches" },
      { label: "Actualités", href: "#/admin/news" },
      { label: "Ticker scores", href: "#/admin/scores" },
      { label: "Palmarès", href: "#/admin/trophies" },
    ],
    shop: [{ label: "Bientôt", href: "#/shop" }],
  };

  return (
    <aside className="nafe-sidebar">
      <div className="nafe-sidebar__mark">N</div>
      {window.NAV.map((item) => {
        const active =
          (item.key === "teams" && route.startsWith("/teams")) ||
          (item.key === "home" && route === "/") ||
          (item.key === item.key && route === `/${item.key}`);
        return (
          <div
            key={item.key}
            className="nafe-sidebar__item"
            onMouseEnter={() => setHover(item.key)}
            onMouseLeave={() => setHover(null)}
          >
            <button
              className={`nafe-sidebar__btn ${active ? "is-active" : ""}`}
              onClick={() => onNav(item.href)}
              aria-label={item.label}
            >
              <span>{item.icon}</span>
            </button>
            {hover === item.key && (
              <div className="nafe-sidebar__flyout">
                <span className="nafe-sidebar__flyoutLabel">{item.label}</span>
                {sections[item.key].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    onClick={(e) => { e.preventDefault(); onNav(s.href); }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="nafe-sidebar__foot">
        <span>FR</span>
        <span>/</span>
        <span>EN</span>
      </div>
    </aside>
  );
}

Object.assign(window, { ScoreTicker, StickyHeader, Sidebar });
