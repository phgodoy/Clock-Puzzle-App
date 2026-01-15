import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, FolderOpen, ChevronDown } from 'lucide-react';
import { EXAMPLE_PUZZLES } from '@/utils/puzzleSolver';

interface PuzzleHeaderProps {
  onLoadExample: (values: number[]) => void;
}

export function PuzzleHeader({ onLoadExample }: PuzzleHeaderProps) {
  return (
    <header className="puzzle-header sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="clock-icon p-2 rounded-full">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="text-gradient">Clock Puzzle</span>
            <span className="text-muted-foreground ml-2 font-normal">Solver</span>
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderOpen className="w-4 h-4 mr-2" />
              Exemplos
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {EXAMPLE_PUZZLES.map((puzzle, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => onLoadExample(puzzle.values)}
              >
                {puzzle.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
