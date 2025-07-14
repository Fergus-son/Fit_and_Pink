import styled from "styled-components";

export const Section = styled.div`
  padding: 16px;
  flex: 1;
  overflow-y: auto;
`;

export const Box = styled.div`
  background: #fff0f0;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  color: #44318d;
  font-size: 16px;
  margin: 12px 0 8px;
`;

export const CaloriesText = styled.div`
  color: #e66;
  font-size: 18px;
  font-weight: bold;
`;

export const MacrosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 8px;
`;

export const MacroBox = styled.div`
  background: #fff0f7;
  padding: 10px;
  border-radius: 6px;
`;

export const MacroLabel = styled.div`
  font-size: 12px;
  color: #777;
`;

export const MacroValue = styled.div`
  color: #e7a;
  font-weight: bold;
`;

export const ToggleButtons = styled.div`
  display: flex;
  margin: 8px 0 16px;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${(p) => (p.active ? "#000" : "#fff")};
  color: ${(p) => (p.active ? "#fff" : "#000")};
  padding: 8px;
  border: 1px solid #000;
  border-radius: 6px;
  margin-right: 4px;
  &:last-child {
    margin-right: 0;
  }
`;

