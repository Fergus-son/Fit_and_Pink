import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  background: #F7F8FA;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const Section = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #F7F8FA;
`;

export const BottomNav = styled.div`
  position: fixed;
  bottom: 30px; /* Отступ снизу */
  left: 50%; /* Центрирование по горизонтали */
  transform: translateX(-50%); /* Точное центрирование */
  width: auto; /* Ширина по содержимому */
  min-width: 200px; /* Минимальная ширина */
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(255, 251, 251, 0.43);
  z-index: 1;
  border-radius: 100px;
  padding: 0 20px; /* Внутренние отступы */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Легкая тень */
`;

export const ButtonsContainer = styled.div`
  justify-content: space-evenly;
  align-items: center;
`;

export const NavItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;




// Добавьте эти стили в конец файла shared.ts (картинка сверху)
export const AppContainer = styled(Container)`
  position: relative;
  overflow: hidden;
  min-height: 130vh;

  @media (max-height: 700px) {
    min-height: 160vh;
  }
    
`;

export const BackgroundImage = styled.div<{ imageUrl: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-attachment: initial;
  z-index: 0;
`;

export const StyledNavIcon = styled.div<{ icon: string }>`
  width: 25px;
  height: 25px;
  background-image: url(${props => props.icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const ContentOverlay = styled(Section)`
  width: 100%;
  padding: 16px;
  box-sizing: border-box; /* Важно! */
  background: white;
  border-radius: 20px 20px 0 0;
  margin-top: 20vh;
  overflow: hidden; /* Запрещаем скролл */
  position: relative;
  min-height: 110vh;
  z-index: 1;
`;