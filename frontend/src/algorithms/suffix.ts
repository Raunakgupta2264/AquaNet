import { AlgorithmResult, AlgorithmStep } from './types';

// 1. Suffix Array (Naive Sorting)
export function buildSuffixArray(text: string): AlgorithmResult {
  const steps: AlgorithmStep[] = [];
  const n = text.length;
  
  steps.push({
    description: `Starting suffix array construction for text: "${text}"`,
    state: { text }
  });

  const suffixes: { index: number, suffix: string }[] = [];
  for (let i = 0; i < n; i++) {
    suffixes.push({ index: i, suffix: text.slice(i) });
  }

  steps.push({
    description: `Generated all suffixes.`,
    state: { suffixes: [...suffixes] }
  });

  suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));

  const sa = suffixes.map(s => s.index);

  steps.push({
    description: `Sorted suffixes to create Suffix Array.`,
    state: { sa, suffixes }
  });

  return {
    steps,
    result: sa,
    timeComplexity: 'O(N^2 log N)',
    spaceComplexity: 'O(N^2)',
    comparisons: 0
  };
}

// 2. LCP Array (Kasai's algorithm)
export function buildLCPArray(text: string, sa?: number[]): AlgorithmResult {
  const steps: AlgorithmStep[] = [];
  const n = text.length;
  
  if (!sa) {
    sa = buildSuffixArray(text).result as number[];
  }

  const lcp = new Array(n).fill(0);
  const invSA = new Array(n).fill(0);

  steps.push({
    description: `Starting Kasai's algorithm for LCP Array construction.`,
    state: { text, sa, lcp, invSA }
  });

  for (let i = 0; i < n; i++) {
    invSA[sa[i]] = i;
  }

  steps.push({
    description: `Constructed inverse Suffix Array.`,
    state: { invSA: [...invSA] }
  });

  let k = 0;
  for (let i = 0; i < n; i++) {
    if (invSA[i] === n - 1) {
      k = 0;
      continue;
    }

    const j = sa[invSA[i] + 1];
    while (i + k < n && j + k < n && text[i + k] === text[j + k]) {
      k++;
    }
    
    lcp[invSA[i]] = k;
    
    steps.push({
      description: `Calculated LCP for suffix starting at index ${i} with suffix at index ${j}, length ${k}.`,
      state: { lcp: [...lcp], i, j, k }
    });

    if (k > 0) {
      k--;
    }
  }

  return {
    steps,
    result: lcp,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)'
  };
}

// 3. Suffix Automaton
export function buildSuffixAutomaton(text: string): AlgorithmResult {
  const steps: AlgorithmStep[] = [];
  
  class State {
    len: number;
    link: number;
    next: Record<string, number>;
    
    constructor(len = 0, link = -1) {
      this.len = len;
      this.link = link;
      this.next = {};
    }
  }
  
  const st: State[] = [new State()];
  let sz = 1;
  let last = 0;
  
  steps.push({
    description: `Initialized Suffix Automaton with root state.`,
    state: { st: JSON.parse(JSON.stringify(st)), sz, last }
  });
  
  const extend = (c: string) => {
    const cur = sz++;
    st.push(new State(st[last].len + 1));
    let p = last;
    
    steps.push({
      description: `Adding character '${c}' (state ${cur})`,
      state: { cur, p }
    });

    while (p !== -1 && !st[p].next[c]) {
      st[p].next[c] = cur;
      p = st[p].link;
    }
    
    if (p === -1) {
      st[cur].link = 0;
      steps.push({
        description: `No transitions for '${c}' found in suffix path. Link of ${cur} set to 0.`,
        state: { st: JSON.parse(JSON.stringify(st)) }
      });
    } else {
      const q = st[p].next[c];
      if (st[p].len + 1 === st[q].len) {
        st[cur].link = q;
        steps.push({
          description: `Found contiguous transition. Link of ${cur} set to ${q}.`,
          state: { st: JSON.parse(JSON.stringify(st)) }
        });
      } else {
        const clone = sz++;
        st.push(new State(st[p].len + 1, st[q].link));
        st[clone].next = { ...st[q].next };
        
        steps.push({
          description: `Found non-contiguous transition. Creating clone state ${clone}.`,
          state: { st: JSON.parse(JSON.stringify(st)) }
        });

        while (p !== -1 && st[p].next[c] === q) {
          st[p].next[c] = clone;
          p = st[p].link;
        }
        st[q].link = st[cur].link = clone;
        
        steps.push({
          description: `Redirected transitions to clone state ${clone}.`,
          state: { st: JSON.parse(JSON.stringify(st)) }
        });
      }
    }
    last = cur;
  };
  
  for (let i = 0; i < text.length; i++) {
    extend(text[i]);
  }
  
  steps.push({
    description: `Finished building Suffix Automaton.`,
    state: { st: JSON.parse(JSON.stringify(st)) }
  });
  
  return {
    steps,
    result: st,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N * |Sigma|)'
  };
}
