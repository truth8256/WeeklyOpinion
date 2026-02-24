/* ============================================================
   utils/format.js — 숫자 · 날짜 포매터
   ============================================================ */

const Format = (() => {

  /**
   * 퍼센트 포맷 (소수점 1자리 고정)
   * 48 → "48.0%", 47.35 → "47.4%"
   */
  function percent(value, decimals = 1) {
    if (value === null || value === undefined || isNaN(value)) return '–';
    return Number(value).toFixed(decimals) + '%';
  }

  /**
   * 숫자 포맷 (천 단위 콤마)
   * 1234567 → "1,234,567"
   */
  function number(value, decimals = 0) {
    if (value === null || value === undefined || isNaN(value)) return '–';
    return Number(value).toLocaleString('ko-KR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  /**
   * 단위 포함 숫자
   * (1234, '명') → "1,234명"
   */
  function withUnit(value, unit = '', decimals = 0) {
    return number(value, decimals) + unit;
  }

  /**
   * 날짜 포맷
   * '2025-02-17' → '2025.02.17'
   */
  function date(value, separator = '.') {
    if (!value) return '';
    const str = String(value).replace(/-/g, separator);
    return str;
  }

  /**
   * 날짜 범위
   * ('2025-01-01', '2025-01-07') → '2025.01.01 ~ 01.07'
   */
  function dateRange(start, end) {
    if (!start || !end) return '';
    const s = date(start);
    const e = date(end).slice(5); // MM.DD만
    return `${s} ~ ${e}`;
  }

  /**
   * 샘플 크기 포맷
   * 1002 → "n=1,002"
   */
  function sampleSize(n) {
    return `n=${number(n)}`;
  }

  /**
   * 출처 문자열 조합
   * { org: '한국갤럽', n: 1002, date: '2025.02.17' }
   * → '한국갤럽 | n=1,002 | 2025.02.17'
   */
  function source({ org = '', n = null, date: d = '', period = '' } = {}) {
    const parts = [org, n ? sampleSize(n) : null, period || d].filter(Boolean);
    return parts.join(' | ');
  }

  /**
   * 퍼센트 포인트 차이 표시
   * 3.2 → "+3.2%p"
   */
  function diff(value, decimals = 1) {
    if (value === null || value === undefined || isNaN(value)) return '–';
    const v = Number(value);
    const sign = v > 0 ? '+' : '';
    return `${sign}${v.toFixed(decimals)}%p`;
  }

  return { percent, number, withUnit, date, dateRange, sampleSize, source, diff };
})();

// 전역 노출
window.Format = Format;
