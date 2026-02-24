/* ============================================================
   core/keyboard-nav.js — OBS 연동 키보드 단축키
   ============================================================ */

const KeyboardNav = (() => {

  let _engine = null;

  const KEYS = {
    NEXT:   ['ArrowRight', ' '],        // 다음
    PREV:   ['ArrowLeft'],              // 이전
    REPLAY: ['KeyR', 'r', 'R'],        // 현재 슬라이드 재생
    BLACK:  ['KeyB', 'b', 'B'],        // 블랙아웃 토글
    FREEZE: ['KeyF', 'f', 'F'],        // 동결 토글
    HOME:   ['Home'],                   // 첫 슬라이드
    END:    ['End'],                    // 마지막 슬라이드
    NUMBER: /^Digit[1-9]$/,            // 1~9번 슬라이드로 이동
  };

  function init(engine) {
    _engine = engine;
    document.addEventListener('keydown', _onKeyDown, { passive: false });
    console.log('[KeyboardNav] 초기화 완료');
    _showHint();
  }

  function destroy() {
    document.removeEventListener('keydown', _onKeyDown);
    _engine = null;
  }

  function _onKeyDown(e) {
    if (!_engine) return;
    // 입력 요소 내에서는 동작 안 함
    if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;

    const key = e.code || e.key;

    if (KEYS.NEXT.includes(e.code) || KEYS.NEXT.includes(e.key)) {
      e.preventDefault();
      _engine.next();
      return;
    }
    if (KEYS.PREV.includes(e.code) || KEYS.PREV.includes(e.key)) {
      e.preventDefault();
      _engine.prev();
      return;
    }
    if (KEYS.REPLAY.includes(e.code) || KEYS.REPLAY.includes(e.key)) {
      e.preventDefault();
      _engine.replay();
      return;
    }
    if (KEYS.BLACK.includes(e.code) || KEYS.BLACK.includes(e.key)) {
      e.preventDefault();
      _engine.toggleBlackout();
      return;
    }
    if (KEYS.FREEZE.includes(e.code) || KEYS.FREEZE.includes(e.key)) {
      e.preventDefault();
      _engine.toggleFreeze();
      return;
    }
    if (e.code === 'Home') {
      e.preventDefault();
      _engine.goTo(0);
      return;
    }
    if (e.code === 'End') {
      e.preventDefault();
      _engine.goTo(_engine.getTotal() - 1);
      return;
    }
    // 숫자키 직접 이동 (1-based)
    if (KEYS.NUMBER.test(e.code)) {
      e.preventDefault();
      const n = parseInt(e.code.replace('Digit', ''), 10) - 1;
      _engine.goTo(n);
      return;
    }
  }

  function _showHint() {
    const hint = document.getElementById('keyboard-hint');
    if (!hint) return;
    hint.innerHTML = `
      <span>→ / Space</span><span>다음</span>
      <span>←</span><span>이전</span>
      <span>R</span><span>재생</span>
      <span>B</span><span>블랙</span>
      <span>F</span><span>동결</span>
      <span>Home/End</span><span>처음/끝</span>
    `;
  }

  return { init, destroy };
})();

window.KeyboardNav = KeyboardNav;
