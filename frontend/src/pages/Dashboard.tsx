import React, { useState } from 'react';
import { Activity, Droplets, AlertTriangle, ShieldCheck, Play } from 'lucide-react';
import { mockNetworkData, mockWaterQualityReports } from '../data/mockData';

export function Dashboard() {
  const [demoActive, setDemoActive] = useState(false);
  const alerts = mockWaterQualityReports.filter(r => r.status === 'Critical' || r.status === 'Warning');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">AquaNet Dashboard</h1>
          <p className="text-slate-400 mt-1">Smart Water Resource Management Platform</p>
        </div>
        <button onClick={() => setDemoActive(!demoActive)} className="btn flex items-center gap-2">
          <Play className="w-4 h-4" /> {demoActive ? 'Stop Demo' : 'Start Demo'}
        </button>
      </div>

      {demoActive && (
        <div className="card border-aqua bg-slate-800">
          <h2 className="text-xl font-bold text-white mb-4">Live Demonstration Scenario</h2>
          <div className="space-y-3">
            <p className="text-slate-300"><strong>Scenario:</strong> Water flows from Reservoir → Pipeline Network → Treatment Plant → Consumer Demand.</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li><span className="text-aqua">Aho-Corasick</span> detects multiple contamination keywords across incoming reports.</li>
              <li><span className="text-aqua">KMP</span> isolates exact locations of "lead" in the critical report.</li>
              <li><span className="text-aqua">Levenshtein</span> autocorrects misspelled entries ("contamnation" → "contamination").</li>
              <li><span className="text-aqua">Dinic's Algorithm</span> dynamically recalculates maximum safe water flow avoiding contaminated pipelines.</li>
              <li><span className="text-aqua">Min-Cut</span> identifies the exact pipeline bottleneck restricting treatment capacity.</li>
              <li><span className="text-aqua">Reservoir Sampling</span> selects 100 random safe sensors out of 10,000 for quick aggregate testing.</li>
              <li><span className="text-aqua">Blelloch Scan</span> runs parallel prefix sums to instantly aggregate total clean water volume.</li>
            </ol>
            <p className="text-sm italic text-cyan-400 mt-4">Navigate to the modules on the left to see each algorithm execute step-by-step!</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Reservoirs" value="12" icon={<Droplets className="text-blue-400" />} />
        <StatCard title="Active Pipelines" value="84" icon={<Activity className="text-aqua" />} />
        <StatCard title="Water Quality Alerts" value={alerts.length.toString()} icon={<AlertTriangle className="text-red-400" />} />
        <StatCard title="System Status" value="Optimal" icon={<ShieldCheck className="text-green-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-white">Network Overview</h2>
          <div className="h-64 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <div className="bg-blue-500/20 border border-blue-500 text-blue-400 px-4 py-2 rounded-lg">North Reservoir</div>
              <div className="h-0.5 w-8 bg-slate-600"></div>
              <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-4 py-2 rounded-lg">Pump Station 1</div>
              <div className="h-0.5 w-8 bg-slate-600 relative"><span className="absolute -top-5 left-1 text-xs text-slate-500">120L/s</span></div>
              <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg">Treatment Plant A</div>
              <div className="h-0.5 w-8 bg-slate-600 relative"><span className="absolute -top-5 left-1 text-xs text-slate-500">100L/s</span></div>
              <div className="bg-purple-500/20 border border-purple-500 text-purple-400 px-4 py-2 rounded-lg">City Zone</div>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <div className="bg-blue-500/20 border border-blue-500 text-blue-400 px-4 py-2 rounded-lg">South Reservoir</div>
              <div className="h-0.5 w-8 bg-slate-600"></div>
              <div className="bg-cyan-500/20 border border-cyan-500 text-cyan-400 px-4 py-2 rounded-lg">Pump Station 2</div>
              <div className="h-0.5 w-8 bg-slate-600 relative"><span className="absolute -top-5 left-1 text-xs text-slate-500">85L/s</span></div>
              <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg">Treatment Plant B</div>
              <div className="h-0.5 w-8 bg-slate-600 relative"><span className="absolute -top-5 left-1 text-xs text-slate-500">80L/s</span></div>
              <div className="bg-purple-500/20 border border-purple-500 text-purple-400 px-4 py-2 rounded-lg">Industrial Zone</div>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-white">Critical Alerts</h2>
          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className="p-3 bg-slate-800 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-white">{alert.location}</p>
                <p className="text-sm text-slate-400 mt-1">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="card flex items-center gap-4">
      <div className="p-3 bg-slate-800 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
