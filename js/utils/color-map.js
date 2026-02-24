/* ============================================================
   utils/color-map.js — 정당 · 카테고리 색상 매핑
   ============================================================ */

const ColorMap = (() => {

  /* ── 정당 색상 (라이트 테마 최적화 플랫 컬러) ── */
  const PARTY = {
    '더불어민주당': '#0052A3', // 기존보다 살짝 묵직한 민주당 블루
    '민주당': '#0052A3',
    '국민의힘': '#E61E2B', // 단단하고 짙은 국힘 레드
    '국힘': '#E61E2B',
    '조국혁신당': '#007AC3', // 너무 튀지 않는 차분한 조국혁신당 블루
    '혁신당': '#007AC3',
    '개혁신당': '#F47920', // 부드러운 오렌지
    '정의당': '#F2C94C', // 옐로우
    '기본소득당': '#00A896', // 청록색
    '시대전환': '#7C3AED', // 보라색
    '무소속': '#6B7280', // 중립 회색
    '기타': '#6B7280',
    '없음': '#6B7280',
    '모름/무응답': '#6B7280',
  };

  /* ── 데이터 시각화 기본 팔레트 (다크 테마 잔재 제거) ── */
  const VIZ_PALETTE = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Emerald Green
    '#F59E0B', // Amber/Yellow
    '#8B5CF6', // Violet
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#6366F1', // Indigo
  ];

  /* ── 긍정/부정/중립 ── */
  const SENTIMENT = {
    '긍정': '#10B981', // 차분한 에메랄드 그린
    '긍정적': '#10B981',
    '매우 긍정': '#059669',
    '부정': '#EF4444', // 부드러운 레드
    '부정적': '#EF4444',
    '매우 부정': '#DC2626',
    '중립': '#9CA3AF', // 밝은 회색
    '보통': '#9CA3AF',
    '모름': '#6B7280',
  };

  /* ── 성별 ── */
  const GENDER = {
    '남성': '#3B82F6', // Blue
    '여성': '#EF4444', // Red
  };

  /* ── 연령대 (파스텔 블루~퍼플~레드 스펙트럼) ── */
  const AGE = {
    '18-29세': '#60A5FA', // Light Blue
    '20대': '#60A5FA',
    '30대': '#3B82F6', // Blue
    '40대': '#10B981', // Green
    '50대': '#F59E0B', // Amber
    '60대': '#F97316', // Orange
    '70대 이상': '#EF4444', // Red
    '70대+': '#EF4444',
  };

  /* ── 지역 ── */
  const REGION = {
    '서울': '#3B82F6',
    '인천/경기': '#8B5CF6', // Violet
    '대전/세종/충청': '#10B981',
    '광주/전라': '#14B8A6', // Teal
    '대구/경북': '#EF4444',
    '부산/울산/경남': '#F59E0B',
    '강원/제주': '#6366F1', // Indigo
  };

  /**
   * 레이블로 색상 자동 검색
   * @param {string} label
   * @param {number} [fallbackIndex] - 없으면 팔레트 순서
   * @returns {string} hex color
   */
  function get(label, fallbackIndex = 0) {
    const key = String(label).trim();
    return (
      PARTY[key] ||
      SENTIMENT[key] ||
      GENDER[key] ||
      AGE[key] ||
      REGION[key] ||
      VIZ_PALETTE[fallbackIndex % VIZ_PALETTE.length]
    );
  }

  /**
   * 배열의 각 항목에 색상 할당
   * @param {Array<{label: string, color?: string}>} items
   * @returns {string[]} colors
   */
  function mapColors(items) {
    return items.map((item, i) => item.color || get(item.label, i));
  }

  /**
   * 헥스 색상에 투명도 추가 (rgba)
   * @param {string} hex - '#0067B9'
   * @param {number} alpha - 0~1
   */
  function withAlpha(hex, alpha = 0.2) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  /**
   * 그라데이션 생성 (ECharts linearGradient 형식)
   * @param {string} hex - 기준 색상
   * @param {number} opacity - 끝 투명도
   */
  function gradient(hex, opacity = 0.15) {
    return {
      type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
      colorStops: [
        { offset: 0, color: hex },
        { offset: 1, color: withAlpha(hex, opacity) },
      ],
    };
  }

  return { PARTY, VIZ_PALETTE, SENTIMENT, GENDER, AGE, REGION, get, mapColors, withAlpha, gradient };
})();

window.ColorMap = ColorMap;
