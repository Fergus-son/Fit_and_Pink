import React, { useEffect, useRef, useState } from "react";
import { DateContainer, DateItem } from "./DateSelectorStyle";

interface DateSelectorProps {
  onDateSelect: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onDateSelect }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const activeDateRef = useRef<HTMLDivElement | null>(null);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - 3 + i);
    return {
      date,
      day: date.getDate(),
      weekday: date.toLocaleString("default", { weekday: "short" }).toUpperCase(),
      month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
    };
  });

  useEffect(() => {
    if (activeDateRef.current) {
      activeDateRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedDate]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    
    // Конвертируем в UTC дату без времени для сервера
    const utcDate = new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ));
    onDateSelect(utcDate);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <DateContainer>
      {dates.map((date, i) => {
        const isActive = isSameDay(date.date, selectedDate);
        return (
          <DateItem
            key={i}
            $isActive={isActive}
            ref={isActive ? activeDateRef : null}
            onClick={() => handleDateClick(date.date)}
          >
            <div>{date.month}</div>
            <div>{date.day}</div>
            <div>{date.weekday}</div>
          </DateItem>
        );
      })}
    </DateContainer>
  );
};

export default DateSelector;