// NAFE — Live match / watch page

const { useState: useLiveState, useEffect: useLiveEffect } = React;

function LivePage({ accent }) {
  const team = window.TEAMS.valorant;
  const [tick, setTick] = useLiveState(0);
  useLiveEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const viewers = 182430 + (tick * 7 % 90);
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
          <span className="nafe-mono nafe-live__event">VCT EMEA · Stage 2 · Groupes</span>
          <span className="nafe-live__spacer" />
          <span className="nafe-mono nafe-live__viewers">
            <span className="nafe-pulse" style={{ background: accent }} /> {viewers.toLocaleString("fr-FR")} spectateurs
          </span>
        </div>

        <div className="nafe-live__main">
          <div className="nafe-live__team nafe-live__team--home">
            <div className="nafe-live__logo" style={{ borderColor: accent, color: accent }}>
              NAFE
            </div>
            <div>
              <span className="nafe-mono nafe-live__teamMeta">EMEA · #1</span>
              <h2 className="nafe-display nafe-live__teamName">NAFE</h2>
              <span className="nafe-mono nafe-live__record">{team.record}</span>
            </div>
            <span className="nafe-display nafe-live__score" style={{ color: accent }}>11</span>
          </div>

          <div className="nafe-live__mid">
            <span className="nafe-mono nafe-live__map">MAP 2 / 3</span>
            <span className="nafe-display nafe-live__mapName">SUNSET</span>
            <span className="nafe-mono nafe-live__round">ROUND 21 · ATK</span>
            <div className="nafe-live__timer">
              <span className="nafe-mono">T+{timer}</span>
            </div>
          </div>

          <div className="nafe-live__team nafe-live__team--away">
            <span className="nafe-display nafe-live__score">9</span>
            <div>
              <span className="nafe-mono nafe-live__teamMeta">EMEA · #4</span>
              <h2 className="nafe-display nafe-live__teamName">{team.next.opp}</h2>
              <span className="nafe-mono nafe-live__record">10–7</span>
            </div>
            <div className="nafe-live__logo">KV</div>
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

      {/* Map track — round-by-round */}
      <section className="nafe-section">
        <header className="nafe-section__head">
          <div>
            <span className="nafe-eyebrow">Timeline</span>
            <h2 className="nafe-display nafe-section__title">Round par round · Sunset</h2>
          </div>
          <span className="nafe-mono nafe-section__count">21 / 24 ROUNDS</span>
        </header>
        <div className="nafe-rounds">
          {[...Array(24)].map((_, i) => {
            const played = i < 21;
            const wonByNafe = played && [0, 1, 3, 5, 6, 9, 11, 14, 15, 16, 19, 20].includes(i);
            const wonByKova = played && !wonByNafe;
            return (
              <div key={i} className={`nafe-round ${played ? "is-played" : ""}`}>
                <span className="nafe-mono nafe-round__n">{String(i + 1).padStart(2, "0")}</span>
                <div className="nafe-round__bar">
                  {wonByNafe && <span className="nafe-round__win nafe-round__win--home" style={{ background: accent }} />}
                  {wonByKova && <span className="nafe-round__win nafe-round__win--away" />}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Player stats — live */}
      <section className="nafe-section">
        <header className="nafe-section__head">
          <div>
            <span className="nafe-eyebrow">Performance</span>
            <h2 className="nafe-display nafe-section__title">Stats joueurs · Map 2</h2>
          </div>
          <span className="nafe-mono nafe-section__count">TEMPS RÉEL</span>
        </header>
        <div className="nafe-livestats">
          <div className="nafe-livestats__head nafe-mono">
            <span>#</span>
            <span>JOUEUR</span>
            <span>RÔLE</span>
            <span>K</span>
            <span>D</span>
            <span>A</span>
            <span>ACS</span>
            <span>ADR</span>
            <span>HS%</span>
            <span>PERF</span>
          </div>
          {team.roster.map((p, i) => {
            const k = 8 + (i * 3) % 7;
            const d = 5 + (i * 2) % 5;
            const a = 2 + (i * 3) % 6;
            const acs = p.acs;
            const adr = 110 + (i * 11) % 40;
            const hs = p.hs;
            const perf = Math.round(((k - d) * 10 + acs / 3) * 10) / 10;
            return (
              <div key={p.tag} className="nafe-livestats__row">
                <span className="nafe-mono">{String(p.jersey).padStart(2, "0")}</span>
                <span className="nafe-display nafe-livestats__name">{p.name}</span>
                <span className="nafe-mono nafe-livestats__role">{p.role}</span>
                <span className="nafe-mono">{k}</span>
                <span className="nafe-mono">{d}</span>
                <span className="nafe-mono">{a}</span>
                <span className="nafe-mono" style={{ color: accent }}>{acs}</span>
                <span className="nafe-mono">{adr}</span>
                <span className="nafe-mono">{hs}%</span>
                <div className="nafe-livestats__perf">
                  <div className="nafe-livestats__perfFill"
                    style={{
                      width: `${Math.min(100, Math.max(10, perf))}%`,
                      background: perf > 40 ? accent : "rgba(255,255,255,0.3)"
                    }}
                  />
                  <span className="nafe-mono nafe-livestats__perfVal">+{perf}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chat + upcoming */}
      <section className="nafe-section nafe-live__split">
        <div className="nafe-live__splitL nafe-clip-card">
          <header className="nafe-live__chatHead">
            <span className="nafe-eyebrow">Club chat</span>
            <span className="nafe-mono" style={{ color: accent }}>● 1.2k actifs</span>
          </header>
          <div className="nafe-chat">
            {CHAT.map((c, i) => (
              <div key={i} className="nafe-chat__msg">
                <span className="nafe-mono nafe-chat__user" style={c.tier === "L" ? { color: accent } : {}}>
                  [{c.tier}] {c.user}
                </span>
                <span className="nafe-chat__text">{c.msg}</span>
              </div>
            ))}
          </div>
          <div className="nafe-chat__input">
            <span className="nafe-mono">&gt;</span>
            <input placeholder="Message au chat · membres connectés uniquement" />
            <button className="nafe-mono">ENVOYER</button>
          </div>
        </div>

        <div className="nafe-live__splitR">
          <header className="nafe-live__upHead">
            <span className="nafe-eyebrow">À suivre</span>
          </header>
          <div className="nafe-upnext">
            {UPCOMING.map((u, i) => (
              <div key={i} className="nafe-up">
                <span className="nafe-mono nafe-up__when">{u.when}</span>
                <div>
                  <p className="nafe-display nafe-up__title">NAFE vs {u.opp}</p>
                  <p className="nafe-mono nafe-up__event">{u.event} · {u.game}</p>
                </div>
                <span className="nafe-mono nafe-up__arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const CHAT = [
  { user: "lyra_94", tier: "V", msg: "ce clutch de Derke fr fr 🔥 (let's go)" },
  { user: "NafeForLife", tier: "L", msg: "boaster call impeccable, on dit merci l'IGL" },
  { user: "mathéo_p", tier: "S", msg: "map control parfait ce round" },
  { user: "kizumi", tier: "R", msg: "prems match et je kiffe déjà la prod" },
  { user: "Alfa_fan", tier: "V", msg: "défense A site goated" },
  { user: "NafeForLife", tier: "L", msg: "eco round perdu mais ok, on money next" },
  { user: "tony.m", tier: "S", msg: "on closingue la map svp" },
];

const UPCOMING = [
  { when: "CE SOIR · 22:30", opp: "G2 ESPORTS", event: "LEC Stage 2", game: "LOL" },
  { when: "DEM. · 18:00", opp: "VIRTUS.ALT", event: "BLAST Open", game: "CS2" },
  { when: "SAM. · 15:00", opp: "TEAM HERETICS", event: "VCT EMEA", game: "VAL" },
  { when: "DIM. · 17:00", opp: "KARMINE CORP", event: "LEC Stage 2", game: "LOL" },
];

window.LivePage = LivePage;
