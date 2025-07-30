import styled from "styled-components";

// Цвета
const colors = {
  primary: '#F2971C',
  primaryText: '#FFFFFF',
  secondary: '#EADAC8',
  secondaryText: '#1C1C1E',
  inactiveText: '#636366',
  shadow: 'rgba(11, 10, 14, 0.32)',
  transparentWhite: 'rgba(255,255,255,0.8)',
};

// Размеры
const sizes = {
  activeWidth: '40px',
  inactiveWidth: '30px',
  borderRadius: '10px',
  shadow: '0px 2px 4px',
};

interface DateItemProps {
  $isActive?: boolean;
}

export const DateContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 24px;
  padding: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DateItem = styled.div<DateItemProps>`
  text-align: center;
  cursor: pointer;
  min-width: ${({ $isActive }) => ($isActive ? sizes.activeWidth : sizes.inactiveWidth)};
  padding: ${({ $isActive }) => ($isActive ? '16px 12px' : '12px 10px')};
  background: ${({ $isActive }) => ($isActive ? colors.primary : colors.secondary)};
  border-radius: ${sizes.borderRadius};
  color: ${({ $isActive }) => ($isActive ? colors.primaryText : colors.secondaryText)};
  box-shadow: ${({ $isActive }) => 
    $isActive 
      ? '0px 4px 12px rgba(242, 151, 28, 0.4)' 
      : `${sizes.shadow} ${colors.shadow}`
  };
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  /* Начальное поднятое состояние для активной даты */
  transform: ${({ $isActive }) => $isActive ? 'translateY(-5px)' : 'translateY(0)'};
  
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Месяц (верхний текст) */
  & > div:first-child {
    font-size: 10px;
    font-weight: 500;
    color: ${({ $isActive }) => ($isActive ? colors.transparentWhite : colors.inactiveText)};
    text-transform: uppercase;
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
    color: ${({ $isActive }) => ($isActive ? colors.transparentWhite : colors.inactiveText)};
    text-transform: uppercase;
  }
`;