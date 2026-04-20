import { notFound } from "next/navigation";
import { PlayerCard } from "@/components/PlayerCard";
import { TEAMS } from "@/lib/rosters";

export function generateStaticParams() {
  return Object.keys(TEAMS).map((game) => ({ game }));
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;
  const team = TEAMS[game];
  if (!team) notFound();

  return (
    <div className="px-8 md:px-16 pb-32">
      <section className="pt-12 pb-20 border-b border-white/10">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-nafe-blue mb-4">
          {team.region} · Roster officiel
        </p>
        <h1 className="font-display font-black tracking-tighter text-6xl md:text-[8rem] leading-[0.85]">
          {team.game}
        </h1>
        <p className="mt-6 text-steel-grey max-w-xl">
          L'effectif complet de {team.title} — statistiques, palmarès et
          équipement signature.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="font-display font-black text-4xl tracking-tighter mb-10">
          Roster
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {team.roster.map((p) => (
            <PlayerCard
              key={p.tag}
              name={p.name}
              tag={p.tag}
              role={p.role}
              jersey={p.jersey}
              kd={p.kd}
              avatar={`https://api.dicebear.com/7.x/identicon/svg?seed=${p.tag}&backgroundColor=1E4FD8`}
            />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="font-display font-black text-4xl tracking-tighter mb-10">
          Palmarès
        </h2>
        <div className="space-y-3">
          {team.trophies.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-6 bg-nafe-surface/60 border border-white/5 p-5 nafe-clip-card hover:border-nafe-blue/40 transition-colors"
            >
              <span className="font-mono text-nafe-blue font-bold">
                {t.year}
              </span>
              <span className="flex-1 font-display text-xl">{t.event}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-grey">
                {t.place}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="font-display font-black text-4xl tracking-tighter mb-10">
          Équipement signature
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Mouse", "Keyboard", "Headset"].map((label, i) => {
            const p = team.roster.find((r) => r.gear);
            const v =
              i === 0
                ? p?.gear?.mouse
                : i === 1
                ? p?.gear?.keyboard
                : p?.gear?.headset;
            return (
              <div
                key={label}
                className="bg-nafe-surface/60 border border-white/5 p-6 nafe-clip-card"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel-grey">
                  {label}
                </p>
                <p className="mt-2 font-display text-2xl font-bold">
                  {v ?? "À venir"}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
