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
          fontSize: 32,
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
   * 그룹 세로 막대 차트 (bar-v-group)
   * @param {string} containerId
   * @param {Object} data
   *   categories: ['18~29세', '30대', ...]
   *   series: [{name, data:[...], color}]
   *   unit: '%'
   */
  function renderVerticalGroup(containerId, data) {
    const chart = ChartUtils.init(containerId);
    const unit = data.unit || '%';
    const categories = data.categories || [];
    const series = data.series || [];

    const option = {
      ...ChartUtils.ANIMATION_DEFAULTS,
      animationDelay: idx => idx * 80,

      legend: {
        data: series.map(s => s.name),
        top: 0,
        right: 40,
        textStyle: {
          ...ChartUtils.TEXT_STYLE,
          fontSize: 24,
          color: '#374151',
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        },
        icon: 'roundRect',
        itemWidth: 28,
        itemHeight: 16,
        itemGap: 32,
      },

      grid: { top: 60, right: 60, bottom: 80, left: 80 },

      xAxis: {
        type: 'category',
        data: categories,
        axisLine: { lineStyle: { color: '#d1d5db' } },
        axisTick: { show: false },
        axisLabel: {
          ...ChartUtils.TEXT_STYLE,
          color: '#111827',
          fontSize: 30,
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
          formatter: v => `${v}${unit}`,
        },
        splitLine: {
          lineStyle: { color: '#e5e7eb', type: 'dashed' },
        },
      },

      series: series.map(s => ({
        name: s.name,
        type: 'bar',
        data: s.data.map(v => ({
          value: v,
          itemStyle: {
            color: s.color || '#2563EB',
            borderRadius: [8, 8, 0, 0],
          },
        })),
        barMaxWidth: 90,
        barGap: '15%',
        label: {
          show: true,
          position: 'top',
          ...ChartUtils.LABEL_STYLE,
          color: '#111827',
          fontSize: 28,
          formatter: params => `${params.value}${unit}`,
        },
        emphasis: { disabled: true },
      })),

      tooltip: ChartUtils.tooltipOption(
        params => `${params.seriesName}<br/>${params.name}: <b>${params.value}${unit}</b>`
      ),
    };

    chart.setOption(option);
    return chart;
  }

  return { renderHorizontal, renderVertical, renderVerticalGroup };
})();

window.BarChart = BarChart;
