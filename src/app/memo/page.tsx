// memo/page.tsx

import React from 'react';
import BoardTemplate from '../components/BoardTemplate';
import { posts } from '../../data/memoData';

const BoardPage: React.FC = () => {
  return (
    <div >
      <BoardTemplate posts={posts} />
    </div>
  );
};

export default BoardPage;
