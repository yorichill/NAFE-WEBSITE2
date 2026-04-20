import { ProgressRing } from "@/components/ProgressRing";

const MISSIONS = [
  { title: "Regarde 3 matchs live", xp: 150, done: true },
  { title: "Vote ton MVP de la semaine", xp: 80, done: true },
  { title: "Invite un ami au club", xp: 300, done: false },
  { title: "Achète un jersey officiel", xp: 500, done: false },
];

const REWARDS = [
  { tier: "Rookie", need: 0, perk: "Badge digital + ticker perso" },
  { tier: "Starter", need: 1000, perk: "Meet & greet virtuel trimestriel" },
  { tier: "Veteran", need: 5000, perk: "Drop exclusif jersey numéroté" },
  { tier: "Legend", need: 15000, perk: "Invitation finale offline + hospitalité" },
];

export default function DashboardPage() {
  const xp = 1230;
  const currentTier = REWARDS.filter((r) => xp >= r.need).pop()!;
  const nextTier = REWARDS.find((r) => r.need > xp);
  const progress = nextTier
    ? ((xp - currentTier.need) / (nextTier.need - currentTier.need)) * 100
    : 100;

  return (
    <div className="px-8 md:px-16 pb-32">
      <section className="pt-12 pb-12 border-b border-white/10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-nafe-blue mb-4">
          Club · Dashboard membre
        </p>
        <h1 className="font-display font-black tracking-tighter text-6xl md:text-[6rem] leading-[0.85]">
          Salut, <span className="text-nafe-blue">Fan #0427</span>
        </h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
        <div className="bg-nafe-surface/60 border border-white/5 p-8 nafe-clip-card flex items-center gap-8">
          <ProgressRing value={progress} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel-grey">
              Rang actuel
            </p>
            <p className="font-display text-3xl font-black mt-1">
              {currentTier.tier}
            </p>
            <p className="font-mono text-2xl text-nafe-blue mt-2">
              {xp.toLocaleString()} XP
            </p>
            {nextTier && (
              <p className="text-xs text-steel-grey mt-2">
                {(nextTier.need - xp).toLocaleString()} XP → {nextTier.tier}
              </p>
            )}
          </div>
        </div>

        <div className="bg-nafe-surface/60 border border-white/5 p-8 nafe-clip-card">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel-grey">
            Streak
          </p>
          <p className="font-display text-6xl font-black mt-3 text-nafe-blue">
            12<span className="text-white text-3xl">j</span>
          </p>
          <p className="text-sm text-steel-grey mt-3">
            Connexion quotidienne — continue pour un bonus x2 dès le jour 14.
          </p>
        </div>

        <div className="bg-nafe-surface/60 border border-white/5 p-8 nafe-clip-card">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel-grey">
            Prochain drop
          </p>
          <p className="font-display text-3xl font-black mt-3">
            Jersey 2026
          </p>
          <p className="font-mono text-xs text-nafe-blue mt-3 animate-pulse">
            ● J-04 · 12:00 CET
          </p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display font-black text-4xl tracking-tighter mb-8">
          Missions de la semaine
        </h2>
        <div className="space-y-3">
          {MISSIONS.map((m, i) => (
            <div
              key={i}
              className={`flex items-center gap-5 p-5 border nafe-clip-card transition-colors ${
                m.done
                  ? "bg-nafe-blue/10 border-nafe-blue/40"
                  : "bg-nafe-surface/60 border-white/5 hover:border-white/20"
              }`}
            >
              <div
                className={`h-6 w-6 border-2 flex items-center justify-center ${
                  m.done
                    ? "bg-nafe-blue border-nafe-blue text-white"
                    : "border-white/30"
                }`}
              >
                {m.done && <span className="text-xs">✓</span>}
              </div>
              <span
                className={`flex-1 ${
                  m.done ? "text-steel-grey line-through" : "text-white"
                }`}
              >
                {m.title}
              </span>
              <span className="font-mono text-sm text-nafe-blue font-bold">
                +{m.xp} XP
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display font-black text-4xl tracking-tighter mb-8">
          Paliers de fidélité
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {REWARDS.map((r) => {
            const unlocked = xp >= r.need;
            return (
              <div
                key={r.tier}
                className={`p-6 border nafe-clip-card transition-all ${
                  unlocked
                    ? "bg-nafe-blue/10 border-nafe-blue/40 shadow-nafe-glow"
                    : "bg-nafe-surface/40 border-white/5 opacity-60"
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel-grey">
                  {r.need.toLocaleString()} XP
                </p>
                <p className="font-display font-black text-2xl mt-2">
                  {r.tier}
                </p>
                <p className="text-sm text-white/70 mt-3">{r.perk}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
