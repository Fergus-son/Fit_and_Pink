import { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../types/api";
import { 
  Section, Box, Title, CaloriesText, 
  MacrosGrid, MacroBox, MacroLabel, MacroValue,
  ToggleButtons, ToggleButton 
} from "../styles/summary";
import { 
  ResponsiveContainer, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from "recharts";
import { FoodHistoryModal } from "./FoodHistoryModal";
import { SkeletonLine, SkeletonChart, ErrorMessage } from "../styles/Skeleton";
import { FoodEntry } from "../types";

const COLORS = ["#f88", "#fdd"];

export default function SummaryTab() {
  const [macroTab, setMacroTab] = useState<"calories" | "macros">("calories");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateEntries, setSelectedDateEntries] = useState<FoodEntry[]>([]);

  const { data, isLoading, error } = useQuery('nutrition', api.getNutrition);

  const pieData = data ? [
    { name: "Consumed", value: data.consumedCalories },
    { name: "Remaining", value: data.totalCalories - data.consumedCalories },
  ] : [];

  const macroData = [
    { label: "Белок", value: data?.proteins.value || 0, max: data?.proteins.max || 0 },
    { label: "Клетчатка", value: data?.fibers.value || 0, max: data?.fibers.max || 0 },
    { label: "Углеводы", value: data?.carbs.value || 0, max: data?.carbs.max || 0 },
    { label: "Жиры", value: data?.fats.value || 0, max: data?.fats.max || 0 },
  ];

  const handleBarClick = (data: any) => {
    if (!data?.activePayload?.[0]?.payload) return;
    const { name, entries = [] } = data.activePayload[0].payload;
    setSelectedDate(name);
    setSelectedDateEntries(entries);
  };

  if (error) return <ErrorMessage>Ошибка загрузки данных</ErrorMessage>;

  return (
    <Section>
      <Box>
        <Title>Ежедневный обзор калорий</Title>
        {isLoading ? (
          <>
            <SkeletonLine width="60%" height="1.5rem" />
            <SkeletonChart height="150px" />
          </>
        ) : (
          <>
            <CaloriesText>
              {data?.consumedCalories} ккал / {data?.totalCalories} ккал
            </CaloriesText>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={50}>
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </Box>

      <Title>Мини-графики БЖУ</Title>
      <MacrosGrid>
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <MacroBox key={i}>
              <MacroLabel><SkeletonLine width="80%" /></MacroLabel>
              <MacroValue><SkeletonLine width="60%" /></MacroValue>
            </MacroBox>
          ))
        ) : (
          macroData.map((m) => (
            <MacroBox key={m.label}>
              <MacroLabel>{m.label}</MacroLabel>
              <MacroValue>
                {m.value} г / {m.max} г
              </MacroValue>
            </MacroBox>
          ))
        )}
      </MacrosGrid>

      <ToggleButtons>
        <ToggleButton active={macroTab === "macros"} onClick={() => setMacroTab("macros")}>
          БЖУ
        </ToggleButton>
        <ToggleButton active={macroTab === "calories"} onClick={() => setMacroTab("calories")}>
          Калории
        </ToggleButton>
      </ToggleButtons>

      <Title>История потребления</Title>
      {isLoading ? (
        <SkeletonChart height="200px" />
      ) : error ? (
        <ErrorMessage>Не удалось загрузить историю</ErrorMessage>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data?.history} onClick={handleBarClick}>
            <XAxis dataKey="name" />
            <YAxis hide={macroTab === "calories"} />
            <Tooltip formatter={(value) => [value, macroTab === "calories" ? "Калории" : "Граммы"]} />
            <Legend />
            {macroTab === "calories" ? (
              <Bar dataKey="calories" name="Калории" fill="#ffc085" />
            ) : (
              <>
                <Bar dataKey="protein" name="Белки" fill="#8884d8" />
                <Bar dataKey="fat" name="Жиры" fill="#82ca9d" />
                <Bar dataKey="carbs" name="Углеводы" fill="#ffc658" />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      )}

      {selectedDate && (
        <FoodHistoryModal
          date={selectedDate}
          entries={selectedDateEntries}
          onClose={() => setSelectedDate(null)}
          onSave={() => setSelectedDate(null)}
          onDelete={(index) => {
            const newEntries = [...selectedDateEntries];
            newEntries.splice(index, 1);
            setSelectedDateEntries(newEntries);
          }}
        />
      )}
    </Section>
  );
}