import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button"; // ✅ Corregido: era "buttom"
import { Progress } from "../../components/ui/progress.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { GoalForm } from "../../components/GoalForm";
import * as goalService from "../../services/goalService";
import type { Goal } from "../../types";

export default function Goals() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    goalService.getGoals().then(setGoals).catch(() => setGoals([]));
  }, [isAuthenticated, navigate]);

  // ✅ Handler unificado que acepta ambos tipos
  const handleGoalSubmit = async (goal: Goal | Omit<Goal, "id">) => {
    try {
      if ("id" in goal) {
        // Es edición
        await goalService.updateGoal(goal as Goal);
      } else {
        // Es creación
        await goalService.createGoal(goal as Omit<Goal, "id">);
      }
      const updated = await goalService.getGoals();
      setGoals(updated);
      setEditingGoal(null);
      setIsDialogOpen(false);
    } catch {
      alert("Error al guardar meta");
    }
  };

  const handleDeleteGoal = async (goalId: number) => {
    try {
      await goalService.deleteGoal(goalId);
      setGoals((prev) => prev.filter((g) => g.id !== goalId));
    } catch {
      alert("Error al eliminar meta");
    }
  };

  const openEditDialog = (goal: Goal) => {
    setEditingGoal(goal);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingGoal(null);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Aquí puedes poner tu Header */}
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
          Volver al Dashboard
        </Button>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Metas de Ahorro</h1>
            <p className="text-gray-600">Define y gestiona tus objetivos financieros mensuales</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            {editingGoal ? "Editar Meta" : "Nueva Meta"}
          </Button>
        </div>
        {isDialogOpen && (
          <div className="mb-6">
            {/* ✅ Ahora usa el handler unificado */}
            <GoalForm goal={editingGoal} onSubmit={handleGoalSubmit} />
            <Button variant="outline" onClick={closeDialog} className="mt-2">
              Cancelar
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="py-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes metas de ahorro</h3>
                <p className="text-gray-600 mb-4">Comienza definiendo tu primera meta financiera</p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  Crear Primera Meta
                </Button>
              </CardContent>
            </Card>
          ) : (
            goals.map((goal) => {
              const currentMonth = new Date().getMonth() + 1;
              const currentYear = new Date().getFullYear();
              const isCurrentMonth = goal.month === currentMonth && goal.year === currentYear;
              // Aquí puedes calcular el progreso real si tienes los gastos del mes
              const progress = 0;
              const isAchieved = false;

              return (
                <Card key={goal.id} className={`${isAchieved ? "border-green-200 bg-green-50" : ""}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {new Date(goal.year, goal.month - 1).toLocaleDateString("es-PE", {
                          month: "long",
                          year: "numeric",
                        })}
                      </CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(goal)}>
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Meta: Ahorrar S/ {goal.targetAmount.toFixed(2)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progreso</span>
                          <span>{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Gastado</p>
                          <p className="font-semibold">S/ 0.00</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Disponible</p>
                          <p className={`font-semibold ${isAchieved ? "text-green-600" : ""}`}>
                            S/ {goal.targetAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {isAchieved && (
                        <div className="bg-green-100 text-green-800 text-sm p-2 rounded-md text-center">
                          🎉 ¡Meta alcanzada!
                        </div>
                      )}
                      {!isCurrentMonth && (
                        <div className="bg-gray-100 text-gray-600 text-sm p-2 rounded-md text-center">
                          Meta de mes anterior
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}