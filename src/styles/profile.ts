import styled from "styled-components";

export const SkeletonLine = styled.div<{ width?: string }>`
  height: 1rem;
  background: #eee;
  border-radius: 4px;
  width: ${props => props.width || '100%'};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

export const SkeletonAvatar = styled.div`
  width: 64px;
  height: 64px
  border-radius: 50%;
  background: #eee;
  animation: pulse 1.5s infinite;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: #E5E5EA;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8E8E93;
  font-size: 32px;
`;

export const ProfileName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1C1C1E;
  margin-bottom: 4px;
`;

export const ProfileSub = styled.div`
  font-size: 14px;
  color: #636366;
`;

export const InfoCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F2F2F7;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.div`
  font-size: 16px;
  color: #1C1C1E;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoValue = styled.div`
  font-size: 16px;
  color: #1C1C1E;
  font-weight: 500;
`;

export const NormCard = styled.div`
  background: #F2F2F7;
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
  text-align: center;
`;

export const NormLabel = styled.div`
  font-size: 14px;
  color: #636366;
`;

export const NormValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1C1C1E;
  margin-top: 4px;
`;

export const PrimaryButton = styled.button`
  background: #6C5CE7;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  cursor: pointer;
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: white;
  color: #6C5CE7;
  border: 1px solid #6C5CE7;
`;

export const FooterText = styled.div`
  font-size: 12px;
  color: #8E8E93;
  text-align: center;
  margin-top: 24px;
`;