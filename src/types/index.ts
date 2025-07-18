export interface CalorieEntry {
  date: string;
  calories: number;
}

export interface UserStats {
  username: string;
  totalCalories: number;
  entries: CalorieEntry[];
}

export interface NutritionData {
  consumedCalories: number;
  totalCalories: number;
  proteins: { value: number; max: number };
  fibers: { value: number; max: number };
  carbs: { value: number; max: number };
  fats: { value: number; max: number };
  history: {
    name: string;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
    entries: FoodEntry[];
  }[];
}

export interface FoodEntry {
  name: string;
  time: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}