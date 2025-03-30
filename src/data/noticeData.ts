// /data/data.ts

import { Post } from '../app/types/Post';

const rawPosts: Omit<Post, "id">[] = [
  {
    title: '[공지] 새로운 음악회를 개최하며',
    createdAt: '2025-03-25 12:00', // 예시 날짜
    isNotice: true,
    views: 120,           
    content: '<p>새로운 음악회 소식입니다.</p>',
  },
  {
    title: '콘서트 안내 2013년의 시간',
    createdAt: '2025-03-26 2:00',
    isNotice: false,
    views: 95,
    content: '<p>콘서트 관련 안내 내용입니다.</p>',
  },
  {
    title: '영화와 음악이 함께하는 시간',
    createdAt: '2025-03-20 12:49',
    isNotice: false,
    views: 80,
    content: '<p>영화와 음악이 어우러진 이벤트입니다.</p>',
  },
  {
    title: '[공지]영화와 음악이 함께하는23 시간',
    createdAt: '2025-03-20 12:49',
    isNotice: true,
    views: 80,
    content: '<p>영화와 음악이 어ㅁㄴㅇㅎㅁㅇ노 우러진 이벤트입니다.</p>',
  },
  {
    title: '영화와 음악이 함께하는 시간',
    createdAt: '2025-03-20 21:29',
    isNotice: false,
    views: 80,
    content: `
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nibh vitae dolor ultrices semper. Sed auctor, turpis sit amet fermentum consequat, sapien turpis feugiat ex, vitae dapibus ipsum sapien vel nisi. Nam vitae ipsum et metus finibus ultricies. Fusce consequat, nibh at consectetur tincidunt, augue lectus imperdiet ipsum, ac fermentum dui augue non erat.
      </p>
      <h2>Section 1: Introduction</h2>
      <p>
        Integer in ex a risus tincidunt aliquam. Donec euismod eros sed purus cursus, a feugiat orci dictum. Nam sollicitudin, lectus ut tincidunt blandit, massa lorem facilisis lorem, non facilisis risus dui eget justo. Sed sed consequat odio. Curabitur fermentum nulla non sem condimentum, nec ultricies dui ultrices.
      </p>
      <h3>Subsection: Background</h3>
      <p>
        Cras scelerisque, sapien vel feugiat condimentum, lacus urna suscipit nunc, in fermentum sapien ligula vitae eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed at sollicitudin lectus. Nam ac turpis vitae dui dignissim faucibus.
      </p>
      <ul>
        <li>Point One: Donec vel tortor non dui dictum posuere.</li>
        <li>Point Two: Mauris scelerisque neque vitae lorem accumsan, in fermentum orci egestas.</li>
        <li>Point Three: Nulla facilisi. Integer commodo sem a elit varius, a scelerisque justo consequat.</li>
      </ul>
      <p>
        Vestibulum at semper elit. Vivamus sit amet cursus neque. Proin vitae tristique magna. Duis eu lectus ut odio vehicula fringilla. Suspendisse potenti. Sed pretium, justo sed eleifend tincidunt, lectus neque ultricies leo, in maximus sapien magna et risus.
      </p>
      <h2>Section 2: Detailed Analysis</h2>
      <p>
        Quisque sit amet ante nec urna interdum bibendum non sit amet nisi. Phasellus malesuada, justo ac interdum placerat, risus neque porta ligula, non gravida justo libero sed nibh. Aenean luctus, lectus in porta dignissim, odio erat tristique urna, sed tincidunt libero lectus ac sapien.
      </p>
      <ol>
        <li>
          <strong>Observation 1:</strong> Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada.
        </li>
        <li>
          <strong>Observation 2:</strong> Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada.
        </li>
        <li>
          <strong>Observation 3:</strong> Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
        </li>
      </ol>
      <p>
        Aliquam erat volutpat. Praesent suscipit, sapien at dapibus imperdiet, magna nulla dapibus sapien, ac fringilla arcu quam a odio. In at consequat erat. Cras et dolor nec nisi malesuada placerat.
      </p>
      <blockquote>
        <p>
          "This is a sample quote that provides additional insight into the subject matter. It can be used to emphasize important points or opinions."
        </p>
      </blockquote>
      <p>
        Mauris in lectus eu massa tincidunt ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
      </p>
      <p>
        In conclusion, the above content provides a comprehensive overview of the topic. Sed porttitor lectus nibh, vitae blandit sapien interdum ac. Ut in nulla enim. Donec sollicitudin molestie malesuada.
      </p>
    `,
  },
];

// 1. isNotice=false인 게시물을 createdAt 기준 오름차순으로 정렬
const nonNoticePosts = rawPosts
  .filter((entry) => !entry.isNotice)
  .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  .map((entry, index) => ({
    ...entry,
    // 나중에 isNotice=true 게시물의 개수 이후 번호부터 부여할 예정
    id: index + 1,
  }));

// 2. isNotice=true인 게시물을 createdAt 기준 오름차순으로 정렬
const noticePosts = rawPosts
  .filter((entry) => entry.isNotice)
  .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  .map((entry, index) => ({
    ...entry,
    id: nonNoticePosts.length + index + 1,
  }));

// 최종 배열: 공지글이 상단(앞쪽)에 위치하도록 결합
export const posts: Post[] = [...noticePosts, ...nonNoticePosts];
export const maxNoticeId = Math.max(...posts.map((post) => post.id));
