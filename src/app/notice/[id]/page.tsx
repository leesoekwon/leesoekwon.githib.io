// /notice/[id]/page.tsx
import React from 'react';
import PostDetail from '../../components/PostDetail';
import { posts } from '@/data/noticeData'; // NoticeData import

interface NoticeDetailPageProps {
  params: {
    id: string;
  };
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  return <PostDetail data={posts} id={params.id} />;
}
