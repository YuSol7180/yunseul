/* 윤슬 YUN:SEUL — 콘텐츠 데이터 (제품 · 컬렉션 · 국/영문 카피)
   Product data is fictional, created for a portfolio project. */

window.YS = window.YS || {};

YS.collections = [
  {
    id: 'mugunghwa',
    name: { ko: '무궁화 자개', en: 'Mugunghwa Jagae' },
    tagline: { ko: '빛의 각도에 따라 피어나는 꽃', en: 'A flower that blooms with the angle of light' },
    story: {
      ko: '한국의 대표적인 꽃인 무궁화를 현대적인 주얼리로 재해석한 윤슬의 시그니처 컬렉션입니다. 빛의 각도에 따라 은은하게 색이 변하는 자개 소재를 활용하여,<br>물 위에 반짝이는 빛을 의미하는 ‘윤슬’의 브랜드 이미지를 표현했습니다. 전통적인 상징성을 유지하면서도 일상에서 부담 없이 착용할 수 있도록 간결하고 세련된 형태로 디자인했습니다.',
      en: 'Our signature collection reimagines the mugunghwa, Korea’s national flower, as modern jewelry. Each petal is set with najeon, traditional mother-of-pearl inlay, whose color shifts softly as the light moves, just as yunseul glints on water. The symbolism stays; the form is pared back so you can wear it any day of the week.'
    },
    hero: 'kv-daffodil', mood: ['model-bite', 'mg-earring-calla', 'mg-hand-dark', 'model-curtain'],
    signature: true
  },
  {
    id: 'cheoma',
    name: { ko: '처마', en: 'Cheoma' },
    tagline: { ko: '끝에서 피어오르는 곡선', en: 'The curve that rises at the edge' },
    story: {
      ko: '처마 시리즈는 한옥 지붕 끝이 부드럽게 올라가는 곡선에서 시작되었습니다.<br>길게 흐르다 끝에서 살짝 들리는 선, 그 아래에 머무는 빛과 그림자를 작은 장신구에 담았습니다. 은은한 무광 면과 매끄러운 유광 가장자리는 움직임에 따라 서로 다른 빛을 드러냅니다. 목선과 손끝, 머리 위에 놓이는 유려한 곡선을 통해 한국 건축의 고요한 아름다움을 오늘의 일상으로 이어갑니다.',
      en: 'Cheoma begins with the eaves of a hanok roof and the way they lift gently at the very end. We took that long line, rising just at its tip, and the light and shadow that rest beneath it, and shaped them into small ornaments. Matte faces and polished edges catch the light differently as you move. A quiet piece of Korean architecture, carried at the neckline, the wrist and the ear.'
    },
    hero: 'cm-model', mood: ['lb-cm-brown', 'cm-necklace-model', 'cm-earring-model', 'lb-cm-rail'],
  },
  {
    id: 'gyeopgyeol',
    name: { ko: '겹결', en: 'Gyeopgyeol' },
    tagline: { ko: '물결과 빛이 만나 이루는 한 쌍', en: 'Where ripple and light become a pair' },
    story: {
      ko: '겹결은 두 고리를 함께 끼는 전통 가락지에서 영감을 받은 실버 반지 세트입니다. 불규칙한 표면으로 잔물결의 반짝임을 표현한 ‘잔결’과 매끄러운 유광으로 빛의 흐름을 표현한 ‘빛결’로 구성됩니다. 두 반지는 파도처럼 완만하게 굽이치는 형태로, 포개면 곡선이 자연스럽게 이어집니다. 각각 단독으로 착용하거나 한 쌍으로 겹쳐 착용할 수 있습니다.',
      en: 'Gyeopgyeol is a pair of silver rings inspired by garakji, the traditional rings worn two at a time. Jangyeol has a hand-hammered surface that holds the sparkle of small ripples. Bitgyeol is highly polished and carries the flow of light. Both bands undulate like a slow wave, so when you stack them their curves meet. Wear one on its own, or both together.'
    },
    hero: 'gy-falling', mood: ['lb-gy-silk', 'gy-bitgyeol-model', 'lb-gy-leaf', 'gy-jangyeol-model'],
  }
];

