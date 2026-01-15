import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, MousePointer, RotateCw, RotateCcw } from 'lucide-react';

export function InstructionsCard() {
  return (
    <Card className="instructions-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="w-5 h-5 text-primary" />
          How to Play
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>
          <MousePointer className="w-4 h-4 inline mr-1.5 text-primary" />
          Click on any node to start.
        </p>
        <p>
          The number indicates how many positions you can move.
        </p>
        <div className="flex items-center gap-2">
          <span>Directions:</span>
          <div className="flex gap-1.5 items-center">
            <RotateCw className="w-4 h-4 text-primary" />
            <span>Clockwise</span>
            <RotateCcw className="w-4 h-4 text-primary ml-2" />
            <span>Counterclockwise</span>
          </div>
        </div>
        <p className="pt-2 border-t border-border/50">
          <strong className="text-foreground">Objective:</strong> Visit all nodes without repeating!
        </p>
      </CardContent>
    </Card>
  );
}
