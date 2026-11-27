import { AlgorithmResult, AlgorithmStep } from './types';

export function vertexCoverGreedy(
  numVertices: number,
  edges: [number, number][]
): AlgorithmResult {
  const steps: AlgorithmStep[] = [];
  const cover = new Set<number>();
  const remainingEdges = new Set(edges.map((_, i) => i));

  steps.push({
    description: 'Initialization: Start with an empty cover and all edges remaining.',
    state: { cover: Array.from(cover), remainingEdges: remainingEdges.size }
  } as AlgorithmStep);

  while (remainingEdges.size > 0) {
    // Pick an arbitrary remaining edge
    const edgeIndex = remainingEdges.values().next().value;
    const [u, v] = edges[edgeIndex as number];

    cover.add(u);
    cover.add(v);

    steps.push({
      description: `Picked edge (${u}, ${v}). Added both ${u} and ${v} to the cover.`,
      state: { cover: Array.from(cover) }
    } as AlgorithmStep);

    // Remove all edges incident to u or v
    const toRemove: number[] = [];
    for (const i of remainingEdges) {
      const [eu, ev] = edges[i];
      if (eu === u || ev === u || eu === v || ev === v) {
        toRemove.push(i);
      }
    }

    for (const i of toRemove) {
      remainingEdges.delete(i);
    }
    
    steps.push({
      description: `Removed ${toRemove.length} edge(s) incident to ${u} or ${v}. Remaining edges: ${remainingEdges.size}.`,
      state: { remainingEdges: remainingEdges.size }
    } as AlgorithmStep);
  }

  steps.push({
    description: `Algorithm finished. Vertex cover size is ${cover.size}.`,
    state: { cover: Array.from(cover), isDone: true }
  } as AlgorithmStep);

  return {
    steps,
    result: Array.from(cover),
  };
}

export function simulateNPHardReduction(): AlgorithmResult {
  const steps: AlgorithmStep[] = [];

  steps.push({
    description: 'Step 1: 3-SAT to CLIQUE\nGiven a 3-SAT formula with k clauses, we construct a graph. For each literal in a clause, create a vertex. Connect vertices if they are in different clauses and are not negations of each other. The formula is satisfiable iff the graph has a clique of size k.',
    state: { stage: '3-SAT -> CLIQUE' }
  } as AlgorithmStep);

  steps.push({
    description: 'Step 2: CLIQUE to INDEPENDENT SET\nGiven a graph G and integer k, we find a clique of size k in G by finding an independent set of size k in the complement graph G\'. Therefore, we construct G\', the complement graph of G.',
    state: { stage: 'CLIQUE -> INDEPENDENT SET' }
  } as AlgorithmStep);

  steps.push({
    description: 'Step 3: INDEPENDENT SET to VERTEX COVER\nGiven a graph G and integer k, an independent set of size k exists iff there is a vertex cover of size |V| - k. We look for a vertex cover of size |V| - k in G.',
    state: { stage: 'INDEPENDENT SET -> VERTEX COVER' }
  } as AlgorithmStep);

  steps.push({
    description: 'Conclusion: By chaining these reductions (3-SAT -> CLIQUE -> INDEPENDENT SET -> VERTEX COVER), any 3-SAT instance can be mapped to and solved using a VERTEX COVER solver.',
    state: { stage: 'Complete' }
  } as AlgorithmStep);

  return {
    steps,
    result: 'Reduction Chain Simulation Complete',
  };
}
