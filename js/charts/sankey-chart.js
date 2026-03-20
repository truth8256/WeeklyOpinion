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
        layoutIterations: data.layoutIterations ?? 32,
        orient: data.orient || 'horizontal',
        left: data.left ?? '8%',
        right: data.right ?? '8%',
        top: data.top ?? '8%',
        bottom: data.bottom ?? '8%',
        label: {
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          fontSize: 34,
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

    if (data.columnLabels) {
      const { left: lbl, right: rbl } = data.columnLabels;
      const leftPct  = data.left  ?? '8%';
      const rightPct = data.right ?? '8%';
      option.graphic = [
        lbl && {
          type: 'text',
          left: leftPct,
          top: 0,
          style: {
            text: lbl,
            fontSize: 30,
            fontWeight: '700',
            fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
            fill: '#6b7280',
          },
        },
        rbl && {
          type: 'text',
          right: rightPct,
          top: 0,
          style: {
            text: rbl,
            fontSize: 30,
            fontWeight: '700',
            fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
            fill: '#6b7280',
            textAlign: 'right',
          },
        },
      ].filter(Boolean);
    }

    chart.setOption(option);

    if (data.flowAnnotation) {
      const ann = data.flowAnnotation;
      const delay = ann.delay ?? (option.animationDuration ?? 1000) + 3500;
      setTimeout(() => {
        const width  = chart.getWidth();
        const height = chart.getHeight();
        chart.setOption({
          graphic: [
            ...(option.graphic || []),
            {
              type: 'group',
              x: Math.round(width  * (ann.x ?? 0.5)),
              y: Math.round(height * (ann.y ?? 0.7)),
              children: [
                {
                  type: 'rect',
                  shape: { x: 0, y: 0, width: ann.boxWidth ?? 220, height: ann.boxHeight ?? 72, r: 8 },
                  style: { fill: ann.bgColor ?? 'rgba(26,35,126,0.10)', stroke: ann.borderColor ?? '#1a237e', lineWidth: ann.borderColor === 'transparent' ? 0 : 2 },
                },
                {
                  type: 'text',
                  x: (ann.boxWidth ?? 220) / 2,
                  y: (ann.boxHeight ?? 72) / 2,
                  style: {
                    text: ann.text,
                    textAlign: 'center',
                    textVerticalAlign: 'middle',
                    fontSize: ann.fontSize ?? 28,
                    fontWeight: '700',
                    fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                    fill: ann.color ?? '#1a237e',
                  },
                },
              ],
            },
          ],
        });
      }, delay);
    }

    return chart;
  }

  return { render };
})();

window.SankeyChart = SankeyChart;
