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
  height: 100vh;
  background: #F7F8FA;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

export const Section = styled.div`
  padding: 16px;
  flex: 1;
  overflow-y: auto;
  background: #F7F8FA;
`;

export const BottomNav = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  background: #FFFFFF;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.05);
  border-top: 1px solid #F2F2F7;
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