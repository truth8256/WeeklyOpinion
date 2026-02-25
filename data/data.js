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
                        options: ['매우 효과있음', '어느정도 효과있음', '별로 효과없음', '전혀 효과없음', '모름/무응답']
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

        /* ─── 4a. 공급 대책 효과 (SBS) ───────────────── */
        {
            id: 'slide-04a',
            type: 'donut-detail',
            data: {
                title: '세부 정책 평가 — 공급 대책',
                subtitle: '주택 공급 확대 방안에 대한 실질적 기대감',
                unit: '%',
                source: 'SBS | 2026.02.12~14 | n=1,000',
                question: '정부는 1.29 부동산 대책을 통해 수도권 약 6만 가구 공급 계획을 발표했습니다. 정부의 부동산 공급 대책에 대해 어떻게 생각하십니까?',
                options: [
                    '당장 집값 안정에 효과가 있을 것',
                    '중장기적으로 효과가 있을 것',
                    '별로 또는 전혀 효과가 없을 것',
                    '모름/무응답'
                ],
                items: [
                    { label: '당장 효과', value: 6, color: '#A5B4FC' },
                    { label: '중장기 효과', value: 51, color: '#2563EB' },
                    { label: '효과 없음', value: 38, color: '#DC2626' },
                    { label: '모름/무응답', value: 5, color: '#9CA3AF' },
                ],
                centerLabel: '57%',
                centerSub: '긍정 평가'
            },
        },

        /* ─── 4b. 양도세 중과 효과 (SBS) ───────────────── */
        {
            id: 'slide-04b',
            type: 'donut-detail',
            data: {
                title: '세부 정책 평가 — 양도세 중과',
                subtitle: '다주택자 양도세 중과 부활에 따른 시장 안정 기대',
                unit: '%',
                source: 'SBS | 2026.02.12~14 | n=1,000',
                question: '다주택자 양도세 중과 부활이 오는 5월 9일 이후 적용됩니다. 집값 안정에 효과가 있을 것이라고 생각하십니까?',
                options: [
                    '효과가 있을 것',
                    '효과가 없을 것',
                    '모름/무응답'
                ],
                items: [
                    { label: '효과 있을 것', value: 57, color: '#2563EB' },
                    { label: '효과 없을 것', value: 38, color: '#DC2626' },
                    { label: '모름/무응답', value: 5, color: '#9CA3AF' },
                ],
                centerLabel: '57%',
                centerSub: '효과 기대'
            },
        },

        /* ─── 4c. 보유세 인상 평가 (SBS) ───────────────── */
        {
            id: 'slide-04c',
            type: 'donut-detail',
            data: {
                title: '세부 정책 평가 — 보유세 인상',
                subtitle: '주택 보유세 인상에 대한 동의 및 방식 선호도',
                unit: '%',
                source: 'SBS | 2026.02.12~14 | n=1,000',
                question: '부동산 대책의 하나로 거론되는 주택 보유세 인상에 대해 어떻게 생각하십니까?',
                options: [
                    '다주택자와 고가 1주택 보유자 모두 인상',
                    '다주택자만 선별적으로 인상',
                    '세금 인상 자체가 불필요함',
                    '모름/무응답'
                ],
                items: [
                    { label: '다주택+고가1주택', value: 29, color: '#A5B4FC' },
                    { label: '다주택자만 인상', value: 47, color: '#2563EB' },
                    { label: '인상 불필요', value: 19, color: '#DC2626' },
                    { label: '모름/무응답', value: 5, color: '#9CA3AF' },
                ],
                centerLabel: '76%',
                centerSub: '인상 동의'
            },
        },


        /* ─── 7-1. 석 달 만의 변화 (연령별 변화) ──────── 
           [슬라이드 기획]
           차트 종류: bar-v-group (두 항목씩 묶어서 보여주는 세로 막대 차트)
           의도: 앞선 전체 긍정 상승에 이어서, 각 연령대별 10월 조사와 2월 조사의 긍정 평가 수치를 나란히 비교합니다.
        */
        {
            id: 'slide-07a',
            type: 'bar-v-group',
            data: {
                title: '시계열 비교 — 연령별 긍정 평가',
                subtitle: '',
                unit: '%',
                source: 'NBS(10월) vs MBC(2월)',
                categories: ['18~29세', '30대', '40대', '50대'],
                series: [
                    { name: '10월 긍정평가(NBS)', data: [29, 33, 47, 46], color: '#9CA3AF' },
                    { name: '2월 긍정평가(MBC)', data: [37, 42, 62, 59], color: '#2563EB' },
                ],
            },
        },

        /* ─── 7-2. 석 달 만의 변화 (지역별 변화) ───── 
           [슬라이드 기획]
           차트 종류: bar-v-group (두 항목씩 묶어서 보여주는 세로 막대 차트)
           의도: 지역별(핵심 서울 지역 포함)의 변화를 분리해서 집중 조명합니다.
        */
        {
            id: 'slide-07b',
            type: 'bar-v-group',
            data: {
                title: '시계열 비교 — 주요 지역별 긍정 평가',
                subtitle: '',
                unit: '%',
                source: 'NBS(10월) vs MBC(2월)',
                categories: ['서울', '인천·경기', '대전·충청·세종', '부산·울산·경남'],
                series: [
                    { name: '10월 긍정평가(NBS)', data: [36, 32, 45, 38], color: '#9CA3AF' },
                    { name: '2월 긍정평가(MBC)', data: [51, 51, 51, 51], color: '#2563EB' },
                ],
            },
        },

        /* ─── 8. 주택가격전망지수 (CSI) ─ */
        {
            id: 'slide-08',
            type: 'image',
            data: {
                title: '시장 심리 변화',
                subtitle: '주택가격전망 소비자동향지수(CSI) 추이 — 3년 7개월 만에 최대폭 하락',
                src: 'data/house_csi_2602.jpg'
            },
        },

        /* ─── 10. 조사 개요 ──────────────────────── */
        {
            id: 'slide-10',
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
                    }
                ],
                disclaimer: '그 밖의 사항은 중앙선거여론조사심의위원회 홈페이지 참조',
            },
        },

    ],
};
