import { http, HttpResponse } from "msw";

// ✅ 트윗을 저장할 In-Memory Store (메모리에서 유지)
let tweets = [
  { id: 1, content: "첫 번째 트윗!", likes: 5 },
  { id: 2, content: "두 번째 트윗!", likes: 2 },
];

export const handlers = [
  // ✅ GET /api/tweets: 모든 트윗 가져오기
  http.get("/api/tweets", () => {
    return HttpResponse.json(tweets); // 메모리에서 저장된 데이터 반환
  }),

  // ✅ POST /api/tweets: 새로운 트윗 추가
  http.post("/api/tweets", async ({ request }) => {
    const newTweet = (await request.json()) || {};
    const createdTweet = { id: Date.now(), ...newTweet, likes: 0 };

    tweets.push(createdTweet); // In-Memory Store에 추가
    return HttpResponse.json(createdTweet, { status: 201 });
  }),

  // ✅ PATCH /api/tweets/:id: 트윗 수정
  http.patch("/api/tweets/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();

    tweets = tweets.map(tweet => (tweet.id === Number(id) ? { ...tweet, ...updates } : tweet));

    const updatedTweet = tweets.find(tweet => tweet.id === Number(id));
    return HttpResponse.json(updatedTweet, { status: 200 });
  }),

  // ✅ DELETE /api/tweets/:id: 트윗 삭제
  http.delete("/api/tweets/:id", ({ params }) => {
    const { id } = params;
    tweets = tweets.filter(tweet => tweet.id !== Number(id));

    return new Response(null, { status: 200 });
  }),

  // ✅ PATCH /api/tweets/:id/like: 좋아요 업데이트
  http.patch("/api/tweets/:id/like", ({ params }) => {
    const { id } = params;

    tweets = tweets.map(tweet => (tweet.id === Number(id) ? { ...tweet, likes: tweet.likes + 1 } : tweet));

    const updatedTweet = tweets.find(tweet => tweet.id === Number(id));
    return HttpResponse.json(updatedTweet, { status: 200 });
  }),

  // // ✅ PATCH /api/profile: 프로필 업데이트 (예시)
  // http.patch("/api/profile", async ({ request }) => {
  //   const updates = await request.json();
  //   return HttpResponse.json({ ...updates }, { status: 200 });
  // }),
];
