import { useState, useEffect } from "react";
import {
  HistoryContainer,
  HistoryItem,
  FoodName,
  MacroInfo,
  TimeInfo,
  FilterContainer,
  FilterButton,
  EmptyState,
  RoundEditButton,
} from "../styles/history";
import { getEffectiveUserId } from "../telegram";
import { Card, Title } from "../styles/summary";

interface NutritionItem {
  id: string;
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

export default function HistoryTab() {
  const [history, setHistory] = useState<NutritionItem[]>([]);
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "week" | "month">("today");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const userId = getEffectiveUserId();
      try {
        const response = await fetch(`/api/nutrition/history?userId=${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data: NutritionItem[] = await response.json();

        // Фильтрация по времени
        const now = new Date();
        const filteredData = data.filter(item => {
          const itemDate = new Date(item.timestamp);
          const diffTime = now.getTime() - itemDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);

          switch (timeFilter) {
            case "today": return diffDays <= 1;
            case "week": return diffDays <= 7;
            case "month": return diffDays <= 30;
            default: return true;
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
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    }).replace(':', '');
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('ru-RU');
  };

  const handleEdit = (id: string) => {
    console.log("Edit item with id:", id);
    // Логика редактирования
  };

  return (
    <>
        <FilterContainer>
          <FilterButton active={timeFilter === "all"} onClick={() => setTimeFilter("all")}>
            Все
          </FilterButton>
          <FilterButton active={timeFilter === "today"} onClick={() => setTimeFilter("today")}>
            Сегодня
          </FilterButton>
          <FilterButton active={timeFilter === "week"} onClick={() => setTimeFilter("week")}>
            За неделю
          </FilterButton>
          <FilterButton active={timeFilter === "month"} onClick={() => setTimeFilter("month")}>
            За 30 дней
          </FilterButton>
        </FilterContainer>
        <RoundEditButton onClick={() => console.log("Edit mode activated")}>
          ✏️
        </RoundEditButton>
        <Title>Если нужно что-то вспомнить или убрать</Title>



      <Card>
        {isLoading ? (
          <div>Загрузка...</div>
        ) : history.length === 0 ? (
          <EmptyState>Нет записей</EmptyState>
        ) : (
          <HistoryContainer>
            {history.map(item => (
              <HistoryItem key={item.id}>
                <div>
                  <FoodName>{item.name}</FoodName>
                  <MacroInfo>
                    {item.protein}г белков, {item.fat}г жиров, {item.carbs}г углеводов
                  </MacroInfo>
                  <TimeInfo>{formatDate(item.timestamp)}</TimeInfo>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TimeInfo>{formatTime(item.timestamp)}</TimeInfo>
                </div>
              </HistoryItem>
            ))}
          </HistoryContainer>
        )}
      </Card>
    </>
  );
}