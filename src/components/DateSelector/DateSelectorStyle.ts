import styled from "styled-components";

interface DateItemProps {
  $isActive?: boolean;
}

export const DateContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 24px;
  padding-bottom: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DateItem = styled.div<DateItemProps>`
  min-width: ${({ $isActive }) => ($isActive ? '40px' : '30px')};
  padding: 14px 12px;
  background: ${({ $isActive }) => ($isActive ? '#F2971C' : '#EADAC8')};
  border-radius: 25px / 10px;  
  text-align: center;
  color: ${({ $isActive }) => ($isActive ? '#FFFFFF' : '#1C1C1E')};
  box-shadow: 0px 2px 4px rgba(11, 10, 14, 0.32);


  /* Месяц (верхний текст) */
  & > div:first-child {
    font-size: 10px;
    font-weight: 500;
    color: ${({ $isActive }) => ($isActive ? 'rgba(255,255,255,0.8)' : '#636366')};
    text-transform: uppercase; /* Август -> АВГУСТ */
  }

  /* Число */
  & > div:nth-child(2) {
    font-size: 16px;
    font-weight: 600;
    margin: 4px 0;
  }

  /* День недели */
  & > div:last-child {
    font-size: 12px;
    font-weight: 500;
    color: ${({ $isActive }) => ($isActive ? 'rgba(255,255,255,0.8)' : '#636366')};
    text-transform: uppercase;
  }
`;