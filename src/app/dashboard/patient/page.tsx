"use client"

import MealCard from "@/components/PatientMealPlanView/meal-card"
import NutritionGoals from "@/components/PatientMealPlanView/nutrition-goals"
import PatientInfo from "@/components/PatientMealPlanView/patient-info"
import { Food, PatientMeal } from "@/components/PatientMealPlanView/types"
import WeeklyOverview from "@/components/PatientMealPlanView/weekly-overview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { mealPlanDetails } from "@/services/meal-plan/mealPlansService"
import { Calendar, CheckCircle2, Target, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"



const weeklyProgress = {
  currentWeek: 2,
  totalWeeks: 12,
  weightLoss: 1.5,
  adherence: 85,
}



const getMealKey = (meal: { name: string; time: string }, index: number) => {
  return `${meal.name}-${meal.time}-${index}`;
}

export default function PatientDashboard() {
  const { user } = useAuth()
  const patientId = user?.id;
  const [mealPlan, setMealPlan] = useState<{ meals: PatientMeal[] } | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [completedMeals, setCompletedMeals] = useState<Record<string, boolean>>(() => {
    return mealPlan?.meals?.reduce((acc, meal, index) => {
      const key = getMealKey(meal, index);
      acc[key] = false;
      return acc;
    }, {} as Record<string, boolean>) || {};
  });
  const dailyPlan = {
    date: new Date().toLocaleDateString('pt-BR'),
    meals: mealPlan?.meals || [],
    totalCalories: mealPlan?.meals.reduce(
      (total, meal) => total + meal.foods.reduce((sum, food) => sum + food.energy_value_kcal, 0),
      0
    ) || 0,
  };



  useEffect(() => {

    const fetchMealPlanDetails = async () => {
      try {
        const response = await mealPlanDetails(patientId as string);
        if (!response) return;
        console.log(response)


        const meals = response.meal_plan.entries.map((entry: { id: number; meal_type_name: string; time_scheduled: string; notes: string; foods: Food[] }) => ({
          id: `${entry.id}`,
          name: entry.meal_type_name,
          time: entry.time_scheduled,
          notes: entry.notes || "",
          foods: (entry.foods || []).map(food => ({
            food_name: food.food_name,
            prescribed_quantity: food.prescribed_quantity,
            unit_measure: food.unit_measure,
            energy_value_kcal: food.energy_value_kcal,
            preparation_notes: food.preparation_notes,
          })),
        }));



        const mealPlan = {
          ...response.meal_plan,
          meals,
        };

        setMealPlan(mealPlan);

        if (meals.length) {
          const initialCompleted = meals.reduce((acc: Record<string, boolean>, meal: { name: string; time: string }, index: number) => {
            const key = getMealKey(meal, index);
            acc[key] = false;
            return acc;
          }, {});

          setCompletedMeals(initialCompleted);
        }

      } catch (error) {
        console.error("Erro ao buscar dados do plano alimentar:", error);
      }
    };


    if (patientId) {
      fetchMealPlanDetails();
    }
  }, [patientId]);

  const toggleMealCompletion = (mealId: string | number) => {
    setCompletedMeals((prev) => ({
      ...prev,
      [mealId]: !prev[mealId],
    }))
  }

  const completedCount = Object.values(completedMeals).filter(Boolean).length
  const totalMeals = mealPlan?.meals.length
  const caloriesConsumed = mealPlan?.meals
    ? mealPlan.meals
      .filter((meal, index) => completedMeals[getMealKey(meal, index)])
      .reduce((sum, meal) => {
        const mealCalories = meal.foods.reduce((total, food) => total + food.energy_value_kcal, 0);
        return sum + mealCalories;
      }, 0)
    : 0;



  return (
    <div className="">
      <div className="max-w-6xl space-y-6">
        <PatientInfo />

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Semanal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Semana {weeklyProgress.currentWeek}</div>
              <p className="text-xs text-muted-foreground">de {weeklyProgress.totalWeeks} semanas</p>
              <Progress value={(weeklyProgress.currentWeek / weeklyProgress.totalWeeks) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perda de peso</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyProgress.weightLoss} kg</div>
              <p className="text-xs text-muted-foreground">Perda essa semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aderência do plano</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyProgress.adherence}%</div>
              <p className="text-xs text-muted-foreground">Essa semana</p>
              <Progress value={weeklyProgress.adherence} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="space-y-4">
          <TabsList className="gap-4">
            <TabsTrigger value="today">Plano alimentar de hoje</TabsTrigger>
            <TabsTrigger value="week">Visão semanal</TabsTrigger>
            <TabsTrigger value="nutrition">Objetivos nutricionais</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Refeições de hoje
                    </CardTitle>
                    <CardDescription>
                      {completedCount} de {totalMeals} refeições completas
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{caloriesConsumed}</div>
                    <div className="text-sm text-muted-foreground">de {dailyPlan.totalCalories} calories</div>
                    <Progress value={(caloriesConsumed / dailyPlan.totalCalories) * 100} className="mt-2 w-32" />
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mealPlan?.meals.map((meal, index) => (
                <MealCard
                  key={getMealKey(meal, index)}
                  meal={{
                    ...meal,
                    id: getMealKey(meal, index),
                  }}
                  completedMeals={completedMeals}
                  toggleMealCompletion={toggleMealCompletion}
                  selectedMeal={selectedMeal}
                  setSelectedMeal={setSelectedMeal}
                />
              ))}

            </div>
          </TabsContent>

          <TabsContent value="week">
            <WeeklyOverview />
          </TabsContent>

          <TabsContent value="nutrition">
            <NutritionGoals />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
