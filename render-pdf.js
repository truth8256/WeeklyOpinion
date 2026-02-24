const puppeteer = require('puppeteer');
const http = require('http');
const handler = require('serve-handler');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

// 설정
const PORT = 3456;
const OUTPUT_FILE = 'output.pdf';
const WAIT_PER_SLIDE = 1500; // 차트 애니메이션 및 렌더링 대기 시간
const VIEWPORT = { width: 1920, height: 1080, deviceScaleFactor: 2 };

// 1. 임시 서버 구동
const server = http.createServer((request, response) => {
    return handler(request, response, { public: __dirname });
});

server.listen(PORT, async () => {
    console.log(`[🚀] 로컬 서버 시작됨: http://localhost:${PORT}`);

    let browser;
    try {
        console.log(`[🔄] 헤드리스 브라우저 시작 중...`);
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setViewport(VIEWPORT);

        console.log(`[📄] 슬라이드 페이지 접속 중...`);
        await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

        // 엔진 초기화 대기
        await new Promise(r => setTimeout(r, 2000));

        // 총 슬라이드 개수 얻기
        const totalSlides = await page.evaluate(() => {
            return window.SlideEngine ? window.SlideEngine.getTotal() : document.querySelectorAll('.slide').length;
        });

        console.log(`[📊] 총 슬라이드 수: ${totalSlides}장 발견`);
        if (totalSlides === 0) throw new Error("슬라이드 개수가 0입니다. 데이터 설정을 확인하세요.");

        // 최종 합칠 PDF 문서 객체 생성 (pdf-lib)
        const pdfDoc = await PDFDocument.create();

        console.log(`[📸] 각 슬라이드별 렌더링 및 캡처 시작...`);

        // 1번 슬라이드부터 끝까지 1장씩 이동하며 PDF 스냅샷(버퍼) 떠서 병합
        for (let i = 0; i < totalSlides; i++) {
            process.stdout.write(`   - 슬라이드 [${i + 1}/${totalSlides}] 캡처 중... `);

            // 해당 슬라이드로 이동 (엔진 API 호출)
            await page.evaluate((idx) => {
                if (window.SlideEngine) window.SlideEngine.goTo(idx);
            }, i);

            // 애니메이션 렌더링 대기
            await new Promise(r => setTimeout(r, WAIT_PER_SLIDE));

            // 현재 1920x1080 화면 영역에 대해서만 PDF (단일 페이지 버퍼) 추출
            const slidePdfBuffer = await page.pdf({
                width: '1920px',
                height: '1080px',
                printBackground: true,
                pageRanges: '1' // 1페이지만
            });

            // 추출한 1장짜리 PDF 버퍼를 메인 pdf-lib 객체에 복사해서 붙임
            const subDocument = await PDFDocument.load(slidePdfBuffer);
            const [copiedPage] = await pdfDoc.copyPages(subDocument, [0]);
            pdfDoc.addPage(copiedPage);

            console.log(`완료`);
        }

        console.log(`[💾] 파일 병합 및 저장 중...`);
        const finalPdfBytes = await pdfDoc.save();
        fs.writeFileSync(OUTPUT_FILE, finalPdfBytes);

        console.log(`\n[✅] PDF 추출 성공! -> ${path.resolve(OUTPUT_FILE)}`);

    } catch (error) {
        console.error(`\n[❌] 렌더링 중 오류 발생:`, error);
    } finally {
        if (browser) await browser.close();
        server.close();
        console.log(`[🛑] 서버 종료 및 프로세스 완료.`);
        process.exit(0);
    }
});
