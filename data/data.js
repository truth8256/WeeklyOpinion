/* ============================================================
   data/data.js — 메인 데이터 파일
   Weekly Opinion: 부동산 정책 여론 (2026.02.24)
   ============================================================ */

const PRESENTATION_CONFIG = {
    title: '부동산 정책 여론',
    theme: 'light-gray', // light-gray (라이트 테마)

    slides: [

        /* ─── 1. 타이틀 슬라이드 ─────────────────── */
        {
            id: 'slide-01',
            type: 'title',
            data: {
                eyebrow: 'Weekly Opinion',
                title: '부동산 정책 여론',
                subtitle: '단호한 기조에 변화하는 여론, 반응하는 시장',
            },
        },

        /* ─── 2. 조사 문항 및 보기 항목 ─────────────────── */
        {
            id: 'slide-02',
            type: 'survey-detail',
            data: {
                title: '조사 문항 및 보기 항목',
                items: [
                    {
                        source: 'SBS',
                        question: '현 정부는 출범 이후 대출 규제와 수도권 토지거래허가구역 지정, 그리고 수도권 주택 공급을 확대하는 등의 부동산 대책들을 발표했습니다. 정부의 부동산 정책에 대해 어떻게 생각하십니까?',
                        options: ['잘하고 있다', '잘못하고 있다', '모르겠다']
                    },
                    {
                        source: 'MBC',
                        question: '이재명 정부의 부동산 정책이 앞으로 주택 가격 안정이나 주거 부담 완화에 실질적인 효과가 있을 것이라고 보십니까?',
                        options: ['매우효과', '어느정도효과', '별로효과없음', '전혀효과없음', '모름무응답']
                    }
                ]
            },
        },

        /* ─── 3. MBC·SBS (기본 긍부정) ───────────── */
        {
            id: 'slide-03',
            type: 'cross-tab',
            data: {
                title: '전반적 평가',
                subtitle: '부동산 정책 평가 — 두 조사, 같은 결론 (긍정 52%)',
                unit: '%',
                orientation: 'horizontal',
                source: 'MBC / SBS 설특집 조사',
                categories: ['MBC 설특집', 'SBS 설특집'],
                series: [
                    { name: '긍정 (잘함)', data: [52, 52], color: '#2563EB' },
                    { name: '부정 (잘못함)', data: [44, 39], color: '#DC2626' },
                    { name: '모름/무응답', data: [5, 9], color: '#9CA3AF' },
                ],
            },
        },

        /* ─── 4. 세부 정책 (SBS) ───────────────── */
        {
            id: 'slide-04',
            type: 'cross-tab',
            data: {
                title: '세부 항목별 평가', // label -> title
                subtitle: '세부 정책 기대 파급 효과 — 방향 동의, 성과는 아직', // title + subtitle -> subtitle
                unit: '%',
                orientation: 'horizontal',
                source: 'SBS | 2026.02.12~14 | n=1,000',
                categories: ['보유세 인상 동의', '양도세 중과 효과 기대', '공급대책\n(중장기 포함)', '부동산 정책 전반'],
                series: [
                    { name: '긍정/동의', data: [76, 57, 57, 52], color: '#2563EB' },
                    { name: '부정/비동의', data: [19, 38, 38, 39], color: '#DC2626' },
                ],
            },
        },

        /* ─── 5. 연령대별 (SBS) ───────────────── */
        {
            id: 'slide-05',
            type: 'cross-tab',
            data: {
                title: '세대별 교차분석', // label -> title
                subtitle: '연령대별 부동산 정책 평가 — 40·50대가 끌어올린 52%', // title + subtitle -> subtitle
                unit: '%',
                orientation: 'horizontal',
                source: 'SBS | 2026.02.12~14 | n=1,000',
                categories: ['18~29세', '30대', '40대', '50대', '60대', '70세 이상'],
                series: [
                    { name: '긍정 평가', data: [28, 37, 67, 70, 56, 47], color: '#2563EB' },
                    { name: '부정 평가', data: [52, 50, 28, 25, 40, 42], color: '#DC2626' },
                ],
            },
        },

        /* ─── 6. 지역별 (SBS) ─────────────────── */
        {
            id: 'slide-06',
            type: 'cross-tab',
            data: {
                title: '지역별 교차분석',
                subtitle: '권역별 부동산 정책 평가 — 정작 수도권은 박빙',
                unit: '%',
                orientation: 'horizontal',
                source: 'SBS | 2026.02.12~14 | n=1,000',
                categories: ['서울', '인천·경기', '대전·충청·세종', '광주·전라', '대구·경북', '부산·울산·경남', '강원·제주'],
                series: [
                    { name: '긍정 평가', data: [46, 49, 60, 77, 45, 48, 55], color: '#2563EB' },
                    { name: '부정 평가', data: [45, 40, 34, 16, 46, 45, 28], color: '#DC2626' },
                ],
            },
        },

        /* ─── 7. 석 달 만의 변화 (NBS vs SBS) ──────── */
        {
            id: 'slide-07',
            type: 'cross-tab',
            data: {
                title: '시계열 비교 (10월 vs 2월)',
                subtitle: '부동산 정책 긍정 평가 변동 현황 — 석 달 만에 37% → 52%',
                unit: '%',
                orientation: 'horizontal',
                source: 'NBS(10월) vs SBS(2월)',
                categories: ['10월 1주차', '2월 2주차'],
                series: [
                    { name: '긍정 평가', data: [37, 52], color: '#2563EB' },
                    { name: '부정 평가', data: [55, 39], color: '#DC2626' },
                ],
            },
        },

        /* ─── 8. 라인 차트 (갤럽, NBS 혼합 시계열) ─ */
        {
            id: 'slide-08',
            type: 'line',
            data: {
                title: '기대 vs 현재 수행 평가', // label -> title
                subtitle: '직무 수행평가 및 정책 효과 기대 비교', // title + subtitle -> subtitle
                unit: '%',
                source: '한국갤럽 / NBS / SBS',
                yMin: 0,
                yMax: 80,
                categories: ['9월', '10월', '11월', '12월', '1월', '2월'],
                series: [
                    { name: '향후 집값 상승 전망 (갤럽)', data: [42, 45, 48, 55, 50, 52], color: '#9CA3AF' },
                    { name: '대통령 국정 긍정평가 (NBS)', data: [25, 22, 27, 20, 24, 26], color: '#DC2626' },
                ],
            },
        },

        /* ─── 9. 멀티 차트 (비교) ───────────────── */
        {
            id: 'slide-09',
            type: 'multi-compare',
            data: {
                title: '여론 vs 현실 지표',
                subtitle: '주택 가격 및 임대료 동향과 전망 — 여론이 움직여도 집값은 아직',
                left: {
                    title: '지수 전망 (갤럽, 1월)',
                    unit: '%',
                    source: '한국갤럽 | 2026.01',
                    items: [
                        { label: '향후 1년 집값 상승', value: 48, color: '#2563EB' },
                        { label: '향후 1년 집값 하락', value: 19, color: '#DC2626' },
                        { label: '향후 1년 임대료 상승', value: 58, color: '#2563EB' },
                        { label: '향후 1년 임대료 하락', value: 10, color: '#DC2626' },
                    ],
                },
                right: {
                    title: '주택 매매비 상승률 (1월)',
                    unit: '%',
                    source: '한국부동산원 | 2026.01',
                    items: [
                        { label: '세종', value: 0.97, color: '#DC2626' },
                        { label: '서울', value: 0.91, color: '#DC2626' },
                        { label: '경기', value: 0.36, color: '#DC2626' },
                        { label: '전국 평균', value: 0.28, color: '#DC2626' },
                        { label: '인천', value: 0.07, color: '#DC2626' },
                    ],
                },
            },
        },

        /* ─── 10. 부동산 시장 선행 신호 ────────────── */
        {
            id: 'slide-10',
            type: 'keyword',
            data: {
                label: '부동산 시장 선행 신호',
                keyword: '5월 다주택자 양도세 중과,\n시장이 먼저 움직이기 시작했다',
                context: '① 조정대상지역 매물 +10% 이상 증가 (송파 +20%)\n② 강남 3구 거래량 -20% 감소 / 서울 -11%\n③ 수도권 매매가격 변동률 3개월 연속 둔화',
                source: '국토부 / KB 2월 리뷰',
            },
        },

        /* ─── 11. 조사 개요 ──────────────────────── */
        {
            id: 'slide-11',
            type: 'source',
            data: {
                title: '조사 개요',
                items: [
                    {
                        title: 'MBC 설날특집 정치 사회 현안 조사',
                        org: '코리아리서치',
                        period: '2026.02.11-2.13',
                        n: 1000,
                        method: '무선 전화면접',
                        margin: '±3.1%p',
                        note: '만 18세 이상',
                    },
                    {
                        title: 'SBS 설 특집 여론조사',
                        org: '입소스',
                        period: '2026.02.12 ~ 02.14',
                        n: 1004,
                        method: '무선 전화면접',
                        margin: '±3.1%p',
                        note: '만 18세 이상',
                    },
                    {
                        title: 'NBS 167차(엠브레인·케이스탯·코리아리서치·한국리서치)',
                        org: '케이스탯·코리아리서치',
                        period: '2025.10.27 ~ 10.29',
                        n: 1001,
                        method: '무선 전화면접',
                        margin: '±3.1%p',
                        note: '만 18세 이상',
                    },
                    {
                        title: '한국갤럽 자체 정기 조사',
                        org: '한국갤럽',
                        period: '26년 1월/25년 12월/25년 10월',
                        n: 1000,
                        method: '무선 전화면접',
                        margin: '±3.1%p',
                        note: '만 18세 이상',
                    },
                ],
                disclaimer: '그 밖의 사항은 중앙선거여론조사심의위원회 홈페이지 참조',
            },
        },

    ],
};