/* price: KRW. options: plating / size */
YS.products = [
  {
    id: 'mg-necklace', collection: 'mugunghwa', category: 'necklace',
    name: { ko: '무궁화 자개 목걸이', en: 'Mugunghwa Jagae Necklace' },
    price: 128000,
    short: { ko: '925 실버 · 천연 자개', en: '925 silver · mother-of-pearl' },
    spec: { ko: '펜던트 13mm · 40+5cm', en: 'Pendant 13 mm · 40+5 cm' },
    isNew: true, best: 2,
    images: ['mg-necklace-front', 'mg-necklace-model', 'mg-necklace-angle', 'mg-necklace-light', 'mg-hand-vertical', 'kv-daffodil'],
    summary: {
      ko: '다섯 장의 꽃잎마다 자개를 한 조각씩 감입한 펜던트 목걸이. 빛이 닿는 각도에 따라 옥빛과 분홍빛이 번갈아 비칩니다.',
      en: 'A pendant with a piece of mother-of-pearl set into each of its five petals. Tilt it and the surface shifts between jade and pale pink.'
    },
    material: { ko: '925 실버, 로듐 도금 / 천연 자개', en: '925 sterling silver, rhodium-plated / natural mother-of-pearl' },
    size: { ko: '펜던트 13 × 13mm / 체인 40cm + 연장 5cm', en: 'Pendant 13 × 13 mm / chain 40 cm + 5 cm extender' },
    plating: true
  },
  {
    id: 'mg-earring', collection: 'mugunghwa', category: 'earring',
    name: { ko: '무궁화 자개 진주 귀걸이', en: 'Mugunghwa Jagae Pearl Earrings' },
    price: 118000,
    short: { ko: '925 실버 · 천연 자개 · 담수 진주', en: '925 silver · mother-of-pearl · pearl' },
    spec: { ko: '꽃 10mm · 길이 22mm', en: 'Flower 10 mm · drop 22 mm' },
    isNew: true, best: 1,
    images: ['mg-earring-front', 'mg-earring-model', 'mg-earring-light', 'mg-earring-calla', 'model-earring-white', 'kv-branch'],
    summary: {
      ko: '담수 진주 아래로 자개 무궁화가 흔들리는 드롭 귀걸이. 움직일 때마다 꽃잎 위로 빛이 흐릅니다.',
      en: 'Drop earrings with a najeon mugunghwa swaying beneath a freshwater pearl. Light runs across the petals each time you move.'
    },
    material: { ko: '925 실버, 로듐 도금 / 천연 자개 / 담수 진주 6mm', en: '925 sterling silver, rhodium-plated / natural mother-of-pearl / 6 mm freshwater pearl' },
    size: { ko: '꽃 10 × 10mm / 전체 길이 22mm', en: 'Flower 10 × 10 mm / total drop 22 mm' },
    plating: true
  },
  {
    id: 'mg-bangle', collection: 'mugunghwa', category: 'bracelet',
    name: { ko: '무궁화 자개 뱅글 팔찌', en: 'Mugunghwa Jagae Bangle' },
    price: 168000,
    short: { ko: '925 실버 · 천연 자개 · 오픈 뱅글', en: '925 silver · mother-of-pearl · open bangle' },
    spec: { ko: '내경 58mm · 조절 가능', en: 'Inner Ø 58 mm · adjustable' },
    isNew: true,
    images: ['mg-bangle', 'mg-bangle-model', 'model-bangle'],
    summary: {
      ko: '한쪽 끝에는 무궁화, 다른 끝에는 둥근 자개를 단 오픈 뱅글. 손목에 맞게 살짝 벌리거나 좁혀 착용할 수 있습니다.',
      en: 'An open bangle with a mugunghwa at one end and a round najeon cabochon at the other. Ease it open or closed to fit your wrist.'
    },
    material: { ko: '925 실버, 로듐 도금 / 천연 자개', en: '925 sterling silver, rhodium-plated / natural mother-of-pearl' },
    size: { ko: '내경 58mm (조절 가능) / 꽃 12mm', en: 'Inner diameter 58 mm (adjustable) / flower 12 mm' },
    plating: true
  },
  {
    id: 'mg-long', collection: 'mugunghwa', category: 'necklace',
    name: { ko: '무궁화 자개 롱 목걸이', en: 'Mugunghwa Jagae Long Necklace' },
    price: 148000,
    short: { ko: '925 실버 · 천연 자개 · 페이퍼클립 체인', en: '925 silver · mother-of-pearl · paperclip chain' },
    spec: { ko: '펜던트 20mm · 70cm', en: 'Pendant 20 mm · 70 cm' },
    isNew: true,
    images: ['mg-necklace-worn', 'mg-hand-dark', 'mg-hand-vertical'],
    summary: {
      ko: '조금 더 큰 무궁화 펜던트를 길게 늘어뜨린 롱 목걸이. 니트나 셔츠 위에 겹쳐 입기 좋습니다.',
      en: 'A larger mugunghwa pendant on a long chain, made to layer over knits and shirts.'
    },
    material: { ko: '925 실버, 로듐 도금 / 천연 자개', en: '925 sterling silver, rhodium-plated / natural mother-of-pearl' },
    size: { ko: '펜던트 20 × 20mm / 페이퍼클립 체인 70cm', en: 'Pendant 20 × 20 mm / 70 cm paperclip chain' },
    plating: true
  },
  {
    id: 'cm-necklace', collection: 'cheoma', category: 'necklace',
    name: { ko: '처마 목걸이', en: 'Cheoma Necklace' },
    price: 89000,
    short: { ko: '925 실버 · 무광/유광 마감', en: '925 silver · matte and polished' },
    spec: { ko: '바 32mm · 42+3cm', en: 'Bar 32 mm · 42+3 cm' },
    best: 3,
    images: ['cm-necklace', 'cm-necklace-model', 'cm-model'],
    summary: {
      ko: '처마 끝처럼 양 끝이 살짝 들린 바(bar) 목걸이. 쇄골 위에 부드러운 곡선을 그립니다.',
      en: 'A bar necklace whose ends lift slightly, like the tips of the eaves. It draws one soft curve across the collarbone.'
    },
    material: { ko: '925 실버, 로듐 도금 / 무광·유광 혼합 마감', en: '925 sterling silver, rhodium-plated / mixed matte and polished finish' },
    size: { ko: '바 32mm / 체인 42cm + 연장 3cm', en: 'Bar 32 mm / chain 42 cm + 3 cm extender' },
    plating: true
  },
  {
    id: 'cm-bracelet', collection: 'cheoma', category: 'bracelet',
    name: { ko: '처마 팔찌', en: 'Cheoma Bracelet' },
    price: 79000,
    short: { ko: '925 실버 · 무광/유광 마감', en: '925 silver · matte and polished' },
    spec: { ko: '바 28mm · 16+3cm', en: 'Bar 28 mm · 16+3 cm' },
    images: ['cm-bracelet', 'cm-bracelet-model', 'cm-model'],
    summary: {
      ko: '손목 위에 놓이는 작은 처마. 가는 체인과 곡선 바가 매일 착용하기 좋은 무게감입니다.',
      en: 'A small eave resting on the wrist. A fine chain and curved bar, light enough to wear every day.'
    },
    material: { ko: '925 실버, 로듐 도금 / 무광·유광 혼합 마감', en: '925 sterling silver, rhodium-plated / mixed matte and polished finish' },
    size: { ko: '바 28mm / 체인 16cm + 연장 3cm', en: 'Bar 28 mm / chain 16 cm + 3 cm extender' },
    plating: true
  },
  {
    id: 'cm-earring', collection: 'cheoma', category: 'earring',
    name: { ko: '처마 귀걸이', en: 'Cheoma Earrings' },
    price: 69000,
    short: { ko: '925 실버 · 무광/유광 마감', en: '925 silver · matte and polished' },
    spec: { ko: '길이 30mm', en: 'Length 30 mm' },
    images: ['cm-earring', 'cm-earring-model', 'cm-model'],
    summary: {
      ko: '귓불에서 아래로 흐르다 끝에서 살짝 들어 올려지는 곡선 귀걸이.',
      en: 'Earrings that flow down from the lobe and turn gently upward at the end.'
    },
    material: { ko: '925 실버, 로듐 도금 / 무광·유광 혼합 마감', en: '925 sterling silver, rhodium-plated / mixed matte and polished finish' },
    size: { ko: '길이 30mm / 폭 6mm', en: 'Length 30 mm / width 6 mm' },
    plating: true
  },
  {
    id: 'gy-bitgyeol', collection: 'gyeopgyeol', category: 'ring',
    name: { ko: '빛결 반지', en: 'Bitgyeol Ring' },
    price: 58000,
    short: { ko: '925 실버 · 유광 마감', en: '925 silver · polished' },
    spec: { ko: '폭 2.5mm · 7–17호', en: 'Width 2.5 mm · KR 7–17' },
    images: ['gy-bitgyeol', 'gy-bitgyeol-model', 'gy-pair', 'gy-falling'],
    summary: {
      ko: '매끄러운 유광으로 빛의 흐름을 담은 반지. 파도처럼 완만하게 굽이칩니다.',
      en: 'A high-polish band that carries the flow of light, curving gently like a wave.'
    },
    material: { ko: '925 실버, 로듐 도금 / 유광 마감', en: '925 sterling silver, rhodium-plated / polished finish' },
    size: { ko: '폭 2.5mm / 7–17호', en: 'Width 2.5 mm / KR sizes 7–17 (US 4–8.5)' },
    plating: false, ring: true
  },
  {
    id: 'gy-jangyeol', collection: 'gyeopgyeol', category: 'ring',
    name: { ko: '잔결 반지', en: 'Jangyeol Ring' },
    price: 62000,
    short: { ko: '925 실버 · 해머링 마감', en: '925 silver · hammered' },
    spec: { ko: '폭 2.8mm · 7–17호', en: 'Width 2.8 mm · KR 7–17' },
    images: ['gy-jangyeol', 'gy-jangyeol-model', 'gy-detail', 'gy-pair'],
    summary: {
      ko: '하나하나 두드려 만든 면이 잔물결처럼 반짝이는 반지.',
      en: 'A hand-hammered band whose small facets sparkle like ripples.'
    },
    material: { ko: '925 실버, 로듐 도금 / 해머링 마감', en: '925 sterling silver, rhodium-plated / hammered finish' },
    size: { ko: '폭 2.8mm / 7–17호', en: 'Width 2.8 mm / KR sizes 7–17 (US 4–8.5)' },
    plating: false, ring: true
  },
  {
    id: 'gy-set', collection: 'gyeopgyeol', category: 'ring',
    name: { ko: '겹결 반지 세트', en: 'Gyeopgyeol Ring Set' },
    price: 109000,
    short: { ko: '빛결 + 잔결 반지 2개 구성', en: 'Bitgyeol + Jangyeol, set of two' },
    spec: { ko: '7–17호', en: 'KR 7–17' },
    best: 4,
    images: ['gy-stack', 'gy-set-model', 'gy-pair', 'gy-detail', 'gy-falling'],
    summary: {
      ko: '잔결과 빛결을 한 쌍으로. 포개어 끼면 두 곡선이 하나로 이어집니다. 따로 구매할 때보다 11,000원 낮은 가격입니다.',
      en: 'Jangyeol and Bitgyeol as a pair. Stack them and the two curves meet as one. ₩11,000 less than buying both separately.'
    },
    material: { ko: '925 실버, 로듐 도금 / 유광 + 해머링 마감', en: '925 sterling silver, rhodium-plated / polished + hammered' },
    size: { ko: '빛결 2.5mm + 잔결 2.8mm / 7–17호', en: 'Bitgyeol 2.5 mm + Jangyeol 2.8 mm / KR sizes 7–17 (US 4–8.5)' },
    plating: false, ring: true
  }
];


