/* ============================================================
   utils/csv-loader.js — CSV 파일을 data.js 형식으로 변환
   비개발자가 Excel/구글시트로 데이터 편집 시 활용
   ============================================================ */

const CSVLoader = (() => {

  /**
   * CSV 문자열 파싱
   * @param {string} text - CSV 원문
   * @returns {Array<Object>} rows
   */
  function parse(text) {
    const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];

    const headers = splitRow(lines[0]);
    return lines.slice(1).map(line => {
      const values = splitRow(line);
      const row = {};
      headers.forEach((h, i) => {
        const v = values[i] ?? '';
        // 숫자면 숫자로 변환
        row[h] = v !== '' && !isNaN(v) ? Number(v) : v;
      });
      return row;
    });
  }

  /** 쉼표 구분 (따옴표 내 쉼표 보호) */
  function splitRow(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { result.push(current.trim()); current = ''; continue; }
      current += ch;
    }
    result.push(current.trim());
    return result;
  }

  /**
   * URL/경로에서 CSV 로드
   * @param {string} url
   * @returns {Promise<Array<Object>>}
   */
  async function load(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`CSV 로드 실패: ${url} (${res.status})`);
    const text = await res.text();
    return parse(text);
  }

  /**
   * CSV rows → bar-h 슬라이드 data 형식으로 변환
   * CSV 컬럼: label, value, color(선택)
   */
  function toBarItems(rows, labelCol = 'label', valueCol = 'value', colorCol = 'color') {
    return rows
      .filter(r => r[labelCol] && r[valueCol] !== '')
      .map(r => ({
        label: String(r[labelCol]),
        value: Number(r[valueCol]),
        color: r[colorCol] || null,
      }));
  }

  /**
   * CSV rows → line 슬라이드 series 형식으로 변환
   * CSV 컬럼: date, [시리즈명1], [시리즈명2], ...
   */
  function toLineSeries(rows, dateCol = 'date') {
    if (!rows.length) return { dates: [], series: [] };
    const seriesKeys = Object.keys(rows[0]).filter(k => k !== dateCol);
    const dates = rows.map(r => String(r[dateCol]));
    const series = seriesKeys.map(key => ({
      name: key,
      data: rows.map(r => (r[key] !== '' ? Number(r[key]) : null)),
    }));
    return { dates, series };
  }

  /**
   * File input에서 CSV 읽기 (브라우저)
   * @param {File} file
   * @returns {Promise<Array<Object>>}
   */
  function fromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(parse(e.target.result));
      reader.onerror = () => reject(new Error('파일 읽기 실패'));
      reader.readAsText(file, 'UTF-8');
    });
  }

  return { parse, load, toBarItems, toLineSeries, fromFile };
})();

window.CSVLoader = CSVLoader;
