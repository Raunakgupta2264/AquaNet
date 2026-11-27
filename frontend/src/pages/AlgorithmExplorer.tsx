import React from 'react';

export function AlgorithmExplorer() {
  const algorithms = [
    { name: 'String Matching', complexity: 'O(N+M)', purpose: 'Find pattern in text', app: 'Log Analysis, DNA sequencing' },
    { name: 'Suffix Trees/Arrays', complexity: 'O(N log N)', purpose: 'String indexing', app: 'Search Engines, Plagiarism detection' },
    { name: 'Dynamic Programming', complexity: 'Varies', purpose: 'Optimal substructure', app: 'Resource Allocation, Bioinformatics' },
    { name: 'Network Flow', complexity: 'O(V^2 E)', purpose: 'Max flow in networks', app: 'Traffic Routing, Bipartite matching' },
    { name: 'NP Completeness', complexity: 'Exponential/Approximation', purpose: 'Hard problems', app: 'Scheduling, TSP' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Algorithm Explorer</h1>
      <p className="mb-8">Explore various algorithms, their complexities, and real-world applications in AquaNet.</p>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-900 border border-slate-700-slate-700 text-white border border-slate-700">
          <thead className="bg-slate-800">
            <tr>
              <th className="py-2 px-4 border border-slate-700">Algorithm Category</th>
              <th className="py-2 px-4 border border-slate-700">Complexity</th>
              <th className="py-2 px-4 border border-slate-700">Purpose</th>
              <th className="py-2 px-4 border border-slate-700">Real-world Application</th>
            </tr>
          </thead>
          <tbody>
            {algorithms.map((alg, idx) => (
              <tr key={idx} className="border border-slate-700-t">
                <td className="py-2 px-4 border border-slate-700">{alg.name}</td>
                <td className="py-2 px-4 border border-slate-700">{alg.complexity}</td>
                <td className="py-2 px-4 border border-slate-700">{alg.purpose}</td>
                <td className="py-2 px-4 border border-slate-700">{alg.app}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
