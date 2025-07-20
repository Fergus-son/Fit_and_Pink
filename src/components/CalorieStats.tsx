// App.tsx - не требует изменений, так как там нет скелетонов

// CalorieStats.tsx - измененная версия
import React, { useEffect, useState } from "react";
import { UserStats } from "../types";
import { tg } from "../telegram";

const CalorieStats: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`/api/stats?userId=${tg.initDataUnsafe.user?.id}`);
      setStats(await response.json());
    };
    fetchStats();
  }, []);

  if (!stats) return null; // Просто возвращаем null, если данные не загружены

  return (
    <div className="p-4 rounded-xl bg-white shadow">
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
    </div>
  );
};

export default CalorieStats;