import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';

const legendItems = [
  { state: 'Inactive', className: 'node-inactive' },
  { state: 'Selectable', className: 'node-selectable' },
  { state: 'Current', className: 'node-current' },
  { state: 'Visited', className: 'node-visited' },
  { state: 'Final', className: 'node-final' },
];

export function LegendCard() {
  return (
    <Card className="legend-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Palette className="w-5 h-5 text-primary" />
          Legend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {legendItems.map((item) => (
          <div key={item.state} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${item.className}`}
            >
              3
            </div>
            <span className="text-sm text-muted-foreground">{item.state}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
