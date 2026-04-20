import { PlayerCard } from "@/components/PlayerCard";

const ROSTER = [
  { name: "Boaster", tag: "boaster", role: "IGL", jersey: 1, kd: 1.08 },
  { name: "Derke", tag: "derke", role: "Duelist", jersey: 7, kd: 1.34 },
  { name: "Alfajer", tag: "alfajer", role: "Sentinel", jersey: 11, kd: 1.21 },
  { name: "Chronicle", tag: "chronicle", role: "Flex", jersey: 23, kd: 1.18 },
  { name: "Leo", tag: "leo", role: "Initiator", jersey: 42, kd: 1.26 },
];

export default function HomePage() {
  return (
    <div className="px-8 md:px-16 pb-32">
      <section className="relative pt-20 pb-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-nafe-blue mb-6">
          Season 2026 · Valorant Champions Tour
        </p>
        <h1 className="font-display font-black tracking-tighter text-7xl md:text-[10rem] leading-[0.85]">
          FNATIC
          <br />
          <span className="text-nafe-blue">× NAFE</span>
        </h1>
        <p className="mt-8 max-w-xl text-steel-grey text-lg">
          L'héritage compétitif rencontre la direction créative la plus affûtée
          du game. Nouvelle ère, même obsession : la victoire.
        </p>
        <div className="mt-10 flex gap-4">
          <button className="nafe-clip-card bg-nafe-blue text-white font-display uppercase tracking-widest px-8 py-4 hover:shadow-nafe-glow-lg transition-shadow">
            Rejoindre le club
          </button>
          <button className="nafe-clip-card border border-white/20 text-white font-display uppercase tracking-widest px-8 py-4 hover:bg-white/5 transition-colors">
            Voir le match live
          </button>
        </div>
      </section>

      <section className="mt-24">
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-steel-grey">
              Roster · Valorant
            </p>
            <h2 className="font-display font-black text-5xl tracking-tighter mt-2">
              Le Cinq de Départ
            </h2>
          </div>
          <button className="text-xs uppercase tracking-wider text-steel-grey hover:text-nafe-blue transition-colors">
            Voir l'effectif complet →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {ROSTER.map((p) => (
            <PlayerCard
              key={p.tag}
              {...p}
              avatar={`https://api.dicebear.com/7.x/identicon/svg?seed=${p.tag}&backgroundColor=1E4FD8`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
