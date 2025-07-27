import React, { useEffect, useState } from "react";
import {
  ProfileHeader,
  Avatar,
  ProfileName,
  ProfileSub,
  InfoCard,
  InfoRow,
  InfoLabel,
  InfoValue,
  NormCard,
  NormLabel,
  NormValue,
  PrimaryButton,
  SecondaryButton,
  FooterText,
  SkeletonAvatar,
} from "../styles/profile";
import { getEffectiveUserId } from "../telegram";
import { SkeletonLine } from "../styles/shared";

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
  dailyNorm?: number;
}

const ProfileTab: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = getEffectiveUserId();
      try {
        setIsLoading(true);
        const response = await fetch(`/api/user?userId=${userId}`);
        const data = await response.json();
        setUserData(data);
        setEditedData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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

      setUserData(editedData);
      setIsEditing(false);
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

  if (isLoading) {
    return (
      <>
        <ProfileHeader>
          <SkeletonAvatar />
          <div style={{ width: "100%", textAlign: "center" }}>
            <SkeletonLine width="60%" height="1.5rem" style={{ margin: "0 auto 8px" }} />
            <SkeletonLine width="40%" height="1rem" style={{ margin: "0 auto" }} />
          </div>
        </ProfileHeader>
        {[...Array(7)].map((_, i) => (
          <div key={i} style={{ marginBottom: "16px" }}>
            <SkeletonLine width="100%" height="1rem" />
          </div>
        ))}
      </>
    );
  }

  if (!userData) {
    return <div>Ошибка загрузки данных профиля</div>;
  }

  return (
    <>
      <ProfileHeader>
        <Avatar>
          {userData.firstName?.[0]}
          {userData.lastName?.[0]}
        </Avatar>
        <ProfileName>
          {userData.firstName} {userData.lastName}
        </ProfileName>
        <ProfileSub>
          Твоя подписка до {formatDate(userData.subscriptionExpiry)}
        </ProfileSub>
      </ProfileHeader>

      <InfoCard>
        <InfoRow>
          <InfoLabel>🎂 Дата рождения</InfoLabel>
          {isEditing ? (
            <input
              type="date"
              value={editedData?.birthDate || ""}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              style={{
                border: "1px solid #F2F2F7",
                borderRadius: "8px",
                padding: "4px 8px",
              }}
            />
          ) : (
            <InfoValue>{formatDate(userData.birthDate)}</InfoValue>
          )}
        </InfoRow>

        <InfoRow>
          <InfoLabel>⚧️ Пол</InfoLabel>
          {isEditing ? (
            <select
              value={editedData?.gender || ""}
              onChange={(e) => handleChange("gender", e.target.value)}
              style={{
                border: "1px solid #F2F2F7",
                borderRadius: "8px",
                padding: "4px 8px",
              }}
            >
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
          ) : (
            <InfoValue>{userData.gender}</InfoValue>
          )}
        </InfoRow>

        <InfoRow>
          <InfoLabel>🎯 Цель</InfoLabel>
          {isEditing ? (
            <select
              value={editedData?.goal || ""}
              onChange={(e) => handleChange("goal", e.target.value)}
              style={{
                border: "1px solid #F2F2F7",
                borderRadius: "8px",
                padding: "4px 8px",
              }}
            >
              <option value="Похудение">Похудение</option>
              <option value="Набор массы">Набор массы</option>
              <option value="Поддержание веса">Поддержание веса</option>
            </select>
          ) : (
            <InfoValue>{userData.goal}</InfoValue>
          )}
        </InfoRow>

        <InfoRow>
          <InfoLabel>🏃‍♂️ Уровень активности</InfoLabel>
          {isEditing ? (
            <select
              value={editedData?.activityLevel || ""}
              onChange={(e) => handleChange("activityLevel", e.target.value)}
              style={{
                border: "1px solid #F2F2F7",
                borderRadius: "8px",
                padding: "4px 8px",
              }}
            >
              <option value="Сидячий образ жизни">Сидячий образ жизни</option>
              <option value="Лёгкая активность">Лёгкая активность</option>
              <option value="Умеренная активность">Умеренная активность</option>
              <option value="Высокая активность">Высокая активность</option>
              <option value="Очень высокая активность">
                Очень высокая активность
              </option>
            </select>
          ) : (
            <InfoValue>{userData.activityLevel}</InfoValue>
          )}
        </InfoRow>

        <InfoRow>
          <InfoLabel>⚖️ Текущий вес</InfoLabel>
          {isEditing ? (
            <input
              type="number"
              value={editedData?.currentWeight || ""}
              onChange={(e) =>
                handleChange("currentWeight", parseFloat(e.target.value))
              }
              style={{
                border: "1px solid #F2F2F7",
                borderRadius: "8px",
                padding: "4px 8px",
                width: "80px",
                textAlign: "right",
              }}
            />
          ) : (
            <InfoValue>{userData.currentWeight} кг</InfoValue>
          )}
        </InfoRow>

        <InfoRow>
          <InfoLabel>🥇 Желаемый вес</InfoLabel>
          {isEditing ? (
            <input
              type="number"
              value={editedData?.desiredWeight || ""}
              onChange={(e) =>
                handleChange("desiredWeight", parseFloat(e.target.value))
              }
              style={{
                border: "1px solid #F2F2F7",
                borderRadius: "8px",
                padding: "4px 8px",
                width: "80px",
                textAlign: "right",
              }}
            />
          ) : (
            <InfoValue>{userData.desiredWeight} кг</InfoValue>
          )}
        </InfoRow>

        <InfoRow>
          <InfoLabel>📏 Рост</InfoLabel>
          {isEditing ? (
            <input
              type="number"
              value={editedData?.height || ""}
              onChange={(e) => handleChange("height", parseFloat(e.target.value))}
              style={{
                border: "1px solid #F2F2F7",
                borderRadius: "8px",
                padding: "4px 8px",
                width: "80px",
                textAlign: "right",
              }}
            />
          ) : (
            <InfoValue>{userData.height} см</InfoValue>
          )}
        </InfoRow>
      </InfoCard>

      <NormCard>
        <NormLabel>Твоя дневная норма</NormLabel>
        <NormValue>{userData.dailyNorm || 2000} ккал</NormValue>
      </NormCard>

      {isEditing ? (
        <>
          <PrimaryButton onClick={handleSaveClick}>Сохранить</PrimaryButton>
          <SecondaryButton onClick={handleCancelClick}>
            Отмена
          </SecondaryButton>
        </>
      ) : (
        <>
          <PrimaryButton onClick={handleEditClick}>
            Изменить данные
          </PrimaryButton>
          <SecondaryButton onClick={handleOfferClick}>
            Оферта
          </SecondaryButton>
        </>
      )}

      <FooterText>Powered by Fit&Pink</FooterText>
    </>
  );
};

export default ProfileTab;