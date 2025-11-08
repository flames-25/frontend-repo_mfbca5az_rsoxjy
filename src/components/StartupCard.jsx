import { Users, LineChart, DollarSign, AlertTriangle } from "lucide-react";

export default function StartupCard({ founder, onSelect }) {
  const {
    name,
    company,
    industry,
    pitch,
    stage,
    traction,
    asking,
    equity,
    geography,
    _match,
    deep,
  } = founder;

  const negatives = deep?.negatives || [];

  return (
    <div
      className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={() => onSelect(founder)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-slate-900 font-semibold">{company}</h3>
          <p className="text-slate-600 text-sm">👤 {name} • {industry} • {geography || "Global"}</p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs px-2 py-1 font-medium">{stage}</span>
          {_match && (
            <div className="mt-2 text-xs font-semibold text-slate-700">{_match.total}% match</div>
          )}
        </div>
      </div>
      <p className="text-slate-700 mt-3 text-sm leading-relaxed">{pitch}</p>
      {_match && (
        <div className="mt-3">
          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-indigo-600" style={{ width: `${_match.total}%` }} />
          </div>
          <div className="mt-1 grid grid-cols-4 gap-2 text-[10px] text-slate-600">
            <div>Traction {_match.breakdown.traction}%</div>
            <div>Stage {_match.breakdown.stage}%</div>
            <div>Budget {_match.breakdown.budget}%</div>
            <div>Fit {_match.breakdown.fit}%</div>
          </div>
        </div>
      )}
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-700"><Users size={16} /> {traction?.users ? `${traction.users.toLocaleString()} users` : traction?.lois ? `${traction.lois}+ LOIs` : "Early traction"}</div>
        <div className="flex items-center gap-2 text-slate-700"><LineChart size={16} /> {traction?.revenue ? `$${traction.revenue.toLocaleString()} ARR` : "—"}</div>
        <div className="flex items-center gap-2 text-slate-700"><DollarSign size={16} /> Asking ${asking?.toLocaleString()} for {equity}%</div>
      </div>
      {negatives.length > 0 && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-2">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-medium">
            <AlertTriangle size={14} /> Potential risks
          </div>
          <ul className="mt-1 list-disc list-inside text-amber-900 text-xs space-y-0.5">
            {negatives.slice(0, 2).map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
