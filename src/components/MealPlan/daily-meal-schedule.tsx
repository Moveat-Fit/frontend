import { Meal } from './types'
import { Label } from "@radix-ui/react-dropdown-menu"
import { Clock, Plus, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { useState } from "react"
import { Button } from '../ui/button'
import AddFoodToMeal from './add-food-to-meal'

export default function DailyMealSchedule() {

    //Por enquanto vamos usar useForm, mas depois tem que deixar esses valores dinamicos
    const methods = useForm({
        defaultValues: {
            mealTypeName: "",
            timeScheduled: "",
            notes: "",
    }})

    const { control } = methods;

    const [meals, setMeals] = useState<Meal[]>([
        { id: "1", name: "Café da manhã", time: "08:00", foods: [], notes: "" },
        { id: "2", name: "Almoço", time: "12:00", foods: [], notes: "" },
        { id: "3", name: "Lanche", time: "15:00", foods: [], notes: "" },
        { id: "4", name: "Janta", time: "18:00", foods: [], notes: "" },
    ])

    const addMeal = () => {
        const newMeal: Meal = {
            id: Date.now().toString(),
            name: "Nova refeição",
            time: "10:00",
            foods: [],
            notes: "",
        }
        setMeals([...meals, newMeal])
    }

    const removeMeal = (mealId: string) => {
        setMeals(meals.filter((meal) => meal.id !== mealId))
    }


    return (
        <div>
            <div className="space-y-6">
                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary-custom" />
                                <CardTitle className="text-xl text-primary-custom">Cronograma Diário de Refeições & Alimentos</CardTitle>
                            </div>
                            <Button type="button" onClick={addMeal} variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Adicionar refeição
                            </Button>
                        </div>
                        <CardDescription>Planeje refeições específicas com alimentos, porções e horários</CardDescription>

                    </CardHeader>
                    <CardContent className="space-y-6">
                        {meals.map((meal) => (
                            <Card key={meal.id} className="border-l-4 border-l-primary-custom">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                            <div className="space-y-2">
                                                <FormField
                                                    control={control}
                                                    name="mealTypeName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <Label>Título da Refeição</Label>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Ex: Café da manhã, Almoço"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <FormField
                                                    control={control}
                                                    name="timeScheduled"
                                                    render={() => (
                                                        <FormItem>
                                                            <FormLabel>Horário</FormLabel>
                                                            <Input
                                                                id='time_scheduled'
                                                                type="time"
                                                            />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-1">

                                                <FormField
                                                    control={control}
                                                    name="notes"
                                                    render={() => (
                                                        <FormItem>
                                                            <FormLabel className="text-xs">Notas</FormLabel>
                                                            <Input
                                                                type="text"
                                                            />
                                                        </FormItem>
                                                    )}
                                                />

                                            </div>
                                        </div>
                                        <div className="mb-13 ml-4">
                                            <Button type="button" onClick={() => removeMeal(meal.id)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 cursor-pointer">
                                                <Trash2 className="h-4 w-4 3" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <AddFoodToMeal meal={meal} />
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}