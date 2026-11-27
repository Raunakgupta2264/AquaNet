import { AlgorithmResult, AlgorithmStep } from './types';

// Network Flow Graph Representation
export interface Edge {
    to: number;
    capacity: number;
    flow: number;
    rev?: Edge; // Reference to reverse edge for residual graph
}

export type AdjacencyList = Edge[][];

// Helper to add edges to the network
export function addEdge(adj: AdjacencyList, u: number, v: number, capacity: number): void {
    const forward: Edge = { to: v, capacity: capacity, flow: 0 };
    const backward: Edge = { to: u, capacity: 0, flow: 0 };
    forward.rev = backward;
    backward.rev = forward;
    adj[u].push(forward);
    adj[v].push(backward);
}

// Complexities:
// Edmonds-Karp: Time Complexity: O(V * E^2), Space Complexity: O(V + E)
// Dinic's Algorithm: Time Complexity: O(V^2 * E), Space Complexity: O(V + E)
// Bipartite Matching: Time Complexity: O(V * E), Space Complexity: O(V + E)

export function edmondsKarp(adj: AdjacencyList, source: number, sink: number): AlgorithmResult<number> {
    const steps: AlgorithmStep[] = [];
    let maxFlow = 0;
    const n = adj.length;

    while (true) {
        const parent = new Array<Edge | null>(n).fill(null);
        const parentNode = new Array<number>(n).fill(-1);
        const queue: number[] = [source];
        
        while (queue.length > 0) {
            const u = queue.shift()!;
            if (u === sink) break;
            
            for (const edge of adj[u]) {
                if (edge.capacity - edge.flow > 0 && parentNode[edge.to] === -1 && edge.to !== source) {
                    parentNode[edge.to] = u;
                    parent[edge.to] = edge;
                    queue.push(edge.to);
                }
            }
        }

        if (parentNode[sink] === -1) {
            break; // No augmenting path
        }

        let pushFlow = Infinity;
        let curr = sink;
        while (curr !== source) {
            const edge = parent[curr]!;
            pushFlow = Math.min(pushFlow, edge.capacity - edge.flow);
            curr = parentNode[curr];
        }

        curr = sink;
        while (curr !== source) {
            const edge = parent[curr]!;
            edge.flow += pushFlow;
            edge.rev!.flow -= pushFlow;
            curr = parentNode[curr];
        }

        maxFlow += pushFlow;
        steps.push({
            description: `Pushed ${pushFlow} flow through an augmenting path`,
            state: { flow: maxFlow }
        });
    }

    return {
        result: maxFlow,
        steps,
        complexities: {
            time: "O(V * E^2)",
            space: "O(V + E)"
        }
    };
}

export function dinic(adj: AdjacencyList, source: number, sink: number): AlgorithmResult<number> {
    const steps: AlgorithmStep[] = [];
    let maxFlow = 0;
    const n = adj.length;
    let level: number[] = [];

    const bfs = (): boolean => {
        level = new Array(n).fill(-1);
        level[source] = 0;
        const queue: number[] = [source];

        while (queue.length > 0) {
            const u = queue.shift()!;
            for (const edge of adj[u]) {
                if (edge.capacity - edge.flow > 0 && level[edge.to] === -1) {
                    level[edge.to] = level[u] + 1;
                    queue.push(edge.to);
                }
            }
        }
        return level[sink] !== -1;
    };

    const dfs = (u: number, pushed: number, start: number[]): number => {
        if (pushed === 0) return 0;
        if (u === sink) return pushed;

        for (let i = start[u]; i < adj[u].length; i++) {
            start[u] = i;
            const edge = adj[u][i];
            
            if (level[u] + 1 !== level[edge.to] || edge.capacity - edge.flow === 0) {
                continue;
            }

            const tr = dfs(edge.to, Math.min(pushed, edge.capacity - edge.flow), start);
            if (tr === 0) continue;

            edge.flow += tr;
            edge.rev!.flow -= tr;
            return tr;
        }
        return 0;
    };

    while (bfs()) {
        const start = new Array(n).fill(0);
        steps.push({
            description: `Built level graph`,
            state: { level: [...level] }
        });
        
        while (true) {
            const pushed = dfs(source, Infinity, start);
            if (pushed === 0) break;
            maxFlow += pushed;
            steps.push({
                description: `Pushed ${pushed} flow`,
                state: { flow: maxFlow }
            });
        }
    }

    return {
        result: maxFlow,
        steps,
        complexities: {
            time: "O(V^2 * E)",
            space: "O(V + E)"
        }
    };
}

// Bipartite Matching using Ford-Fulkerson (DFS-based augmentation)
// Given a boolean matrix where adjMatrix[u][v] = true means u in set A is connected to v in set B
export function bipartiteMatching(graph: boolean[][]): AlgorithmResult<number> {
    const steps: AlgorithmStep[] = [];
    const m = graph.length;
    if (m === 0) {
        return { result: 0, steps, complexities: { time: "O(V * E)", space: "O(V)" } };
    }
    const n = graph[0].length;
    const match = new Array(n).fill(-1);

    const dfs = (u: number, visited: boolean[]): boolean => {
        for (let v = 0; v < n; v++) {
            if (graph[u][v] && !visited[v]) {
                visited[v] = true;
                if (match[v] === -1 || dfs(match[v], visited)) {
                    match[v] = u;
                    return true;
                }
            }
        }
        return false;
    };

    let result = 0;
    for (let u = 0; u < m; u++) {
        const visited = new Array(n).fill(false);
        if (dfs(u, visited)) {
            result++;
            steps.push({
                description: `Matched vertex ${u} from set A`,
                state: { match: [...match] }
            });
        }
    }

    return {
        result,
        steps,
        complexities: {
            time: "O(V * E)",
            space: "O(V + E)"
        }
    };
}
