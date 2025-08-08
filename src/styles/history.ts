import styled from "styled-components";

export const CardHistory = styled.div`
  margin: 10px;
  background: #EADAC8;
  border-radius: 16px;
  padding: 8px;
  margin-bottom: 16px;
  min-height: 60vh;
`;

export const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 15px 0px 15px;
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 0px 5px 0px 5px;
  background-color: white;
  border-radius: 20px;
  // border-bottom: 1px solid #F2F2F7;
`;


export const FoodName = styled.span`
font-weight: bold;
font-size: 16px;
display: block;
color: #2D3436;
`;

export const MacroInfo = styled.span`
font-size: 12px;
color: #2D3436;
`;

export const TimeInfo = styled.span`
font-size: 12px;
color: #2D3436;
display: block;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin: 0px 8px 8px;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  flex: 1;
  background: ${p => p.active ? '#F2971C' : 'transparent'};
  color: ${p => p.active ? '#FFFFFF' : 'black'};
  padding: 6px;
  border: ${p => p.active ? '1px solid #F2971C;' : '1px solid black'};
  border-radius: 6px;
  font-size: 12px;
  font-weight: ${p => p.active ? '500' : '400'};
  cursor: pointer;
`;

export const RoundEditButton = styled.button`
  margin: 0px 8px 8px;
  border: 1px solid #F2F2F7;
  cursor: pointer;
  margin-left: auto;
  color: #B2BEC3;
  font-size: 25px;
  padding: 4px;
  width: 50px;
  height:50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    background-color: #F2971C;
    border-color: black;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 32px 0;
  color: #636E72;
  font-size: 14px;
`;


// редакт

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #EADAC8;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  
  h2 {
    margin: 0 0 16px 0;
    color: #2D3436;
    font-size: 1.25rem;
  }
  
  p {
    color: #636E72;
    margin: 0 0 16px 0;
    font-size: 0.875rem;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #D8D8D8;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  background-color: ${p => p.disabled ? '#B2BEC3' : '#F2971C'};
  color: white;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &:not(:disabled):hover {
    background-color: #E08C17;
    transform: translateY(-1px);
  }
  
  &[data-variant="secondary"] {
    background-color: white;
    color: #2D3436;
    border: 1px solid #D8D8D8;
    
    &:hover {
      background-color: #F5F5F5;
    }
  }
  
  &[data-variant="danger"] {
    background-color: #FF7675;
    
    &:hover {
      background-color: #E66767;
    }
  }
`;