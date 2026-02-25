/* ============================================================
   charts/donut-chart.js — 도넛/파이 차트 (ECharts)
   슬라이드 타입: donut
   ============================================================ */

const DonutChart = (() => {

  /**
   * 도넛 차트 렌더링
   * @param {string} containerId
   * @param {Object} data
   *   items: [{label, value, color}]
   *   unit: '%'
   *   centerLabel: 중앙 강조 텍스트 (최다 응답 자동 선택 or 지정)
   *   centerSub: 중앙 보조 텍스트
   */
  function render(containerId, data) {
    const chart = ChartUtils.init(containerId);
    const items = ChartUtils.validateData(data.items || [], 5);
    const colors = ColorMap.mapColors(items);
    const unit = data.unit || '%';

    // 중앙 텍스트: 최대값 항목
    const topItem = [...items].sort((a, b) => b.value - a.value)[0];
    const formattedValue = Number.isInteger(topItem.value) ? topItem.value : topItem.value.toFixed(1);
    const centerLabel = data.centerLabel || `${formattedValue}${unit}`;
    const centerSub = data.centerSub || topItem.label;

    const seriesData = items.map((item, i) => ({
      name: item.label,
      value: item.value,
      itemStyle: { color: colors[i] },
    }));

    const option = {
      animation: false, // 사용자 요청에 따라 막대/라인 외 차트는 애니메이션 제거

      tooltip: ChartUtils.tooltipOption(
        params => `${params.name}<br/><b>${params.value.toFixed(1)}${unit}</b> (${params.percent?.toFixed(1)}%)`
      ),

      legend: {
        orient: 'vertical',
        right: '4%',
        top: 'middle',
        icon: 'circle',
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 24,
        textStyle: {
          color: '#111827',
          fontSize: 32,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          rich: {
            value: {
              color: '#6b7280',
              fontSize: 32,
              fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
              padding: [0, 0, 0, 12],
            },
          },
        },
        formatter: name => {
          const item = items.find(i => i.label === name);
          const val = item ? (Number.isInteger(item.value) ? item.value : item.value.toFixed(1)) : '';
          return item ? `${name}  {value|${val}${unit}}` : name;
        },
      },

      title: {
        text: centerLabel,
        subtext: centerSub,
        left: '38%',        // 도넛 차트 원형 중점과 완전 일치시킴
        top: 'center',      // 세로축도 정중앙 고정
        textAlign: 'center',
        itemGap: 16,
        textStyle: {
          color: '#111827',
          fontSize: 72,
          fontWeight: '700',
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        },
        subtextStyle: {
          color: '#6b7280',
          fontSize: 32,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        },
      },

      series: [{
        type: 'pie',
        radius: ['48%', '82%'],
        center: ['38%', '50%'],
        avoidLabelOverlap: true,
        padAngle: 2,
        itemStyle: { borderRadius: 6, borderColor: '#F4F5F7', borderWidth: 3 },
        label: { show: false },
        labelLine: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 8,
          label: { show: false },
        },
        data: seriesData,
      }],
    };

    chart.setOption(option);
    return chart;
  }

  return { render };
})();

window.DonutChart = DonutChart;
