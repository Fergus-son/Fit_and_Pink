export interface CalorieEntry {
  date: string;
  calories: number;
}

export interface UserStats {
  username: string;
  totalCalories: number;
  entries: CalorieEntry[];
}
