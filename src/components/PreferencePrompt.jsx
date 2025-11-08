import { useState } from "react";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default function PreferencePrompt({ onFilter }) {
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [geo, setGeo] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ industry, stage, geo, budget });
  };

  const handleClear = () => {
    setIndustry("");
    setStage("");
    setGeo("");
    setBudget("");
    onFilter({ industry: "", stage: "", geo: "", budget: "" });
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 p-4 md:p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-indigo-600" size={18} />
          <h2 className="text-slate-800 font-semibold">Refine your dealflow</h2>
        </div>
        <button type="button" onClick={handleClear} className="text-xs text-slate-600 hover:text-slate-800 underline">Clear</button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Industry (e.g., Fintech)"
          className="w-full rounded-md border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        />
        <select value={stage} onChange={(e) => setStage(e.target.value)} className="w-full rounded-md border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm">
          <option value="">Stage</option>
          <option>Idea</option>
          <option>MVP</option>
          <option>Revenue</option>
          <option>Growth</option>
        </select>
        <input
          type="text"
          value={geo}
          onChange={(e) => setGeo(e.target.value)}
          placeholder="Geography (e.g., US, EU, India)"
          className="w-full rounded-md border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        />
        <div className="relative">
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Max check size ($)"
            className="w-full rounded-md border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm pr-10"
          />
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400 text-xs">USD</div>
        </div>
        <div className="md:col-span-1 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white text-sm font-medium shadow hover:bg-slate-800">
            <Sparkles size={14} /> Apply
          </button>
        </div>
      </form>
    </div>
  );
}
