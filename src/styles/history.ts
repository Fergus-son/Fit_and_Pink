import styled from "styled-components";

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 15px 0px 15px;
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 0px 5px 0px 5px;
  background-color: white;
  border-radius: 20px;
  // border-bottom: 1px solid #F2F2F7;
`;


export const FoodName = styled.span`
font-weight: bold;
font-size: 16px;
display: block;
color: #2D3436;
`;

export const MacroInfo = styled.span`
font-size: 12px;
color: #2D3436;
`;

export const TimeInfo = styled.span`
font-size: 12px;
color: #2D3436;
display: block;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin: 0px 8px 8px;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  flex: 1;
  background: ${p => p.active ? '#F2971C' : 'transparent'};
  color: ${p => p.active ? '#FFFFFF' : 'black'};
  padding: 6px;
  border: ${p => p.active ? '1px solid #F2971C;' : '1px solid black'};
  border-radius: 6px;
  font-size: 12px;
  font-weight: ${p => p.active ? '500' : '400'};
  cursor: pointer;
`;

export const RoundEditButton = styled.button`
  margin: 0px 8px 8px;
  border: 1px solid #F2F2F7;
  cursor: pointer;
  margin-left: auto;
  color: #B2BEC3;
  font-size: 25px;
  padding: 4px;
  width: 50px;
  height:50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    background-color: #F2971C;
    border-color: black;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #636E72;
  font-size: 14px;
`;