/* ============================================================
   data/data-260317.js — 메인 데이터 파일
   Weekly Opinion: '뉴 이재명' (2026.03.17)
   출처: 한겨레·한국정당학회·에스티아이 2025–2026 유권자 패널조사 (1~3차)
   ============================================================ */

const PRESENTATION_CONFIG = {
    title: "'뉴 이재명' — 확장된 지지층의 실체와 전망",
    theme: 'light-gray',

    slides: [

        /* ─── 0. 타이틀 ─────────────────────────── */
        {
            id: 'slide-00',
            type: 'title',
            data: {
                title: "'뉴 이재명'",
                subtitle: "확장된 지지층의 실체와 전망",
            },
        },

        /* ─── 0b. 패널조사 개요 ─────────────────── */
        {
            id: 'slide-00b',
            type: 'panel-overview',
            data: {
                title: "2025-2026 유권자 패널조사",
                subtitle: "한겨레·한국정당학회·에스티아이",
                features: [],
                meta: [
                    { label: "조사목적", value: "유권자들의 선거 및 정치 관련 인식 변화 연구" },
                    { label: "조사방법", value: "인터넷조사와 전화면접조사 병행" },
                    { label: "조사대상", value: "전국 만 18세 이상 남녀" },
                    { label: "표본추출틀", value: "㈜에스티아이 자체 구축 패널 (유무선 RDD 및 통신사 가입자 패널 활용 모집 4,864명)" },
                ],
                headers: ['차수', '조사 기간', '최초 공표', '표본 수', '응답률', '패널 유지율', '조사 방법'],
                rows: [
                    { cells: ['1차', '2025년 5월 8~11일', '25.5.14', '2,775명', '59.3%', '–', '인터넷 98%, 전화면접 2%'] },
                    { cells: ['2차', '2025년 9월 3~7일', '25.9.11', '2,207명', '80.1%', '1차 대비 80%', '인터넷 99%, 전화면접 1%'] },
                    { cells: ['3차', '2025년 12월 17~21일', '26.1.1', '2,020명', '91.6%', '2차 대비 92%', '인터넷 99%, 전화면접 1%'] },
                    { cells: ['4차', '2026년 5월 예정', '–', '–', '–', '–', '–'], dim: true },
                    { cells: ['5차', '2026년 6월 예정', '–', '–', '–', '–', '–'], dim: true },
                ],
                disclaimer: "* 그 밖의 사항은 중앙선거여론조사심의위원회 홈페이지 참고",
            },
        },

        /* ─── 1. 이념·정당별 지지 확장 ───────────── */
        {
            id: 'slide-01',
            type: 'bar-v-group',
            data: {
                title: "이념·정당별 지지 확장",
                subtitle: "중도 +15.3%p · 개혁신당 지지층 +82.3%p · 무당층 +24.8%p",
                categories: ['진보', '중도', '보수', '국힘 지지층', '개혁신당 지지층', '무당층'],
                series: [
                    {
                        name: '대선 지지 (1차·2025.5)',
                        data: [88.6, 51.8, 11.7, 2.5, 4.1, 11.6],
                        color: '#9CA3AF',
                    },
                    {
                        name: '국정 지지 (3차·2025.12)',
                        data: [93.2, 67.1, 23.4, 14.2, 86.4, 36.4],
                        color: '#0052A3',
                    },
                ],
                unit: '%',
            },
        },

        /* ─── 1b. 역대 정부 국정지지율 (앞부분 참고용) ── */
        {
            id: 'slide-01b',
            type: 'line',
            data: {
                title: "역대 정부 국정지지율",
                dates: ['취임', '3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36', '39', '42', '45', '48', '51', '54', '57'],
                series: [
                    {
                        name: '이재명',
                        data: [64, 56, 60, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        color: '#0052A3',
                    },
                    {
                        name: '문재인',
                        data: [81, 69, 72, 71, 76, 54, 46, 44, 46, 42, 47, 49, 57, 45, 39, 37, 39, 38, 38, 43],
                        color: '#60A5FA',
                    },
                    {
                        name: '박근혜',
                        data: [42, 57, 63, 52, 57, 44, 46, 40, 38, 32, 50, 43, 39, 32, 31, 4, null, null, null, null],
                        color: '#F59E0B',
                    },
                    {
                        name: '윤석열',
                        data: [51, 26, 29, 35, 35, 34, 34, 34, 23, 25, 19, null, null, null, null, null, null, null, null, null],
                        color: '#E61E2B',
                    },
                ],
                unit: '%',
                yMin: 0,
                yMax: 90,
            },
        },

        /* ─── 2. 허니문이 아닌 이유 ───────────────── */
        {
            id: 'slide-02',
            type: 'two-box',
            data: {
                title: "단순 '허니문'이 아닌 이유",
                subtitle: "역대 정부와 구조적으로 다른 이재명 지지율",
                boxes: [
                    {
                        heading: "① '정치 구도'가 다르다",
                        bullets: [
                            { name: "문재인", text: "야권 분화로 다당 경쟁 구도 <br>→ 국정지지 ≒ 여당지지", color: "#60A5FA" },
                            { name: "윤석열", text: "출범 2개월 만에 국정지지, 정당지지 대비 –9%p 추락", color: "#E61E2B" },
                            { name: "이재명", text: "국민의힘 극단화 <br>→ 이탈 보수·중도에 새 선택지 필요", color: "#0052A3" },
                        ],
                    },
                    {
                        heading: "② '국정 기조'가 다르다",
                        bullets: [
                            { name: "문재인", text: "'적폐 청산' 기조 → 실질적 통합에 미진", color: "#60A5FA" },
                            { name: "윤석열", text: "'안보·법치' 중심 경직된 국정 운영에 매몰", color: "#E61E2B" },
                            { name: "이재명", text: "당선 전 '중도보수' 표방 → 통합·실용 기조 견지", color: "#0052A3" },
                        ],
                    },
                ],
            },
        },

        /* ─── 3. '뉴 이재명' 정의와 규모 — Sankey ─── */
        {
            id: 'slide-03',
            type: 'sankey',
            data: {
                title: "'뉴 이재명' 정의와 규모",
                subtitle: "대선 투표 → 국정평가 · 비지지층 중 27.4%가 국정 긍정 전환",
                layoutIterations: 0,
                columnLabels: { left: '1차 (2025.5)', right: '3차 (2026.1)' },
                flowAnnotation: {
                    text: "✔️ '뉴 이재명' 유권자 (21.9%)",
                    x: 0.38, y: 0.80,
                    boxWidth: 380, boxHeight: 68,
                    borderColor: 'transparent',
                },
                nodes: [
                    { name: '이재명 지지',      itemStyle: { color: '#1a237e' } },
                    { name: '이재명 지지 안함', itemStyle: { color: '#9e9e9e' } },
                    { name: '국정운영 부정',    itemStyle: { color: '#c62828' }, label: { position: 'left' } },
                    { name: '잘 모름',          itemStyle: { color: '#cfd8dc' }, label: { position: 'left' } },
                    { name: '국정운영 긍정',    itemStyle: { color: '#1a237e' }, label: { position: 'left' } },
                ],
                links: [
                    { source: '이재명 지지',      target: '국정운영 긍정', value: 982 },
                    { source: '이재명 지지',      target: '국정운영 부정', value: 43  },
                    { source: '이재명 지지',      target: '잘 모름',       value: 14  },
                    { source: '이재명 지지 안함', target: '국정운영 긍정', value: 275 },
                    { source: '이재명 지지 안함', target: '국정운영 부정', value: 629 },
                    { source: '이재명 지지 안함', target: '잘 모름',       value: 78  },
                ],
                source: '에스티아이 유권자 패널조사 3차(2025.12), n=2,020',
            },
        },

        /* ─── 4. 이념성향 구성 — 뉴 vs 올드 ─────── */
        {
            id: 'slide-04',
            type: 'cross-tab',
            data: {
                title: "'뉴 이재명'의 이념성향",
                subtitle: "중도 66% · 보수 21% — 올드(중도 45%, 진보 48%)와 정반대",
                categories: ['뉴 이재명', '올드 이재명'],
                series: [
                    { name: '진보', data: [13.5, 47.8], color: '#0052A3' },
                    { name: '중도', data: [65.9, 44.9], color: '#6B7280' },
                    { name: '보수', data: [20.7,  7.3], color: '#E61E2B' },
                ],
                unit: '%',
            },
        },

        /* ─── 5. 지지정당 구성 — 뉴 vs 올드 ─────── */
        {
            id: 'slide-05',
            type: 'cross-tab',
            data: {
                title: "'뉴 이재명'의 지지정당",
                subtitle: "민주당 34% · 국힘 25% · 개혁 14% · 무당층 20%",
                categories: ['뉴 이재명', '올드 이재명'],
                series: [
                    { name: '민주당',    data: [34.1, 85.5], color: '#0052A3' },
                    { name: '국민의힘',  data: [24.8,  1.1], color: '#E61E2B' },
                    { name: '개혁신당',  data: [13.6,  0.4], color: '#F47920' },
                    { name: '조국혁신당', data: [ 4.0,  7.8], color: '#007AC3' },
                    { name: '기타/없음/모름', data: [23.6,  5.3], color: '#9CA3AF' },
                ],
                unit: '%',
            },
        },

        /* ─── 5b. 경제적 특성 — 가구소득 ───────── */
        {
            id: 'slide-05b',
            type: 'cross-tab',
            data: {
                title: "'뉴 이재명'의 경제적 특성",
                subtitle: "월평균 가구소득 · 2차 패널조사 (2025.9)",
                categories: ['뉴 이재명', '올드 이재명', '전체'],
                series: [
                    { name: '199만원 이하',  data: [ 9.9, 11.3, 13.1], color: '#93C5FD' },
                    { name: '200~399만원',   data: [30.7, 27.4, 29.6], color: '#60A5FA' },
                    { name: '400~599만원',   data: [25.7, 25.0, 24.3], color: '#3B82F6' },
                    { name: '600~799만원',   data: [18.0, 15.5, 14.2], color: '#2563EB' },
                    { name: '800만원 이상',  data: [15.7, 20.8, 18.8], color: '#1D4ED8' },
                ],
                unit: '%',
            },
        },

        /* ─── 5c. 경제적 특성 — 주택 점유형태 ──── */
        {
            id: 'slide-05c',
            type: 'cross-tab',
            data: {
                title: "'뉴 이재명'의 경제적 특성",
                subtitle: "주택 점유형태 · 3차 패널조사 (2025.12)",
                categories: ['뉴 이재명', '올드 이재명', '전체'],
                series: [
                    { name: '자가', data: [60.4, 64.2, 61.2], color: '#34D399' },
                    { name: '전세', data: [13.3, 12.3, 12.5], color: '#60A5FA' },
                    { name: '월세', data: [13.5, 13.2, 14.3], color: '#F87171' },
                    { name: '기타', data: [12.9, 10.3, 12.0], color: '#D1D5DB' },
                ],
                unit: '%',
            },
        },

        /* ─── 6. 연령별 지지 확장 ────────────────── */
        {
            id: 'slide-06',
            type: 'bar-v-group',
            data: {
                title: "연령별 국정지지 확장",
                subtitle: "30대 +19.2%p · 70세+ +16.9%p",
                categories: ['18~29세', '30~39세', '40~49세', '50~59세', '60~69세', '70세+'],
                series: [
                    {
                        name: '대선 지지 (1차·2025.5)',
                        data: [39.5, 42.4, 66.4, 65.1, 43.1, 33.4],
                        color: '#9CA3AF',
                    },
                    {
                        name: '국정 지지 (3차·2025.12)',
                        data: [45.8, 61.6, 79.3, 75.2, 56.3, 50.3],
                        color: '#0052A3',
                    },
                ],
                unit: '%',
            },
        },

        /* ─── 7. 민주당 지지 추이 — 꺾은선 ─────── */
        {
            id: 'slide-07',
            type: 'line',
            data: {
                title: "'뉴 이재명' 내 민주당 지지 추이",
                subtitle: "1차 10.5% → 3차 34.1% · 여전히 10명 중 7명은 非민주",
                dates: ['1차 (2025.5)', '2차 (2025.9)', '3차 (2025.12)'],
                series: [
                    {
                        name: '뉴이재명 내 민주당 지지율',
                        data: [10.5, 29.9, 34.1],
                        color: '#0052A3',
                    },
                    {
                        name: '올드이재명 민주당 지지율 (참고)',
                        data: [85.5, 85.5, 85.5],
                        color: '#D1D5DB',
                    },
                ],
                unit: '%',
                yMin: 0,
                yMax: 100,
            },
        },

        /* ─── 8. 이념성향 변화 1→2→3차 ─────────── */
        {
            id: 'slide-08',
            type: 'cross-tab',
            data: {
                title: "'뉴 이재명'의 이념성향 변화",
                subtitle: "보수 –5.9%p · 중도 +4.1%p (1차→3차)",
                categories: ['1차 (2025.5)', '2차 (2025.9)', '3차 (2025.12)'],
                series: [
                    { name: '진보', data: [11.6, 13.0, 13.5], color: '#0052A3' },
                    { name: '중도', data: [61.8, 64.5, 65.9], color: '#6B7280' },
                    { name: '보수', data: [26.6, 22.5, 20.7], color: '#E61E2B' },
                ],
                unit: '%',
            },
        },

        /* ─── 9. 지지정당 이동 흐름 — Sankey ────── */
        {
            id: 'slide-09',
            type: 'sankey',
            data: {
                title: "지지정당 이동 흐름",
                subtitle: "1차→3차 · 조국혁신·개혁·무당층에서 민주당으로 유입",
                layoutIterations: 0,
                columnLabels: { left: '1차 (2025.5)', right: '3차 (2026.1)' },
                nodes: [
                    /* 1차 (왼쪽) */
                    { name: '더불어민주당',   itemStyle: { color: '#0052A3' } },
                    { name: '국민의힘',       itemStyle: { color: '#E61E2B' } },
                    { name: '조국혁신당',     itemStyle: { color: '#007AC3' } },
                    { name: '개혁신당',       itemStyle: { color: '#F47920' } },
                    { name: '기타/없음/모름', itemStyle: { color: '#9CA3AF' } },
                    /* 3차 (오른쪽) — 내부명에 (3차) 유지, 표시는 formatter로 제거 */
                    { name: '더불어민주당 (3차)', itemStyle: { color: '#0052A3' }, label: { position: 'left', formatter: '더불어민주당' } },
                    { name: '국민의힘 (3차)',     itemStyle: { color: '#E61E2B' }, label: { position: 'left', formatter: '국민의힘' } },
                    { name: '조국혁신당 (3차)',   itemStyle: { color: '#007AC3' }, label: { position: 'left', formatter: '조국혁신당' } },
                    { name: '개혁신당 (3차)',     itemStyle: { color: '#F47920' }, label: { position: 'left', formatter: '개혁신당' } },
                    { name: '기타/없음/모름 (3차)', itemStyle: { color: '#9CA3AF' }, label: { position: 'left', formatter: '기타/모름/없음' } },
                ],
                links: [
                    { source: '더불어민주당',   target: '더불어민주당 (3차)', value: 856 },
                    { source: '더불어민주당',   target: '조국혁신당 (3차)',   value: 33  },
                    { source: '더불어민주당',   target: '기타/없음/모름 (3차)', value: 23 },
                    { source: '더불어민주당',   target: '국민의힘 (3차)',     value: 16  },
                    { source: '국민의힘',       target: '국민의힘 (3차)',     value: 448 },
                    { source: '국민의힘',       target: '기타/없음/모름 (3차)', value: 58 },
                    { source: '국민의힘',       target: '개혁신당 (3차)',     value: 34  },
                    { source: '국민의힘',       target: '더불어민주당 (3차)', value: 20  },
                    { source: '조국혁신당',     target: '더불어민주당 (3차)', value: 68  },
                    { source: '조국혁신당',     target: '조국혁신당 (3차)',   value: 48  },
                    { source: '개혁신당',       target: '개혁신당 (3차)',     value: 69  },
                    { source: '개혁신당',       target: '더불어민주당 (3차)', value: 18  },
                    { source: '개혁신당',       target: '국민의힘 (3차)',     value: 13  },
                    { source: '개혁신당',       target: '기타/없음/모름 (3차)', value: 10 },
                    { source: '기타/없음/모름', target: '기타/없음/모름 (3차)', value: 124 },
                    { source: '기타/없음/모름', target: '국민의힘 (3차)',     value: 53  },
                    { source: '기타/없음/모름', target: '더불어민주당 (3차)', value: 25  },
                ],
                source: '에스티아이 유권자 패널조사 1차(2025.5) / 3차(2025.12), n=2,020',
            },
        },

        /* ─── 10. 정부가 잘한 분야 ──────────────── */
        {
            id: 'slide-10',
            type: 'bar-v-group',
            data: {
                title: "정부가 잘한 분야",
                subtitle: "뉴: 외교·안보 65% · 내란극복 26% / 올드: 외교·안보 86% · 내란극복 33%",
                categories: ['외교/안보', '복지/노동', '경제/조세', '내란극복', '정치/소통'],
                series: [
                    {
                        name: '뉴 이재명',
                        data: [65.1, 34.4, 33.9, 25.5, 16.7],
                        color: '#60A5FA',
                    },
                    {
                        name: '올드 이재명',
                        data: [86.2, 29.3, 34.8, 33.0, 13.4],
                        color: '#0052A3',
                    },
                ],
                unit: '%',
                maxValue: 100,
            },
        },

        /* ─── 11. 2년차 최우선 과제 ──────────────── */
        {
            id: 'slide-11',
            type: 'bar-v-group',
            data: {
                title: "2년차 최우선 과제",
                subtitle: "뉴: 민생경제 53% · 내란극복 7% / 올드: 내란극복 30%",
                categories: ['민생경제 회복', '부동산 안정', '국민통합/협치', '저출생/고령화', '내란극복'],
                series: [
                    {
                        name: '뉴 이재명',
                        data: [53.3, 12.6, 11.1, 9.3, 7.0],
                        color: '#60A5FA',
                    },
                    {
                        name: '올드 이재명',
                        data: [49.2, 7.1, 5.7, 4.4, 29.7],
                        color: '#0052A3',
                    },
                ],
                unit: '%',
                maxValue: 60,
            },
        },

        /* ─── 12. 일 잘한다는 장관 ──────────────── */
        {
            id: 'slide-12',
            type: 'bar-v-group',
            data: {
                title: "잘하는 장관 평가",
                subtitle: "뉴: 김정관>정은경>구윤철>조현 / 올드: 김정관>조현>정은경>구윤철",
                // 뉴이재명 기준 순위: 김정관>정은경>구윤철>조현>배경훈
                // 올드이재명 기준 순위: 김정관>조현>정은경>구윤철>배경훈
                categories: [
                    '김정관 (산업통상부)',
                    '정은경 (보건복지부)',
                    '구윤철 (기획재정부)',
                    '조현 (외교부)',
                    '배경훈 (과기정통부)',
                ],
                series: [
                    {
                        name: '뉴 이재명',
                        data: [18.6, 14.2, 13.9, 10.2, 6.6],
                        color: '#60A5FA',
                    },
                    {
                        name: '올드 이재명',
                        data: [29.9, 14.8,  9.8, 17.3, 7.1],
                        color: '#0052A3',
                    },
                ],
                unit: '%',
                maxValue: 35,
            },
        },

        /* ─── 13. 기관 신뢰도 ────────────────────── */
        {
            id: 'slide-13',
            type: 'bar-v-group',
            data: {
                title: "기관 신뢰도",
                subtitle: "법원·검찰만 뉴(5.4·4.3)가 올드(3.4·2.4)보다 높아 — 10점 만점",
                categories: ['헌재', '선관위', '행정부', '법원', '국회', '검찰'],
                series: [
                    {
                        name: '뉴 이재명',
                        data: [6.0, 5.5, 5.4, 5.4, 4.2, 4.3],
                        color: '#60A5FA',
                    },
                    {
                        name: '올드 이재명',
                        data: [6.2, 6.9, 6.2, 3.4, 5.5, 2.4],
                        color: '#0052A3',
                    },
                ],
                unit: '점',
                maxValue: 10,
            },
        },

        /* ─── 14. 검찰 보완수사권 ────────────────── */
        {
            id: 'slide-14',
            type: 'cross-tab',
            data: {
                title: "검찰 보완수사권",
                subtitle: "뉴: 일부 존치 58% / 올드: 완전 폐지 67%",
                categories: ['올드 이재명', '뉴 이재명'],
                series: [
                    { name: '완전 폐지', data: [66.5, 25.6], color: '#E61E2B' },
                    { name: '일부 존치', data: [25.0, 57.7], color: '#0052A3' },
                    { name: '잘 모름',   data: [ 8.5, 16.7], color: '#9CA3AF' },
                ],
                unit: '%',
            },
        },

        /* ─── 15. 정청래 대표 평가 ───────────────── */
        {
            id: 'slide-15',
            type: 'cross-tab',
            data: {
                title: "정청래 대표 평가",
                subtitle: "올드: 잘함 65% / 뉴: 잘못함 43%",
                categories: ['뉴 이재명', '올드 이재명', '전체'],
                series: [
                    { name: '잘함',   data: [38.3, 64.7, 39.4], color: '#0052A3' },
                    { name: '잘못함', data: [42.6, 24.3, 47.8], color: '#E61E2B' },
                    { name: '모름',   data: [19.2, 11.0, 12.8], color: '#9CA3AF' },
                ],
                unit: '%',
            },
        },

        /* ─── 16. 당정관계 책임 인식 ─────────────── */
        {
            id: 'slide-16',
            type: 'cross-tab',
            data: {
                title: "당정관계 책임 인식",
                subtitle: "뉴: 민주당 47% · 양측 38% / 올드: 민주당 71%",
                categories: ['뉴 이재명', '올드 이재명', '전체'],
                series: [
                    { name: '정부 책임',   data: [10.1,  5.3, 10.8], color: '#60A5FA' },
                    { name: '민주당 책임', data: [46.8, 70.9, 38.2], color: '#E61E2B' },
                    { name: '양측 모두',   data: [37.9, 18.1, 47.1], color: '#F59E0B' },
                    { name: '모름',        data: [ 5.2,  5.8,  4.0], color: '#9CA3AF' },
                ],
                unit: '%',
            },
        },

        /* ─── 17. 실용주의 리더십 ────────────────── */
        {
            id: 'slide-17',
            type: 'survey-detail',
            data: {
                title: "실용주의 리더십",
                subtitle: "'궁궐의 이념'에서 '마을의 실용'으로",
                items: [
                    {
                        source: '이전 정부',
                        question: '이념·거대담론·개혁 명분\n중심의 정치',
                        options: ['검찰 개혁', '재벌 규제', '외교 이념', '진영 중심'],
                    },
                    {
                        source: '이재명',
                        question: '삶을 바꾸는 실용 정책\n중심의 국정 운영',
                        options: ['금투세 폐지', '상법 개정', '탕평 인사', '한일 정상화', '국무회의 생중계'],
                    },
                ],
            },
        },

        /* ─── 18. 역대 정부 수렴 ─────────────────── */
        {
            id: 'slide-18',
            type: 'line',
            data: {
                title: "역대 정부 국정지지율",
                subtitle: "취임 후 추이 · 이재명 정부는 현재 어디에",
                // X축: 취임 시점 기준 3개월 단위
                // 문재인(2017.5): 2017.6~2022.3 (20개) / 박근혜(2013.2): 2013.3~2016.12 (16개, 탄핵)
                // 윤석열(2022.5): 2022.5~2024.11 (11개, 탄핵) / 이재명(2025.6): 2025.7~2026.1 (3개)
                dates: ['취임', '3', '6', '9', '12', '15', '18', '21', '24', '27', '30', '33', '36', '39', '42', '45', '48', '51', '54', '57'],
                series: [
                    {
                        name: '이재명',
                        data: [64, 56, 60, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                        color: '#0052A3',
                    },
                    {
                        name: '문재인',
                        data: [81, 69, 72, 71, 76, 54, 46, 44, 46, 42, 47, 49, 57, 45, 39, 37, 39, 38, 38, 43],
                        color: '#60A5FA',
                    },
                    {
                        name: '박근혜',
                        data: [42, 57, 63, 52, 57, 44, 46, 40, 38, 32, 50, 43, 39, 32, 31, 4, null, null, null, null],
                        color: '#F59E0B',
                    },
                    {
                        name: '윤석열',
                        data: [51, 26, 29, 35, 35, 34, 34, 34, 23, 25, 19, null, null, null, null, null, null, null, null, null],
                        color: '#E61E2B',
                    },
                ],
                unit: '%',
                yMin: 0,
                yMax: 90,
            },
        },

        /* ─── 19. 6월 지방선거가 변곡점 ─────────── */
        {
            id: 'slide-19',
            type: 'survey-detail',
            data: {
                title: "6월 지방선거가 변곡점",
                subtitle: "'뉴 이재명'의 향방이 곧 전체 국민 여론의 바로미터",
                items: [
                    {
                        source: '믹스트 컬러',
                        question: '여야 실용 노선 공유\n→ \'뉴이재명\' 공고화\n→ 안정적 국정동력',
                        options: ['실용 중심 연합', '지지층 공고화', '국정동력 유지'],
                    },
                    {
                        source: '단일 컬러',
                        question: '국정 기조 충돌\n→ \'뉴이재명\' 이완\n→ 여당 지지율 수렴',
                        options: ['이념 노선 강화', '지지층 이탈', '여당 지지율 수렴'],
                    },
                ],
            },
        },

    ],
};
