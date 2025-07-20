import styled from "styled-components";

export const Section = styled.section`
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
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
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const InfoLabel = styled.div`
  font-size: 14px;
`;

export const InfoValue = styled.div`
  font-weight: bold;
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
  background: #7d5bbe;
  color: white;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 12px;
`;

export const OfferButton = styled.button`
  background: #f1e1d0;
  color: #7d5bbe;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 8px;
`;

export const PoweredText = styled.div`
  text-align: center;
  font-size: 10px;
  color: #aaa;
  margin-top: 16px;
`;