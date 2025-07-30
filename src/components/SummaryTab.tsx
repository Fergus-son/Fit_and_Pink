import { useState, useEffect } from "react";
import {
  Card,
  Title,
  ToggleContainer,
  ToggleButton,
  MacroValue,
} from "../styles/summary";
import { getEffectiveUserId } from "../telegram";
import { NutritionBarChart } from "./Charts/BarChart/NutritionBarChart";
import DateSelector from "./DateSelector/DateSelector";
import { NutritionChart } from "./Charts/PieCharts/NutritionChart";

interface MacroValue {
  value: number;
  max: number;
}

interface NutritionData {
  consumedCalories: number;
  totalCalories: number;
  proteins: MacroValue;
  fibers: MacroValue;
  carbs: MacroValue;
  fats: MacroValue;
  history?: {
    name: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    entries: any[];
  }[];
}

export default function SummaryTab() {
  const [activeTab, setActiveTab] = useState<"calories" | "macros">("calories");
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchNutritionData = async () => {
      const userId = getEffectiveUserId();
      try {

        // Форматируем дату в YYYY-MM-DD
        const dateStr = selectedDate.toISOString().split('T')[0];

        const response = await fetch(`/api/nutrition?userId=${userId}&date=${dateStr}`);
        const data = await response.json();
        setNutritionData(data);
      } catch (error) {
        console.error("Failed to fetch nutrition data:", error);
      } 
    };

    fetchNutritionData();
  }, [selectedDate]); // Зависимость от selectedDate

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  if (!nutritionData) {
    return <Card>Ошибка загрузки данных</Card>;
  }

  return (
    <>
      <DateSelector onDateSelect={handleDateSelect} />
      <Title>Ежедневный обзор питания</Title>
      <ToggleContainer>
        <ToggleButton
          active={activeTab === "macros"}
          onClick={() => setActiveTab("macros")}
        >
          БЖУ
        </ToggleButton>
        <ToggleButton
          active={activeTab === "calories"}
          onClick={() => setActiveTab("calories")}
        >
          Калории
        </ToggleButton>
      </ToggleContainer>

      <Card>
        <NutritionChart type={activeTab} data={nutritionData} />
      </Card>
      <Title>История питания</Title>
      <Card>
        <NutritionBarChart type={activeTab} data={nutritionData} />
      </Card>
    </>
  );
}