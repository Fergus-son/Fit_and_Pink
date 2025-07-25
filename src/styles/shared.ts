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
  background: #fff;
  font-family: sans-serif;
`;

export const Section = styled.div`
  padding: 16px;
  flex: 1;
  overflow-y: auto;
`;

export const BottomNav = styled.div`
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #eee;
  background: #fff;
`;

export const NavItem = styled.div<{ active: boolean }>`
  flex: 1;
  padding: 8px;
  text-align: center;
  color: ${(props) => (props.active ? "#000" : "#888")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

