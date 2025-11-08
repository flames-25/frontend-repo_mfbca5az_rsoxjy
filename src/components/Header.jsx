import { Rocket, Search, Star } from "lucide-react";

export default function Header({ onReset }) {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur border-b border-slate-200/60 bg-white/70">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white grid place-items-center shadow-sm">
            <Rocket size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">Investor Dashboard</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Browse, filter, evaluate, shortlist</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-600">
          <Search size={18} />
          <span className="text-sm">Find standout founders</span>
        </div>
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-medium shadow hover:bg-indigo-700 focus:outline-none">
          <Star size={16} />
          Top Picks
        </button>
      </div>
    </header>
  );
}
