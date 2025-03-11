// src/pages/_app.tsx
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useThemeStore } from "@/store/useThemeStore";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { darkMode } = useThemeStore();
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      import("../mocks/browser").then(({ worker }) => {
        worker.start({ onUnhandledRequest: "bypass" });
        console.log("✅ MSW worker started");
      });
    }
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
