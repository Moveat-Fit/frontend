/* eslint-disable react/no-unescaped-entities */
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { FoodItem, Meal } from "./types";
import { useFieldArray, useFormContext } from "react-hook-form";

type AddFoodToMealProps = {
    mealIndex: number
    meal: Meal
    onAddFood: (mealIndex: number) => void
    onRemoveFood: (mealIndex: number, foodIndex: number) => void
    onUpdateFood: (mealIndex: number, foodIndex: number, field: keyof FoodItem, value: string) => void
}

export default function AddFoodToMeal({ mealIndex }: AddFoodToMealProps) {
    const { control } = useFormContext();

    const { fields: foods, append, remove: removeFood } = useFieldArray({
        control,
        name: `meals.${mealIndex}.foods`,
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-700">Alimentos e Porções</h4>
                <Button type="button" onClick={() => append({ name: "", portion: "", unit_measure: "", calories: 0 })} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar alimento
                </Button>
            </div>

            {foods.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Nenhum alimento adicionado ainda. Clique em "Adicionar alimento" para começar.</p>
            ) : (
                <div className="space-y-3">
                    {foods.map((food, foodIndex) => (
                        <div key={food.id} className="flex no-wrap gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="space-y-1">

                                <FormField
                                    control={control}
                                    name={`meals.${mealIndex}.foods.${foodIndex}.name`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Nome do alimento</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Ex: Arroz"
                                                    {...field} // integra com react-hook-form
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className="space-y-1">


                                <FormField
                                    control={control}
                                    name={`meals.${mealIndex}.foods.${foodIndex}.portion`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Porção</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: 100g, 1 xícara"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className="space-y-1">
                                <FormField
                                    control={control}
                                    name={`meals.${mealIndex}.foods.${foodIndex}.unit_measure`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Unidade de medida</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: gramas"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className="space-y-1">
                                <FormField
                                    control={control}
                                    name={`meals.${mealIndex}.foods.${foodIndex}.calories`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs">Valor energético (kcal)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Ex: 150"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    onClick={() => removeFood(foodIndex)}
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