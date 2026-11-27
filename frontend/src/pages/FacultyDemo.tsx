import React, { useState } from 'react';
import { BookOpen, Code, Layers, Share2, Shield, Activity, Map, Cpu, Zap, Database } from 'lucide-react';

export function FacultyDemo() {
  const [demoStep, setDemoStep] = useState(0);

  const sections = [
    { title: "Problem Statement", icon: <BookOpen className="w-6 h-6" /> },
    { title: "AquaNet Architecture", icon: <Layers className="w-6 h-6" /> },
    { title: "DSA Mapping Table", icon: <Map className="w-6 h-6" /> },
    { title: "M1: String Algorithms", icon: <Code className="w-6 h-6" /> },
    { title: "M2: Suffix Structures", icon: <Database className="w-6 h-6" /> },
    { title: "M3: Dynamic Programming", icon: <Cpu className="w-6 h-6" /> },
    { title: "M4: Network Flow", icon: <Share2 className="w-6 h-6" /> },
    { title: "M5: NP & Approximation", icon: <Shield className="w-6 h-6" /> },
    { title: "M6: Randomized & Parallel", icon: <Zap className="w-6 h-6" /> }
  ];

  const handleNext = () => setDemoStep((prev) => Math.min(prev + 1, sections.length - 1));
  const handlePrev = () => setDemoStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center bg-slate-900 p-6 rounded-xl border border-aqua shadow-lg shadow-aqua/10">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-aqua" />
            DSA Implementation & AquaNet Applications
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Faculty Demonstration Mode: A structured overview connecting Academic Java to Interactive Visualizations.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button onClick={handlePrev} disabled={demoStep === 0} className="btn bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50">Previous</button>
            <button onClick={handleNext} disabled={demoStep === sections.length - 1} className="btn bg-aqua text-darkblue disabled:opacity-50">Next Step</button>
          </div>
          <p className="text-xs text-right text-slate-500">Step {demoStep + 1} of {sections.length}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4">
        {sections.map((sec, idx) => (
          <button
            key={idx}
            onClick={() => setDemoStep(idx)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              demoStep === idx ? 'bg-aqua text-darkblue font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {sec.icon} {sec.title}
          </button>
        ))}
      </div>

      <div className="card bg-slate-900 border-slate-700 min-h-[500px]">
        {demoStep === 0 && <ProblemStatement />}
        {demoStep === 1 && <Architecture />}
        {demoStep === 2 && <DSAMapping />}
        {demoStep === 3 && <Module1 />}
        {demoStep === 4 && <Module2 />}
        {demoStep === 5 && <Module3 />}
        {demoStep === 6 && <Module4 />}
        {demoStep === 7 && <Module5 />}
        {demoStep === 8 && <Module6 />}
      </div>
    </div>
  );
}

function ProblemStatement() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">1. AquaNet Problem Statement</h2>
      <div className="bg-slate-800 p-6 rounded-lg text-slate-300 text-lg leading-relaxed">
        <p>
          Water management systems face exponential computational challenges in rapid contamination detection, efficient pipeline flow optimization, dynamic resource allocation, and resolving conflicting maintenance schedules.
        </p>
        <p className="mt-4">
          <strong>The core question:</strong> "Where have you implemented the DSA concepts mentioned in the problem statement, and how are you applying those concepts to the AquaNet problem?"
        </p>
      </div>

      <h3 className="text-xl font-bold text-aqua mt-8">Why DSA?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <WhyCard title="String Algorithms" desc="Search contamination information efficiently across thousands of reports." />
        <WhyCard title="Suffix Structures" desc="Index and query large historical reports in sub-linear time." />
        <WhyCard title="Dynamic Programming" desc="Optimize decisions and correct human data entry errors automatically." />
        <WhyCard title="Network Flow" desc="Optimize real-world water distribution across the physical pipeline grid." />
        <WhyCard title="NP Approximation" desc="Handle computationally difficult infrastructure maintenance constraints." />
        <WhyCard title="Randomized & Parallel" desc="Process massive, continuous IoT sensor streams efficiently." />
      </div>

      <div className="bg-blue-900/20 border border-blue-500/50 p-6 rounded-lg mt-8">
        <h4 className="text-blue-400 font-bold mb-2">Java ↔ TypeScript Relationship</h4>
        <p className="text-slate-300">
          <strong>Java:</strong> Acts as the pure Academic/Reference implementation of the DSA concept, compiled natively on the backend. <br />
          <strong>TypeScript:</strong> Provides the Interactive browser implementation used to visualize the algorithm step-by-step for the user. Both represent the exact same computational core.
        </p>
      </div>
    </div>
  );
}

function WhyCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg">
      <h4 className="text-white font-bold">{title}</h4>
      <p className="text-slate-400 text-sm mt-1">{desc}</p>
    </div>
  );
}

function Architecture() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">2. AquaNet Data Flow Architecture</h2>
      <pre className="bg-slate-950 p-6 rounded-lg border border-slate-800 text-cyan-400 font-mono text-sm overflow-x-auto leading-relaxed">
{`
          Water Sensors & IoT Devices
                      │
                      ▼
               Raw Water Data
                      │
                      ▼
        ┌────────────────────────────┐
        │       AquaNet Engine       │
        ├────────────────────────────┤
        │ String Algorithms          │
        │ Suffix Structures          │
        │ Dynamic Programming        │
        │ Network Flow               │
        │ NP Approximation           │
        │ Randomized/Parallel        │
        └─────────────┬──────────────┘
                      │
                      ▼
             Computational Analysis
                      │
                      ▼
     Alerts / Flow Optimization / Scheduling
`}
      </pre>
    </div>
  );
}

function DSAMapping() {
  const map = [
    { mod: "M1", algo: "KMP, Z, Rabin, Aho", java: "KMP.java, etc.", ts: "strings.ts", app: "Search contamination terms", comp: "O(N+M)", space: "O(M)" },
    { mod: "M2", algo: "Suffix Array, LCP, Tree*", java: "SuffixArray.java", ts: "suffix.ts", app: "Index & query large reports", comp: "O(N log N)", space: "O(N)" },
    { mod: "M3", algo: "Levenshtein, MCM, BST, TSP", java: "Levenshtein.java, etc.", ts: "dp.ts", app: "Error correction, Route opt", comp: "O(N*M)", space: "O(N*M)" },
    { mod: "M4", algo: "Edmonds-Karp, Dinic, Bipartite", java: "Dinic.java, etc.", ts: "network.ts", app: "Max flow, Operator assignment", comp: "O(V^2 E)", space: "O(V+E)" },
    { mod: "M5", algo: "Vertex Cover Approx, 3-SAT*", java: "VertexCover.java", ts: "np.ts", app: "Resolve infrastructure conflicts", comp: "O(V+E)", space: "O(V)" },
    { mod: "M6", algo: "QuickSort, Reservoir, Blelloch", java: "BlellochScan.java, etc.", ts: "random_parallel.ts", app: "Sort demands, Sensor sampling", comp: "O(N log N)", space: "O(N)" },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">3. Complete DSA Mapping Table</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="p-3 border-b border-slate-700">Module</th>
              <th className="p-3 border-b border-slate-700">Algorithm</th>
              <th className="p-3 border-b border-slate-700">Java File</th>
              <th className="p-3 border-b border-slate-700">TS File</th>
              <th className="p-3 border-b border-slate-700">AquaNet App</th>
              <th className="p-3 border-b border-slate-700">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {map.map((r, i) => (
              <tr key={i} className="hover:bg-slate-800/50">
                <td className="p-3 text-aqua font-bold">{r.mod}</td>
                <td className="p-3 text-white">{r.algo}</td>
                <td className="p-3 text-slate-400 font-mono text-xs">{r.java}</td>
                <td className="p-3 text-slate-400 font-mono text-xs">{r.ts}</td>
                <td className="p-3 text-slate-300">{r.app}</td>
                <td className="p-3 text-green-400 font-mono">{r.comp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 italic">* Asterisk indicates conceptual/theoretical demonstration rather than full production algorithm.</p>
    </div>
  );
}

function AlgoBlock({ title, concept, java, app, why, input, output, time, space, steps }: any) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start border-b border-slate-700 pb-2">
        <h3 className="text-xl font-bold text-aqua">{title}</h3>
        <span className="bg-slate-800 border border-slate-600 px-3 py-1 rounded text-xs text-slate-300 font-mono">{java}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">DSA Concept</p>
          <p className="text-white mb-4">{concept}</p>
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">AquaNet Application</p>
          <p className="text-white mb-4">{app}</p>
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Why Useful?</p>
          <p className="text-white text-sm">{why}</p>
        </div>
        <div className="bg-slate-900 p-4 rounded border border-slate-800 font-mono text-sm space-y-3">
          <div>
            <span className="text-slate-500">Input:</span> <span className="text-cyan-400">"{input}"</span>
          </div>
          <div>
            <span className="text-slate-500">Execution:</span>
            <ul className="text-slate-400 mt-1 pl-4 list-disc text-xs space-y-1">
              {steps.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <span className="text-slate-500">Output:</span> <span className="text-green-400">{output}</span>
          </div>
          <div className="flex gap-4 pt-2 border-t border-slate-800 mt-2">
            <div><span className="text-slate-500 text-xs">Time:</span> <span className="text-yellow-400">{time}</span></div>
            <div><span className="text-slate-500 text-xs">Space:</span> <span className="text-yellow-400">{space}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Module1() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">4. M1: String Algorithms</h2>
      <AlgoBlock 
        title="Knuth-Morris-Pratt (KMP)" 
        concept="String matching using Longest Prefix Suffix (LPS) array" 
        java="KMP.java" 
        app="Search water-quality reports for a specific contamination term." 
        why="Efficient single-pattern searching without backtracking." 
        input="Text: 'Water sample contains traces of lead.' | Pattern: 'lead'" 
        steps={["Build LPS array for pattern", "Scan text linearly", "Match found at index 31"]} 
        output="[31] (Contamination alert)" 
        time="O(N + M)" space="O(M)" 
      />
      <AlgoBlock 
        title="Z-Function" 
        concept="Linear time string matching using Z-array" 
        java="ZFunction.java" 
        app="Identify repeated patterns of contamination phrases." 
        why="Constructs an array representing the longest common prefix between the string and its suffixes." 
        input="Text: 'contamination report: contamination detected'" 
        steps={["Concatenate pattern$text", "Compute Z-values using interval [L, R]", "Find Z values == pattern length"]} 
        output="[0, 22]" 
        time="O(N + M)" space="O(N + M)" 
      />
      <AlgoBlock 
        title="Aho-Corasick" 
        concept="Automaton-based multiple pattern matching" 
        java="AhoCorasick.java" 
        app="Detect multiple contamination keywords simultaneously." 
        why="More suitable than running KMP separately for every keyword when scaling to hundreds of toxic metrics." 
        input="Keywords: 'lead', 'mercury', 'arsenic'" 
        steps={["Build Trie from keywords", "Compute failure links using BFS", "Scan text through automaton state machine"]} 
        output="[{'lead', 31}]" 
        time="O(N + M + Z)" space="O(M * K)" 
      />
    </div>
  );
}

function Module2() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">5. M2: Suffix Structures</h2>
      <AlgoBlock 
        title="Suffix Array" 
        concept="Lexicographically sorted array of all suffixes" 
        java="SuffixArray.java" 
        app="Index historical water-quality and infrastructure reports." 
        why="Instead of scanning the complete report repeatedly, AquaNet indexes the report to perform fast O(log N) substring queries." 
        input="banana$" 
        steps={["Generate all suffixes", "Sort suffixes lexicographically", "Store original indices"]} 
        output="[6, 5, 3, 1, 0, 4, 2]" 
        time="O(N log N)" space="O(N)" 
      />
      <AlgoBlock 
        title="LCP / Kasai" 
        concept="Longest Common Prefix Array computed in linear time" 
        java="SuffixArray.java (Kasai)" 
        app="Identify repeated contamination descriptions across massive text logs." 
        why="Finds the longest repeated substring (e.g. standard boilerplate vs actual anomalies)." 
        input="SA of 'banana$'" 
        steps={["Compute Inverse SA", "Iterate through text computing matching prefixes", "Store in LCP array"]} 
        output="[0, 1, 3, 0, 0, 2, 0]" 
        time="O(N)" space="O(N)" 
      />
      <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded text-blue-300 text-sm">
        <strong>* Note on SA-IS, Suffix Tree, Suffix Automaton:</strong> Implemented conceptually in the TS Visualizer to demonstrate theoretical O(N) alphabet-independent construction, but native Java maps primary indexing via Suffix Array + LCP.
      </div>
    </div>
  );
}

function Module3() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">6. M3: Advanced Dynamic Programming</h2>
      <AlgoBlock 
        title="Levenshtein Distance" 
        concept="Minimum edit distance (Insert, Delete, Replace)" 
        java="Levenshtein.java" 
        app="Correct misspelled water-quality entries from manual operator input." 
        why="Data integrity requires fuzzy matching. Prevents 'arsenik' from bypassing 'arsenic' filters." 
        input="'arsenik' vs 'arsenic'" 
        steps={["Initialize DP matrix", "Compute min(insert, delete, replace) for each char pair", "Traceback for optimal operations"]} 
        output="Distance = 1 (Replace k with c)" 
        time="O(N * M)" space="O(N * M)" 
      />
      <AlgoBlock 
        title="Matrix Chain Multiplication" 
        concept="Optimal parenthesization for matrix multiplication" 
        java="MatrixChain.java" 
        app="Optimize a sequence of water-data analysis operations (Sensor × Quality × Demand matrices)." 
        why="Minimizes scalar multiplications in heavy data pipelines." 
        input="Dimensions: [10, 20, 30, 40, 30]" 
        steps={["Build DP table for cost[i][j]", "Compute optimal split point k", "Result represents min multiplications"]} 
        output="30000 operations" 
        time="O(N^3)" space="O(N^2)" 
      />
      <AlgoBlock 
        title="Bitmask DP (TSP)" 
        concept="DP over subsets using bitwise representations" 
        java="BitmaskDP.java" 
        app="Select optimal combinations of treatment resources (Filter, UV, RO) while minimizing cost/time." 
        why="Solves NP-hard combination constraints efficiently for small resource pools (N < 20)." 
        input="Cost adjacency matrix for 4 treatment types" 
        steps={["Initialize DP[mask][i]", "Iterate masks 0 to 2^N", "Update min cost crossing unvisited nodes"]} 
        output="Minimum Cost = 80" 
        time="O(N^2 * 2^N)" space="O(N * 2^N)" 
      />
    </div>
  );
}

