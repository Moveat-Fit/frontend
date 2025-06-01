/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { findPatientDataById } from "@/services/patient/patientService"
import { PatientDetailsProps } from "@/services/patient/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import MealPlanDetails from "./meal-plan-details"
import DailyMealSchedule from "./daily-meal-schedule"
import { zodResolver } from "@hookform/resolvers/zod"
import { MealPlanFormData, mealPlanSchema } from "@/schemas/meal-plan-schema"
import Link from "next/link"
import { format } from "date-fns"
import { createMealPlan } from "@/services/meal-plan/mealPlansService";
import ToastError from "../ToastError"
import ToastSuccess from "../ToastSuccess"

export default function MealPlanForm() {
  const { patient_id } = useParams();

  const [patientData, setPatientData] = useState<PatientDetailsProps>();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await findPatientDataById(patient_id as string);
        const patient = response.patient?.[0];
        setPatientData(patient);

        if (!patient) return;

      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
      }
    };

    if (patient_id) {
      fetchPatientData();
    }
  }, [patient_id]);

  const form = useForm<MealPlanFormData>({
    resolver: zodResolver(mealPlanSchema),
    defaultValues: {
      planName: "",
      startDate: undefined,
      endDate: undefined,
      goals: "",
      meals: [],
    },
  });


  const onSubmit = async (data: MealPlanFormData) => {
    const payload = {
      patient_id: patient_id,
      plan_name: data.planName,
      start_date: format(new Date(data.startDate), "yyyy-MM-dd"),
      end_date: format(new Date(data.endDate), "yyyy-MM-dd"),
      goals: data.goals,
      entries: data.meals.map((meal) => ({
        meal_type_name: meal.name,
        day_of_plan: format(new Date(data.startDate), "yyyy-MM-dd"),
        time_scheduled: meal.time,
        notes: meal.notes,
        foods: meal.foods.map((food) => ({
          food_name: food.name,
          prescribed_quantity: food.portion,
          unit_measure: food.unit_measure,
          energy_value_kcal: food.calories,
          ...(food.notes && { preparation_notes: food.notes })
        }))
      }))
    };

    try {
      await createMealPlan(payload);
      ToastSuccess({ message: "Plano alimentar criado com sucesso!" });
      form.reset();
    } catch (error: any) {
      // Pega a mensagem do erro que você jogou na função createMealPlan
      const errorMessage = error.message || "Erro ao criar plano alimentar. Verifique os dados e tente novamente.";
      ToastError({ message: errorMessage });
      console.error("Erro ao criar plano alimentar:", error);
    }

  }


  return (
    <div className="min-h-screen bg">
      <div className="max-w-4xl">
        <div className="container space-y-2">
          <div className="flex justify-between items-center">
            <div className="pb-3">
              <h1 className="text-3xl font-bold text-primary-custom">Criar plano alimentar</h1>
              <h2 className="text-muted-foreground">Preencha os dados do paciente e configure o plano nutricional</h2>
            </div>
          </div>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>


              <MealPlanDetails patientData={patientData} />
              <DailyMealSchedule />


              <div className="flex justify-between items-center space-x-4 ">
                <div className="text-center">
                  <Link href={`/dashboard/professional`}>
                    <Button variant={"cancel"}>
                      Cancelar plano alimentar
                    </Button>
                  </Link>
                </div>
                <div className="text-center">
                  <Button type="submit" variant={"primary"}>
                    Salvar plano alimentar
                  </Button>
                </div>
              </div>
            </form>

          </FormProvider>


        </div>
      </div>
    </div >
  )
}
