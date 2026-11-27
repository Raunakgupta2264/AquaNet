import React, { useState } from 'react';
import { AlgorithmVisualizer } from '../components/AlgorithmVisualizer';
import { randomizedQuickSort, reservoirSampling, millerRabin, blellochScan, parallelReduce } from '../algorithms/random_parallel';
import type { AlgorithmResult, AlgorithmStep } from '../algorithms/types';

export function RandomizedParallel() {
  const [algo, setAlgo] = useState('randomizedQuickSort');
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleRun = () => {
    let res = null;
    try {
      if (algo === 'randomizedQuickSort') res = randomizedQuickSort([34, 7, 23, 32, 5, 62, 32, 2, 78, 1]);
      else if (algo === 'reservoirSampling') res = reservoirSampling([10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 3);
      else if (algo === 'millerRabin') res = millerRabin(97, 5);
      else if (algo === 'blellochScan') res = blellochScan([3, 1, 7, 0, 4, 1, 6, 3]);
      else if (algo === 'parallelReduce') res = parallelReduce([3, 1, 7, 0, 4, 1, 6, 3]);
      setResult(res as any);
    } catch (e: any) {
      setResult({ steps: [], result: e.message, timeComplexity: '', spaceComplexity: '' } as any);
    }
  };

  const getContext = () => {
    if (algo === 'randomizedQuickSort') return "Efficiently sorts highly varied water demand records.";
    if (algo === 'reservoirSampling') return "Maintains a representative sample from continuous sensor streams.";
    if (algo === 'blellochScan') return "Calculates cumulative water levels across zones instantly via parallel prefix sums.";
    if (algo === 'parallelReduce') return "Aggregates total clean water volume across all treatment plants.";
    return "Provides fast probabilistic primality testing for hashing sensor IDs.";
  };

  const renderState = (state: any, step: AlgorithmStep) => {
    if (!state) return null;
    return (
      <div className="space-y-4">
        {state.arr && (
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h4 className="text-cyan-400 font-bold mb-2">Array State</h4>
            <div className="flex flex-wrap gap-2">
              {state.arr.map((val: number, i: number) => {
                const isPivot = state.pivotIdx === i;
                const isHighlight = state.highlighted?.includes(i);
                return (
                  <span key={i} className={`w-10 h-10 flex items-center justify-center border rounded font-mono text-sm
                    ${isPivot ? 'bg-yellow-500/30 border-yellow-500 text-yellow-300' : isHighlight ? 'bg-cyan-500/30 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-600 text-slate-300'}`}>
                    {val}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        {state.reservoir && (
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h4 className="text-green-400 font-bold mb-2">Reservoir Sample</h4>
            <div className="flex flex-wrap gap-2">
              {state.reservoir.map((val: number, i: number) => (
                <span key={i} className="w-10 h-10 flex items-center justify-center bg-green-900/50 border border-green-600 rounded text-green-400 font-bold">
                  {val}
                </span>
              ))}
            </div>
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
        <h1 className="text-3xl font-bold text-white">Randomized & Parallel</h1>
        <p className="text-slate-400 mt-1">{getContext()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card space-y-4 lg:col-span-1">
          <h2 className="text-xl font-semibold text-white">Input Configuration</h2>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Algorithm</label>
            <select className="input w-full" value={algo} onChange={(e) => { setAlgo(e.target.value); setResult(null); }}>
              <option value="randomizedQuickSort">Randomized QuickSort</option>
              <option value="reservoirSampling">Reservoir Sampling</option>
              <option value="millerRabin">Miller-Rabin Primality</option>
              <option value="blellochScan">Blelloch Scan</option>
              <option value="parallelReduce">Parallel Reduce</option>
            </select>
          </div>

          <button className="btn w-full" onClick={handleRun}>Run Algorithm</button>
        </div>

        <div className="lg:col-span-2">
          <AlgorithmVisualizer result={result} title="Algorithm Execution" description="Step-by-step state visualization" renderState={renderState} resultSummary={renderSummary} />
        </div>
      </div>
    </div>
  );
}
