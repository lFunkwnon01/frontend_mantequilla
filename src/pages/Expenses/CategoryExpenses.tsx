import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useAuth } from "../../context/AuthContext";
import { ExpenseForm } from "../../components/ExpenseForm";
import * as expenseService from "../../services/expenseService";
import type { ExpenseDetail } from "../../types";

export default function CategoryExpenses() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [expenses, setExpenses] = useState<ExpenseDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (categoryId) {
      expenseService
        .getExpensesByCategory(Number(categoryId))
        .then(setExpenses)
        .catch(() => setExpenses([]))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, navigate, categoryId]);

  const handleAddExpense = async (expense: Omit<ExpenseDetail, "id">) => {
    try {
      await expenseService.createExpense(expense);
      // Recargar gastos
      if (categoryId) {
        const updated = await expenseService.getExpensesByCategory(Number(categoryId));
        setExpenses(updated);
      }
    } catch (e) {
      alert("Error al registrar gasto");
    }
  };

  const handleDeleteExpense = async (expenseId: number) => {
    try {
      await expenseService.deleteExpense(expenseId);
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    } catch (e) {
      alert("Error al eliminar gasto");
    }
  };

  if (!isAuthenticated || loading) {
    return <div>Cargando...</div>;
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Aquí puedes poner tu Header */}
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          Volver al Dashboard
        </Button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Categoría {categoryId}</h1>
            <p className="text-gray-600">
              {expenses.length} gastos • Total: S/ {totalAmount.toFixed(2)}
            </p>
          </div>
          <ExpenseForm categoryId={Number(categoryId)} onSubmit={handleAddExpense} />
        </div>
        <div className="space-y-4">
          {expenses.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay gastos en esta categoría</h3>
                <p className="text-gray-600 mb-4">Comienza registrando tu primer gasto</p>
                <ExpenseForm categoryId={Number(categoryId)} onSubmit={handleAddExpense} />
              </CardContent>
            </Card>
          ) : (
            expenses.map((expense) => (
              <Card key={expense.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{expense.description}</h3>
                        <Badge variant="secondary">Categoría {categoryId}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div>{new Date(expense.date).toLocaleDateString("es-PE")}</div>
                        <div>S/ {expense.amount.toFixed(2)}</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}