YS.categories = [
  { id: 'necklace', ko: '목걸이', en: 'Necklaces' },
  { id: 'earring', ko: '귀걸이', en: 'Earrings' },
  { id: 'bracelet', ko: '팔찌', en: 'Bracelets' },
  { id: 'ring', ko: '반지', en: 'Rings' }
];

/* JOURNAL — exhibition set by the brand designer; events are fictional */
YS.exhibitions = [
  {
    id: 'across-time',
    start: '2026-11-15', end: '2026-11-27',
    poster: 'exhibition-poster',
    // slider images (journal exhibition, jurijewelry.com blog layout). fit/pos/bg keep landscape mock-ups readable in the portrait frame
    gallery: [
      { src: 'exhibition-poster', alt: { ko: '전시 포스터', en: 'Exhibition poster' } },
      { src: 'ex-banner', pos: '53.6% 50%', alt: { ko: '가로등 배너', en: 'Street banners' } },
      { src: 'ex-brochure', alt: { ko: '전시 리플릿', en: 'Exhibition leaflet' } },
    ],
    summary: { ko: '윤슬의 세 컬렉션과 영감이 된 전통 장신구를 함께 보는 첫 브랜드 전시', en: 'Yunseul’s first brand exhibition, showing the three collections beside the ornaments that inspired them' },
    address: { ko: ['국립중앙박물관 상설전시관 2층', '서울 용산구 서빙고로 137', 'KOREA'], en: ['National Museum of Korea, 2F', '137 Seobinggo-ro, Yongsan-gu, Seoul', 'KOREA'] },
    link: { href: '#mugunghwa', ko: '무궁화 자개 컬렉션 보기', en: 'Discover Mugunghwa Jagae collection' },
    title: { ko: '시간을 건너, 윤슬', en: 'Across Time, YUNSEUL' },
    tagline: { ko: '오래된 아름다움이 오늘에 닿는 순간', en: 'When an old beauty reaches today' },
    venue: { ko: '국립중앙박물관 상설전시관 2층', en: 'National Museum of Korea, Permanent Exhibition Hall, 2F' },
    fee: { ko: '무료 관람', en: 'Free admission' },
    body: {
      ko: '윤슬의 세 컬렉션을 영감이 된 전통 장신구와 나란히 놓는 전시입니다. 노리개와 가락지, 나전칠기의 자개, 한옥의 처마가 어떻게 오늘의 목걸이와 반지가 되었는지 스케치와 원형, 완성품으로 따라갑니다. 전시장 끝에서는 모든 제품을 직접 착용해볼 수 있습니다.',
      en: 'This exhibition places Yunseul\u2019s three collections beside the traditional ornaments that inspired them. Through sketches, prototypes and finished pieces, follow how norigae and garakji, lacquerware mother-of-pearl and hanok eaves became today\u2019s necklaces and rings. At the end of the hall, you can try on every piece.'
    }
  }
];

