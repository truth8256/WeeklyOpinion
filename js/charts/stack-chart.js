/* ============================================================
   charts/stack-chart.js — 세대/성별 교차 스택 막대 (ECharts)
   슬라이드 타입: cross-tab
   ============================================================ */

const StackChart = (() => {

  /**
   * 100% 스택 가로 막대 (세대/성별 교차분석)
   * @param {string} containerId
   * @param {Object} data
   *   categories: ['20대', '30대', '40대', '50대', '60대+']
   *   series: [
   *     { name: '더불어민주당', data: [55, 52, 48, 41, 38], color: '...' },
   *     { name: '국민의힘',    data: [30, 33, 38, 47, 52], color: '...' },
   *   ]
   *   unit: '%'
   *   orientation: 'horizontal' | 'vertical'  (기본: horizontal)
   */
  function render(containerId, data) {
    const chart = ChartUtils.init(containerId);
    const unit = data.unit || '%';
    const isHorizontal = (data.orientation || 'horizontal') === 'horizontal';

    const validSeries = ChartUtils.validateData(data.series || [], 3);
    const seriesList = validSeries.map((s, i) => {
      const color = s.color || ColorMap.get(s.name, i);
      return {
        name: s.name,
        type: 'bar',
        stack: 'total',
        data: s.data,
        itemStyle: { color },
        label: {
          show: true,
          position: 'inside',
          ...ChartUtils.LABEL_STYLE,
          fontSize: 32,
          color: '#fff',
          formatter: params => params.value >= 6 ? `${params.value.toFixed(1)}${unit}` : '',
        },
        emphasis: { focus: 'series' },
      };
    });

    const categoryAxis = {
      type: 'category',
      data: data.categories,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#111827',
        fontSize: 32,
        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        fontWeight: '600',
      },
    };

    const valueAxis = {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#6b7280',
        fontSize: 32,
        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        formatter: v => `${v}${unit}`,
      },
      splitLine: {
        lineStyle: { color: '#e5e7eb', type: 'dashed' },
      },
    };

    const option = {
      animation: false, // 사용자 요청에 따라 막대/라인 외 차트는 애니메이션 제거

      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#d1d5db',
        borderWidth: 1,
        textStyle: { color: '#111827', fontSize: 32, fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif" },
        formatter: params => {
          const header = `<div style="margin-bottom:8px;color:#6b7280">${params[0].axisValue}</div>`;
          const rows = params.map(p =>
            `<div style="display:flex;justify-content:space-between;gap:24px">
              <span>${p.marker}${p.seriesName}</span>
              <b style="font-family:'Pretendard Variable', sans-serif">${p.value?.toFixed(1)}${unit}</b>
            </div>`
          ).join('');
          return header + rows;
        },
      },

      legend: {
        top: 0,
        right: 80,
        icon: 'circle',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 28,
        textStyle: { color: '#111827', fontSize: 32, fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif" },
      },

      grid: isHorizontal
        ? { top: 80, right: 80, bottom: 40, left: 280 }
        : { top: 120, right: 80, bottom: 60, left: 100 },

      xAxis: isHorizontal ? valueAxis : { ...categoryAxis, axisTick: { show: false } },
      yAxis: isHorizontal ? { ...categoryAxis, inverse: true } : valueAxis,
      series: seriesList,
    };

    chart.setOption(option);
    return chart;
  }

  return { render };
})();

window.StackChart = StackChart;
