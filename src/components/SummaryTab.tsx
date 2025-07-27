import { useState, useEffect } from "react";
import {
  Card,
  Title,
  ToggleContainer,
  ToggleButton,
  MacrosGrid,
  MacroCard,
  MacroTitle,
  MacroValue,
  RemainingCalories,
  RemainingTitle,
  RemainingValue,
  FiberCard,
} from "../styles/summary";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getEffectiveUserId } from "../telegram";
import { SkeletonLine, SkeletonChart } from "../styles/shared";

interface NutritionData {
  consumedCalories: number;
  totalCalories: number;
  proteins: { value: number; max: number };
  fibers: { value: number; max: number };
  carbs: { value: number; max: number };
  fats: { value: number; max: number };
}

interface ChartProps {
  type: "calories" | "macros";
  data: NutritionData;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  type,
  data,
}: {
  cx: number;
  cy: number;
  type: "calories" | "macros";
  data: NutritionData;
}) => {
  return (
    <g>
      {type === "calories" ? (
        <>
          <text
            x={cx}
            y={cy - 10}
            fill="#1C1C1E"
            fontSize={24}
            fontWeight={700}
            textAnchor="middle"
          >
            {data.consumedCalories}
          </text>
          <text
            x={cx}
            y={cy + 15}
            fill="#636366"
            fontSize={14}
            textAnchor="middle"
          >
            калорий
          </text>
        </>
      ) : (
        <>
          <text
            x={cx}
            y={cy - 10}
            fill="#1C1C1E"
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
          >
            БЖУ
          </text>
          <text
            x={cx}
            y={cy + 15}
            fill="#636366"
            fontSize={14}
            textAnchor="middle"
          >
            {data.proteins.value}/{data.fats.value}/{data.carbs.value}г
          </text>
        </>
      )}
    </g>
  );
};

const NutritionChart = ({ type, data }: ChartProps) => {
  const chartData =
    type === "calories"
      ? [
          { name: "Потреблено", value: data.consumedCalories },
          {
            name: "Осталось",
            value: Math.max(0, data.totalCalories - data.consumedCalories),
          },
        ]
      : [
          { name: "Белки", value: data.proteins.value },
          { name: "Жиры", value: data.fats.value },
          { name: "Углеводы", value: data.carbs.value },
        ];

  const colors =
    type === "calories"
      ? ["#6C5CE7", "#E4E4E6"]
      : ["#6C5CE7", "#A259FF", "#AEA5F5"];

  return (
    <div style={{ position: "relative", height: "200px", margin: "16px 0" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={0}
            dataKey="value"
            labelLine={false}
            label={({ cx, cy }) =>
              renderCustomizedLabel({ cx, cy, type, data })
            }
            cornerRadius={10}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function SummaryTab() {
  const [activeTab, setActiveTab] = useState<"calories" | "macros">("calories");
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNutritionData = async () => {
      const userId = getEffectiveUserId();
      try {
        setIsLoading(true);
        const response = await fetch(`/api/nutrition?userId=${userId}`);
        const data = await response.json();
        setNutritionData(data);
      } catch (error) {
        console.error("Failed to fetch nutrition data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNutritionData();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <SkeletonLine width="60%" height="1.5rem" style={{ margin: "16px auto" }} />
        <SkeletonChart height="200px" />
      </Card>
    );
  }

  if (!nutritionData) {
    return <Card>Ошибка загрузки данных</Card>;
  }

  return (
    <Card>
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

      <NutritionChart type={activeTab} data={nutritionData} />

      {activeTab === "calories" && (
        <RemainingCalories>
          <RemainingTitle>Осталось</RemainingTitle>
          <RemainingValue>
            {nutritionData.totalCalories - nutritionData.consumedCalories} калорий
          </RemainingValue>
          <div style={{ color: "#636366", fontSize: 14, marginTop: 4 }}>
            {nutritionData.consumedCalories} из {nutritionData.totalCalories}
          </div>
        </RemainingCalories>
      )}

      {activeTab === "macros" && (
        <>
          <MacrosGrid>
            <MacroCard>
              <MacroTitle>Белки</MacroTitle>
              <MacroValue>
                {nutritionData.proteins.value}г / {nutritionData.proteins.max}г
              </MacroValue>
            </MacroCard>
            <MacroCard>
              <MacroTitle>Жиры</MacroTitle>
              <MacroValue>
                {nutritionData.fats.value}г / {nutritionData.fats.max}г
              </MacroValue>
            </MacroCard>
            <MacroCard>
              <MacroTitle>Углеводы</MacroTitle>
              <MacroValue>
                {nutritionData.carbs.value}г / {nutritionData.carbs.max}г
              </MacroValue>
            </MacroCard>
          </MacrosGrid>
          <FiberCard>
            <MacroTitle>Клетчатка</MacroTitle>
            <MacroValue>
              {nutritionData.fibers.value}г / {nutritionData.fibers.max}г
            </MacroValue>
          </FiberCard>
        </>
      )}
    </Card>
  );
}