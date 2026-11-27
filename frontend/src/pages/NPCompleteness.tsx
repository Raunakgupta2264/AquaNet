import React, { useState } from 'react';
import { AlgorithmVisualizer } from '../components/AlgorithmVisualizer';
import { vertexCoverGreedy as vertexCoverApproximation, simulateNPHardReduction as simulateNPChain } from '../algorithms/np';
import type { AlgorithmResult, AlgorithmStep } from '../algorithms/types';

export function NPCompleteness() {
  const [algo, setAlgo] = useState('vertexCover');
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleRun = () => {
    let res = null;
    try {
      if (algo === 'vertexCover') res = vertexCoverApproximation();
      else if (algo === 'simulateNPChain') res = simulateNPChain();
      setResult(res as any);
    } catch (e: any) {
      setResult({ steps: [], result: e.message, timeComplexity: '', spaceComplexity: '' } as any);
    }
  };

  const getContext = () => {
    if (algo === 'vertexCover') return "Identifies a small set of critical infrastructure points requiring monitoring.";
    return "Analyzes how complex scheduling conflicts map to well-known NP-Complete problems.";
  };

  const renderState = (state: any, step: AlgorithmStep) => {
    if (!state) return null;
    return (
      <div className="space-y-4">
        {state.edges && (
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h4 className="text-cyan-400 font-bold mb-2">Graph Edges</h4>
            <div className="flex flex-wrap gap-2">
              {state.edges.map((e: number[], i: number) => (
                <span key={i} className="px-2 py-1 bg-slate-900 border border-slate-600 rounded text-slate-300 font-mono text-sm">
                  ({e[0]}, {e[1]})
                </span>
              ))}
            </div>
          </div>
        )}
        {state.cover && (
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h4 className="text-green-400 font-bold mb-2">Selected Vertex Cover</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(state.cover).map((v: any, i: number) => (
                <span key={i} className="w-8 h-8 flex items-center justify-center bg-green-900/50 border border-green-600 rounded text-green-400 font-bold">
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}
        {state.reduction && (
           <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
             <h4 className="text-purple-400 font-bold mb-2">Reduction State</h4>
             <p className="text-white text-lg font-mono">{state.reduction}</p>
           </div>
        )}
      </div>
    );
  };

  const renderSummary = (res: AlgorithmResult) => {
    return (
      <div>
        <span className="text-white">✓ Output: {JSON.stringify(res.result)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">NP-Completeness & Approximation</h1>
        <p className="text-slate-400 mt-1">{getContext()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card space-y-4 lg:col-span-1">
          <h2 className="text-xl font-semibold text-white">Input Configuration</h2>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Algorithm</label>
            <select className="input w-full" value={algo} onChange={(e) => { setAlgo(e.target.value); setResult(null); }}>
              <option value="vertexCover">Vertex Cover (2-Approximation)</option>
              <option value="simulateNPChain">3-SAT → CLIQUE Reduction</option>
            </select>
          </div>

          <button className="btn w-full" onClick={handleRun}>Run Algorithm</button>
        </div>

        <div className="lg:col-span-2">
          <AlgorithmVisualizer result={result} title="NP Constraints Execution" description="Approximation and Reduction Simulation" renderState={renderState} resultSummary={renderSummary} />
        </div>
      </div>
    </div>
  );
}
