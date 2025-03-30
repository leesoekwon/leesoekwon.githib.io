"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MenuItem {
  label: string;
  href: string;
}

interface HorizontalMenuProps {
  items: MenuItem[];
  hidden: boolean;
}

export function HorizontalMenu({ items, hidden }: HorizontalMenuProps) {
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

  const isWide = windowWidth >= 526;

  // 화면 너비가 526px 이상이면 고정된 너비(예:526px)로 중앙에 배치
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    paddingTop: "26px",
    left: isWide ? "50%" : 0,
    width: isWide ? "526px" : "100%",
    overflowX: "scroll",
    msOverflowStyle: "none",
    background: "#fff",
    scrollbarWidth: "none",
    transition: "transform .6s ease",
    // isWide인 경우 가로 중앙 정렬을 위해 translateX(-50%)를 추가
    transform: isWide
      ? hidden
        ? "translate(-50%, -120px)"
        : "translate(-50%, 0)"
      : hidden
      ? "translateY(-100px)"
      : "translateY(0)",
    zIndex: 1000,
  };

  const listStyle: React.CSSProperties = {
    display: "flex",
    listStyle: "none",
    whiteSpace: "nowrap",
    margin: 0,
    padding: 0,
  };

  // pathname이 "/"일 때는 아무것도 렌더링하지 않도록 조건부 처리
  if (pathname === "/") {
    return null;
  }

  return (
    <div style={containerStyle}>
      {windowWidth >= 450 && (
        <Link href="/?skip=4">
          <header style={{ textAlign: "center", width: "100%", margin: "20px 0 14px 0", cursor: "pointer" }}>
            <h1
              className="tracking-[0.05em] text-[17.5px] pl-[3px] text-[#505050] font-[430] mt-0"
            >
              leesoukwon.com
            </h1>
          </header>
        </Link>
      )}
      <ul style={listStyle}>
        {/* 왼쪽 스페이서 */}
        <li style={{ minWidth: "21px" }} />
        {items.map((item) => {
          // pathname이 item.href로 시작하면 active 상태로 간주
          const isActive = pathname.startsWith(item.href);
          const linkStyle: React.CSSProperties = {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: isActive
              ? "1.6px 28px 1.6px 7.3px"
              : "1.6px 7.5px 1.6px 7.5px",
            borderRadius: "1.6px",
            cursor: "pointer",
            fontSize: "17.8px",
            letterSpacing: ".7px",
            fontWeight: isActive ? 600 : 450,
            transition: "all 0.4s cubic-bezier(0.2, 1, 0.8, 1)",
            backgroundColor: isActive ? "#E7E4DC" : "#F3F3F3",
            color: isActive ? "#6d6a65" : "#B1B1B1",
            border: isActive ? "1px solid #E6E6E6" : "1px solid #EFEDED",
          };

          return (
            <li key={item.href} style={{ marginRight: "6px" }}>
              <Link href={item.href} style={linkStyle}>
                {item.label}
              </Link>
            </li>
          );
        })}
        {/* 오른쪽 스페이서 */}
        <li style={{ minWidth: "18px" }} />
      </ul>
    </div>
  );
}
