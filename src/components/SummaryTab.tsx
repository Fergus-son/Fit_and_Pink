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

import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const pieData = [
  { name: "Consumed", value: 683 },
  { name: "Remaining", value: 2130 - 683 },
];
const COLORS = ["#f88", "#fdd"];
const macroData = [
  { label: "Белок", value: 74, max: 90 },
  { label: "Клетчатка", value: 30, max: 40 },
  { label: "Углеводы", value: 100, max: 150 },
  { label: "Жиры", value: 45, max: 70 },
];
const calorieHistory = [
  { name: "Пн", value: 1800 },
  { name: "Вт", value: 1300 },
  { name: "Ср", value: 1000 },
  { name: "Чт", value: 1600 },
  { name: "Пт", value: 1200 },
  { name: "Сб", value: 1900 },
  { name: "Вс", value: 1400 },
];

export default function SummaryTab() {
  const [macroTab, setMacroTab] = useState("calories");

  return (
    <Section>
      <Box>
        <Title>Ежедневный обзор калорий</Title>
        <CaloriesText>683 ккал / 2130 ккал</CaloriesText>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} dataKey="value">
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
        <ToggleButton active={macroTab === "macros"} onClick={() => setMacroTab("macros")}>БЖУ</ToggleButton>
        <ToggleButton active={macroTab === "calories"} onClick={() => setMacroTab("calories")}>Калории</ToggleButton>
      </ToggleButtons>

      <Title>История потребления</Title>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={calorieHistory}>
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" fill="#ffc085" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Section>
  );
}
