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

export const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ccc;
  margin: 0 auto 8px;
  `;

export const ProfileHeader = styled.div`
  margin-bottom: 12px;
`;

export const ProfileName = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const ProfileSub = styled.div`
    font-size: 12px;
    color: #888;
    text-align: center;
`;

export const InfoTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin: 12px 0 6px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const InfoLabel = styled.div`
  flex: 0 0 50%;
  font-weight: lighter;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;`;

export const InfoValue = styled.div`
  flex: 0 0 50%;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NormBox = styled.div`
  background: #f7f7f7;
  border-radius: 6px;
  padding: 10px;
  margin: 8px 0;
`;

export const NormLabel = styled.div`
  font-size: 12px;
  color: #999;
`;

export const NormValue = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const EditButton = styled.button`
  border: 1px solid #A259FF;
  background: #7d5bbe;
  color: white;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 12px;

  &:hover {
    background:rgba(181, 125, 240, 0.83);
  }
`;

export const OfferButton = styled.button`
  border: 1px solid #A259FF;
  background: #f1e1d0;
  color: #7d5bbe;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 8px;

  &:hover {
    background: #f3e8ff;
  }
`;

export const PoweredText = styled.div`
  text-align: center;
  font-size: 10px;
  color: #aaa;
  margin-top: 16px;
`;