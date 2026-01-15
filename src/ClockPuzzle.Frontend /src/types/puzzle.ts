export interface ClockNode {
  index: number;
  value: number;
  state: NodeState;
  angle: number; // Position angle in degrees
}

export type NodeState = 
  | 'inactive' 
  | 'selectable' 
  | 'current' 
  | 'visited' 
  | 'final';

export type PuzzleStatus = 'idle' | 'in-progress' | 'solved' | 'failed';

export interface PuzzleState {
  nodes: ClockNode[];
  currentIndex: number | null;
  path: number[];
  status: PuzzleStatus;
  visitedCount: number;
  totalNodes: number;
}
