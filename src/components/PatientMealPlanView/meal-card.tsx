import { CheckCircle2, Circle, Clock, Info, Salad } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { PatientMeal } from "./types";


interface MealCardProps {
    meal: PatientMeal;
    completedMeals: { [key: string]: boolean };
    toggleMealCompletion: (mealId: string) => void;
    selectedMeal: string | null;
    setSelectedMeal: (mealId: string | null) => void;
}

export default function MealCard({
    meal,
    completedMeals,
    toggleMealCompletion,
    selectedMeal,
    setSelectedMeal,
}: MealCardProps) {
    const totalCalories = meal.foods.reduce((sum, food) => sum + food.energy_value_kcal, 0);
    console.log("refeicao:: ", meal)
    return (
        <Card
            key={meal.id}
            className={`cursor-pointer transition-all ${completedMeals[meal.id] ? "bg-green-50 border-green-200" : ""
                }`}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleMealCompletion(meal.id)}
                            className="p-0 h-6 w-6"
                        >
                            {completedMeals[meal.id] ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                                <Circle className="h-5 w-5 text-gray-400" />
                            )}
                        </Button>
                        <div>
                            <CardTitle className="text-lg">{meal.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {meal.time}
                                </span>
                            </CardDescription>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMeal(selectedMeal === meal.id ? null : meal.id)}
                    >
                        <Info className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="flex justify-between text-sm">
                    <span className="font-medium">{totalCalories} cal</span>
                    <div className="text-muted-foreground text-xs">
                        {meal.foods.length} alimento{meal.foods.length !== 1 ? "s" : ""}
                    </div>
                </div>

                {selectedMeal === meal.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                        <div>
                            <h4 className="font-medium text-sm mb-2">Alimentos:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                {meal.foods.map((food, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Salad className="h-4 w-4" />
                                        {food.food_name} - {food.prescribed_quantity} {food.unit_measure} ({food.energy_value_kcal} calorias)
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {meal.notes && (
                            <div>
                                <h4 className="font-medium text-sm mb-2">Observações:</h4>
                                <p className="text-sm text-muted-foreground">{meal.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
