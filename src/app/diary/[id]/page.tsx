"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { diaryData, Diary } from "@/data/diaryData";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

// 캘린더 셀 스타일 설정을 위한 공통 설정 객체
const calendarConfig = {
  cellFontSize: "14px", // 날짜 텍스트 폰트 크기
  cellWidth: "28px", // 셀 너비
  cellHeight: "31px", // 셀 높이
  headerFontSize: "14px", // 요일 헤더 폰트 크기
};

const headerConfig = {
  fontSize: "15.2px",
  fontWeight: "500",
  svgSize: 18, // Image 컴포넌트에 전달할 width/height 값
  buttonMargin: "2px",
};

// 공통으로 사용하는 가공 함수들
const getDiariesByYM = (data: Diary[]) =>
  data.reduce<Record<number, Record<number, Record<number, { id: number; text: string }>>>>(
    (acc, entry) => {
      const [y, m, d] = entry.date.split("-").map(Number);
      if (!acc[y]) acc[y] = {};
      if (!acc[y][m]) acc[y][m] = {};
      acc[y][m][d] = { id: entry.id, text: entry.text };
      return acc;
    },
    {}
  );

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

export default function DiaryDetailPage() {
  const params = useParams();
  const diaryId = Number(params.id);
  const diaryEntry = diaryData.find((entry) => entry.id === diaryId);

  if (!diaryEntry) return <div>일기를 찾을 수 없습니다.</div>;

  const [initialYear, initialMonth, initialDay] = diaryEntry.date.split("-").map(Number);
  const [year, setYear] = useState<number>(initialYear);
  const [month, setMonth] = useState<number>(initialMonth);
  const [selectedDay, setSelectedDay] = useState<number>(initialDay);
  const [selectedText, setSelectedText] = useState<string>(diaryEntry.text);

  const diariesByYM = useMemo(() => getDiariesByYM(diaryData), []);
  const calendar = useMemo(() => getCalendarDates(year, month), [year, month]);
  const router = useRouter();

  // 이전 연/월 상태 추적
  const prevYearRef = useRef(year);
  const prevMonthRef = useRef(month);

  // 창 너비 감지를 위한 상태
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isWide = windowWidth >= 450;

  // 연/월 변경시 해당 월의 가장 이른 날짜의 일기를 선택 및 URL 업데이트
  useEffect(() => {
    if (prevYearRef.current !== year || prevMonthRef.current !== month) {
      const days = diariesByYM[year]?.[month];
      if (days) {
        const earliest = Math.min(...Object.keys(days).map(Number));
        setSelectedDay(earliest);
        setSelectedText(days[earliest].text);
        router.push(`/diary/${days[earliest].id}`);
      } else {
        setSelectedDay(null);
        setSelectedText("");
      }
      prevYearRef.current = year;
      prevMonthRef.current = month;
    }
  }, [year, month, diariesByYM, router]);

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const entry = diariesByYM[year]?.[month]?.[day];
    if (entry) {
      setSelectedDay(day);
      setSelectedText(entry.text);
      router.push(`/diary/${entry.id}`);
    }
  };

  // 공통 셀 스타일
  const cellStyle: React.CSSProperties = {
    textAlign: "center",
    width: calendarConfig.cellWidth,
    height: calendarConfig.cellHeight,
    cursor: "default",
  };

  // inline style 객체 (창 너비 450px 이상일 때)
  const containerStyle: React.CSSProperties = isWide
    ? { marginTop: "136px", marginLeft: "auto", marginRight: "auto" }
    : {};

  const topGroupStyle: React.CSSProperties = isWide
    ? { maxWidth: "400px", paddingRight: "24px",marginLeft: "auto", marginRight: "auto" }
    : {};

  const dottedLineStyle: React.CSSProperties = isWide
    ? {
        borderTop: "1.3px solid",
        margin: "5px -1px",
        borderImage:
          "repeating-linear-gradient(to right, #C0BDB1, #C0BDB1 5px, transparent 3px, transparent 8px) 1",
        maxWidth: "515px",
        marginLeft: "auto",
        marginRight: "auto",
      }
    : {
        borderTop: "1.3px solid",
        margin: "5px -1px",
        borderImage:
          "repeating-linear-gradient(to right, #C0BDB1, #C0BDB1 5px, transparent 3px, transparent 8px) 1",
      };

  // 하단 텍스트 영역의 최대 넓이를 450px로 제한 (화면이 wide일 때)
  const bottomGroupStyle: React.CSSProperties = isWide
    ? { maxWidth: "450px", marginLeft: "auto", marginRight: "auto" }
    : {};

  // 하단 그룹 내부의 시간 텍스트와 본문 텍스트를 좌우로 나열할지 여부
  const bottomContentStyle: React.CSSProperties = isWide
    ? {
        display: "flex",
        alignItems: "flex-start", // 상단 정렬
        gap: "20px",
      }
    : { display: "block" };

  // 하단 고정 컨테이너 스타일 (화면 너비에 따라 top 값 조정)
  const bottomFixedStyle: React.CSSProperties = isWide
    ? {
        position: "fixed",
        top: "405px",
        left: 0,
        right: 0,
        bottom: "10px",
        overflowY: "auto",
        padding: "24px 24px 12px 24px",
        boxSizing: "border-box",
        backgroundColor: "#fff",
      }
    : {
        position: "fixed",
        top: "317px",
        bottom: "58px",
        left: 0,
        right: 0,
        overflowY: "auto",
        padding: "24px 24px 12px 24px",
        boxSizing: "border-box",
        backgroundColor: "#fff",
      };

  return (
    <div style={containerStyle}>
      {/* 상단 그룹: 연/월 선택 및 달력 */}
      <div style={topGroupStyle}>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            padding: "16px 0",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <button
                onClick={() => {
                  if (year > 2025) setYear(year - 1);
                }}
                style={{ marginRight: headerConfig.buttonMargin }}
              >
                <Image
                  src="/leftArrow.svg"
                  alt="prev year"
                  width={headerConfig.svgSize}
                  height={headerConfig.svgSize}
                />
              </button>
              <span style={{ fontSize: headerConfig.fontSize, fontWeight: headerConfig.fontWeight }}>
                {year}년
              </span>
              <button
                onClick={() => {
                  if (year < 2026) setYear(year + 1);
                }}
                style={{ marginLeft: headerConfig.buttonMargin }}
              >
                <Image
                  src="/rightArrow.svg"
                  alt="next year"
                  width={headerConfig.svgSize}
                  height={headerConfig.svgSize}
                />
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => {
                  if (month > 1) setMonth(month - 1);
                  else if (year > 2025) {
                    setYear(year - 1);
                    setMonth(12);
                  }
                }}
                style={{ marginRight: headerConfig.buttonMargin }}
              >
                <Image
                  src="/leftArrow.svg"
                  alt="prev month"
                  width={headerConfig.svgSize}
                  height={headerConfig.svgSize}
                />
              </button>
              <span style={{ fontSize: headerConfig.fontSize, fontWeight: headerConfig.fontWeight }}>
                {month}월
              </span>
              <button
                onClick={() => {
                  if (month < 12) setMonth(month + 1);
                  else if (year < 2026) {
                    setYear(year + 1);
                    setMonth(1);
                  }
                }}
                style={{ marginLeft: headerConfig.buttonMargin }}
              >
                <Image
                  src="/rightArrow.svg"
                  alt="next month"
                  width={headerConfig.svgSize}
                  height={headerConfig.svgSize}
                />
              </button>
            </div>
          </div>

          {/* 달력 */}
          <div style={{ marginRight: "-2px" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  {["日", "月", "火", "水", "木", "金", "土"].map((label, idx) => (
                    <th
                      key={idx}
                      style={{
                        textAlign: "center",
                        color: idx === 0 ? "#FF528F" : idx === 6 ? "#4CBEEE" : "#6d6a65",
                        fontWeight: "400",
                        fontSize: calendarConfig.headerFontSize,
                      }}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendar.map((week, rowIndex) => (
                  <tr key={rowIndex}>
                    {week.map((day, colIndex) => {
                      const entry = diariesByYM[year]?.[month]?.[day];
                      const isSelected = entry && day === selectedDay;
                      const currentCellStyle = {
                        ...cellStyle,
                        cursor: entry ? "pointer" : "default",
                      };
                      const textStyle: React.CSSProperties = {
                        fontWeight: entry ? "650" : "320",
                        fontSize: calendarConfig.cellFontSize,
                        letterSpacing: "0px",
                        color: isSelected ? "#D5BD64" : "#555555",
                        textDecoration: isSelected ? "underline" : "none",
                        textUnderlineOffset: "3px",
                      };
                      return (
                        <td
                          key={colIndex}
                          style={currentCellStyle}
                          onClick={entry ? () => handleDayClick(day) : undefined}
                        >
                          {day && <span style={textStyle}>{day}</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 점선 요소 */}
      <div style={dottedLineStyle} />

      {/* 하단 그룹: 선택된 일기의 텍스트 */}
      {selectedDay && selectedText && (
        <div style={bottomFixedStyle}>
          <div style={bottomGroupStyle}>
            <div style={bottomContentStyle}>
              <div
                className="timeText"
                style={{
                  fontSize: "15.2px",
                  marginBottom: isWide ? 0 : "4px",
                }}
              >
                {String(year % 100).padStart(2, "0")}/{String(month).padStart(2, "0")}/{String(
                  selectedDay
                ).padStart(2, "0")}
              </div>
              <div
                className="bodyText"
                style={{
                  fontSize: "16.5px",
                  lineHeight: "26px",
                  letterSpacing: "1.2px",
                }}
                dangerouslySetInnerHTML={{ __html: selectedText }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
