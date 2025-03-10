import { http } from "msw";

export const handlers = [
  http.get("/api/tweets", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1, content: "첫 번째 트윗!", likes: 5 }]));
  }),
];
