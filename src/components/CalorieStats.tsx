import React, { useEffect, useState } from "react";
import { UserStats } from "../types";
import { getEffectiveUserId, getUserId, tg } from "../telegram";
import { SkeletonLine } from "../styles/shared";

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