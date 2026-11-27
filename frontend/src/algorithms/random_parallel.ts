import { AlgorithmResult, AlgorithmStep } from './types';

/**
 * Randomized QuickSort
 */
export function randomizedQuickSort(arr: number[]): AlgorithmResult<number[]> {
  const steps: AlgorithmStep[] = [];
  const result = [...arr];

  function swap(i: number, j: number) {
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
    steps.push({
      description: `Swapped elements at ${i} and ${j}`,
      state: [...result]
    });
  }

  function partition(low: number, high: number): number {
    const pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
    swap(pivotIndex, high);
    const pivot = result[high];
    
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (result[j] < pivot) {
        i++;
        swap(i, j);
      }
    }
    swap(i + 1, high);
    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  }

  steps.push({ description: 'Starting Randomized QuickSort', state: [...result] });
  if (result.length > 1) {
    sort(0, result.length - 1);
  }
  steps.push({ description: 'Finished QuickSort', state: [...result] });

  return {
    result,
    steps,
    complexities: {
      time: 'O(N log N) expected, O(N^2) worst',
      space: 'O(log N)'
    }
  };
}

/**
 * Reservoir Sampling
 */
export function reservoirSampling(stream: number[], k: number): AlgorithmResult<number[]> {
  const steps: AlgorithmStep[] = [];
  const reservoir: number[] = [];

  for (let i = 0; i < k && i < stream.length; i++) {
    reservoir.push(stream[i]);
  }
  
  steps.push({ description: `Initial reservoir of size ${Math.min(k, stream.length)}`, state: [...reservoir] });

  for (let i = k; i < stream.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j < k) {
      reservoir[j] = stream[i];
      steps.push({ description: `Replaced element at index ${j} with ${stream[i]} (stream index ${i})`, state: [...reservoir] });
    }
  }

  return {
    result: reservoir,
    steps,
    complexities: {
      time: 'O(N)',
      space: 'O(K)'
    }
  };
}

/**
 * Miller-Rabin Primality Test
 */
export function millerRabin(n: number, k: number = 5): AlgorithmResult<boolean> {
  const steps: AlgorithmStep[] = [];
  
  steps.push({ description: `Starting Miller-Rabin primality test for ${n}`, state: n });

  if (n <= 1) {
    steps.push({ description: `${n} is <= 1, not prime`, state: false });
    return { result: false, steps, complexities: { time: 'O(K log^3 N)', space: 'O(1)' } };
  }
  if (n <= 3) {
    steps.push({ description: `${n} is 2 or 3, prime`, state: true });
    return { result: true, steps, complexities: { time: 'O(K log^3 N)', space: 'O(1)' } };
  }
  if (n % 2 === 0) {
    steps.push({ description: `${n} is even > 2, not prime`, state: false });
    return { result: false, steps, complexities: { time: 'O(K log^3 N)', space: 'O(1)' } };
  }

  let d = n - 1;
  let r = 0;
  while (d % 2 === 0) {
    d /= 2;
    r++;
  }
  
  steps.push({ description: `Factored ${n - 1} into 2^${r} * ${d}`, state: { r, d } });

  function power(base: number, exp: number, mod: number): number {
    let res = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return res;
  }

  for (let i = 0; i < k; i++) {
    const a = 2 + Math.floor(Math.random() * (n - 4));
    let x = power(a, d, n);
    steps.push({ description: `Iteration ${i + 1}: random base a=${a}, x=(a^d % n)=${x}`, state: { a, x } });

    if (x === 1 || x === n - 1) continue;

    let composite = true;
    for (let j = 1; j < r; j++) {
      x = (x * x) % n;
      steps.push({ description: `Squaring x: x=${x}`, state: { j, x } });
      if (x === n - 1) {
        composite = false;
        break;
      }
    }

    if (composite) {
      steps.push({ description: `Found witness for compositeness`, state: false });
      return { result: false, steps, complexities: { time: 'O(K log^3 N)', space: 'O(1)' } };
    }
  }

  steps.push({ description: `Passed ${k} iterations, likely prime`, state: true });
  return { result: true, steps, complexities: { time: 'O(K log^3 N)', space: 'O(1)' } };
}

/**
 * Blelloch Scan (Prefix Sum - Array-based parallel simulation)
 */
export function blellochScan(arr: number[]): AlgorithmResult<number[]> {
  const steps: AlgorithmStep[] = [];
  const n = arr.length;
  if (n === 0) {
    return { result: [], steps, complexities: { time: 'O(1)', space: 'O(1)' } };
  }

  const power = Math.ceil(Math.log2(n));
  const size = 1 << power;
  const tree = new Array(size).fill(0);
  
  for (let i = 0; i < n; i++) tree[i] = arr[i];
  
  steps.push({ description: `Padded array to power of 2 (size ${size})`, state: [...tree] });

  // Up-sweep phase
  for (let d = 0; d < power; d++) {
    const stepSize = 1 << (d + 1);
    const halfStep = 1 << d;
    for (let i = 0; i < size; i += stepSize) {
      tree[i + stepSize - 1] = tree[i + halfStep - 1] + tree[i + stepSize - 1];
    }
    steps.push({ description: `Up-sweep depth ${d}`, state: [...tree] });
  }

  // Down-sweep phase
  tree[size - 1] = 0;
  steps.push({ description: `Set root to 0 for down-sweep`, state: [...tree] });
  
  for (let d = power - 1; d >= 0; d--) {
    const stepSize = 1 << (d + 1);
    const halfStep = 1 << d;
    for (let i = 0; i < size; i += stepSize) {
      const leftIndex = i + halfStep - 1;
      const rightIndex = i + stepSize - 1;
      const t = tree[leftIndex];
      tree[leftIndex] = tree[rightIndex];
      tree[rightIndex] = t + tree[rightIndex];
    }
    steps.push({ description: `Down-sweep depth ${d}`, state: [...tree] });
  }

  const result = tree.slice(0, n);
  steps.push({ description: `Final exclusive prefix sum`, state: [...result] });

  return {
    result,
    steps,
    complexities: {
      time: 'O(N) total work, O(log N) span (parallel depth)',
      space: 'O(N)'
    }
  };
}

/**
 * Parallel Reduce (Array-based simulation)
 */
export function parallelReduce(arr: number[], op: (a: number, b: number) => number = (a, b) => a + b): AlgorithmResult<number> {
  const steps: AlgorithmStep[] = [];
  let current = [...arr];
  
  steps.push({ description: 'Initial array', state: [...current] });
  
  let stepCount = 0;
  while (current.length > 1) {
    const next: number[] = [];
    for (let i = 0; i < current.length; i += 2) {
      if (i + 1 < current.length) {
        next.push(op(current[i], current[i + 1]));
      } else {
        next.push(current[i]);
      }
    }
    current = next;
    steps.push({ description: `Reduction step ${++stepCount}`, state: [...current] });
  }

  return {
    result: current.length > 0 ? current[0] : 0,
    steps,
    complexities: {
      time: 'O(N) total work, O(log N) span (parallel depth)',
      space: 'O(N)'
    }
  };
}
