import express from 'express';
import cors from 'cors';

// Типы данных
interface FoodEntry {
  id: string;
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

interface DaySummary {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

interface NutritionData {
  consumedCalories: number;
  totalCalories: number;
  proteins: { value: number; max: number };
  fibers: { value: number; max: number };
  carbs: { value: number; max: number };
  fats: { value: number; max: number };
  history: DaySummary[];
}

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

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// Вспомогательные функции
const generateRandomData = (baseValue: number, variation: number = 0.2): number => {
  const variationAmount = baseValue * variation;
  return baseValue + (Math.random() * variationAmount * 2 - variationAmount);
};

const generateId = (): string => Math.random().toString(36).substr(2, 9);

// Генерация истории питания
const generateFoodHistory = (days: number = 30): FoodEntry[] => {
  const meals = ['Манная каша', 'Гречневая каша', 'Омлет', 'Куриная грудка', 'Рыба на гриле'];
  const history: FoodEntry[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const mealsCount = 3 + Math.floor(Math.random() * 2);
    for (let j = 0; j < mealsCount; j++) {
      const mealTime = new Date(date);
      mealTime.setHours(8 + j * 4);

      const entry: FoodEntry = {
        id: generateId(),
        timestamp: mealTime.toISOString(),
        name: meals[Math.floor(Math.random() * meals.length)],
        calories: Math.round(generateRandomData(400, 0.3)),
        protein: Math.round(generateRandomData(20, 0.4)),
        fat: Math.round(generateRandomData(15, 0.5)),
        carbs: Math.round(generateRandomData(30, 0.6)),
        fiber: Math.round(generateRandomData(3, 0.5)),
        weight: Math.round(generateRandomData(200, 0.2)),
        meal_type: ['breakfast', 'lunch', 'dinner', 'snack'][j % 4]
      };

      history.push(entry);
    }
  }

  return history;
};

// Генерация сводки по дням
const generateNutritionSummary = (daysAgo: number = 0): NutritionData => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  const history: DaySummary[] = Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(date);
    dayDate.setDate(dayDate.getDate() - (6 - i));
    
    return {
      name: dayDate.toLocaleDateString('ru-RU', { weekday: 'short' }),
      calories: Math.round(generateRandomData(1800, 0.2)),
      protein: Math.round(generateRandomData(120, 0.15)),
      fat: Math.round(generateRandomData(50, 0.15)),
      carbs: Math.round(generateRandomData(200, 0.2)),
      fiber: Math.round(generateRandomData(20, 0.1))
    };
  });

  return {
    consumedCalories: history.reduce((sum, day) => sum + day.calories, 0),
    totalCalories: 2000,
    proteins: { value: Math.round(generateRandomData(120, 0.1)), max: 150 },
    fibers: { value: Math.round(generateRandomData(20, 0.15)), max: 30 },
    carbs: { value: Math.round(generateRandomData(150, 0.2)), max: 200 },
    fats: { value: Math.round(generateRandomData(50, 0.15)), max: 65 },
    history
  };
};

// Эндпоинты
app.get('/api/nutrition', (req, res) => {
  try {
    const daysAgo = parseInt(req.query.daysAgo as string) || 0;
    const data: NutritionData = generateNutritionSummary(daysAgo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/nutrition/history', (req, res) => {
  try {
    const data: FoodEntry[] = generateFoodHistory(30);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Данные пользователя
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

app.get('/api/user', (req, res) => {
  res.json(userData);
});

app.post('/api/user/update', (req, res) => {
  userData = { ...userData, ...req.body };
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});