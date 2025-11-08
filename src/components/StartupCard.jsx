import { Users, LineChart, DollarSign } from "lucide-react";

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
  } = founder;

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => onSelect(founder)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-slate-900 font-semibold">{company}</h3>
          <p className="text-slate-600 text-sm">👤 {name} • {industry} • {geography || "Global"}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs px-2 py-1 font-medium">{stage}</span>
      </div>
      <p className="text-slate-700 mt-3 text-sm leading-relaxed">{pitch}</p>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-700"><Users size={16} /> {traction?.users ? `${traction.users.toLocaleString()} users` : traction?.lois ? `${traction.lois}+ LOIs` : "Early traction"}</div>
        <div className="flex items-center gap-2 text-slate-700"><LineChart size={16} /> {traction?.revenue ? `$${traction.revenue.toLocaleString()} ARR` : "—"}</div>
        <div className="flex items-center gap-2 text-slate-700"><DollarSign size={16} /> Asking ${asking?.toLocaleString()} for {equity}%</div>
      </div>
    </div>
  );
}
