// src/services/expenseService.ts
import api from "./api";

// Obtener resumen de gastos por categoría (dashboard)
export async function getExpensesSummary() {
  const res = await api.get("/expenses/summary");
  return res.data; // [{ categoryId, categoryName, total, count }]
}

// Obtener gastos de una categoría
export async function getExpensesByCategory(categoryId: number) {
  const res = await api.get(`/expenses/category/${categoryId}`);
  return res.data; // [{ id, categoryId, description, amount, date }]
}

// Crear un nuevo gasto
export async function createExpense(expense: {
  categoryId: number;
  description: string;
  amount: number;
  date: string;
}) {
  const res = await api.post("/expenses", expense);
  return res.data;
}

// Eliminar un gasto
export async function deleteExpense(expenseId: number) {
  const res = await api.delete(`/expenses/${expenseId}`);
  return res.data;
}