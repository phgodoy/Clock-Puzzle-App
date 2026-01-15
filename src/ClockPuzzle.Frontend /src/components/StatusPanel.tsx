import { PuzzleState } from '@/types/puzzle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  RotateCcw, 
  Play, 
  StepBack,
  MapPin,
  Route,
  Target
} from 'lucide-react';

interface StatusPanelProps {
  state: PuzzleState;
  onReset: () => void;
  onSolve: () => void;
  onStepBack: () => void;
  isSolving: boolean;
}

function getStatusBadge(status: PuzzleState['status']) {
  const config = {
    'idle': { label: 'Aguardando', variant: 'secondary' as const },
    'in-progress': { label: 'Em Progresso', variant: 'default' as const },
    'solved': { label: 'Resolvido!', variant: 'success' as const },
    'failed': { label: 'Sem Solução', variant: 'destructive' as const },
  };
  return config[status];
}

export function StatusPanel({
  state,
  onReset,
  onSolve,
  onStepBack,
  isSolving,
}: StatusPanelProps) {
  const statusConfig = getStatusBadge(state.status);

  return (
    <Card className="status-panel border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-primary" />
          Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant={statusConfig.variant} className="font-medium">
            {statusConfig.label}
          </Badge>
        </div>

        {/* Current Position */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            Current Position:
          </span>
          <span className="font-mono font-semibold text-primary">
            {state.currentIndex !== null ? state.currentIndex + 1 : '--'}
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Route className="w-4 h-4" />
            Progression:
          </span>
          <span className="font-mono font-semibold">
            {state.visitedCount} / {state.totalNodes}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{
              width: `${(state.visitedCount / state.totalNodes) * 100}%`,
            }}
          />
        </div>

        {/* Path Display */}
        {state.path.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Way:</span>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {state.path.map((nodeIndex, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs font-mono"
                >
                  {nodeIndex + 1}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onStepBack}
            disabled={state.path.length <= 1 || isSolving}
          >
            <StepBack className="w-4 h-4 mr-1" />
            Return
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onReset}
            disabled={isSolving}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={onSolve}
          disabled={isSolving || state.status === 'solved'}
          className="w-full btn-solve"
        >
          <Play className="w-4 h-4 mr-1" />
          {isSolving ? 'Resolvendo...' : 'Automatic Solving'}
        </Button>
      </CardContent>
    </Card>
  );
}
