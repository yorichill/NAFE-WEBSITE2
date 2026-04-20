// NAFE — Hub (home) page

function HubPage({ accent, cardVariant, onNav }) {
  const roster = window.TEAMS.valorant.roster;
  const next = window.TEAMS.valorant.next;
  return (
    <div className="nafe-page">
      {/* HERO — brutalist typographic wall */}
      <section className="nafe-hero">
        <div className="nafe-hero__meta">
          <span className="nafe-eyebrow" style={{ color: accent }}>
            Saison 2026 · Valorant Champions Tour
          </span>
          <span className="nafe-eyebrow nafe-hero__ts">
            <span className="nafe-pulse" /> EN DIRECT · JOUR 134
          </span>
        </div>

        <h1 className="nafe-hero__title nafe-display">
          NAFE
          <br />
          <span style={{ color: accent }}>TEAM<span className="nafe-hero__dot">.</span></span>
        </h1>

        <div className="nafe-hero__grid">
          <p className="nafe-hero__lede">
            L'héritage compétitif rencontre la direction créative la plus
            affûtée du game. Nouvelle ère, même obsession&nbsp;: la victoire.
          </p>

          <div className="nafe-hero__matchCard" onClick={() => onNav("#/live")}>
            <div className="nafe-hero__matchHead">
              <span className="nafe-mono" style={{ color: accent }}>● LIVE</span>
              <span className="nafe-mono">VCT EMEA · MAP 2/3</span>
            </div>
            <div className="nafe-hero__matchBody">
              <div className="nafe-hero__side">
                <span className="nafe-mono">NAFE</span>
                <span className="nafe-display nafe-hero__matchScore" style={{ color: accent }}>11</span>
              </div>
              <span className="nafe-mono nafe-hero__matchSep">—</span>
              <div className="nafe-hero__side">
                <span className="nafe-mono">{next.opp}</span>
                <span className="nafe-display nafe-hero__matchScore">9</span>
              </div>
            </div>
            <div className="nafe-hero__matchFoot">
              <span className="nafe-mono">{next.map}</span>
              <span className="nafe-mono">REGARDER →</span>
            </div>
          </div>
        </div>

        <div className="nafe-hero__cta">
          <button className="nafe-btn nafe-btn--accent nafe-clip-card" style={{ background: accent }}>
            Rejoindre le club
          </button>
          <button className="nafe-btn nafe-btn--ghost nafe-clip-card">
            Voir le planning
          </button>
          <div className="nafe-hero__stats">
            <div>
              <p className="nafe-mono nafe-hero__statL">SUIVEURS</p>
              <p className="nafe-display nafe-hero__statV">4.2M</p>
            </div>
            <div>
              <p className="nafe-mono nafe-hero__statL">TROPHÉES</p>
              <p className="nafe-display nafe-hero__statV">27</p>
            </div>
            <div>
              <p className="nafe-mono nafe-hero__statL">WIN RATE</p>
              <p className="nafe-display nafe-hero__statV" style={{ color: accent }}>71%</p>
            </div>
          </div>
        </div>

        {/* Decorative side label */}
        <div className="nafe-hero__rail">
          <span className="nafe-mono">N/T · 01</span>
          <span className="nafe-mono">·</span>
          <span className="nafe-mono">ISSUE #012</span>
          <span className="nafe-mono">·</span>
          <span className="nafe-mono">PARIS · EU</span>
        </div>
      </section>

      {/* ROSTER preview */}
      <section className="nafe-section">
        <header className="nafe-section__head">
          <div>
            <span className="nafe-eyebrow">Roster · Valorant</span>
            <h2 className="nafe-display nafe-section__title">
              Le Cinq de Départ
            </h2>
          </div>
          <a
            href="#/teams/valorant"
            className="nafe-section__link"
            onClick={(e) => { e.preventDefault(); onNav("#/teams/valorant"); }}
          >
            Voir l'effectif complet →
          </a>
        </header>

        <div className={`nafe-roster nafe-roster--${cardVariant}`}>
          {roster.map((p) => (
            <window.PlayerCard key={p.tag} p={p} accent={accent} variant={cardVariant} />
          ))}
        </div>
      </section>

      {/* Manifesto strip */}
      <section className="nafe-manifesto">
        <div className="nafe-manifesto__inner">
          <span className="nafe-eyebrow">Manifeste · 2026</span>
          <h2 className="nafe-display nafe-manifesto__title">
            Le skill, c'est la <span style={{ color: accent }}>constance</span>.<br/>
            Le style, c'est la <span style={{ color: accent }}>signature</span>.
          </h2>
          <div className="nafe-manifesto__columns">
            <div>
              <span className="nafe-mono nafe-manifesto__num" style={{ color: accent }}>01 ·</span>
              <h3 className="nafe-display nafe-manifesto__h3">Jouer fort</h3>
              <p>Une méthodologie d'entraînement importée du sport de haut niveau. Analyse vidéo, préparation mentale, S&C.</p>
            </div>
            <div>
              <span className="nafe-mono nafe-manifesto__num" style={{ color: accent }}>02 ·</span>
              <h3 className="nafe-display nafe-manifesto__h3">Créer plus fort</h3>
              <p>Un studio interne dédié au contenu long-format. Documentaires, podcasts, drops capsule co-signés.</p>
            </div>
            <div>
              <span className="nafe-mono nafe-manifesto__num" style={{ color: accent }}>03 ·</span>
              <h3 className="nafe-display nafe-manifesto__h3">Vivre ensemble</h3>
              <p>Un club de 200&#8239;000 membres actifs. Events physiques, loot tangible, hospitality en finale.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

window.HubPage = HubPage;
