"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import { maxMemoId } from "@/data/memoData";
import { maxDiaryId } from "@/data/diaryData";
import { maxNoticeId } from "@/data/noticeData";

interface HomeBarProps {
  hidden: boolean;
}

export function HomeBar({ hidden }: HomeBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // 창 너비를 감지하기 위한 상태
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 창 너비가 450px 이상이면 중앙의 홈 아이콘 및 텍스트, 배경을 숨김
  const showHomeContent = windowWidth < 450;

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  let base = "";
  let currentId: number | null = null;

  if (segments.length >= 2) {
    base = `/${segments[0]}`;
    currentId = parseInt(segments[1], 10);
    if (isNaN(currentId)) {
      currentId = null;
    }
  }

  let maxId = 9999;
  switch (base) {
    case "/memo":
      maxId = maxMemoId;
      break;
    case "/diary":
      maxId = maxDiaryId;
      break;
    case "/notice":
      maxId = maxNoticeId;
      break;
    default:
      break;
  }

  const minId = 1;
  const isDiary = base === "/diary";

  const handleLeft = () => {
    if (currentId === null) return;
    if (isDiary) {
      if (currentId > minId) router.push(`${base}/${currentId - 1}`);
    } else {
      if (currentId < maxId) router.push(`${base}/${currentId + 1}`);
    }
  };

  const handleRight = () => {
    if (currentId === null) return;
    if (isDiary) {
      if (currentId < maxId) router.push(`${base}/${currentId + 1}`);
    } else {
      if (currentId > minId) router.push(`${base}/${currentId - 1}`);
    }
  };

  // 창 너비가 450px 이상이면 화살표만 남으므로 bottom을 30px로 설정
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: windowWidth >= 450 ? "16px" : 0,
    left: 0,
    width: "100%",
    backgroundColor: showHomeContent ? "#F6F6F6" : "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px 0",
    fontWeight: 420,
    fontSize: "17.5px",
    zIndex: 1000,
    ...(windowWidth >= 450 && {
      top: "50%",
      transform: "translateY(-50%)",
    }),
  };
  

  // 화살표 공통 스타일 (HomeBar 내부에 절대 위치로 배치)
  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  };

  // 중앙 home 아이콘과 텍스트를 감싸는 컨테이너 (수평 정렬, gap 6px)
  const homeItemStyle: React.CSSProperties = {
    display: showHomeContent ? "flex" : "none",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
  };

  // 화살표 활성화/비활성화 상태
  const leftArrowDisabled =
    currentId === null || (isDiary ? currentId <= minId : currentId >= maxId);
  const rightArrowDisabled =
    currentId === null || (isDiary ? currentId >= maxId : currentId <= minId);

  return (
    <div style={containerStyle}>
      {/* 좌측 화살표 */}
      {currentId !== null && (
        <div
          style={{
            ...arrowStyle,
            left: "16px",
            opacity: leftArrowDisabled ? 0.2 : 1,
            pointerEvents: leftArrowDisabled ? "none" : "auto",
          }}
          onClick={leftArrowDisabled ? undefined : handleLeft}
        >
          <Image src="/leftArrow.svg" alt="Previous" width={30} height={30} />
        </div>
      )}

      {/* 중앙 홈 아이콘과 텍스트 (창 너비가 450 미만일 때만 표시) */}
      <div style={homeItemStyle} onClick={() => router.push("/?skip=4")}>
        <Image src="/Home.svg" alt="Home" width={22} height={22} />
        <span style={{color: "#484848"}}>leesoukwon.com</span>
      </div>

      {/* 우측 화살표 */}
      {currentId !== null && (
        <div
          style={{
            ...arrowStyle,
            right: "16px",
            opacity: rightArrowDisabled ? 0.2 : 1,
            pointerEvents: rightArrowDisabled ? "none" : "auto",
          }}
          onClick={rightArrowDisabled ? undefined : handleRight}
        >
          <Image src="/rightArrow.svg" alt="Next" width={30} height={30} />
        </div>
      )}
    </div>
  );
}