function Module4() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">7. M4: Network Flow</h2>
      <AlgoBlock 
        title="Edmonds-Karp (Max Flow)" 
        concept="Ford-Fulkerson implementation using BFS" 
        java="EdmondsKarp.java" 
        app="Computes maximum water flow through the pipeline network from Reservoir to Consumer." 
        why="Systematic BFS guarantees shortest augmenting path, ensuring O(V E^2) termination." 
        input="6-Node AquaNet Graph" 
        steps={["Find augmenting path using BFS", "Update residual capacities", "Add path flow to Max Flow"]} 
        output="23 units" 
        time="O(V * E^2)" space="O(V + E)" 
      />
      <AlgoBlock 
        title="Dinic's Algorithm" 
        concept="Blocking flow on Level Graph" 
        java="Dinic.java" 
        app="Highly efficient max water flow computation for large physical pipeline grids." 
        why="Outperforms Edmonds-Karp significantly on large infrastructure networks." 
        input="6-Node AquaNet Graph" 
        steps={["Construct Level Graph using BFS", "Find Blocking Flow using DFS", "Update Residual Graph"]} 
        output="23 units" 
        time="O(V^2 * E)" space="O(V + E)" 
      />
      <AlgoBlock 
        title="Max-Flow Min-Cut" 
        concept="Duality between maximum flow and minimum capacity cut" 
        java="EdmondsKarp.java (Min Cut Extracted)" 
        app="Identify infrastructure bottlenecks." 
        why="Finds the exact critical pipelines that restrict treatment capacity." 
        input="Residual graph after Max Flow" 
        steps={["Run BFS from source on residual graph", "Identify reachable vs unreachable nodes", "Edges crossing boundary are the Min-Cut"]} 
        output="Critical pipelines identified" 
        time="O(V + E)" space="O(V)" 
      />
    </div>
  );
}

