/* eslint-disable react/no-unescaped-entities */
import { Label } from "@radix-ui/react-dropdown-menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { FoodItem, Meal } from "./types";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type AddFoodToMealProps = {
    meal: Meal;
};

export default function AddFoodToMeal({ meal }: AddFoodToMealProps) {
    const { control } = useFormContext();

    const [meals, setMeals] = useState<Meal[]>([
        { id: "1", name: "Café da manhã", time: "08:00", foods: [], notes: "" },
        { id: "2", name: "Almoço", time: "12:00", foods: [], notes: "" },
        { id: "3", name: "Lanche", time: "15:00", foods: [], notes: "" },
        { id: "4", name: "Janta", time: "18:00", foods: [], notes: "" },
    ])

    const addFoodToMeal = (mealId: string) => {
        const newFood: FoodItem = {
            id: Date.now().toString(),
            name: "",
            portion: "",
            calories: "",
            notes: "",
        }
        setMeals(meals.map((meal) => (meal.id === mealId ? { ...meal, foods: [...meal.foods, newFood] } : meal)))
    }

    const removeFoodFromMeal = (mealId: string, foodId: string) => {
        setMeals(
            meals.map((meal) =>
                meal.id === mealId ? { ...meal, foods: meal.foods.filter((food) => food.id !== foodId) } : meal,
            ),
        )
    }

    const updateFood = (mealId: string, foodId: string, field: keyof FoodItem, value: string) => {
        setMeals(
            meals.map((meal) =>
                meal.id === mealId
                    ? {
                        ...meal,
                        foods: meal.foods.map((food) => (food.id === foodId ? { ...food, [field]: value } : food)),
                    }
                    : meal,
            ),
        )
    }

    // const getPlaceholderByUnit = (unit: string) => {
    //     switch (unit) {
    //         case 'g':
    //             return 'Ex: 150';
    //         case 'kg':
    //             return 'Ex: 0.5';
    //         case 'mg':
    //             return 'Ex: 500';
    //         case 'ml':
    //             return 'Ex: 200';
    //         case 'l':
    //             return 'Ex: 1';
    //         case 'unit':
    //             return 'Ex: 2';
    //         case 'tbsp':
    //             return 'Ex: 1';
    //         case 'tsp':
    //             return 'Ex: 0.5';
    //         case 'cup':
    //             return 'Ex: 1';
    //         case 'slice':
    //             return 'Ex: 1';
    //         case 'piece':
    //             return 'Ex: 1';
    //         case 'package':
    //             return 'Ex: 1';
    //         case 'portion':
    //             return 'Ex: 1';
    //         default:
    //             return 'Ex: 150';
    //     }
    // };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">Alimentos e Porções</h4>
                <Button type="button" onClick={() => addFoodToMeal(meal.id)} variant="outline" size="sm">
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
                                                onChange={(e) => updateFood(meal.id, food.id, "name", e.target.value)}
                                            />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className="space-y-1 w-40">


                                <FormField
                                    control={control}
                                    name="entries.0.foods.0.prescribed_quantity"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-xs ">Porção</FormLabel>
                                            <Input
                                                value={food.portion}
                                                onChange={(e) => updateFood(meal.id, food.id, "portion", e.target.value)}
                                            // placeholder={getPlaceholderByUnit(meal.foodsunitMeasure)}
                                            />
                                        </FormItem>
                                    )}
                                />




                            </div>

                            <div className="space-y-1 w-65">
                                <Label className="text-xs">Unidade de medida</Label>
                                <Select
                                // value={unitMeasure}
                                // onValueChange={(value) => setUnitMeasure(value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione a unidade de medida" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="g">Grama</SelectItem>
                                        <SelectItem value="kg">Quilograma</SelectItem>
                                        <SelectItem value="mg">Miligrama</SelectItem>
                                        <SelectItem value="ml">Mililitro</SelectItem>
                                        <SelectItem value="l">Litro</SelectItem>
                                        <SelectItem value="unit">Unidade</SelectItem>
                                        <SelectItem value="tbsp">Colher de sopa</SelectItem>
                                        <SelectItem value="tsp">Colher de chá</SelectItem>
                                        <SelectItem value="cup">Xícara</SelectItem>
                                        <SelectItem value="slice">Fatia</SelectItem>
                                        <SelectItem value="piece">Pedaço</SelectItem>
                                        <SelectItem value="package">Pacote</SelectItem>
                                        <SelectItem value="portion">Porção</SelectItem>
                                    </SelectContent>

                                </Select>
                            </div>
                            <div className="space-y-1">

                                <FormField
                                    control={control}
                                    name="entries.0.foods.0.energy_value_kcal"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Valor energético (kcal)</FormLabel>
                                            <Input
                                                className="relative bottom-1"
                                                type="number"
                                                value={food.calories}
                                                onChange={(e) => updateFood(meal.id, food.id, "calories", e.target.value)}
                                                placeholder="Ex: 150"
                                            />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    onClick={() => removeFoodFromMeal(meal.id, food.id)}
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