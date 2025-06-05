export interface Food {
    food_name: string;
    prescribed_quantity: number;
    unit_measure: string;
    energy_value_kcal: number;
    preparation_notes?: string;
}

export interface PatientMeal {
    id: string;
    name: string;
    time: string;
    foods: Food[];
    notes?: string;
}
