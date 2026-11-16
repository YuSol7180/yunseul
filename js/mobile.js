/* 윤슬 YUN:SEUL — mobile.js
   모바일(폭 760px 이하) 전용 카피. PC에는 적용되지 않습니다.
   YS.mobile(true) 가 원문을 아래의 짧은 문장으로 바꾸고, YS.mobile(false) 가 원문으로 되돌립니다.
   경로 규칙: 't.키.언어', 'p:제품id.필드.언어', 'c:컬렉션id.필드.언어', 배열은 숫자 인덱스. */
(function () {
  'use strict';
  const M = {
    /* 홈 */
    't.hero_sub.ko': '전통 장신구의 우아함을<br>매일 착용할 수 있는 형태로 다시 짓습니다.',
    't.hero_sub.en': 'We rework traditional Korean ornaments<br>into pieces made for everyday wear.',
    't.intro_body.ko': '한국 전통 장신구의 아름다움을 오늘의 디자인으로 다시 짓는 데일리 액세서리 브랜드입니다.',
    't.intro_body.en': 'An everyday accessory brand that reworks traditional Korean ornaments for today.',
    't.nc_body.ko': '한국의 꽃 무궁화를 자개로 피워낸 2026 시그니처 라인. 빛에 따라 옥빛과 분홍빛이 번갈아 비칩니다.',
    't.nc_body.en': 'Our 2026 signature line: the mugunghwa in mother-of-pearl, shifting between jade and pink in the light.',
    't.lb_sub.ko': '2026 캠페인. 흑백 위에 자개의 옥빛만 남겼습니다.',
    't.lb_sub.en': 'Campaign 2026, in black and white with only the jade of mother-of-pearl.',

    /* 어바웃 */
    't.ah_l.ko': '윤슬은 물 위에 반짝이는 빛에서 이름을 얻었습니다. 한국의 아름다움도 매일의 순간에 머물러야 한다고 믿습니다.',
    't.ah_l.en': 'Yunseul is named for light glinting on water. We believe Korean beauty belongs to every day.',
    't.ah_r.ko': '할머니의 가락지, 한옥의 처마, 나전칠기의 자개를 오늘의 옷차림 위로 옮깁니다.',
    't.ah_r.en': 'A grandmother’s ring, hanok eaves, mother-of-pearl inlay, carried into what you wear today.',
    't.about_symbol_body.ko': '이니셜 S와 전통 매듭 문양을 엮은 심볼입니다. 네 방향의 작은 삼각은 물 위로 흩어지는 빛을 뜻합니다.',
    't.about_symbol_body.en': 'The initial S woven like a traditional knot. The four small triangles are light scattering on water.',
    't.motifs.0.ko.1': '가구 가장자리를 장식하던 아자(亞字) 문양. 패키지와 카드의 테두리로 씁니다.',
    't.motifs.0.en.1': 'The 亞-shaped lattice from traditional furniture, used to frame our packaging and cards.',
    't.motifs.1.ko.1': '수면 위 빛의 흐름을 수평 선의 레이어로 담았습니다.',
    't.motifs.1.en.1': 'The flow of light on water, drawn as layered horizontal lines.',
    't.motifs.2.ko.1': '반원이 겹겹이 이어지는 전통 물결 문양. 상자 안감과 포장지에 씁니다.',
    't.motifs.2.en.1': 'Overlapping arcs of a traditional wave, inside our boxes and on our paper.',

    /* 컬렉션 */
    't.cols_lead.ko': '꽃, 처마, 가락지에서 시작한 세 가지 이야기.',
    't.cols_lead.en': 'Three stories, from a flower, an eave and a ring.',
    'c:mugunghwa.story.ko': '한국의 꽃 무궁화를 자개로 피워낸 윤슬의 시그니처 컬렉션입니다. 빛의 각도에 따라 색이 바뀌는 자개로 물 위의 반짝임을 담았습니다.',
    'c:mugunghwa.story.en': 'Our signature collection: the mugunghwa in mother-of-pearl, whose color shifts with the light like ripples on water.',
    'c:cheoma.story.ko': '한옥 지붕 끝이 살짝 들리는 처마의 곡선에서 시작했습니다. 무광 면과 유광 가장자리가 움직일 때마다 다른 빛을 냅니다.',
    'c:cheoma.story.en': 'Shaped by the gentle lift of hanok eaves. Matte faces and polished edges catch the light as you move.',
    'c:gyeopgyeol.story.ko': '두 고리를 함께 끼는 전통 가락지에서 온 반지 세트입니다. 잔물결의 ‘잔결’과 빛의 흐름을 담은 ‘빛결’을 따로, 또 겹쳐 낄 수 있습니다.',
    'c:gyeopgyeol.story.en': 'A ring set from the traditional double garakji. Wear Jangyeol and Bitgyeol alone or stacked.',

    /* 제품 상세 */
    't.pd_finish.ko': '도금',
    't.pd_finish.en': 'Plating',
    't.gold.ko': '골드',
    't.gold.en': 'Gold',
    'p:mg-necklace.summary.ko': '꽃잎마다 자개를 감입한 펜던트 목걸이. 빛에 따라 옥빛과 분홍빛이 비칩니다.',
    'p:mg-necklace.summary.en': 'Mother-of-pearl set in every petal, shifting between jade and pink.',
    'p:mg-earring.summary.ko': '담수 진주 아래로 자개 무궁화가 흔들리는 드롭 귀걸이.',
    'p:mg-earring.summary.en': 'A mother-of-pearl flower swaying beneath a freshwater pearl.',
    'p:mg-bangle.summary.ko': '양 끝에 무궁화와 둥근 자개를 단 오픈 뱅글.',
    'p:mg-bangle.summary.en': 'An open bangle with a flower at one end and a pearl disc at the other.',
    'p:mg-long.summary.ko': '큰 무궁화 펜던트를 길게 늘어뜨린 롱 목걸이.',
    'p:mg-long.summary.en': 'A larger flower pendant on a long chain.',
    'p:cm-necklace.summary.ko': '처마 끝처럼 양 끝이 살짝 들린 바 목걸이.',
    'p:cm-necklace.summary.en': 'A bar necklace that lifts at both ends, like eaves.',
    'p:cm-bracelet.summary.ko': '가는 체인 위에 작은 처마 곡선을 올린 팔찌.',
    'p:cm-bracelet.summary.en': 'A small eave curve on a fine chain.',
    'p:gy-bitgyeol.summary.ko': '유광으로 빛의 흐름을 담은 물결 반지.',
    'p:gy-bitgyeol.summary.en': 'A polished band that waves like flowing light.',
    'p:gy-set.summary.ko': '잔결과 빛결 한 쌍. 따로 살 때보다 11,000원 저렴합니다.',
    'p:gy-set.summary.en': 'Jangyeol and Bitgyeol as a pair, ₩11,000 less than buying both.',
    't.pd_care_body.ko': '자개는 물과 열에 약해요. 샤워·수영 전에는 빼두고, 파우치에 따로 보관하세요.',
    't.pd_care_body.en': 'Mother-of-pearl dislikes water and heat. Take it off to shower or swim, and keep it in its pouch.',
    't.pd_shipping_body.ko': '평일 오후 2시 전 주문은 당일 출고되며, 기프트 박스에 담아 보내드립니다.',
    't.pd_shipping_body.en': 'Order by 2 p.m. KST on weekdays to ship the same day, in our gift box.',

    /* 기프트 */
    't.gift_pack.0.ko.1': '전통 보자기를 현대적으로 풀어낸 패키지. 블랙 보자기에 옥색·골드 노리개를 더했습니다.',
    't.gift_pack.0.en.1': 'A black bojagi cloth tied with a jade or gold norigae tassel.',
    't.gift_pack.1.ko.1': '모티브 일러스트와 이야기를 담은 카드가 제품마다 함께 갑니다.',
    't.gift_pack.1.en.1': 'Every piece comes with a card carrying its motif and story.',
    't.gift_pack.2.ko.1': '윤슬의 기준으로 검수한 제품임을 보증하며, 결함이 있으면 수선·교환해드립니다.',
    't.gift_pack.2.en.1': 'Certifies the piece meets our standards. Defects are repaired or exchanged.',

    /* 저널 */
    'x:0.body.ko': '세 컬렉션을 영감이 된 전통 장신구와 나란히 놓는 전시. 스케치부터 완성품까지 보고, 마지막에 직접 착용해볼 수 있습니다.',
    'x:0.body.en': 'Our collections beside the ornaments that inspired them, from sketch to finished piece. Try everything on at the end.',
    'e:0.body.ko': '전시장에서 스탬프를 받으면 무궁화 자개 엽서를 드립니다. 하루 100장 한정.',
    'e:0.body.en': 'Get your stamp at the exhibition for a mugunghwa postcard. 100 a day.',
    'e:1.body.ko': '겹결 반지 안쪽에 이니셜이나 날짜를 8자까지 무료로 새겨드립니다.',
    'e:1.body.en': 'Free engraving inside Gyeopgyeol rings, up to 8 characters.',
    'e:2.body.ko': '12월 한 달, 모든 주문을 금빛 물결 포장지로 감싸 보내드립니다.',
    'e:2.body.en': 'All December orders come wrapped in gold wave-pattern paper.',

    /* 고객 안내 */
    't.faq.0.ko.1': '잠깐은 괜찮지만 오래 젖으면 광택이 흐려져요. 바로 마른 천으로 닦아주세요.',
    't.faq.0.en.1': 'A splash is fine; long exposure dulls the shine. Dry it right away.',
    't.faq.1.ko.1': '평소 끼는 반지의 안쪽 지름을 재서 아래 표와 비교하세요. 애매하면 큰 쪽을 추천해요.',
    't.faq.1.en.1': 'Measure a ring you wear and compare with the chart below. Between sizes, go up.',
    't.faq.4.ko.1': '실버는 자연스럽게 어두워질 수 있어요. 구매 후 1년간 무료로 세척해드립니다.',
    't.faq.4.en.1': 'Silver darkens with air. We clean it free for a year after purchase.',
    't.acc_lead.ko': '로그인하고 주문과 배송 상태를 확인하세요.',
    't.acc_lead.en': 'Sign in to see your orders and delivery status.'
  };

  const roots = { 't': () => YS.t, 'p': () => YS.products, 'c': () => YS.collections, 'x': () => YS.exhibitions, 'e': () => YS.events };
  function locate(path) {
    const m = path.match(/^(\w)[.:]([^.]+)\.(.+)$/);
    let obj = roots[m[1]]();
    let first = m[2];
    if (m[1] === 'p' || m[1] === 'c') obj = obj.find((o) => o.id === first); else obj = obj[first];
    const keys = m[3].split('.');
    const last = keys.pop();
    for (const k of keys) { if (!obj) return null; obj = obj[k]; }
    return obj && last in obj ? [obj, last] : null;
  }

  const orig = {};
  let on = false;
  YS.mobile = function (want) {
    if (want === on) return false;
    for (const path in M) {
      const hit = locate(path); if (!hit) continue;
      const [o, k] = hit;
      if (want) { orig[path] = o[k]; o[k] = M[path]; } else if (path in orig) { o[k] = orig[path]; }
    }
    on = want;
    return true;
  };
})();
