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
