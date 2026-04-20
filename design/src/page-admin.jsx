// NAFE — Admin console (localStorage CRUD UI)
// Routes gérées : /admin, /admin/players, /admin/matches, /admin/news, /admin/scores, /admin/trophies

const { useState: useAdminState, useEffect: useAdminEffect } = React;

const ADMIN_TABS = [
  { k: "players",  label: "Joueurs",           icon: "👤" },
  { k: "matches",  label: "Matchs & calendrier", icon: "📅" },
  { k: "news",     label: "Actualités",        icon: "📰" },
  { k: "scores",   label: "Ticker scores",     icon: "📊" },
  { k: "trophies", label: "Palmarès",          icon: "🏆" },
];

// Route helper : renvoie la sous-page courante depuis le hash
function adminRoute() {
  const h = location.hash.replace(/^#/, "");
  const parts = h.split("/").filter(Boolean); // ["admin", "players"?]
  return parts[1] || "players";
}

function AdminPage({ accent }) {
  window.store.useVersion();
  const [tab, setTab] = useAdminState(adminRoute());

  useAdminEffect(() => {
    const onHash = () => setTab(adminRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const counts = {
    players: window.store.players.list().length,
    matches: window.store.matches.list().length,
    news: window.store.news.list().length,
    scores: window.store.scores.list().length,
    trophies: window.store.trophies.list().length,
  };

  return (
    <div className="nafe-page">
      <section className="nafe-team__hero">
        <span className="nafe-eyebrow" style={{ color: accent }}>
          Admin · Staff NAFE uniquement
        </span>
        <h1 className="nafe-display nafe-team__title">
          ADMIN<span style={{ color: accent }}>.</span>
        </h1>
        <p className="nafe-team__lede">
          Crée, modifie et supprime tout le contenu visible côté public. Les
          changements sont instantanés et persistés localement dans ce navigateur.
        </p>

        <div className="nafe-admin__toolbar">
          <button
            className="nafe-btn nafe-btn--ghost"
            onClick={() => {
              window.store.seedDemo();
            }}
          >
            Charger données de démo
          </button>
          <button
            className="nafe-btn nafe-btn--ghost"
            style={{ borderColor: "#E53E3E", color: "#E53E3E" }}
            onClick={() => {
              if (confirm("Effacer TOUT le contenu (joueurs, matchs, actus, scores, palmarès) ?")) {
                window.store.wipeAll();
              }
            }}
          >
            Tout effacer
          </button>
        </div>

        <div className="nafe-admin__tabs">
          {ADMIN_TABS.map((t) => {
            const active = tab === t.k;
            return (
              <a
                key={t.k}
                href={`#/admin/${t.k}`}
                className={`nafe-admin__tab ${active ? "is-active" : ""}`}
                style={active ? { borderColor: accent, background: `${accent}22` } : {}}
              >
                <span className="nafe-admin__tabIcon">{t.icon}</span>
                <span className="nafe-display nafe-admin__tabLabel">{t.label}</span>
                <span className="nafe-mono nafe-admin__tabCount" style={active ? { color: accent } : {}}>
                  {String(counts[t.k]).padStart(2, "0")}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="nafe-admin__panel">
        {tab === "players"  && <PlayersAdmin  accent={accent} />}
        {tab === "matches"  && <MatchesAdmin  accent={accent} />}
        {tab === "news"     && <NewsAdmin     accent={accent} />}
        {tab === "scores"   && <ScoresAdmin   accent={accent} />}
        {tab === "trophies" && <TrophiesAdmin accent={accent} />}
      </section>
    </div>
  );
}

// ============================================================
//  Field + form helpers
// ============================================================
function Field({ label, children, span = 1 }) {
  return (
    <label className="nafe-field" style={{ gridColumn: `span ${span}` }}>
      <span className="nafe-mono nafe-field__label">{label}</span>
      {children}
    </label>
  );
}

function FormShell({ title, children, onSubmit, onCancel, submitLabel = "Enregistrer", accent }) {
  return (
    <form
      className="nafe-admin__form nafe-clip-card"
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
    >
      <h3 className="nafe-display nafe-admin__formTitle">{title}</h3>
      <div className="nafe-admin__grid">{children}</div>
      <div className="nafe-admin__formActions">
        {onCancel && (
          <button type="button" className="nafe-btn nafe-btn--ghost" onClick={onCancel}>
            Annuler
          </button>
        )}
        <button type="submit" className="nafe-btn nafe-btn--accent" style={{ background: accent }}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function DataTable({ columns, rows, onEdit, onDelete, empty, accent }) {
  if (!rows.length) {
    return (
      <div className="nafe-admin__empty">
        <span className="nafe-mono" style={{ color: accent }}>VIDE</span>
        <p>{empty}</p>
      </div>
    );
  }
  return (
    <div className="nafe-admin__table">
      <div className="nafe-admin__tableHead">
        {columns.map((c) => (
          <span key={c.key} className="nafe-mono" style={{ flex: c.flex || 1 }}>{c.label}</span>
        ))}
        <span className="nafe-mono" style={{ flex: 0, minWidth: 140 }}>ACTIONS</span>
      </div>
      {rows.map((r) => (
        <div key={r.id} className="nafe-admin__tableRow">
          {columns.map((c) => (
            <span key={c.key} className="nafe-admin__tableCell" style={{ flex: c.flex || 1 }}>
              {typeof c.render === "function" ? c.render(r) : r[c.key]}
            </span>
          ))}
          <div className="nafe-admin__tableActions" style={{ flex: 0, minWidth: 140 }}>
            <button className="nafe-admin__iconBtn" onClick={() => onEdit(r)} title="Modifier">✎</button>
            <button
              className="nafe-admin__iconBtn nafe-admin__iconBtn--danger"
              onClick={() => { if (confirm("Supprimer cette entrée ?")) onDelete(r.id); }}
              title="Supprimer"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
//  Players
// ============================================================
const ROLES = ["IGL", "Duelist", "Sentinel", "Initiator", "Controller", "Flex", "Top", "Jungle", "Mid", "ADC", "Support", "AWP", "Rifler", "Anchor", "Entry"];

function PlayersAdmin({ accent }) {
  const list = window.store.players.list();
  const [editing, setEditing] = useAdminState(null);
  const [draft, setDraft] = useAdminState(emptyPlayer());

  function emptyPlayer() {
    return { team: "valorant", name: "", tag: "", role: "Duelist", jersey: 1, country: "FR", kd: 0, hs: 0, acs: 0, gear: { mouse: "", keyboard: "", headset: "" } };
  }

  function startEdit(p) {
    setEditing(p.id);
    setDraft({ ...emptyPlayer(), ...p, gear: { ...emptyPlayer().gear, ...(p.gear || {}) } });
  }

  function submit() {
    if (!draft.name.trim()) return alert("Le nom est requis");
    if (!draft.tag.trim()) return alert("Le pseudo est requis");
    const payload = { ...draft, jersey: +draft.jersey || 0, kd: +draft.kd || 0, hs: +draft.hs || 0, acs: +draft.acs || 0 };
    if (editing) {
      window.store.players.update(editing, payload);
    } else {
      window.store.players.add(payload);
    }
    setEditing(null);
    setDraft(emptyPlayer());
  }

  return (
    <div className="nafe-admin__section">
      <FormShell
        title={editing ? "Modifier le joueur" : "Nouveau joueur"}
        onSubmit={submit}
        onCancel={editing ? () => { setEditing(null); setDraft(emptyPlayer()); } : null}
        submitLabel={editing ? "Mettre à jour" : "Ajouter le joueur"}
        accent={accent}
      >
        <Field label="Équipe">
          <select value={draft.team} onChange={(e) => setDraft({ ...draft, team: e.target.value })}>
            {Object.entries(window.TEAMS_META).map(([k, t]) => (
              <option key={k} value={k}>{t.game}</option>
            ))}
          </select>
        </Field>
        <Field label="Numéro">
          <input type="number" min={0} max={99} value={draft.jersey}
            onChange={(e) => setDraft({ ...draft, jersey: e.target.value })} />
        </Field>
        <Field label="Nom de scène">
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Ex: Derke" />
        </Field>
        <Field label="Pseudo (@tag)">
          <input value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} placeholder="Ex: derke" />
        </Field>
        <Field label="Rôle">
          <select value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })}>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Pays (ISO 2 lettres)">
          <input maxLength={3} value={draft.country} onChange={(e) => setDraft({ ...draft, country: e.target.value.toUpperCase() })} />
        </Field>
        <Field label="K/D">
          <input type="number" step="0.01" value={draft.kd} onChange={(e) => setDraft({ ...draft, kd: e.target.value })} />
        </Field>
        <Field label="HS %">
          <input type="number" min={0} max={100} value={draft.hs} onChange={(e) => setDraft({ ...draft, hs: e.target.value })} />
        </Field>
        <Field label="ACS">
          <input type="number" value={draft.acs} onChange={(e) => setDraft({ ...draft, acs: e.target.value })} />
        </Field>
        <Field label="Souris">
          <input value={draft.gear.mouse} onChange={(e) => setDraft({ ...draft, gear: { ...draft.gear, mouse: e.target.value } })} />
        </Field>
        <Field label="Clavier">
          <input value={draft.gear.keyboard} onChange={(e) => setDraft({ ...draft, gear: { ...draft.gear, keyboard: e.target.value } })} />
        </Field>
        <Field label="Casque">
          <input value={draft.gear.headset} onChange={(e) => setDraft({ ...draft, gear: { ...draft.gear, headset: e.target.value } })} />
        </Field>
      </FormShell>

      <DataTable
        accent={accent}
        empty="Aucun joueur enregistré. Remplis le formulaire ci-dessus pour en ajouter un."
        columns={[
          { key: "jersey", label: "N°", flex: 0.3, render: (r) => String(r.jersey).padStart(2, "0") },
          { key: "name", label: "NOM", flex: 1 },
          { key: "tag", label: "PSEUDO", flex: 1, render: (r) => `@${r.tag}` },
          { key: "team", label: "ÉQUIPE", flex: 1, render: (r) => window.TEAMS_META[r.team]?.game || r.team },
          { key: "role", label: "RÔLE", flex: 0.7 },
          { key: "country", label: "PAYS", flex: 0.4 },
          { key: "kd", label: "K/D", flex: 0.4 },
        ]}
        rows={list}
        onEdit={startEdit}
        onDelete={(id) => window.store.players.remove(id)}
      />
    </div>
  );
}

// ============================================================
//  Matches
// ============================================================
const GAMES = ["VAL", "LOL", "CS2", "DROP", "EVENT"];
const STATUSES = [
  { k: "soon",  label: "À venir" },
  { k: "live",  label: "En direct" },
  { k: "won",   label: "Victoire" },
  { k: "lost",  label: "Défaite" },
  { k: "drop",  label: "Drop" },
  { k: "event", label: "Événement" },
];

function MatchesAdmin({ accent }) {
  const list = window.store.matches.list()
    .slice()
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));
  const [editing, setEditing] = useAdminState(null);
  const [draft, setDraft] = useAdminState(emptyMatch());

  function emptyMatch() {
    return { date: new Date().toISOString().slice(0, 10), time: "20:00", game: "VAL", event: "", opp: "", result: "À venir", status: "soon", loc: "" };
  }

  function startEdit(m) {
    setEditing(m.id);
    setDraft({ ...emptyMatch(), ...m });
  }

  function submit() {
    if (!draft.date) return alert("Date requise");
    if (!draft.event.trim()) return alert("Compétition / événement requis");
    if (editing) {
      window.store.matches.update(editing, draft);
    } else {
      window.store.matches.add(draft);
    }
    setEditing(null);
    setDraft(emptyMatch());
  }

  return (
    <div className="nafe-admin__section">
      <FormShell
        title={editing ? "Modifier le match" : "Nouveau match / événement"}
        onSubmit={submit}
        onCancel={editing ? () => { setEditing(null); setDraft(emptyMatch()); } : null}
        submitLabel={editing ? "Mettre à jour" : "Ajouter au calendrier"}
        accent={accent}
      >
        <Field label="Date">
          <input type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
        </Field>
        <Field label="Heure">
          <input type="time" value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} />
        </Field>
        <Field label="Jeu / type">
          <select value={draft.game} onChange={(e) => setDraft({ ...draft, game: e.target.value })}>
            {GAMES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Statut">
          <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            {STATUSES.map((s) => <option key={s.k} value={s.k}>{s.label}</option>)}
          </select>
        </Field>
        <Field label="Compétition / événement" span={2}>
          <input value={draft.event} onChange={(e) => setDraft({ ...draft, event: e.target.value })} placeholder="Ex: VCT EMEA Stage 2" />
        </Field>
        <Field label="Adversaire">
          <input value={draft.opp} onChange={(e) => setDraft({ ...draft, opp: e.target.value })} placeholder="Laisser vide pour un drop/event" />
        </Field>
        <Field label="Lieu">
          <input value={draft.loc} onChange={(e) => setDraft({ ...draft, loc: e.target.value })} placeholder="Ex: Berlin / En ligne" />
        </Field>
        <Field label="Résultat" span={2}>
          <input value={draft.result} onChange={(e) => setDraft({ ...draft, result: e.target.value })} placeholder='Ex: "13-9 / 13-7" ou "À venir"' />
        </Field>
      </FormShell>

      <DataTable
        accent={accent}
        empty="Aucun match programmé."
        columns={[
          { key: "date", label: "DATE", flex: 0.7 },
          { key: "time", label: "HEURE", flex: 0.4 },
          { key: "game", label: "JEU", flex: 0.4 },
          { key: "event", label: "COMPÉTITION", flex: 1.2 },
          { key: "opp", label: "ADVERSAIRE", flex: 1, render: (r) => r.opp || "—" },
          { key: "status", label: "STATUT", flex: 0.6, render: (r) => STATUSES.find((s) => s.k === r.status)?.label || r.status },
          { key: "result", label: "RÉSULTAT", flex: 0.8 },
        ]}
        rows={list}
        onEdit={startEdit}
        onDelete={(id) => window.store.matches.remove(id)}
      />
    </div>
  );
}

// ============================================================
//  News
// ============================================================
const NEWS_CATS = ["Compétition", "Annonce", "Transfert", "Analyse", "Structure", "Partenariat", "Académie"];

function NewsAdmin({ accent }) {
  const list = window.store.news.list()
    .slice()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  const [editing, setEditing] = useAdminState(null);
  const [draft, setDraft] = useAdminState(emptyNews());

  function emptyNews() {
    const d = new Date();
    const fr = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase().replace(/\./g, "");
    return { date: fr, cat: "Annonce", game: "CLUB", title: "", lede: "", author: "Rédaction NAFE", readTime: "3 min", featured: false };
  }

  function startEdit(n) {
    setEditing(n.id);
    setDraft({ ...emptyNews(), ...n });
  }

  function submit() {
    if (!draft.title.trim()) return alert("Titre requis");
    if (!draft.lede.trim()) return alert("Chapeau / lede requis");
    if (editing) {
      window.store.news.update(editing, draft);
    } else {
      window.store.news.add(draft);
    }
    setEditing(null);
    setDraft(emptyNews());
  }

  return (
    <div className="nafe-admin__section">
      <FormShell
        title={editing ? "Modifier l'article" : "Poster une nouvelle actu"}
        onSubmit={submit}
        onCancel={editing ? () => { setEditing(null); setDraft(emptyNews()); } : null}
        submitLabel={editing ? "Mettre à jour" : "Publier"}
        accent={accent}
      >
        <Field label="Date (libellé affiché)">
          <input value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
        </Field>
        <Field label="Catégorie">
          <select value={draft.cat} onChange={(e) => setDraft({ ...draft, cat: e.target.value })}>
            {NEWS_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Jeu / rubrique">
          <select value={draft.game} onChange={(e) => setDraft({ ...draft, game: e.target.value })}>
            {["CLUB", "VALORANT", "LOL", "CS2", "AUTRE"].map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Temps de lecture">
          <input value={draft.readTime} onChange={(e) => setDraft({ ...draft, readTime: e.target.value })} placeholder="Ex: 5 min" />
        </Field>
        <Field label="Titre" span={2}>
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        </Field>
        <Field label="Chapeau / résumé" span={2}>
          <textarea rows={3} value={draft.lede} onChange={(e) => setDraft({ ...draft, lede: e.target.value })} />
        </Field>
        <Field label="Auteur">
          <input value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} />
        </Field>
        <Field label="À la une">
          <label className="nafe-field__checkbox">
            <input type="checkbox" checked={!!draft.featured}
              onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} />
            <span>Épingler comme article à la une</span>
          </label>
        </Field>
      </FormShell>

      <DataTable
        accent={accent}
        empty="Aucun article publié. Remplis le formulaire ci-dessus pour poster ta première actu."
        columns={[
          { key: "date", label: "DATE", flex: 0.7 },
          { key: "cat", label: "CAT", flex: 0.7 },
          { key: "title", label: "TITRE", flex: 2 },
          { key: "author", label: "AUTEUR", flex: 0.8 },
          { key: "featured", label: "UNE", flex: 0.3, render: (r) => r.featured ? "★" : "" },
        ]}
        rows={list}
        onEdit={startEdit}
        onDelete={(id) => window.store.news.remove(id)}
      />
    </div>
  );
}

// ============================================================
//  Scores ticker
// ============================================================
function ScoresAdmin({ accent }) {
  const list = window.store.scores.list();
  const [editing, setEditing] = useAdminState(null);
  const [draft, setDraft] = useAdminState(emptyScore());

  function emptyScore() {
    return { game: "VALORANT", match: "", score: "", live: false };
  }

  function startEdit(s) { setEditing(s.id); setDraft({ ...emptyScore(), ...s }); }
  function submit() {
    if (!draft.match.trim()) return alert("Match requis");
    if (editing) window.store.scores.update(editing, draft);
    else window.store.scores.add(draft);
    setEditing(null);
    setDraft(emptyScore());
  }

  return (
    <div className="nafe-admin__section">
      <FormShell
        title={editing ? "Modifier l'entrée ticker" : "Nouvelle entrée ticker"}
        onSubmit={submit}
        onCancel={editing ? () => { setEditing(null); setDraft(emptyScore()); } : null}
        submitLabel={editing ? "Mettre à jour" : "Ajouter au ticker"}
        accent={accent}
      >
        <Field label="Jeu / rubrique">
          <input value={draft.game} onChange={(e) => setDraft({ ...draft, game: e.target.value })} placeholder="Ex: VALORANT" />
        </Field>
        <Field label="Match">
          <input value={draft.match} onChange={(e) => setDraft({ ...draft, match: e.target.value })} placeholder="Ex: NAFE vs KOVA" />
        </Field>
        <Field label="Score / libellé">
          <input value={draft.score} onChange={(e) => setDraft({ ...draft, score: e.target.value })} placeholder="Ex: 13-11 ou À VENIR" />
        </Field>
        <Field label="En direct">
          <label className="nafe-field__checkbox">
            <input type="checkbox" checked={!!draft.live}
              onChange={(e) => setDraft({ ...draft, live: e.target.checked })} />
            <span>Afficher un point rouge clignotant</span>
          </label>
        </Field>
      </FormShell>

      <DataTable
        accent={accent}
        empty="Aucune entrée dans le ticker. Le bandeau du haut de page reste masqué tant qu'il est vide."
        columns={[
          { key: "game", label: "JEU", flex: 0.8 },
          { key: "match", label: "MATCH", flex: 1.5 },
          { key: "score", label: "SCORE", flex: 0.8 },
          { key: "live", label: "LIVE", flex: 0.4, render: (r) => r.live ? "●" : "" },
        ]}
        rows={list}
        onEdit={startEdit}
        onDelete={(id) => window.store.scores.remove(id)}
      />
    </div>
  );
}

// ============================================================
//  Trophies
// ============================================================
function TrophiesAdmin({ accent }) {
  const list = window.store.trophies.list()
    .slice()
    .sort((a, b) => (b.year || 0) - (a.year || 0));
  const [editing, setEditing] = useAdminState(null);
  const [draft, setDraft] = useAdminState(emptyTrophy());

  function emptyTrophy() {
    return { team: "valorant", year: new Date().getFullYear(), event: "", place: "Champion" };
  }

  function startEdit(t) { setEditing(t.id); setDraft({ ...emptyTrophy(), ...t }); }
  function submit() {
    if (!draft.event.trim()) return alert("Événement requis");
    const payload = { ...draft, year: +draft.year || new Date().getFullYear() };
    if (editing) window.store.trophies.update(editing, payload);
    else window.store.trophies.add(payload);
    setEditing(null);
    setDraft(emptyTrophy());
  }

  return (
    <div className="nafe-admin__section">
      <FormShell
        title={editing ? "Modifier le trophée" : "Ajouter au palmarès"}
        onSubmit={submit}
        onCancel={editing ? () => { setEditing(null); setDraft(emptyTrophy()); } : null}
        submitLabel={editing ? "Mettre à jour" : "Ajouter"}
        accent={accent}
      >
        <Field label="Équipe">
          <select value={draft.team} onChange={(e) => setDraft({ ...draft, team: e.target.value })}>
            {Object.entries(window.TEAMS_META).map(([k, t]) => (
              <option key={k} value={k}>{t.game}</option>
            ))}
          </select>
        </Field>
        <Field label="Année">
          <input type="number" value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })} />
        </Field>
        <Field label="Événement" span={2}>
          <input value={draft.event} onChange={(e) => setDraft({ ...draft, event: e.target.value })} placeholder="Ex: VCT EMEA Stage 1" />
        </Field>
        <Field label="Placement">
          <input value={draft.place} onChange={(e) => setDraft({ ...draft, place: e.target.value })} placeholder="Ex: Champion / Finaliste / Top 4" />
        </Field>
      </FormShell>

      <DataTable
        accent={accent}
        empty="Aucun trophée enregistré."
        columns={[
          { key: "year", label: "ANNÉE", flex: 0.5 },
          { key: "team", label: "ÉQUIPE", flex: 0.8, render: (r) => window.TEAMS_META[r.team]?.game || r.team },
          { key: "event", label: "ÉVÉNEMENT", flex: 1.8 },
          { key: "place", label: "PLACEMENT", flex: 0.8 },
        ]}
        rows={list}
        onEdit={startEdit}
        onDelete={(id) => window.store.trophies.remove(id)}
      />
    </div>
  );
}

window.AdminPage = AdminPage;
