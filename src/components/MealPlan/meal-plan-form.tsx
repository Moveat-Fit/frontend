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

        console.log("Dados do paciente:", response);
      } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
      }
    };

    if (patient_id) {
      fetchPatientData();
    }
  }, [patient_id]);

  const form = useForm({
    defaultValues: {}
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Complete meal plan registered:")
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


            <MealPlanDetails patientData={patientData} />

            <DailyMealSchedule />


          </FormProvider>

          <div className="flex justify-between items-center space-x-4 ">
            <div className="text-center">
              <Button onClick={handleSubmit} variant={"cancel"}>
                Cancelar plano alimentar
              </Button>
            </div>
            <div className="text-center">
              <Button onClick={handleSubmit} variant={"primary"}>
                Salvar plano alimentar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
