import styled from "styled-components";

export const Card = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
  margin: 0 0 16px 0;
  text-align: center;
`;

export const ToggleContainer = styled.div`
  display: flex;
  background: #F2F2F7;
  border-radius: 10px;
  padding: 4px;
  margin: 16px 0;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${p => p.active ? '#FFFFFF' : 'transparent'};
  color: ${p => p.active ? '#6C5CE7' : '#8E8E93'};
  padding: 8px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${p => p.active ? '600' : '500'};
  cursor: pointer;
  box-shadow: ${p => p.active ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const MacrosGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
`;

export const MacroCard = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`;

export const MacroTitle = styled.div`
  font-size: 14px;
  color: #636366;
  margin-bottom: 4px;
`;

export const MacroValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
`;

export const RemainingCalories = styled.div`
  text-align: center;
  margin: 16px 0;
  padding: 12px;
  background: #F7F8FA;
  border-radius: 12px;
`;

export const RemainingTitle = styled.div`
  color: #636366;
  font-size: 14px;
`;

export const RemainingValue = styled.div`
  color: #1C1C1E;
  font-size: 18px;
  font-weight: 600;
  margin: 4px 0;
`;

export const FiberCard = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  margin-top: 8px;
`;