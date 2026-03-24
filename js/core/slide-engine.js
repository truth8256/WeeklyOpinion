/* ============================================================
   core/slide-engine.js
   슬라이드 전환 · data.js 파싱 · 11종 렌더러
   ============================================================ */

const SlideEngine = (() => {

  /* ── 상태 ── */
  let _slides = [];
  let _current = 0;
  let _frozen = false;
  let _blackout = false;
  let _chartCache = {};          // id → echarts instance

  /* ── DOM 참조 ── */
  let _container, _hud, _blackoutEl, _freezeIndicator;

  /* ─────────────────────────────────────────
     초기화
  ───────────────────────────────────────── */
  function init(config) {
    _container = document.getElementById('slide-container');
    _hud = document.getElementById('slide-hud');
    _blackoutEl = document.getElementById('slide-blackout');
    _freezeIndicator = document.getElementById('slide-freeze-indicator');

    if (!_container) { console.error('[SlideEngine] #slide-container 없음'); return; }
    if (!config || !config.slides?.length) { console.error('[SlideEngine] 슬라이드 데이터 없음'); return; }

    _slides = config.slides;

    // 테마 적용
    if (config.theme) document.body.dataset.theme = config.theme;

    // 스케일 조정 (1920x1080 고정 원칙으로 비활성화)
    // _applyScale();
    // window.addEventListener('resize', _applyScale);

    // 슬라이드 렌더링
    _renderAll();

    // 첫 슬라이드 표시
    _activate(0, false);

    // 키보드 연동
    if (window.KeyboardNav) KeyboardNav.init(publicAPI);

    console.log(`[SlideEngine] ${_slides.length}개 슬라이드 준비 완료`);
  }

  /* ── CSS Scale (1920×1080 고정) ── */
  function _applyScale() {
    // scale 사용 금지 원칙에 따라 동작 제거
    if (!_container) return;
    _container.style.position = 'relative';
    _container.style.transform = 'none';
    _container.style.left = '0';
    _container.style.top = '0';
  }

  /* ── 전체 슬라이드 DOM 렌더링 ── */
  function _renderAll() {
    _container.innerHTML = '';
    _slides.forEach((slide, idx) => {
      const el = _buildSlide(slide, idx);
      _container.appendChild(el);
    });
  }

  /* ── 슬라이드 DOM 생성 (타입 디스패치) ── */
  function _buildSlide(slide, idx) {
    const el = document.createElement('div');
    el.className = 'slide';
    el.dataset.idx = idx;
    el.dataset.type = slide.type;
    el.dataset.id = slide.id || `slide-${idx}`;

    const renderer = RENDERERS[slide.type];
    if (renderer) {
      el.innerHTML = renderer(slide, idx);
    } else {
      el.innerHTML = `<div style="color:#f78166;padding:40px;font-size:32px">
        Unknown slide type: <b>${slide.type}</b></div>`;
    }
    return el;
  }

  /* ── 타이틀 바 헬퍼 ── */
  function _buildTitleBar(d) {
    if (!d.title) return '';
    return `
        <div class="slide-header">
          <div class="slide-title-bar">
            <!-- 텍스트 영역만 따로 묶어서 가로(row) 배치 -->
            <div style="display:flex; flex-direction:row; align-items:baseline; gap:20px;">
              <h2 class="text-headline-1" style="margin:0;">${d.title}</h2>
              ${d.subtitle ? `<div class="text-headline-3" style="color:var(--text-secondary);font-size:28px;margin:0;">${d.subtitle}</div>` : ''}
            </div>
          </div>
        </div>`;
  }

  /* ─────────────────────────────────────────
     슬라이드 렌더러 11종
  ───────────────────────────────────────── */
  const RENDERERS = {

    /* 1. title ─────────────────────────────── */
    title(slide) {
      const d = slide.data;
      return `
        <div class="slide-body" style="flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:32px;padding:100px 120px;">
          ${d.eyebrow ? `<div class="text-headline-3 anim-seq" data-anim="animate-in" style="font-size:32px;color:var(--text-accent);margin-bottom:-16px">${d.eyebrow}</div>` : ''}
          <h1 class="text-display-1 anim-seq" data-anim="animate-in" style="font-size:120px; margin-top:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px;">
            <span style="color:var(--text-accent)">${d.title}</span>
            ${d.subtitle ? `<span style="font-size:0.6em; font-weight:500; color:var(--text-secondary); line-height:1.4; word-break:keep-all;">${d.subtitle}</span>` : ''}
          </h1>
          ${d.date ? `<div class="text-caption anim-seq" data-anim="animate-in" style="margin-top:16px">${d.date}</div>` : ''}
        </div>`;
    },

    /* 2. keyword ───────────────────────────── */
    keyword(slide) {
      const d = slide.data;
      return `
        <div class="slide-header">
        <div class="slide-body" style="flex-direction:column;justify-content:center;align-items:flex-start;gap:28px;padding-left:100px;padding-right:100px;">
          <div class="text-keyword" data-anim="animate-keyword" style="line-height:1.3;max-width:1600px">${d.keyword}</div>
          ${d.context ? `<p class="text-body-large anim-seq" style="color:var(--text-secondary);max-width:1200px">${d.context}</p>` : ''}
        </div>
        </div>`;
    },

    /* 3. big-number ────────────────────────── */
    'big-number'(slide) {
      const d = slide.data;
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body" style="flex-direction:column;justify-content:center;align-items:center;gap:20px;">
          <div class="text-big-number" data-anim="animate-number-pop" style="color:var(--text-accent)"
               data-countup="${d.value}" data-suffix="${d.unit || ''}">${d.value}${d.unit || ''}</div>
          ${d.sublabel ? `<p class="text-body-large anim-seq" style="color:var(--text-secondary)">${d.sublabel}</p>` : ''}
          ${d.diff ? `<div class="text-headline-3 anim-seq" style="color:${d.diff > 0 ? 'var(--accent-green)' : 'var(--accent-red)'}">${Format.diff(d.diff)}</div>` : ''}
        </div>`;
    },

    /* 4. bar-h ─────────────────────────────── */
    'bar-h'(slide, idx) {
      const d = slide.data;
      const chartId = `chart-bar-h-${idx}`;
      setTimeout(() => BarChart.renderHorizontal(chartId, d), 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
        </div>`;
    },

    /* 5. bar-v ─────────────────────────────── */
    'bar-v'(slide, idx) {
      const d = slide.data;
      const chartId = `chart-bar-v-${idx}`;
      setTimeout(() => BarChart.renderVertical(chartId, d), 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
        </div>`;
    },

    /* 5-2. bar-v-group ─────────────────────── */
    'bar-v-group'(slide, idx) {

      const d = slide.data;
      const chartId = `chart-bar-v-group-${idx}`;
      setTimeout(() => BarChart.renderVerticalGroup(chartId, d), 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
        </div>`;
    },

    /* 5-3. bar-h-group ─────────────────────── */
    'bar-h-group'(slide, idx) {
      const d = slide.data;
      const chartId = `chart-bar-h-group-${idx}`;
      setTimeout(() => BarChart.renderHorizontalGroup(chartId, d), 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
        </div>`;
    },

    /* 6. donut ─────────────────────────────── */
    donut(slide, idx) {
      const d = slide.data;
      const chartId = `chart-donut-${idx}`;
      setTimeout(() => DonutChart.render(chartId, d), 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
        </div>`;
    },

    /* 6-2. donut-detail ────────────────────── */
    'donut-detail'(slide, idx) {
      const d = slide.data;
      const chartId = `chart-donut-detail-${idx}`;
      setTimeout(() => DonutChart.render(chartId, d), 50);

      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div class="layout-sidebar">
            <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
            <div class="card" style="display:flex; flex-direction:column; justify-content:center; gap:24px; padding: 60px;">
              <div>
                <h3 style="font-size:24px; color:var(--text-accent); margin-bottom:24px; font-weight:700;">조사 문항</h3>
                <p style="font-size:44px; line-height:1.45; font-weight:700; word-break:keep-all; color:var(--text-primary);">${d.question || ''}</p>
              </div>
            </div>
          </div>
        </div>`;
    },

    /* 7. line ──────────────────────────────── */
    line(slide, idx) {
      const d = slide.data;
      const chartId = `chart-line-${idx}`;
      setTimeout(() => LineChart.render(chartId, d), 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
        </div>`;
    },

    /* 8. versus ────────────────────────────── */
    versus(slide) {
      const d = slide.data;
      const a = d.a, b = d.b;
      const aColor = a.color || 'var(--accent-blue)';
      const bColor = b.color || 'var(--accent-red)';
      const totalA = parseFloat(a.value) || 0;
      const totalB = parseFloat(b.value) || 0;
      const winner = totalA > totalB ? 'a' : totalA < totalB ? 'b' : null;
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body" style="align-items:center;gap:0;padding:20px 60px 0;">
          <!-- A 후보 -->
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:24px;padding:40px;">
            ${a.image ? `<img src="${a.image}" style="width:200px;height:200px;border-radius:50%;object-fit:cover;border:4px solid ${aColor};">` : `<div style="width:200px;height:200px;border-radius:50%;background:${aColor}22;border:4px solid ${aColor};display:flex;align-items:center;justify-content:center;font-size:80px;font-weight:800;color:${aColor}">${a.name[0]}</div>`}
            <div class="text-headline-2" style="color:${aColor}">${a.name}</div>
            <div class="text-big-number-sm ${winner === 'a' ? 'animate-number-pop' : ''}" style="color:${aColor}">${a.value}${d.unit || '%'}</div>
            ${a.sub ? `<div class="text-body" style="color:var(--text-secondary)">${a.sub}</div>` : ''}
            ${winner === 'a' ? `<div class="slide-badge" style="background:${aColor}22;border-color:${aColor};color:${aColor}">▲ 오차범위 내 우위</div>` : (winner ? `<div class="slide-badge" style="visibility:hidden">▲ 투명멘트</div>` : '')}
          </div>
          <!-- VS 구분선 -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px;flex-shrink:0;width:120px;">
            <div class="animate-vs-line" style="width:2px;height:140px;background:var(--border-default);"></div>
            <div class="text-display-2" style="color:var(--text-muted)">VS</div>
            <div class="animate-vs-line" style="width:2px;height:140px;background:var(--border-default);"></div>
          </div>
          <!-- B 후보 -->
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:24px;padding:40px;">
            ${b.image ? `<img src="${b.image}" style="width:200px;height:200px;border-radius:50%;object-fit:cover;border:4px solid ${bColor};">` : `<div style="width:200px;height:200px;border-radius:50%;background:${bColor}22;border:4px solid ${bColor};display:flex;align-items:center;justify-content:center;font-size:80px;font-weight:800;color:${bColor}">${b.name[0]}</div>`}
            <div class="text-headline-2" style="color:${bColor}">${b.name}</div>
            <div class="text-big-number-sm ${winner === 'b' ? 'animate-number-pop' : ''}" style="color:${bColor}">${b.value}${d.unit || '%'}</div>
            ${b.sub ? `<div class="text-body" style="color:var(--text-secondary)">${b.sub}</div>` : ''}
            ${winner === 'b' ? `<div class="slide-badge" style="background:${bColor}22;border-color:${bColor};color:${bColor}">▲ 우위</div>` : (winner ? `<div class="slide-badge" style="visibility:hidden">▲ 우위</div>` : '')}
          </div>
        </div>`;
    },

    /* 9. cross-tab ─────────────────────────── */
    'cross-tab'(slide, idx) {
      const d = slide.data;
      const chartId = `chart-cross-${idx}`;
      setTimeout(() => StackChart.render(chartId, d), 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
        </div>`;
    },

    /* 10. dual-cross-tab ───────────────────── */
    'dual-cross-tab'(slide, idx) {
      const d = slide.data;
      const idL = `chart-dct-l-${idx}`;
      const idR = `chart-dct-r-${idx}`;
      setTimeout(() => {
        StackChart.render(idL, d.left);
        StackChart.render(idR, d.right);
      }, 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body" style="gap:2px; padding-top:16px;">
          <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
            <div class="text-headline-3" style="color:var(--text-accent); text-align:center; padding:0 20px; font-size:30px;">${d.left.title}</div>
            <div id="${idL}" style="flex:1; min-height:500px;"></div>
          </div>
          <div class="divider-v" style="margin:40px 0;"></div>
          <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
            <div class="text-headline-3" style="color:var(--text-accent); text-align:center; padding:0 20px; font-size:30px;">${d.right.title}</div>
            <div id="${idR}" style="flex:1; min-height:500px;"></div>
          </div>
        </div>`;
    },

    /* 11. multi-compare ────────────────────── */
    'multi-compare'(slide, idx) {
      const d = slide.data;
      const idA = `chart-compare-a-${idx}`;
      const idB = `chart-compare-b-${idx}`;
      setTimeout(() => {
        BarChart.renderHorizontal(idA, d.left);
        BarChart.renderHorizontal(idB, d.right);
      }, 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body" style="gap:2px;padding-top:16px;">
          <div style="flex:1;display:flex;flex-direction:column;gap:12px;">
            <div class="text-headline-3" style="color:var(--text-accent);text-align:center;padding:0 20px;">${d.left.title}</div>
            <div id="${idA}" style="flex:1;min-height:500px;"></div>
            ${d.left.source ? `<div class="text-caption" style="text-align:center">${d.left.source}</div>` : ''}
          </div>
          <div class="divider-v" style="margin:40px 0;"></div>
          <div style="flex:1;display:flex;flex-direction:column;gap:12px;">
            <div class="text-headline-3" style="color:var(--accent-orange);text-align:center;padding:0 20px;">${d.right.title}</div>
            <div id="${idB}" style="flex:1;min-height:500px;"></div>
            ${d.right.source ? `<div class="text-caption" style="text-align:center">${d.right.source}</div>` : ''}
          </div>
        </div>`;
    },

    /* 11. source ───────────────────────────── */
    source(slide) {
      const d = slide.data;
      const rows = d.items || [];
      const colCount = Math.min(rows.length, 4);
      const isMany = rows.length > 2;
      return `
        <div class="slide-body" style="flex-direction:column;justify-content:center;align-items:center;gap:40px;">
          <h2 class="text-headline-1 anim-seq" style="text-align:center; font-size: 60px; margin-bottom: 20px;">${d.title || '조사 개요'}</h2>
          <div style="display:grid;grid-template-columns:repeat(${colCount},1fr);gap:32px;width:100%;max-width:1800px;padding:0 40px;">
            ${rows.map((row, i) => `
              <div class="card-elevated anim-seq" style="animation-delay:${i * 100}ms;padding:48px 40px;display:flex;flex-direction:column;gap:20px;min-height:400px;justify-content:center;">
                ${row.title ? `<div class="text-headline-2" style="color:var(--text-accent);font-size:32px;word-break:keep-all;line-height:1.4;margin-bottom:12px;font-weight:800;">${row.title}</div>` : ''}
                ${row.org ? `<div class="text-body" style="font-size:24px;word-break:keep-all;line-height:1.6;"><span style="color:var(--text-secondary);font-weight:600;">조사기관  </span>${row.org}</div>` : ''}
                ${row.period ? `<div class="text-body" style="font-size:24px;word-break:keep-all;line-height:1.6;"><span style="color:var(--text-secondary);font-weight:600;">조사기간  </span>${row.period}</div>` : ''}
                ${row.method ? `<div class="text-body" style="font-size:24px;word-break:keep-all;line-height:1.6;"><span style="color:var(--text-secondary);font-weight:600;">조사방법  </span>${row.method}</div>` : ''}
                ${row.n ? `<div class="text-body" style="font-size:24px;word-break:keep-all;line-height:1.6;"><span style="color:var(--text-secondary);font-weight:600;">표본수  </span>${Format.sampleSize(row.n)}</div>` : ''}
              </div>`).join('')}
          </div>
          ${d.disclaimer ? `<p class="text-caption anim-seq" style="max-width:1400px;text-align:center;color:var(--text-muted);font-size:20px;margin-top:20px;">${d.disclaimer}</p>` : ''}
        </div>`;
    },

    /* 12. survey-detail ────────────────────── */
    'survey-detail'(slide) {
      const d = slide.data;
      const items = d.items || [];
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body" style="gap:40px; align-items:center; padding-top:20px;">
          ${items.map((item, i) => `
            <div class="card-elevated anim-seq" style="flex:1; display:flex; flex-direction:column; gap:20px; padding:32px; min-height:480px; justify-content:flex-start; animation-delay:${i * 100}ms;">
              <div style="display:flex; align-items:center; gap:16px;">
                <div class="slide-badge" style="background:var(--text-accent); color:white; border:none; padding:4px 16px; font-size:24px;">${item.source}</div>
              </div>
              <div style="font-size:36px; font-weight:700; line-height:1.4; word-break:keep-all; color:var(--text-primary); flex-shrink:0;">
                ${item.question.replace(/\n/g, '<br>')}
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:auto;">
                ${item.options.map(opt => `
                  <div style="padding:8px 16px; background:var(--bg-primary); border:1.5px solid var(--border-default); border-radius:var(--radius-md); font-size:26px; font-weight:600; color:var(--text-secondary);">
                    ${opt}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>`;
    },

    /* 13. panel-overview ───────────────────── */
    'panel-overview'(slide) {
      const d = slide.data;
      const features = d.features || [];
      const headers = d.headers || [];
      const rows = d.rows || [];
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body" style="flex-direction:column; gap:20px; padding:16px 60px 12px; align-items:center; overflow:hidden;">
          <div style="width:100%; max-width:1200px; display:flex; flex-direction:column; gap:20px; flex:1; min-height:0;">
            <div class="card-elevated anim-seq" style="padding:28px 36px; display:flex; flex-direction:column; gap:12px; flex:0 0 auto;">
              <div style="background:var(--text-accent); color:white; padding:4px 18px; border-radius:6px; font-size:24px; font-weight:700; width:fit-content; margin-bottom:4px;">개요</div>
              ${(d.meta || []).map(m => `
                <div style="display:flex; gap:16px; font-size:24px; line-height:1.5;">
                  <span style="color:var(--text-secondary); font-weight:700; white-space:nowrap; min-width:100px;">${m.label}</span>
                  <span style="color:var(--text-primary);">${m.value}</span>
                </div>`).join('')}
            </div>
            <div class="anim-seq card-elevated" style="overflow:hidden; animation-delay:160ms; flex:1; min-height:0; display:flex; flex-direction:column;">
              <table style="width:100%; border-collapse:collapse; font-size:24px;">
                <thead>
                  <tr style="background:var(--text-accent); color:white;">
                    ${headers.map(h => `<th style="padding:12px 16px; font-weight:700; text-align:center; white-space:nowrap;">${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${rows.map((row, i) => `
                    <tr style="background:${i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)'}; ${row.dim ? 'opacity:0.45;' : ''}">
                      ${row.cells.map(c => `<td style="padding:11px 16px; text-align:center; border-bottom:1px solid var(--border-default);">${c}</td>`).join('')}
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
            ${d.disclaimer ? `<p class="text-caption anim-seq" style="text-align:right; color:var(--text-muted); font-size:19px; padding:0 4px; margin-top:-8px;">${d.disclaimer}</p>` : ''}
          </div>
        </div>`;
    },

    /* 15. two-box ──────────────────────────── */
    'two-box'(slide) {
      const d = slide.data;
      const boxes = d.boxes || [];
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body" style="flex-direction:column; gap:24px; padding:36px 80px 48px; align-items:center; justify-content:flex-start; overflow:hidden;">
          <div style="width:100%; max-width:1600px; display:flex; flex-direction:row; gap:24px; height:540px;">
            ${boxes.map((box, i) => `
              <div class="card-elevated anim-seq" style="flex:1; display:flex; flex-direction:column; animation-delay:${i * 150}ms; overflow:hidden;">
                <div style="background:var(--text-accent); color:white; padding:16px 32px; font-size:38px; font-weight:700; letter-spacing:-0.3px; flex-shrink:0;">
                  ${box.heading}
                </div>
                <div style="padding:28px 32px; display:flex; flex-direction:column; justify-content:space-around; flex:1;">
                  ${(box.bullets || []).map(b => `
                    <div style="display:flex; gap:16px; align-items:flex-start; font-size:34px; line-height:1.5; word-break:keep-all; min-height:96px;">
                      <span style="color:${b.color || 'var(--text-accent)'}; font-weight:800; flex-shrink:0; padding-top:2px;">${b.name}</span>
                      <span style="color:var(--text-secondary);">${b.text}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>`;
    },

    /* 14. image ───────────────────────────── */
    image(slide) {
      const d = slide.data;
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body" style="display:flex; justify-content:center; align-items:center; padding: 20px;">
          <img src="${d.src}" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:8px;">
        </div>
      `;
    },

    /* 14. sankey ────────────────────────────── */
    sankey(slide, idx) {
      const d = slide.data;
      const chartId = `chart-sankey-${idx}`;
      setTimeout(() => SankeyChart.render(chartId, d), 50);
      return `
        ${_buildTitleBar(d)}
        <div class="slide-body">
          <div id="${chartId}" style="width:100%;height:100%;min-height:600px;"></div>
        </div>
        ${d.source ? `<div class="text-caption" style="text-align:center;padding:4px 60px 16px;color:var(--text-muted)">${d.source}</div>` : ''}`;
    },
  };

  /* ─────────────────────────────────────────
     슬라이드 전환
  ───────────────────────────────────────── */
  function _activate(idx, animate = true) {
    if (idx < 0 || idx >= _slides.length) return;
    if (_frozen) return;

    const slides = _container.querySelectorAll('.slide');

    // 이전 슬라이드 비활성화
    slides.forEach(s => s.classList.remove('is-active', 'entering-right', 'entering-left'));

    // 방향 계산
    const dir = idx >= _current ? 'entering-right' : 'entering-left';
    _current = idx;

    const target = slides[idx];
    if (!target) return;

    if (animate) target.classList.add(dir);
    target.classList.add('is-active');

    // 애니메이션 실행
    setTimeout(() => {
      if (window.AnimUtils) AnimUtils.runSlideAnimations(target);
      ChartUtils.resizeAll();
      if (window.ChartUtils && ChartUtils.replay) ChartUtils.replay(target); // 차트 애니메이션 다시 그려주기
    }, 50);

    _updateHUD();
  }

  function _updateHUD() {
    if (_hud) _hud.textContent = `${_current + 1} / ${_slides.length}`;
  }

  /* ─────────────────────────────────────────
     Public API
  ───────────────────────────────────────── */
  const publicAPI = {
    init,

    next() { _activate(_current + 1); },
    prev() { _activate(_current - 1); },
    goTo(idx) { _activate(idx); },
    replay() {
      const el = _container.querySelectorAll('.slide')[_current];
      el?.classList.remove('is-active');
      void el?.offsetWidth;
      el?.classList.add('is-active');
      if (window.AnimUtils) AnimUtils.runSlideAnimations(el);
      ChartUtils.resizeAll();
      if (window.ChartUtils && ChartUtils.replay) ChartUtils.replay(el); // 강제 새로고침 리플레이 시 차트 연동
    },

    toggleBlackout() {
      _blackout = !_blackout;
      _blackoutEl?.classList.toggle('is-active', _blackout);
    },
    toggleFreeze() {
      _frozen = !_frozen;
      _freezeIndicator?.classList.toggle('is-active', _frozen);
    },

    getTotal() { return _slides.length; },
    getCurrent() { return _current; },
  };

  return publicAPI;
})();

window.SlideEngine = SlideEngine;
