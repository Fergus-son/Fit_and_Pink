export interface CalorieEntry {
  date: string;
  calories: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  fiber?: number;
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
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    entries: FoodEntry[];
  }[];
}

export interface FoodEntry {
  timestamp: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  weight: number;
  meal_type: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  subscriptionExpiry: string;
  birthDate: string;
  gender: string;
  goal: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}