function Module5() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">8. M5: NP-Completeness & Approximation</h2>
      <AlgoBlock 
        title="Vertex Cover 2-Approximation" 
        concept="Greedy polynomial approximation for NP-Hard problem" 
        java="VertexCover.java" 
        app="Identify a small set of critical infrastructure points that covers all conflict edges." 
        why="Provides a strict mathematical guarantee (size ≤ 2*OPT) for scheduling conflicting pipeline maintenance." 
        input="Conflict Graph: [[0,1], [1,2], [2,3], [3,0], [0,2]]" 
        steps={["Pick arbitrary edge (u,v)", "Add both to cover set", "Remove all incident edges", "Repeat"]} 
        output="Selected monitoring targets: [0, 1, 2, 3]" 
        time="O(V + E)" space="O(V)" 
      />
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 space-y-3">
        <h3 className="text-xl font-bold text-purple-400">Theoretical NP-Completeness Transformations</h3>
        <p className="text-slate-300">
          <strong>SAT / 3-SAT:</strong> Representing infrastructure constraints as Boolean conditions ("Pipe A OR Pipe B").<br/>
          <strong>3-SAT → CLIQUE:</strong> Conceptual polynomial transformation linking logical constraints to graph theory.<br/>
          <strong>CLIQUE → INDEPENDENT SET:</strong> Complement graph mapping.<br/>
          <strong>INDEPENDENT SET → VERTEX COVER:</strong> Mathematical relationship: If S is an independent set, V - S is a vertex cover.
        </p>
        <p className="text-sm text-slate-500 italic mt-2">These are theoretical educational reductions explicitly mapped in the TypeScript Visualizer.</p>
      </div>
    </div>
  );
}

