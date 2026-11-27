import React, { useState, useEffect } from 'react';
import type { AlgorithmResult, AlgorithmStep } from '../algorithms/types';
import { Play, Pause, SkipBack, SkipForward, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  result: AlgorithmResult<any> | null;
  title: string;
  description: string;
  renderState?: (state: any, step: AlgorithmStep) => React.ReactNode;
  resultSummary?: (result: AlgorithmResult<any>) => React.ReactNode;
}

export function AlgorithmVisualizer({ result, title, description, renderState, resultSummary }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [result]);

  useEffect(() => {
    let timer: any;
    if (isPlaying && result && currentStep < result.steps.length - 1) {
      timer = setTimeout(() => setCurrentStep(c => c + 1), 800);
    } else if (isPlaying && result && currentStep >= result.steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, result]);

  if (!result) {
    return (
      <div className="card text-center p-8 text-slate-400 border-dashed border-slate-700 border-2">
        Click "Run Algorithm" to begin visualization.
      </div>
    );
  }

  // Filter steps to avoid 200+ steps (keep meaningful ones)
  let displaySteps = result.steps;
  if (displaySteps.length > 40) {
    // Keep first 10, last 10, and some in the middle
    const stepCount = displaySteps.length;
    const interval = Math.floor((stepCount - 20) / 20);
    displaySteps = displaySteps.filter((s, i) => i < 10 || i > stepCount - 10 || i % interval === 0);
  }
  
  // ensure we don't go out of bounds if steps got filtered
  const safeCurrentStep = Math.min(currentStep, displaySteps.length - 1);
  const step = displaySteps[safeCurrentStep];

  return (
    <div className="card space-y-4 border-slate-700 bg-slate-900 shadow-xl">
      <div className="flex justify-between items-start border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">{title}</h3>
          <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
      </div>

      <div className="bg-slate-950 rounded-lg p-4 min-h-[250px] overflow-auto border border-slate-800 relative">
        <div className="mb-4">
          <span className="text-xs font-bold text-aqua uppercase tracking-wider">Step {safeCurrentStep + 1} / {displaySteps.length}</span>
          <p className="text-white text-lg font-medium mt-1">{step?.description}</p>
        </div>
        
        {renderState ? (
          <div className="mt-4">{renderState(step?.state, step)}</div>
        ) : (
          <pre className="text-slate-300 font-mono text-sm">
            {step?.state ? JSON.stringify(step.state, null, 2) : 'No state representation'}
          </pre>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex-1">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-aqua transition-all duration-300" style={{ width: `${((safeCurrentStep + 1) / displaySteps.length) * 100}%` }}></div>
          </div>
        </div>
        
        <div className="flex gap-2 ml-6">
          <button className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50" onClick={() => setCurrentStep(0)} disabled={safeCurrentStep === 0}>
            <SkipBack className="w-4 h-4" />
          </button>
          <button className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50" onClick={() => setCurrentStep(Math.max(0, safeCurrentStep - 1))} disabled={safeCurrentStep === 0}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 rounded bg-aqua hover:bg-cyan text-darkblue font-bold" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50" onClick={() => setCurrentStep(Math.min(displaySteps.length - 1, safeCurrentStep + 1))} disabled={safeCurrentStep === displaySteps.length - 1}>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50" onClick={() => setCurrentStep(displaySteps.length - 1)} disabled={safeCurrentStep === displaySteps.length - 1}>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
            <CheckCircle className="w-4 h-4" /> Algorithm Result
          </div>
          <div className="text-slate-200">
            {resultSummary ? resultSummary(result) : (
              <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result.result, null, 2)}</pre>
            )}
          </div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 space-y-2">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Time Complexity</div>
            <div className="font-mono text-aqua">{result.timeComplexity}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Space Complexity</div>
            <div className="font-mono text-aqua">{result.spaceComplexity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
