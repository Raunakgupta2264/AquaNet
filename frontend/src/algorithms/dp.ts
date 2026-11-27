import { AlgorithmResult, AlgorithmStep } from './types';

// 1. Levenshtein Distance
export function levenshteinDistance(s1: string, s2: string): AlgorithmResult {
    const m = s1.length;
    const n = s2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const steps: AlgorithmStep[] = [];

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    steps.push({ description: 'Initialize DP table for Levenshtein Distance', state: JSON.parse(JSON.stringify(dp)) });

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            }
        }
        steps.push({ description: `Calculated row ${i}`, state: JSON.parse(JSON.stringify(dp)) });
    }

    return {
        name: 'Levenshtein Distance',
        result: dp[m][n],
        steps,
        complexities: {
            time: 'O(m * n)',
            space: 'O(m * n)'
        }
    };
}

// 2. Damerau-Levenshtein Distance
export function damerauLevenshteinDistance(s1: string, s2: string): AlgorithmResult {
    const m = s1.length;
    const n = s2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const steps: AlgorithmStep[] = [];

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    steps.push({ description: 'Initialize DP table for Damerau-Levenshtein Distance', state: JSON.parse(JSON.stringify(dp)) });

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,     // deletion
                dp[i][j - 1] + 1,     // insertion
                dp[i - 1][j - 1] + cost // substitution
            );
            
            if (i > 1 && j > 1 && s1[i - 1] === s2[j - 2] && s1[i - 2] === s2[j - 1]) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost); // transposition
            }
        }
        steps.push({ description: `Calculated row ${i}`, state: JSON.parse(JSON.stringify(dp)) });
    }

    return {
        name: 'Damerau-Levenshtein Distance',
        result: dp[m][n],
        steps,
        complexities: {
            time: 'O(m * n)',
            space: 'O(m * n)'
        }
    };
}

// 3. Matrix Chain Multiplication
export function matrixChainMultiplication(p: number[]): AlgorithmResult {
    const n = p.length - 1;
    const m: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    const s: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    const steps: AlgorithmStep[] = [];

    for (let i = 1; i <= n; i++) {
        m[i][i] = 0;
    }
    
    steps.push({ description: 'Initialize DP table', state: { m: JSON.parse(JSON.stringify(m)), s: JSON.parse(JSON.stringify(s)) } });

    for (let l = 2; l <= n; l++) {
        for (let i = 1; i <= n - l + 1; i++) {
            const j = i + l - 1;
            m[i][j] = Infinity;
            for (let k = i; k <= j - 1; k++) {
                const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (q < m[i][j]) {
                    m[i][j] = q;
                    s[i][j] = k;
                }
            }
        }
        steps.push({ description: `Calculated chains of length ${l}`, state: { m: JSON.parse(JSON.stringify(m)), s: JSON.parse(JSON.stringify(s)) } });
    }

    return {
        name: 'Matrix Chain Multiplication',
        result: m[1][n],
        steps,
        complexities: {
            time: 'O(n^3)',
            space: 'O(n^2)'
        }
    };
}

// 4. Optimal Binary Search Tree
export function optimalBST(keys: number[], freq: number[]): AlgorithmResult {
    const n = keys.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    const w: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    const steps: AlgorithmStep[] = [];

    for (let i = 0; i < n; i++) {
        dp[i][i] = freq[i];
        w[i][i] = freq[i];
    }

    steps.push({ description: 'Initialize DP table', state: JSON.parse(JSON.stringify(dp)) });

    for (let l = 2; l <= n; l++) {
        for (let i = 0; i <= n - l; i++) {
            const j = i + l - 1;
            dp[i][j] = Infinity;
            
            w[i][j] = w[i][j - 1] + freq[j];
            
            for (let r = i; r <= j; r++) {
                const c = (r > i ? dp[i][r - 1] : 0) + (r < j ? dp[r + 1][j] : 0) + w[i][j];
                if (c < dp[i][j]) {
                    dp[i][j] = c;
                }
            }
        }
        steps.push({ description: `Calculated chains of length ${l}`, state: JSON.parse(JSON.stringify(dp)) });
    }

    return {
        name: 'Optimal BST',
        result: dp[0][n - 1],
        steps,
        complexities: {
            time: 'O(n^3)',
            space: 'O(n^2)'
        }
    };
}

// 5. Bitmask DP Example: TSP for small graphs
export function tspBitmask(graph: number[][]): AlgorithmResult {
    const n = graph.length;
    if (n === 0) {
        return { name: 'TSP', result: 0, steps: [], complexities: { time: 'O(1)', space: 'O(1)' } };
    }
    const VISITED_ALL = (1 << n) - 1;
    const dp: number[][] = Array.from({ length: 1 << n }, () => Array(n).fill(Infinity));
    const steps: AlgorithmStep[] = [];

    dp[1][0] = 0; // Start at node 0

    steps.push({ description: 'Initialize DP table for TSP', state: JSON.parse(JSON.stringify(dp)) });

    for (let mask = 1; mask < (1 << n); mask++) {
        for (let u = 0; u < n; u++) {
            if ((mask & (1 << u)) === 0) continue;
            
            for (let v = 0; v < n; v++) {
                if ((mask & (1 << v)) !== 0 || graph[u][v] === Infinity) continue;
                
                const nextMask = mask | (1 << v);
                dp[nextMask][v] = Math.min(dp[nextMask][v], dp[mask][u] + graph[u][v]);
            }
        }
        if (mask % Math.max(1, Math.floor((1 << n) / 4)) === 0) {
            steps.push({ description: `Calculated up to mask ${mask}`, state: JSON.parse(JSON.stringify(dp)) });
        }
    }
    
    let ans = Infinity;
    for (let i = 1; i < n; i++) {
        ans = Math.min(ans, dp[VISITED_ALL][i] + graph[i][0]);
    }

    steps.push({ description: 'Final TSP result computed', state: JSON.parse(JSON.stringify(dp)) });

    return {
        name: 'TSP (Bitmask DP)',
        result: ans,
        steps,
        complexities: {
            time: 'O(n^2 * 2^n)',
            space: 'O(n * 2^n)'
        }
    };
}
