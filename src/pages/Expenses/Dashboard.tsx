import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ExpenseChart } from "../../components/ExpenseChart";
import { useAuth } from "../../context/AuthContext";
import * as expenseService from "../../services/expenseService";
import type { ExpenseSummary } from "../../types";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [expensesSummary, setExpensesSummary] = useState<ExpenseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    expenseService
      .getExpensesSummary()
      .then(setExpensesSummary)
      .catch(() => setExpensesSummary([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const totalExpenses = expensesSummary.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Aquí puedes poner tu Header */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Hola, {user?.email?.split("@")[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Aquí tienes el resumen de tus gastos de{" "}
            {new Date().toLocaleDateString("es-PE", { month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="mb-8">
          <ExpenseChart data={expensesSummary} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Categoría</CardTitle>
            <CardDescription>Haz clic en una categoría para ver el detalle de gastos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expensesSummary.map((category) => (
                <Card
                  key={category.categoryId}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/expenses/${category.categoryId}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{category.categoryName}</h3>
                        <p className="text-sm text-gray-600">{category.count} gastos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">S/ {category.total.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">
                          Promedio: S/ {(category.total / category.count).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}