YS.events = [
  {
    id: 'postcard', start: '2026-11-15', end: '2026-11-27',
    title: { ko: '전시 관람 고객 자개 엽서 증정', en: 'Mother-of-pearl postcard for exhibition visitors' },
    body: { ko: '〈시간을 건너, 윤슬〉 전시장에서 관람 인증 스탬프를 받으면 무궁화 자개 엽서를 드립니다. 하루 100장 한정입니다.', en: 'Get your stamp at Across Time, YUNSEUL and take home a mugunghwa mother-of-pearl postcard. Limited to 100 a day.' },
    how: { ko: '참여 방법: 전시장 입구에서 스탬프 카드 수령 → 마지막 존에서 스탬프 확인', en: 'How: pick up a stamp card at the entrance and show it in the final room.' }
  },
  {
    id: 'engraving', start: '2026-11-01', end: '2026-12-31',
    title: { ko: '겹결 반지 무료 각인', en: 'Free engraving on Gyeopgyeol rings' },
    body: { ko: '겹결 반지를 주문하면 반지 안쪽에 이니셜이나 날짜를 최대 8자까지 무료로 새겨드립니다. 두 반지에 서로 다른 문구를 새길 수도 있습니다.', en: 'Order a Gyeopgyeol ring and we\u2019ll engrave up to 8 characters inside the band for free \u2014 initials or a date. Each ring in a set can carry its own words.' },
    how: { ko: '참여 방법: 주문 시 메시지 카드 칸에 각인 문구 입력', en: 'How: write your engraving in the message card field when you order.' }
  },
  {
    id: 'holiday', start: '2026-12-01', end: '2026-12-25',
    title: { ko: '홀리데이 골드 물결 포장', en: 'Holiday gold wave wrapping' },
    body: { ko: '12월 한 달간 모든 주문을 금색 물결 문양 포장지와 리본으로 감싸 보내드립니다. 손글씨 메시지 카드도 함께 넣어드립니다.', en: 'Throughout December, every order is wrapped in our gold wave-pattern paper and ribbon, with a handwritten message card inside.' },
    how: { ko: '참여 방법: 별도 신청 없이 자동 적용', en: 'How: applied automatically, nothing to do.' }
  }
];

// LOOKBOOK tab — free layout after jurijewelry.com home: pieces placed in % of the board width
// (x, y = left/top, w = width) so they overlap, sit in loose threes and open/close the gaps.
// ar = the photo's own width/height — never cropped. col = labelled collection piece.
YS.lookbookBoard = [
  { col: 'mugunghwa', img: 'model-bite', x: 0, y: 0, w: 30, ar: '991/1400' },
  { img: 'mg-earring-calla', x: 31.5, y: 17.2, w: 24, ar: '1114/1400' },
  { img: 'kv-daffodil-bw', x: 78, y: 12, w: 22, ar: '1120/1400' },
  { img: 'model-earring-blue', x: 8, y: 55.4, w: 34, ar: '1053/1400' },
  { col: 'cheoma', img: 'cm-necklace-model', x: 60, y: 69.4, w: 28, ar: '1087/1447' },
  { img: 'lb-cm-neck', x: 2, y: 122.7, w: 24, ar: '1122/1402' },
  { img: 'lb-cm-rail', x: 27.5, y: 116.7, w: 24, ar: '1122/1402' },
  { img: 'lb-wood', x: 76, y: 129.7, w: 22, ar: '1024/1536' },
  { img: 'lb-cm-sit', x: 0, y: 171.7, w: 48, ar: '1400/915' },
  { img: 'lb-cm-bracelet-brown', x: 49.5, y: 184.1, w: 22, ar: '1094/1438' },
  { img: 'cm-earring-model', x: 10, y: 234.0, w: 26, ar: '1092/1440' },
  { img: 'cm-bracelet-model', x: 66, y: 224.0, w: 24, ar: '1086/1448' },
  { img: 'lb-cm-brown', x: 30, y: 277.3, w: 40, ar: '1086/1448' },
  { img: 'lb-hands', x: 71.5, y: 277.3, w: 24, ar: '1121/1403' },
  { col: 'gyeopgyeol', img: 'lb-gy-silk', x: 0, y: 339.6, w: 30, ar: '1084/1451' },
  { img: 'lb-gy-black', x: 31.5, y: 350.6, w: 22, ar: '1089/1445' },
  { img: 'lb-water', x: 78, y: 351.6, w: 22, ar: '1200/1500' },
  { img: 'lb-gy-leaf', x: 14, y: 392.8, w: 32, ar: '1091/1441' },
  { img: 'gy-bitgyeol-model', x: 47.5, y: 392.8, w: 26, ar: '1091/1442' },
  { img: 'lb-gy-flat', x: 80, y: 404.8, w: 20, ar: '1092/1440' },
];
YS.lookbookChapters = [
  { id: 'mugunghwa', season: '2026', title: { ko: '물 위의 빛', en: 'Light on Water' }, collection: 'mugunghwa',
    note: { ko: '무궁화 자개 캠페인. 흑백 톤 위로 자개의 옥빛만 남겼습니다.', en: 'Mugunghwa Jagae campaign. Black and white, with only the jade of mother-of-pearl left in color.' },
    images: ['model-bite', 'kv-daffodil-bw', 'model-curtain', 'mg-earring-calla', 'model-sitting', 'kv-pink', 'model-earring-blue', 'model-bangle', 'kv-branch', 'model-turtleneck'] },
  { id: 'cheoma', season: '2025', title: { ko: '끝의 곡선', en: 'The Curve at the Edge' }, collection: 'cheoma',
    note: { ko: '처마 컬렉션. 손목과 귓선 위에 머무는 작은 곡선.', en: 'Cheoma collection. Small curves resting on the wrist and the ear.' },
    images: ['cm-model', 'cm-necklace', 'cm-earring'] },
  { id: 'gyeopgyeol', season: '2025', title: { ko: '두 개의 결', en: 'Two Textures' }, collection: 'gyeopgyeol',
    note: { ko: '겹결 컬렉션. 잔물결과 빛의 흐름이 한 손 위에서 만납니다.', en: 'Gyeopgyeol collection. Ripples and flowing light meet on one hand.' },
    images: ['gy-falling', 'gy-detail', 'gy-stack', 'gy-pair'] }
];

