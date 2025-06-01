"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { FoodItem, FoodOption, FormValues, Meal } from "./types"
import { Clock, Plus, Trash2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import AddFoodToMeal from "./add-food-to-meal"
import { useEffect, useState } from "react"
import { fetchFoodList } from "@/services/meal-plan/mealPlansService"

export default function DailyMealSchedule() {
    const [foodList, setFoodList] = useState<FoodOption[]>([]);

    const { control, formState: { errors } } = useFormContext<FormValues>()
    const mealsError = errors.meals?.root?.message || errors.meals?.message;
    useEffect(() => {
        console.log("Meals errors:", errors.meals);
    }, [errors.meals]);

    const { fields: meals, append, remove, update } = useFieldArray({
        control,
        name: "meals",
    })

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetchFoodList();
                setFoodList(response);
                console.log("Lista de alimentos:", response);
            } catch (error) {
                console.error("Erro ao buscar dados do paciente:", error);
            }
        };

        fetchFoods();
    }, []);

    const addMeal = () => {
        append({
            name: "Nova refeição",
            time: "10:00",
            foods: [],
            notes: "",
        })
    }

    const removeMealByIndex = (index: number) => {
        remove(index)
    }

    const addFoodToMeal = (mealIndex: number) => {
        const newFood: FoodItem = {
            id: Date.now().toString(),
            name: "",
            portion: "",
            calories: "",
            notes: "",
            unit_measure: "",
        }

        const updatedMeal = meals[mealIndex]
        const updatedFoods = [...(updatedMeal.foods || []), newFood]

        update(mealIndex, {
            ...updatedMeal,
            foods: updatedFoods,
        })
    }

    const removeFoodFromMeal = (mealIndex: number, foodIndex: number) => {
        const updatedMeal = meals[mealIndex]
        const updatedFoods = [...updatedMeal.foods]
        updatedFoods.splice(foodIndex, 1)

        update(mealIndex, {
            ...updatedMeal,
            foods: updatedFoods,
        })
    }

    const updateFood = (
        mealIndex: number,
        foodIndex: number,
        field: keyof FoodItem,
        value: string
    ) => {
        const updatedMeal = meals[mealIndex]
        const updatedFoods = [...updatedMeal.foods]

        updatedFoods[foodIndex] = {
            ...updatedFoods[foodIndex],
            [field]: value,
        }

        update(mealIndex, {
            ...updatedMeal,
            foods: updatedFoods,
        })
    }

    return (
        <div>
            <div className="space-y-6">
                <Card className={`mb-6 ${errors.meals?.message ? "border border-red-500" : ""}`}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className={`h-5 w-5 ${errors.meals?.message ? " text-red-500" : "text-primary-custom"}`} />
                                <CardTitle className={`text-xl ${errors.meals?.message ? " text-red-500" : "text-primary-custom"}`}>
                                    Cronograma Diário de Refeições & Alimentos
                                </CardTitle>
                            </div>
                            <Button type="button" onClick={addMeal} variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar refeição
                            </Button>
                        </div>
                        <CardDescription>
                            Planeje refeições específicas com alimentos, porções e horários
                        </CardDescription>
                        {mealsError && (
                            <FormMessage className="text-red-500 text-sm">Inclua pelo menos 1 refeição.</FormMessage>
                        )}


                    </CardHeader>

                    <CardContent className="space-y-6">
                        {meals.map((meal: Meal, mealIndex: number) => (
                            <Card key={meal.id || mealIndex} className="border-l-4 border-l-primary-custom">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                            <div className="space-y-2">
                                                <FormField
                                                    control={control}
                                                    name={`meals.${mealIndex}.name`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs">Título da Refeição *</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Ex: Café da manhã, Almoço" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <FormField
                                                    control={control}
                                                    name={`meals.${mealIndex}.time`}
                                                    render={({ field }) => {
                                                        const [rawHours, rawMinutes] = field.value ? field.value.split(':') : ['', ''];

                                                        const isValidHour = (val: string) =>
                                                            /^([0-9]{0,2})$/.test(val) && (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 23));
                                                        const isValidMinute = (val: string) =>
                                                            /^([0-9]{0,2})$/.test(val) && (val === '' || (parseInt(val) >= 0 && parseInt(val) <= 59));

                                                        const handleHourChange = (val: string) => {
                                                            const digits = val.replace(/\D/g, '');
                                                            if (isValidHour(digits)) {
                                                                const finalMinutes = rawMinutes || '';
                                                                const time = digits.length === 2 && finalMinutes.length === 2
                                                                    ? `${digits.padStart(2, '0')}:${finalMinutes.padStart(2, '0')}`
                                                                    : `${digits}:${finalMinutes}`;
                                                                field.onChange(time);
                                                            }
                                                        };

                                                        const handleMinuteChange = (val: string) => {
                                                            const digits = val.replace(/\D/g, '');
                                                            if (isValidMinute(digits)) {
                                                                const finalHours = rawHours || '';
                                                                const time = finalHours.length === 2 && digits.length === 2
                                                                    ? `${finalHours.padStart(2, '0')}:${digits.padStart(2, '0')}`
                                                                    : `${finalHours}:${digits}`;
                                                                field.onChange(time);
                                                            }
                                                        };

                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="text-xs">Horário *</FormLabel>
                                                                <FormControl>
                                                                    <div className="flex gap-2">
                                                                        <Input
                                                                            data-testid="input-hourMeal"
                                                                            type="text"
                                                                            inputMode="numeric"
                                                                            maxLength={2}
                                                                            placeholder="HH"
                                                                            value={rawHours}
                                                                            onChange={(e) => handleHourChange(e.target.value)}
                                                                            className="w-14 text-center"
                                                                        />
                                                                        <span className="self-center text-sm">:</span>
                                                                        <Input
                                                                            data-testid="input-minutesMeal"
                                                                            type="text"
                                                                            inputMode="numeric"
                                                                            maxLength={2}
                                                                            placeholder="MM"
                                                                            value={rawMinutes}
                                                                            onChange={(e) => handleMinuteChange(e.target.value)}
                                                                            className="w-14 text-center"
                                                                        />
                                                                        <Clock className="h-4 w-4 text-gray-500 self-center" />
                                                                    </div>
                                                                </FormControl>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />


                                            </div>
                                            <div className="space-y-1">
                                                <FormField
                                                    control={control}
                                                    name={`meals.${mealIndex}.notes`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs">Notas</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    data-testid="input-notesMeal"
                                                                    placeholder="Ex: Incluir frutas, evitar açúcar"
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-13 ml-4">
                                            <Button
                                                type="button"
                                                onClick={() => removeMealByIndex(mealIndex)}
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 cursor-pointer"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <AddFoodToMeal
                                        foodList={foodList}
                                        mealIndex={mealIndex}
                                        meal={meal}
                                        onAddFood={addFoodToMeal}
                                        onRemoveFood={removeFoodFromMeal}
                                        onUpdateFood={updateFood}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>

                </Card>
            </div>

        </div>
    )
}
