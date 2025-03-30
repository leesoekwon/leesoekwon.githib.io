"use client";

import React, { useEffect, useState } from "react";

export default function Films() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle: React.CSSProperties =
    windowWidth >= 450
      ? {
          margin: "130px auto 62px", // top: 58px, bottom: 62px, 좌우 auto (중앙 배치)
          width: "100%",
          maxWidth: "480px",
          textAlign: "center" 
        }
      : {
          marginTop: "58px",
          marginBottom: "62px",
        };

  return (
    <div style={containerStyle}>
      <div className="fixed-text-content bodyText"style={{ }} >
        <u>안내</u>
        <br />
        <br />
        <p style={{ fontSize: "17px" }}>
        30년 전 그 시절을 추억할 수 있는 여러 자료들을 보관하는 곳입니다. 
<br></br>
오래 전 사진, 당시 합주 녹음 기록, 개인적으로 곡 작업하는 과정을 스케치한 각종 기록들, 비밀리에 감행했던 클럽 공연의 흔적 등 소중한 기록들을 

선보일 예정입니다. 
        </p>
      </div>
    </div>
  );
}
