import { X, Target, BarChart3, ShieldCheck, Clock, AlertTriangle } from "lucide-react";

export default function StartupDetail({ startup, onClose }) {
  if (!startup) return null;

  const { problem, market, moat, whyNow, negatives } = startup.deep || {};
  const breakdown = startup._match?.breakdown;

  return (
    <div className="fixed inset-0 z-30 bg-black/40 flex items-end md:items-center justify-center p-0 md:p-6">
      <div className="w-full md:max-w-3xl bg-white rounded-t-2xl md:rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{startup.company}</h3>
            <p className="text-sm text-slate-600">Founder: {startup.name} • Stage: {startup.stage}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-100 text-slate-600">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 pt-4">
          {startup._match && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-slate-700">
                <span className="font-medium">Overall match</span>
                <span className="font-semibold">{startup._match.total}%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-600" style={{ width: `${startup._match.total}%` }} />
              </div>
              {breakdown && (
                <div className="mt-2 grid grid-cols-4 gap-2 text-xs text-slate-600">
                  <div>Traction {breakdown.traction}%</div>
                  <div>Stage {breakdown.stage}%</div>
                  <div>Budget {breakdown.budget}%</div>
                  <div>Fit {breakdown.fit}%</div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="p-5 grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <section>
              <div className="flex items-center gap-2 mb-1 text-slate-800 font-medium"><Target size={16} /> Problem they solve</div>
              <p className="text-sm text-slate-700 leading-relaxed">{problem || "Not provided"}</p>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-1 text-slate-800 font-medium"><BarChart3 size={16} /> Market size</div>
              <p className="text-sm text-slate-700 leading-relaxed">{market || "Not provided"}</p>
            </section>
          </div>
          <div className="space-y-4">
            <section>
              <div className="flex items-center gap-2 mb-1 text-slate-800 font-medium"><ShieldCheck size={16} /> Competitive advantage</div>
              <p className="text-sm text-slate-700 leading-relaxed">{moat || "Not provided"}</p>
            </section>
            <section>
              <div className="flex items-center gap-2 mb-1 text-slate-800 font-medium"><Clock size={16} /> Why now / opportunity thesis</div>
              <p className="text-sm text-slate-700 leading-relaxed">{whyNow || "Not provided"}</p>
            </section>
          </div>
        </div>
        {negatives?.length ? (
          <div className="px-5 pb-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <div className="flex items-center gap-2 text-amber-800 text-sm font-medium"><AlertTriangle size={16} /> Risks & negative signals</div>
              <ul className="mt-2 list-disc list-inside text-amber-900 text-sm space-y-1">
                {negatives.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <div className="px-5 pb-5">
          <a href="#" className="inline-flex items-center justify-center w-full md:w-auto rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow hover:bg-indigo-700">View Full Deck</a>
        </div>
      </div>
    </div>
  );
}
