import { useState, useCallback } from 'react';
import { ClockNode, PuzzleState, NodeState } from '@/types/puzzle';
import {
  createNodes,
  getValidMoves,
  solvePuzzle,
  EXAMPLE_PUZZLES,
} from '@/utils/puzzleSolver';

const initialValues = EXAMPLE_PUZZLES[0].values;

function updateNodeStates(
  nodes: ClockNode[],
  currentIndex: number | null,
  visited: Set<number>,
  validMoves: number[]
): ClockNode[] {
  const validMoveSet = new Set(validMoves);

  return nodes.map((node) => {
    let state: NodeState = 'inactive';
    
    if (node.index === currentIndex) {
      state = 'current';
    } else if (visited.has(node.index)) {
      state = 'visited';
    } else if (validMoveSet.has(node.index)) {
      state = 'selectable';
    }

    return { ...node, state };
  });
}

export function usePuzzle() {
  const [values, setValues] = useState<number[]>(initialValues);
  const [state, setState] = useState<PuzzleState>(() => ({
    nodes: createNodes(initialValues),
    currentIndex: null,
    path: [],
    status: 'idle',
    visitedCount: 0,
    totalNodes: initialValues.length,
  }));
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [isSolving, setIsSolving] = useState(false);

  const loadPuzzle = useCallback((newValues: number[]) => {
    setValues(newValues);
    const newNodes = createNodes(newValues);
    setVisited(new Set());
    setState({
      nodes: newNodes,
      currentIndex: null,
      path: [],
      status: 'idle',
      visitedCount: 0,
      totalNodes: newValues.length,
    });
  }, []);

  const updateValues = useCallback((newValues: number[]) => {
    loadPuzzle(newValues);
  }, [loadPuzzle]);

  const reset = useCallback(() => {
    loadPuzzle(values);
  }, [values, loadPuzzle]);

  const handleNodeClick = useCallback(
    (index: number) => {
      // If no current position, start here
      if (state.currentIndex === null) {
        const newVisited = new Set([index]);
        const validMoves = getValidMoves(state.nodes, index, newVisited);
        const newNodes = updateNodeStates(state.nodes, index, newVisited, validMoves);

        setVisited(newVisited);
        setState((prev) => ({
          ...prev,
          nodes: newNodes,
          currentIndex: index,
          path: [index],
          status: 'in-progress',
          visitedCount: 1,
        }));
        return;
      }

      // Check if this is a valid move
      const validMoves = getValidMoves(state.nodes, state.currentIndex, visited);
      const isValidMove = validMoves.includes(index);

      if (!isValidMove) return;

      const newVisited = new Set(visited);
      newVisited.add(index);

      const newPath = [...state.path, index];
      const newValidMoves = getValidMoves(state.nodes, index, newVisited);
      let newNodes = updateNodeStates(
        createNodes(values),
        index,
        newVisited,
        newValidMoves
      );

      // Check win/lose conditions
      let newStatus = state.status;
      if (newPath.length === state.totalNodes) {
        newStatus = 'solved';
        newNodes = newNodes.map(n => 
          n.index === index ? { ...n, state: 'final' as const } : n
        );
      } else if (newValidMoves.length === 0) {
        newStatus = 'failed';
      }

      setVisited(newVisited);
      setState((prev) => ({
        ...prev,
        nodes: newNodes,
        currentIndex: index,
        path: newPath,
        status: newStatus,
        visitedCount: newPath.length,
      }));
    },
    [state, visited, values]
  );

  const stepBack = useCallback(() => {
    if (state.path.length <= 1) return;

    const newPath = state.path.slice(0, -1);
    const newCurrentIndex = newPath[newPath.length - 1];
    const newVisited = new Set(newPath);

    const validMoves = getValidMoves(createNodes(values), newCurrentIndex, newVisited);
    const newNodes = updateNodeStates(
      createNodes(values),
      newCurrentIndex,
      newVisited,
      validMoves
    );

    setVisited(newVisited);
    setState((prev) => ({
      ...prev,
      nodes: newNodes,
      currentIndex: newCurrentIndex,
      path: newPath,
      status: 'in-progress',
      visitedCount: newPath.length,
    }));
  }, [state.path, values]);

  const solve = useCallback(async () => {
    setIsSolving(true);

    const nodes = createNodes(values);
    const solution = solvePuzzle(nodes);

    if (!solution) {
      setState((prev) => ({
        ...prev,
        status: 'failed',
      }));
      setIsSolving(false);
      return;
    }

    // Reset and animate solution
    reset();
    await new Promise((r) => setTimeout(r, 300));

    for (let i = 0; i < solution.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      
      const index = solution[i];
      
      setVisited((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });

      setState((prev) => {
        const pathSoFar = solution.slice(0, i + 1);
        const newVisited = new Set(pathSoFar);
        const validMoves =
          i < solution.length - 1
            ? getValidMoves(createNodes(values), index, newVisited)
            : [];

        let newNodes = updateNodeStates(
          createNodes(values),
          index,
          newVisited,
          validMoves
        );

        if (i === solution.length - 1) {
          newNodes = newNodes.map(n => 
            n.index === index ? { ...n, state: 'final' as const } : n
          );
        }

        return {
          ...prev,
          nodes: newNodes,
          currentIndex: index,
          path: pathSoFar,
          status: i === solution.length - 1 ? 'solved' : 'in-progress',
          visitedCount: i + 1,
        };
      });
    }

    setIsSolving(false);
  }, [values, reset]);

  return {
    state,
    values,
    loadPuzzle,
    updateValues,
    reset,
    handleNodeClick,
    stepBack,
    solve,
    isSolving,
  };
}
