import styled from "styled-components";

export const HeaderText = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #2D3436;
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F2F2F7;
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
`;

export const TimeInfo = styled.span`
font-size: 14px;
color: #B2BEC3;
margin-left: 16px;
`;

export const FilterContainer = styled.div`
display: flex;
gap: 8px;
overflow-x: auto;
padding: 8px 0 16px;
margin: 0 -16px;
padding-left: 16px;
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
font-weight: 500;
`;

export const RoundEditButton = styled.button`
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