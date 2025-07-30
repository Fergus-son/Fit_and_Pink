import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

interface ChartProps {
  type: "calories" | "macros";
  data: NutritionData;
}

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



export const NutritionBarChart = ({ type, data }: ChartProps) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        {/* barCategoryGap="15%" // Настройка расстояния между столбцами (15% от ширины столбца) */}
        <BarChart data={data.history} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid
            stroke="#323232"
            strokeDasharray="5 3"  // Более длинный пунктир (5px dash, 3px gap)
            horizontal={true}
            vertical={false}
            strokeWidth={0.5}      // Более тонкие линии
          />
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />
          <Legend />
          {type === "calories" ? (
            <Bar
              dataKey="calories"
              name="Калории"
              fill="#708C5F"
              radius={[4, 4, 0, 0]}
            // onClick={handleBarClick}
            />
          ) : (
            <>
              <Bar
                dataKey="protein"
                name="Белки"
                fill="#708C5F"
                radius={[4, 4, 0, 0]}
              // onClick={handleBarClick}
              />
              <Bar
                dataKey="carbs"
                name="Углеводы"
                fill="#F2971C"
                radius={[4, 4, 0, 0]}
              // onClick={handleBarClick}
              />
              <Bar
                dataKey="fat"
                name="Жиры"
                fill="#6B5E8E"
                radius={[4, 4, 0, 0]}
              // onClick={handleBarClick}
              />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
