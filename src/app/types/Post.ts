// /types/Post.ts

export interface Post {
    id: number;         // 게시글 번호
    title: string;      // 게시글 제목
    createdAt: string;  // 작성일 (예: "2023-03-25" 등)
    isNotice: boolean;  // 공지 여부
    views: number;      // 조회수
    content: string;    // 본문 (HTML 코드)
  }
  