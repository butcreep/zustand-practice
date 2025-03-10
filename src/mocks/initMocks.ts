// src/mocks/initMocks.ts
export async function initMocks() {
  // 브라우저 환경에서만 실행하도록 체크
  if (typeof window === "undefined") return;

  // 동적으로 MSW 모듈 불러오기
  const mswModule = await import("msw");
  const { setupWorker, rest } = mswModule;

  // 핸들러 정의
  const handlers = [
    rest.get("/api/tweets", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([{ id: 1, content: "첫 번째 트윗!", likes: 5 }]));
    }),
  ];

  // 워커 설정 및 시작
  const worker = setupWorker(...handlers);
  worker.start();
}
