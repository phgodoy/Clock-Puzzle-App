import { ClockNode, PuzzleState } from '@/types/puzzle';

export function createNodes(values: number[]): ClockNode[] {
  const count = values.length;
  return values.map((value, index) => ({
    index,
    value,
    state: 'inactive' as const,
    angle: (index * 360) / count - 90, // Start from 12 o'clock position (-90 degrees)
  }));
}

export function getValidMoves(
  nodes: ClockNode[],
  currentIndex: number,
  visited: Set<number>
): number[] {
  const currentNode = nodes[currentIndex];
  const steps = currentNode.value;
  const count = nodes.length;
  const moves: number[] = [];

  // Clockwise move
  const clockwiseIndex = (currentIndex + steps) % count;
  if (!visited.has(clockwiseIndex)) {
    moves.push(clockwiseIndex);
  }

  // Counter-clockwise move
  const counterIndex = ((currentIndex - steps) % count + count) % count;
  if (!visited.has(counterIndex) && counterIndex !== clockwiseIndex) {
    moves.push(counterIndex);
  }

  return moves;
}

export function solvePuzzle(nodes: ClockNode[]): number[] | null {
  const totalNodes = nodes.length;

  function dfs(currentIndex: number, visited: Set<number>, path: number[]): number[] | null {
    if (path.length === totalNodes) {
      return path;
    }

    const moves = getValidMoves(nodes, currentIndex, visited);

    for (const nextIndex of moves) {
      const newVisited = new Set(visited);
      newVisited.add(nextIndex);
      const newPath = [...path, nextIndex];

      const result = dfs(nextIndex, newVisited, newPath);
      if (result) {
        return result;
      }
    }

    return null;
  }

  // Try starting from each position
  for (let startIndex = 0; startIndex < totalNodes; startIndex++) {
    const visited = new Set([startIndex]);
    const path = [startIndex];
    const result = dfs(startIndex, visited, path);
    if (result) {
      return result;
    }
  }

  return null;
}

export const EXAMPLE_PUZZLES: { name: string; values: number[] }[] = [
  {
    name: 'Easy (6 nodes)',
    values: [1, 2, 3, 1, 2, 3],
  },
  {
    name: 'Normal (8 nodes)',
    values: [2, 3, 1, 2, 3, 1, 2, 3],
  },
  {
    name: 'Hard (10 nodes)',
    values: [3, 1, 2, 4, 2, 1, 3, 2, 4, 1],
  },
  {
    name: 'Expert (12 nodes)',
    values: [2, 4, 1, 3, 2, 4, 1, 3, 2, 4, 1, 3],
  },
];
