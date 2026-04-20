// NAFE — News / Actualités page

const { useState: useNewsState } = React;

const NEWS = [
  {
    id: "lockin-2026",
    date: "14 AVR 2026",
    cat: "Compétition",
    game: "VALORANT",
    title: "NAFE s'impose à VCT EMEA Stage 1 après un 5-game épique",
    lede: "Au terme d'un match fleuve face à Team Heretics, le roster emmené par Boaster décroche un troisième trophée consécutif sur la scène européenne.",
    author: "Rédaction NAFE",
    readTime: "4 min",
    featured: true,
  },
  {
    id: "jersey-drop",
    date: "10 AVR 2026",
    cat: "Annonce",
    game: "CLUB",
    title: "Jersey Saison 2026 — drop le 24 avril à midi",
    lede: "Édition limitée 500 exemplaires, numérotés. Les paliers Veteran+ bénéficient d'une priorité d'accès de 48h.",
    author: "NAFE Studio",
    readTime: "2 min",
  },
  {
    id: "signature-fear",
    date: "06 AVR 2026",
    cat: "Transfert",
    game: "CS2",
    title: "fear prolonge jusqu'en 2028 — nouveau rôle d'IGL",
    lede: "Le rifler danois signe un contrat historique pour la structure et prend officiellement le call du roster CS2 après le départ de zonic.",
    author: "Lou Benet",
    readTime: "6 min",
  },
  {
    id: "studio-paris",
    date: "02 AVR 2026",
    cat: "Structure",
    game: "CLUB",
    title: "Ouverture du NAFE Studio · 2 200m² porte de la Villette",
    lede: "Gaming house, salle de prod, scène de diffusion et espace club pour les membres. Visite en avant-première pour les paliers Legend.",
    author: "Rédaction NAFE",
    readTime: "5 min",
  },
  {
    id: "msi-recap",
    date: "28 MAR 2026",
    cat: "Analyse",
    game: "LOL",
    title: "MSI Séoul · Humanoid élu MVP malgré la défaite en demi",
    lede: "Retour sur la run de NAFE LoL au tournoi international, avec les données d'analyse interne et les axes de travail pour le Summer Split.",
    author: "Coach Dylan \"drakos\" P.",
    readTime: "8 min",
  },
  {
    id: "partenaire",
    date: "24 MAR 2026",
    cat: "Partenariat",
    game: "CLUB",
    title: "Orange devient partenaire officiel de NAFE TEAM",
    lede: "L'opérateur accompagne la structure sur 3 saisons, avec un focus sur l'infrastructure fibre des bootcamps et la diffusion live premium.",
    author: "NAFE Corp",
    readTime: "3 min",
  },
  {
    id: "academy",
    date: "18 MAR 2026",
    cat: "Académie",
    game: "VALORANT",
    title: "Lancement de NAFE Academy — 8 places pour la saison 2026-27",
    lede: "Un programme de formation de 12 mois, ouvert aux 16-21 ans, avec bourse mensuelle, coaching quotidien et préparation mentale.",
    author: "Rédaction NAFE",
    readTime: "5 min",
  },
];

const CATS = ["Tout", "Compétition", "Annonce", "Transfert", "Analyse", "Structure", "Partenariat", "Académie"];

