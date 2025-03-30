"use client";

import React, { useState, useMemo, useEffect } from "react";
import { diaryData, Diary } from "@/data/diaryData";
import { useRouter } from "next/navigation";
import DiaryCalendar, { headerConfig, calendarConfig } from "../components/DiaryCalendar";

// 가공 함수 (동일)
const getDiariesByYM = (data: Diary[]) =>
  data.reduce<Record<number, Record<number, Record<number, { id: number; text: string }>>>>((acc, entry) => {
    const [y, m, d] = entry.date.split("-").map(Number);
    if (!acc[y]) acc[y] = {};
    if (!acc[y][m]) acc[y][m] = {};
    acc[y][m][d] = { id: entry.id, text: entry.text };
    return acc;
  }, {});

const getCalendarDates = (year: number, month: number) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();
  const weeks: Array<Array<number | null>> = [];
  let currentDay = 1 - firstDay;
  for (let i = 0; i < 6; i++) {
    const week: Array<number | null> = [];
    for (let j = 0; j < 7; j++) {
      week.push(currentDay >= 1 && currentDay <= lastDate ? currentDay : null);
      currentDay++;
    }
    weeks.push(week);
  }
  return weeks;
};

export default function DiaryPage() {
  const router = useRouter();
  const now = new Date();
  const defaultYear =
    now.getFullYear() >= 2025 && now.getFullYear() <= 2026 ? now.getFullYear() : 2025;
  const defaultMonth =
    now.getFullYear() >= 2025 && now.getFullYear() <= 2026 ? now.getMonth() + 1 : 1;

  const [year, setYear] = useState<number>(defaultYear);
  const [month, setMonth] = useState<number>(defaultMonth);

  const diariesByYM = useMemo(() => getDiariesByYM(diaryData), []);
  const calendar = useMemo(() => getCalendarDates(year, month), [year, month]);

  useEffect(() => {
    const days = diariesByYM[year]?.[month];
    if (days) {
      const maxDay = Math.max(...Object.keys(days).map(Number));
      const diaryEntry = days[maxDay];
      router.push(`/diary/${diaryEntry.id}?_=${Date.now()}`);
    }
  }, [year, month, diariesByYM, router]);

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const entry = diariesByYM[year]?.[month]?.[day];
    if (entry) {
      router.push(`/diary/${entry.id}`);
    }
  };

  const handlePrevYear = () => { if (year > 2025) setYear(year - 1); };
  const handleNextYear = () => { if (year < 2026) setYear(year + 1); };
  const handlePrevMonth = () => {
    if (month > 1) setMonth(month - 1);
    else if (year > 2025) { setYear(year - 1); setMonth(12); }
  };
  const handleNextMonth = () => {
    if (month < 12) setMonth(month + 1);
    else if (year < 2026) { setYear(year + 1); setMonth(1); }
  };

  return (
    <div>
     
    </div>
  );
}
