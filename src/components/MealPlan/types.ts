export type FormValues = {
  meals: Meal[];
};

export interface FoodItem {
  id: string
  name: string
  portion: string
  calories: string
  notes: string
  unit_measure: string
}

export type FoodListItem = {
  id: number;
  name: string;
  food_group: string;
  default_portion: {
    energy_value_kcal: number;
    grams: number;
    portion: number;
    unit_measure: string;
  };
};

export interface Meal {
  id?: string
  name: string
  time: string
  foods: FoodItem[]
  notes: string

}

export interface PatientDetails {
  patientName: string
  weight: string
  height: string
}

export type FoodOption = {
  id: number;
  name: string;
  food_group: string;
  default_portion: {
    grams: number;
    energy_value_kcal: number;
    portion: number;
    unit_measure: string;
  };
};



