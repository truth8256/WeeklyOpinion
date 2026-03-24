/* ============================================================
   charts/chart-utils.js — ECharts 공통 유틸
   ============================================================ */

const ChartUtils = (() => {

  /* ECharts 인스턴스 레지스트리 (resize/dispose 관리) */
  const registry = new Map();

  /**
   * ECharts 인스턴스 생성 또는 재사용
   * @param {string|HTMLElement} target - id 또는 DOM 요소
   * @returns {echarts.ECharts}
   */
  function init(target) {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    if (!el) throw new Error(`Chart target not found: ${target}`);

    // 이미 존재하면 반환
    if (registry.has(el)) return registry.get(el);

    const chart = echarts.init(el, null, { renderer: 'canvas' });
    registry.set(el, chart);
    return chart;
  }

  /**
   * 데이터 유효성 검증 (강제 규칙: 항목 5개 이하, 시리즈 3개 이하)
   */
  function validateData(arr, limit) {
    if (!Array.isArray(arr)) return arr;
    if (arr.length > limit) {
      console.warn(`[ChartUtils] 권장 차트 개수 초과: 최적의 방송 가독성을 위해 가급적 ${limit}개 이하 구성을 권장합니다. (입력: ${arr.length}개)`);
      // 강제로 자르지 않고 원본 데이터를 그대로 렌더링하도록 반환
      return arr;
    }
    return arr;
  }

  /**
   * 슬라이드 전환 시 모든 차트 resize (비활성화)
   */
  function resizeAll() {
    // ECharts 반응형 동작 차단 및 크기 고정 원칙을 위해 아무것도 하지 않음
  }

  /**
   * 특정 요소의 차트 dispose
   */
  function dispose(target) {
    const el = typeof target === 'string' ? document.getElementById(target) : target;
    if (el && registry.has(el)) {
      const chart = registry.get(el);
      if (!chart.isDisposed()) chart.dispose();
      registry.delete(el);
    }
  }

  /**
   * 전체 dispose
   */
  function disposeAll() {
    registry.forEach(chart => { if (!chart.isDisposed()) chart.dispose(); });
    registry.clear();
  }

  /**
   * 슬라이드 전환 시 대상 컨테이너 내부 차트 애니메이션 재재생 (Replay)
   */
  function replay(container) {
    if (!container) return;
    const charts = container.querySelectorAll('[id^="chart-"]');
    charts.forEach(el => {
      if (registry.has(el)) {
        const chart = registry.get(el);
        chart.resize(); // 슬라이드 활성화 시 캔버스 크기 갱신 (tooltip 히트 영역 복구)
        const option = chart.getOption();
        chart.clear(); // 데이터 지우고 강제 초기화
        chart.setOption(option); // 속성 재주입을 통한 애니메이션 트리거
      }
    });
  }

  /* ── 공통 텍스트 스타일 ── */
  const TEXT_STYLE = {
    fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
    color: '#6b7280',
    fontSize: 28, // 28px (최소) 이상으로 상향
  };

  const LABEL_STYLE = {
    fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
    fontWeight: '600',
    fontSize: 38, // 차트 라벨 최소 38px
  };

  const TITLE_STYLE = {
    fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
    fontWeight: '700',
    fontSize: 48,
    color: '#111827',
  };

  /* ── 공통 그리드 옵션 ── */
  function gridOption({ top = 20, right = 120, bottom = 40, left = 260 } = {}) {
    return { top, right, bottom, left, containLabel: false };
  }

  /* ── 공통 툴팁 ── */
  function tooltipOption(formatter) {
    return {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#d1d5db',
      borderWidth: 1,
      textStyle: { color: '#111827', fontSize: 32, fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif" },
      formatter,
    };
  }

  /* ── 애니메이션 (점잖고 매끄러운 모션) ── */
  const ANIMATION_DEFAULTS = {
    animation: true,
    animationDuration: 1000, // 1400 -> 1000 (너무 느리지 않게)
    animationEasing: 'cubicOut', // elasticOut 특유의 바운스 제거, 부드럽게 감속
    animationDelay: idx => idx * 100, // 순차 딜레이 간격 축소
  };

  /* ── 출처 워터마크 (차트 하단) ── */
  function sourceGraphic(text) {
    return {
      type: 'group',
      bottom: 0,
      right: 0,
      children: [{
        type: 'text',
        style: {
          text,
          fill: '#6b7280',
          fontSize: 28, // 출처 텍스트 최소 28px 기준
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        },
      }],
    };
  }

  return {
    init, resizeAll, dispose, disposeAll, validateData, replay,
    TEXT_STYLE, LABEL_STYLE, TITLE_STYLE,
    gridOption, tooltipOption, ANIMATION_DEFAULTS, sourceGraphic,
  };
})();

window.ChartUtils = ChartUtils;
