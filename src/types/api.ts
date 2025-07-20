import { tg } from "../telegram";
import { UserStats, NutritionData, UserProfile, FoodEntry } from "./index";

const API_BASE = '/api'; // Используем относительные пути

const fetchApi = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}?userId=${tg.initDataUnsafe.user?.id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  getStats: (): Promise<UserStats> => fetchApi('/stats'),
  getNutrition: (): Promise<NutritionData> => fetchApi('/nutrition'),
  getUserProfile: (): Promise<UserProfile> => fetchApi('/profile'),
  deleteFoodEntry: (entryId: string) => 
    fetch(`${API_BASE}/entries/${entryId}`, { method: 'DELETE' }),
};