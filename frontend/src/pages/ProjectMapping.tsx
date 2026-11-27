import React from 'react';

export function ProjectMapping() {
  const mappings = [
    { module: 'User Authentication', dsa: 'Hash Functions (SHA-256, bcrypt)', aquanet: 'Secure Login', complexity: 'O(N)' },
    { module: 'Dashboard Routing', dsa: 'Trie / Radix Tree', aquanet: 'Fast client-side routing', complexity: 'O(L)' },
    { module: 'Log Analysis', dsa: 'KMP / Aho-Corasick', aquanet: 'Error log scanning', complexity: 'O(N + M)' },
    { module: 'Resource Allocation', dsa: 'Dynamic Programming / Network Flow', aquanet: 'Server load balancing', complexity: 'O(V^2 E)' },
    { module: 'Data Searching', dsa: 'Suffix Arrays', aquanet: 'Full-text search in docs', complexity: 'O(N log N)' },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Project Mapping</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-900 border border-slate-700-slate-700 text-white border border-slate-700">
          <thead className="bg-slate-800">
            <tr>
              <th className="py-2 px-4 border border-slate-700">Module</th>
              <th className="py-2 px-4 border border-slate-700">DSA Used</th>
              <th className="py-2 px-4 border border-slate-700">AquaNet Application</th>
              <th className="py-2 px-4 border border-slate-700">Complexity</th>
            </tr>
          </thead>
          <tbody>
            {mappings.map((m, idx) => (
              <tr key={idx} className="border border-slate-700-t">
                <td className="py-2 px-4 border border-slate-700">{m.module}</td>
                <td className="py-2 px-4 border border-slate-700">{m.dsa}</td>
                <td className="py-2 px-4 border border-slate-700">{m.aquanet}</td>
                <td className="py-2 px-4 border border-slate-700">{m.complexity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
