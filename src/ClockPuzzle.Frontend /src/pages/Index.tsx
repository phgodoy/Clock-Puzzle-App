import { PuzzleHeader } from '@/components/PuzzleHeader';
import { ClockPuzzle } from '@/components/ClockPuzzle';
import { StatusPanel } from '@/components/StatusPanel';
import { InstructionsCard } from '@/components/InstructionsCard';
import { LegendCard } from '@/components/LegendCard';
import { NodeValueInput } from '@/components/NodeValueInput';
import { usePuzzle } from '@/hooks/usePuzzle';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

const Index = () => {
  const {
    state,
    values,
    loadPuzzle,
    updateValues,
    reset,
    handleNodeClick,
    stepBack,
    solve,
    isSolving,
  } = usePuzzle();

  // Toast notifications for status changes
  useEffect(() => {
    if (state.status === 'solved') {
      toast.success('🎉 Congratulations! Puzzle solved', {
        description: `Have you visited all of them ${state.totalNodes} points!`,
      });
    } else if (state.status === 'failed') {
      toast.error('No valid moves!', {
        description: 'Use "Rolback" ou "Reset" to try again.',
      });
    }
  }, [state.status, state.totalNodes]);

  return (
    <div className="min-h-screen flex flex-col">
      <PuzzleHeader onLoadExample={loadPuzzle} />

      <main className="flex-1 container px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          {/* Main puzzle area */}
          <div className="flex flex-col items-center justify-center py-8">
            <ClockPuzzle nodes={state.nodes} onNodeClick={handleNodeClick} />
            
            {state.status === 'idle' && (
              <p className="mt-6 text-muted-foreground text-sm animate-pulse">
                Click anywhere point to begin
              </p>
            )}
          </div>

          {/* Side panel */}
          <div className="flex flex-col gap-4">
            {/* Node configuration */}
            <Card className="config-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5 text-primary" />
                  Configure Puzzle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NodeValueInput 
                  values={values} 
                  onChange={updateValues}
                  onReset={reset}
                />
              </CardContent>
            </Card>

            <StatusPanel
              state={state}
              onReset={reset}
              onSolve={solve}
              onStepBack={stepBack}
              isSolving={isSolving}
            />
            <InstructionsCard />
            <LegendCard />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          Inspired by Final Fantasy XIII-2 • DFS Algorithm with Backtracking
        </div>
      </footer>
    </div>
  );
};

export default Index;
