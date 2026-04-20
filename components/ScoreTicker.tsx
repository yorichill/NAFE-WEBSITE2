const SCORES = [
  { match: "FNC vs T1", score: "13-11", game: "VALORANT", live: true },
  { match: "FNC vs G2", score: "2-1", game: "LEC", live: false },
  { match: "FNC vs NAVI", score: "16-14", game: "CS2", live: true },
  { match: "FNC vs GEN", score: "Upcoming", game: "VALORANT", live: false },
];

export function ScoreTicker() {
  const doubled = [...SCORES, ...SCORES];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-6 bg-nafe-blue text-white overflow-hidden flex items-center">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 font-mono text-[11px] uppercase tracking-[0.2em]"
          >
            {s.live && (
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            )}
            <span className="text-white/70">{s.game}</span>
            <span className="font-bold">{s.match}</span>
            <span className="text-white/90">{s.score}</span>
            <span className="text-white/40">//</span>
          </span>
        ))}
      </div>
    </div>
  );
}
