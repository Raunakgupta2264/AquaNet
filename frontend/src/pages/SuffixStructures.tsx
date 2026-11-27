import React, { useState } from 'react';
import { AlgorithmVisualizer } from '../components/AlgorithmVisualizer';
import { buildSuffixArray, buildLCPArray, buildSuffixAutomaton } from '../algorithms/suffix';
import type { AlgorithmResult, AlgorithmStep } from '../algorithms/types';

export function SuffixStructures() {
  const [algo, setAlgo] = useState('suffixArray');
  const [text, setText] = useState('banana$');
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleRun = () => {
    let res = null;
    try {
      if (algo === 'suffixArray') res = buildSuffixArray(text);
      else if (algo === 'lcpArray') res = buildLCPArray(text);
      else if (algo === 'suffixAutomaton') res = buildSuffixAutomaton(text);
      setResult(res as any);
    } catch (e: any) {
      setResult({ steps: [], result: e.message, timeComplexity: '', spaceComplexity: '' } as any);
    }
  };

  const getContext = () => {
    return "Optimizes indexing of massive historical water quality reports for rapid substring matching.";
  };

  const renderState = (state: any, step: AlgorithmStep) => {
    if (!state) return null;
    
    if (state.suffixes) {
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
              <h4 className="text-cyan-400 font-bold mb-2">Sorted Suffixes</h4>
              <ul className="text-slate-300 font-mono text-sm space-y-1">
                {state.suffixes.map((s: any, i: number) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-slate-500 w-6">{s.index}</span>
                    <span>{s.suffix}</span>
                  </li>
                ))}
              </ul>
            </div>
            {state.sa && (
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                <h4 className="text-cyan-400 font-bold mb-2">Suffix Array (SA)</h4>
                <div className="flex flex-wrap gap-2">
                  {state.sa.map((val: number, i: number) => (
                    <span key={i} className="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-600 rounded text-aqua font-mono">{val}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    if (state.lcp) {
      return (
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <h4 className="text-cyan-400 font-bold mb-2">LCP Array</h4>
          <div className="flex flex-wrap gap-2">
            {state.lcp.map((val: number, i: number) => (
              <span key={i} className="w-8 h-8 flex items-center justify-center bg-slate-900 border border-slate-600 rounded text-green-400 font-mono">{val}</span>
            ))}
          </div>
        </div>
      );
    }
    
    return <pre className="text-slate-300 font-mono text-sm">{JSON.stringify(state, null, 2)}</pre>;
  };

  const renderSummary = (res: AlgorithmResult) => {
    return (
      <div>
        <span className="text-white">✓ Final Array/Structure Computed Successfully.</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">Suffix Structures</h1>
        <p className="text-slate-400 mt-1">{getContext()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card space-y-4 lg:col-span-1">
          <h2 className="text-xl font-semibold text-white">Input Configuration</h2>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Algorithm</label>
            <select className="input w-full" value={algo} onChange={(e) => { setAlgo(e.target.value); setResult(null); }}>
              <option value="suffixArray">Suffix Array Construction</option>
              <option value="lcpArray">LCP Array (Kasai)</option>
              <option value="suffixAutomaton">Suffix Automaton</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Input String (add $ for SA)</label>
            <input className="input w-full font-mono" value={text} onChange={(e) => setText(e.target.value)} />
          </div>

          <button className="btn w-full" onClick={handleRun}>Run Algorithm</button>
        </div>

        <div className="lg:col-span-2">
          <AlgorithmVisualizer result={result} title="Suffix Construction" description="Visualization of indexing strings" renderState={renderState} resultSummary={renderSummary} />
        </div>
      </div>
    </div>
  );
}
