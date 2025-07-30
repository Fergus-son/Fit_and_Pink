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
  min-width: ${({ $isActive }) => ($isActive ? sizes.activeWidth : sizes.inactiveWidth)};
  padding: 14px 12px;
  background: ${({ $isActive }) => ($isActive ? colors.primary : colors.secondary)};
  border-radius: ${sizes.borderRadius};
  text-align: center;
  color: ${({ $isActive }) => ($isActive ? colors.primaryText : colors.secondaryText)};
  box-shadow: ${sizes.shadow} ${colors.shadow};
  cursor: pointer;

  /* Анимация только для активного элемента */
  ${({ $isActive }) => $isActive && `
    transition: all 0.2s ease-in-out;
    
    &:hover {
      transform: translateY(-2px);
    }
  `}

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