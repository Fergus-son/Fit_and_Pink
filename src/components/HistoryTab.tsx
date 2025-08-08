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
  CardHistory,
  ModalOverlay,
  ModalContent,
  ModalActions,
  Button,
} from "../styles/history";
import { Card, Title } from "../styles/summary";
import { getEffectiveUserId } from "../telegram";

interface EntriesData {
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

interface FoodEntry {
  id: string;
  nutrition_data: EntriesData;
}

interface NutritionData {
  history: {
    entries: FoodEntry[];
  }[];
}

export default function HistoryTab() {
  const [filteredEntries, setFilteredEntries] = useState<FoodEntry[]>([]);
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "week" | "month">("today");
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isEditMode, setIsEditMode] = useState(false);
  const [entriesToDelete, setEntriesToDelete] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      const userId = getEffectiveUserId();
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await fetch(`/api/nutrition?userId=${userId}&date=${dateStr}`);
        const data: NutritionData = await response.json();
        setNutritionData(data);
        
        // Первоначальная фильтрация
        const allEntries = data.history.flatMap(day => day.entries);
        setFilteredEntries(allEntries);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  // Фильтрация при изменении timeFilter
  useEffect(() => {
    if (!nutritionData) return;

    const now = new Date();
    const filtered = nutritionData.history
      .flatMap(day => day.entries)
      .filter(entry => {
        const entryDate = new Date(entry.nutrition_data.timestamp);
        const diffDays = (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);

        switch (timeFilter) {
          case "today": return diffDays <= 1;
          case "week": return diffDays <= 7;
          case "month": return diffDays <= 30;
          default: return true;
        }
      });

    setFilteredEntries(filtered);
  }, [timeFilter, nutritionData]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    });
  };

  const handleDelete = (entryId: string) => {
    setEntriesToDelete([...entriesToDelete, entryId]);
    setFilteredEntries(filteredEntries.filter(entry => entry.id !== entryId));
  };

  const handleSave = async () => {
    try {
      const userId = getEffectiveUserId();
      await Promise.all(
        entriesToDelete.map(id => 
          fetch(`/api/nutrition/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          })
        )
      );
      setEntriesToDelete([]);
      setIsEditMode(false);
      // Обновляем данные после сохранения
      const dateStr = selectedDate.toISOString().split('T')[0];
      const response = await fetch(`/api/nutrition?userId=${userId}&date=${dateStr}`);
      const data: NutritionData = await response.json();
      setNutritionData(data);
      setFilteredEntries(data.history.flatMap(day => day.entries));
    } catch (error) {
      console.error("Ошибка при сохранении изменений:", error);
    }
  };

  const handleCancel = () => {
    if (entriesToDelete.length > 0) {
      setShowConfirmModal(true);
    } else {
      setIsEditMode(false);
    }
  };

  const confirmCancel = () => {
    // Восстанавливаем удаленные записи
    if (nutritionData) {
      setFilteredEntries(nutritionData.history.flatMap(day => day.entries));
    }
    setEntriesToDelete([]);
    setIsEditMode(false);
    setShowConfirmModal(false);
  };

  return (
    <>
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
          Неделя
        </FilterButton>
        <FilterButton 
          active={timeFilter === "month"} 
          onClick={() => setTimeFilter("month")}
        >
          Месяц
        </FilterButton>
      </FilterContainer>

      <RoundEditButton onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "✕" : "✏️"}
      </RoundEditButton>

      <Title>Если нужно что-то вспомнить или убрать</Title>

      <CardHistory>
        {isLoading ? (
          <div>Загрузка...</div>
        ) : filteredEntries.length === 0 ? (
          <EmptyState>Нет записей за выбранный период</EmptyState>
        ) : (
          <HistoryContainer>
            {filteredEntries.map(entry => (
              <HistoryItem key={entry.id}>
                <div>
                  <FoodName>{entry.nutrition_data.name}</FoodName>
                  <MacroInfo>
                    {entry.nutrition_data.protein}г белка · 
                    {entry.nutrition_data.fat}г жиров · 
                    {entry.nutrition_data.carbs}г углеводов
                  </MacroInfo>
                  <TimeInfo>{formatDate(entry.nutrition_data.timestamp)}</TimeInfo>
                </div>
                <div>
                  <TimeInfo>{formatTime(entry.nutrition_data.timestamp)}</TimeInfo>
                  {isEditMode && (
                    <Button 
                      onClick={() => handleDelete(entry.id)}
                      style={{ marginTop: '8px' }}
                    >
                      Удалить
                    </Button>
                  )}
                </div>
              </HistoryItem>
            ))}
          </HistoryContainer>
        )}
      </CardHistory>

      {isEditMode && (
        <ModalActions>
          <Button onClick={handleCancel}>
            Отменить
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={entriesToDelete.length === 0}
          >
            Сохранить
          </Button>
        </ModalActions>
      )}

      {showConfirmModal && (
        <ModalOverlay onClick={() => setShowConfirmModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Подтверждение</h2>
            <p>У вас есть несохраненные изменения. Вы уверены, что хотите отменить их?</p>
            <ModalActions>
              <Button onClick={() => setShowConfirmModal(false)}>
                Продолжить редактирование
              </Button>
              <Button onClick={confirmCancel}>
                Отменить изменения
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}