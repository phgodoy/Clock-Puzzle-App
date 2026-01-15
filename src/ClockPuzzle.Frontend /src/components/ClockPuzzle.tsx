import { ClockNode } from '@/types/puzzle';
import { ClockNodeComponent } from './ClockNode';

interface ClockPuzzleProps {
  nodes: ClockNode[];
  onNodeClick: (index: number) => void;
}

export function ClockPuzzle({ nodes, onNodeClick }: ClockPuzzleProps) {
  // Responsive clock radius
  const clockRadius = Math.min(180, Math.max(120, 300 - nodes.length * 10));

  return (
    <div className="clock-container relative mx-auto" style={{ 
      width: clockRadius * 2 + 100,
      height: clockRadius * 2 + 100 
    }}>
      {/* Clock face */}
      <div 
        className="clock-face absolute rounded-full border-2"
        style={{
          width: clockRadius * 2 + 20,
          height: clockRadius * 2 + 20,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Center dot */}
      <div className="absolute w-4 h-4 rounded-full bg-primary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />

      {/* Clock nodes */}
      {nodes.map((node) => (
        <ClockNodeComponent
          key={node.index}
          node={node}
          onClick={() => onNodeClick(node.index)}
          clockRadius={clockRadius}
        />
      ))}
    </div>
  );
}
