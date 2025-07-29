import styled from "styled-components";


export const FirstItem = styled.div`
  margin-bottom: 100px;
`

export const SecondItem = styled.div`
`

export const Card = styled.div`
  background: #EADAC8;
  border-radius: 16px;
  padding: 8px;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
  margin: 0 0 16px 0;
  text-align: center;
`;

export const ToggleContainer = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 4px;
  margin: 16px 0;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  background: ${p => p.active ? '#F2971C' : 'transparent'};
  color: ${p => p.active ? '#FFFFFF' : '#F2971C'};
  padding: 8px;
  border: 1px solid #F2971C;
  border-radius: 6px;
  font-size: 14px;
  margin: 5px;
  font-weight: ${p => p.active ? '500' : '400'};
  cursor: pointer;
`;

export const MacrosGrid = styled.div`
  gap: 12px;
  margin: 16px 0;
  width: 100%;
`;

export const MacroCard = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px;
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
  margin-top: 8px;
`;



// display: flex;
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  jusify-content: space-between;
  align-items: center;
`;

export const StatsInfo = styled.div`
  background: #EADAC8;
  border-radius: 12px;
`;

export const MacroItem = styled.div`
  margin-bottom: 12px;
`;

export const MacroName = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export const MacroValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #6E6E6E;
`;

export const CalorieName = styled.div`
  font-size: 25;
  font-weight: 500;
  color: #333;
  line-height: normal;
`;

export const CalorieValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #F2971C;
  margin-bottom: 5px;
`;

export const FibersValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #323232;
  opacity: 0.6;
`;

export const PieCalorieStyle = styled.div`
  position: relative;
  width: 220px;
  max-width: 250px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;

    @media (max-width: 360px) {
    width: 199px; /* или любое другое значение, например, 300px */
  }
`;

export const PieMacrosStyle = styled.div`
  position: relative;
  width: 220px;
  max-width: 250px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;

    @media (max-width: 360px) {
    width: 205px; /* или любое другое значение, например, 300px */
  }
`;