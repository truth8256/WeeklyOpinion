/* ============================================================
   charts/sankey-chart.js — Sankey 흐름 차트 (ECharts 내장)
   슬라이드 타입: sankey
   ============================================================ */

const SankeyChart = (() => {

  /**
   * @param {string} containerId
   * @param {Object} data
   *   nodes:  [{name: '...', itemStyle?: {color: '...'}}]
   *   links:  [{source: '...', target: '...', value: 100}]
   *   nodeWidth:  (선택, 기본 24)
   *   nodeGap:    (선택, 기본 14)
   *   orient:     (선택, 'horizontal' | 'vertical', 기본 'horizontal')
   */
  function render(containerId, data) {
    const chart = ChartUtils.init(containerId);

    const option = {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut',

      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#d1d5db',
        borderWidth: 1,
        textStyle: {
          color: '#111827',
          fontSize: 28,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        },
        formatter: params => {
          if (params.dataType === 'edge') {
            return `${params.data.source} → ${params.data.target}<br><b>${params.data.value.toLocaleString()}</b>`;
          }
          return `<b>${params.name}</b>`;
        },
      },

      series: [{
        type: 'sankey',
        data: data.nodes || [],
        links: data.links || [],
        emphasis: { focus: 'adjacency' },
        nodeWidth: data.nodeWidth || 24,
        nodeGap: data.nodeGap || 14,
        layoutIterations: 32,
        orient: data.orient || 'horizontal',
        left: data.left ?? '8%',
        right: data.right ?? '8%',
        top: data.top ?? '8%',
        bottom: data.bottom ?? '8%',
        label: {
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          fontSize: 28,
          fontWeight: '600',
          color: '#111827',
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5,
          opacity: 0.4,
        },
      }],
    };

    chart.setOption(option);
    return chart;
  }

  return { render };
})();

window.SankeyChart = SankeyChart;
