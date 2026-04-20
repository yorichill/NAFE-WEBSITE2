// NAFE — Live match / watch page

const { useState: useLiveState, useEffect: useLiveEffect } = React;

function LivePage({ accent }) {
  window.store.useVersion();
  const live = window.store.getLiveMatch();
  const upcoming = window.store.getUpcomingMatches(6).filter((m) => m.id !== live?.id);

  const [tick, setTick] = useLiveState(0);
  useLiveEffect(() => {
    if (!live) return;
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [live?.id]);

  if (!live) {
    return (
      <div className="nafe-page">
        <section className="nafe-team__hero">
          <span className="nafe-eyebrow" style={{ color: accent }}>Live · NAFE TEAM</span>
          <h1 className="nafe-display nafe-team__title">LIVE<span style={{ color: accent }}>.</span></h1>
          <p className="nafe-team__lede">
            Ici s'affichent le match en cours, le scoreboard et le chat du club.
          </p>
        </section>
        <div className="nafe-empty nafe-empty--panel">
          <span className="nafe-mono" style={{ color: accent }}>AUCUN MATCH EN DIRECT</span>
          <p className="nafe-empty__text">
            {window.store.isAdmin()
              ? <>Pour faire apparaître un match ici, crée-le dans l'espace admin et passe son statut à <strong>En direct</strong>.</>
              : "Aucune diffusion live en ce moment. Abonne-toi pour être notifié du prochain stream."}
          </p>
          {window.store.isAdmin() && (
            <a className="nafe-btn nafe-btn--accent" style={{ background: accent }} href="#/admin/matches">
              → Admin matchs
            </a>
          )}
        </div>
        {upcoming.length > 0 && (
          <section className="nafe-section">
            <header className="nafe-section__head">
              <div>
                <span className="nafe-eyebrow">À suivre</span>
                <h2 className="nafe-display nafe-section__title">Prochains matchs</h2>
              </div>
            </header>
            <div className="nafe-upnext">
              {upcoming.map((u) => (
                <div key={u.id} className="nafe-up">
                  <span className="nafe-mono nafe-up__when">{u.date} · {u.time}</span>
                  <div>
                    <p className="nafe-display nafe-up__title">NAFE vs {u.opp || "TBD"}</p>
                    <p className="nafe-mono nafe-up__event">{u.event} · {u.game}</p>
                  </div>
                  <span className="nafe-mono nafe-up__arrow">→</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  const [a, b] = String(live.result || "").split(/[-–]/).map(s => (s || "").trim());
  const seconds = tick % 60;
  const minutes = Math.floor(tick / 60) % 60;
  const timer = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="nafe-page">
      <section className="nafe-live__hero">
        <div className="nafe-live__banner">
          <span className="nafe-mono nafe-live__tag" style={{ background: "#E53E3E" }}>
            <span className="nafe-pulse" /> EN DIRECT
          </span>
          <span className="nafe-mono nafe-live__event">{live.event}</span>
          <span className="nafe-live__spacer" />
          <span className="nafe-mono nafe-live__viewers">{live.loc}</span>
        </div>

        <div className="nafe-live__main">
          <div className="nafe-live__team nafe-live__team--home">
            <div className="nafe-live__logo" style={{ borderColor: accent, color: accent }}>
              NAFE
            </div>
            <div>
              <span className="nafe-mono nafe-live__teamMeta">{live.game}</span>
              <h2 className="nafe-display nafe-live__teamName">NAFE</h2>
              <span className="nafe-mono nafe-live__record">{live.event}</span>
            </div>
            <span className="nafe-display nafe-live__score" style={{ color: accent }}>{a || "—"}</span>
          </div>

          <div className="nafe-live__mid">
            <span className="nafe-mono nafe-live__map">{live.game}</span>
            <span className="nafe-display nafe-live__mapName">{live.event}</span>
            <span className="nafe-mono nafe-live__round">{live.loc}</span>
            <div className="nafe-live__timer">
              <span className="nafe-mono">T+{timer}</span>
            </div>
          </div>

          <div className="nafe-live__team nafe-live__team--away">
            <span className="nafe-display nafe-live__score">{b || "—"}</span>
            <div>
              <span className="nafe-mono nafe-live__teamMeta">ADV</span>
              <h2 className="nafe-display nafe-live__teamName">{live.opp || "TBD"}</h2>
              <span className="nafe-mono nafe-live__record">—</span>
            </div>
            <div className="nafe-live__logo">{(live.opp || "?").slice(0, 2).toUpperCase()}</div>
          </div>
        </div>

        <div className="nafe-live__cta">
          <button className="nafe-btn nafe-btn--accent nafe-clip-card" style={{ background: accent }}>
            ▶  Regarder le stream
          </button>
          <button className="nafe-btn nafe-btn--ghost nafe-clip-card">
            Stats en direct
          </button>
          <span className="nafe-mono nafe-live__platforms">TWITCH · YT · KICK</span>
        </div>
      </section>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="nafe-section">
          <header className="nafe-section__head">
            <div>
              <span className="nafe-eyebrow">À suivre</span>
              <h2 className="nafe-display nafe-section__title">Prochains matchs</h2>
            </div>
          </header>
          <div className="nafe-upnext">
            {upcoming.map((u) => (
              <div key={u.id} className="nafe-up">
                <span className="nafe-mono nafe-up__when">{u.date} · {u.time}</span>
                <div>
                  <p className="nafe-display nafe-up__title">NAFE vs {u.opp || "TBD"}</p>
                  <p className="nafe-mono nafe-up__event">{u.event} · {u.game}</p>
                </div>
                <span className="nafe-mono nafe-up__arrow">→</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

window.LivePage = LivePage;
