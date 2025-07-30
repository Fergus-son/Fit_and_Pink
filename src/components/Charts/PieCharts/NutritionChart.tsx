import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CalorieName, CalorieValue, FibersValue, FirstItem, MacroItem, MacroName, MacroValue, PieCalorieStyle, PieMacrosStyle, SecondItem, StatsContainer, StatsInfo } from "../../../styles/summary";

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

interface ChartProps {
  type: "calories" | "macros";
  data: NutritionData;
}

const renderCaloriesLabel = (cx: number, cy: number, calories: number, totalCalories: number) => (
  <g>
    <text
      x={cx}
      y={cy - 13}
      fill="#1C1C1E"
      fontSize={18}
      fontWeight={600}
      textAnchor="middle"
    >
      {calories}
    </text>
    <text
      x={cx}
      y={cy + 5}
      fill="#323232"
      fontSize={12}
      textAnchor="middle"
    >
      Калорий
    </text>
    <text
      x={cx}
      y={cy + 23}
      fill="#323232"
      fontSize={10}
      textAnchor="middle"
    >
      из {totalCalories}
    </text>
  </g>
);

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
  return type === "calories"
    ? renderCaloriesLabel(cx, cy, data.consumedCalories, data.totalCalories)
    : null;
};


export const NutritionChart = ({ type, data }: ChartProps) => {
  const colors = type === "calories"
    ? ["#F2971C"]
    : ["#708C5F", "#F2971C", "#6B5E8E"];

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

      <StatsContainer>
        <StatsInfo>
          <FirstItem>
            <CalorieValue>
              {infoData[0].value} калории
            </CalorieValue>
            <CalorieName>{infoData[0].name}</CalorieName>
          </FirstItem>
          <SecondItem>
            <CalorieName>{infoData[1].name}</CalorieName>
            <FibersValue>
              {infoData[1].value}г/{infoData[1].max}г
            </FibersValue>
          </SecondItem>
        </StatsInfo>

        <PieCalorieStyle>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
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
        </PieCalorieStyle>
      </StatsContainer>
    );
  } else {
    const macros = [
      { name: "Белки", value: data.proteins.value, max: data.proteins.max },
      { name: "Углеводы", value: data.carbs.value, max: data.carbs.max },
      { name: "Жиры", value: data.fats.value, max: data.fats.max },
    ];

    return (
      <StatsContainer>
        <StatsInfo>
          {macros.map((macro, index) => {
            const color = colors[index]; // Получаем цвет из массива colors по индексу
            return (
              <MacroItem key={macro.name}>
                <MacroName style={{ color }}>{macro.name}</MacroName> {/* Применяем цвет к названию */}
                <MacroValue>
                  {macro.value}г/{macro.max}г
                </MacroValue>
              </MacroItem>
            );
          })}
        </StatsInfo>

        <PieMacrosStyle>
          <ResponsiveContainer width="100%" height="100%" >
            <PieChart>
              {macros.map((macro, index) => {
                const chartData = [
                  { name: "Потреблено", value: macro.value },
                  { name: "Осталось", value: Math.max(0, macro.max - macro.value) },
                ];

                const outerRadius = 46 + (2 - index) * 28; // Обратный порядок: 2-0 вместо 0-2
                const innerRadius = outerRadius - 26;

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
        </PieMacrosStyle>
      </StatsContainer>

    );
  }
};