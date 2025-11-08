import StartupCard from "./StartupCard";

export default function StartupList({ startups, onSelect }) {
  if (!startups?.length) {
    return (
      <div className="text-center text-slate-600 py-10">No startups match these filters. Try adjusting industry, stage, or budget.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {startups.map((s) => (
        <StartupCard key={`${s.company}-${s.name}`} founder={s} onSelect={onSelect} />
      ))}
    </div>
  );
}
