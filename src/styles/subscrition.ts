import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Content = styled.div`
  background: white;
  border-radius: 30px;
  width: 420px;
  padding: 15px 24px;
  position: relative;
  font-family: sans-serif;
  margin: 30px;
`;

// export const TopImageWrapper = styled.div<{ imageUrl: string }>`
//   position: fixed;
//   display: flex;
//   top: 0;
//   left: 0;
//   right: 0;
//   // width: 100%;
//   height: 40vh;
//   background-image: url(${props => props.imageUrl});
//   background-size: cover;
//   background-position: center;
//   background-attachment: initial;
//   z-index: -1;
//   margin: 30px;
//   border-radius: 50px 50px 0px 0px;
//   // margin-top: 40vh; // Отступ сверху = высота изображения
//   max-width: 420px;
//   align-items: center; 

// `;

export const TopImage = styled.img`
  width: 100px;
  height: auto;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 16px;
  text-align: center;
`;

export const PeriodSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const PeriodButton = styled.button<{ active?: boolean }>`
  padding: 6px 15px;
  border-radius: ${({ active }) => (active ? "20px" : "6px")};
  border: 2px solid ${({ active }) => (active ? "#F2971C" : "#F2971C")};
  background: ${({ active }) => (active ? "#F2971C" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  font-weight: 600;
  cursor: pointer;
`;

export const PlanBox = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: white; // или любой другой фон
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 30px;
    padding: 5px; // толщина рамки
    background: linear-gradient(45deg, #f4a83d, #4b7f63);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const PlanLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  justify-content: space-between;
`;

export const PlanRight = styled.div`
  flex: 1;
`;

export const PlanHeader = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 4px;
  text-align: center;
`;

export const PlanPrice = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;
  text-align: center;
`;

export const Features = styled.ul`
  margin: 0;
  color: #444;
  font-size: 12px;
`;

export const BuyButton = styled.button`
  background: black;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  cursor: pointer;
`;
