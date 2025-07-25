import React, { useEffect, useState } from "react";
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
  SkeletonLine,
  SkeletonAvatar
} from "../styles/profile";
import { getEffectiveUserId, getUserId, tg } from "../telegram";

interface UserData {
  firstName: string;
  lastName: string;
  subscriptionExpiry: string;
  birthDate: string;
  gender: string;
  goal: string;
  activityLevel: string;
  currentWeight: number;
  desiredWeight: number;
  height: number;
}

const ProfileTab: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getEffectiveUserId();
      const response = await fetch(`/api/user?userId=${userId}`);
      const data = await response.json();
      setUserData(data);
      setEditedData(data);
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleOfferClick = () => {
    window.open("https://natarelke.io/oferta.pdf", "_blank");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

const handleSaveClick = async () => {
  if (!editedData) return;

  try {
    const userId = getEffectiveUserId();
    const response = await fetch(`/api/user/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...editedData }),
    });

    if (!response.ok) throw new Error("Ошибка сохранения");

    // Сразу обновляем состояние без повторного запроса
    setUserData(editedData); // Используем уже отредактированные данные
    setIsEditing(false);
    
    // Если сервер возвращает обновлённые данные, можно использовать их:
    // const updatedData = await response.json();
    // setUserData(updatedData);
    
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const handleChange = (field: keyof UserData, value: string | number) => {
    if (!editedData) return;
    setEditedData({
      ...editedData,
      [field]: value,
    });
  };

  return (
    <Section>
      <ProfileHeader>
        {userData ? <Avatar /> : <SkeletonAvatar />}

        <div className="flex-1 min-w-0">
          {userData ? (
            <>
              <ProfileName>{userData.firstName} {userData.lastName}</ProfileName>
              <ProfileSub>Подписка — до {formatDate(userData.subscriptionExpiry)}</ProfileSub>
            </>
          ) : (
            <>
              {/* <SkeletonLine width="70%" />
              <SkeletonLine width="50%" /> */}
            </>
          )}
        </div>
      </ProfileHeader>

      <InfoTitle>Информация о клиенте</InfoTitle>

      <InfoRow>
        <InfoLabel>🎂 Дата рождения</InfoLabel>
        {userData ? (
          isEditing ? (
            <input
              type="date"
              value={editedData?.birthDate || ""}
              onChange={(e) => handleChange("birthDate", e.target.value)}
            />
          ) : (
            <InfoValue>{formatDate(userData.birthDate)}</InfoValue>
          )
        ) : (
          <SkeletonLine width="50%" />
        )}
      </InfoRow>

      <InfoRow>
        <InfoLabel>⚧️ Пол</InfoLabel>
        {userData ? (
          isEditing ? (
            <select
              value={editedData?.gender || ""}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
          ) : (
            <InfoValue>{userData.gender}</InfoValue>
          )
        ) : (
          <SkeletonLine width="50%" />
        )}
      </InfoRow>

      <InfoRow>
        <InfoLabel>🎯 Цель</InfoLabel>
        {userData ? (
          isEditing ? (
            <select
              value={editedData?.goal || ""}
              onChange={(e) => handleChange("goal", e.target.value)}
            >
              <option value="Похудение">Похудение</option>
              <option value="Набор массы">Набор массы</option>
              <option value="Поддержание веса">Поддержание веса</option>
            </select>
          ) : (
            <InfoValue>{userData.goal}</InfoValue>
          )
        ) : (
          <SkeletonLine width="50%" />
        )}
      </InfoRow>

      <InfoRow>
        <InfoLabel>🏃‍♂️ Уровень активности</InfoLabel>
        {userData ? (
          isEditing ? (
            <select
              value={editedData?.activityLevel || ""}
              onChange={(e) => handleChange("activityLevel", e.target.value)}
            >
              <option value="Сидячий образ жизни">Сидячий образ жизни</option>
              <option value="Лёгкая активность">Лёгкая активность</option>
              <option value="Умеренная активность">Умеренная активность</option>
              <option value="Высокая активность">Высокая активность</option>
              <option value="Очень высокая активность">Очень высокая активность</option>
            </select>
          ) : (
            <InfoValue>{userData.activityLevel}</InfoValue>
          )
        ) : (
          <SkeletonLine width="50%" />
        )}
      </InfoRow>

      <InfoRow>
        <InfoLabel>⚖️ Текущий вес</InfoLabel>
        {userData ? (
          isEditing ? (
            <input
              type="number"
              value={editedData?.currentWeight || ""}
              onChange={(e) => handleChange("currentWeight", parseFloat(e.target.value))}
            />
          ) : (
            <InfoValue>{userData.currentWeight} кг</InfoValue>
          )
        ) : (
          <SkeletonLine width="50%" />
        )}
      </InfoRow>

      <InfoRow>
        <InfoLabel>🥇 Желаемый вес</InfoLabel>
        {userData ? (
          isEditing ? (
            <input
              type="number"
              value={editedData?.desiredWeight || ""}
              onChange={(e) => handleChange("desiredWeight", parseFloat(e.target.value))}
            />
          ) : (
            <InfoValue>{userData.desiredWeight} кг</InfoValue>
          )
        ) : (
          <SkeletonLine width="50%" />
        )}
      </InfoRow>

      <InfoRow>
        <InfoLabel>📏 Рост</InfoLabel>
        {userData ? (
          isEditing ? (
            <input
              type="number"
              value={editedData?.height || ""}
              onChange={(e) => handleChange("height", parseFloat(e.target.value))}
            />
          ) : (
            <InfoValue>{userData.height} см</InfoValue>
          )
        ) : (
          <SkeletonLine width="50%" />
        )}
      </InfoRow>

      {userData && (
        <>
          {isEditing ? (
            <>
              <EditButton onClick={handleSaveClick}>Сохранить</EditButton>
              <EditButton onClick={handleCancelClick}>Отмена</EditButton>
            </>
          ) : (
            <EditButton onClick={handleEditClick}>Изменить данные</EditButton>
          )}
          <OfferButton onClick={handleOfferClick}>Оферта</OfferButton>
          <PoweredText>Powered by Fit&Pink</PoweredText>
        </>
      )}
    </Section>
  );
};

export default ProfileTab;