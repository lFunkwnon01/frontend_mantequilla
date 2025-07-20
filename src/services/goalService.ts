// src/services/goalService.ts
import api from "./api";

// Obtener todas las metas de ahorro
export async function getGoals() {
  const res = await api.get("/goals");
  return res.data; // [{ id, targetAmount, month, year }]
}

// Crear una nueva meta
export async function createGoal(goal: {
  targetAmount: number;
  month: number;
  year: number;
}) {
  const res = await api.post("/goals", goal);
  return res.data;
}

// Editar una meta existente
export async function updateGoal(goal: {
  id: number;
  targetAmount: number;
  month: number;
  year: number;
}) {
  const res = await api.put(`/goals/${goal.id}`, goal);
  return res.data;
}

// Eliminar una meta
export async function deleteGoal(goalId: number) {
  const res = await api.delete(`/goals/${goalId}`);
  return res.data;
}