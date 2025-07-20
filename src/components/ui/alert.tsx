// src/components/ui/alert.tsx
import * as React from "react";
import { cn } from "../../lib/utils.ts";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  const base = "rounded-md p-4 flex items-start gap-2";
  const variants: Record<string, string> = {
    default: "bg-blue-50 text-blue-800 border border-blue-200",
    destructive: "bg-red-50 text-red-800 border border-red-200",
  };
  return <div className={cn(base, variants[variant], className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-sm", className)} {...props} />;
}