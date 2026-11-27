import React, { useState } from 'react';
import { runKMP, runZFunction, runRabinKarp, runAhoCorasick } from '../algorithms/strings';
import { AlgorithmVisualizer } from '../components/AlgorithmVisualizer';
import type { AlgorithmResult, AlgorithmStep } from '../algorithms/types';

export function StringAlgorithms() {
  const [text, setText] = useState("Water sample shows traces of lead and high turbidity.");
  const [pattern, setPattern] = useState("lead");
  const [patterns, setPatterns] = useState("lead, treatment, contamination");
  const [algo, setAlgo] = useState<'KMP' | 'Z' | 'Rabin' | 'Aho'>('KMP');
  const [result, setResult] = useState<AlgorithmResult | null>(null);

  const handleRun = () => {
    if (algo === 'KMP') setResult(runKMP(text, pattern));
    if (algo === 'Z') setResult(runZFunction(text, pattern));
    if (algo === 'Rabin') setResult(runRabinKarp(text, pattern));
    if (algo === 'Aho') setResult(runAhoCorasick(text, patterns.split(',').map(p => p.trim())));
  };

  const getContext = () => {
    if (algo === 'KMP') return "Used to locate contamination terms inside water-quality reports.";
    if (algo === 'Aho') return "Detects multiple contamination keywords simultaneously.";
    return "Identifies anomalies and contamination markers in text reports.";
  };

  const renderState = (state: any, step: AlgorithmStep) => {
    if (!state) return null;
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {text.split('').map((char, i) => {
            const isMatch = state.matches?.includes(i) || state.highlightedIndices?.includes(i);
            const isCurrent = state.i === i || state.textIdx === i;
            return (
              <span key={i} className={`w-8 h-8 flex items-center justify-center border font-mono text-lg rounded
                ${isCurrent ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400' : ''}
                ${isMatch ? 'border-green-500 bg-green-500/20 text-green-400' : 'border-slate-700 text-slate-300'}`}>
                {char === ' ' ? '␣' : char}
              </span>
            );
          })}
        </div>
        {state.pattern && (
          <div className="flex flex-wrap gap-1 mt-4">
            <span className="text-slate-500 mr-2 flex items-center">Pattern:</span>
            {state.pattern.split('').map((char: string, i: number) => {
              const isCurrentP = state.j === i || state.patternIdx === i;
              return (
                <span key={i} className={`w-8 h-8 flex items-center justify-center border font-mono text-lg rounded
                  ${isCurrentP ? 'border-cyan-400 bg-cyan-400/20 text-cyan-400' : 'border-slate-700 text-slate-300'}`}>
                  {char}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderSummary = (res: AlgorithmResult) => {
    const count = res.result?.length || 0;
    return (
      <div>
        {count > 0 ? (
          <span className="text-white">✓ Found {count} match(es) at indices: {res.result.join(', ')}</span>
        ) : (
          <span className="text-red-400">✗ Pattern not found</span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">String Algorithms</h1>
        <p className="text-slate-400 mt-1">{getContext()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card space-y-4 lg:col-span-1">
          <h2 className="text-xl font-semibold text-white">Input Configuration</h2>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Water Quality Report Text</label>
            <textarea className="input w-full h-32 resize-none" value={text} onChange={(e) => setText(e.target.value)} />
          </div>

          {algo === 'Aho' ? (
            <div>
              <label className="block text-sm text-slate-400 mb-1">Search Patterns (comma separated)</label>
              <input className="input w-full" value={patterns} onChange={(e) => setPatterns(e.target.value)} />
            </div>
          ) : (
            <div>
              <label className="block text-sm text-slate-400 mb-1">Search Pattern</label>
              <input className="input w-full" value={pattern} onChange={(e) => setPattern(e.target.value)} />
            </div>
          )}

          <div>
            <label className="block text-sm text-slate-400 mb-1">Algorithm</label>
            <select className="input w-full" value={algo} onChange={(e) => { setAlgo(e.target.value as any); setResult(null); }}>
              <option value="KMP">Knuth-Morris-Pratt (KMP)</option>
              <option value="Z">Z-Function</option>
              <option value="Rabin">Rabin-Karp</option>
              <option value="Aho">Aho-Corasick</option>
            </select>
          </div>

          <button className="btn w-full" onClick={handleRun}>Run Algorithm</button>
        </div>

        <div className="lg:col-span-2">
          <AlgorithmVisualizer result={result} title={`${algo} Execution`} description="Step-by-step string matching visualization" renderState={renderState} resultSummary={renderSummary} />
        </div>
      </div>
    </div>
  );
}
