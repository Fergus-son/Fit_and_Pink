import { useState, useEffect } from "react";
import {
  Section,
  Box,
  Title,
  CaloriesText,
  MacrosGrid,
  MacroBox,
  MacroLabel,
  MacroValue,
  ToggleButtons,
  ToggleButton
} from "../styles/summary";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { getEffectiveUserId, getUserId, tg } from "../telegram";
import { SkeletonLine, SkeletonChart } from "../styles/shared";
// import { FoodEntry } from "./FoodHistoryModal";
import { FoodHistoryModal } from "./FoodHistoryModal";

interface NutritionData {
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
    entries: FoodEntry[];
  }[];
}

interface FoodEntry {
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

export default function SummaryTab() {
  const [macroTab, setMacroTab] = useState<"calories" | "macros">("calories");
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateEntries, setSelectedDateEntries] = useState<FoodEntry[]>([]);

  useEffect(() => {
    const fetchNutritionData = async () => {
      const userId = getEffectiveUserId()
      try {
        const response = await fetch(`/api/nutrition?userId=${userId}`);
        const data = await response.json();
        setNutritionData(data);
      } catch (error) {
        console.error("Failed to fetch nutrition data:", error);
      }
    };

    fetchNutritionData();
  }, []);

  const pieData = nutritionData ? [
    { name: "Consumed", value: nutritionData.consumedCalories },
    { name: "Remaining", value: nutritionData.totalCalories - nutritionData.consumedCalories },
  ] : [];

  const COLORS = ["#f88", "#fdd"];

  const macroData = nutritionData ? [
    { label: "Белок", value: nutritionData.proteins.value, max: nutritionData.proteins.max },
    { label: "Клетчатка", value: nutritionData.fibers.value, max: nutritionData.fibers.max },
    { label: "Углеводы", value: nutritionData.carbs.value, max: nutritionData.carbs.max },
    { label: "Жиры", value: nutritionData.fats.value, max: nutritionData.fats.max },
  ] : [];

  const handleBarClick = (data: any) => {
    if (!data || !data.payload ) return;

    const clickedItem = data.payload;
    setSelectedDate(clickedItem.name);
    setSelectedDateEntries(
      clickedItem.entries?.map((entry: any) => ({
        timestamp: entry.timestamp || new Date().toISOString(),
        name: entry.name,
        calories: entry.calories,
        protein: entry.protein,
        fat: entry.fat,
        carbs: entry.carbs
      })) || []
    );
  };

  const handleSave = async () => {
  try {
    const userId = getEffectiveUserId();
    const response = await fetch(`/api/nutrition/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        date: selectedDate,
        entries: selectedDateEntries,
      }),
    });

    if (!response.ok) throw new Error("Ошибка сохранения");
    setSelectedDate(null); // Закрываем модальное окно после успеха
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

const handleDelete = async (index: number) => {
  try {
    const userId = getEffectiveUserId();
    const entryToDelete = selectedDateEntries[index];
    
    // Удаляем запись на сервере
    const response = await fetch(`/api/nutrition/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        timestamp: entryToDelete.timestamp,
      }),
    });

    if (!response.ok) throw new Error("Ошибка удаления");

    // Обновляем локальное состояние
    const newEntries = [...selectedDateEntries];
    newEntries.splice(index, 1);
    setSelectedDateEntries(newEntries);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

  // const handleSave = () => {
  //   console.log("Changes saved");
  //   setSelectedDate(null);
  // };

  // const handleDelete = (index: number) => {
  //   const newEntries = [...selectedDateEntries];
  //   newEntries.splice(index, 1);
  //   setSelectedDateEntries(newEntries);
  // };

  return (
    <Section>
      <Box>
        <Title>Ежедневный обзор калорий</Title>
        {nutritionData ? (
          <>
            <CaloriesText>{nutritionData.consumedCalories} ккал / {nutritionData.totalCalories} ккал</CaloriesText>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  dataKey="value"
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </>
        ) : (
          <>
            <SkeletonLine width="60%" height="1.5rem" style={{ marginBottom: '16px' }} />
            <SkeletonChart height="150px" />
          </>
        )}
      </Box>

      <Title>Мини-графики БЖУ</Title>
      <MacrosGrid>
        {nutritionData ? (
          macroData.map((m) => (
            <MacroBox key={m.label}>
              <MacroLabel>{m.label}</MacroLabel>
              <MacroValue>
                {m.value} г / {m.max} г
              </MacroValue>
            </MacroBox>
          ))
        ) : (
          Array(4).fill(0).map((_, i) => (
            <MacroBox key={i}>
              <MacroLabel><SkeletonLine width="80%" /></MacroLabel>
              <MacroValue><SkeletonLine width="60%" /></MacroValue>
            </MacroBox>
          ))
        )}
      </MacrosGrid>

      <ToggleButtons>
        <ToggleButton
          active={macroTab === "macros"}
          onClick={() => setMacroTab("macros")}
        >
          БЖУ
        </ToggleButton>
        <ToggleButton
          active={macroTab === "calories"}
          onClick={() => setMacroTab("calories")}
        >
          Калории
        </ToggleButton>
      </ToggleButtons>

      <Title>История потребления</Title>
      {nutritionData ? (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={nutritionData.history}>
            <XAxis dataKey="name" />
            <YAxis hide />
            <Tooltip />
            <Legend />
            {macroTab === "calories" ? (
              <Bar
                dataKey="calories"
                name="Калории"
                fill="#ffc085"
                radius={[4, 4, 0, 0]}
                onClick={handleBarClick}
              />
            ) : (
              <>
                <Bar
                  dataKey="proteins"
                  name="Белки"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                  onClick={handleBarClick}
                />
                <Bar
                  dataKey="fats"
                  name="Жиры"
                  fill="#82ca9d"
                  radius={[4, 4, 0, 0]}
                  onClick={handleBarClick}
                />
                <Bar
                  dataKey="carbs"
                  name="Углеводы"
                  fill="#ffc658"
                  radius={[4, 4, 0, 0]}
                  onClick={handleBarClick}
                />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <SkeletonChart height="150px" />
      )}

      {selectedDate !== null && (
        <FoodHistoryModal
          date={selectedDate}
          entries={selectedDateEntries}
          onClose={() => setSelectedDate(null)}
          onSave={handleSave}
          onDelete={handleDelete}
          isSaveDisabled={selectedDateEntries.length === 0}
        />
      )}
    </Section>
  );
}
