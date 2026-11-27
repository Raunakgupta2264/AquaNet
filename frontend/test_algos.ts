import { runKMP, runZFunction, runRabinKarp, runAhoCorasick } from './src/algorithms/strings';
import { buildSuffixArray, buildLCPArray } from './src/algorithms/suffix';
import { levenshteinDistance, damerauLevenshteinDistance, matrixChainMultiplication, optimalBST, tspBitmask } from './src/algorithms/dp';
import { edmondsKarp, dinic, bipartiteMatching } from './src/algorithms/network';
import { vertexCoverGreedy } from './src/algorithms/np';
import { randomizedQuickSort, reservoirSampling, millerRabin, blellochScan, parallelReduce } from './src/algorithms/random_parallel';

function assert(condition: boolean, msg: string) {
    if (!condition) throw new Error(msg);
}

try {
    console.log("--- Strings ---");
    console.log("KMP: ", runKMP("hello world", "world").result);
    console.log("Z-Function: ", runZFunction("hello world", "world").result);
    console.log("Rabin-Karp: ", runRabinKarp("hello world", "world").result);
    console.log("Aho-Corasick: ", runAhoCorasick("hello world", ["hello", "world"]).result);

    console.log("--- Suffix ---");
    console.log("Suffix Array: ", buildSuffixArray("banana$").result);
    console.log("LCP Array: ", buildLCPArray("banana$").result);

    console.log("--- DP ---");
    console.log("Levenshtein: ", levenshteinDistance("kitten", "sitting").result);
    console.log("Damerau-Levenshtein: ", damerauLevenshteinDistance("kitten", "sitting").result);
    console.log("Matrix Chain: ", matrixChainMultiplication([10, 20, 30, 40, 30]).result);
    console.log("Optimal BST: ", optimalBST([10, 12, 20], [34, 8, 50]).result);
    console.log("Bitmask TSP: ", tspBitmask([[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]).result);

    console.log("--- Network Flow ---");
    const graph = [
        [0, 16, 13, 0, 0, 0],
        [0, 0, 10, 12, 0, 0],
        [0, 4, 0, 0, 14, 0],
        [0, 0, 9, 0, 0, 20],
        [0, 0, 0, 7, 0, 4],
        [0, 0, 0, 0, 0, 0]
      ];
    let adjList: any[] = Array.from({ length: 6 }, () => []);
    let adjList2: any[] = Array.from({ length: 6 }, () => []);
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (graph[i][j] > 0) {
          const forward = { to: j, capacity: graph[i][j], flow: 0, rev: null as any };
          const backward = { to: i, capacity: 0, flow: 0, rev: forward };
          forward.rev = backward;
          adjList[i].push(forward);
          adjList[j].push(backward);

          const forward2 = { to: j, capacity: graph[i][j], flow: 0, rev: null as any };
          const backward2 = { to: i, capacity: 0, flow: 0, rev: forward2 };
          forward2.rev = backward2;
          adjList2[i].push(forward2);
          adjList2[j].push(backward2);
        }
      }
    }
    console.log("Edmonds-Karp: ", edmondsKarp(adjList as any, 0, 5).result);
    console.log("Dinic: ", dinic(adjList2 as any, 0, 5).result);
    
    const bipartiteGraph = [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    console.log("Bipartite Matching: ", bipartiteMatching(bipartiteGraph).result);

    console.log("--- NP ---");
    const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]];
    console.log("Vertex Cover: ", vertexCoverGreedy(4, edges).result);

    console.log("--- Random/Parallel ---");
    console.log("Rand QuickSort: ", randomizedQuickSort([4, 2, 8, 5, 1]).result);
    console.log("Reservoir Sampling: ", reservoirSampling([1,2,3,4,5,6,7,8,9,10], 3).result.length);
    console.log("Miller-Rabin (97): ", millerRabin(97, 5).result);
    console.log("Blelloch Scan: ", blellochScan([3, 1, 7, 0, 4, 1, 6, 3]).result);
    console.log("Parallel Reduce: ", parallelReduce([3, 1, 7, 0, 4, 1, 6, 3]).result);

} catch (e) {
    console.error(e);
}
