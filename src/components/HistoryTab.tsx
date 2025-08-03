import { useState, useEffect } from "react";
import { 
  HistoryContainer,
  HistoryItem,
  FoodName,
  MacroInfo,
  TimeInfo,
  FilterContainer,
  FilterButton
} from "../styles/history";
import { getEffectiveUserId } from "../telegram";
import { Card, Title } from "../styles/summary";

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

interface FoodHistory {
  id: string;
  name: string;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  timestamp: string;
  entries: FoodEntry[];
}

export default function HistoryTab() {
  const [history, setHistory] = useState<FoodHistory[]>([]);
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "week" | "month">("today");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const userId = getEffectiveUserId();
      try {
        const response = await fetch(`/api/nutrition?userId=${userId}`);
        const data = await response.json();
        
        // Фильтрация данных в зависимости от выбранного периода
        const now = new Date();
        const filteredData = data.history
          .map((item: any, index: number) => ({
            id: `item-${index}`,
            name: item.name,
            protein: item.protein,
            fat: item.fat,
            carbs: item.carbs,
            fiber: item.fiber || 0,
            timestamp: item.entries?.[0]?.timestamp || now.toISOString(),
            entries: item.entries || []
          }))
          .filter((item: FoodHistory) => {
            const itemDate = new Date(item.timestamp);
            const diffTime = now.getTime() - itemDate.getTime();
            const diffDays = diffTime / (1000 * 60 * 60 * 24);

            switch(timeFilter) {
              case "today":
                return diffDays <= 1;
              case "week":
                return diffDays <= 7;
              case "month":
                return diffDays <= 30;
              default: // "all"
                return true;
            }
          });

        setHistory(filteredData);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, [timeFilter]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <>
      <Title>История питания</Title>
      
      <FilterContainer>
        <FilterButton 
          active={timeFilter === "all"} 
          onClick={() => setTimeFilter("all")}
        >
          Все
        </FilterButton>
        <FilterButton 
          active={timeFilter === "today"} 
          onClick={() => setTimeFilter("today")}
        >
          Сегодня
        </FilterButton>
        <FilterButton 
          active={timeFilter === "week"} 
          onClick={() => setTimeFilter("week")}
        >
          За неделю
        </FilterButton>
        <FilterButton 
          active={timeFilter === "month"} 
          onClick={() => setTimeFilter("month")}
        >
          За 30 дней
        </FilterButton>
      </FilterContainer>
      
      <Card>
        {isLoading ? (
          <div>Загрузка...</div>
        ) : history.length === 0 ? (
          <div>Нет данных за выбранный период</div>
        ) : (
          <HistoryContainer>
            {history.map(item => (
              <HistoryItem key={item.id}>
                <FoodName>{item.name}</FoodName>
                <MacroInfo>
                  {item.protein}г белков • {item.fat}г жиров • {item.carbs}г углеводов
                </MacroInfo>
                <div>
                  <TimeInfo>{formatTime(item.timestamp)}</TimeInfo>
                  <TimeInfo style={{ marginLeft: '8px' }}>
                    {formatDate(item.timestamp)}
                  </TimeInfo>
                </div>
                {item.entries.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <MacroInfo>Подробности:</MacroInfo>
                    {item.entries.map((entry, idx) => (
                      <div key={idx} style={{ marginTop: '4px' }}>
                        <MacroInfo>{entry.name} ({entry.weight}g)</MacroInfo>
                      </div>
                    ))}
                  </div>
                )}
              </HistoryItem>
            ))}
          </HistoryContainer>
        )}
      </Card>
    </>
  );
}