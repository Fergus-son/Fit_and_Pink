// FoodHistoryModal.tsx
import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const FoodItem = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
`;

const FoodName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
`;

const FoodDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
`;

const MacroRow = styled.div`
  display: flex;
  margin-top: 4px;
  font-size: 12px;
`;

const Button = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  margin-top: 8px;
  cursor: pointer;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

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

interface FoodHistoryModalProps {
  date: string;
  entries: FoodEntry[];
  onClose: () => void;
  onSave: () => void;
  onDelete: (index: number) => void;
}

export const FoodHistoryModal: React.FC<FoodHistoryModalProps> = ({
  date,
  entries,
  onClose,
  onSave,
  onDelete,
}) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>История питания</h2>
        <h3>Ваши блюда</h3>

        {entries.map((entry, index) => (
          <FoodItem key={index}>
            <FoodName>{entry.name}</FoodName>
            <div>{entry.timestamp}</div>
            <FoodDetails>
              <span>{entry.calories} ккал</span>
              <span>БЖУ: {entry.protein}/{entry.fat}/{entry.carbs}</span>
            </FoodDetails>
            <Button onClick={() => onDelete(index)}>Удалить блюдо</Button>
          </FoodItem>
        ))}

        <ModalActions>
          <Button onClick={onClose}>Отменить изменения</Button>
          <Button onClick={onSave}>Сохранить</Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};