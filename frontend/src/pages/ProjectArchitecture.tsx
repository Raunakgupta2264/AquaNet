import React from 'react';

export function ProjectArchitecture() {
  return (
    <div className="p-8 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Project Architecture</h1>
      
      <div className="bg-slate-800 p-8 rounded shadow-sm text-center font-mono">
        <div className="mb-4">
          <span className="font-bold text-xl">[ Users ]</span>
        </div>
        <div className="text-2xl mb-4">↓</div>
        <div className="mb-4">
          <span className="font-bold text-xl">[ Dashboard / React Frontend ]</span>
        </div>
        <div className="text-2xl mb-4">↓</div>
        <div className="mb-4">
          <span className="font-bold text-xl">[ Engines (Algorithms API) ]</span>
        </div>
        <div className="text-2xl mb-4">↓</div>
        <div>
          <span className="font-bold text-xl">[ Data Store ]</span>
        </div>
      </div>
    </div>
  );
}
