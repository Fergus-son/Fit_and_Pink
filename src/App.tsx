import React, { useState } from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


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

export default function App() {
  const [macroTab, setMacroTab] = useState("calories");
  const [pageTab, setPageTab] = useState("summary");
  
  return (
    <Container>
      {pageTab === "summary" && (
        <Section>
          {/* Overview */}
          <Box>
            <Title>Ежедневный обзор калорий</Title>
            <CaloriesText>683 ккал / 2130 ккал</CaloriesText>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  dataKey="value"
                  >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Macros */}
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

          {/* Calorie history */}
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
      )}

      {pageTab === "profile" && (
        <Section>
          <Title>Профиль пользователя</Title>
          <p>Имя: Иван Иванов</p>
          <p>Возраст: 28</p>
          <p>Цель: Похудение</p>
        </Section>
      )}

      {/* Bottom Nav */}
      <BottomNav>
        <NavItem active={pageTab === "summary"} onClick={() => setPageTab("summary")}>🏠<br />Сводка</NavItem>
        <NavItem active={pageTab === "profile"} onClick={() => setPageTab("profile")}>👤<br />Профиль</NavItem>
      </BottomNav>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  background-color: white;
  font-family: sans-serif;
  font-size: 14px;
  padding-bottom: 60px;
`;

const Section = styled.div`
  padding: 16px;
`;

const Box = styled.div`
  background-color: #fff0f0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-size: 14px;
  color: #6b21a8;
  font-weight: 600;
  margin-bottom: 4px;
`;

const CaloriesText = styled.p`
  color: #ef4444;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const MacrosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 8px;
`;

const MacroBox = styled.div`
  background-color: #fff0f8;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
`;

const MacroLabel = styled.p`
  color: #4b5563;
  font-size: 13px;
`;

const MacroValue = styled.p`
  color: #ec4899;
  font-weight: 600;
`;

const ToggleButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 4px 16px;
  border-radius: 9999px;
  border: 1px solid black;
  font-weight: 600;
  font-size: 13px;
  background-color: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
`;

const NavItem = styled.div<{ active: boolean }>`
  text-align: center;
  font-size: 14px;
  color: ${(props) => (props.active ? "#6b21a8" : "#000")};
`;
