const TEMPLATES = [
  {
    id: 'car',
    name: '자동차',
    emoji: '🚗',
    svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <!-- 차체 -->
      <path d="M60,200 L60,160 L120,100 L280,100 L340,160 L340,200 Z" fill="#ffffff" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- 앞유리 -->
      <path d="M130,105 L190,105 L190,155 L115,155 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 뒷유리 -->
      <path d="M210,105 L270,105 L285,155 L210,155 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 하부 -->
      <rect x="40" y="200" width="320" height="30" rx="5" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <!-- 앞바퀴 -->
      <circle cx="120" cy="235" r="30" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <circle cx="120" cy="235" r="15" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 뒷바퀴 -->
      <circle cx="280" cy="235" r="30" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <circle cx="280" cy="235" r="15" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 헤드라이트 -->
      <rect x="335" y="165" width="20" height="15" rx="3" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 테일라이트 -->
      <rect x="45" y="165" width="15" height="15" rx="3" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 문 손잡이 -->
      <rect x="195" y="140" width="20" height="5" rx="2" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 범퍼 -->
      <path d="M40,230 L40,215 Q40,200 55,200 L90,200 L90,230 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <path d="M310,200 L345,200 Q360,200 360,215 L360,230 L310,230 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'robot',
    name: '로봇',
    emoji: '🤖',
    svg: `<svg viewBox="0 0 400 350" xmlns="http://www.w3.org/2000/svg">
      <!-- 안테나 -->
      <line x1="200" y1="20" x2="200" y2="50" stroke="#333" stroke-width="2.5" data-nofill="true"/>
      <circle cx="200" cy="15" r="8" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 머리 -->
      <rect x="130" y="50" width="140" height="100" rx="15" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <!-- 왼쪽 눈 -->
      <circle cx="170" cy="90" r="18" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <circle cx="170" cy="90" r="8" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 오른쪽 눈 -->
      <circle cx="230" cy="90" r="18" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <circle cx="230" cy="90" r="8" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 입 -->
      <rect x="165" y="120" width="70" height="15" rx="5" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 목 -->
      <rect x="185" y="150" width="30" height="20" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 몸통 -->
      <rect x="120" y="170" width="160" height="110" rx="10" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <!-- 가슴 버튼들 -->
      <circle cx="170" cy="210" r="10" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <circle cx="200" cy="210" r="10" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <circle cx="230" cy="210" r="10" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 배 패널 -->
      <rect x="155" y="235" width="90" height="30" rx="5" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 왼팔 -->
      <rect x="70" y="175" width="45" height="80" rx="10" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <circle cx="92" cy="265" r="15" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 오른팔 -->
      <rect x="285" y="175" width="45" height="80" rx="10" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <circle cx="307" cy="265" r="15" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 왼다리 -->
      <rect x="145" y="280" width="40" height="50" rx="5" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <rect x="135" y="325" width="60" height="15" rx="5" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 오른다리 -->
      <rect x="215" y="280" width="40" height="50" rx="5" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <rect x="205" y="325" width="60" height="15" rx="5" fill="#ffffff" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'house',
    name: '집',
    emoji: '🏠',
    svg: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg">
      <!-- 지붕 -->
      <polygon points="200,30 50,150 350,150" fill="#ffffff" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- 굴뚝 -->
      <rect x="280" y="55" width="30" height="70" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <rect x="275" y="50" width="40" height="10" rx="2" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 벽 -->
      <rect x="80" y="150" width="240" height="140" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <!-- 문 -->
      <rect x="170" y="210" width="60" height="80" rx="5" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <circle cx="220" cy="255" r="4" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 왼쪽 창 -->
      <rect x="100" y="180" width="50" height="50" rx="3" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <line x1="125" y1="180" x2="125" y2="230" stroke="#333" stroke-width="1.5" data-nofill="true"/>
      <line x1="100" y1="205" x2="150" y2="205" stroke="#333" stroke-width="1.5" data-nofill="true"/>
      <!-- 오른쪽 창 -->
      <rect x="250" y="180" width="50" height="50" rx="3" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <line x1="275" y1="180" x2="275" y2="230" stroke="#333" stroke-width="1.5" data-nofill="true"/>
      <line x1="250" y1="205" x2="300" y2="205" stroke="#333" stroke-width="1.5" data-nofill="true"/>
      <!-- 길 -->
      <polygon points="170,290 230,290 260,320 140,320" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 울타리 왼쪽 -->
      <rect x="20" y="260" width="55" height="5" rx="2" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <rect x="30" y="250" width="8" height="40" rx="2" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <rect x="55" y="250" width="8" height="40" rx="2" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 울타리 오른쪽 -->
      <rect x="325" y="260" width="55" height="5" rx="2" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <rect x="335" y="250" width="8" height="40" rx="2" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <rect x="360" y="250" width="8" height="40" rx="2" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'flower',
    name: '꽃',
    emoji: '🌸',
    svg: `<svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg">
      <!-- 줄기 -->
      <rect x="192" y="200" width="16" height="140" rx="4" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 왼쪽 잎 -->
      <path d="M192,280 Q140,260 130,300 Q150,310 192,295 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 오른쪽 잎 -->
      <path d="M208,260 Q260,240 270,280 Q250,290 208,275 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 꽃잎 위 -->
      <ellipse cx="200" cy="100" rx="35" ry="55" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 꽃잎 오른쪽위 -->
      <ellipse cx="248" cy="130" rx="35" ry="55" transform="rotate(72, 248, 130)" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 꽃잎 오른쪽아래 -->
      <ellipse cx="230" cy="185" rx="35" ry="55" transform="rotate(144, 230, 185)" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 꽃잎 왼쪽아래 -->
      <ellipse cx="170" cy="185" rx="35" ry="55" transform="rotate(-144, 170, 185)" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 꽃잎 왼쪽위 -->
      <ellipse cx="152" cy="130" rx="35" ry="55" transform="rotate(-72, 152, 130)" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 꽃 중심 -->
      <circle cx="200" cy="155" r="28" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <!-- 화분 -->
      <polygon points="155,345 245,345 235,380 165,380" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <rect x="148" y="335" width="104" height="15" rx="4" fill="#ffffff" stroke="#333" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'fish',
    name: '물고기',
    emoji: '🐟',
    svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <!-- 몸통 -->
      <ellipse cx="200" cy="150" rx="130" ry="75" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <!-- 꼬리 -->
      <polygon points="70,150 20,100 20,200" fill="#ffffff" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- 등지느러미 -->
      <path d="M180,75 Q200,30 240,50 Q230,75 220,78 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 배지느러미 -->
      <path d="M200,225 Q210,260 240,255 Q230,235 225,222 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 가슴지느러미 -->
      <path d="M250,155 Q280,180 260,200 Q245,185 240,165 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 눈 외곽 -->
      <circle cx="280" cy="135" r="18" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 눈동자 -->
      <circle cx="283" cy="135" r="8" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 입 -->
      <path d="M325,155 Q340,155 335,145" fill="none" stroke="#333" stroke-width="2" data-nofill="true"/>
      <!-- 비늘 패턴 -->
      <path d="M150,130 Q165,120 180,130 Q165,140 150,130 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <path d="M180,150 Q195,140 210,150 Q195,160 180,150 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <path d="M140,160 Q155,150 170,160 Q155,170 140,160 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <path d="M170,175 Q185,165 200,175 Q185,185 170,175 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <path d="M120,140 Q135,130 150,140 Q135,150 120,140 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 거품 -->
      <circle cx="355" cy="120" r="6" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <circle cx="370" cy="105" r="4" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <circle cx="360" cy="90" r="3" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'rocket',
    name: '로켓',
    emoji: '🚀',
    svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <!-- 본체 -->
      <path d="M200,30 Q160,100 160,200 L160,280 L240,280 L240,200 Q240,100 200,30 Z" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <!-- 노즈콘 하이라이트 -->
      <path d="M200,30 Q185,80 180,120 L200,110 L220,120 Q215,80 200,30 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 창문 -->
      <circle cx="200" cy="160" r="22" fill="#ffffff" stroke="#333" stroke-width="2.5"/>
      <circle cx="200" cy="160" r="14" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 중간 띠 -->
      <rect x="160" y="220" width="80" height="15" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 왼쪽 날개 -->
      <path d="M160,230 L100,300 L100,320 L160,280 Z" fill="#ffffff" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- 오른쪽 날개 -->
      <path d="M240,230 L300,300 L300,320 L240,280 Z" fill="#ffffff" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- 하단 -->
      <rect x="155" y="280" width="90" height="20" rx="3" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 불꽃 중심 -->
      <path d="M175,300 Q185,350 200,370 Q215,350 225,300 Z" fill="#ffffff" stroke="#333" stroke-width="2"/>
      <!-- 불꽃 왼쪽 -->
      <path d="M165,300 Q170,340 180,355 Q175,330 185,300 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 불꽃 오른쪽 -->
      <path d="M215,300 Q225,330 220,355 Q230,340 235,300 Z" fill="#ffffff" stroke="#333" stroke-width="1.5"/>
      <!-- 별 장식 -->
      <polygon points="80,80 83,90 93,90 85,96 88,106 80,100 72,106 75,96 67,90 77,90" fill="#ffffff" stroke="#333" stroke-width="1"/>
      <polygon points="320,120 323,130 333,130 325,136 328,146 320,140 312,146 315,136 307,130 317,130" fill="#ffffff" stroke="#333" stroke-width="1"/>
      <polygon points="340,60 342,66 348,66 343,70 345,76 340,72 335,76 337,70 332,66 338,66" fill="#ffffff" stroke="#333" stroke-width="1"/>
    </svg>`
  }
];
