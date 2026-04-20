// NAFE — Team page with Valorant / LoL / CS2 tab switch

const { useState: useTeamState } = React;

function TeamPage({ accent, cardVariant, initialGame = "valorant" }) {
  const [game, setGame] = useTeamState(initialGame);
  const team = window.TEAMS[game];

  return (
    <div className="nafe-page">
      <section className="nafe-team__hero">
        <span className="nafe-eyebrow" style={{ color: accent }}>
          {team.region} · Roster officiel
        </span>
        <h1 className="nafe-display nafe-team__title">{team.game}</h1>
        <p className="nafe-team__lede">
          L'effectif complet de {team.title} — statistiques, palmarès et
          équipement signature. Bilan de saison : <strong>{team.record}</strong>.
        </p>

        {/* Tab switch */}
        <div className="nafe-tabs" role="tablist">
          {Object.entries(window.TEAMS).map(([k, t]) => (
            <button
              key={k}
              role="tab"
              className={`nafe-tab ${game === k ? "is-active" : ""}`}
              style={game === k ? { "--accent": accent, borderColor: accent, color: "#fff" } : {}}
              onClick={() => setGame(k)}
            >
              <span className="nafe-mono nafe-tab__num">
                0{Object.keys(window.TEAMS).indexOf(k) + 1}
              </span>
              <span className="nafe-display nafe-tab__label">{t.game}</span>
              <span className="nafe-mono nafe-tab__meta">{t.region} · {t.record}</span>
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
            {String(team.roster.length).padStart(2, "0")} JOUEURS
          </span>
        </header>
        <div className={`nafe-roster nafe-roster--${cardVariant}`}>
          {team.roster.map((p) => (
            <window.PlayerCard key={p.tag} p={p} accent={accent} variant={cardVariant} />
          ))}
        </div>
      </section>
    </div>
  );
}

window.TeamPage = TeamPage;
