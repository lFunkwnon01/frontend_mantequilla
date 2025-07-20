// src/components/ui/badge.tsx
import * as React from "react";
import { cn } from "../../lib/utils.ts";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const variantClasses: Record<string, string> = {
  default: "bg-blue-600 text-white",
  secondary: "bg-gray-200 text-gray-800",
  destructive: "bg-red-600 text-white",
  outline: "border border-gray-300 text-gray-800 bg-white",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";