function NewsPage({ accent }) {
  const [cat, setCat] = useNewsState("Tout");
  const filtered = cat === "Tout" ? NEWS : NEWS.filter(n => n.cat === cat);
  const featured = filtered.find(n => n.featured) || filtered[0];
  const rest = filtered.filter(n => n.id !== featured?.id);

  return (
    <div className="nafe-page">
      <section className="nafe-news__hero">
        <span className="nafe-eyebrow" style={{ color: accent }}>
          Actualité · Semaine 15
        </span>
        <h1 className="nafe-display nafe-team__title">ACTU<span style={{ color: accent }}>.</span></h1>
        <p className="nafe-team__lede">
          Tout ce qui fait bouger NAFE TEAM — matchs, transferts, annonces structure
          et drops. Curation par la rédaction interne.
        </p>
      </section>

      {/* Category filter */}
      <section className="nafe-news__filter">
        {CATS.map(c => (
          <button
            key={c}
            className={`nafe-news__chip ${cat === c ? "is-active" : ""}`}
            style={cat === c ? { background: accent, color: "#fff", borderColor: accent } : {}}
            onClick={() => setCat(c)}
          >
            <span className="nafe-mono">{c.toUpperCase()}</span>
            {c !== "Tout" && (
              <span className="nafe-news__chipN nafe-mono">
                {NEWS.filter(n => n.cat === c).length}
              </span>
            )}
          </button>
        ))}
      </section>

      {/* Featured article */}
      {featured && (
        <section className="nafe-news__featured nafe-clip-card">
          <div className="nafe-news__featImg" style={{ borderColor: accent }}>
            <FeaturedPlaceholder accent={accent} seed={featured.id} />
            <span className="nafe-news__featTag" style={{ background: accent }}>À LA UNE</span>
          </div>
          <div className="nafe-news__featBody">
            <div className="nafe-news__meta">
              <span className="nafe-mono" style={{ color: accent }}>{featured.cat.toUpperCase()}</span>
              <span className="nafe-mono">· {featured.game}</span>
              <span className="nafe-mono">· {featured.date}</span>
            </div>
            <h2 className="nafe-display nafe-news__featTitle">{featured.title}</h2>
            <p className="nafe-news__featLede">{featured.lede}</p>
            <div className="nafe-news__featFoot">
              <span className="nafe-mono">PAR {featured.author.toUpperCase()}</span>
              <span className="nafe-mono">{featured.readTime.toUpperCase()}</span>
              <span className="nafe-news__featRead" style={{ color: accent }}>LIRE →</span>
            </div>
          </div>
        </section>
      )}

      {/* Grid of articles */}
      <section className="nafe-section" style={{ marginTop: 60 }}>
        <header className="nafe-section__head">
          <div>
            <span className="nafe-eyebrow">{cat === "Tout" ? "Toutes les dépêches" : cat}</span>
            <h2 className="nafe-display nafe-section__title">Archive</h2>
          </div>
          <span className="nafe-mono nafe-section__count">
            {String(rest.length).padStart(2, "0")} ARTICLE{rest.length > 1 ? "S" : ""}
          </span>
        </header>
        <div className="nafe-news__grid">
          {rest.map((n, i) => (
            <article key={n.id} className="nafe-news__card">
              <div className="nafe-news__cardImg">
                <ArticlePlaceholder accent={accent} seed={n.id} />
              </div>
              <div className="nafe-news__cardBody">
                <div className="nafe-news__meta">
                  <span className="nafe-mono" style={{ color: accent }}>{n.cat.toUpperCase()}</span>
                  <span className="nafe-mono">· {n.date}</span>
                </div>
                <h3 className="nafe-display nafe-news__cardTitle">{n.title}</h3>
                <p className="nafe-news__cardLede">{n.lede}</p>
                <div className="nafe-news__cardFoot">
                  <span className="nafe-mono">{n.game} · {n.readTime}</span>
                  <span className="nafe-mono" style={{ color: accent }}>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="nafe-news__newsletter nafe-clip-card">
        <div>
          <span className="nafe-eyebrow" style={{ color: accent }}>Briefing hebdo</span>
          <h3 className="nafe-display nafe-news__nlTitle">
            Chaque lundi, 7 minutes de lecture.
          </h3>
          <p className="nafe-news__nlLede">
            Les résultats, les rumeurs, les drops à venir — directement dans ta boîte.
          </p>
        </div>
        <div className="nafe-news__nlForm">
          <input placeholder="ton@email.fr" />
          <button className="nafe-btn nafe-btn--accent" style={{ background: accent }}>
            S'abonner
          </button>
        </div>
      </section>
    </div>
  );
}

function FeaturedPlaceholder({ accent, seed }) {
  const n = seed.charCodeAt(0) % 3;
  return (
    <svg viewBox="0 0 600 340" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`fs-${seed}`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(-28)">
          <rect width="8" height="8" fill="#0B1228" />
          <line x1="0" y1="0" x2="0" y2="8" stroke={accent} strokeOpacity="0.25" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="600" height="340" fill={`url(#fs-${seed})`} />
      <rect x="40" y="260" width="200" height="40" fill={accent} opacity="0.9" />
      <text x="52" y="286" fontFamily="JetBrains Mono, monospace" fontSize="14" fill="#fff" letterSpacing="3">
        [ PLACEHOLDER ]
      </text>
      <text x="40" y="60" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={accent} letterSpacing="4">
        IMAGE · ÉDITORIAL
      </text>
      <g opacity="0.6">
        {[0,1,2,3,4].map(i => (
          <line key={i} x1={40 + i*18} y1="80" x2={40 + i*18} y2="240" stroke={accent} strokeOpacity="0.3" strokeWidth="1" />
        ))}
      </g>
    </svg>
  );
}

function ArticlePlaceholder({ accent, seed }) {
  return (
    <svg viewBox="0 0 300 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`ap-${seed}`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(35)">
          <rect width="6" height="6" fill="#0B1228" />
          <line x1="0" y1="0" x2="0" y2="6" stroke={accent} strokeOpacity="0.3" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="300" height="180" fill={`url(#ap-${seed})`} />
      <rect x="16" y="140" width="120" height="22" fill={accent} opacity="0.85" />
      <text x="22" y="156" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#fff" letterSpacing="2">
        [IMAGE·{seed.slice(0,5).toUpperCase()}]
      </text>
    </svg>
  );
}

window.NewsPage = NewsPage;
