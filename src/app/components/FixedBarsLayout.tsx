"use client";

import { useEffect, useState } from "react";
import { HorizontalMenu } from "./HorizontalMenu";
import { HomeBar } from "./HomeBar";
import { mainMenuItems } from "../config/menuItems";

export default function FixedBarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // 스크롤 내리면 숨기고, 올리면 보이게
      if (currentScroll > lastScrollY && currentScroll > 50) {
        setHidden(true);
      } else if (currentScroll < lastScrollY) {
        setHidden(false);
      }
      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 전체 화면 터치 시에도 hidden 상태를 false로 전환
  const handleScreenClick = () => {
    setHidden(false);
  };

  return (
    <div onClick={handleScreenClick}>
      <HorizontalMenu items={mainMenuItems} hidden={hidden} />
      <div>{children}</div>
      <HomeBar hidden={hidden} />
    </div>
  );
}
