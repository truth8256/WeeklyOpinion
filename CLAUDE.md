# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

월 1회 유튜브 방송용 데이터 프레젠테이션 프로젝트. 시사·정치 이슈를 여론조사 데이터 중심으로 해설하는 코너이며, 에스티아이 수석연구원 김진실이 진행자와 대화하며 여론조사 수치를 설명하는 형식이다.

결과물은 두 가지다:
1. **슬라이드** (`index.html`) – 방송 화면에 띄우는 데이터 시각화 프레젠테이션
2. **대본** (`scripts/*.md`) – 방송 중 설명할 내용을 정리한 마크다운 파일

## Running the Presentation

별도의 빌드 과정 없음. `index.html`을 Chrome에서 직접 열면 된다.

- 슬라이드 이동: 키보드 ← → 방향키
- CSV 데이터는 `fetch()`로 비동기 로드하므로 로컬 서버가 필요할 수 있음 (예: `npx serve .` 또는 VS Code Live Server)

## Architecture: index.html

모든 CSS, HTML 슬라이드, JavaScript가 단일 파일에 인라인으로 포함된다. 외부 JS/CSS 파일 없음.

**슬라이드 시스템**
- `slideOrder` 배열이 슬라이드 ID 순서를 정의 (파일 내 약 750번째 줄)
- 현재 슬라이드는 `hidden` 클래스 제거로 표시, 나머지는 `hidden` 유지
- `navigateSlides(direction)` 함수로 이동
- 각 슬라이드는 고유 `id`를 가진 `.slide-container` div

**차트 시스템 (Chart.js)**
- 전역 차트 객체 변수로 관리 (예: `chartNew1`, `weeklyTrendChart`)
- 차트 뷰 전환 시 반드시 기존 차트 `.destroy()` 후 재생성
- `podCommonOptions` 공통 옵션 객체를 스프레드하여 재사용
- 플러그인: `chartjs-plugin-datalabels` (레이블), `chartjs-chart-sankey` (생키차트)

**색상 상수** (파일 상단 전역 정의)
- `POSITIVE_COLOR` = `#0056b3` (긍정평가 / 민주당)
- `NEGATIVE_COLOR` = `#C9151E` (부정평가 / 국민의힘)
- `JO_GUK_COLOR` = `#4B0082`, `REFORM_COLOR` = `#F38400`, `PROGRESSIVE_COLOR` = `#008000`
- `NON_PARTISAN_COLOR` = `#666666` (무당층)
- PART 2 배지색: `#1a237e`, PART 3 배지색: `#c62828`

**인터랙티브 버튼**
- `.btn.active` 클래스로 활성 버튼 구분
- 버튼 클릭 시 해당 `update*View()` 함수 호출 → 차트 재생성 또는 데이터셋 업데이트

## Data Files (data/)

CSV 파일을 수정하면 차트에 자동 반영.

| 파일 | 내용 |
|------|------|
| `monthly_main_trends.csv` | 월별 대통령 긍/부정 및 정당 지지율 (갤럽) |
| `monthly_pres_detailed.csv` | 월별 성별·연령별·지역별 세부 지지율 |
| `presidential_approval_gallup_weekly.csv` | 주간 갤럽 대통령 직무평가 |
| `presidential_approval_realmeter.csv` | 주간 리얼미터 대통령 직무평가 |
| `party_approval_gal_week.csv` | 주간 갤럽 정당 지지율 |
| `party_approval_real_week.csv` | 주간 리얼미터 정당 지지율 |
| `election_trust_survey.csv` | 선거 신뢰도 조사 (부정선거 음모론 등) |
| `sankey.csv` | 대선 투표→국정평가 이동 Sankey 차트용 |

빈 행(데이터 없는 주차)은 CSV에 빈 값으로 남겨두며, Chart.js에서 `spanGaps: true`로 처리.

## Scripts (scripts/)

**파일 명명 규칙**
- 초기: `시사콜콜 MMDD.md`
- 현재: `Weekly Opinion [날짜 또는 월주].md`

**대본 구조** (template.md 기반)
1. 소개 (`✅ **소개**`)
2. 메인 코너 (주요 테마 - 반드시 먼저)
   - 진행자 질문 → 전문가 답변 형식
   - 이슈 개요 → 데이터 분석 → 해석/전망 순
3. [선택] 주간 여론조사 동향 (급격한 변화 있을 때만)
4. 마무리

**작성 우선순위**: 주간 정기 여론조사보다 **특정 테마 심층 분석**이 항상 우선.
대본 작성 워크플로우 상세는 `.agent/workflows/write_script.md` 참조.

## Slide Structure (Current Episode)

슬라이드는 크게 세 파트로 구성 (slideOrder 배열 기준):
- **PART 1** (`badge-part2`, 남색): 국정운영 지지율 분석
- **PART 2** (`badge-part3`, 빨강): 내란사건 여론 등 특집 테마
- **정기 여론조사** (마지막): 주간 갤럽/리얼미터 추이

## Key Patterns When Editing index.html

- 새 슬라이드 추가 시: HTML에 div 추가 + `slideOrder` 배열에 ID 삽입
- 차트 추가 시: 전역 변수 선언 + `create*()` 함수 작성 + 초기화 코드에서 호출
- 슬라이드 번호/날짜 등 메타 정보는 HTML의 `.subtitle` 텍스트를 직접 수정
- 조사 출처 문구(`SOURCE_WEEKLY_*` 상수)는 파일 상단에서 수정
