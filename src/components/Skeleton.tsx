import styled from "styled-components";

export const SkeletonRect = styled.div<{ width?: string; height?: string }>`
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

export const SkeletonCircle = styled(SkeletonRect)`
  border-radius: 50%;
`;

export const SkeletonChart = styled.div`
  width: 100%;
  height: 150px;
  background: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
`;