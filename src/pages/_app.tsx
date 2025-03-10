// src/pages/_app.tsx
import { useEffect } from "react";

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // 클라이언트 사이드에서만 MSW를 초기화
      import("../mocks/initMocks").then(({ initMocks }) => {
        initMocks();
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
