import { useState, useEffect } from "react";
import {
  Card,
  Title,
  ToggleContainer,
  ToggleButton,
  MacroValue,
  MacroItem,
  MacrosInfo,
  MacrosContainer,
  MacroName,
  FirstItem,
  SecondItem,
} from "../styles/summary";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getEffectiveUserId } from "../telegram";

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
 const colors = type === "calories"
  ? ["#F2971C"] 
  : ["#6B5E8E", "#F2971C", "#708C5F"];

  if (type === "calories") {
    const chartData = [
      { name: "Потреблено", value: data.consumedCalories },
      { name: "Осталось", value: Math.max(0, data.totalCalories - data.consumedCalories) },
    ];
    const infoData = [
      { name: "Осталось", value: Math.max(0, data.totalCalories - data.consumedCalories) },
      { name: "Клетчатка", value: data.fibers.value, max: data.fibers.max },
    ];


    return (

      <MacrosContainer>
        <MacrosInfo>
            <FirstItem>
              <MacroValue>
                {infoData[0].value} калории
              </MacroValue>
              <MacroName>{infoData[0].name}</MacroName>
            </FirstItem>
            <SecondItem>
              <MacroName>{infoData[1].name}</MacroName>
              <MacroValue>
                {infoData[1].value}г/{infoData[1].max}г
              </MacroValue>
            </SecondItem>
        </MacrosInfo>

      <div style={{
          position: "relative",
          height: "200px",
          width: "100%",
          minWidth: "180px",
          // marginLeft: "auto", // Выравнивание по правому краю
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={0}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy }) => renderCustomizedLabel({ cx, cy, type, data })}
              cornerRadius={30}
              stroke="none"
              startAngle={65}
              endAngle={450}
            >
              <Cell key="cell-consumed" fill={colors[0]} />
              <Cell key="cell-remaining" fill="#EADAC8" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </MacrosContainer>
    );
  } else {
    const macros = [
      { name: "Белки", value: data.proteins.value, max: data.proteins.max },
      { name: "Жиры", value: data.fats.value, max: data.fats.max },
      { name: "Углеводы", value: data.carbs.value, max: data.carbs.max },
    ];

    return (
      <MacrosContainer>
        <MacrosInfo>
          {macros.map((macro) => (
            <MacroItem key={macro.name}>
              <MacroName>{macro.name}</MacroName>
              <MacroValue>
                {macro.value}г/{macro.max}г
              </MacroValue>
            </MacroItem>
          ))}
        </MacrosInfo>

        <div style={{
          position: "relative",
          height: "200px",
          width: "100%",
          minWidth: "180px",
          marginLeft: "auto", // Выравнивание по правому краю
        }}>
          <ResponsiveContainer width="100%" height="100%" >
            <PieChart>
              {macros.map((macro, index) => {
                const chartData = [
                  { name: "Потреблено", value: macro.value },
                  { name: "Осталось", value: Math.max(0, macro.max - macro.value) },
                ];

                const outerRadius = 40 + index * 24;
                const innerRadius = outerRadius - 22;

                return (
                  <Pie
                    key={`pie-${index}`}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={0}
                    dataKey="value"
                    labelLine={false}
                    cornerRadius={30}
                    stroke="none"
                    startAngle={65}
                    endAngle={450}
                  >
                    <Cell key={`cell-${index}-consumed`} fill={colors[index]} />
                    <Cell key={`cell-${index}-remaining`} fill="#EADAC8" />
                  </Pie>
                );
              })}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </MacrosContainer>
    );
  }
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

  if (!nutritionData) {
    return <Card>Ошибка загрузки данных</Card>;
  }

  return (
    <>
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
    </>
  );
}