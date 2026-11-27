import React, { useState } from 'react';
import { AlgorithmVisualizer } from '../components/AlgorithmVisualizer';
import { edmondsKarp, dinic, bipartiteMatching } from '../algorithms/network';
import type { AlgorithmResult, AlgorithmStep } from '../algorithms/types';
import { ArrowRight } from 'lucide-react';

export function NetworkFlow() {
  const [algo, setAlgo] = useState('edmondsKarp');
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleRun = () => {
    let res = null;
    const graph = [
      [0, 16, 13, 0, 0, 0],
      [0, 0, 10, 12, 0, 0],
      [0, 4, 0, 0, 14, 0],
      [0, 0, 9, 0, 0, 20],
      [0, 0, 0, 7, 0, 4],
      [0, 0, 0, 0, 0, 0]
    ];
    const bipartiteGraph = [
      [0, 1, 1, 0, 0, 0],
      [1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ];
    try {
      let adjList: any[] = Array.from({ length: 6 }, () => []);
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          if (graph[i][j] > 0) {
            const forward = { to: j, capacity: graph[i][j], flow: 0, rev: null as any };
            const backward = { to: i, capacity: 0, flow: 0, rev: forward };
            forward.rev = backward;
            adjList[i].push(forward);
            adjList[j].push(backward);
          }
        }
      }
      if (algo === 'edmondsKarp') res = edmondsKarp(adjList as any, 0, 5);
      else if (algo === 'dinic') res = dinic(adjList as any, 0, 5);
      else if (algo === 'bipartiteMatching') res = bipartiteMatching(bipartiteGraph);
      setResult(res as any);
    } catch (e: any) {
      setResult({ steps: [], result: e.message, timeComplexity: '', spaceComplexity: '' } as any);
    }
  };

  const getContext = () => {
    if (algo === 'bipartiteMatching') return "Assigns treatment operators to treatment units optimally.";
    return "Computes the maximum possible water flow from reservoir to consumer without exceeding pipeline capacities.";
  };

  const renderState = (state: any, step: AlgorithmStep) => {
    if (!state) return null;
    // state contains residual graph or similar
    const nodeNames = ["Reservoir", "Pump A", "Pump B", "Treatment A", "Treatment B", "Consumer"];
    return (
      <div className="space-y-4">
        {state.path && (
          <div className="flex items-center gap-2 flex-wrap mb-4 bg-slate-800 p-2 rounded-lg">
            <span className="text-sm text-slate-400">Augmenting Path:</span>
            {state.path.map((n: number, i: number) => (
              <React.Fragment key={i}>
                <span className="text-aqua font-bold">{nodeNames[n] || n}</span>
                {i < state.path.length - 1 && <ArrowRight className="w-4 h-4 text-slate-500" />}
              </React.Fragment>
            ))}
            <span className="text-green-400 ml-4">+ {state.flowAdded} flow</span>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {state.graph && state.graph.map((row: number[], u: number) => (
            row.map((cap: number, v: number) => {
              if (cap > 0) {
                // To avoid showing reverse edges if we don't want to clutter, we just show positive capacities 
                // However residual graph has reverse edges. We can just highlight them.
                return (
                  <div key={`${u}-${v}`} className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                    <span className="text-slate-300 text-xs">{nodeNames[u] || u}</span>
                    <ArrowRight className="w-4 h-4 text-aqua mx-2" />
                    <span className="text-slate-300 text-xs">{nodeNames[v] || v}</span>
                    <span className="ml-auto font-mono text-cyan-400 text-sm bg-cyan-900/30 px-2 rounded">{cap} units</span>
                  </div>
                );
              }
              return null;
            })
          ))}
        </div>
      </div>
    );
  };

  const renderSummary = (res: AlgorithmResult) => {
    return (
      <div>
        <span className="text-white">✓ Maximum Flow Computed: {JSON.stringify(res.result)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">Network Flow Simulator</h1>
        <p className="text-slate-400 mt-1">{getContext()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card space-y-4 lg:col-span-1">
          <h2 className="text-xl font-semibold text-white">Input Configuration</h2>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Algorithm</label>
            <select className="input w-full" value={algo} onChange={(e) => { setAlgo(e.target.value); setResult(null); }}>
              <option value="edmondsKarp">Edmonds-Karp (Max Flow)</option>
              <option value="dinic">Dinic's Algorithm (Max Flow)</option>
              <option value="bipartiteMatching">Bipartite Matching (Assignment)</option>
            </select>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-400">Using standard 6-node AquaNet simulation graph.</p>
          </div>

          <button className="btn w-full" onClick={handleRun}>Run Algorithm</button>
        </div>

        <div className="lg:col-span-2">
          <AlgorithmVisualizer result={result} title="Network Flow Execution" description="Residual graph and augmenting paths visualization" renderState={renderState} resultSummary={renderSummary} />
        </div>
      </div>
    </div>
  );
}
