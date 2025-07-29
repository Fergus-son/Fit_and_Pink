import React, { useEffect, useRef } from "react";
import { DateContainer, DateItem } from "./DateSelectorStyle";

const DateSelector: React.FC = () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString("default", { month: "short" }).toUpperCase();
  const currentWeekday = today.toLocaleString("default", { weekday: "short" }).toUpperCase();

  // Ссылку создаем для активной даты
  const activeDateRef = useRef<HTMLDivElement | null>(null);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(currentDay - 3 + i);
    return {
      day: date.getDate(),
      weekday: date.toLocaleString("default", { weekday: "short" }).toUpperCase(),
      month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
      isToday: date.getDate() === currentDay,
    };
  });

  // Прокрутка к сегодняшней дате по центру при загрузке
  useEffect(() => {
    if (activeDateRef.current) {
      activeDateRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  return (
    <DateContainer>
      {dates.map((date, i) => (
        <DateItem
          key={i}
          $isActive={date.isToday}
          ref={date.isToday ? activeDateRef : null}
        >
          <div>{date.month}</div>
          <div>{date.day}</div>
          <div>{date.weekday}</div>
        </DateItem>
      ))}
    </DateContainer>
  );
};

export default DateSelector;
