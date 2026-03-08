"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  value?: Date;
  defaultValue?: Date;
  onDateChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
}

const DAY_HEADERS = ["일", "월", "화", "수", "목", "금", "토"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      value,
      defaultValue,
      onDateChange,
      minDate,
      maxDate,
      locale = "ko-KR",
      ...props
    },
    ref
  ) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      value ?? defaultValue
    );
    const [viewYear, setViewYear] = React.useState(
      (value ?? defaultValue ?? today).getFullYear()
    );
    const [viewMonth, setViewMonth] = React.useState(
      (value ?? defaultValue ?? today).getMonth()
    );

    React.useEffect(() => {
      if (value) {
        setSelectedDate(value);
        setViewYear(value.getFullYear());
        setViewMonth(value.getMonth());
      }
    }, [value]);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const startDay = getStartDayOfWeek(viewYear, viewMonth);

    const handlePrevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    };

    const handleNextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    };

    const handleSelectDate = (day: number) => {
      const date = new Date(viewYear, viewMonth, day);
      setSelectedDate(date);
      onDateChange?.(date);
    };

    const isDisabled = (day: number) => {
      const date = new Date(viewYear, viewMonth, day);
      if (minDate) {
        const min = new Date(
          minDate.getFullYear(),
          minDate.getMonth(),
          minDate.getDate()
        );
        if (date < min) return true;
      }
      if (maxDate) {
        const max = new Date(
          maxDate.getFullYear(),
          maxDate.getMonth(),
          maxDate.getDate()
        );
        if (date > max) return true;
      }
      return false;
    };

    const cells: React.ReactNode[] = [];

    for (let i = 0; i < startDay; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day);
      const dayOfWeek = date.getDay();
      const isToday = isSameDay(date, today);
      const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
      const disabled = isDisabled(day);
      const isSunday = dayOfWeek === 0;

      cells.push(
        <button
          key={day}
          type="button"
          disabled={disabled}
          onClick={() => handleSelectDate(day)}
          aria-label={`${viewYear}년 ${viewMonth + 1}월 ${day}일`}
          aria-selected={isSelected}
          className={cn(
            "inline-flex items-center justify-center h-9 w-9 text-sm rounded-md transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary",
            !isSelected &&
              !disabled &&
              "hover:bg-krds-gray-100 dark:hover:bg-krds-gray-700",
            isToday &&
              !isSelected &&
              "font-bold border border-krds-primary dark:border-krds-primary-400",
            isSelected &&
              "bg-krds-primary text-white dark:bg-krds-primary-600",
            disabled &&
              "text-krds-gray-300 dark:text-krds-gray-600 pointer-events-none",
            !isSelected &&
              !disabled &&
              isSunday &&
              "text-red-500 dark:text-red-400",
            !isSelected &&
              !disabled &&
              !isSunday &&
              "text-krds-gray-900 dark:text-krds-gray-50"
          )}
        >
          {day}
        </button>
      );
    }

    const monthLabel = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
    }).format(new Date(viewYear, viewMonth));

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white dark:bg-krds-gray-800 border border-krds-gray-200 dark:border-krds-gray-700 rounded-md p-3 w-fit",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="이전 달"
            className="inline-flex items-center justify-center h-8 w-8 rounded-md text-krds-gray-500 hover:text-krds-gray-700 dark:text-krds-gray-400 dark:hover:text-krds-gray-200 transition-colors"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-sm font-semibold text-krds-gray-900 dark:text-krds-gray-50">
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="다음 달"
            className="inline-flex items-center justify-center h-8 w-8 rounded-md text-krds-gray-500 hover:text-krds-gray-700 dark:text-krds-gray-400 dark:hover:text-krds-gray-200 transition-colors"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_HEADERS.map((d, i) => (
            <div
              key={d}
              className={cn(
                "flex items-center justify-center h-8 text-xs font-medium",
                i === 0
                  ? "text-red-500 dark:text-red-400"
                  : "text-krds-gray-500 dark:text-krds-gray-400"
              )}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7" role="grid" aria-label="달력">
          {cells}
        </div>
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

export { Calendar };
