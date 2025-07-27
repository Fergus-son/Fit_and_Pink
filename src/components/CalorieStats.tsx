import React, { useEffect, useState } from "react";
import { UserStats } from "../types";
import { getEffectiveUserId, getUserId, tg } from "../telegram";
import { SkeletonLine } from "../styles/shared";
import styled from "styled-components";

export const StatsContainer = styled.div`
  background: white;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
`;

export const StatsTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

export const StatsItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const CalorieStats: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const userId = getEffectiveUserId()
      const response = await fetch(`/api/stats?userId=${userId}`);
      setStats(await response.json());
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 rounded-xl bg-white shadow">
      {stats ? (
        <>
          <h2 className="text-xl font-bold mb-2">👤 {stats.username}</h2>
          <p className="mb-4">Всего калорий: <strong>{stats.totalCalories}</strong></p>
          <h3 className="font-semibold">История:</h3>
          <ul className="mt-2">
            {stats.entries.map((entry, i) => (
              <li key={i} className="flex justify-between border-b py-1 text-sm">
                <span>{entry.date}</span>
                <span>{entry.calories} ккал</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <SkeletonLine width="40%" height="1.5rem" style={{ marginBottom: '16px' }} />
          <SkeletonLine width="60%" height="1rem" style={{ marginBottom: '24px' }} />
          <SkeletonLine width="30%" height="1rem" style={{ marginBottom: '8px' }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between py-1">
              <SkeletonLine width="30%" height="0.75rem" />
              <SkeletonLine width="20%" height="0.75rem" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CalorieStats;