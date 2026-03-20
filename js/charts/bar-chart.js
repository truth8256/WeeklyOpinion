/* ============================================================
   charts/bar-chart.js — 가로/세로 막대 차트 (ECharts)
   슬라이드 타입: bar-h, bar-v
   ============================================================ */

const BarChart = (() => {

  /**
   * 가로 막대 차트 렌더링 (정당 지지율 핵심)
   * @param {string} containerId
   * @param {Object} data - 슬라이드 data 객체
   *   items: [{label, value, color}]
   *   unit: '%'
   *   maxValue: 자동 계산 (선택)
   */
  function renderHorizontal(containerId, data) {
    const chart = ChartUtils.init(containerId);
    const validItems = ChartUtils.validateData(data.items || [], 5);
    const items = [...validItems]; // 입력된 데이터 순서 그대로 유지
    const colors = ColorMap.mapColors(items);
    const maxVal = data.maxValue || Math.ceil(Math.max(...items.map(i => i.value)) * 1.15);
    const unit = data.unit || '%';

    const option = {
      ...ChartUtils.ANIMATION_DEFAULTS,
      animationDelay: idx => idx * 100, // 통통 튀는 간격을 줄여 속도감을 높임

      grid: { top: 40, right: 260, bottom: 40, left: 340 },

      xAxis: {
        type: 'value',
        max: maxVal,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: {
          show: true,
          lineStyle: { color: '#e5e7eb', type: 'dashed', width: 1 },
        },
      },

      yAxis: {
        type: 'category',
        data: items.map(i => i.label),
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          ...ChartUtils.TEXT_STYLE,
          color: '#111827',
          fontSize: 38,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          fontWeight: '600',
          margin: 20,
        },
      },

      series: [{
        type: 'bar',
        data: items.map((item, i) => ({
          value: item.value,
          itemStyle: {
            color: colors[i],
            borderRadius: [0, 10, 10, 0],
          },
        })),
        barMaxWidth: 72,
        barCategoryGap: '30%',
        label: {
          show: true,
          position: 'right',
          ...ChartUtils.LABEL_STYLE,
          color: '#111827',
          fontSize: 32,
          formatter: params => `${params.value.toFixed(1)}${unit}`,
          distance: 12,
        },
        emphasis: { disabled: true },
      }],

      tooltip: ChartUtils.tooltipOption(
        params => `${params.name}: <b>${params.value.toFixed(1)}${unit}</b>`
      ),
    };

    chart.setOption(option);
    return chart;
  }

  /**
   * 세로 막대 차트
   */
  function renderVertical(containerId, data) {
    const chart = ChartUtils.init(containerId);
    const items = ChartUtils.validateData(data.items || [], 5);
    const colors = ColorMap.mapColors(items);
    const unit = data.unit || '%';

    const option = {
      ...ChartUtils.ANIMATION_DEFAULTS,
      animationDelay: idx => idx * 100, // 세로형도 동일하게 간격 최소화

      grid: { top: 80, right: 80, bottom: 100, left: 80 },

      xAxis: {
        type: 'category',
        data: items.map(i => i.label),
        axisLine: { lineStyle: { color: '#d1d5db' } },
        axisTick: { show: false },
        axisLabel: {
          ...ChartUtils.TEXT_STYLE,
          color: '#111827',
          fontSize: 32,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          interval: 0,
        },
      },

      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { ...ChartUtils.TEXT_STYLE, fontSize: 18 },
        splitLine: {
          lineStyle: { color: '#e5e7eb', type: 'dashed' },
        },
      },

      series: [{
        type: 'bar',
        data: items.map((item, i) => ({
          value: item.value,
          itemStyle: {
            color: colors[i],
            borderRadius: [8, 8, 0, 0],
          },
        })),
        barMaxWidth: 100,
        label: {
          show: true,
          position: 'top',
          ...ChartUtils.LABEL_STYLE,
          color: '#111827',
          fontSize: 32,
          formatter: params => `${params.value.toFixed(1)}${unit}`,
        },
        emphasis: { disabled: true },
      }],

      tooltip: ChartUtils.tooltipOption(
        params => `${params.name}: <b>${params.value.toFixed(1)}${unit}</b>`
      ),
    };

    chart.setOption(option);
    return chart;
  }

  /**
   * 세로 막대 그룹(묶음) 차트 (10월 vs 2월 비교용 등)
   * @param {string} containerId
   * @param {Object} data 
   *   categories: ['서울', '18~29세', '30대']
   *   series: [ { name: '10월', data: [36, 29, 33], color: '#...' }, { name: '2월', data: [46, 37, 42] } ]
   *   unit: '%'
   */
  function renderVerticalGroup(containerId, data) {
    const chart = ChartUtils.init(containerId);
    const unit = data.unit || '%';
    const labelUnit = data.labelUnit ?? '';
    const labelDecimals = data.labelDecimals ?? 1;
    const categories = data.categories || [];
    const seriesData = data.series || [];

    const series = seriesData.map((s, i) => {
      const color = s.color || ColorMap.get(s.name, i);
      return {
        name: s.name,
        type: 'bar',
        data: s.data,
        itemStyle: {
          color: color,
          borderRadius: [8, 8, 0, 0],
        },
        barMaxWidth: 80,
        barGap: '10%',
        label: {
          show: true,
          position: 'top',
          ...ChartUtils.LABEL_STYLE,
          color: '#111827',
          fontSize: 32,
          formatter: params => `${params.value.toFixed(labelDecimals)}${labelUnit}`,
          distance: 12
        },
        emphasis: { disabled: true },
      };
    });

    const option = {
      ...ChartUtils.ANIMATION_DEFAULTS,
      animationDelay: idx => idx * 100,

      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#d1d5db',
        borderWidth: 1,
        textStyle: { color: '#111827', fontSize: 28, fontFamily: "'Pretendard Variable', sans-serif" },
        formatter: params => {
          let html = `<div style="margin-bottom:8px;color:#6b7280;font-size:24px;">${params[0].axisValue}</div>`;
          params.forEach(p => {
            html += `<div style="display:flex;justify-content:space-between;gap:24px;align-items:center;">
              <span>${p.marker}${p.seriesName}</span>
              <b style="font-family:'Pretendard Variable', sans-serif;font-size:28px;">${p.value?.toFixed(1)}${unit}</b>
            </div>`;
          });
          return html;
        }
      },

      legend: {
        top: 0,
        right: 80,
        icon: 'circle',
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 32,
        textStyle: { color: '#111827', fontSize: 34, fontFamily: "'Pretendard Variable', sans-serif", fontWeight: '600' },
      },

      grid: { top: 120, right: 80, bottom: 100, left: 80 },

      xAxis: {
        type: 'category',
        data: categories,
        axisLine: { lineStyle: { color: '#d1d5db' } },
        axisTick: { show: false },
        axisLabel: {
          ...ChartUtils.TEXT_STYLE,
          color: '#111827',
          fontSize: 32,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          fontWeight: '600',
          interval: 0,
        },
      },

      yAxis: {
        type: 'value',
        min: 0,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          ...ChartUtils.TEXT_STYLE,
          fontSize: 20,
          formatter: v => `${v}${unit}`
        },
        splitLine: {
          lineStyle: { color: '#e5e7eb', type: 'dashed' },
        },
      },

      series: series
    };

    chart.setOption(option);
    return chart;
  }

  /**
   * 가로 막대 그룹(묶음) 차트 — 두 집단 비교용 (뉴 vs 올드 등)
   * @param {string} containerId
   * @param {Object} data
   *   categories: ['외교/안보', '내란극복', ...]
   *   series: [ { name: '뉴 이재명', data: [65.1, 25.5, ...], color: '#...' }, ... ]
   *   unit: '%'
   *   maxValue: (선택)
   *   gridLeft: (선택, 기본 360)
   *   gridRight: (선택, 기본 180)
   */
  function renderHorizontalGroup(containerId, data) {
    const chart = ChartUtils.init(containerId);
    const unit = data.unit || '%';
    const categories = data.categories || [];
    const seriesData = data.series || [];
    const allValues = seriesData.flatMap(s => s.data.filter(v => v != null));
    const maxVal = data.maxValue || Math.ceil(Math.max(...allValues) * 1.2);

    const series = seriesData.map((s, i) => {
      const color = s.color || ColorMap.get(s.name, i);
      return {
        name: s.name,
        type: 'bar',
        data: s.data,
        itemStyle: { color, borderRadius: [0, 8, 8, 0] },
        barMaxWidth: 52,
        barGap: '8%',
        label: {
          show: true,
          position: 'right',
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          fontWeight: '600',
          fontSize: 34,
          color: '#111827',
          formatter: params => `${params.value.toFixed(1)}${unit}`,
          distance: 8,
        },
        emphasis: { disabled: true },
      };
    });

    const option = {
      ...ChartUtils.ANIMATION_DEFAULTS,
      animationDelay: idx => idx * 80,

      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#d1d5db',
        borderWidth: 1,
        textStyle: { color: '#111827', fontSize: 28, fontFamily: "'Pretendard Variable', sans-serif" },
        formatter: params => {
          let html = `<div style="margin-bottom:8px;color:#6b7280;font-size:24px;">${params[0].axisValue}</div>`;
          params.forEach(p => {
            html += `<div style="display:flex;justify-content:space-between;gap:24px;align-items:center;">
              <span>${p.marker}${p.seriesName}</span>
              <b style="font-family:'Pretendard Variable', sans-serif;font-size:28px;">${p.value?.toFixed(1)}${unit}</b>
            </div>`;
          });
          return html;
        },
      },

      legend: {
        top: 0,
        right: 80,
        icon: 'circle',
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 32,
        textStyle: { color: '#111827', fontSize: 34, fontFamily: "'Pretendard Variable', sans-serif", fontWeight: '600' },
      },

      grid: { top: 80, right: data.gridRight || 180, bottom: 40, left: data.gridLeft || 360 },

      xAxis: {
        type: 'value',
        max: maxVal,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: {
          show: true,
          lineStyle: { color: '#e5e7eb', type: 'dashed', width: 1 },
        },
      },

      yAxis: {
        type: 'category',
        data: categories,
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          color: '#111827',
          fontSize: 38,
          fontWeight: '600',
          margin: 20,
        },
      },

      series,
    };

    chart.setOption(option);
    return chart;
  }

  return { renderHorizontal, renderVertical, renderVerticalGroup, renderHorizontalGroup };
})();

window.BarChart = BarChart;
