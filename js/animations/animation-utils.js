/* ============================================================
   animations/animation-utils.js
   counter-up, bar-grow, fade-sequence 통합
   ============================================================ */

const AnimUtils = (() => {

  /* ── 1. 숫자 카운트업 ── */
  /**
   * @param {HTMLElement} el - 대상 요소
   * @param {number} target  - 목표 값
   * @param {Object} opts
   *   duration  {number} ms, 기본 1200
   *   decimals  {number} 소수점 자리, 기본 1
   *   suffix    {string} 접미사 ('%' 등)
   *   easing    {Function}
   */
  function counterUp(el, target, { duration = 1200, decimals = 1, suffix = '', prefix = '', easing } = {}) {
    if (!el) return;
    const easeFn = easing || easeOutCubic;
    const startTime = performance.now();
    const startVal = parseFloat(el.textContent) || 0;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startVal + (target - startVal) * easeFn(progress);
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ── 2. 막대 성장 (CSS width 애니메이션 보조) ── */
  /**
   * 요소들의 width를 순차적으로 확장
   * @param {NodeList|Array} bars
   * @param {number[]} targetWidths - % 배열
   * @param {number} stagger - 각 막대 지연 ms
   */
  function barGrow(bars, targetWidths, { stagger = 120, duration = 800 } = {}) {
    Array.from(bars).forEach((bar, i) => {
      const target = targetWidths[i] ?? 0;
      setTimeout(() => {
        bar.style.transition = `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        bar.style.width = `${target}%`;
      }, i * stagger);
    });
  }

  /* ── 3. 순차 등장 ── */
  /**
   * 요소 배열을 순차적으로 fadeIn
   * @param {NodeList|Array} elements
   * @param {number} stagger - ms
   * @param {string} animClass - CSS 애니메이션 클래스
   */
  function fadeSequence(elements, { stagger = 100, animClass = 'animate-in' } = {}) {
    Array.from(elements).forEach((el, i) => {
      el.style.opacity = '0';
      setTimeout(() => {
        el.style.opacity = '';
        el.classList.add(animClass);
      }, i * stagger);
    });
  }

  /* ── 4. 슬라이드 활성화 시 애니메이션 실행 ── */
  /**
   * 슬라이드 내 .anim-target 요소들에 animate-in 적용
   * @param {HTMLElement} slideEl
   */
  function runSlideAnimations(slideEl) {
    if (!slideEl) return;
    // 기존 클래스 제거 후 재실행
    const targets = slideEl.querySelectorAll('[data-anim]');
    targets.forEach(el => {
      const anim = el.dataset.anim;
      el.classList.remove(anim);
      // reflow 강제
      void el.offsetWidth;
      el.classList.add(anim);
    });
    // 일반 animate-in 요소 순차 등장
    const seqTargets = slideEl.querySelectorAll('.anim-seq');
    fadeSequence(seqTargets, { stagger: 80 });
  }

  /* ── 이징 함수 ── */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeOutElastic(t) {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1
      : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  return {
    counterUp,
    barGrow,
    fadeSequence,
    runSlideAnimations,
    easing: { easeOutCubic, easeOutElastic, easeInOutCubic },
  };
})();

window.AnimUtils = AnimUtils;
