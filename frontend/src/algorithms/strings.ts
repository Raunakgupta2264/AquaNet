import { AlgorithmResult, AlgorithmStep } from './types';

export function runKMP(text: string, pattern: string): AlgorithmResult {
    const steps: AlgorithmStep[] = [];
    const n = text.length;
    const m = pattern.length;
    const lps = new Array(m).fill(0);
    const matches: number[] = [];

    if (m === 0) {
        return { steps, result: matches, matches, timeComplexity: 'O(N+M)', spaceComplexity: 'O(M)' };
    }

    steps.push({ description: 'Building LPS array', state: { lps: [...lps] } });
    let len = 0;
    let i = 1;
    while (i < m) {
        steps.push({ description: `LPS: comparing pattern[${i}] (${pattern[i]}) with pattern[${len}] (${pattern[len]})`, state: { i, len, lps: [...lps] } });
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            steps.push({ description: `Match found, lps[${i}] = ${len}`, state: { i, len, lps: [...lps] } });
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
                steps.push({ description: `Mismatch, fallback len to ${len}`, state: { i, len, lps: [...lps] } });
            } else {
                lps[i] = 0;
                steps.push({ description: `Mismatch, lps[${i}] = 0`, state: { i, len, lps: [...lps] } });
                i++;
            }
        }
    }

    i = 0; 
    let j = 0; 
    while (n - i >= m - j) {
        steps.push({ description: `Search: comparing text[${i}] (${text[i]}) with pattern[${j}] (${pattern[j]})`, state: { i, j, matches: [...matches] } });
        if (pattern[j] === text[i]) {
            j++;
            i++;
        }
        if (j === m) {
            matches.push(i - j);
            steps.push({ description: `Pattern found at index ${i - j}`, state: { i, j, matches: [...matches] } });
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
                steps.push({ description: `Mismatch, shift pattern using LPS to j=${j}`, state: { i, j, matches: [...matches] } });
            } else {
                i++;
                steps.push({ description: `Mismatch, move to next text character`, state: { i, j, matches: [...matches] } });
            }
        }
    }

    return { steps, result: matches, matches, timeComplexity: 'O(N+M)', spaceComplexity: 'O(M)' };
}

export function runZFunction(text: string, pattern: string): AlgorithmResult {
    const steps: AlgorithmStep[] = [];
    const matches: number[] = [];
    
    if (pattern.length === 0) {
        return { steps, result: matches, matches, timeComplexity: 'O(N+M)', spaceComplexity: 'O(N+M)' };
    }

    const concat = pattern + '$' + text;
    const l = concat.length;
    const Z = new Array(l).fill(0);
    
    steps.push({ description: `Created concatenated string: ${concat}`, state: { concat, Z: [...Z] } });

    let L = 0, R = 0;
    for (let i = 1; i < l; i++) {
        if (i > R) {
            L = R = i;
            while (R < l && concat[R - L] === concat[R]) {
                R++;
            }
            Z[i] = R - L;
            R--;
        } else {
            let k = i - L;
            if (Z[k] < R - i + 1) {
                Z[i] = Z[k];
            } else {
                L = i;
                while (R < l && concat[R - L] === concat[R]) {
                    R++;
                }
                Z[i] = R - L;
                R--;
            }
        }
        steps.push({ description: `Computed Z[${i}] = ${Z[i]}`, state: { i, L, R, Z: [...Z] } });
    }

    for (let i = 0; i < l; i++) {
        if (Z[i] === pattern.length) {
            const matchIndex = i - pattern.length - 1;
            matches.push(matchIndex);
            steps.push({ description: `Match found at index ${matchIndex}`, state: { i, matches: [...matches] } });
        }
    }

    return { steps, result: matches, matches, timeComplexity: 'O(N+M)', spaceComplexity: 'O(N+M)' };
}

export function runRabinKarp(text: string, pattern: string): AlgorithmResult {
    const steps: AlgorithmStep[] = [];
    const matches: number[] = [];
    const d = 256;
    const q = 101; 

    const n = text.length;
    const m = pattern.length;

    if (m === 0 || n < m) {
        return { steps, result: matches, matches, timeComplexity: 'O(N+M) average, O(N*M) worst', spaceComplexity: 'O(1)' };
    }

    let p = 0; 
    let t = 0; 
    let h = 1;

    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    steps.push({ description: `Initial hashes computed. Pattern hash: ${p}, Window hash: ${t}`, state: { p, t, matches: [...matches] } });

    for (let i = 0; i <= n - m; i++) {
        steps.push({ description: `Checking window at index ${i}, hash: ${t}`, state: { i, p, t, matches: [...matches] } });
        if (p === t) {
            let match = true;
            for (let j = 0; j < m; j++) {
                steps.push({ description: `Hash match, comparing characters text[${i+j}] and pattern[${j}]`, state: { i, j, matches: [...matches] } });
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                matches.push(i);
                steps.push({ description: `Pattern found at index ${i}`, state: { i, matches: [...matches] } });
            }
        }

        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) {
                t = t + q;
            }
            steps.push({ description: `Slid window, new text hash: ${t}`, state: { i, t, matches: [...matches] } });
        }
    }

    return { steps, result: matches, matches, timeComplexity: 'O(N+M) average, O(N*M) worst', spaceComplexity: 'O(1)' };
}

export function runAhoCorasick(text: string, patterns: string[]): AlgorithmResult {
    const steps: AlgorithmStep[] = [];
    const matches: { pattern: string, index: number }[] = [];

    class TrieNode {
        children: { [key: string]: TrieNode } = {};
        fail: TrieNode | null = null;
        output: string[] = [];
    }

    const root = new TrieNode();

    steps.push({ description: 'Building Trie with patterns', state: { patterns } });
    for (const pattern of patterns) {
        let curr = root;
        for (const char of pattern) {
            if (!curr.children[char]) {
                curr.children[char] = new TrieNode();
            }
            curr = curr.children[char];
        }
        curr.output.push(pattern);
    }

    steps.push({ description: 'Building Failure Links via BFS', state: {} });
    const queue: TrieNode[] = [];
    for (const key in root.children) {
        const child = root.children[key];
        child.fail = root;
        queue.push(child);
    }

    while (queue.length > 0) {
        const curr = queue.shift()!;
        for (const key in curr.children) {
            const child = curr.children[key];
            queue.push(child);

            let failNode = curr.fail;
            while (failNode !== null && !failNode.children[key]) {
                failNode = failNode.fail;
            }
            child.fail = failNode ? failNode.children[key] : root;
            if (child.fail) {
                child.output = child.output.concat(child.fail.output);
            }
        }
    }

    steps.push({ description: 'Searching text using Aho-Corasick automaton', state: { text } });
    let curr = root;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        while (curr !== root && !curr.children[char]) {
            curr = curr.fail!;
        }
        curr = curr.children[char] || root;

        for (const pattern of curr.output) {
            const index = i - pattern.length + 1;
            matches.push({ pattern, index });
            steps.push({ description: `Pattern '${pattern}' found at index ${index}`, state: { i, pattern, index, matches: [...matches] } });
        }
    }

    return { steps, result: matches, matches, timeComplexity: 'O(N + M + Z)', spaceComplexity: 'O(M * K)' };
}