function Module6() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">9. M6: Randomized & Parallel</h2>
      <AlgoBlock 
        title="Reservoir Sampling" 
        concept="Randomized algorithm for selecting k items from a stream of unknown length" 
        java="ReservoirSampling.java" 
        app="Maintains a representative random sample from millions of continuous water-sensor observations." 
        why="AquaNet cannot store every observation in memory. This ensures unbiased O(1) sampling." 
        input="Stream: [10, 20, 30... 100], k=3" 
        steps={["Store first k items", "For item i > k, pick random index 0 to i", "If random index < k, replace item"]} 
        output="[30, 80, 50] (representative sample)" 
        time="O(N)" space="O(K)" 
      />
      <AlgoBlock 
        title="Blelloch Scan" 
        concept="Parallel prefix sum" 
        java="BlellochScan.java" 
        app="Calculates cumulative water levels across zones instantly." 
        why="Enables O(log N) parallel execution time compared to O(N) sequential processing." 
        input="Hourly levels: [3, 1, 7, 0, 4, 1, 6, 3]" 
        steps={["Up-sweep (reduce) building binary tree of sums", "Set root to 0", "Down-sweep to distribute sums"]} 
        output="[0, 3, 4, 11, 11, 15, 16, 22]" 
        time="O(N) work, O(log N) span" space="O(N)" 
      />
      <AlgoBlock 
        title="Miller-Rabin Primality" 
        concept="Probabilistic primality test" 
        java="MillerRabin.java" 
        app="Algorithm demonstration for hashing massive numerical sensor identifiers." 
        why="Provides fast probabilistic identification without deterministic O(sqrt N) overhead." 
        input="Test if 97 is prime, k=5 iterations" 
        steps={["Write n-1 as d * 2^r", "Pick random base a", "Compute a^d % n", "Check composite conditions"]} 
        output="True" 
        time="O(k log^3 n)" space="O(1)" 
      />
    </div>
  );
}
