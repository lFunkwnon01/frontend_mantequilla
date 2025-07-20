import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import type { ExpenseSummary } from "../types";

interface ExpenseChartProps {
  data: ExpenseSummary[];
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  const total = data.reduce((sum, item) => sum + item.total, 0);
  const maxAmount = Math.max(...data.map((item) => item.total), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución de Gastos</CardTitle>
        <CardDescription>Visualización de gastos por categoría</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = (item.total / total) * 100;
            const barWidth = (item.total / maxAmount) * 100;
            return (
              <div key={item.categoryId} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.categoryName}</span>
                  <span>
                    S/ {item.total.toFixed(2)} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}