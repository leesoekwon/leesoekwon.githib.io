// config/menuItems.ts

const items = [
    { label: "개요", href: "/overview" },
    { label: "목표", href: "/goals" },
    { label: "고민", href: "/challenges" },
    { label: "일기", href: "/diary" },
    { label: "메모장", href: "/memo" },
    { label: "영상", href: "/films" },
    { label: "알림", href: "/notice" },
    { label: "자료실", href: "/board" },
  ];
  
  export const mainMenuItems = items.map((item, index) => ({
    ...item,
    number: (index + 1).toString().padStart(2, "0"),
  }));