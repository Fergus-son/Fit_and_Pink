import React, { useEffect, useState } from "react";
import { UserStats } from "../types";
import { tg } from "../telegram";

const CalorieStats: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/stats?userId=${tg.initDataUnsafe.user?.id}`);
        setStats(await response.json());
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 rounded-xl bg-white shadow">
      {!isLoading && stats ? (
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
          <h2 className="text-xl font-bold mb-2">👤 Загрузка...</h2>
          <p className="mb-4">Всего калорий: <strong>—</strong></p>
          <h3 className="font-semibold">История:</h3>
          <ul className="mt-2">
            {[...Array(5)].map((_, i) => (
              <li key={i} className="flex justify-between border-b py-1 text-sm">
                <span>—</span>
                <span>— ккал</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CalorieStats;