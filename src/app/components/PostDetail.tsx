"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Post } from "../types/Post";

interface PostDetailProps {
  data: Post[];      // memoData, noticeData 등 배열
  id: string;        // URL 파라미터
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

const PostDetail: React.FC<PostDetailProps> = ({ data, id }) => {
  const postId = Number(id);
  const post = data.find((item) => item.id === postId);
  if (!post) {
    notFound();
  }

  const relativeTime = computeRelativeTime(post.createdAt);

  // 창 너비 감지
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 창 너비가 450px 이상이면 상단 여백 140px, 좌우 중앙 정렬, 최대 너비 450px
  const containerStyle: React.CSSProperties =
    windowWidth >= 450
      ? {
          maxWidth: "450px",
          margin: "138px auto 56px",
          boxSizing: "border-box",
        }
      : {
          maxWidth: "450px",
          margin: "56px 0",
          boxSizing: "border-box",
        };

  return (
    <div style={containerStyle}>
      <h1
        style={{
          fontSize: "20.2px",
          fontWeight: "550",
          marginBottom: "2px",
          lineHeight: "27px",
        }}
      >
        {post.title}
      </h1>
      <div
        className="timeText"
        style={{
          fontSize: "15.5px",
          marginBottom: "15px",
          letterSpacing: "0px",
          wordSpacing: "-1px",
        }}
      >
        <span>{relativeTime}</span>
        <span style={{ margin: "0 6px" }}></span>
        <span>조회수 {post.views}</span>
      </div>
      <div
        className="bodyText"
        style={{ lineHeight: "1.6", fontSize: "17px", color: "#6d6a65" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostDetail;
