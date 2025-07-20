// src/components/ui/progress.tsx
import * as React from "react";
import { cn } from "../../lib/utils.ts";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 a 100
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full h-3 bg-gray-200 rounded-full overflow-hidden", className)}
      {...props}
    >
      <div
        className="h-full bg-blue-600 transition-all duration-300"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  )
);

Progress.displayName = "Progress";