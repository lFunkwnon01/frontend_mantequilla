import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import type { Goal } from "../types";

interface GoalFormProps {
  goal?: Goal | null;
  onSubmit: (goal: Goal | Omit<Goal, "id">) => void;
}

export function GoalForm({ goal, onSubmit }: GoalFormProps) {
  const [targetAmount, setTargetAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (goal) {
      setTargetAmount(goal.targetAmount.toString());
      setMonth(goal.month.toString());
      setYear(goal.year.toString());
    } else {
      const now = new Date();
      setMonth((now.getMonth() + 1).toString());
      setYear(now.getFullYear().toString());
    }
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetAmount || !month || !year) return;
    const goalData = {
      targetAmount: Number.parseFloat(targetAmount),
      month: Number.parseInt(month),
      year: Number.parseInt(year),
    };
    if (goal) {
      onSubmit({ ...goal, ...goalData });
    } else {
      onSubmit(goalData);
    }
  };

  const months = [
    { value: "1", label: "Enero" },
    { value: "2", label: "Febrero" },
    { value: "3", label: "Marzo" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Mayo" },
    { value: "6", label: "Junio" },
    { value: "7", label: "Julio" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="targetAmount">Meta de Ahorro (S/)</Label>
        <Input
          id="targetAmount"
          type="number"
          step="0.01"
          min="0"
          placeholder="500.00"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="month">Mes</Label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
          >
            <option value="">Seleccionar mes</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Año</Label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
          >
            <option value="">Seleccionar año</option>
            {years.map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button type="submit" className="w-full">
        {goal ? "Actualizar Meta" : "Crear Meta"}
      </Button>
    </form>
  );
}