import React from "react";
import { 
  ModalOverlay, 
  ModalContent, 
  FoodItem, 
  FoodName, 
  FoodDetails,
  MacroRow,
  Button,
  ModalActions
} from "../styles/history";

export interface FoodEntry {
  timestamp: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface FoodHistoryModalProps {
  date: string;
  entries: FoodEntry[];
  onClose: () => void;
  onSave: () => void;
  onDelete: (index: number) => void;
  isSaveDisabled?: boolean;
}

export const FoodHistoryModal: React.FC<FoodHistoryModalProps> = ({
  date,
  entries,
  onClose,
  onSave,
  onDelete,
  isSaveDisabled = false,
}) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAdd = () => {
    // Добавляем пустую запись — пользователь сможет отредактировать
    const newEntry: FoodEntry = {
      timestamp: new Date().toISOString(),
      name: "Новое блюдо",
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0
    };
    entries.push(newEntry);
    onSave();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>История питания</h2>
        <p>Ваши блюда</p>

        {entries.length === 0 ? (
          <>
            <p>Нет записей за этот день</p>
            <Button onClick={handleAdd}>
              Добавить блюдо
            </Button>
          </>
        ) : (
          entries.map((entry, index) => (
            <FoodItem key={index}>
              <FoodName>{entry.name}</FoodName>
              <FoodDetails>{formatTime(entry.timestamp)}</FoodDetails>
              <FoodDetails>{entry.calories} ккал</FoodDetails>
              <MacroRow>
                БЖУ: {entry.protein}/{entry.fat}/{entry.carbs}
              </MacroRow>
              <Button onClick={() => onDelete(index)}>
                Удалить блюдо
              </Button>
            </FoodItem>
          ))
        )}

        <ModalActions>
          <Button onClick={onClose}>
            Отменить изменения
          </Button>
          <Button onClick={onSave} disabled={isSaveDisabled}>
            Сохранить
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};