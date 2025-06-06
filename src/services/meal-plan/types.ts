export interface MealPlanRequest {
  patient_id: number;
  plan_name: string;
  start_date: string;
  end_date: string;
  goals: string;
  entries: MealPlanEntry[];
}

export interface MealPlanEntry {
  meal_type_name: string;
  day_of_plan: string;
  time_scheduled: string;
  notes?: string;
  foods: MealFoodEntry[];
}

export interface MealFoodEntry {
  food_id: number;
  prescribed_quantity_grams: number;
  display_portion: string;
  preparation_notes?: string;
}

export type MealPlanApiPayload = {
  patient_id: string;
  plan_name: string;
  start_date: string;
  end_date: string;
  goals: string;
  entries: {
    meal_type_name: string;
    day_of_plan: string;
    time_scheduled: string;
    notes: string;
    foods: {
      food_name: string;
      prescribed_quantity: number;
      unit_measure: string;
      energy_value_kcal: number;
      preparation_notes?: string;
    }[];
  }[];
};
