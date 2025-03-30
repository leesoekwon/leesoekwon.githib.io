import "./globals.css";
import FixedBarsLayout from "./components/FixedBarsLayout"; // 위에서 만든 파일
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "leesoekwon.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        <FixedBarsLayout>
          <div style={{ padding: "24px" }}>{children}</div>
        </FixedBarsLayout>
      </body>
    </html>
  );
}
