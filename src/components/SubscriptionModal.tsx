import React, { useState } from "react";
import {
  Overlay,
  Content,
  // TopImageWrapper,
  Title,
  PeriodSelector,
  PeriodButton,
  PlanBox,
  PlanLeft,
  PlanRight,
  PlanHeader,
  PlanPrice,
  Features,
  BuyButton,
} from "../styles/subscrition";
// import walletImg from "../images/Wallet.jpg"; // сюда положи картинку кошелька


interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const [activePeriod, setActivePeriod] = useState<'3months' | 'year'>('3months');
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      {/* <TopImageWrapper imageUrl={walletImg}/>        */}
      <Content onClick={(e) => e.stopPropagation()}>

        <Title>Управление подпиской</Title>

        <PeriodSelector>
          <PeriodButton
          active={activePeriod === '3months'}
          onClick={() => setActivePeriod('3months')}
          >
            На 3 месяца</PeriodButton>
          <PeriodButton
          active={activePeriod === 'year'}
          onClick={() => setActivePeriod('year')}
          >
            На год</PeriodButton>
        </PeriodSelector>

        <PlanBox>
          <PlanLeft>
            <div>
              <PlanHeader>Премиум</PlanHeader>
              <PlanPrice>1299р.</PlanPrice>
            </div>
            <BuyButton>Купить</BuyButton>
          </PlanLeft>
          <PlanRight>
            <Features>
              <p>✓ Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              <p>✓ Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              <p>✓ Lorem ipsum dolor sit amet</p>
            </Features>
          </PlanRight>
        </PlanBox>

        <PlanBox>
          <PlanLeft>
            <div>
              <PlanHeader>Базовая</PlanHeader>
              <PlanPrice>799р.</PlanPrice>
            </div>
            <BuyButton>Купить</BuyButton>
          </PlanLeft>
          <PlanRight>
            <Features>
              <p>✓ Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              <p>✓ Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </Features>
          </PlanRight>
        </PlanBox>
      </Content>
    </Overlay>
  );
};

export default SubscriptionModal;
