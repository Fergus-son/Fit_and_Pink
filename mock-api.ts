import express from 'express';
import cors from 'cors';

interface UserData {
  firstName: string;
  lastName: string;
  subscriptionExpiry: string;
  birthDate: string;
  gender: string;
  goal: string;
  activityLevel: string;
  currentWeight: number;
  desiredWeight: number;
  height: number;
}

interface MacroValue {
  value: number;
  max: number;
}

interface HistoryItem {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  entries: any[];
}

interface NutritionData {
  consumedCalories: number;
  totalCalories: number;
  proteins: MacroValue;
  fibers: MacroValue;
  carbs: MacroValue;
  fats: MacroValue;
  history: HistoryItem[];
}

const app = express();
const port = 3001;

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// Генератор случайных данных
const generateRandomData = (baseValue: number, variation: number = 0.2) => {
  const variationAmount = baseValue * variation;
  return baseValue + (Math.random() * variationAmount * 2 - variationAmount);
};

// Создаем данные для последних 7 дней
const generateNutritionData = (daysAgo: number = 0): NutritionData => {
  const baseCalories = 2000;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  return {
    consumedCalories: Math.round(generateRandomData(baseCalories - daysAgo * 50, 0.15)),
    totalCalories: Math.round(baseCalories - daysAgo * 35),
    proteins: { 
      value: Math.round(generateRandomData(140 - daysAgo * 2, 0.1)),
      max: 150 
    },
    fibers: { 
      value: Math.round(generateRandomData(25 - daysAgo * 0.5, 0.15)),
      max: 30 
    },
    carbs: { 
      value: Math.round(generateRandomData(150 - daysAgo * 3, 0.2)),
      max: 200 
    },
    fats: { 
      value: Math.round(generateRandomData(50 - daysAgo * 1, 0.15)),
      max: 65 
    },
history: Array.from({ length: 7 }, (_, i) => {
  const dayDate = new Date(date);
  dayDate.setDate(dayDate.getDate() - (6 - i));
  
  return {
    name: `Прием пищи ${i + 1}`,
    calories: Math.round(generateRandomData((baseCalories - daysAgo * 50) * 0.9, 0.3)),
    protein: Math.round(generateRandomData(20 - daysAgo * 0.3, 0.4)),
    fat: Math.round(generateRandomData(15 - daysAgo * 0.2, 0.5)),
    carbs: Math.round(generateRandomData(30 - daysAgo * 0.5, 0.6)),
    entries: [{
      timestamp: dayDate.toISOString(),
      name: `Блюдо ${i + 1}`,
      calories: Math.round(generateRandomData(300, 0.3)),
      protein: Math.round(generateRandomData(10, 0.4)),
      fat: Math.round(generateRandomData(5, 0.5)),
      carbs: Math.round(generateRandomData(20, 0.6)),
      fiber: Math.round(generateRandomData(3, 0.5)),
      weight: Math.round(generateRandomData(150, 0.2)),
      meal_type: ["breakfast", "lunch", "dinner", "snack"][i % 4]
    }]
  };
})
  };
};

// Используем let вместо const для userData
let userData: UserData = {
  firstName: "Иван",
  lastName: "Иванов",
  subscriptionExpiry: "2024-12-31",
  birthDate: "1990-01-01",
  gender: "Мужской",
  goal: "Похудение",
  activityLevel: "Умеренная активность",
  currentWeight: 85,
  desiredWeight: 75,
  height: 180,
};

const nutritionDataCache: Record<string, NutritionData> = {};

const getNutritionData = (dateStr: string): NutritionData => {
  if (!nutritionDataCache[dateStr]) {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil(Math.abs(today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    nutritionDataCache[dateStr] = generateNutritionData(Math.min(diffDays, 30));
  }
  return nutritionDataCache[dateStr];
};

app.get('/api/nutrition', (req, res) => {
  const userId = req.query.userId;
  const date = req.query.date as string;
  
  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    res.json(getNutritionData(targetDate));
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/user', (req, res) => {
  res.json(userData);
});

app.post('/api/user/update', (req, res) => {
  // Теперь можно изменять userData, так как это let
  userData = { ...userData, ...req.body };
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});