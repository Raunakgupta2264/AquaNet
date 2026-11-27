export interface AlgorithmStep {
  description: string;
  state: any;
  highlightedIndices?: number[];
  highlightedNodes?: string[];
  highlightedEdges?: [string, string][];
}

export interface AlgorithmResult<T = any> {
  steps: AlgorithmStep[];
  result: T;
  timeComplexity: string;
  spaceComplexity: string;
  comparisons?: number;
  matches?: number[];
  [key: string]: any; // Allow extra properties added by subagents
}
