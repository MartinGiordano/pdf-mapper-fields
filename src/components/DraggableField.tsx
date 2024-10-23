import React, { forwardRef } from 'react';
import { Crosshair } from 'lucide-react';

interface DraggableFieldProps {
  fieldName: string;
  style?: React.CSSProperties;
}

export const DraggableField = forwardRef<HTMLDivElement, DraggableFieldProps>(
  ({ fieldName, style }, ref) => (
    <div
      ref={ref}
      className="flex items-center justify-center w-32 h-10 border-2 border-blue-500 bg-blue-100 bg-opacity-50 rounded cursor-move"
      style={style}
    >
      <Crosshair className="w-4 h-4 text-blue-500" />
      <span className="ml-2 text-sm text-blue-700">{fieldName}</span>
    </div>
  )
);

DraggableField.displayName = 'DraggableField';