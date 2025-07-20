import styled from "styled-components";

interface SkeletonProps {
  size?: string;
}
interface ChartProps {
  height?: string;
}
// Skeleton Loading Components
export const SkeletonLine = styled.div<{ 
  width?: string; 
  height?: string;
  margin?: string;
}>`
  background: #f0f0f0;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '1rem'};
  margin: ${props => props.margin || '0'};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;


export const SkeletonAvatar = styled.div<SkeletonProps>`
  width: ${props => props.size || '64px'};
  height: ${props => props.size || '64px'};
  border-radius: 50%;
  background: #f0f0f0;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const SkeletonChart = styled.div<ChartProps>`
  width: 100%;
  height: ${props => props.height || '150px'};
  background: #f0f0f0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
`;

// Error Message Component
export const ErrorMessage = styled.div`
  padding: 1rem;
  margin: 1rem 0;
  background: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
  border-left: 4px solid #d32f2f;
`;