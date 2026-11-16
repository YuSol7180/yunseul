/* 윤슬 YUN:SEUL — app.js
   Hash router (#home, #shop, #about, #journal, #contact, #account, #mugunghwa, #p-mg-necklace …),
   KR/EN switching, bag drawer, hero "light on water" canvas. */
(function () {
  'use strict';

  /* ---------- state ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('ys_' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ys_' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  let lang = store.get('lang', 'ko');
  let bag = store.get('bag', []);
  let heroCleanup = null;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const app = $('#app');

  /* ---------- i18n ---------- */
  const t = (k) => { const v = YS.t[k]; return v ? (v[lang] ?? v.ko) : k; };
  const L = (o) => (o && typeof o === 'object' ? (o[lang] ?? o.ko) : o);
  const won = (n) => (lang === 'ko' ? n.toLocaleString('ko-KR') + '원' : '₩' + n.toLocaleString('en-US'));
  const IMG = (n) => 'assets/img/' + n + '.jpg';
  const img = (n, alt = '', eager) => `<img src="${IMG(n)}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

  const byId = (id) => YS.products.find((p) => p.id === id);
  const colById = (id) => YS.collections.find((c) => c.id === id);
  const productsOf = (cid) => YS.products.filter((p) => p.collection === cid);

  /* ---------- shared SVG ---------- */
  const SYMBOL_SOLID = (cls = '') => `<svg class="${cls}" viewBox="1148 598 278 256" aria-hidden="true"><use href="#sym-solid"/></svg>`;
  const WAVE_SVG = (stroke = '#A7D7B2', bg = '#111111', id = 'wv') => `
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><pattern id="${id}" width="40" height="20" patternUnits="userSpaceOnUse">
        ${[[0, 10], [40, 10], [20, 20], [0, 30], [40, 30]].map(([x, y]) => [19, 14, 9, 4].map((r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${bg}" stroke="${stroke}" stroke-width="1.2"/>`).join('')).join('')}
      </pattern></defs>
      <rect width="400" height="300" fill="url(#${id})"/>
    </svg>`;

  function injectSymbolDefs() {
    const holder = document.createElement('div');
    holder.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><g id="sym-solid">${YS.sym.solid}</g><g id="sym-line">${YS.sym.line}</g></defs></svg>`;
    document.body.prepend(holder.firstChild);
  }

  /* ---------- 310 안삼열 lettering (outlined SVG from js/type.js) ---------- */
  function TYPE(key, cls = '') {
    const t = YS.type && YS.type[key]; if (!t) return '';
    const [x, y, w, h] = t.vb;
    return `<svg class="type ${cls}" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="xMinYMid meet" style="--h:${h};--em:${t.em}" aria-hidden="true" focusable="false"><g fill="currentColor" stroke="currentColor" stroke-width="${t.sw}">${t.p.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`;
  }
  const TT = (key, label, cls = '') => `${TYPE(key, cls)}<span class="sr">${label}</span>`;
  const colType = (c, size) => TT((lang === 'ko' ? 'ko_col_' : 'en_col_') + c.id + (size === 'full' ? (lang === 'ko' ? '_full' : '_caps') : ''), L(c.name), size === 'full' && lang === 'en' ? 'caps' : '');

  /* ---------- components ---------- */
  const BAG_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12.5H6L5 8Z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg>';
  const LINE_SYMBOL = (cls = '') => `<svg class="${cls}" viewBox="432 597 274 260" aria-hidden="true"><use href="#sym-line"/></svg>`;
  const catById = (id) => YS.categories.find((c) => c.id === id);

  // hover (model) shots whose subject sits off-centre in a square crop
  const ALT_FOCUS = { 'mg-necklace-model': '50% 24%', 'mg-hand-dark': '50% 82%' };
  function productCard(p) {
    const alt = p.images[1] ? `<img class="alt" src="${IMG(p.images[1])}" alt="" loading="lazy" decoding="async"${ALT_FOCUS[p.images[1]] ? ` style="object-position:${ALT_FOCUS[p.images[1]]}"` : ''}>` : '';
    return `<article class="pcard">
      <a class="pcard-media" href="#p-${p.id}" tabindex="-1" aria-hidden="true">${img(p.images[0], '')}${alt}${p.isNew ? `<span class="badge">${t('new_badge')}</span>` : ''}</a>
      <button type="button" class="quick-add" data-add="${p.id}" aria-label="${t('quick_add')}: ${L(p.name)}">${BAG_SVG}</button>
      <a class="pcard-body" href="#p-${p.id}">
        <h3 class="pcard-name">${L(p.name)}</h3>
        <p class="pcard-short">${L(p.short)}</p>
        <p class="pcard-spec">${L(p.spec)}</p>
        <p class="price">${won(p.price)}</p>
      </a>
    </article>`;
  }
  const crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb">${items.map(([label, href], i) => href && i < items.length - 1 ? `<a href="${href}">${label}</a>` : `<span aria-current="page">${label}</span>`).join('<span class="sep" aria-hidden="true">/</span>')}</nav>`;
  const fmtDate = (s) => s.replace(/-/g, '.');
  const fmtRange = (a, b) => `${fmtDate(a)} – ${b.slice(0, 4) === a.slice(0, 4) ? fmtDate(b).slice(5) : fmtDate(b)}`;
  function status(start, end, kind) {
    const now = new Date(), s = new Date(start + 'T00:00:00+09:00'), e = new Date(end + 'T23:59:59+09:00');
    if (now < s) return { cls: 'up', label: t(kind === 'ex' ? 'st_upcoming' : 'st_upcoming_ev').replace('{d}', Math.ceil((s - now) / 864e5)) };
    if (now <= e) return { cls: 'live', label: t('st_live') };
    return { cls: 'end', label: t('st_ended') };
  }

  // Lookbook slider photos: [large, medium, small] per slide; slides alternate two layouts.
  const LBS_SLIDES = [
    ['model-bite', 'kv-pink', 'mg-hand-vertical'],
    ['model-curtain', 'mg-earring-light', 'model-earring-blue'],
    ['kv-daffodil-bw', 'mg-necklace-light', 'model-bangle'],
    ['mg-necklace-worn', 'mg-earring-calla', 'kv-branch']
  ];

  /* =========================================================
     PAGES
     ========================================================= */
  const pages = {};

  pages.home = () => {
    const best = YS.products.filter((p) => p.best).sort((x, y) => x.best - y.best).slice(0, 4);
    return `
    ${heroHTML()}

    <section class="bd on-light" aria-labelledby="bdTitle">
      <div class="bd-inner">
        <div class="bd-text">
          <h2 class="bd-title rise" id="bdTitle">${TT(lang + '_yunseul', t('intro_word'))}</h2>
          <p class="bd-def">${TT(lang + '_def', t('intro_def'))}</p>
          <p class="bd-body">${t('intro_body')}</p>
          <p class="bd-body">${t('about_lead')}</p>
          <a class="bd-link rise" href="#about">${t('intro_link')}</a>
        </div>
        <div class="bd-media">
          <div class="bd-big">${img('model-sitting', '')}</div>
          <div class="bd-small" data-parallax>${img('model-earring-blue', '')}</div>
        </div>
      </div>
    </section>

    <section class="nc on-light" aria-labelledby="ncTitle">
      <div class="nc-mhead"><div><p class="nc-eyebrow">NEW COLLECTION</p><h2 class="nc-mtitle">${colType(colById('mugunghwa'))}<small>NEW</small></h2></div><a class="nc-mall" href="#mugunghwa">${t('nc_all')}</a></div>
      <div class="nc-head">
        ${LINE_SYMBOL('nc-symbol')}
        <h2 class="nc-title" id="ncTitle">${TT('ch_nc', t('nc_eyebrow'))}</h2>
        <p class="nc-body">${t('nc_body')}</p>
      </div>
      <div class="pgrid nc-grid">${productsOf('mugunghwa').filter((p) => p.id !== 'mg-long').slice(0, 3).map(productCard).join('')}</div>
      <p class="nc-more"><a class="link-line" href="#mugunghwa">${t('nc_more')}</a></p>
    </section>

    <section class="kv-full" aria-label="${t('kv_caption')}">
      <div class="ph">${img('kv-main', '')}</div>
    </section>

    <section class="section on-light best">
      <div class="wrap">
        <div class="shop-head"><h2 class="h-section page-type">${TT('en_BESTSELLERS', t('best_heading'))}</h2><a class="link-line" href="#shop-best">${t('best_more')}</a></div>
        <div class="pgrid">${best.map(productCard).join('')}</div>
      </div>
    </section>

    <section class="lbs on-light" aria-labelledby="lbsTitle">
      <h2 class="lbs-title aos-up" id="lbsTitle" style="font-size:min(2.64vw, calc((100vw - 2 * var(--gutter)) / ${YS.lbMaxEm.en}))">
        ${[1, 2, 3, 4].map((n) => `<span class="ln">${TYPE('lb_en_' + n)}</span>`).join('')}
        <span class="sr" lang="en">${YS.lbLines.en.join(' ')}</span>
      </h2>
      <div class="lbs-slider" data-marquee aria-label="${t('j_lookbook')}">
        ${LBS_SLIDES.map((s, i) => `<div class="lbs-slide ${i % 2 ? 'var2' : ''}" data-item>${s.map((n, k) => `<div class="lbs-img i${k + 1}">${img(n, '')}</div>`).join('')}</div>`).join('')}
      </div>
      <p class="lbs-more"><a class="link-line" href="#journal-lookbook">${t('lb_link')}</a></p>
    </section>`;
  };

  pages.about = () => `
    <div id="ahSlot">${aboutHero()}</div>

    <section class="section on-light kw-sec" id="kwSec">${kwInner()}</section>

    <section class="section">
      <div class="wrap symbol-row">
        <div class="symbol-tile"><svg viewBox="432 597 274 260" aria-label="Symbol, line type"><use href="#sym-line"/></svg></div>
        <div class="symbol-tile">${SYMBOL_SOLID()}</div>
        <div style="display:grid;gap:20px">
          <h2 class="h-sub about-h">${lang === 'ko' ? TT('ko_symbol', t('about_symbol_title')) : t('about_symbol_title')}</h2>
          <p class="body-copy">${t('about_symbol_body')}</p>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <h2 class="h-sub about-h" style="margin-bottom:48px">${lang === 'ko' ? TT('ko_motif', t('about_motif_title')) : t('about_motif_title')}</h2>
        <div class="motif-grid">
          ${YS.t.motifs.map((m, i) => `<div>
            <div class="motif-swatch ${m.id}">${m.id === 'ajamun' ? '<span class="frame-corner tl"></span><span class="frame-corner br"></span>' : ''}${m.id === 'wave' ? WAVE_SVG() : ''}</div>
            <h3>${TT('ch_mo_' + lang + '_' + i, L(m)[0])}</h3><p>${L(m)[1]}</p></div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="wrap">
        <h2 class="h-sub about-h" style="margin-bottom:48px">${lang === 'ko' ? TT('ko_color', t('about_color_title')) : t('about_color_title')}</h2>
        <div class="swatches">
          <div class="swatch" style="background:#111;border:1px solid var(--line)"><b>Black</b>#111111</div>
          <div class="swatch" style="background:#A7D7B2;color:#111"><b>Jade Green</b>#A7D7B2</div>
          <div class="swatch" style="background:#C9A24A;color:#111"><b>Gold</b>#C9A24A</div>
          <div class="swatch iri"><b>Iridescent</b>${lang === 'ko' ? '자개빛' : 'Mother-of-pearl'}</div>
        </div>
      </div>
    </section>`;




  /* HOME hero — 모델컷 + 처마 곡선 (확정안) */
  let heroWaterStop = null;
  function heroHTML() {
    const slogan = [1, 2].map((n) => `<span class="ln"><span>${TYPE(lang + '_slogan_' + n)}</span></span>`).join('') + `<span class="sr">${t('hero_slogan').replace('<br>', ' ')}</span>`;
    const side = `<div class="he-side"><p class="hero-sub">${t('hero_sub')}</p><a class="link-line he-link" href="#collection">${t('hero_cta')} →</a></div>`;
    // 왼쪽 위 물결 + 끝이 들린 처마 곡선
    const curves = ['M-40 120 C 260 230, 700 190, 1000 -30', 'M500 940 C 1000 860, 1340 770, 1470 280'];
    const lines = `<svg class="he-lines" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">${curves.map((d) => `<path d="${d}"/>`).join('')}</svg>`;
    const unit = `<span>Korean beauty, in the everyday</span><i></i><span>YUN:SEUL</span><i></i><span>오래된 아름다움이 오늘에 닿다</span><i></i>`;
    const band = `<div class="he-band he-band--ticker" aria-hidden="true"><div class="he-track">${[0, 1].map(() => `<div class="he-grp">${unit.repeat(4)}</div>`).join('')}</div></div>`;
    return `<section class="hero hero-reveal hero--m hero--ed he-c1 he-t2" aria-label="YUN:SEUL">
      <div class="hm-ph">${img('hero-model', L(YS.products[0].name), true)}</div>
      ${lines}
      <div class="he-bottom"><h1 class="hero-slogan">${slogan}</h1>${side}</div>
      ${band}
    <canvas class="hero-canvas" aria-hidden="true"></canvas></section>`;
  }
  function bindHero() {
    const hero = $('.hero'); if (!hero) return;
    if (heroWaterStop) heroWaterStop();
    heroWaterStop = startWater(hero);
  }

  /* ABOUT 첫 화면 — 물 위의 빛: 일렁이는 물빛 + 반짝임, 스크롤하면 액자로 줄어듦 */
  let ahCleanup = null;
  function aboutHero() {
    const nv = true;
    const ttl = `<h1 class="ah-title ah-slogan">${lang === 'ko' ? `<span class="ln">${TYPE('ko_slogan_1')}</span><span class="ln">${TYPE('ko_slogan_2')}</span><span class="sr">한국의 아름다움을 일상 속에서</span>` : `<span class="ln">${TYPE('en_about_slogan')}</span><span class="sr">Korean beauty, in the everyday</span>`}</h1>`;
    const def = nv ? (lang === 'ko' ? '햇빛에 비친 잔물결처럼, 매일의 순간에 스며드는 빛' : 'like sunlight on a ripple, a light that settles into every day') : (lang === 'ko' ? '햇빛이나 달빛에 비치어 반짝이는 잔물결' : 'the ripple that glitters under sun or moonlight');
    const lt = nv ? t('ah_l'): t('about_lead');
    const rt = nv ? t('ah_r'): t('intro_body');
    return `<section class="ah ah-a${nv ? ' ah-new' : ''} on-light">
      <div class="aha-stage">
        <div class="aha-img">${img('lb-water', '', true)}<canvas class="aha-gl" aria-hidden="true"></canvas>${nv ? `<img class="aha-day" src="${IMG('daily-necklace')}" alt="" decoding="async">` : ''}<canvas class="aha-glint" aria-hidden="true"></canvas></div>
        <div class="aha-title">${ttl}<p class="aha-def"><span>${lang === 'ko' ? '윤슬' : 'yun·seul'}</span><i></i>${def}</p></div>
        <p class="aha-l lead">${nv ? lt.replace(/([.!?])\s+(?=\S)/g, '$1<br>') : lt}</p>
        <p class="aha-r body-copy">${nv ? rt.replace(/([.!?])\s+(?=\S)/g, '$1<br>') : rt}</p>
        <p class="aha-hint">SCROLL</p>
      </div>
    </section>`;
  }
  function bindAboutHero(slot) {
    if (ahCleanup) { ahCleanup(); ahCleanup = null; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offs = [];
    const onScroll = (fn) => { let raf = 0; const h = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; fn(); }); }; window.addEventListener('scroll', h, { passive: true }); window.addEventListener('resize', h); fn(); offs.push(() => { window.removeEventListener('scroll', h); window.removeEventListener('resize', h); cancelAnimationFrame(raf); }); };
    {
      const sec = $('.ah-a', slot), st = $('.aha-stage', sec), im = $('.aha-img', sec);
      let prog = 0;
      // 윤슬 — 물결 왜곡(WebGL) + 반짝이는 빛 알갱이(canvas). 마우스가 움직이면 커서 주변에 물결이 번지고 더 반짝임
      if (!reduce) {
        const cv = $('.aha-glint', sec), ctx = cv.getContext('2d'), wc = $('.aha-gl', sec), photo = $('img', im);
        let W = 0, H = 0, dpr = 1, gs = [], raf = 0, en = 0, px = -9999, py = -9999, lx = 0, ly = 0, lt = 0;
        // WebGL water
        let gl = null, prg = null, U = {}, ready = false;
        try { gl = wc.getContext('webgl', { antialias: false, premultipliedAlpha: false }); } catch (e) { gl = null; }
        if (gl) {
          const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
          prg = gl.createProgram();
          gl.attachShader(prg, sh(gl.VERTEX_SHADER, 'attribute vec2 a;varying vec2 v;void main(){v=a*.5+.5;gl_Position=vec4(a,0.,1.);}'));
          gl.attachShader(prg, sh(gl.FRAGMENT_SHADER, `precision mediump float;varying vec2 v;uniform sampler2D tx;uniform vec2 res,isz,m;uniform float t,e;
            void main(){float ra=res.x/res.y,ia=isz.x/isz.y;vec2 sc=ra>ia?vec2(1.,ia/ra):vec2(ra/ia,1.);vec2 p=v*res;
            float w=sin(p.y*.017+t*.9+sin(p.x*.004+t*.3)*2.)*.5+sin(p.x*.010-t*.6+p.y*.005)*.5;
            vec2 off=vec2(w*.006,cos(p.x*.013+t*.75+p.y*.003)*.004);
            vec2 d=p-m;float r=length(d);float rp=sin(r*.055-t*6.)*exp(-r*.0065)*e;off+=d/(r+1.)*rp*.02;
            vec4 c=texture2D(tx,(v-.5)*sc+.5+off);float sp=pow(max(0.,w),8.)*.10+max(0.,rp)*.10;gl_FragColor=vec4(c.rgb+sp,1.);}`));
          gl.linkProgram(prg);
          if (gl.getProgramParameter(prg, gl.LINK_STATUS)) {
            gl.useProgram(prg);
            const bf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, bf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
            const al = gl.getAttribLocation(prg, 'a'); gl.enableVertexAttribArray(al); gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0);
            ['res', 'isz', 'm', 't', 'e'].forEach((k) => { U[k] = gl.getUniformLocation(prg, k); });
            const up = () => {
              try {
                const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, photo);
                [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.uniform2f(U.isz, photo.naturalWidth, photo.naturalHeight); ready = !gl.getError(); if (ready) im.classList.add('gl-on');
              } catch (e) { ready = false; }
            };
            if (photo.complete && photo.naturalWidth) up(); else photo.addEventListener('load', up, { once: true });
          }
        }
        const build = () => {
          dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = st.clientWidth; H = st.clientHeight;
          cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          if (gl) { wc.width = W; wc.height = H; gl.viewport(0, 0, W, H); }
          const n = Math.round(W * H / 5200);
          gs = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: .6 + Math.random() * 1.8, ph: Math.random() * 6.28, sp: .0012 + Math.random() * .0026, dx: (Math.random() - .5) * .05 }));
        };
        build(); window.addEventListener('resize', build);
        const mv = (e) => { const r = st.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, now = performance.now(); if (lt) { const v = Math.hypot(x - lx, y - ly) / Math.max(8, now - lt); en = Math.min(1, en + v * 0.05); } lx = x; ly = y; lt = now; px = x; py = y; };
        st.addEventListener('pointermove', mv);
        st.addEventListener('pointerleave', () => { lt = 0; });
        const frame = (t) => {
          raf = requestAnimationFrame(frame);
          if (prog > 0.6) { cv.style.opacity = '0'; return; }
          cv.style.opacity = String(1 - prog / 0.6);
          en *= 0.975;
          if (ready) { gl.uniform2f(U.res, W, H); gl.uniform2f(U.m, px, H - py); gl.uniform1f(U.t, t / 1000); gl.uniform1f(U.e, en); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
          ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = 'lighter';
          for (const g of gs) {
            g.x += g.dx; if (g.x < 0) g.x += W; else if (g.x > W) g.x -= W;
            let a = Math.pow(Math.max(0, Math.sin(t * g.sp + g.ph)), 8);
            const d2 = (g.x - px) ** 2 + (g.y - py) ** 2, near = Math.exp(-d2 / (2 * 190 * 190));
            a = Math.min(1, a * (0.55 + near * (1.4 + en * 3)));
            if (a < 0.03) continue;
            const L = g.r * (3 + a * 5);
            ctx.strokeStyle = `rgba(255,255,255,${(a * 0.9).toFixed(3)})`; ctx.lineWidth = g.r * 0.45;
            ctx.beginPath(); ctx.moveTo(g.x - L, g.y); ctx.lineTo(g.x + L, g.y); ctx.moveTo(g.x, g.y - L * .55); ctx.lineTo(g.x, g.y + L * .55); ctx.stroke();
            ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`; ctx.beginPath(); ctx.arc(g.x, g.y, g.r * (0.6 + a * .8), 0, 6.283); ctx.fill();
          }
        };
        raf = requestAnimationFrame(frame);
        offs.push(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', build); try { gl && gl.getExtension('WEBGL_lose_context') && gl.getExtension('WEBGL_lose_context').loseContext(); } catch (e) {} });
      }
      onScroll(() => {
        const r = sec.getBoundingClientRect(), span = sec.offsetHeight - window.innerHeight;
        const p = reduce ? 1 : Math.min(1, Math.max(0, -r.top / (span * 0.75))); prog = p;
        const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const narrow = window.innerWidth < 760;
        const ix = (narrow ? 8 : 34) * e, iy = 12 * e;
        const isNew = sec.classList.contains('ah-new');
        const cT = narrow ? 31 : 39, cB = narrow ? 36 : 4; // 모바일: 액자를 화면 가운데 위쪽에, 글은 아래로
        im.style.clipPath = isNew ? `inset(${(cT * e).toFixed(2)}% ${ix}% ${(cB * e).toFixed(2)}% ${ix}%)` : `inset(${iy}% ${ix}% ${iy}% ${ix}%)`;
        if (isNew) $('.aha-title', sec).style.transform = `translate(-50%, calc(-50% - ${((narrow ? 27 : 23) * e).toFixed(2)}vh)) scale(${(1 - (narrow ? 0.4 : 0.45) * e).toFixed(4)})`;
        { const tf = `scale(${1.12 - 0.12 * e})`; $('img', im).style.transform = tf; $('.aha-gl', im).style.transform = tf; }
        st.style.setProperty('--p', e.toFixed(3));
        st.classList.toggle('done', p > 0.82);
        const day = $('.aha-day', im); if (day) { const q = Math.min(1, Math.max(0, (e - 0.35) / 0.45)); day.style.opacity = (q * q * (3 - 2 * q)).toFixed(3); Object.assign(day.style, { left: ix + '%', top: (cT * e).toFixed(2) + '%', width: (100 - 2 * ix).toFixed(2) + '%', height: (100 - (cT + cB) * e).toFixed(2) + '%' }); day.style.transform = narrow ? `scale(${(1.3 - 0.15 * e).toFixed(4)})` : `scale(${(1.45 - 0.2 * e).toFixed(4)}) translateX(-2.9%)`; }
      });
    }
    ahCleanup = () => offs.forEach((f) => f && f());
  }

  /* ABOUT · 윤슬이 지키는 다섯 가지 — 펼쳐지는 세로 사진 패널 */
  const KW_IMG = ['kw-tradition', 'mg-necklace-angle', 'kw-beauty', 'kw-heritage', 'model-turtleneck'];
  const KW_POS = ['50% 45%', '50% 50%', '36% 55%', '48% 50%', '50% 50%'];
  function kwInner() {
    const title = `<h2 class="h-section about-h page-type">${lang === 'ko' ? `<span class="ln">${TYPE('ko_kw_1')}</span><span class="ln">${TYPE('ko_kw_2')}</span>` : `<span class="ln">${TYPE('en_kw')}</span>`}<span class="sr">${t('about_kw_title')}</span></h2>`;
    return `<div class="wrap kwc">${title}
      <div class="kwc-row">${YS.t.kw.map((k, i) => `<button type="button" class="kwc-p${i ? '' : ' on'}" data-i="${i}" aria-expanded="${!i}"><img src="${IMG(KW_IMG[i])}" alt="" loading="lazy" decoding="async" style="object-position:${KW_POS[i]}"><span class="kwc-v">${L(k)[0]}</span><span class="kwc-t"><strong>${TT('ch_kw_' + lang + '_' + i, L(k)[0])}</strong><span${i === 4 ? ' style="white-space:nowrap;max-width:none"' : ''}>${lang === 'ko' && i === 3 ? L(k)[1].replace('소재와 ', '소재와<br>') : L(k)[1]}</span></span></button>`).join('')}</div>
    </div>`;
  }
  function bindKw(sec) {
    const ps = $$('.kwc-p', sec), row = $('.kwc-row', sec);
    // every photo keeps the width of an OPEN panel, so opening/closing only reveals more or less of it — no zoom
    const fit = () => { const w = row.clientWidth, gap = 8, n = ps.length; row.style.setProperty('--kwc-w', ((w - gap * (n - 1)) * 2.6 / (2.6 + n - 1)).toFixed(1) + 'px'); };
    fit(); window.addEventListener('resize', fit);
    const act = (p) => ps.forEach((x) => { x.classList.toggle('on', x === p); x.setAttribute('aria-expanded', x === p); });
    // hover intent: switch only when the pointer rests on a panel (~0.22s), so sweeping across doesn't flip every photo
    let hv = 0;
    ps.forEach((p) => {
      p.addEventListener('mouseenter', () => { clearTimeout(hv); hv = setTimeout(() => act(p), 220); });
      p.addEventListener('mouseleave', () => clearTimeout(hv));
      p.addEventListener('focus', () => act(p)); p.addEventListener('click', () => { clearTimeout(hv); act(p); });
    });
  }

  /* SHOP — one list template for All / Best / each category */
  let shopSort = 'rec', shopFilter = 'all';
  function shopItems(filter) {
    let list = YS.products.slice();
    if (filter === 'best') list = list.filter((p) => p.best).sort((x, y) => x.best - y.best);
    else if (filter !== 'all') list = list.filter((p) => p.category === filter);
    if (shopSort === 'new') list.sort((x, y) => (y.isNew ? 1 : 0) - (x.isNew ? 1 : 0));
    if (shopSort === 'low') list.sort((x, y) => x.price - y.price);
    if (shopSort === 'high') list.sort((x, y) => y.price - x.price);
    return list;
  }
  const SHOP_TYPE = { best: 'en_BEST', necklace: 'en_NECKLACES', earring: 'en_EARRINGS', bracelet: 'en_BRACELETS' };   // 310 안심열체 lettering
  function shopList(filter) {
    shopFilter = filter;
    const label = filter === 'all' ? null : filter === 'best' ? t('shop_best_tab') : L(catById(filter));
    const tabs = [['all', t('shop_all_tab'), '#shop'], ['best', t('shop_best_tab'), '#shop-best']].concat(YS.categories.map((c) => [c.id, L(c), '#shop-' + c.id]));
    const count = (id) => (id === 'all' ? YS.products.length : id === 'best' ? YS.products.filter((p) => p.best).length : YS.products.filter((p) => p.category === id).length);
    const items = shopItems(filter);
    return `
    <section class="section on-light page-top shop">
      <div class="wrap">
        ${label ? crumbs([['SHOP', '#shop'], [label]]) : ''}
        <div class="shop-top">
          <h1 class="h-section${!label || SHOP_TYPE[filter] ? ' page-type' : ''}">${!label ? TT('nav_shop', 'SHOP') : SHOP_TYPE[filter] ? TT(SHOP_TYPE[filter], label) : label}</h1>
          <p class="meta" id="shopCount">${t('count_items').replace('{n}', items.length)}</p>
        </div>
        <div class="shop-bar">
          <nav class="tabs" aria-label="Category">${tabs.map(([id, name, href]) => `<a href="${href}" ${id === filter ? 'aria-current="page"' : ''}>${name}<sup>${count(id)}</sup></a>`).join('')}</nav>
          <label class="sort"><span class="sort-lbl">${t('sort_label')}</span><span class="sort-cur" aria-hidden="true">${t('sort_' + shopSort)}</span>
            <select id="sortSel">${['rec', 'new', 'low', 'high'].map((s) => `<option value="${s}" ${s === shopSort ? 'selected' : ''}>${t('sort_' + s)}</option>`).join('')}</select>
          </label>
          <button type="button" class="shop-filter" id="shopFilterBtn" aria-haspopup="dialog"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M7 12h10M10 17h4"/></svg>${t('filter_label')}</button>
          <div class="fsheet" id="fSheet" hidden><div class="fsheet-bg" data-fclose></div><div class="fsheet-panel" role="dialog" aria-label="${t('filter_label')}"><div class="fsheet-head"><b>${t('filter_label')}</b><button type="button" data-fclose aria-label="${t('close')}">✕</button></div>${tabs.map(([id, name, href]) => `<a href="${href}" ${id === filter ? 'aria-current="page"' : ''}>${name}<sup>${count(id)}</sup></a>`).join('')}</div></div>
        </div>
        <div class="pgrid" id="shopGrid">${items.map(productCard).join('')}</div>
      </div>
    </section>`;
  }
  pages.shop = () => shopList('all');

  /* COLLECTION — brand stories, separate from shopping */
  pages.collection = () => `
    <section class="section page-top">
      <div class="wrap" style="margin-bottom:clamp(48px,7vw,96px)">
        <h1 class="h-section page-type">${TT('nav_collection', 'COLLECTION')}</h1>
        <p class="lead cols-lead" style="margin-top:20px">${t('cols_lead').replace(/([.!?])\s+(?=\S)/g, '$1<br>')}</p>
      </div>
      <div class="wrap col-list">
        ${YS.collections.map((c) => `
          <a class="col-card" href="#${c.id}">
            <div class="ph">${img(c.hero, L(c.name))}</div>
            <div class="col-card-info">
              <span class="col-card-name">${colType(c)} ${c.signature ? `<small>NEW</small>` : ''}</span>
              <span class="col-card-tag">${L(c.tagline)}</span>
            </div>
          </a>`).join('')}
      </div>
    </section>`;

  function collectionPage(c) {
    const idx = YS.collections.indexOf(c);
    const prev = YS.collections[(idx + 2) % 3], next = YS.collections[(idx + 1) % 3];
    return `
    <section class="col-hero col-hero--${c.id}${c.id === 'cheoma' ? ' on-light' : ''}">
      <div class="col-hero-copy">
        ${crumbs([['COLLECTION', '#collection'], [L(c.name)]])}
        <h1 class="col-title">${colType(c, 'full')}</h1>
        <p class="col-tag">${TT('ch_tag_' + c.id + '_' + lang, L(c.tagline))}</p>
        <p class="col-story">${L(c.story)}</p>
      </div>
      <div class="ph">${img(c.hero, L(c.name), true)}</div>
    </section>
    <section class="section on-light">
      <div class="wrap"><div class="pgrid">${productsOf(c.id).map(productCard).join('')}</div></div>
    </section>
    ${c.mood.length > 1 ? `<div class="col-mood">${c.mood.map((n) => `<div class="ph">${img(n, '')}</div>`).join('')}</div>` : ''}
    <nav class="col-nav on-light" aria-label="collections">
      ${[[prev, 'prev', lang === 'ko' ? '이전 컬렉션' : 'Previous'], [next, 'next', lang === 'ko' ? '다음 컬렉션' : 'Next']].map(([cc, dir, lab]) => `
      <a class="cn-${dir}" href="#${cc.id}">
        <span class="cn-thumb">${img(cc.hero, '')}</span>
        <span class="cn-text">
          <span class="cn-label">${dir === 'prev' ? '←' : ''} ${lab} ${dir === 'next' ? '→' : ''}</span>
          <span class="cn-name">${colType(cc)}</span>
          <span class="cn-tag">${L(cc.tagline)}</span>
        </span>
      </a>`).join('')}
    </nav>`;
  }

  function productPage(p) {
    const c = colById(p.collection);
    const related = productsOf(c.id).filter((x) => x.id !== p.id);
    const sizes = Array.from({ length: 11 }, (_, i) => i + 7);
    return `
    <section class="section on-light page-top">
      <div class="wrap pd">
        <div class="pd-swipe" data-swipe><div class="pd-swipe-track">${p.images.map((n, i) => `<div class="pd-swipe-item">${img(n, i ? '' : L(p.name), i === 0)}</div>`).join('')}</div>
          ${p.images.length > 1 ? `<div class="pd-dots" aria-hidden="true">${p.images.map((_, i) => `<i${i ? '' : ' class="on"'}></i>`).join('')}</div>` : ''}</div>
        <div class="pd-gallery">
          <div class="pd-thumbs">${p.images.map((n, i) => `<button type="button" data-img="${n}" aria-current="${i === 0}" aria-label="${i + 1}">${img(n, '')}</button>`).join('')}</div>
          <div class="pd-main ph">${img(p.images[0], L(p.name), true)}</div>
        </div>
        <div class="pd-info">
          ${crumbs([['SHOP', '#shop'], [L(catById(p.category)), '#shop-' + p.category], [L(p.name)]])}
          <div class="pd-colrow"><a class="pd-col" href="#${c.id}">${L(c.name)}</a>${p.isNew ? '<span class="pd-new">NEW</span>' : ''}</div>
          <h1 class="pd-name">${L(p.name)}</h1>
          <p class="pd-price price" id="pdPrice">${won(p.price)}</p>
          <p class="pd-summary">${L(p.summary)}</p>
          <p class="pd-spec">${L(p.short)} · ${L(p.spec)}</p>
          <form class="pd-form" id="pdForm" novalidate>
            ${p.plating ? `<fieldset style="border:0;padding:0;margin:0"><legend class="field-label">${t('pd_finish')}</legend>
              <div class="pd-optrow"><span class="pd-optlbl" aria-hidden="true">${t('pd_finish')}</span><div class="chips">
                <label class="chip"><input type="radio" name="finish" value="silver" checked><span style="--dot:#d5d8da">${t('silver')}</span></label>
                <label class="chip"><input type="radio" name="finish" value="gold"><span style="--dot:#d6b469">${t('gold')}</span></label>
              </div></div></fieldset>` : ''}
            ${p.ring ? `<div><label class="field-label" for="ringSize">${t('pd_ringsize')}</label>
              <select class="select" id="ringSize" name="size"><option value="">${t('pd_choose')}</option>${sizes.map((s) => `<option value="${s}">${lang === 'ko' ? s + '호' : 'KR ' + s}</option>`).join('')}</select></div>` : ''}
            <label class="check"><input type="checkbox" name="msg"> ${t('pd_giftwrap')}</label>
            <p class="form-error" id="pdErr" aria-live="polite"></p>
            <div class="pd-actions">
              <button type="submit" class="btn">${t('pd_add')}</button>
              <button type="button" class="btn ghost" id="buyNow">${t('pd_buy')}</button>
            </div>
          </form>
          <div class="acc">
            <details open><summary>${t('pd_material')}</summary><p>${L(p.material)}</p></details>
            <details><summary>${t('pd_size')}</summary><p>${L(p.size)}</p></details>
            <details><summary>${t('pd_care')}</summary><p>${t('pd_care_body')}</p></details>
            <details><summary>${t('pd_shipping')}</summary><p>${t('pd_shipping_body')}</p></details>
          </div>
        </div>
      </div>
    </section>
    ${related.length ? `<section class="section on-light" style="padding-top:0">
      <div class="wrap"><div class="shop-head"><h2 class="h-sub">${t('pd_related')}</h2><a class="link-line" href="#${c.id}">${t('pd_back')}</a></div>
      <div class="pgrid">${related.map(productCard).join('')}</div></div>
    </section>` : ''}`;
  }

  pages.gift = () => `
    <section class="section page-top gift-top">
      <div class="wrap gift-hero">
        <div class="gift-copy">
          ${crumbs([['SHOP', '#shop'], ['GIFT']])}
          <h1 class="h-section gift-title${lang === 'ko' ? ' page-type' : ''}">${lang === 'ko' ? TT('ko_gift_title', t('gift_heading')) : t('gift_heading')}</h1>
          <p class="gift-lead" style="font-size:min(20px, calc((44vw - var(--gutter)) / ${YS.giftLeadMaxEm[lang]}))"><span class="ln">${TYPE('gift_lead_' + lang + '_1')}</span><span class="sr">${t('gift_lead1')}</span></p>
          <p class="body-copy gift-body">${t('gift_lead2')}<br>${t('gift_body')}</p>
        </div>
        <div class="box-visual jade-frame">
          <span class="frame-corner tl"></span><span class="frame-corner tr"></span><span class="frame-corner bl"></span><span class="frame-corner br"></span>
          ${SYMBOL_SOLID('lid')}
        </div>
      </div>
    </section>
    <section class="section gift-pack" style="padding-top:0">
      <div class="wrap">
        <h2 class="h-sub gift-sec-title">${lang === 'ko' ? TT('ko_gift_pack', t('gift_pack_title')) : t('gift_pack_title')}</h2>
        <ul class="pack-list">${YS.t.gift_pack.map((g, i) => `<li>
          <div class="pack-ph">${img(g.img, L(g)[0])}</div>
          <p class="pack-no">0${i + 1}</p>
          <h3>${L(g)[0]}</h3><p>${L(g)[1]}</p></li>`).join('')}</ul>
      </div>
    </section>
    <section class="section on-light gift-guide">
      <div class="wrap">
        <h2 class="gift-sec-title">${lang === 'ko' ? TT('ko_gift_guide', t('gift_guide_title')) : t('gift_guide_title')}</h2>
        ${YS.t.gift_tier.map((tier) => {
          const list = YS.products.filter((p) => (tier.min == null || p.price >= tier.min) && (tier.max == null || p.price < tier.max));
          return `<div class="tier"><h3 class="tier-h">${L(tier)}</h3><div class="pgrid">${list.map((p) => productCard(p)).join('')}</div></div>`;
        }).join('')}
      </div>
    </section>`;

  /* JOURNAL — Exhibitions / Events / Lookbook */
  // Exhibition entry — layout after jurijewelry.com/blog: sticky left column (thumbnail + summary, address, dates),
  // right column with an image slider (‹ 1/3 ›), large title, uppercase subtitle, body and a link.
  function exhibitionBlock(x) {
    const st = status(x.start, x.end, 'ex');
    const g = x.gallery || [{ src: x.poster }];
    const slide = (it, i) => `<figure class="exs-item" style="${it.bg ? `background:${it.bg};` : ''}" aria-roledescription="slide" aria-label="${i + 1} / ${g.length}">
        <img src="${IMG(it.src)}" alt="${it.alt ? L(it.alt) : ''}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async" style="${it.fit ? `object-fit:${it.fit};` : ''}${it.pos ? `object-position:${it.pos};` : ''}"></figure>`;
    return `<article class="exa">
      <div class="exa-left">
        <div class="exa-thumb">${img(x.poster, '')}</div>
        <div class="exa-desc">
          <p>${x.summary ? L(x.summary) : L(x.tagline)}</p>
          <p class="exa-addr">${(x.address ? L(x.address) : [L(x.venue)]).join('<br>')}</p>
          <p>${L(x.fee)}</p>
          <p class="exa-date"><span class="status s-${st.cls}">${st.label}</span><span>${fmtRange(x.start, x.end)}</span></p>
        </div>
      </div>
      <div class="exa-right">
        <div class="exs" data-exs aria-roledescription="carousel" aria-label="${L(x.title)}">
          <div class="exs-frame"><div class="exs-track">${g.map(slide).join('')}</div></div>
          <div class="exs-nav">
            <button type="button" class="exs-prev" aria-label="${lang === 'ko' ? '이전 사진' : 'Previous image'}"><svg viewBox="0 0 6 10" aria-hidden="true"><path d="M5 1 1 5l4 4"/></svg></button>
            <span class="exs-count"><span class="exs-cur">1</span>/${g.length}</span>
            <button type="button" class="exs-next" aria-label="${lang === 'ko' ? '다음 사진' : 'Next image'}"><svg viewBox="0 0 6 10" aria-hidden="true"><path d="m1 1 4 4-4 4"/></svg></button>
          </div>
        </div>
        <h3 class="exa-title">${lang === 'ko' && x.id === 'across-time' ? TT('ko_ex_title', L(x.title)) : L(x.title)}</h3>
        <p class="exa-sub">YUNSEUL EXHIBITION · ${L(x.tagline)}</p>
        <p class="exa-body">${L(x.body)}</p>
        ${x.link ? `<a class="exa-link" href="${x.link.href}">${L(x.link)}<svg viewBox="0 0 6 10" aria-hidden="true"><path d="m1 1 4 4-4 4"/></svg></a>` : ''}
        <p class="meta ex-note">${t('ex_note')}</p>
      </div>
    </article>`;
  }
  function initExSliders(root = document) {
    $$('[data-exs]', root).forEach((el) => {
      const track = $('.exs-track', el), n = track.children.length, cur = $('.exs-cur', el);
      let i = 0;
      const go = (k) => { i = (k + n) % n; track.style.transform = `translate3d(${-i * 100}%,0,0)`; cur.textContent = i + 1; };
      $('.exs-prev', el).addEventListener('click', () => go(i - 1));
      $('.exs-next', el).addEventListener('click', () => go(i + 1));
      el.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'ArrowRight') go(i + 1); });
      let x0 = null;   // swipe
      const fr = $('.exs-frame', el);
      fr.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
      fr.addEventListener('pointerup', (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1); });
    });
  }
  function eventsBlock(list) {
    return `<ul class="ev-list">${list.map((e) => { const st = status(e.start, e.end, 'ev'); return `
      <li class="ev">
        <p class="ev-date">${fmtRange(e.start, e.end)}</p>
        <div class="ev-main">
          <span class="status s-${st.cls}">${st.label}</span>
          <h3>${L(e.title)}</h3>
          <p class="body-copy ev-body">${L(e.body).replace(/([.!?])\s+(?=\S)/g, '$1<br>')}</p>
          <p class="meta">${L(e.how)}</p>
        </div>
      </li>`; }).join('')}</ul><p class="meta" style="margin-top:20px">${t('ev_note')}</p>`;
  }
  function chapterBlock(ch, preview) {
    const imgs = preview ? ch.images.slice(0, 4) : ch.images;
    // ALL preview: photos only (the section title + subtitle introduce it); chapter heads stay on the LOOKBOOK tab
    if (preview) return `<article class="lb-ch"><a class="lb-row" href="#journal-lookbook" aria-label="LOOKBOOK">${imgs.map((n) => `<div class="lb-item"><div class="ph zoom">${img(n, '')}</div></div>`).join('')}</a></article>`;
    return `<article class="lb-ch">
      <header class="lb-ch-head">
        <p class="meta">${ch.season} · ${L(colById(ch.collection).name)}</p>
        <h3 class="h-sub">${L(ch.title)}</h3>
        <p class="body-copy">${L(ch.note)}</p>
        <a class="link-line" href="#${ch.collection}">${t('lb_view_col')}</a>
      </header>
      <div class="${preview ? 'lb-row' : 'lb-grid'}">${imgs.map((n) => `<div class="lb-item"><div class="ph zoom">${img(n, '')}</div></div>`).join('')}</div>
    </article>`;
  }
  // LOOKBOOK board (jurijewelry.com home): scattered rows on a 14-col grid, labelled collection pieces,
  // faint brand mark fixed behind the photos, gentle auto-scroll, and an intro where photos gather at the
  // centre then fly down one by one into their places (reference: scale 0→0.6 stacked, then 2s power3.inOut, 0.4s apart).
  function lookbookBoard() {
    const B = YS.lookbookBoard;
    const bottom = Math.max(...B.map((it) => { const [w, h] = it.ar.split('/').map(Number); return it.y + it.w * h / w + (it.col ? 4 : 0); }));
    const items = B.map((it, i) => {
      const style = `--x:${it.x};--y:${it.y};--w:${it.w};z-index:${i + 1}`;
      const ph = `<div class="lbb-ph" style="aspect-ratio:${it.ar}"><img src="${IMG(it.img)}" alt="" loading="eager" decoding="async"></div>`;
      if (!it.col) return `<div class="lbb-item" style="${style}">${ph}</div>`;
      const c = colById(it.col), n = productsOf(it.col).length;
      return `<a class="lbb-item lbb-col" href="#${it.col}" style="${style}">${ph}<span class="lbb-label">${L(c.name)}<sup>(${String(n).padStart(2, '0')})</sup></span></a>`;
    }).join('');
    return `<div class="lbb" data-lbb><div class="lbb-mark" aria-hidden="true">${SYMBOL_SOLID()}</div><div class="lbb-free" style="--hgt:${bottom.toFixed(1)}">${items}</div></div>`;
  }
  function initLookbookBoard() {
    const el = $('[data-lbb]');
    if (!el) return () => {};
    const mark = $('.lbb-mark', el);
    const io = new IntersectionObserver(([e]) => mark.classList.toggle('on', e.isIntersecting));
    io.observe(el);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alive = true, raf = 0, idleT = 0, auto = false, last = 0, ramp = 0, D = 0, expectY = null;
    // drifting layers: the board plus the heading above it (the fixed symbol mark stays put)
    const free = $('.lbb-free', el);
    const layers = [...$$(':scope > :not(.lbb)', el.parentElement), free];
    const setT = (v) => layers.forEach((n) => { n.style.transform = v; n.style.willChange = v ? 'transform' : ''; });
    const timers = [];
    const ease = 'cubic-bezier(.65, 0, .35, 1)';   // ≈ GSAP power3.inOut

    // ---- gentle auto-scroll (reference ≈ 21px/s)
    // The page itself is NOT scrolled while drifting (whole-pixel scroll steps read as stutter in some browsers).
    // Instead the whole page content glides up with a sub-pixel GPU transform; the moment the visitor touches
    // anything, the accumulated distance is handed over to the real scroll position in one go (no visible jump).
    const SPEED = 21 / 1000;
    const curY = () => (lenis ? lenis.scroll : window.scrollY);
    const commit = () => {
      if (D <= 0) return;
      const y = curY() + D; D = 0;
      setT('');
      expectY = y;
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo({ top: y, behavior: 'instant' });
    };
    const tick = (now) => {
      if (!alive) return;
      const dt = last ? Math.min(now - last, 50) : 16; last = now;
      ramp += ((auto ? 1 : 0) - ramp) * Math.min(1, dt / 350);
      const r = el.getBoundingClientRect();
      if (ramp > 0.002 && r.bottom > window.innerHeight + 4 && r.top < window.innerHeight) {
        D += SPEED * dt * ramp;
        setT(`translate3d(0, ${(-D).toFixed(3)}px, 0)`);
      }
      raf = requestAnimationFrame(tick);
    };
    // visitor input pauses the drift (and hands the distance over to the real scroll); resumes 0.6s after the page is at rest
    const pause = () => { commit(); auto = false; ramp = 0; clearTimeout(idleT); idleT = setTimeout(() => { auto = true; }, 600); };
    const onScroll = () => {
      const y = curY();
      if (expectY !== null && Math.abs(y - expectY) < 0.6) return;   // our own hand-over
      expectY = null;
      if (auto || ramp > 0 || idleT) pause();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const evs = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
    if (!reduce) { evs.forEach((t) => window.addEventListener(t, pause, { passive: true, capture: true })); raf = requestAnimationFrame(tick); }

    // ---- intro: photos in view gather at the centre (scale 0 → 0.6, stacked), then fly into place one by one
    const items = $$('.lbb-item', el);
    const vis = items.slice(0, 5);   // first photos: gather at centre, then drop into place (lower ones fly off below the fold)
    if (reduce || !vis.length) { auto = !reduce; } else {
      el.classList.add('is-intro');
      // like the reference preloader: hold the page still while the photos travel
      // hold the page still WITHOUT toggling overflow (removing/restoring the scrollbar changed the page width
      // and made every photo jump sideways right when the intro handed over to the auto-scroll)
      const block = (e) => e.preventDefault();
      const blockKeys = (e) => { if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(e.key)) e.preventDefault(); };
      window.addEventListener('wheel', block, { passive: false }); window.addEventListener('touchmove', block, { passive: false }); window.addEventListener('keydown', blockKeys);
      if (lenis) lenis.stop();
      const unlock = () => { window.removeEventListener('wheel', block); window.removeEventListener('touchmove', block); window.removeEventListener('keydown', blockKeys); if (lenis) lenis.start(); };
      timers.unlock = unlock;
      const layer = document.createElement('div');
      layer.className = 'lbb-fly';
      document.body.appendChild(layer);
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const flies = vis.map((it, i) => {
        const ph = $('.lbb-ph', it), r = ph.getBoundingClientRect();
        const f = document.createElement('div');
        f.className = 'lbb-fly-ph';
        f.style.cssText = `width:${r.width}px;height:${r.height}px;left:${cx - r.width / 2}px;top:${cy - r.height / 2}px;z-index:${i + 1}`;
        f.innerHTML = ph.innerHTML;
        layer.appendChild(f);
        f.animate([{ transform: 'scale(0)' }, { transform: 'scale(.6)' }], { duration: 1000, delay: 200 + i * 200, easing: 'cubic-bezier(.33,1,.68,1)', fill: 'forwards' });
        return { f, ph, it };
      });
      const gatherEnd = 200 + (vis.length - 1) * 200 + 1000;
      // reference order: last-gathered flies first, 0.4s apart
      flies.slice().reverse().forEach(({ f, ph, it }, k) => {
        timers.push(setTimeout(() => {
          if (!alive) return;
          const r = ph.getBoundingClientRect(), fr = f.getBoundingClientRect();
          const dx = (r.left + r.width / 2) - (fr.left + fr.width / 2), dy = (r.top + r.height / 2) - (fr.top + fr.height / 2);
          const an = f.animate([{ transform: 'translate(0,0) scale(.6)' }, { transform: `translate(${dx}px,${dy}px) scale(1)` }], { duration: 1700, easing: ease, fill: 'forwards' });
          an.onfinish = () => { it.classList.add('placed'); f.remove(); };
        }, gatherEnd + 200 + k * 260));
      });
      const done = gatherEnd + 200 + (flies.length - 1) * 260 + 1700;
      timers.push(setTimeout(() => { el.classList.remove('is-intro'); layer.remove(); items.forEach((n) => n.classList.add('placed')); unlock(); auto = true; }, done + 50));
    }
    return () => {
      alive = false; io.disconnect(); cancelAnimationFrame(raf); clearTimeout(idleT); window.removeEventListener('scroll', onScroll); timers.forEach(clearTimeout); if (timers.unlock) timers.unlock();
      evs.forEach((t) => window.removeEventListener(t, pause, { capture: true })); $$('.lbb-fly').forEach((n) => n.remove());
      D = 0; setT('');
    };
  }
  // JOURNAL is split in two: NEWS (exhibitions + events) and LOOKBOOK (its own page)
  function journalPage(sub) {
    if (sub === 'lookbook') return lookbookPage();
    const tabs = [['exhibitions', 'j_exhibitions'], ['events', 'j_events']];
    const head = (key, subKey, id, all) => `<div class="j-head"><div><h2 class="h-sub j-type">${TT(key === 'j_exhibitions' ? 'en_EXHIBITIONS' : 'en_EVENTS', t(key))}</h2><p class="meta">${t(subKey)}</p></div>${all ? `<a class="link-line" href="#journal-${id}">${t('j_all')}</a>` : ''}</div>`;
    let body = '';
    if (sub === 'all' || sub === 'exhibitions') body += `<section class="j-sec">${head('j_exhibitions', 'j_ex_sub', 'exhibitions', sub === 'all')}${YS.exhibitions.map(exhibitionBlock).join('')}</section>`;
    if (sub === 'all' || sub === 'events') body += `<section class="j-sec">${head('j_events', 'j_ev_sub', 'events', sub === 'all')}${eventsBlock(YS.events)}</section>`;
    return `
    <section class="section on-light page-top journal">
      <div class="wrap">
        ${sub === 'all' ? '' : crumbs([['JOURNAL', '#journal'], [t('j_' + sub)]])}
        <h1 class="h-section page-type">${TT('nav_journal', 'JOURNAL')}</h1>
        <p class="lead" style="margin-top:20px">${t('news_lead')}</p>
        <nav class="j-tabs" aria-label="Journal">
          <a href="#journal" ${sub === 'all' ? 'aria-current="page"' : ''}>ALL</a>
          ${tabs.map(([id, key]) => `<a href="#journal-${id}" ${sub === id ? 'aria-current="page"' : ''}>${t(key)}</a>`).join('')}
        </nav>
        ${body}
      </div>
    </section>`;
  }
  function lookbookPage() {
    return `
    <section class="section on-light page-top journal lookbook-page">
      <div class="wrap">
        <h1 class="h-section page-type">${TT('en_LOOKBOOK', 'LOOKBOOK')}</h1>
        <p class="lead" style="margin-top:20px;margin-bottom:clamp(64px,7vw,110px)">${t('j_lb_sub')}</p>
        ${lookbookBoard()}
      </div>
    </section>`;
  }
  pages.journal = () => journalPage('all');

  pages.contact = () => {
    const rows = [[7, 47, 15.0, 4], [9, 49, 15.6, 5], [11, 51, 16.2, 6], [13, 53, 16.9, 6.5], [15, 55, 17.5, 7.5], [17, 57, 18.1, 8.5]];
    const head = L(YS.t.size_head);
    return `
    <section class="section on-light page-top contact-pg">
      <div class="wrap"><h1 class="h-section page-type" style="margin-bottom:64px">${TT('nav_contact', 'CONTACT')}</h1></div>
      <div class="wrap help-grid">
        <div>
          <h2 class="h-sub" style="margin-bottom:16px">${t('faq_title')}</h2>
          <div class="faq">${YS.t.faq.map((f, i) => `<details ${i === 0 ? 'open' : ''}><summary>${L(f)[0]}</summary><p>${L(f)[1]}</p></details>`).join('')}</div>
          <h2 class="h-sub" style="margin:72px 0 16px">${t('size_title')}</h2>
          <table class="size-table"><thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
            <tbody>${rows.map((r) => `<tr><td>${lang === 'ko' ? r[0] + '호' : r[0]}</td><td>${r[1]} mm</td><td>${r[2].toFixed(1)} mm</td><td>${r[3]}</td></tr>`).join('')}</tbody></table>
        </div>
        <div>
          <h2 class="h-sub" style="margin-bottom:12px">${t('contact_title')}</h2>
          <p class="contact-mail" style="margin-bottom:32px"><a class="link-line" href="mailto:Yunseul-jewelry@gmail.com">Yunseul-jewelry@gmail.com</a></p>
          <form class="form" id="contactForm" novalidate>
            <label>${t('f_name')}<input name="name" autocomplete="name"></label>
            <label>${t('f_email')}<input name="email" type="email" autocomplete="email"></label>
            <label>${t('f_msg')}<textarea name="msg"></textarea></label>
            <p class="form-msg" id="contactMsg" aria-live="polite"></p>
            <div><button class="btn" type="submit">${t('f_send')}</button></div>
          </form>
        </div>
      </div>
    </section>`;
  };

  pages.account = () => `
    <section class="section page-top">
      <div class="wrap account">
        <div style="display:grid;gap:20px">
          <h1 class="h-section${lang === 'ko' ? ' page-type' : ''}">${lang === 'ko' ? TT('ko_mypage', t('acc_title')) : t('acc_title')}</h1>
          <p class="body-copy">${t('acc_lead')}</p>
        </div>
        <form class="form" id="loginForm" novalidate>
          <label>${t('f_email')}<input name="email" type="email" autocomplete="email"></label>
          <label>${t('acc_pw')}<input name="pw" type="password" autocomplete="current-password"></label>
          <p class="form-msg" id="loginMsg" aria-live="polite"></p>
          <div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn" type="submit">${t('acc_login')}</button><a class="btn ghost" href="#shop"><span>${t('acc_browse')}</span></a></div>
        </form>
      </div>
    </section>`;

  const notFound = () => `<section class="empty-page page-top"><p class="lead">${t('not_found')}</p><a class="btn" href="#home">${t('go_home')}</a></section>`;

  /* =========================================================
     ROUTER
     ========================================================= */
  function route() {
    const raw = (location.hash || '#home').slice(1) || 'home';
    const ALIAS = { collections: 'collection', lookbook: 'journal-lookbook', news: 'journal', help: 'contact' };
    const h = ALIAS[raw] || raw;
    if (heroCleanup) { heroCleanup(); heroCleanup = null; }
    let html, navKey = h;
    if (pages[h]) { html = pages[h](); if (h === 'gift') navKey = 'shop'; }
    else if (h.startsWith('shop-') && (h === 'shop-best' || catById(h.slice(5)))) { html = shopList(h.slice(5)); navKey = 'shop'; }
    else if (h.startsWith('journal-') && ['exhibitions', 'events', 'lookbook'].includes(h.slice(8))) { html = journalPage(h.slice(8)); navKey = h === 'journal-lookbook' ? 'lookbook' : 'journal'; }
    else if (colById(h)) { html = collectionPage(colById(h)); navKey = 'collection'; }
    else if (h.startsWith('p-') && byId(h.slice(2))) { html = productPage(byId(h.slice(2))); navKey = 'shop'; }
    else html = notFound();
    app.innerHTML = html;
    scrollTop(0);
    $$('[data-nav]').forEach((a) => a.setAttribute('aria-current', a.dataset.nav === navKey ? 'page' : 'false'));
    closeMobile(); closeSearch();
    bindPage(h);
    updateHeader();
    document.title = titleFor(h);
  }
  function titleFor(h) {
    const base = lang === 'ko' ? '윤슬 YUN:SEUL' : 'YUN:SEUL';
    if (h === 'home') return base + (lang === 'ko' ? ' — 한국의 아름다움을 일상 속에서' : ' — Korean beauty, worn every day');
    if (colById(h)) return L(colById(h).name) + ' — ' + base;
    if (h.startsWith('p-') && byId(h.slice(2))) return L(byId(h.slice(2)).name) + ' — ' + base;
    if (h.startsWith('shop-')) return (h === 'shop-best' ? t('shop_best_tab') : L(catById(h.slice(5)))) + ' — Shop — ' + base;
    if (h === 'journal-lookbook') return 'Lookbook — ' + base;
    if (h.startsWith('journal-')) return t('j_' + h.slice(8)) + ' — Journal — ' + base;
    const map = { about: 'About', shop: 'Shop', collection: 'Collection', journal: 'Journal', gift: 'Gift', contact: 'Contact', account: 'My page' };
    return (map[h] ? map[h] + ' — ' : '') + base;
  }

  function bindPage(h) {
    if ($('.hero')) { bindHero(); heroCleanup = () => { if (heroWaterStop) { heroWaterStop(); heroWaterStop = null; } }; }
    const lbs = $('.lbs');
    if (lbs) { const stop = startLookbookSlider(lbs); const prev0 = heroCleanup; heroCleanup = () => { prev0 && prev0(); stop(); }; }
    // New Collection + Bestsellers: heading and product photos fade up (50px / 0.7s), cards staggered
    {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const groups = [[$('.nc .nc-head'), ...$$('.nc .pcard')], [$('.best .shop-head'), ...$$('.best .pcard')],
        // About: headings + square photos / graphics
        [$$('.about-h')[1], $('.kwc-row')],
        [$$('.symbol-tile')[0], $$('.symbol-tile')[1], $$('.about-h')[2]],
        [$$('.about-h')[3], ...$$('.motif-swatch')], [$$('.about-h')[4], ...$$('.swatch')]];
      const els = [];
      groups.forEach((g) => g.filter(Boolean).forEach((el, i) => { el.classList.add('rise'); el.style.transitionDelay = i ? `${(i - 1) % 4 * 0.08}s` : '0s'; els.push(el); }));
      if (reduce) els.forEach((el) => el.classList.add('in'));
      else { const stop = watchReveal(els, 0.85); const prevR = heroCleanup; heroCleanup = () => { prevR && prevR(); stop(); }; }
    }
    const bd = $('.bd');
    initExSliders();
    { const stop = initLookbookBoard(); const p0 = heroCleanup; heroCleanup = () => { p0 && p0(); stop(); }; }
    if (bd) { const stop = startBrandDef(bd); const prev = heroCleanup; heroCleanup = () => { prev && prev(); stop(); }; }

    { const ks = $('#kwSec'); if (ks) bindKw(ks); }
    { const ah = $('#ahSlot'); if (ah) { bindAboutHero(ah); const p2 = heroCleanup; heroCleanup = () => { p2 && p2(); if (ahCleanup) { ahCleanup(); ahCleanup = null; } }; } }
    if (h.startsWith('p-')) bindProduct(byId(h.slice(2)));

    { const fb = $('#shopFilterBtn'), fs = $('#fSheet');   // 모바일 전용 필터 시트 (PC에서는 버튼이 숨겨져 있음)
      if (fb && fs) { fb.addEventListener('click', () => { fs.hidden = false; requestAnimationFrame(() => fs.classList.add('open')); });
        fs.addEventListener('click', (e) => { if (e.target.closest('[data-fclose], a')) { fs.classList.remove('open'); setTimeout(() => { fs.hidden = true; }, 300); } }); } }
    const sortSel = $('#sortSel');
    if (sortSel) sortSel.addEventListener('change', () => {
      shopSort = sortSel.value;
      { const sc = $('.sort-cur'); if (sc) sc.textContent = t('sort_' + shopSort); }
      const items = shopItems(shopFilter);
      $('#shopGrid').innerHTML = items.map(productCard).join('');
    });

    const lf = $('#loginForm');
    if (lf) lf.addEventListener('submit', (e) => { e.preventDefault(); $('#loginMsg').textContent = t('acc_demo'); });

    const cf = $('#contactForm');
    if (cf) cf.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(cf), msg = $('#contactMsg');
      if (!fd.get('name') || !fd.get('email') || !fd.get('msg')) { msg.style.color = '#e0a08f'; msg.textContent = t('f_need'); return; }
      msg.style.color = ''; msg.textContent = t('f_demo'); cf.reset();
    });
  }

  function bindProduct(p) {
    const main = $('.pd-main img');
    $$('.pd-thumbs button').forEach((b) => b.addEventListener('click', () => {
      main.src = IMG(b.dataset.img);
      $$('.pd-thumbs button').forEach((x) => x.setAttribute('aria-current', x === b));
    }));
    { const sw = $('[data-swipe] .pd-swipe-track'), dots = $$('.pd-dots i');   // 모바일 전용 스와이프 갤러리
      if (sw && dots.length) sw.addEventListener('scroll', () => { const i = Math.round(sw.scrollLeft / sw.clientWidth); dots.forEach((d, k) => d.classList.toggle('on', k === i)); }, { passive: true }); }
    const form = $('#pdForm'), priceEl = $('#pdPrice'), err = $('#pdErr');
    const unit = () => p.price + (form.finish && form.finish.value === 'gold' ? 10000 : 0);
    form.addEventListener('change', () => { priceEl.textContent = won(unit()); err.textContent = ''; });
    const collect = () => {
      if (p.ring && !form.size.value) { err.textContent = t('pd_need_size'); form.size.focus(); return null; }
      return { id: p.id, finish: form.finish ? form.finish.value : null, size: p.ring ? form.size.value : null, msg: form.msg.checked, price: unit(), qty: 1 };
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const item = collect(); if (!item) return;
      const same = bag.find((b) => b.id === item.id && b.finish === item.finish && b.size === item.size && b.msg === item.msg);
      if (same) same.qty += 1; else bag.push(item);
      saveBag(); toast(t('pd_added')); bump();
    });
    $('#buyNow').addEventListener('click', () => { if (collect()) openModal(); });
  }

  /* =========================================================
     HERO — light on water (interactive canvas)
     Horizontal rounded strokes in stepped rows, after graphic motif type C.
     ========================================================= */
  function startWater(hero) {
    const cv = $('.hero-canvas', hero), ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, glints = [], raf, t0 = performance.now();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glints = [];
      const top = H * (W < 820 ? 0.6 : 0.70), rows = Math.round((H - top) / 11);
      for (let r = 0; r < rows; r++) {
        const depth = r / rows;                       // 0 far → 1 near
        const y = top + Math.pow(depth, 1.35) * (H - top);
        const count = Math.round(6 + depth * 12);
        for (let i = 0; i < count; i++) {
          glints.push({
            x: Math.random() * W, y: y + (Math.random() - .5) * 6,
            len: 8 + Math.random() * (18 + depth * 70), th: 1 + depth * 3.2,
            ph: Math.random() * Math.PI * 2, sp: .6 + Math.random() * 1.6,
            drift: (.05 + depth * .25) * (Math.random() < .5 ? -1 : 1), depth
          });
        }
      }
    }

    function frame(now) {
      const tt = (now - t0) / 1000;
      pointer.x += (pointer.tx - pointer.x) * .08; pointer.y += (pointer.ty - pointer.y) * .08;
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = 'round';
      for (const g of glints) {
        if (!reduce) { g.x += g.drift; if (g.x > W + 60) g.x = -60; if (g.x < -60) g.x = W + 60; }
        const tw = Math.pow(.5 + .5 * Math.sin(tt * g.sp + g.ph), 4);             // twinkle
        const dx = g.x - pointer.x, dy = (g.y - pointer.y) * 2.2;
        const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 260);        // cursor glow
        const a = Math.min(1, (.05 + g.depth * .25) + tw * (.35 + g.depth * .4) + near * .9);
        if (a < .04) continue;
        let color;
        if (near > .25) {                                                      // iridescent near cursor (자개빛)
          const hue = (g.x * .35 + tt * 40) % 360;
          color = `hsla(${hue}, 70%, 82%, ${a})`;
        } else color = `rgba(167, 215, 178, ${a})`;
        ctx.strokeStyle = color; ctx.lineWidth = g.th * (1 + near * .6);
        ctx.beginPath(); ctx.moveTo(g.x - g.len / 2, g.y); ctx.lineTo(g.x + g.len / 2, g.y); ctx.stroke();
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const onMove = (e) => { const r = hero.getBoundingClientRect(); pointer.tx = e.clientX - r.left; pointer.ty = e.clientY - r.top; if (reduce) frame(performance.now()); };
    const onLeave = () => { pointer.tx = -9999; pointer.ty = -9999; };
    const onResize = () => { build(); if (reduce) frame(performance.now()); };
    build(); raf = requestAnimationFrame(frame);
    hero.addEventListener('pointermove', onMove); hero.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave); window.removeEventListener('resize', onResize); };
  }

  /* =========================================================
     BRAND DEFINITION — sticky large photo, faster small photo, staggered reveal
     (modelled on the reference's about section). Transforms only, in rAF.
     ========================================================= */
  /* Scroll-position reveal (replays). IntersectionObserver rootMargin is ignored inside cross-origin
     iframes (e.g. the artifact viewer), so trigger lines are computed from getBoundingClientRect instead.
     Adds .in when the element's top passes `frac` of the viewport height (minus `px`);
     removes it once the element is back below the bottom of the viewport. */
  function watchReveal(els, frac, px = 0) {
    const check = () => {
      const vh = window.innerHeight, line = vh * frac - px;
      els.forEach((el) => { const top = el.getBoundingClientRect().top; if (top < line) el.classList.add('in'); else if (top >= vh) el.classList.remove('in'); });
    };
    window.addEventListener('scroll', check, { passive: true }); window.addEventListener('resize', check);
    requestAnimationFrame(check);
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }

  function startBrandDef(sec) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Reference (nidatabba.com .home-text-images), measured:
    //  · heading / link: AOS fade-up 50px, 0.7s ease-out. Body copy stays static.
    //    Triggered a bit later than the reference default — once the element reaches the middle of the screen.
    //  · photos: revealed upward with clip-path inset(100% 0 0) → 0 over 1s ease-in-out when the photo
    //    column reaches 75% of the viewport (90% on mobile); the big photo also fades up 50px.
    //  · small photo: parallax translateY 100% → 0 over 2× its height of scroll, starting when the column enters.
    //  All of it replays: resets once the element drops back below the bottom of the screen.
    const media = $('.bd-media', sec);
    const items = $$('.rise', sec);
    if (reduce) { items.forEach((el) => el.classList.add('in')); media && media.classList.add('in'); return () => {}; }
    const link = $('.bd-link', sec);
    const stopText = watchReveal(items.filter((el) => el !== link), 0.72);
    const stopLink = link ? watchReveal([link], 0.92) : () => {};   // link appears almost as soon as it enters
    const stopImg = media ? watchReveal([media], window.innerWidth < 960 ? 0.9 : 0.75) : () => {};
    const small = $('[data-parallax]', sec);
    if (!small || !media) return () => { stopText(); stopLink(); stopImg(); };
    let raf = 0, visible = false;
    const tick = () => {
      const top = media.getBoundingClientRect().top, vh = window.innerHeight;
      // Finish the rise by the time the photo column reaches the header (the reading position), so the
      // small photo is already sitting at its reference spot (278px / 18.4vw below the big photo's top).
      const hh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72;
      const r = Math.max(1, vh - hh);
      const l = Math.min(r, Math.max(0, vh - top));          // px scrolled since the column entered
      small.style.transform = `translate3d(0, ${(100 - 100 * l / r).toFixed(2)}%, 0)`;
      if (visible) raf = requestAnimationFrame(tick);
    };
    const vo = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(tick); });
    vo.observe(sec); tick();
    return () => { stopText(); stopLink(); stopImg(); vo.disconnect(); cancelAnimationFrame(raf); };
  }

  /* =========================================================
     LOOKBOOK SLIDER — reference: endless horizontal drift, drag to throw,
     keeps going in the direction you dragged; position eased with lerp(0.15).
     Heading: fade-up 100px / 0.7s, replays when scrolled back below.
     ========================================================= */
  function startLookbookSlider(sec) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const title = $('.aos-up', sec);
    const stopTitle = reduce ? (title.classList.add('in'), () => {}) : watchReveal([title], 1, 120);

    const track = $('[data-marquee]', sec), items = $$('[data-item]', track);
    const s = { y: 0, target: 0, time: 0, dir: 1, drag: false, lastX: 0, vel: 0 };
    let raf = 0, visible = false, last = 0, W = 0, wrap = 0;
    const measure = () => { W = items[0].offsetWidth; wrap = W * items.length; };
    const wrapX = (v) => { const r = ((v + W) % wrap + wrap) % wrap; return r - W; };
    const place = () => items.forEach((el, i) => { el.style.transform = `translate3d(${wrapX(i * W + s.y).toFixed(2)}px,0,0)`; });
    const frame = (now) => {
      const dt = Math.min(64, now - (last || now)); last = now;
      const speed = (window.innerWidth < 820 ? 60 : 120) / 1000;      // px per ms (reference ≈ 120px/s desktop, half on mobile)
      if (!s.drag && !reduce) s.time += s.dir * speed * dt;
      s.y += ((s.target - s.time) - s.y) * (1 - Math.pow(1 - 0.15, dt / 16.67));   // lerp .15 per 60fps frame
      place();
      if (visible) raf = requestAnimationFrame(frame);
    };
    const down = (e) => { s.drag = true; s.lastX = e.clientX; s.vel = 0; track.classList.add('is-dragging'); track.setPointerCapture && track.setPointerCapture(e.pointerId); };
    const move = (e) => { if (!s.drag) return; const dx = e.clientX - s.lastX; s.target += dx; s.vel = dx; s.lastX = e.clientX; };
    const up = () => { if (!s.drag) return; s.drag = false; if (s.vel !== 0) s.dir = s.vel > 0 ? -1 : 1; track.classList.remove('is-dragging'); };
    track.addEventListener('pointerdown', down); track.addEventListener('pointermove', move);
    track.addEventListener('pointerup', up); track.addEventListener('pointercancel', up); track.addEventListener('pointerleave', up);
    $$('img', track).forEach((im) => { im.draggable = false; });
    const onResize = () => { measure(); place(); };
    window.addEventListener('resize', onResize);
    measure(); place();
    const vo = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); last = 0; if (visible) raf = requestAnimationFrame(frame); });
    vo.observe(sec);
    return () => { stopTitle(); vo.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }

  /* ---------- smooth inertia scrolling (Lenis); falls back to native scroll ---------- */
  let lenis = null;
  if (window.Lenis && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
      const loop = (time) => { lenis.raf(time); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    } catch (e) { lenis = null; }
  }
  const scrollTop = (y = 0) => { if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo({ top: y, behavior: 'instant' }); };

  /* =========================================================
     BAG
     ========================================================= */
  const drawer = $('#drawer'), scrim = $('#scrim');
  function saveBag() { store.set('bag', bag); renderBag(); }
  function bump() { const c = $('#bagCount'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
  function renderBag() {
    const n = bag.reduce((s, b) => s + b.qty, 0);
    $('#bagCount').textContent = n; $('#bagCount').hidden = n === 0;
    $('#bagBtn').setAttribute('aria-label', 'Shopping bag, ' + n);
    const body = $('#drawerBody'), foot = $('#drawerFoot');
    drawer.classList.toggle('m-cart', window.matchMedia('(max-width: 760px)').matches);
    if (drawer.classList.contains('m-cart')) { renderBagMobile(body, foot); return; }
    if (!bag.length) { body.innerHTML = `<p class="drawer-empty">${t('cart_empty')}</p>`; foot.innerHTML = `<a class="btn" href="#shop" data-close>${t('nav_collections')}</a>`; return; }
    body.innerHTML = bag.map((b, i) => {
      const p = byId(b.id); if (!p) return '';
      const opts = [b.finish ? t(b.finish).split(' (')[0] : null, b.size ? (lang === 'ko' ? b.size + '호' : 'KR ' + b.size) : null, b.msg ? t('pd_giftwrap').split(' (')[0] : null].filter(Boolean).join(' / ');
      return `<div class="line-item">
        <img src="${IMG(p.images[0])}" alt="">
        <div><div>${L(p.name)}</div><div class="opt">${opts}</div>
          <div class="qty"><button type="button" data-q="${i}" data-d="-1" aria-label="-">−</button><span>${b.qty}</span><button type="button" data-q="${i}" data-d="1" aria-label="+">+</button></div></div>
        <div style="display:grid;justify-items:end;align-content:space-between"><span class="price">${won(b.price * b.qty)}</span><button type="button" class="text-btn" data-rm="${i}">${t('cart_remove')}</button></div>
      </div>`;
    }).join('');
    const total = bag.reduce((s, b) => s + b.price * b.qty, 0);
    foot.innerHTML = `<div class="total"><span>${t('cart_total')}</span><span class="price">${won(total)}</span></div><button type="button" class="btn" id="checkout">${t('cart_checkout')}</button>`;
  }
  /* 모바일 전용 장바구니 (PC 드로어는 위의 renderBag 그대로) */
  let cartWrap = false;
  function renderBagMobile(body, foot) {
    const ICO = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
    const head = `<div class="mc-top"><button type="button" class="mc-ic" data-close aria-label="${t('close')}">${ICO('M15 5 8 12l7 7')}</button><button type="button" class="mc-ic" data-close aria-label="${t('close')}">${ICO('M6 6l12 12M18 6 6 18')}</button></div>
      <div class="mc-title"><h2>${lang === 'ko' ? TT('ko_cart', t('cart_title')) : t('cart_title')}</h2><span>${t('cart_items').replace('{n}', bag.length)}</span></div>`;
    if (!bag.length) { body.innerHTML = head + `<p class="drawer-empty">${t('cart_empty')}</p>`; foot.innerHTML = `<a class="btn" href="#shop" data-close>${t('nav_collections')}</a>`; return; }
    const on = bag.filter((b) => !b.off);
    const sub = on.reduce((s, b) => s + b.price * b.qty, 0);
    const wrapFee = cartWrap && on.length ? 3000 : 0;
    const total = sub + wrapFee;
    const CHK = (attr, checked) => `<label class="mc-chk"><input type="checkbox" ${attr} ${checked ? 'checked' : ''}><span aria-hidden="true">${ICO('M6 12.5l4 4 8-9')}</span></label>`;
    body.innerHTML = head + `
      <div class="mc-all">${CHK('data-all aria-label="' + t('cart_all') + '"', on.length === bag.length)}<span class="mc-all-t">${t('cart_all')} ${on.length}/${bag.length}</span><button type="button" class="mc-rmsel" data-rmsel>${t('cart_rmsel')}</button></div>
      ${bag.map((b, i) => {
        const p = byId(b.id); if (!p) return '';
        const opts = [b.finish ? t(b.finish).split(' (')[0] : null, b.size ? (lang === 'ko' ? b.size + '호' : 'KR ' + b.size) : null, b.msg ? t('pd_giftwrap').split(' (')[0] : null].filter(Boolean).join(' · ');
        return `<div class="mc-item">
          ${CHK('data-sel="' + i + '" aria-label="' + L(p.name) + '"', !b.off)}
          <img src="${IMG(p.images[0])}" alt="">
          <div class="mc-info"><div class="mc-name">${L(p.name)}</div><div class="mc-opt">${opts}</div>
            <div class="mc-qty"><button type="button" data-q="${i}" data-d="-1" aria-label="-">−</button><span>${b.qty}</span><button type="button" data-q="${i}" data-d="1" aria-label="+">+</button></div></div>
          <button type="button" class="mc-x" data-rm="${i}" aria-label="${t('cart_remove')}">${ICO('M7 7l10 10M17 7 7 17')}</button>
          <span class="mc-price">${won(b.price * b.qty)}</span>
        </div>`;
      }).join('')}
      <div class="mc-wrap"><div><b>${t('cart_wrap')}</b><small>${t('cart_wrap_sub')}</small></div><button type="button" class="mc-sw" role="switch" aria-checked="${cartWrap}" aria-label="${t('cart_wrap')}" data-wrap><i></i></button></div>
      <dl class="mc-sum"><div><dt>${t('cart_sub')}</dt><dd>${won(sub)}</dd></div><div><dt>${t('cart_wrapfee')}</dt><dd>${won(wrapFee)}</dd></div><div><dt>${t('cart_ship')}</dt><dd>${t('cart_free')}</dd></div></dl>
      <div class="mc-total"><span>${t('cart_grand')}</span><b>${won(total)}</b></div>`;
    foot.innerHTML = `<button type="button" class="btn" id="checkout" ${on.length ? '' : 'disabled'}>${t('cart_pay').replace('{p}', won(total))}</button>`;
  }
  drawer.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-sel]'), all = e.target.closest('[data-all]');
    if (sel) { bag[+sel.dataset.sel].off = !sel.checked; saveBag(); }
    if (all) { bag.forEach((b) => { b.off = !all.checked; }); saveBag(); }
  });
  drawer.addEventListener('click', (e) => {
    if (e.target.closest('[data-rmsel]')) { bag = bag.filter((b) => b.off); saveBag(); }
    if (e.target.closest('[data-wrap]')) { cartWrap = !cartWrap; renderBag(); }
  });
  function openBag() { renderBag(); drawer.hidden = false; scrim.hidden = false; requestAnimationFrame(() => drawer.classList.add('open')); $('#drawerClose').focus(); }
  function closeBag() { drawer.classList.remove('open'); scrim.hidden = true; setTimeout(() => { drawer.hidden = true; }, 450); }
  $('#bagBtn').addEventListener('click', openBag);
  $('#drawerClose').addEventListener('click', closeBag);
  scrim.addEventListener('click', closeBag);
  drawer.addEventListener('click', (e) => {
    const q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]');
    if (q) { const b = bag[+q.dataset.q]; b.qty = Math.max(1, b.qty + +q.dataset.d); saveBag(); }
    if (rm) { bag.splice(+rm.dataset.rm, 1); saveBag(); }
    if (e.target.closest('#checkout')) { closeBag(); openModal(); }
    if (e.target.closest('[data-close]')) closeBag();
  });

  /* ---------- quick add from product cards ---------- */
  function addToBag(item) {
    const same = bag.find((b) => b.id === item.id && b.finish === item.finish && b.size === item.size && b.msg === item.msg);
    if (same) same.qty += 1; else bag.push(item);
    saveBag(); bump();
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]'); if (!btn) return;
    const p = byId(btn.dataset.add);
    if (p.ring) { location.hash = '#p-' + p.id; setTimeout(() => toast(t('quick_need_size')), 120); return; }
    addToBag({ id: p.id, finish: p.plating ? 'silver' : null, size: null, msg: false, price: p.price, qty: 1 });
    toast(t('pd_added'));
  });

  /* ---------- SHOP mega menu & mobile submenu ---------- */
  function shopLinks() {
    return {
      all: [[t('mega_all'), '#shop'], [t('mega_best'), '#shop-best']],
      cat: YS.categories.map((c) => [L(c), '#shop-' + c.id]),
      gift: [[t('mega_gift_guide'), '#gift']],
      col: YS.collections.map((c) => [L(c.name) + (c.signature ? ' <em>NEW</em>' : ''), '#' + c.id])
    };
  }
  function renderMenus() {
    const s = shopLinks(), col = (h, list) => `<div class="mega-col"><p class="mega-h">${h}</p>${list.map(([l, href]) => `<a href="${href}">${l}</a>`).join('')}</div>`;
    $('#mega').innerHTML = `<div class="mega-inner">
      ${col('ALL', s.all)}${col('BY COLLECTION', s.col)}${col('BY CATEGORY', s.cat)}${col('GIFT', s.gift)}
      <a class="mega-feature" href="#shop-best"><div class="ph">${img('mg-earring-calla', '')}</div><span>BEST · ${L(byId('mg-earring').name)}</span></a>
    </div>`;
    $('#megaCol').innerHTML = `<div class="mega-inner cols3">${YS.collections.map((c) => `
      <a class="mega-col-card" href="#${c.id}"><div class="ph">${img(c.hero, '')}</div><b>${colType(c)}${c.signature ? ' <em>NEW</em>' : ''}</b><span>${L(c.tagline)}</span></a>`).join('')}</div>`;
    const sub = (groups) => groups.map(([h, list]) => `${h ? `<p class="mega-h">${h}</p>` : ''}${list.map(([l, href]) => `<a href="${href}">${l}</a>`).join('')}`).join('');
    $('#mShop').innerHTML = `<summary data-nav="shop">${TT('nav_shop', 'SHOP')}</summary><div class="m-sub">${sub([['ALL', s.all], ['BY COLLECTION', s.col], ['BY CATEGORY', s.cat], ['GIFT', s.gift]])}</div>`;
    $('#mCol').innerHTML = `<summary data-nav="collection">${TT('nav_collection', 'COLLECTION')}</summary><div class="m-sub">${sub([['', [[t('mega_all'), '#collection']].concat(s.col)]])}</div>`;
  }
  $$('.has-mega').forEach((m) => {
    m.addEventListener('click', (e) => { if (e.target.closest('a')) { m.classList.add('suppress'); document.activeElement.blur(); } });
    m.addEventListener('mouseleave', () => m.classList.remove('suppress'));
  });

  /* ---------- modal & toast ---------- */
  const modal = $('#modal');
  let lastFocus = null;
  function openModal() { lastFocus = document.activeElement; modal.hidden = false; $('#modalOk').focus(); }
  function closeModal() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }
  $('#modalOk').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (!modal.hidden) closeModal(); else if (!drawer.hidden) closeBag(); else if (!sPanel.hidden) { closeSearch(); sBtn.focus(); } else closeMobile(); } });
  let toastTimer;
  /* footer: live Seoul clock + demo newsletter form */
  (function footerSetup() {
    const clock = $('#ftClock');
    const fmt = () => { try { clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()) + ' KST'; } catch (e) {} };
    if (clock) { fmt(); setInterval(fmt, 20000); }
    const form = $('#ftNews');
    if (form) form.addEventListener('submit', (e) => {
      e.preventDefault(); const inp = $('#ftEmail', form);
      if (!inp.value || !inp.checkValidity()) { toast(lang === 'ko' ? '이메일 주소를 확인해 주세요.' : 'Check the email address.'); inp.focus(); return; }
      inp.value = ''; toast(lang === 'ko' ? '구독 신청이 접수되었습니다 (데모).' : 'You’re subscribed (demo).');
    });
  })();

  function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2200); }

  /* ---------- header tone & mobile nav ---------- */
  const header = $('#header');
  function updateHeader() {
    const y = 36;
    const light = $$('.on-light').some((s) => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    header.classList.toggle('light', light);
    header.classList.toggle('solid', !light && window.scrollY > 40);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  const menuBtn = $('#menuBtn'), mnav = $('#mobileNav');
  menuBtn.addEventListener('click', () => { const open = mnav.hidden; closeSearch(); mnav.hidden = !open; menuBtn.setAttribute('aria-expanded', open); header.classList.toggle('menu-open', open); });
  function closeMobile() { mnav.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); header.classList.remove('menu-open'); }

  /* ---------- search ---------- */
  const sBtn = $('#searchBtn'), sPanel = $('#searchPanel'), sInput = $('#searchInput'), sRes = $('#searchResults');
  function renderSearch() {
    const q = sInput.value.trim().toLowerCase();
    if (!q) {
      sRes.innerHTML = `<p class="search-hint">${t('search_suggest')}</p><div class="search-tags">${YS.collections.map((c) => `<a href="#${c.id}">${L(c.name)}</a>`).join('')}<a href="#gift">${t('nav_gift')}</a></div>`;
      return;
    }
    const hits = YS.products.filter((p) => [p.name.ko, p.name.en, colById(p.collection).name.ko, colById(p.collection).name.en, p.category].join(' ').toLowerCase().includes(q));
    sRes.innerHTML = hits.length
      ? `<ul class="search-list">${hits.map((p) => `<li><a href="#p-${p.id}"><img src="${IMG(p.images[0])}" alt=""><span>${L(p.name)}<small>${L(colById(p.collection).name)}</small></span><span class="price">${won(p.price)}</span></a></li>`).join('')}</ul>`
      : `<p class="search-hint">${t('search_none').replace('{q}', sInput.value.trim())}</p>`;
  }
  function openSearch() { closeMobile(); sPanel.hidden = false; sBtn.setAttribute('aria-expanded', 'true'); header.classList.add('search-open'); sInput.placeholder = t('search_placeholder'); renderSearch(); sInput.focus(); }
  function closeSearch() { if (sPanel.hidden) return; sPanel.hidden = true; sBtn.setAttribute('aria-expanded', 'false'); header.classList.remove('search-open'); }
  sBtn.addEventListener('click', () => (sPanel.hidden ? openSearch() : closeSearch()));
  sInput.addEventListener('input', renderSearch);
  sPanel.addEventListener('click', (e) => { if (e.target === sPanel) closeSearch(); });

  /* ---------- language ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    renderMenus();
    $$('[data-t]').forEach((el) => { el.innerHTML = t(el.dataset.t); });
    if (lang === 'ko') $('#drawerTitle').innerHTML = TT('ko_cart', t('cart_title'), 'dt-type');
    $$('[data-type]').forEach((el) => { el.innerHTML = TT(el.dataset.type, el.dataset.label || ''); });
    $('.ft-word').innerHTML = TYPE('en_YUNSEUL');
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    $('.skip').textContent = lang === 'ko' ? '본문으로 건너뛰기' : 'Skip to content';
  }
  $$('.lang button').forEach((b) => b.addEventListener('click', () => {
    if (lang === b.dataset.lang) return;
    lang = b.dataset.lang; store.set('lang', lang);
    const y = window.scrollY; applyStatic(); renderBag(); route(); scrollTop(y);
  }));

  /* ---------- 이미지 로딩: 받아지면 부드럽게 나타나기 + 미리 받아두기 ---------- */
  const markLoaded = (im) => im.classList.add('ld');
  document.addEventListener('load', (e) => { if (e.target.tagName === 'IMG') markLoaded(e.target); }, true);
  document.addEventListener('error', (e) => { if (e.target.tagName === 'IMG') markLoaded(e.target); }, true);
  const markDone = (root) => $$('img:not(.ld)', root).forEach((im) => { if (im.complete) markLoaded(im); });
  new MutationObserver(() => markDone(document)).observe(document.body, { childList: true, subtree: true });
  // 첫 화면이 뜬 뒤, 쉬는 시간에 나머지 사진을 몇 장씩 미리 받아 둠 → 다른 페이지로 가도 바로 보임
  const ALL_IMG = ['cm-bracelet', 'cm-bracelet-model', 'cm-earring', 'cm-earring-model', 'cm-model', 'cm-necklace', 'cm-necklace-model', 'daily-necklace', 'ex-banner', 'ex-brochure', 'exhibition-poster', 'gift-bojagi', 'gift-cards', 'gift-warranty', 'gy-bitgyeol', 'gy-bitgyeol-model', 'gy-detail', 'gy-falling', 'gy-jangyeol', 'gy-jangyeol-model', 'gy-pair', 'gy-set-model', 'gy-stack', 'hero-model', 'kv-branch', 'kv-daffodil', 'kv-daffodil-bw', 'kv-main', 'kv-pink', 'kw-beauty', 'kw-heritage', 'kw-tradition', 'lb-cm-bracelet-brown', 'lb-cm-brown', 'lb-cm-neck', 'lb-cm-rail', 'lb-cm-sit', 'lb-gy-black', 'lb-gy-flat', 'lb-gy-leaf', 'lb-gy-silk', 'lb-hands', 'lb-water', 'lb-wood', 'mg-bangle', 'mg-bangle-model', 'mg-earring-calla', 'mg-earring-front', 'mg-earring-light', 'mg-earring-model', 'mg-hand-dark', 'mg-hand-vertical', 'mg-necklace-angle', 'mg-necklace-front', 'mg-necklace-light', 'mg-necklace-model', 'mg-necklace-worn', 'model-bangle', 'model-bite', 'model-curtain', 'model-earring-blue', 'model-earring-white', 'model-sitting', 'model-turtleneck'];
  window.addEventListener('load', () => {
    const q = ALL_IMG.slice(); const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
    const next = () => { const n = q.shift(); if (!n) return; const im = new Image(); im.decoding = 'async'; im.onload = im.onerror = () => idle(next); im.src = IMG(n); };
    setTimeout(() => { for (let i = 0; i < 3; i++) idle(next); }, 600);
  });

  /* ---------- boot ---------- */
  injectSymbolDefs();
  // 모바일(≤760px) 전용 짧은 카피 — js/mobile.js. PC 폭에서는 원문 그대로.
  const mqM = window.matchMedia('(max-width: 760px)');
  if (YS.mobile) {
    YS.mobile(mqM.matches);
    mqM.addEventListener('change', (e) => { if (YS.mobile(e.matches)) { applyStatic(); renderBag(); route(); } });
  }
  applyStatic(); renderBag();
  window.addEventListener('hashchange', route);
  route(); markDone(document);
})();
