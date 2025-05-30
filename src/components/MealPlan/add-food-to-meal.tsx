/* eslint-disable react/no-unescaped-entities */
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { FoodItem, Meal } from "./types";
import { useFormContext } from "react-hook-form";

type AddFoodToMealProps = {
    meal: Meal;
    onAddFood: (mealId: string) => void;
    onRemoveFood: (mealId: string, foodId: string) => void;
    onUpdateFood: (mealId: string, foodId: string, field: keyof FoodItem, value: string) => void;
};

export default function AddFoodToMeal({ meal, onAddFood, onRemoveFood, onUpdateFood }: AddFoodToMealProps) {
    const { control } = useFormContext();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">Alimentos e Porções</h4>
                <Button type="button" onClick={() => onAddFood(meal.id)} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar alimento
                </Button>
            </div>

            {meal.foods.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Nenhum alimento adicionado ainda. Clique em "Adicionar alimento" para começar.</p>
            ) : (
                <div className="space-y-3">
                    {meal.foods.map((food) => (
                        <div
                            key={food.id}
                            className="flex no-wrap gap-3 p-3 bg-gray-50 rounded-lg "
                        >
                            <div className="space-y-1">

                                <FormField
                                    control={control}
                                    name="entries.0.foods.0.food_name"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Nome do alimento</FormLabel>
                                            <Input
                                                type="text"
                                                placeholder="Ex: Arroz"
                                                onChange={(e) => onUpdateFood(meal.id, food.id, "name", e.target.value)}
                                            />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className="space-y-1">


                                <FormField
                                    control={control}
                                    name="entries.0.foods.0.prescribed_quantity"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-xs ">Porção</FormLabel>
                                            <Input
                                                value={food.portion}
                                                onChange={(e) => onUpdateFood(meal.id, food.id, "portion", e.target.value)}
                                            // placeholder={getPlaceholderByUnit(meal.foodsunitMeasure)}
                                            />
                                        </FormItem>
                                    )}
                                />




                            </div>

                            <div className="space-y-1">
                                <FormField
                                    control={control}
                                    name="entries.0.foods.0.prescribed_quantity"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-xs ">Unidade de medida</FormLabel>
                                            <Input
                                                value={food.portion}
                                                onChange={(e) => onUpdateFood(meal.id, food.id, "portion", e.target.value)}
                                            // placeholder={getPlaceholderByUnit(meal.foodsunitMeasure)}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-1">

                                <FormField
                                    control={control}
                                    name="entries.0.foods.0.energy_value_kcal"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Valor energético (kcal)</FormLabel>
                                            <Input
                                                type="number"
                                                value={food.calories}
                                                onChange={(e) => onUpdateFood(meal.id, food.id, "calories", e.target.value)}
                                                placeholder="Ex: 150"
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    onClick={() => onRemoveFood(meal.id, food.id)}
                                    variant="ghost"
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}