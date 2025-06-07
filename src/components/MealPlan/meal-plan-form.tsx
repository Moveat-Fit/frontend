"use client"

import { Button } from "@/components/ui/button"
import { findPatientDataById } from "@/services/patient/patientService"
import { PatientDetailsProps } from "@/services/patient/types"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import MealPlanDetails from "./meal-plan-details"
import DailyMealSchedule from "./daily-meal-schedule"
import { zodResolver } from "@hookform/resolvers/zod"
import { MealPlanFormData, mealPlanSchema } from "@/schemas/meal-plan-schema"
import Link from "next/link"
import { format } from "date-fns"
import { createMealPlan, updateMealPlan, mealPlanDetails } from "@/services/meal-plan/mealPlansService"
import ToastError from "../ToastError"
import ToastSuccess from "../ToastSuccess"

export default function MealPlanForm() {
  const router = useRouter()
  const pathname = usePathname()
  const isEditing = pathname.includes("edit-meal-plan")
  const { patient_id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [patientData, setPatientData] = useState<PatientDetailsProps>()
  const [planId, setPlanId] = useState<number | null>(null)

  const form = useForm<MealPlanFormData>({
    resolver: zodResolver(mealPlanSchema),
    defaultValues: {
      planName: "",
      startDate: undefined,
      endDate: undefined,
      goals: "",
      meals: [],
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await findPatientDataById(patient_id as string)
        const patient = patientResponse.patient?.[0]
        setPatientData(patient)

        if (isEditing) {
          const mealPlanResponse = await mealPlanDetails(patient_id as string)

          if (mealPlanResponse?.meal_plan) {
            const plan = mealPlanResponse.meal_plan
            setPlanId(plan.id)

            form.reset({
              planName: plan.plan_name,
              startDate: new Date(plan.start_date),
              endDate: new Date(plan.end_date),
              goals: plan.goals ?? "",
              meals: plan.entries.map((entry: any) => ({
                name: entry.meal_type_name,
                time: entry.time_scheduled,
                notes: entry.notes ?? "",
                foods: entry.foods.map((food: any) => ({
                  name: food.food_name,
                  portion: food.prescribed_quantity,
                  unit_measure: food.unit_measure,
                  calories: food.energy_value_kcal,
                  notes: food.preparation_notes ?? "",
                })),
              })),
            })
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (patient_id) {
      fetchData()
    }
  }, [form, isEditing, patient_id])


  const onSubmit = async (data: MealPlanFormData) => {
    const patientId = patient_id as string

    const payload = {
      patient_id: patientId,
      plan_name: data.planName,
      start_date: format(new Date(data.startDate), "yyyy-MM-dd"),
      end_date: format(new Date(data.endDate), "yyyy-MM-dd"),
      goals: data.goals ?? "",
      entries: data.meals.map((meal) => ({
        meal_type_name: meal.name,
        day_of_plan: format(new Date(data.startDate), "yyyy-MM-dd"),
        time_scheduled: meal.time,
        notes: meal.notes ?? "",
        foods: meal.foods.map((food) => ({
          food_name: food.name,
          prescribed_quantity: food.portion,
          unit_measure: food.unit_measure,
          energy_value_kcal: food.calories,
          preparation_notes: food.notes ?? "",
        })),
      })),
    }

    try {
      if (isEditing) {
        await updateMealPlan(patientId, payload)
        ToastSuccess({ message: "Plano alimentar atualizado com sucesso!" })

      } else {
        await createMealPlan(payload)
        ToastSuccess({ message: "Plano alimentar criado com sucesso!" })
        form.reset()
      }
      router.push("/dashboard/professional")
    } catch (error: any) {
      const errorMessage = error.message || "Erro ao salvar plano alimentar. Verifique os dados."
      ToastError({ message: errorMessage })
      console.error("Erro ao salvar plano alimentar:", error)
    }
  }

  if (isLoading || (isEditing && planId === null)) {
    return <div>Carregando dados do plano alimentar...</div>
  }


  return (
    <div className="min-h-screen bg">
      <div className="max-w-4xl">
        <div className="container space-y-2">
          <div className="flex justify-between items-center pb-3">
            <div>
              <h1 className="text-3xl font-bold text-primary-custom">
                {isEditing ? "Editar plano alimentar" : "Criar plano alimentar"}
              </h1>
              <h2 className="text-muted-foreground">
                Preencha os dados do paciente e configure o plano nutricional
              </h2>
            </div>
          </div>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <MealPlanDetails patientData={patientData} />
              <DailyMealSchedule />

              <div className="flex justify-between items-center space-x-4">
                <Link href={`/dashboard/professional`}>
                  <Button variant={"cancel"}>Cancelar plano alimentar</Button>
                </Link>

                <Button type="submit" variant={"primary"}>
                  {planId ? "Salvar alterações" : "Salvar plano alimentar"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
