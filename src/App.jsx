import { useMemo, useState } from "react";
import Header from "./components/Header";
import PreferencePrompt from "./components/PreferencePrompt";
import StartupList from "./components/StartupList";
import StartupDetail from "./components/StartupDetail";

const SAMPLE_STARTUPS = [
  {
    name: "Aisha Khan",
    company: "FlowPay",
    industry: "Fintech",
    geography: "US",
    pitch: "Instant B2B payments with AI-driven risk scoring for SMBs.",
    stage: "Revenue",
    traction: { users: 12000, revenue: 850000 },
    asking: 1500000,
    equity: 12,
    deep: {
      problem: "SMBs wait 30-60 days for invoices; cash flow kills growth.",
      market: "$120B+ global AR/AP automation market growing 12% CAGR.",
      moat: "Proprietary risk model trained on alternative data and banking partners.",
      whyNow: "Open banking and AI underwriting reduce risk and improve margins.",
    },
  },
  {
    name: "Diego Ramirez",
    company: "AgriSense",
    industry: "AgTech",
    geography: "LatAm",
    pitch: "Computer-vision crop monitoring to cut water and fertilizer waste.",
    stage: "MVP",
    traction: { users: 35, lois: 12 },
    asking: 600000,
    equity: 10,
    deep: {
      problem: "Small/medium farms lack precise yield visibility and waste inputs.",
      market: "$40B precision agriculture tools market.",
      moat: "Edge models optimized for low-cost drones; offline-first pipeline.",
      whyNow: "Water stress and input costs force farms to digitize.",
    },
  },
  {
    name: "Mei Lin",
    company: "CareLoop",
    industry: "Digital Health",
    geography: "APAC",
    pitch: "Remote patient monitoring for chronic care with clinician tooling.",
    stage: "Growth",
    traction: { users: 50000, revenue: 5200000 },
    asking: 5000000,
    equity: 8,
    deep: {
      problem: "Hospitals overwhelmed by chronic disease follow-ups.",
      market: "$90B RPM + telehealth market.",
      moat: "Regulatory approvals + hospital integrations; model-driven triage.",
      whyNow: "Post-pandemic reimbursement codes make RPM billable.",
    },
  },
  {
    name: "Ethan Cole",
    company: "GreenVolt",
    industry: "ClimateTech",
    geography: "EU",
    pitch: "Modular energy storage for commercial buildings with VPP aggregation.",
    stage: "Revenue",
    traction: { users: 120, revenue: 3200000 },
    asking: 3000000,
    equity: 10,
    deep: {
      problem: "Demand charges and intermittency raise energy bills by 30%+.",
      market: "$200B+ behind-the-meter storage and VPP market.",
      moat: "Hardware-software stack, UL-certified modules, utility partnerships.",
      whyNow: "Grid volatility + incentives accelerate storage adoption.",
    },
  },
];

export default function App() {
  const [filters, setFilters] = useState({ industry: "", stage: "", geo: "", budget: "" });
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return SAMPLE_STARTUPS.filter((s) => {
      const industryOk = filters.industry ? s.industry.toLowerCase().includes(filters.industry.toLowerCase()) : true;
      const stageOk = filters.stage ? s.stage === filters.stage : true;
      const geoOk = filters.geo ? (s.geography || "").toLowerCase().includes(filters.geo.toLowerCase()) : true;
      const budgetOk = filters.budget ? Number(s.asking) <= Number(filters.budget) : true;
      return industryOk && stageOk && geoOk && budgetOk;
    });
  }, [filters]);

  const topPicks = useMemo(() => {
    // Score by normalized revenue/users presence and clarity
    const scored = [...SAMPLE_STARTUPS].map((s) => {
      const revenueScore = s.traction?.revenue ? Math.log10(s.traction.revenue + 1) : 0;
      const userScore = s.traction?.users ? Math.log10(s.traction.users + 1) : 0;
      const stageBoost = s.stage === "Growth" ? 1 : s.stage === "Revenue" ? 0.7 : 0.3;
      return { s, score: revenueScore * 1.2 + userScore * 0.8 + stageBoost };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 3).map((x) => x.s);
  }, []);

  const handleTopPicks = () => {
    setFilters({ industry: "", stage: "", geo: "", budget: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header onReset={handleTopPicks} />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <PreferencePrompt onFilter={setFilters} />

        {/* Recommendations Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">Recommended matches</h2>
            <div className="text-sm text-slate-600">Top picks highlighted based on traction</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPicks.map((s) => (
              <div key={`top-${s.company}`} className="ring-1 ring-indigo-200 rounded-xl p-1 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="rounded-lg bg-white p-4">
                  <div className="text-xs text-indigo-700 font-medium mb-2">Top Pick</div>
                  <div onClick={() => setSelected(s)}>
                    <div className="text-slate-900 font-semibold">{s.company}</div>
                    <div className="text-slate-600 text-sm">{s.industry} • {s.stage}</div>
                    <div className="text-slate-700 mt-2 text-sm">{s.pitch}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Results list */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">All startups</h2>
            <div className="text-sm text-slate-600">{filtered.length} results</div>
          </div>
          <StartupList startups={filtered} onSelect={setSelected} />
        </section>
      </main>

      <StartupDetail startup={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
