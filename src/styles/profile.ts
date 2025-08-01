import styled from "styled-components";

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

// export const Avatar = styled.div`
//   width: 80px;
//   height: 80px;
//   border-radius: 40px;
//   background: #E5E5EA;
//   margin-bottom: 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #8E8E93;
//   font-size: 32px;
// `;


export const ProfileSub = styled.div`
  font-size: 20px;
  padding: 10px;
  font-weight: 400;
  color:rgb(6, 6, 6);
  `;
  
  // color: #636366;
export const SubscriptionButton = styled.button`
  font-size: 16px;
  padding: 12px;
  font-weight: 500;
  color: white;
  background-color: #618466;
  border-radius: 10px;
  border: none;
  width: 200px;
  `;

export const GradientBlock = styled.div`
  background: linear-gradient(180deg, #5F895E 0%, #FFA32E 100%);
  border-radius: 24px 24px;
  padding: 8px 20px;
`;

export const GradientBlockTitle = styled.div`
  padding: 8px 0px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin: 16px 0;
`;

export const InfoCard = styled.div`
  background:rgba(95, 89, 89, 0.32);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.17);
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-bottom: 1px solid #F2F2F7;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.div`
  font-size: 12px;
  color:rgb(255, 255, 255);
  display: flex;
  align-items: center;
  font-weight: 300;
  gap: 8px;
`;

export const InfoValue = styled.div`
  font-size: 16px;
  color:rgb(255, 255, 255);
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
  background: #F2971C;
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
  color: black;
  border: 1px solid black;
  font-weight: 500;
`;