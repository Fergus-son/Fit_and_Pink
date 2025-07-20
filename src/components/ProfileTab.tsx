import { useQuery } from "react-query";
import { api } from "../types/api";
import { formatDate } from "../utils/formatting";
import {
  Section, Avatar, ProfileHeader, ProfileName, ProfileSub,
  InfoTitle, InfoRow, InfoLabel, InfoValue, NormBox, NormLabel,
  NormValue, EditButton, OfferButton, PoweredText
} from "../styles/profile";
import { SkeletonLine, SkeletonAvatar, ErrorMessage } from "../styles/Skeleton";

const ProfileTab: React.FC = () => {
  const { data: userData, isLoading, error } = useQuery('userProfile', api.getUserProfile);

  if (error) return <ErrorMessage>Ошибка загрузки профиля</ErrorMessage>;

  return (
    <Section>
      <ProfileHeader>
        {isLoading ? <SkeletonAvatar /> : <Avatar />}
        
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <>
              <SkeletonLine width="70%" height="1.5rem" />
              <SkeletonLine width="50%" height="1rem" />
            </>
          ) : (
            <>
              <ProfileName>{userData?.firstName} {userData?.lastName}</ProfileName>
              <ProfileSub>
                Подписка — до {formatDate(userData?.subscriptionExpiry)}
              </ProfileSub>
            </>
          )}
        </div>
      </ProfileHeader>

      <InfoTitle>Информация о клиенте</InfoTitle>

      <InfoRow>
        <InfoLabel>Дата рождения</InfoLabel>
        {isLoading ? (
          <SkeletonLine width="60%" />
        ) : (
          <InfoValue>{formatDate(userData?.birthDate) || "—"}</InfoValue>
        )}
      </InfoRow>

      <InfoRow>
        <InfoLabel>Пол</InfoLabel>
        {isLoading ? (
          <SkeletonLine width="40%" />
        ) : (
          <InfoValue>{userData?.gender}</InfoValue>
        )}
      </InfoRow>

      <InfoRow>
        <InfoLabel>Цель</InfoLabel>
        {isLoading ? (
          <SkeletonLine width="50%" />
        ) : (
          <InfoValue>{userData?.goal}</InfoValue>
        )}
      </InfoRow>

      <InfoTitle>Рекомендуемая норма</InfoTitle>

      {isLoading ? (
        Array(4).fill(0).map((_, i) => (
          <NormBox key={i}>
            <NormLabel><SkeletonLine width="30%" /></NormLabel>
            <NormValue><SkeletonLine width="50%" /></NormValue>
          </NormBox>
        ))
      ) : (
        <>
          <NormBox>
            <NormLabel>Калории</NormLabel>
            <NormValue>{userData?.calories} ккал/сутки</NormValue>
          </NormBox>
          <NormBox>
            <NormLabel>Белки</NormLabel>
            <NormValue>{userData?.proteins} г</NormValue>
          </NormBox>
          <NormBox>
            <NormLabel>Жиры</NormLabel>
            <NormValue>{userData?.fats} г</NormValue>
          </NormBox>
          <NormBox>
            <NormLabel>Углеводы</NormLabel>
            <NormValue>{userData?.carbs} г</NormValue>
          </NormBox>
        </>
      )}

      {!isLoading && (
        <>
          <EditButton>Изменить данные</EditButton>
          <OfferButton>Оферта</OfferButton>
          <PoweredText>Powered by Fit&Pink</PoweredText>
        </>
      )}
    </Section>
  );
};

export default ProfileTab;