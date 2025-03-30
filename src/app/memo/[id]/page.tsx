// /memo/[id]/page.tsx
import React from 'react';
import PostDetail from '../../components/PostDetail';
import { posts } from '@/data/memoData'; // memoData import

interface MemoDetailPageProps {
  params: {
    id: string;
  };
}

export default function MemoDetailPage({ params }: MemoDetailPageProps) {
  return <PostDetail data={posts} id={params.id} />;
}
