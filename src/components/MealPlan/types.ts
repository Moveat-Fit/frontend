export interface FoodItem {
  id: string
  name: string
  portion: string
  calories: string
  notes: string
}

export interface Meal {
  id: string
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
