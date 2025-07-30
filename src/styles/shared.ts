import styled from "styled-components";

export const SkeletonLine = styled.div<{ width?: string; height?: string }>`
  background: #f0f0f0;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '1rem'};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const SkeletonChart = styled(SkeletonLine)`
  border-radius: 8px;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 100vh; /* Ограничиваем максимальную высоту */
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
  bottom: 0;
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  background: #FFFFFF;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.05);
  border-top: 1px solid #F2F2F7;
  z-index: 1;
`;

export const NavItem = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.active ? '#6C5CE7' : '#8E8E93'};
  font-size: 12px;
  font-weight: ${props => props.active ? '600' : '500'};
  gap: 4px;
  
  &::before {
    content: "${props => props.active ? '📊' : '📈'}";
    font-size: 24px;
  }
  
  &:last-child::before {
    content: "${props => props.active ? '👤' : '👥'}";
  }
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

export const ContentOverlay = styled(Section)`
  background: white;
  border-radius: 20px 20px 0 0;
  margin-top: 20vh;
  overflow: hidden; /* Запрещаем скролл */
  position: relative;
  z-index: 1;
`;