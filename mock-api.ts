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

let nutritionData: NutritionData = {
  consumedCalories: 1900,
  totalCalories: 2000,
  proteins: { value: 148, max: 150 },
  fibers: { value: 25, max: 30 },
  carbs: { value: 150, max: 200 },
  fats: { value: 49, max: 65 },
  history: [
    {
      name: "Пн",
      calories: 2800,
      protein: 120,
      fat: 20,
      carbs: 100,
      entries: []
    },
    {
      name: "Вт",
      calories: 3000,
      protein: 60,
      fat: 70,
      carbs: 110,
      entries: []
    },
    {
      name: "Ср",
      calories: 2400,
      protein: 40,
      fat: 100,
      carbs: 10,
      entries: []
    },
    {
      name: "Чт",
      calories: 2000,
      protein: 60,
      fat: 10,
      carbs: 400,
      entries: []
    },
    {
      name: "Пт",
      calories: 900,
      protein: 40,
      fat: 90,
      carbs: 200,
      entries: []
    },
    {
      name: "Сб",
      calories: 1500,
      protein: 120,
      fat: 50,
      carbs: 150,
      entries: []
    },
    {
      name: "Вс",
      calories: 1000,
      protein: 10,
      fat: 50,
      carbs: 60,
      entries: []
    },

  ]
};

app.get('/api/nutrition', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "User ID required" });

  res.json(nutritionData);
});

// Роуты
app.get('/api/user', (req, res) => {
  res.json(userData);
});

app.post('/api/user/update', (req, res) => {
  userData = { ...userData, ...req.body };
  res.json({ success: true });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});