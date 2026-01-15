import { ClockNode as ClockNodeType } from '@/types/puzzle';
import { cn } from '@/lib/utils';

interface ClockNodeProps {
  node: ClockNodeType;
  onClick: () => void;
  clockRadius: number;
}

export function ClockNodeComponent({ node, onClick, clockRadius }: ClockNodeProps) {
  const isClickable = node.state === 'inactive' || node.state === 'selectable';
  
  // Calculate position based on angle
  const angleRad = (node.angle * Math.PI) / 180;
  const x = Math.cos(angleRad) * clockRadius;
  const y = Math.sin(angleRad) * clockRadius;

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={cn(
        'clock-node absolute w-12 h-12 md:w-14 md:h-14 rounded-full font-bold text-lg md:text-xl',
        'flex items-center justify-center transition-all duration-300',
        'border-2 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2',
        {
          'node-inactive': node.state === 'inactive',
          'node-selectable': node.state === 'selectable',
          'node-current': node.state === 'current',
          'node-visited': node.state === 'visited',
          'node-final': node.state === 'final',
        },
        isClickable && 'cursor-pointer hover:scale-110',
        !isClickable && 'cursor-default'
      )}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
    >
      <span className="relative z-10">{node.value}</span>
      
      {/* Glow ring */}
      {(node.state === 'current' || node.state === 'selectable') && (
        <div className={cn(
          'absolute inset-0 rounded-full',
          node.state === 'current' && 'animate-pulse-glow',
          node.state === 'selectable' && 'animate-pulse-subtle'
        )} />
      )}
    </button>
  );
}
