/* ============================================================
   charts/line-chart.js — 시계열 추이 선형 차트 (ECharts)
   슬라이드 타입: line
   ============================================================ */

const LineChart = (() => {

  /**
   * @param {string} containerId
   * @param {Object} data
   *   dates:  ['2025.01', '2025.02', ...]
   *   series: [{name, data: [47.3, 48.1, ...], color?}]
   *   unit:   '%'
   *   yMin:   y축 최소값 (선택)
   *   yMax:   y축 최대값 (선택)
   */
  function render(containerId, data) {
    const chart = ChartUtils.init(containerId);
    const unit = data.unit || '%';

    const validSeries = ChartUtils.validateData(data.series || [], 5);
    const seriesList = validSeries.map((s, i) => {
      const color = s.color || ColorMap.get(s.name, i);
      const isDashed = s.lineType === 'dashed';
      return {
        name: s.name,
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: { color, width: isDashed ? 3 : 4, type: isDashed ? 'dashed' : 'solid' },
        itemStyle: { color },
        label: {
          show: data.showLabel !== false,
          position: 'top',
          color: '#111827',
          fontSize: 32,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          fontWeight: '600',
          formatter: params => params.value != null ? `${params.value}${unit}` : '',
          distance: 10,
        },
        data: s.labelIndices
          ? s.data.map((v, idx) => ({
              value: v,
              label: { show: s.labelIndices.includes(idx) },
            }))
          : s.data,
        emphasis: {
          focus: 'series',
          lineStyle: { width: isDashed ? 3 : 5 },
          symbolSize: 14,
        },
        connectNulls: false,
      };
    });

    const option = {
      animation: true,
      animationDuration: 1200, // 2000ms 보다 담백하게
      animationEasing: 'cubicOut', // 튀지 않고 안착
      animationDelay: idx => idx * 200, // 데이터 포인트별 등장 간격 소폭 축소

      tooltip: {
        show: false,
      },

      legend: {
        top: 0,
        right: 80,
        icon: 'circle',
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 32,
        textStyle: { color: '#111827', fontSize: 38, fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif" },
      },

      grid: { top: 120, right: 80, bottom: 60, left: 100 },

      xAxis: {
        type: 'category',
        data: data.dates || data.categories,
        boundaryGap: true,
        axisLine: { lineStyle: { color: '#d1d5db' } },
        axisTick: { show: false },
        axisLabel: {
          color: '#6b7280',
          fontSize: 32,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          margin: 16,
          interval: Math.max(0, Math.floor((data.dates || data.categories || []).length / 8) - 1),
        },
      },

      yAxis: {
        type: 'value',
        min: data.yMin ?? null,
        max: data.yMax ?? null,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#6b7280',
          fontSize: 32,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          formatter: v => `${v}${unit}`,
        },
        splitLine: {
          lineStyle: { color: '#e5e7eb', type: 'dashed', width: 1 },
        },
      },

      series: seriesList,
    };

    chart.setOption(option);
    return chart;
  }

  return { render };
})();

window.LineChart = LineChart;
