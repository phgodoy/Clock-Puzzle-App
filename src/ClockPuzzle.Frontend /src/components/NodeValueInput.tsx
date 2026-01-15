import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface NodeValueInputProps {
  values: number[];
  onChange: (values: number[]) => void;
  onReset: () => void;
}

export function NodeValueInput({ values, onChange, onReset }: NodeValueInputProps) {
  const addNode = () => {
    if (values.length < 16) {
      onChange([...values, 1]);
    }
  };

  const removeNode = () => {
    if (values.length > 3) {
      onChange(values.slice(0, -1));
    }
  };

  const updateValue = (index: number, newValue: string) => {
    const numValue = parseInt(newValue) || 1;
    const clampedValue = Math.max(1, Math.min(values.length - 1, numValue));
    const newValues = [...values];
    newValues[index] = clampedValue;
    onChange(newValues);
  };

  return (
    <div className="node-input-container space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-muted-foreground">
          Values ({values.length} nós):
        </span>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={removeNode}
            disabled={values.length <= 3}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={addNode}
            disabled={values.length >= 16}
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onReset}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-muted-foreground">{index + 1}</span>
            <Input
              type="number"
              min={1}
              max={values.length - 1}
              value={value}
              onChange={(e) => updateValue(index, e.target.value)}
              className="w-10 h-8 text-center p-1 text-sm"
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        The numbers start at the 12 o'clock position and continue clockwise.
      </p>
    </div>
  );
}
