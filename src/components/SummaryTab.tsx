import { useState } from "react";
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
    proteins: number;
    fats: number;
    carbs: number;
    entries: FoodEntry[];
  }[];
}

interface FoodEntry {
  name: string;
  time: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

export default function SummaryTab() {
  const [macroTab, setMacroTab] = useState<"calories" | "macros">("calories");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateEntries, setSelectedDateEntries] = useState<FoodEntry[]>([]);

  // Статичные данные для тестирования
  const nutritionData: NutritionData = {
    consumedCalories: 1850,
    totalCalories: 2500,
    proteins: { value: 120, max: 150 },
    fibers: { value: 25, max: 30 },
    carbs: { value: 200, max: 300 },
    fats: { value: 65, max: 80 },
    history: [
      {
        name: "Пн",
        calories: 1800,
        proteins: 110,
        fats: 60,
        carbs: 190,
        entries: [
          {
            name: "Овсянка",
            time: "08:30",
            calories: 300,
            proteins: 10,
            fats: 5,
            carbs: 50
          },
          {
            name: "Курица с рисом",
            time: "13:00",
            calories: 600,
            proteins: 50,
            fats: 20,
            carbs: 70
          }
        ]
      },
      {
        name: "Вт",
        calories: 2100,
        proteins: 130,
        fats: 70,
        carbs: 220,
        entries: [
          {
            name: "Омлет",
            time: "09:00",
            calories: 350,
            proteins: 20,
            fats: 25,
            carbs: 5
          }
        ]
      },
      {
        name: "Ср",
        calories: 1700,
        proteins: 100,
        fats: 50,
        carbs: 180,
        entries: []
      },
      {
        name: "Чт",
        calories: 2300,
        proteins: 140,
        fats: 75,
        carbs: 240,
        entries: []
      },
      {
        name: "Пт",
        calories: 1900,
        proteins: 115,
        fats: 65,
        carbs: 200,
        entries: []
      },
      {
        name: "Сб",
        calories: 1600,
        proteins: 90,
        fats: 45,
        carbs: 170,
        entries: []
      },
      {
        name: "Вс",
        calories: 2200,
        proteins: 135,
        fats: 70,
        carbs: 230,
        entries: []
      }
    ]
  };

  const pieData = [
    { name: "Consumed", value: nutritionData.consumedCalories },
    { name: "Remaining", value: nutritionData.totalCalories - nutritionData.consumedCalories },
  ];

  const COLORS = ["#f88", "#fdd"];

  const macroData = [
    { label: "Белок", value: nutritionData.proteins.value, max: nutritionData.proteins.max },
    { label: "Клетчатка", value: nutritionData.fibers.value, max: nutritionData.fibers.max },
    { label: "Углеводы", value: nutritionData.carbs.value, max: nutritionData.carbs.max },
    { label: "Жиры", value: nutritionData.fats.value, max: nutritionData.fats.max },
  ];

  const handleBarClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const index = data.activePayload[0].payload.index;
      if (nutritionData.history[index]) {
        setSelectedDate(nutritionData.history[index].name);
        setSelectedDateEntries(nutritionData.history[index].entries || []);
      }
    }
  };

  const handleSave = () => {
    console.log("Changes saved");
    setSelectedDate(null);
  };

  const handleDelete = (index: number) => {
    console.log("Delete entry at index", index);
    const newEntries = [...selectedDateEntries];
    newEntries.splice(index, 1);
    setSelectedDateEntries(newEntries);
  };

  const historyData = nutritionData.history.map((item, index) => ({
    ...item,
    index
  }));

  return (
    <Section>
      <Box>
        <Title>Ежедневный обзор калорий</Title>
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
      </Box>

      <Title>Мини-графики БЖУ</Title>
      <MacrosGrid>
        {macroData.map((m) => (
          <MacroBox key={m.label}>
            <MacroLabel>{m.label}</MacroLabel>
            <MacroValue>
              {m.value} г / {m.max} г
            </MacroValue>
          </MacroBox>
        ))}
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
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={historyData}
          onClick={handleBarClick}
        >
          <XAxis dataKey="name" />
          <YAxis hide={macroTab === "calories"} />
          <Tooltip />
          <Legend />
          {macroTab === "calories" ? (
            <Bar 
              dataKey="calories" 
              name="Калории" 
              fill="#ffc085" 
              radius={[4, 4, 0, 0]} 
            />
          ) : (
            <>
              <Bar 
                dataKey="proteins" 
                name="Белки" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="fats" 
                name="Жиры" 
                fill="#82ca9d" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="carbs" 
                name="Углеводы" 
                fill="#ffc658" 
                radius={[4, 4, 0, 0]} 
              />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>

      {selectedDate && (
        <FoodHistoryModal
          date={selectedDate}
          entries={selectedDateEntries}
          onClose={() => setSelectedDate(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </Section>
  );
}