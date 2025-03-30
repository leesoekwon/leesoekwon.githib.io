"use client";

import React, { useEffect, useState } from "react";

interface FixedTextsProps {
  time: string; // 작성 시각 (예: "2025-03-26 10:00" 혹은 ISO 형식)
  text: string; // 본문 HTML 코드 (예: "<b>Bold</b> and <i>italic</i>" 등)
}

export function FixedTexts({ time, text }: FixedTextsProps) {
  const [relativeTime, setRelativeTime] = useState("");
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const computeRelativeTime = () => {
    const createdTime = new Date(time);
    const now = new Date();
    const diffMs = now.getTime() - createdTime.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMs < 0) {
      return "방금";
    }
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 3) {
      return `${diffDays}일 전`;
    } else {
      const year = createdTime.getFullYear();
      const month = createdTime.getMonth() + 1;
      const day = createdTime.getDate();
      const formattedYear = (year % 100).toString().padStart(2, "0");
      const formattedMonth = month.toString().padStart(2, "0");
      const formattedDay = day.toString().padStart(2, "0");
      return `${formattedYear}/${formattedMonth}/${formattedDay}`;
    }
  };

  useEffect(() => {
    setRelativeTime(computeRelativeTime());
    const intervalId = setInterval(() => {
      setRelativeTime(computeRelativeTime());
    }, 60000); // 1분마다 업데이트
    return () => clearInterval(intervalId);
  }, [time]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 창 너비가 450px 이상이면 좌우 배치, 미만이면 기본 세로 배치
  const isWide = windowWidth >= 450;

  // isWide일 때: 전체 그룹을 화면 중앙에 배치하고, 내부 항목은 상단(즉, 위쪽 정렬)으로 배치
  const containerStyle: React.CSSProperties = isWide
    ? {
        display: "flex",
        alignItems: "flex-start", // 항목들을 상단 정렬
        justifyContent: "center", // 전체 그룹을 수평 중앙 정렬
        gap: "20px", // 두 요소 사이의 간격
        margin: "140px auto 60px", // 상단, 하단 여백 및 수평 중앙 배치

        width: "100%",
        maxWidth: "512px",
        padding: "0 16px",
        boxSizing: "border-box",
      }
    : {
        marginTop: "54px",
        marginBottom: "60px",
        padding: "0",
        boxSizing: "border-box",
      };

  // isWide일 때는 gap을 통해 간격을 조절하므로 따로 marginRight를 줄 필요 없음.
  const timeStyle: React.CSSProperties = isWide
    ? { whiteSpace: "nowrap",         padding: "3.5px 0",   }
    : { marginBottom: "5px" };

  const contentStyle: React.CSSProperties = isWide ? { flex: 1 } : {};

  return (
    <div style={containerStyle}>
      <p className="timeText" style={timeStyle}>
        {relativeTime}
      </p>
      <div
        className="fixed-text-content bodyText"
        style={contentStyle}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
