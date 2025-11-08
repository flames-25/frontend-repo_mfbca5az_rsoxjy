import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function PreferencePrompt({ onFilter }) {
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [geo, setGeo] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ industry, stage, geo, budget });
  };

  return (
    <div className="w-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-slate-200 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="text-indigo-600" size={18} />
        <h2 className="text-slate-800 font-semibold">Welcome back. What kind of startups are you interested in exploring today — industry, stage, or investment size?</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Max check size ($)"
          className="w-full rounded-md border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        />
        <div className="md:col-span-4 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-white text-sm font-medium shadow hover:bg-slate-800">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}
