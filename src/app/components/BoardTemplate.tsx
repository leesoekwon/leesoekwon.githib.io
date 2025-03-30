"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Post } from "../types/Post";

interface BoardTemplateProps {
  posts: Post[];
}

const computeRelativeTime = (time: string) => {
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

const BoardTemplate: React.FC<BoardTemplateProps> = ({ posts }) => {
  const pathname = usePathname();

  // 정렬: isNotice가 true인 게시물을 우선, 그 후 id 내림차순 정렬
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (a.isNotice && !b.isNotice) return -1;
      if (b.isNotice && !a.isNotice) return 1;
      return b.id - a.id;
    });
  }, [posts]);

  // 창 너비 감지
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 테이블 컨테이너 스타일: 창 너비에 따라 다르게 적용
  const tableContainerStyle: React.CSSProperties =
    windowWidth >= 450
      ? {
          marginTop: "132px",
          marginBottom: "54px",
          width: "100%",
          maxWidth: "480px",
          marginLeft: "auto",
          marginRight: "auto",
          borderCollapse: "collapse",
        }
      : {
          marginTop: "54px",
          marginBottom: "62px",
          width: "100%",
          maxWidth: "450px",
          borderCollapse: "collapse",
          marginLeft: "3px",
        };

  // 제목 열의 width를 상태로 관리 (초기값은 230px)
  const [titleWidth, setTitleWidth] = useState("230px");

  // 테이블에 ref를 부여하여 너비 측정
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      // 테이블의 실제 너비에서 160px을 뺀 값을 제목 열 너비로 설정
      const tableWidth = tableRef.current.clientWidth;
      const newWidth = tableWidth - 120;
      setTitleWidth(newWidth + "px");
    }
  }, [windowWidth]);

  return (
    <table ref={tableRef} style={tableContainerStyle} className="timeText">
      <tbody>
        {sortedPosts.map((post) => {
          const createdTime = new Date(post.createdAt);
          const now = new Date();
          const diffMs = now.getTime() - createdTime.getTime();
          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const isRecent = diffDays < 3;
          const relativeTime = computeRelativeTime(post.createdAt);
          const linkHref = `${pathname.replace(/\/$/, "")}/${post.id}`;

          return (
            <tr key={post.id} style={{ borderBottom: "1px solid #f0f0f0", height: "45px" }}>
              {/* 공지/새 글 아이콘 */}
              <td
                style={{
                  position: "relative",
                  width: "10px",
                  height: "10px",
                  padding: "0px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {post.isNotice && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "#FFD175",
                        marginRight: isRecent ? "-3px" : "0",
                      }}
                      title="공지"
                    />
                  )}
                  {isRecent && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "#FF695A",
                      }}
                      title="새 글"
                    />
                  )}
                </div>
              </td>
              {/* 게시글 번호 */}
              <td
                style={{
                  padding: "0px",
                  fontSize: "13.5px",
                  fontWeight: "550",
                  letterSpacing: "-.2px",
                  wordSpacing: "-.5px",
                  width: "41px",
                  textAlign: "center",
                }}
              >
                {post.isNotice ? "-" : post.id}
              </td>
              {/* 게시글 제목 */}
              <td style={{ padding: "0px" }}>
                <Link
                  href={linkHref}
                  style={{
                    textDecoration: "none",
                    color: "#6d6a65",
                    fontSize: "15px",
                    padding: "4px",
                    display: "block",
                    fontWeight: post.isNotice ? "600" : "400",
                    width: titleWidth, // 계산된 너비 적용
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.title}
                </Link>
              </td>
              {/* 작성 시간 */}
              <td
                style={{
                  padding: "2px",
                  fontSize: "13.5px",
                  letterSpacing: "-.2px",
                  wordSpacing: "-.5px",
                  width: "40px",
                  textAlign: "left",
                }}
              >
                {relativeTime}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BoardTemplate;