YS.lookbook = [
  { img: 'model-bite', w: 'tall' }, { img: 'kv-daffodil-bw', w: '' }, { img: 'model-curtain', w: '' },
  { img: 'mg-earring-calla', w: '' }, { img: 'model-sitting', w: 'tall' }, { img: 'kv-pink', w: '' },
  { img: 'model-earring-blue', w: '' }, { img: 'mg-necklace-worn', w: 'tall' }, { img: 'gy-falling', w: '' },
  { img: 'model-turtleneck', w: '' }, { img: 'kv-branch', w: '' }, { img: 'model-bangle', w: '' }
];

/* UI strings */
YS.t = {
  nav_about: { ko: '브랜드', en: 'About' },
  nav_collections: { ko: '컬렉션', en: 'Collections' },
  nav_lookbook: { ko: '룩북', en: 'Lookbook' },
  nav_gift: { ko: '기프트', en: 'Gift' },
  nav_contact: { ko: '고객 안내', en: 'Help' },
  cart: { ko: '장바구니', en: 'Bag' },
  menu: { ko: '메뉴', en: 'Menu' },
  close: { ko: '닫기', en: 'Close' },

  hero_slogan: { ko: '한국의 아름다움을<br>일상 속에서', en: 'Korean beauty,<br>worn every day' },
  hero_sub: { ko: '전통 장신구의 우아함을 매일 착용할 수 있는 형태로 다시 짓습니다.', en: 'We rework the grace of traditional Korean ornaments into pieces made for everyday wear.' },
  hero_cta: { ko: '컬렉션 보기', en: 'View collections' },
  hero_hint_touch: { ko: '화면을 쓸어 물 위의 빛을 깨워보세요', en: 'Swipe across to stir the light on the water' },
  hero_hint: { ko: '커서를 움직여 물 위의 빛을 깨워보세요', en: 'Move your cursor to stir the light on the water' },

  intro_word: { ko: '윤슬', en: 'Yunseul' },
  intro_def: { ko: '햇빛이나 달빛에 비치어 반짝이는 잔물결', en: 'n. the glittering ripples of sunlight or moonlight on water' },
  intro_body: { ko: '윤슬은 한국 전통 장신구의 아름다움을 현대적인 디자인으로 재해석한 데일리 액세서리 브랜드입니다. 전통 장신구가 가진 우아함과 상징성을 오늘의 스타일과 결합해, 일상 속에서도 자연스럽게 착용할 수 있는 새로운 형태의 장신구를 만듭니다.', en: 'Yunseul is a daily accessory brand that reinterprets traditional Korean ornaments through modern design. We pair the grace and symbolism of heritage jewelry with the way people dress today, so it can be worn naturally, every day.' },
  intro_link: { ko: '브랜드 이야기', en: 'Our story' },

  col_heading: { ko: '세 개의 컬렉션', en: 'Three collections' },
  col_view: { ko: '컬렉션 보기', en: 'View collection' },
  signature_label: { ko: '시그니처', en: 'Signature' },
  pieces: { ko: '개 제품', en: ' pieces' },

  shop_heading: { ko: '매일의 장신구', en: 'Everyday pieces' },
  shop_all: { ko: '전체 제품', en: 'All pieces' },

  lb_heading: { ko: '물 위의 빛', en: 'Light on water' },
  lb_sub: { ko: '2026 캠페인. 절제된 흑백 톤 위로 자개의 옥빛만 남겼습니다.', en: 'Campaign 2026. Restrained black-and-white, with only the jade of mother-of-pearl left in color.' },
  lb_link: { ko: '룩북 전체 보기', en: 'See the full lookbook' },

  gift_heading: { ko: '마음을 전하는 한국의 품격', en: 'A Korean gift with quiet grace' },
  gift_body: { ko: '모든 제품은 전통 보자기에 정성껏 싸서 보내드립니다.<br>주얼리 카드와 품질 보증서가 함께 담겨 있습니다.', en: 'Every piece is wrapped by hand in traditional bojagi cloth.<br>A jewelry card and a warranty certificate come inside.' },
  gift_link: { ko: '기프트 가이드', en: 'Gift guide' },

  insta_heading: { ko: '인스타그램', en: 'Instagram' },

  /* about */
  about_title: { ko: '물 위에 반짝이는 빛처럼', en: 'Like light glinting on water' },
  about_lead: { ko: '전통은 박물관 유리장 안에만 있지 않습니다. 윤슬은 할머니의 가락지, 한옥의 처마, 나전칠기의 자개처럼 우리 곁에 있던 아름다움을 오늘 입는 옷 위로 옮겨옵니다.', en: 'Tradition doesn’t only live behind museum glass. Yunseul brings the beauty that was always close by — a grandmother’s garakji rings, the eaves of a hanok, the mother-of-pearl of a lacquered chest — onto the clothes you wear today.' },
  ah_l: { ko: '윤슬은 물 위에 반짝이는 빛에서 이름을 얻었습니다. 그 빛처럼, 한국의 아름다움도 특별한 날이 아닌 매일의 순간에 머물러야 한다고 믿습니다.', en: 'Yunseul takes its name from light glinting on water. Like that light, we believe Korean beauty belongs to ordinary days, not only special ones.' },
  ah_r: { ko: '할머니의 가락지, 한옥의 처마, 나전칠기의 자개. 유리장 속 전통을 출근길의 귀걸이와 손끝의 반지로 옮겨, 오늘의 옷차림 위에서 다시 빛나게 합니다.', en: 'A grandmother’s ring, the eaves of a hanok, mother-of-pearl inlay. We move tradition out of the display case and onto the earring you wear to work, so it shines again in what you wear today.' },
  about_kw_title: { ko: '윤슬이 지키는 다섯 가지', en: 'Five things we hold to' },
  kw: [
    { ko: ['전통', '한국 장신구의 형태와 기법에서 출발합니다.'], en: ['Tradition', 'Every piece starts from a Korean ornament or craft technique.'] },
    { ko: ['현대적 재해석', '상징은 남기고 장식은 덜어 매일 착용할 수 있게 합니다.'], en: ['Modern reinterpretation', 'We keep the symbol and remove the excess, so it works every day.'] },
    { ko: ['한국적 아름다움', '절제된 곡선, 여백, 은은한 빛을 따릅니다.'], en: ['Korean beauty', 'Restrained curves, empty space and soft light guide the design.'] },
    { ko: ['유산', '오래 간직하고 물려줄 수 있는 소재와 마감을 고릅니다.'], en: ['Heritage', 'Materials and finishes chosen to be kept and passed down.'] },
    { ko: ['개성', '흔한 액세서리가 아닌, 나의 안목을 드러내는 한 점.'], en: ['Individuality', 'Not an accessory you see everywhere, but one that shows your eye.'] }
  ],
  about_symbol_title: { ko: '심볼', en: 'The symbol' },
  about_symbol_body: { ko: '심볼은 윤슬(YUNSEUL)의 이니셜 S를 기반으로 전통 매듭 문양을 현대적으로 재해석했습니다. 유기적으로 얽힌 곡선은 장신구의 장식성과 연결의 의미를 담고, 네 방향의 작은 삼각은 물 위로 흩어지는 빛을 나타냅니다.', en: 'Our symbol is built from S, the initial of YUNSEUL, redrawn in the manner of a traditional knot pattern. The interlaced curves stand for ornament and connection; the four small triangles are light scattering across the water.' },
  about_motif_title: { ko: '그래픽 모티브', en: 'Graphic motifs' },
  motifs: [
    { id: 'ajamun', ko: ['아자문', '전통 가구와 공예품의 가장자리를 장식하던 아자(亞字) 문양. 패키지, 보증서, 기프트 카드의 프레임으로 쓰입니다.'], en: ['Ajamun', 'The 亞-shaped lattice that framed the edges of traditional furniture and crafts. We use it to frame packaging, certificates and gift cards.'] },
    { id: 'yunseul', ko: ['윤슬', '수면에 비친 빛의 흐름을 수평 선의 레이어로 재구성했습니다. 자개의 질감을 닮은 그레인으로 빛이 부서지는 찰나를 담았습니다.'], en: ['Yunseul', 'The flow of light on water, rebuilt as layered horizontal lines, with a grain texture borrowed from mother-of-pearl to catch the moment light breaks apart.'] },
    { id: 'wave', ko: ['물결', '겹겹이 이어지는 반원으로 이루어진 전통 물결 문양. 패키지 안감과 포장지에 쓰입니다.'], en: ['Wave', 'A traditional wave pattern of overlapping arcs, used inside our boxes and on our wrapping paper.'] }
  ],
  about_color_title: { ko: '컬러', en: 'Color' },

  /* collections index */
  cols_title: { ko: '컬렉션', en: 'Collections' },
  cols_lead: { ko: '하나의 전통 모티브에서 하나의 컬렉션이 시작됩니다. 꽃, 처마, 가락지에서 출발한 세 가지 이야기를 만나보세요.', en: 'Each collection begins with a single traditional motif. Three stories, starting from a flower, the eaves and a pair of rings.' },

  /* product */
  pd_add: { ko: '장바구니에 담기', en: 'Add to bag' },
  pd_added: { ko: '장바구니에 담았습니다', en: 'Added to bag' },
  pd_buy: { ko: '바로 구매하기', en: 'Buy now' },
  pd_material: { ko: '소재', en: 'Materials' },
  pd_size: { ko: '사이즈', en: 'Size' },
  pd_care: { ko: '관리 방법', en: 'Care' },
  pd_care_body: { ko: '자개는 물과 열에 약합니다. 샤워, 수영 전에는 빼두고, 향수와 화장품이 마른 뒤에 착용하세요. 보관할 때는 함께 드리는 파우치에 하나씩 넣어주세요.', en: 'Mother-of-pearl is sensitive to water and heat. Take it off before showering or swimming, and put it on after perfume and skincare have dried. Store each piece in its own pouch.' },
  pd_shipping: { ko: '배송 · 선물 포장', en: 'Shipping & gift wrap' },
  pd_shipping_body: { ko: '평일 오후 2시 이전 주문은 당일 출고됩니다. 모든 제품은 윤슬 기프트 박스에 담겨 발송되며, 해외 배송도 가능합니다.', en: 'Orders placed before 2 p.m. KST on weekdays ship the same day. Every piece ships in a Yunseul gift box. International shipping is available.' },
  pd_finish: { ko: '컬러', en: 'Finish' },
  silver: { ko: '실버', en: 'Silver' },
  gold: { ko: '골드 (14K 도금, +10,000원)', en: 'Gold (14K plated, +₩10,000)' },
  pd_ringsize: { ko: '반지 호수', en: 'Ring size' },
  pd_choose: { ko: '호수 선택', en: 'Choose a size' },
  pd_need_size: { ko: '반지 호수를 선택해주세요.', en: 'Please choose a ring size.' },
  pd_giftwrap: { ko: '메시지 카드 추가 (무료)', en: 'Add a message card (free)' },
  pd_related: { ko: '같은 컬렉션', en: 'From the same collection' },
  pd_back: { ko: '컬렉션으로', en: 'Back to collection' },

  /* cart */
  cart_title: { ko: '장바구니', en: 'Your bag' },
  cart_empty: { ko: '장바구니가 비어 있습니다. 컬렉션에서 마음에 드는 장신구를 담아보세요.', en: 'Your bag is empty. Browse the collections to find a piece you like.' },
  cart_total: { ko: '합계', en: 'Total' },
  cart_checkout: { ko: '결제하기', en: 'Check out' },
  cart_items: { ko: '{n}개 상품', en: '{n} items' },
  cart_all: { ko: '전체 선택', en: 'Select all' },
  cart_rmsel: { ko: '선택 삭제', en: 'Remove selected' },
  cart_wrap: { ko: '보자기 선물 포장', en: 'Bojagi gift wrap' },
  cart_wrap_sub: { ko: '윤슬 보자기와 손글씨 카드 · +3,000원', en: 'Yunseul bojagi and a handwritten card · +₩3,000' },
  cart_sub: { ko: '상품 금액', en: 'Subtotal' },
  cart_wrapfee: { ko: '선물 포장', en: 'Gift wrap' },
  cart_ship: { ko: '배송비', en: 'Shipping' },
  cart_free: { ko: '무료', en: 'Free' },
  cart_grand: { ko: '총 결제 금액', en: 'Total' },
  cart_pay: { ko: '{p} 결제하기', en: 'Pay {p}' },
  cart_remove: { ko: '삭제', en: 'Remove' },
  demo_title: { ko: '포트폴리오용 데모 사이트입니다', en: 'This is a portfolio demo' },
  demo_body: { ko: '윤슬은 브랜드 디자인 프로젝트로, 실제 결제와 배송은 진행되지 않습니다. 둘러봐 주셔서 감사합니다.', en: 'Yunseul is a brand design project. No payment is taken and nothing will ship. Thank you for looking around.' },
  ok: { ko: '확인', en: 'OK' },

  /* gift */
  gift_title: { ko: '기프트', en: 'Gift' },
  gift_lead: { ko: '뻔한 기념품이 아닌, 한국의 세련된 품격을 선물하세요. 소중한 사람에게도, 한국을 기억하고 싶은 해외의 친구에게도.', en: 'Give something better than a souvenir: a piece of refined Korean craft. For someone dear, or a friend abroad who wants to remember Korea.' },
  gift_lead1: { ko: '뻔한 기념품이 아닌, 한국의 세련된 품격을 선물하세요.', en: 'Give something better than a souvenir: a piece of refined Korean craft.' },
  gift_lead2: { ko: '소중한 사람에게도, 한국을 기억하고 싶은 해외의 친구에게도.', en: 'For someone dear, or a friend abroad who wants to remember Korea.' },
  gift_pack_title: { ko: '윤슬 기프트 패키지', en: 'The Yunseul gift package' },
  gift_pack: [
    { img: 'gift-bojagi', ko: ['전통 보자기 포장', '전통 보자기 포장 문화에서 영감을 받아 현대적으로 재해석한 패키지입니다. 블랙 보자기와 옥색·골드 노리개의 조화로 한국적 아름다움과 현대적인 고급스러움을 함께 담았습니다.'], en: ['Traditional bojagi wrapping', 'Inspired by the Korean craft of bojagi wrapping. A black cloth tied with a jade or gold norigae tassel, at once traditional and quietly luxurious.'] },
    { img: 'gift-cards', ko: ['주얼리 카드', '제품마다 모티브 일러스트와 이름, 이야기를 담은 카드가 함께 동봉됩니다. 아자문 테두리와 옥색 도트 그래픽으로 윤슬의 결을 이어갑니다.'], en: ['Jewelry card', 'Each piece comes with a card carrying its motif illustration, name and story, framed with the ajamun border and jade dot graphics.'] },
    { img: 'gift-warranty', ko: ['품질 보증서', '윤슬의 품질 기준에 따라 제작·검수된 제품임을 보증합니다. 제조상 결함이 확인되면 기준에 따라 수선 또는 교환을 지원하며, 주얼리 관리 방법도 함께 안내합니다.'], en: ['Warranty certificate', 'Certifies that the piece was made and checked to Yunseul’s standards. Manufacturing defects are repaired or exchanged, and care instructions are included.'] }
  ],

  gift_guide_title: { ko: '예산별 기프트 가이드', en: 'Gifts by budget' },
  gift_tier: [
    { max: 80000, ko: '8만원 이하', en: 'Under ₩80,000' },
    { min: 80000, max: 130000, ko: '8만–13만원', en: '₩80,000–130,000' },
    { min: 130000, ko: '13만원 이상', en: 'Over ₩130,000' }
  ],
  gift_card_sample: { ko: '늘 곁에서<br>은은하게 빛나주어<br>고마워', en: 'Thank you<br>for shining softly<br>beside me' },

  /* lookbook */
  lookbook_title: { ko: '룩북', en: 'Lookbook' },

  /* header search & account */
  search_placeholder: { ko: '제품명이나 컬렉션을 검색하세요', en: 'Search pieces or collections' },
  search_suggest: { ko: '컬렉션으로 둘러보기', en: 'Browse by collection' },
  search_none: { ko: '\u2018{q}\u2019에 맞는 제품이 없습니다. 무궁화, 반지, 귀걸이처럼 검색해보세요.', en: 'No pieces match \u2018{q}\u2019. Try mugunghwa, ring or earrings.' },
  acc_title: { ko: '마이페이지', en: 'My page' },
  acc_lead: { ko: '로그인하면 주문 내역과 배송 상태, 저장한 기프트 메시지를 확인할 수 있습니다.', en: 'Sign in to see your orders, delivery status and saved gift messages.' },
  acc_pw: { ko: '비밀번호', en: 'Password' },
  acc_login: { ko: '로그인', en: 'Sign in' },
  acc_browse: { ko: '쇼핑 계속하기', en: 'Continue shopping' },
  acc_demo: { ko: '데모 사이트라 로그인 기능은 연결되어 있지 않습니다.', en: 'This is a demo site, so sign-in isn\u2019t connected.' },

  /* home */
  nc_eyebrow: { ko: '2026 NEW COLLECTION', en: '2026 NEW COLLECTION' },
  nc_all: { ko: '전체 보기', en: 'View all' },
  nc_body: { ko: '윤슬의 2026 신규 컬렉션은 한국의 꽃 무궁화를 자개로 피워낸 시그니처 라인입니다.<br class="br-d"> 빛의 각도에 따라 옥빛과 분홍빛이 번갈아 비치는 꽃잎을, 매일의 목선과 귓가, 손목 위에서 만나보세요.', en: 'Our 2026 collection is a signature line that brings the mugunghwa, Korea\u2019s flower, into bloom in mother-of-pearl.<br class="br-d"> Its petals shift between jade and pale pink as the light moves \u2014 at your neckline, your ear and your wrist, every day.' },
  nc_more: { ko: '무궁화 자개 컬렉션 전체 보기', en: 'See the full Mugunghwa Jagae collection' },
  kv_caption: { ko: '2026 캠페인 · 무궁화 자개', en: '2026 campaign · Mugunghwa Jagae' },
  best_heading: { ko: '베스트셀러', en: 'Bestsellers' },
  best_more: { ko: '베스트셀러 전체 보기', en: 'See all bestsellers' },
  quick_add: { ko: '장바구니에 담기', en: 'Add to bag' },
  quick_need_size: { ko: '반지 호수를 선택해주세요', en: 'Choose a ring size first' },

  /* shop */
  shop_title: { ko: 'SHOP', en: 'SHOP' },
  shop_all_tab: { ko: '전체', en: 'All' },
  shop_best_tab: { ko: '베스트', en: 'Best' },
  shop_bycol: { ko: '컬렉션으로 보기', en: 'Shop by collection' },
  sort_label: { ko: '정렬', en: 'Sort' },
  filter_label: { ko: '필터', en: 'Filter' },
  sort_rec: { ko: '추천순', en: 'Recommended' },
  sort_new: { ko: '신상품순', en: 'Newest' },
  sort_low: { ko: '낮은 가격순', en: 'Price: low to high' },
  sort_high: { ko: '높은 가격순', en: 'Price: high to low' },
  count_items: { ko: '{n}개 제품', en: '{n} pieces' },
  new_badge: { ko: 'NEW', en: 'NEW' },
  mega_all: { ko: '전체 제품', en: 'All pieces' },
  mega_best: { ko: '베스트셀러', en: 'Bestsellers' },
  mega_gift_guide: { ko: '예산별 기프트', en: 'Gifts by budget' },
  mega_gift_pack: { ko: '기프트 패키지', en: 'Gift packaging' },

  /* journal */
  journal_lead: { ko: '윤슬이 만드는 전시와 이벤트, 그리고 계절마다 남기는 화보 기록.', en: 'Exhibitions and events by Yunseul, and the campaigns we shoot each season.' },
  j_exhibitions: { ko: 'EXHIBITIONS', en: 'EXHIBITIONS' },
  j_events: { ko: 'EVENTS', en: 'EVENTS' },
  j_lookbook: { ko: 'LOOKBOOK', en: 'LOOKBOOK' },
  j_ex_sub: { ko: '브랜드 전시와 팝업', en: 'Brand exhibitions and pop-ups' },
  j_ev_sub: { ko: '진행 중인 이벤트와 참여 방법', en: 'Current events and how to join' },
  j_lb_sub: { ko: '시즌별 · 컬렉션별 화보', en: 'Campaigns by season and collection' },
  j_news: { ko: 'NEWS', en: 'NEWS' },
  j_news_desc: { ko: '전시와 이벤트 소식', en: 'Exhibitions and events' },
  news_lead: { ko: '윤슬의 전시와 이벤트 소식을 전합니다.', en: 'Exhibitions and events from Yunseul.' },
  j_all: { ko: '전체 보기', en: 'View all' },
  st_upcoming: { ko: '오픈 D-{d}', en: 'Opens in {d} days' },
  st_upcoming_ev: { ko: '시작 D-{d}', en: 'Starts in {d} days' },
  st_live: { ko: '진행 중', en: 'Now on' },
  st_ended: { ko: '종료', en: 'Ended' },
  ex_period: { ko: '기간', en: 'Dates' },
  ex_venue: { ko: '장소', en: 'Venue' },
  ex_fee: { ko: '관람', en: 'Admission' },
  ex_note: { ko: '포트폴리오 프로젝트를 위해 기획한 가상의 전시입니다.', en: 'A fictional exhibition planned for this portfolio project.' },
  ev_note: { ko: '이벤트는 포트폴리오용 가상 콘텐츠입니다.', en: 'Events are fictional content for this portfolio.' },
  lb_view_col: { ko: '컬렉션 보기', en: 'View collection' },

  /* contact */
  help_title: { ko: '고객 안내', en: 'Help' },
  faq_title: { ko: '자주 묻는 질문', en: 'Questions' },
  faq: [
    { ko: ['자개는 물에 닿아도 괜찮나요?', '잠깐 닿는 정도는 괜찮지만, 오래 젖어 있으면 광택이 흐려질 수 있습니다. 물기가 닿았다면 부드러운 천으로 바로 닦아주세요.'], en: ['Can mother-of-pearl get wet?', 'A splash is fine, but long exposure can dull its shine. If it gets wet, dry it right away with a soft cloth.'] },
    { ko: ['반지 호수는 어떻게 재나요?', '평소 끼는 반지의 안쪽 지름을 재거나, 실로 손가락 둘레를 잰 뒤 아래 표와 비교해주세요. 두 호수 사이라면 큰 쪽을 추천합니다.'], en: ['How do I find my ring size?', 'Measure the inner diameter of a ring you wear, or wrap a thread around your finger and compare with the chart below. If you’re between sizes, go up.'] },
    { ko: ['해외로도 배송되나요?', '네. 미국, 일본, 유럽 등 30개국으로 배송하며, 영문 보증서와 함께 발송됩니다.'], en: ['Do you ship internationally?', 'Yes, to 30 countries including the US, Japan and the EU, with an English certificate in every box.'] },
    { ko: ['교환이나 반품이 가능한가요?', '수령 후 7일 이내, 착용하지 않은 제품에 한해 가능합니다. 메시지 카드를 넣은 선물 주문도 동일합니다.'], en: ['Can I exchange or return?', 'Within 7 days of delivery for unworn pieces, including gift orders with a message card.'] },
    { ko: ['변색되면 어떻게 하나요?', '실버는 공기와 만나 자연스럽게 어두워질 수 있습니다. 구매 후 1년간 무료 세척·광택 서비스를 제공합니다.'], en: ['What if the silver tarnishes?', 'Silver naturally darkens with air. We clean and polish any piece free of charge for one year after purchase.'] }
  ],
  size_title: { ko: '반지 호수표', en: 'Ring size chart' },
  size_head: { ko: ['호수', '안쪽 둘레', '안쪽 지름', 'US'], en: ['KR', 'Circumference', 'Diameter', 'US'] },
  contact_title: { ko: '문의하기', en: 'Contact us' },
  f_name: { ko: '이름', en: 'Name' },
  f_email: { ko: '이메일', en: 'Email' },
  f_msg: { ko: '문의 내용', en: 'Message' },
  f_send: { ko: '문의 보내기', en: 'Send message' },
  f_need: { ko: '이름, 이메일, 문의 내용을 모두 입력해주세요.', en: 'Please fill in your name, email and message.' },
  f_demo: { ko: '데모 사이트라 문의가 실제로 전송되지는 않습니다. 실제 문의는 아래 인스타그램으로 부탁드립니다.', en: 'This is a demo site, so the message was not sent. Please reach us on Instagram below.' },

  footer_note: { ko: '윤슬은 브랜드 디자인 포트폴리오 프로젝트입니다. 실제 판매는 이루어지지 않습니다.', en: 'Yunseul is a brand design portfolio project. Products are not for sale.' },
  not_found: { ko: '페이지를 찾을 수 없습니다. 홈에서 다시 시작해주세요.', en: 'We couldn’t find that page. Start again from home.' },
  go_home: { ko: '홈으로', en: 'Go home' }
};
