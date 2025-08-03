// styles/historyStyles.ts
import styled from "styled-components";

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
`;

export const HistoryItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #DFE6E9;
  position: relative;
`;

export const FoodName = styled.span`
  font-weight: 500;
  font-size: 16px;
  display: block;
  margin-bottom: 4px;
  color: #2D3436;
`;

export const MacroInfo = styled.span`
  font-size: 14px;
  color: #636E72;
  display: block;
`;

export const TimeInfo = styled.span`
  font-size: 12px;
  color: #B2BEC3;
  position: absolute;
  right: 0;
  top: 12px;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 0 16px;
  margin: 0 -16px;
  padding-left: 16px;
  background: #FFFFFF;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  border: none;
  background: ${props => props.active ? '#6C5CE7' : '#F5F6FA'};
  color: ${props => props.active ? '#FFFFFF' : '#2D3436'};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;