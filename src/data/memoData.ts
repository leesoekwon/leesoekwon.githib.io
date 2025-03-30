// /data/data.ts

import { Post } from '../app/types/Post';

const rawPosts: Omit<Post, "id">[] = [
  {
    title: '프로듀서 찾아 삼만리',
    createdAt: '2025-03-29 12:00', // 예시 날짜
    isNotice: true,
    views: 120,           
    content: '<p>내용을 준비 중입니다.</p>',
  },
  {
    title: '콘서트 안내 2013년의 시간',
    createdAt: '2025-03-29 02:00',
    isNotice: false,
    views: 95,
    content: '<p>목차 꼴을 보기 위한 샘플 텍스트입니다.</p>',
  },
  
  {
    title: '영화와 음악이 함께하는 시간은 어떻게 즐길 수 있을까요? 저도 잘 모르겠습니다만 해봅시다.',
    createdAt: '2025-03-20 12:49',
    isNotice: false,
    views: 80,
    content: ` <p>
    목차 꼴을 보기 위한 샘플 텍스트입니다.
    <br>
        모든 것은 언젠가 매니저한테서 걸려온 한 통의 전화로부터 비롯되었다.
        전에 냈던 앨범을 엘피로 재발매하자길래 정중히 거절한 뒤 전화를 끊으려는데
        매니저가 말했다.
      </p>
            <br>

      <p>오빠. 근데 조금 있으면 1집 나온 지 30년 되는 거 아세요?</p>
      <p>30년? 벌써 세월이 그렇게 흘렀나?</p>
            <br>

      <p>
        처음엔 앨범 데뷔 30주년이라는 사실에 그다지 큰 감흥은 없었다. 다만 시간이 갈수록
        그때로 돌아가보고 싶다는 생각이 점점 더 강하게 들었는데 이는 내가 처한 현실 때문이었을 것이다.
        현재 나이 55살. 늙고 병든 부모님을 돌보다 지쳐 집으로 돌아오면 곡이 써지기는커녕 사소한 제목 하나 짓지 못해
        쩔쩔매는, 이제는 수명이 다해가는 늙은 창작자 하나가 거울 속에서 나를 보고 서 있었으니...
      </p>
            <br>

      <p>
        이 일은 그렇게 시작되었다. </p>     <br>
        <p>
 언제부턴가 절대로 하지 않던 후회를 하고 툭하면 옛일을 생각하며 추억에 잠기는
        늙어버린 나를 견딜 수 없어서.<br>
        </p>
        <p> 할 수만 있다면 삼십년 전 그때로 돌아가 생을 두 번 살고 싶어서.
      </p>
            <br>

    </section>
<br>

    <section>
      <h2><u>프로젝트 개요 ver 2.<br> (좀 더 구체적이면서도 구성진 버전)</u></h2><br>
      <p>
        저는 지금 30년 전으로 돌아가본다는 일종의 시간 여행 프로젝트를 실행하려 하는데 이는 현실에 기인한 바가 큽니다.
        만약 지금의 내가 창작자로서 수명이 다해가는 늙고 무기력한 처지가 아니었다면 데뷔 30주년을 이런 식으로 보내지는 않았을지도 모릅니다.
        이것보다는 훨씬 느긋하게 하나의 추억으로써 30년 전을 회고하고 또 축하할 수 있었겠죠.

        그러나 불행히도 삶과 일 모든 면에서 지치고 늙고 병들어 있을 때 앨범 데뷔 30주년이라는 얘기를 들었고 그래서인지
        저는 기념이나 축하를 하기보다는 그때로 한 번 돌아가보고 싶다는 강렬한 욕구를 느꼈습니다. 어느새 나이 55살.
        지금의 나는 곡은커녕 제목 하나 짓는데도 쩔쩔매는 신세가 되었지만 스물 다섯의 저는 어땠습니까?

        그때의 나는 비록 주 2회씩 대학로에 있는 병원으로 신경 정신과 치료를 받으러 다니면서도 직접 고른 앨범들을 파는
        레코드 가게를 했고, 홀로 음악 감상 모임을 만들어서 이끌었고, 신문에 내 이름을 걸고 칼럼을 고정 연재했으며
        음악 잡지의 기자로 일하다 아예 내가 발행인이 되어 직접 잡지사를 차렸으며 끝내는 나의 밴드를 만들어서 프로 뮤지션으로서
        음악 활동을 시작했습니다. 그렇게 30년 전의 나는 누구보다 실천적인 사람이었고 항상 뭔가 하는 사람이었으며 해야만 하는 사람이었는데
        지금의 나는 어쩌다 이렇게 무기력한 존재로 하루하루를 보내게 된 것인지.

        이렇듯 나이 먹은 자의 벗어던질 수 없는 숙명과도 같은 현실을 견딜 수 없었던 저는 고민 끝에 지금부터 2년에 걸쳐서 한번 30년 전
        그때로 돌아가보자는 구상을 하게 되었습니다.
      </p>
      <br>
      <p>
        그때 했듯이 레코드 가게도 다시 해보고, 그때 했듯이 음악 감상회도 다시 열어보고, 무엇보다 그때 그랬듯이 새로운 음악을 만들어서 새로이 첫 앨범을
        발표하는 2년짜리 프로젝트를요.
      </p> <p>
        모든 것은 언젠가 매니저한테서 걸려온 한 통의 전화로부터 비롯되었다.
        전에 냈던 앨범을 엘피로 재발매하자길래 정중히 거절한 뒤 전화를 끊으려는데
        매니저가 말했다.
      </p>
            <br>

      <p>오빠. 근데 조금 있으면 1집 나온 지 30년 되는 거 아세요?</p>
      <p>30년? 벌써 세월이 그렇게 흘렀나?</p>
            <br>

      <p>
        처음엔 앨범 데뷔 30주년이라는 사실에 그다지 큰 감흥은 없었다. 다만 시간이 갈수록
        그때로 돌아가보고 싶다는 생각이 점점 더 강하게 들었는데 이는 내가 처한 현실 때문이었을 것이다.
        현재 나이 55살. 늙고 병든 부모님을 돌보다 지쳐 집으로 돌아오면 곡이 써지기는커녕 사소한 제목 하나 짓지 못해
        쩔쩔매는, 이제는 수명이 다해가는 늙은 창작자 하나가 거울 속에서 나를 보고 서 있었으니...
      </p>
            <br>

      <p>
        이 일은 그렇게 시작되었다. </p>     <br>
        <p>
 언제부턴가 절대로 하지 않던 후회를 하고 툭하면 옛일을 생각하며 추억에 잠기는
        늙어버린 나를 견딜 수 없어서.<br>
        </p>
        <p> 할 수만 있다면 삼십년 전 그때로 돌아가 생을 두 번 살고 싶어서.
      </p>
            <br>

    </section>
<br>

    <section>
      <h2><u>프로젝트 개요 ver 2.<br> (좀 더 구체적이면서도 구성진 버전)</u></h2><br>
      <p>
        저는 지금 30년 전으로 돌아가본다는 일종의 시간 여행 프로젝트를 실행하려 하는데 이는 현실에 기인한 바가 큽니다.
        만약 지금의 내가 창작자로서 수명이 다해가는 늙고 무기력한 처지가 아니었다면 데뷔 30주년을 이런 식으로 보내지는 않았을지도 모릅니다.
        이것보다는 훨씬 느긋하게 하나의 추억으로써 30년 전을 회고하고 또 축하할 수 있었겠죠.

        그러나 불행히도 삶과 일 모든 면에서 지치고 늙고 병들어 있을 때 앨범 데뷔 30주년이라는 얘기를 들었고 그래서인지
        저는 기념이나 축하를 하기보다는 그때로 한 번 돌아가보고 싶다는 강렬한 욕구를 느꼈습니다. 어느새 나이 55살.
        지금의 나는 곡은커녕 제목 하나 짓는데도 쩔쩔매는 신세가 되었지만 스물 다섯의 저는 어땠습니까?

        그때의 나는 비록 주 2회씩 대학로에 있는 병원으로 신경 정신과 치료를 받으러 다니면서도 직접 고른 앨범들을 파는
        레코드 가게를 했고, 홀로 음악 감상 모임을 만들어서 이끌었고, 신문에 내 이름을 걸고 칼럼을 고정 연재했으며
        음악 잡지의 기자로 일하다 아예 내가 발행인이 되어 직접 잡지사를 차렸으며 끝내는 나의 밴드를 만들어서 프로 뮤지션으로서
        음악 활동을 시작했습니다. 그렇게 30년 전의 나는 누구보다 실천적인 사람이었고 항상 뭔가 하는 사람이었으며 해야만 하는 사람이었는데
        지금의 나는 어쩌다 이렇게 무기력한 존재로 하루하루를 보내게 된 것인지.

        이렇듯 나이 먹은 자의 벗어던질 수 없는 숙명과도 같은 현실을 견딜 수 없었던 저는 고민 끝에 지금부터 2년에 걸쳐서 한번 30년 전
        그때로 돌아가보자는 구상을 하게 되었습니다.
      </p>
      <br>
      <p>
        그때 했듯이 레코드 가게도 다시 해보고, 그때 했듯이 음악 감상회도 다시 열어보고, 무엇보다 그때 그랬듯이 새로운 음악을 만들어서 새로이 첫 앨범을
        발표하는 2년짜리 프로젝트를요.
      </p>`,
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

// 1. isNotice=false인 게시물을 createdAt 기준 오름차순으로 정렬 후 id 부여
const nonNoticePosts = rawPosts
  .filter((entry) => !entry.isNotice)
  .sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  .map((entry, index) => ({
    ...entry,
    // 나중에 isNotice=true 게시물의 개수 이후 번호부터 부여할 예정
    id: index + 1,
  }));

// 2. isNotice=true인 게시물을 createdAt 기준 오름차순으로 정렬 후 id 부여
const noticePosts = rawPosts
  .filter((entry) => entry.isNotice)
  .sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
  .map((entry, index) => ({
    ...entry,
    id: nonNoticePosts.length + index + 1,
  }));

// 최종 배열: 공지글이 상단(앞쪽)에 위치하도록 결합
export const posts: Post[] = [...noticePosts, ...nonNoticePosts];

// posts 배열에서 최대 id 값을 계산하여 export
export const maxMemoId = Math.max(...posts.map((post) => post.id));
