---
description: Monthly slide deck design standards — chart types, font sizes, Sankey config, and data label conventions established through iterative editing
---

이 문서는 Weekly Opinion 슬라이드 제작 시 매번 반복 수정이 발생하지 않도록, 확립된 디자인 규칙과 설정값을 정리한다.
새 에피소드 데이터 파일(`data/data-MMDD.js`)을 작성할 때 이 문서를 기준으로 처음부터 맞춰 작성한다.

---

## 1. 제목 슬라이드 (type: 'title')

```js
{
    id: 'slide-00',
    type: 'title',
    data: {
        title: "...",       // 에피소드 핵심 카피. color: var(--text-accent) 파란색으로 렌더링됨
        subtitle: "...",    // 부제목
        // eyebrow, date 필드는 사용하지 않음 (날짜·출처 표기 불필요)
    },
}
```

- `eyebrow`(날짜), `date`(출처) 필드는 쓰지 않는다.
- 타이틀 텍스트는 자동으로 `--text-accent` (#2563EB) 파란색이 적용된다.
- h1 폰트 크기 120px, subtitle 비율 0.6em (현재 slide-engine.js에 반영됨).

---

## 2. 차트 타입 선택 원칙

| 상황 | 사용 타입 |
|------|-----------|
| 복수 계열 비교 (뉴/올드, 연령별 등) | `bar-v-group` (세로 그룹 막대) |
| 항목 이름이 매우 길고 6개 이상일 때만 | `bar-h-group` (가로 그룹 막대) |
| 단일 계열 순위형 | `bar-h` |
| 대선→국정 흐름, 지지정당 이동 등 | `sankey` |
| 비율 구성 (찬/반/모름 등) | `bar-v-group` (cross-tab 대신) |
| 시계열 추이 | `line` |
| 구성 비율 원형 | `donut` |

---

## 3. 폰트·레이블 크기 기준 (코드에 이미 반영됨)

| 요소 | 크기 |
|------|------|
| 데이터 레이블 (`LABEL_STYLE.fontSize`) | 38px |
| 범례 textStyle (line/donut/stack) | 38px |
| 범례 textStyle (bar 계열) | 34px |
| 가로막대 항목 레이블 (yAxis) | 38px |
| Sankey 노드 레이블 | 34px |
| Sankey columnLabel (축 제목) | 30px |

---

## 4. 데이터 레이블 포맷 옵션

**세로막대(`bar-v-group`) 기본값: 단위 없음 + 소수점 1자리** (예: `53.3`)

필요시 데이터에서 오버라이드:

```js
data: {
    unit: '%',         // 툴팁·축에 표시되는 단위 (레이블에는 미표시가 기본)
    labelUnit: '%',    // 레이블에도 단위 붙이고 싶을 때 명시
    labelDecimals: 0,  // 소수점 자리수 변경 (기본 1)
}
```

- **세로막대 기본**: 단위 생략, 소수점 1자리
- **단위를 레이블에 표시하고 싶을 때**: `labelUnit: '%'` 또는 `labelUnit: '명'` 명시
- **건수처럼 정수로 표현할 때**: `labelDecimals: 0`

---

## 5. Sankey 차트 표준 설정

### 5-1. 기본 구조

```js
data: {
    title: "...",
    subtitle: "...",
    layoutIterations: 0,           // 노드 순서를 배열 순서 그대로 고정
    columnLabels: { left: '1차 (2025.5)', right: '3차 (2026.1)' },  // 조사 시점 표기
    nodes: [ /* 아래 5-2 참고 */ ],
    links: [ /* 집계된 값 */ ],
    source: '에스티아이 유권자 패널조사 ...',
}
```

### 5-2. 노드 설정 패턴

**왼쪽 노드**: 이름만, 순서는 중요도/크기 내림차순
```js
{ name: '더불어민주당', itemStyle: { color: '#0052A3' } },
```

**오른쪽 노드**: 왼쪽과 이름이 겹칠 경우 내부 suffix `(3차)` 추가 + `label.formatter`로 표시명 정리
```js
{ name: '더불어민주당 (3차)', itemStyle: { color: '#0052A3' }, label: { position: 'left', formatter: '더불어민주당' } },
```

- 오른쪽 노드 레이블은 항상 `position: 'left'` (노드 안쪽/왼쪽에 표기)
- 소규모 카테고리("그 외 정당", "잘 모르겠다", "없다" 등)는 **"기타/없음/모름"으로 병합** 후 링크 집계

### 5-3. 지지정당 이동 Sankey 노드 순서 (표준)

```
더불어민주당 → 국민의힘 → 조국혁신당 → 개혁신당 → 기타/없음/모름
```

### 5-4. 핵심 흐름 강조 (flowAnnotation)

차트 애니메이션 후 특정 흐름에 텍스트 박스 표시:

```js
flowAnnotation: {
    text: "✔️ '뉴 이재명' 유권자 (21.9%)",
    x: 0.38, y: 0.80,        // 차트 너비/높이 대비 비율 위치
    boxWidth: 380, boxHeight: 68,
    borderColor: 'transparent',  // 테두리 없음
    // delay: 자동 (animationDuration + 3500ms)
},
```

- 텍스트 앞에 이모지 사용 가능 (심플체크 `✔️` 선호)
- 테두리는 기본적으로 제거 (`borderColor: 'transparent'`)

---

## 6. 색상 체계

| 대상 | 색상 |
|------|------|
| 더불어민주당 / 긍정평가 | `#0052A3` |
| 국민의힘 / 부정평가 | `#E61E2B` |
| 조국혁신당 | `#007AC3` |
| 개혁신당 | `#F47920` |
| 무당층 / 기타 | `#9CA3AF`, `#6B7280` |
| 뉴이재명 (밝은 파랑) | `#60A5FA` |
| 올드이재명 (진한 파랑) | `#0052A3` 또는 `#1a237e` |
| 슬라이드 강조색 (accent) | `#2563EB` (`var(--text-accent)`) |
| Sankey 긍정 | `#1a237e` |
| Sankey 부정 | `#c62828` |
| Sankey 모름 | `#cfd8dc` |

---

## 7. 에피소드 파일 작성 워크플로

1. `data/data-MMDD.js` 파일 생성
2. `PRESENTATION_CONFIG.slides` 배열에 슬라이드 순서대로 정의
3. `index.html`의 `<script src="data/data-MMDD.js">` 경로 수정
4. 슬라이드 타입별 렌더러는 `js/core/slide-engine.js`가 자동 처리

### 신규 Sankey 슬라이드 체크리스트

- [ ] `layoutIterations: 0` 설정
- [ ] `columnLabels` 조사 시점 기재
- [ ] 오른쪽 노드 전체에 `label: { position: 'left' }` 적용
- [ ] 좌우 동명 노드는 오른쪽에 suffix + `formatter`
- [ ] 소규모 카테고리 병합 및 링크 재집계
- [ ] `flowAnnotation`으로 핵심 수치 강조 (필요시)

---

## 8. 자주 하는 실수 / 주의사항

- **bar-h-group → bar-v-group 전환 시** `gridLeft` 옵션 제거 필요 (가로 전용 옵션)
- **Sankey 노드 이름은 unique** 해야 함. 좌우에 같은 당이 나오면 반드시 suffix 처리
- **cross-tab 타입**은 `d.left`·`d.right` 구조가 필요한 2분할 차트임. 단순 grouped bar에는 `bar-v-group` 사용
- **feature 브랜치 참조** 시 해당 브랜치의 커밋 날짜·내용 먼저 확인 후 데이터 추출
