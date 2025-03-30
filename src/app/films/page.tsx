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
          가끔씩 스튜디오 라이브와 작업 스케치등이 담긴 영상이 오르는 곳입니다.
          아직 준비중입니다.
        </p>
      </div>
    </div>
  );
}
