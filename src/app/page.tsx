"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { IndexBlock } from "./components/indexBlock";
import { mainMenuItems } from "./config/menuItems";

export default function Page() {
    const router = useRouter();
  

  const searchParams = useSearchParams();
  // 초기 렌더링 시 skip 파라미터가 "4"면 바로 phase 4로 설정
  const initialPhase = searchParams.get("skip") === "4" ? 4 : 0;
  const [phase, setPhase] = useState(initialPhase);
  const [fastTransition, setFastTransition] = useState(false);
  const [tocAnimate, setTocAnimate] = useState(false);
  const timerRef = useRef<number | null>(null);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth >= 450 && window.innerHeight >= 700) {
        setIsLargeScreen(true);
      } else {
        setIsLargeScreen(false);
      }
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const phaseDelays = [100, 3400, 3500, 2000];

  // phase가 이미 4라면 타이머를 설정하지 않습니다.
  useEffect(() => {
    if (phase < 4) {
      timerRef.current = window.setTimeout(() => {
        setPhase((prev) => prev + 1);
      }, phaseDelays[phase]);
    }
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase >= 4) {
      const timer = setTimeout(() => {
        setTocAnimate(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleSkip = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setFastTransition(true);
    setPhase((prev) => (prev < 4 ? prev + 1 : prev));
  };

  useEffect(() => {
    if (!fastTransition) return;
    const resetTimer = window.setTimeout(() => setFastTransition(false), 0);
    return () => clearTimeout(resetTimer);
  }, [fastTransition]);

  const transitionDuration = fastTransition ? "0.6s" : "2s";
  const commonTransition = `opacity ${transitionDuration} ease-in-out, filter ${transitionDuration} ease-in-out`;
  const tocTransition = `opacity 1s ease-in-out, transform 1s ease-in-out`;

  // phase에 따른 상태 설정
  const text1Opacity = phase === 1 ? 1 : 0;
  const text2Opacity = phase === 2 ? 1 : 0;
  const imageOpacity = phase === 0 ? 0 : phase < 3 ? 1 : 0;
  const headerOpacity = phase === 0 ? 0 : 1;
  const showToc = phase >= 4;
  const paddingNum = "20px";

  const textStyle = (opacity: number) => ({
    position: "absolute" as const,
    width: "100%",
    transition: commonTransition,
    opacity,
    filter: opacity === 0 ? "blur(2px)" : "none",
    lineHeight: "1.68em",
    whiteSpace: "pre-line" as const,
  });

  const [showModal, setShowModal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const openModal = () => setShowModal(true);
  useEffect(() => {
    if (showModal) setTimeout(() => setFadeIn(true), 0);
  }, [showModal]);

  const closeModal = () => {
    setFadeIn(false);
    setTimeout(() => setShowModal(false), 500);
  };

  return (
    <main
      onClick={handleSkip}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
    >
      {isLargeScreen ? (
        // 큰 화면일 때: header, 이미지-텍스트, 목차를 그룹화
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* 헤더 */}
          <header
  style={{ margin: paddingNum, 
    marginTop: isLargeScreen ?  "-60px":"0",
    paddingBottom: "35px" }}
  className="min-[450px]:flex min-[450px]:justify-center"
>
  <h1 onClick={() => router.push("/?skip=4")}
    style={{ paddingLeft: isLargeScreen ? "0px" : "3px" }}
    className="tracking-[0.05em] text-[17.5px] text-[#505050] font-[430] mt-0">
    leesoukwon.com
  </h1>
</header>

          {/* 이미지 + 텍스트 */}
         <section
  style={{
    position: "relative",
    textAlign: "center",
    width: "100%",
    marginBottom: "20px",
    // 큰 화면일 경우 고정 높이와 flex 레이아웃 적용
    height: isLargeScreen ? "475px" : "auto",
    display: showToc ? "none" : (isLargeScreen ? "flex" : "block"),

    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  }}
>
  {/* 이미지 영역 */}
  <div
    style={{
      // 큰 화면일 경우, 문서 흐름에 따라 상대적으로 배치
      // 작은 화면일 경우, 기존처럼 절대 위치 적용
      position: isLargeScreen ? "relative" : "absolute",
      top: isLargeScreen ? undefined : 0,
      left: isLargeScreen ? undefined : "50%",
      transform: isLargeScreen ? "none" : "translateX(-50%)",
      transition: commonTransition,
      opacity: imageOpacity,
      filter: imageOpacity === 0 ? "blur(2px)" : "none",
      display: showToc ? "none" : "block",
      padding: paddingNum,
      paddingTop: 0,
      paddingBottom: isLargeScreen ? "60px" : "0px",

      maxWidth: "450px",
      width: "100%",
    }}
  >
    <Image
      src="/cover_1.png"
      alt="cover"
      width={390}
      height={222}
      layout="responsive"
    />
  </div>

  {/* 텍스트 영역 */}
  <div
    style={{
      // 큰 화면일 경우, relative로 자연스럽게 아래쪽에 배치
      // 작은 화면일 경우, 기존처럼 절대 위치 및 하단에서 130px 떨어지도록
      position: isLargeScreen ? "relative" : "absolute",
      marginTop: isLargeScreen ? "20px" : undefined,
      bottom: isLargeScreen ? undefined : "130px",
      left: isLargeScreen ? "0" : "50%",
      transform: isLargeScreen ? "none" : "translateX(-50%)",
      width: "450px",
      fontSize: "20px",
      height: "6em",
    }}
  >
    <div style={{ ...textStyle(text1Opacity), bottom: 0 }}>
      {"후회도\n그리움도\n기념도 아닌\n마음으로"}
    </div>
    <div style={{ ...textStyle(text2Opacity), bottom: 0 }}>
      {"떠나는\n시간여행\n\n1995~1996"}
    </div>
  </div>
</section>

          {/* 목차 */}
          {showToc && (
            <nav
              className="w-full max-w-[450px]"
              style={{
                padding: paddingNum,
                transition: tocTransition,
                opacity: tocAnimate ? 1 : 0,
                transform: tocAnimate
                  ? "translateX(0) translateY(0)"
                  : "translateX(0) translateY(50px)",
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                style={{
                  display: "inline-block",
                  backgroundColor: "#F3F3F3",
                  border: "1px solid #EFEDED",
                  borderRadius: "1.2px",
                  padding: "2px 10px",
                  fontSize: "16.5px",
                  fontWeight: "500",
                  letterSpacing: "0.03rem",
                  marginBottom: "13px",
                  cursor: "pointer",
                }}
              >
                주의사항
              </div>
              <div className="grid grid-cols-2 gap-[14px]">
                {mainMenuItems.map((item) => (
                  <IndexBlock
                    key={item.number}
                    title={item.label}
                    number={item.number}
                    href={item.href}
                  />
                ))}
              </div>
            </nav>
          )}
        </div>
      ) : (
        // 작은 화면일 때: 기존 레이아웃 유지
        <>
          <header
            style={{ margin: paddingNum }}
            className="min-[450px]:flex min-[450px]:justify-center"
          >
            <h1
              className="tracking-[0.05em] text-[17.5px] pl-[3px] text-[#505050] font-[430] mt-0"
            >
              leesoukwon.com
            </h1>
          </header>


        <div>
          <section style={{ position: "relative", textAlign: "center", width: "100%" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                transition: commonTransition,
                opacity: imageOpacity,
                filter: imageOpacity === 0 ? "blur(2px)" : "none",
                display: showToc ? "none" : "block",
                padding: paddingNum,
                paddingTop: 0,
                maxWidth: "450px",
                width: "100%",
              }}
            >
              <Image
                src="/cover_1.png"
                alt="cover"
                width={390}
                height={222}
                layout="responsive"
              />
            </div>
            <div
              style={{
                position: "fixed",
                left: "50%",
                bottom: "120px",
                transform: "translateX(-50%)",
                width: "450px",
                fontSize: "20px",
                color: "555555",
                height: "6em",
              }}
            >
              <div style={{ ...textStyle(text1Opacity), bottom: 0 }}>
                {"후회도\n그리움도\n기념도 아닌\n마음으로"}
              </div>
              <div style={{ ...textStyle(text2Opacity), bottom: 0 }}>
                {"떠나는\n시간여행\n\n1995~1996"}
              </div>
            </div>
          </section>

          {showToc && (
            <nav
              className="absolute bottom-0 left-1/2 w-full max-w-[450px]"
              style={{
                padding: paddingNum,
                transition: tocTransition,
                opacity: tocAnimate ? 1 : 0,
                transform: tocAnimate
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(50px)",
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                style={{
                  display: "inline-block",
                  backgroundColor: "#F3F3F3",
                  border: "1px solid #EFEDED",
                  borderRadius: "1.2px",
                  padding: "2px 10px",
                  fontSize: "16.5px",
                  fontWeight: "500",
                  letterSpacing: "0.03rem",
                  marginBottom: "13px",
                  cursor: "pointer",
                }}
              >
                주의사항
              </div>
              <div className="grid grid-cols-2 gap-[14px]">
                {mainMenuItems.map((item) => (
                  <IndexBlock
                    key={item.number}
                    title={item.label}
                    number={item.number}
                    href={item.href}
                  />
                ))}
              </div>
            </nav>
          )}
          </div>
        </>
      )}

      {/* 모달 관련 코드는 그대로 */}
      {showModal && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.93)",
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 0.45s ease",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems:
              typeof window !== "undefined" && window.innerWidth >= 450
                ? "center"
                : "flex-start",
            paddingTop:
              typeof window !== "undefined" && window.innerWidth < 450
                ? "30px"
                : "0",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: paddingNum,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              style={
                typeof window !== "undefined" && window.innerWidth >= 450
                  ? {
                      position: "absolute",
                      top: "0px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      cursor: "pointer",
                    }
                  : {
                      position: "absolute",
                      top: "0px",
                      right: paddingNum,
                      cursor: "pointer",
                    }
              }
            >
              <Image src="/x.svg" alt="Close" width={24} height={24} />
            </div>
            <div
              style={{
                marginTop: "42px",
                fontSize: "20px",
                lineHeight: "1.8rem",
              }}
            >
              <p style={{ marginBottom: "1.6em" }}>
                1. 본 시간 여행 프로젝트는 언니네 이발관 재 결성과는 관계가 없습니다.
              </p>
              <p style={{ marginBottom: "1.6em" }}>
                2. 본 홈페이지의 모든 내용(일기 포함)은 언제든 몇 번이든 수정 혹은 삭제될 수 있습니다.
              </p>
              <p style={{ marginBottom: "1.6em" }}>
                3. 본 프로젝트는 최종 단계에서 약간의 연기 가능성이 있습니다. - (나이, 건강, 집안 사정 등 여러 예상 가능, 불가능의 이유로) 창작자가 원하는 수준의 작품(곡)이 나오지 않을 경우.
              </p>
              <p style={{ marginBottom: "1.6em" }}>
                4. 라이브 활동 여부는 아직 결정하지 못했습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
