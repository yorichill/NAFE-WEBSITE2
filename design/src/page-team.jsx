// NAFE — Team page with Valorant / LoL / CS2 tab switch

const { useState: useTeamState } = React;

function TeamPage({ accent, cardVariant, initialGame = "valorant" }) {
  window.store.useVersion();
  const [game, setGame] = useTeamState(initialGame);
  const team = window.getTeam(game);
  if (!team) return null;

  const recordWins = window.store.matches
    .list()
    .filter((m) => m.status === "won").length;
  const recordLosses = window.store.matches
    .list()
    .filter((m) => m.status === "lost").length;
  const record = `${recordWins}–${recordLosses}`;

  return (
    <div className="nafe-page">
      <section className="nafe-team__hero">
        <span className="nafe-eyebrow" style={{ color: accent }}>
          {team.region} · Roster officiel
        </span>
        <h1 className="nafe-display nafe-team__title">{team.game}</h1>
        <p className="nafe-team__lede">
          L'effectif complet de {team.title} — statistiques, palmarès et
          équipement signature. Bilan toutes compétitions&nbsp;: <strong>{record}</strong>.
        </p>

        {/* Tab switch */}
        <div className="nafe-tabs" role="tablist">
          {Object.entries(window.TEAMS_META).map(([k, t], i) => (
            <button
              key={k}
              role="tab"
              className={`nafe-tab ${game === k ? "is-active" : ""}`}
              style={game === k ? { borderColor: accent, color: "#fff" } : {}}
              onClick={() => setGame(k)}
            >
              <span className="nafe-mono nafe-tab__num">0{i + 1}</span>
              <span className="nafe-display nafe-tab__label">{t.game}</span>
              <span className="nafe-mono nafe-tab__meta">
                {t.region} · {window.store.getPlayersByTeam(k).length} joueur(s)
              </span>
              {game === k && <span className="nafe-tab__bar" style={{ background: accent }} />}
            </button>
          ))}
        </div>
      </section>

      {/* Roster */}
      <section className="nafe-section">
        <header className="nafe-section__head">
          <div>
            <span className="nafe-eyebrow">Effectif</span>
            <h2 className="nafe-display nafe-section__title">Roster titulaire</h2>
          </div>
          <span className="nafe-mono nafe-section__count">
            {String(team.roster.length).padStart(2, "0")} JOUEUR{team.roster.length > 1 ? "S" : ""}
          </span>
        </header>
        {team.roster.length === 0 ? (
          <div className="nafe-empty nafe-empty--panel">
            <span className="nafe-mono" style={{ color: accent }}>AUCUN JOUEUR</span>
            <p className="nafe-empty__text">
              Le roster {team.game} est vide. Ajoute des joueurs depuis l'espace admin
              pour qu'ils apparaissent ici avec leurs statistiques.
            </p>
            <a className="nafe-btn nafe-btn--ghost" href="#/admin/players">→ Admin joueurs</a>
          </div>
        ) : (
          <div className={`nafe-roster nafe-roster--${cardVariant}`}>
            {team.roster.map((p) => (
              <window.PlayerCard key={p.id || p.tag} p={p} accent={accent} variant={cardVariant} />
            ))}
          </div>
        )}
      </section>

      {/* Palmarès */}
      <section className="nafe-section">
        <header className="nafe-section__head">
          <div>
            <span className="nafe-eyebrow">Palmarès</span>
            <h2 className="nafe-display nafe-section__title">Trophées</h2>
          </div>
          <span className="nafe-mono nafe-section__count">
            {String(team.trophies.length).padStart(2, "0")} ENTRÉE{team.trophies.length > 1 ? "S" : ""}
          </span>
        </header>
        {team.trophies.length === 0 ? (
          <div className="nafe-empty nafe-empty--panel">
            <span className="nafe-mono" style={{ color: accent }}>AUCUN TROPHÉE</span>
            <p className="nafe-empty__text">
              Ajoute un résultat historique depuis l'espace admin.
            </p>
            <a className="nafe-btn nafe-btn--ghost" href="#/admin/trophies">→ Admin palmarès</a>
          </div>
        ) : (
          <div className="nafe-trophies">
            {team.trophies
              .slice()
              .sort((a, b) => (b.year || 0) - (a.year || 0))
              .map((t) => (
                <div key={t.id} className="nafe-trophy nafe-clip-card">
                  <span className="nafe-mono nafe-trophy__year" style={{ color: accent }}>
                    {t.year}
                  </span>
                  <span className="nafe-display nafe-trophy__event">{t.event}</span>
                  <span className="nafe-mono nafe-trophy__place">{t.place}</span>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

window.TeamPage = TeamPage;
