import React, { useState } from 'react';
import { AlgorithmVisualizer } from '../components/AlgorithmVisualizer';
import { levenshteinDistance as levenshtein, damerauLevenshteinDistance as damerauLevenshtein, matrixChainMultiplication as matrixChain, optimalBST, tspBitmask as bitmaskTSP } from '../algorithms/dp';
import type { AlgorithmResult, AlgorithmStep } from '../algorithms/types';

export function DynamicProgramming() {
  const [algo, setAlgo] = useState('levenshtein');
  const [str1, setStr1] = useState('kitten');
  const [str2, setStr2] = useState('sitting');
  const [matrixDims, setMatrixDims] = useState('10, 20, 30, 40, 30');
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleRun = () => {
    let res = null;
    try {
      if (algo === 'levenshtein') res = levenshtein(str1, str2);
      else if (algo === 'damerauLevenshtein') res = damerauLevenshtein(str1, str2);
      else if (algo === 'matrixChain') res = matrixChain(matrixDims.split(',').map(n => parseInt(n.trim(), 10)));
      else if (algo === 'optimalBST') res = optimalBST([10, 12, 20], [34, 8, 50]);
      else if (algo === 'bitmaskTSP') res = bitmaskTSP([[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]);
      setResult(res as any);
    } catch (e: any) {
      setResult({ steps: [], result: e.message, timeComplexity: '', spaceComplexity: '' } as any);
    }
  };

  const getContext = () => {
    if (algo.includes('evenshtein')) return "Corrects misspelled water-quality entries (e.g. contamnation -> contamination).";
    if (algo === 'matrixChain') return "Optimizes the sequence of sensor data matrix transformations.";
    if (algo === 'optimalBST') return "Builds optimal search trees for frequently accessed water records.";
    return "Optimizes route paths for treatment plant inspection (TSP).";
  };

  const renderState = (state: any, step: AlgorithmStep) => {
    if (!state || !state.dp) return null;
    return (
      <div className="overflow-x-auto">
        <table className="border-collapse border border-slate-700 mx-auto">
          <tbody>
            {state.dp.map((row: any[], i: number) => (
              <tr key={i}>
                {row.map((val: any, j: number) => {
                  const isCurrent = state.i === i && state.j === j;
                  return (
                    <td key={j} className={`border border-slate-700 p-2 w-12 h-12 text-center font-mono
                      ${isCurrent ? 'bg-cyan-500/30 text-cyan-300 font-bold' : 'text-slate-400'}`}>
                      {val === Infinity || val === 999999 ? '∞' : val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {state.operation && <p className="text-center mt-4 text-aqua font-bold">{state.operation}</p>}
      </div>
    );
  };

  const renderSummary = (res: AlgorithmResult) => {
    return (
      <div>
        <span className="text-white">✓ Final Answer: {JSON.stringify(res.result)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">Dynamic Programming</h1>
        <p className="text-slate-400 mt-1">{getContext()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card space-y-4 lg:col-span-1">
          <h2 className="text-xl font-semibold text-white">Input Configuration</h2>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Algorithm</label>
            <select className="input w-full" value={algo} onChange={(e) => { setAlgo(e.target.value); setResult(null); }}>
              <option value="levenshtein">Levenshtein Distance</option>
              <option value="damerauLevenshtein">Damerau-Levenshtein</option>
              <option value="matrixChain">Matrix Chain Multiplication</option>
              <option value="optimalBST">Optimal BST</option>
              <option value="bitmaskTSP">Bitmask TSP</option>
            </select>
          </div>

          {(algo === 'levenshtein' || algo === 'damerauLevenshtein') && (
            <>
              <div>
                <label className="block text-sm text-slate-400 mb-1">String 1</label>
                <input className="input w-full" value={str1} onChange={(e) => setStr1(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">String 2</label>
                <input className="input w-full" value={str2} onChange={(e) => setStr2(e.target.value)} />
              </div>
            </>
          )}

          {algo === 'matrixChain' && (
            <div>
              <label className="block text-sm text-slate-400 mb-1">Matrix Dimensions (comma separated)</label>
              <input className="input w-full" value={matrixDims} onChange={(e) => setMatrixDims(e.target.value)} />
            </div>
          )}

          <button className="btn w-full" onClick={handleRun}>Run Algorithm</button>
        </div>

        <div className="lg:col-span-2">
          <AlgorithmVisualizer result={result} title="DP Execution" description="Step-by-step DP Table construction" renderState={renderState} resultSummary={renderSummary} />
        </div>
      </div>
    </div>
  );
}
