/// components/ProfileTab.tsx
import React from "react";
import {
  Section,
} from "../styles/shared";
import {
    Avatar,
    ProfileHeader,
    ProfileName,
    ProfileSub,
    InfoTitle,
    InfoRow,
    InfoLabel,
    InfoValue,
    NormBox,
    NormLabel,
    NormValue, 
    EditButton,
    OfferButton,
    PoweredText,
} from "../styles/profile";

export default function ProfileTab() {
  return (
    <Section>
      <ProfileHeader>
        <Avatar /> 
        <ProfileName>Долбаеб Хуесосович</ProfileName>
        <ProfileSub>Подписка — до 24.09.24</ProfileSub>
      </ProfileHeader>

      <InfoTitle>Информация о клиенте</InfoTitle>

      <InfoRow>
        <InfoLabel>Дата рождения</InfoLabel>
        <InfoValue>24 апр 2003</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Пол</InfoLabel>
        <InfoValue>Мужской</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Цель</InfoLabel>
        <InfoValue>Похудение</InfoValue>
      </InfoRow>

      <InfoTitle>Рекомендуемая норма</InfoTitle>

      <NormBox>
        <NormLabel>Калории</NormLabel>
        <NormValue>2134 ккал/сутки</NormValue>
      </NormBox>
      <NormBox>
        <NormLabel>Белки</NormLabel>
        <NormValue>134 г</NormValue>
      </NormBox>
      <NormBox>
        <NormLabel>Жиры</NormLabel>
        <NormValue>63 г</NormValue>
      </NormBox>
      <NormBox>
        <NormLabel>Углеводы</NormLabel>
        <NormValue>240 г</NormValue>
      </NormBox>

      <EditButton>Изменить данные</EditButton>
      <OfferButton>Оферта</OfferButton>

      <PoweredText>Powered by Fit&Pink</PoweredText>
    </Section>
  );
}
